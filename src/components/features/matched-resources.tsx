import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import learning from "@/data/learning-resources.json";

type Resource = (typeof learning.resources)[number];

/** Training resources whose Biosecurity Central tags overlap a track's learnTags. */
export function MatchedResources({ tags, limit = 6 }: { tags: string[]; limit?: number }) {
  if (tags.length === 0) return null;
  const matched: Resource[] = learning.resources
    .filter((r) => r.tags.some((t) => tags.includes(t)))
    .sort((a, b) => {
      if (a.keyResource !== b.keyResource) return a.keyResource ? -1 : 1;
      const oa = a.tags.filter((t) => tags.includes(t)).length;
      const ob = b.tags.filter((t) => tags.includes(t)).length;
      return ob - oa || a.title.localeCompare(b.title);
    });
  if (matched.length === 0) return null;
  const shown = matched.slice(0, limit);

  return (
    <section id="learn" className="scroll-mt-24">
      <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
        Where to learn this
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Training materials from the{" "}
        <a href="https://biosecuritycentral.org" rel="noopener" target="_blank" className="font-medium text-primary underline-offset-4 hover:underline">
          Biosecurity Central
        </a>{" "}
        library tagged{" "}
        {tags.map((t, i) => (
          <span key={t}>
            {i > 0 && (i === tags.length - 1 ? " or " : ", ")}
            <em>{t}</em>
          </span>
        ))}
        . Starred items are the library&apos;s key resources.
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {shown.map((r) => (
          <li key={r.url} className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-2">
              {r.keyResource && (
                <Star className="mt-0.5 size-4 shrink-0 fill-amber-400 text-amber-500" aria-label="Key resource" />
              )}
              <h3 className="text-sm leading-snug font-semibold text-foreground">
                <a
                  href={r.url}
                  rel="noopener"
                  target="_blank"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {r.title}
                  <ExternalLink className="ml-0.5 inline size-3.5 align-[-0.125em]" aria-hidden="true" />
                </a>
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">{r.publisher}</p>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {r.tags.map((t) => (
                <li key={t}>
                  <Badge
                    variant={tags.includes(t) ? "default" : "secondary"}
                    className="h-auto px-2 py-0.5 text-[11px] font-normal"
                  >
                    {t}
                  </Badge>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">
        {matched.length > shown.length
          ? `${matched.length - shown.length} more match this track. `
          : ""}
        <Link href="/learn/#library" className="font-medium text-primary underline-offset-4 hover:underline">
          Browse the whole library on the Learn page
        </Link>
        .
      </p>
    </section>
  );
}
