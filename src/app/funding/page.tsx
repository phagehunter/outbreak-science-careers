import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageIntro } from "@/components/features/page-intro";
import { RichText } from "@/components/features/rich-text";
import { SiteFooter } from "@/components/features/site-footer";
import { SiteHeader } from "@/components/features/site-header";
import { SITE_NAME, absUrl } from "@/lib/site";
import funding from "@/data/funding.json";

export const metadata: Metadata = {
  title: "Funding: grants, fellowships, and who pays for outbreak science",
  description:
    "Where to get funding for study, research, and projects in outbreak science and biosecurity: NSF and NIH fellowships, Wellcome, Gates Grand Challenges, CEPI, BARDA, DARPA, Coefficient Giving, Blueprint Biosecurity, and BlueDot grants, plus how each funding model works and who funds the field, from Pandemic PACT data.",
  keywords: ["biosecurity funding", "pandemic preparedness grants", "outbreak research funding", "NSF GRFP", "NIH F31", "Wellcome Early-Career Award", "CEPI call for proposals", "BARDA DRIVe", "Coefficient Giving biosecurity", "Blueprint Biosecurity RFP", "Pandemic PACT", "biosecurity philanthropy"],
  alternates: { canonical: absUrl("/funding/") },
  openGraph: { images: [{ url: absUrl("/opengraph-image.png"), width: 512, height: 512, alt: "Outbreak Science Careers" }], url: absUrl("/funding/"), title: `Funding: grants, fellowships, and who pays for outbreak science — ${SITE_NAME}`, description: "Where to get funding for study, research, and projects in outbreak science and biosecurity, and how each funding model works." },
};

type Source = (typeof funding.sources)[number];
const STAGES = ["study", "research", "projects", "orgs"] as const;
const stageLabels = funding.meta.stages as Record<string, string>;
const DIR_KINDS = ["government", "multilateral", "philanthropy", "research"] as const;
const dirKindLabels = funding.directory.meta.kinds as Record<string, string>;
const STAGE_LEDE: Record<string, string> = {
  study: "Money attached to you rather than a project: a stipend to study, or a grant to make a career move.",
  research: "Awards for people ready to run their own research, from a first independent project to a five-year program.",
  projects: "Funding for things you want to build or test: a prototype, a countermeasure, a company.",
  orgs: "The large funders behind the field's organizations. Useful to know who they are even if you never apply directly.",
};

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} rel="noopener" target="_blank" className="font-medium text-primary underline-offset-4 hover:underline">
      {children}
      <ExternalLink className="ml-0.5 inline size-3.5 align-[-0.125em]" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function SourceCard({ s }: { s: Source }) {
  return (
    <li className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-heading text-base leading-snug font-semibold text-foreground">
          <Ext href={s.url}>{s.name}</Ext>
        </h3>
        <Badge variant="secondary" className="h-auto px-2 py-0.5 text-[11px] font-normal">{s.type}</Badge>
      </div>
      <p className="text-sm text-muted-foreground"><RichText text={s.org} /></p>
      <dl className="mt-1 grid gap-1.5 text-sm">
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 font-medium text-foreground">Funds</dt>
          <dd className="text-ink"><RichText text={s.amount} /></dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 font-medium text-foreground">Who</dt>
          <dd className="text-ink"><RichText text={s.who} /></dd>
        </div>
      </dl>
      <p className="mt-1 text-sm leading-relaxed text-ink"><RichText text={s.why} /></p>
    </li>
  );
}

export default function FundingPage() {
  const byStage = STAGES.map((st) => ({ stage: st, label: stageLabels[st], items: funding.sources.filter((s) => s.stage === st) }));
  const pact = funding.pact;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Funding", item: absUrl("/funding/") },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main className="flex-1">
        <PageIntro
          eyebrow="Funding"
          title="Who pays for outbreak science"
          lede="Careers in outbreak science run on grants, fellowships, contracts, and salaries, and knowing how each one works is a skill in itself. This page lists funders that back students, researchers, and builders, explains the funding models, and shows who actually funds the field."
        >
          <nav aria-label="Sections" className="mt-8 flex flex-wrap gap-2">
            {byStage.map((g) => (
              <Badge key={g.stage} variant="outline" asChild className="h-auto bg-background px-3 py-1.5 text-sm font-medium">
                <a href={`#${g.stage}`}>{g.label}</a>
              </Badge>
            ))}
            <Badge variant="outline" asChild className="h-auto bg-background px-3 py-1.5 text-sm font-medium">
              <a href="#schemes">How funding works</a>
            </Badge>
            <Badge variant="outline" asChild className="h-auto bg-background px-3 py-1.5 text-sm font-medium">
              <a href="#landscape">Who funds the field</a>
            </Badge>
            <Badge variant="outline" asChild className="h-auto bg-background px-3 py-1.5 text-sm font-medium">
              <a href="#directory">Funder directory</a>
            </Badge>
          </nav>
        </PageIntro>

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="my-10 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
            <strong className="font-semibold">Check before you apply.</strong> {funding.meta.note}
            <span className="mt-1 block">Last updated {funding.meta.checked}.</span>
          </div>
        </div>

        {byStage.map((g, i) => (
          <section key={g.stage} id={g.stage} className={i % 2 === 1 ? "scroll-mt-24 border-y border-border bg-muted" : "scroll-mt-24"}>
            <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{g.label}</h2>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink">{STAGE_LEDE[g.stage]}</p>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {g.items.map((s) => <SourceCard key={s.url} s={s} />)}
              </ul>
            </div>
          </section>
        ))}

        {/* Schemes */}
        <section id="schemes" className="scroll-mt-24 border-t border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">How funding works</h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink">
              Seven models pay for outbreak science. Each has its own logic, timeline, and kind of applicant, and most careers move between several of them.
            </p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {funding.schemes.map((sc, i) => (
                <li key={sc.name} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-sm">
                  <span className="text-xs font-semibold tracking-wide text-primary uppercase">Model {i + 1}</span>
                  <h3 className="font-heading text-base leading-snug font-semibold text-foreground">{sc.name}</h3>
                  <p className="text-sm leading-relaxed text-ink">{sc.how}</p>
                  <p className="text-sm leading-relaxed text-ink"><span className="font-medium text-foreground">Best for </span>{sc.fit}</p>
                  <p className="text-sm text-muted-foreground"><span className="font-medium">Examples: </span><RichText text={sc.example} /></p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Landscape */}
        <section id="landscape" className="scroll-mt-24 border-t border-border bg-muted">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Who funds the field</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink">
              <Ext href={pact.url}>{pact.name}</Ext> ({pact.org}) tracks research funding for diseases with pandemic potential. It covers {pact.totals.grants} grants from {pact.totals.funders} funders worth about {pact.totals.amount}, most of it COVID-19 research. Setting COVID-19 aside leaves {pact.nonCovid.grants} grants and about {pact.nonCovid.amount} for other pandemic-prone pathogens, and that is where the shape of the field shows.
            </p>
            <div className="mt-8 grid gap-8 lg:grid-cols-[3fr_2fr]">
              <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
                <table className="w-full text-sm">
                  <caption className="px-4 pt-4 pb-2 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Largest funders of non-COVID pandemic-pathogen research
                  </caption>
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground">
                      <th className="px-4 py-2 font-medium">Funder</th>
                      <th className="px-4 py-2 font-medium">Amount tracked</th>
                      <th className="px-4 py-2 font-medium">Grants</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pact.topByAmount.map(([name, amount, grants]) => (
                      <tr key={name} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-2 font-medium text-foreground">{name}</td>
                        <td className="px-4 py-2 text-ink">{amount}</td>
                        <td className="px-4 py-2 text-ink">{grants}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">What gets funded (grants, non-COVID)</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {pact.categories.map(([cat, n]) => (
                    <li key={cat} className="flex items-baseline justify-between gap-3">
                      <span className="text-ink">{cat}</span>
                      <span className="shrink-0 font-medium text-foreground">{n}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  Three lessons: governments fund most of the science, a few philanthropies and CEPI fund a large share of the money, and pathogen biology and vaccines draw far more than policy, systems, or ethics research.
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Figures are from Pandemic PACT&apos;s funding tracker as of {pact.asOf}, summed from grant amounts converted to US dollars; grants without a recorded amount count toward grant totals but not dollar totals. Explore the live tracker at <Ext href={pact.url}>pandemicpact.org</Ext>.
            </p>
          </div>
        </section>

        {/* Funder directory */}
        <section id="directory" className="scroll-mt-24 border-t border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Funder directory</h2>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-ink">
              The organizations that fund biosecurity and pandemic-preparedness work, from government agencies to regranting funds you can pitch directly. Use it to learn who is behind the field and where a proposal might land.
            </p>
            <div className="mt-8 space-y-10">
              {DIR_KINDS.map((k) => {
                const items = funding.directory.organizations.filter((o) => o.kind === k);
                if (items.length === 0) return null;
                return (
                  <div key={k}>
                    <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">{dirKindLabels[k]}</h3>
                    <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((o) => (
                        <li key={o.url} className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-4">
                          <h4 className="text-sm leading-snug font-semibold text-foreground"><Ext href={o.url}>{o.name}</Ext></h4>
                          {o.where.length > 0 && <p className="text-xs text-muted-foreground">{o.where.join(" · ")}</p>}
                          <p className="text-sm leading-relaxed text-ink">{o.description.length > 240 ? o.description.slice(0, 237).trimEnd() + "…" : o.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-muted-foreground sm:px-6">
            <p>
              Looking for salaried routes instead? Most people in this field are paid by an employer, not a grant. See the fellowships and programs on{" "}
              <Link href="/get-started/" className="font-medium text-primary underline-offset-4 hover:underline">Get started</Link>.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
