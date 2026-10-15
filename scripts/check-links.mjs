#!/usr/bin/env node
/**
 * Check every external link in the site's data and pages.
 *
 *   node scripts/check-links.mjs            # prints a report, writes scripts/link-report.json
 *   node scripts/check-links.mjs --only bls.gov   # limit to one host
 *
 * Reads URLs out of src/data/*.json and src/** source files, requests each one
 * once (GET, following redirects, with a browser-like user agent), and reports
 * anything that is not a 200, plus redirects that land on a different page.
 * Some hosts refuse scripts no matter what (bls.gov, cdc.gov, JHU, FutureLearn,
 * LinkedIn); those come back 403/999 here and must be opened in a browser.
 * Nothing is modified; the report is advisory.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : null;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(json|tsx?|mjs|css)$/.test(name)) out.push(p);
  }
  return out;
}
const files = walk(join(ROOT, "src"));
const found = new Map(); // url -> [files]
for (const f of files) {
  const text = readFileSync(f, "utf8");
  for (const m of text.matchAll(/https?:\/\/[^\s"'`<>)\]\\]+/g)) {
    let u = m[0].replace(/[.,;:]+$/, "");
    if (u.includes("schema.org") || u.includes("w3.org") || u.includes("curtishoffmann.com")) continue;
    if (only && !u.includes(only)) continue;
    if (!found.has(u)) found.set(u, []);
    found.get(u).push(f.replace(ROOT + "/", ""));
  }
}
const urls = [...found.keys()].sort();
console.log(`${urls.length} distinct external URLs from ${files.length} files`);

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36";
async function check(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 25000);
  try {
    const r = await fetch(url, { method: "GET", redirect: "follow", signal: ctrl.signal, headers: { "user-agent": UA, accept: "text/html,*/*" } });
    const finalUrl = r.url;
    const same = norm(finalUrl) === norm(url);
    return { url, status: r.status, finalUrl: same ? undefined : finalUrl };
  } catch (e) {
    return { url, status: 0, error: String(e.cause?.code || e.name || e.message) };
  } finally {
    clearTimeout(t);
  }
}
const norm = u => u.replace(/^http:/, "https:").replace(/\/+$/, "").replace(/^https:\/\/www\./, "https://").toLowerCase();

const results = [];
let i = 0;
async function worker() {
  while (i < urls.length) {
    const u = urls[i++];
    const r = await check(u);
    r.files = found.get(u);
    results.push(r);
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
results.sort((a, b) => a.url.localeCompare(b.url));

const bad = results.filter(r => r.status !== 200 || r.finalUrl);
for (const r of bad) {
  console.log(`${String(r.status).padStart(3)}  ${r.url}${r.finalUrl ? `\n     -> ${r.finalUrl}` : ""}${r.error ? `  (${r.error})` : ""}\n     in ${r.files.join(", ")}`);
}
console.log(`\n${results.length - bad.length} OK · ${bad.length} to look at (non-200 or redirected)`);
writeFileSync(join(ROOT, "scripts", "link-report.json"), JSON.stringify({ checked: new Date().toISOString().slice(0, 10), results }, null, 1));
