import type { Metadata } from "next";
import { ExternalLink, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { PageIntro } from "@/components/features/page-intro";
import { SiteFooter } from "@/components/features/site-footer";
import { SiteHeader } from "@/components/features/site-header";
import learning from "@/data/learning-resources.json";
import keepUp from "@/data/keep-up.json";
import { RichText } from "@/components/features/rich-text";
import { absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Where to learn: free outbreak science and biosecurity courses",
  description:
    "Free and low-cost courses in outbreak investigation, epidemiology, and emergency response from WHO, CDC, and leading universities, plus the Biosecurity Central biosafety and biosecurity training library and the newsletters practitioners read.",
  keywords: ["outbreak investigation course", "epidemiology course free", "OpenWHO", "CDC TRAIN", "biosecurity course", "biosafety training", "Biosecurity Central", "ProMED", "infectious disease modeling course"],
  alternates: { canonical: absUrl("/learn/") },
  openGraph: { images: [{ url: absUrl("/opengraph-image.png"), width: 512, height: 512, alt: "Outbreak Science Careers" }], url: absUrl("/learn/"), title: "Where to learn: free outbreak science and biosecurity courses — Outbreak Science Careers", description: "Courses and training from WHO, CDC, universities, and the Biosecurity Central library." },
};

type Resource = (typeof learning.resources)[number];
const TYPE_ORDER = [
  "intergovernmental",
  "government",
  "university",
  "association",
  "ngo",
  "youth",
] as const;
const labels = learning.meta.publisherTypeLabels as Record<string, string>;

function groupByType(resources: Resource[]) {
  const map = new Map<string, Resource[]>();
  for (const r of resources) {
    const list = map.get(r.publisherType) ?? [];
    list.push(r);
    map.set(r.publisherType, list);
  }
  for (const list of map.values()) {
    list.sort((a, b) =>
      a.keyResource === b.keyResource
        ? a.publisher.localeCompare(b.publisher) || a.title.localeCompare(b.title)
        : a.keyResource
          ? -1
          : 1,
    );
  }
  return TYPE_ORDER.filter((t) => map.has(t)).map((t) => ({
    type: t,
    label: labels[t],
    items: map.get(t)!,
  }));
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      rel="noopener"
      target="_blank"
      className="font-medium text-primary underline-offset-4 hover:underline"
    >
      {children}
      <ExternalLink className="ml-0.5 inline size-3.5 align-[-0.125em]" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function LearnPage() {
  const groups = groupByType(learning.resources);
  const keyCount = learning.resources.filter((r) => r.keyResource).length;
  const libraryCount = learning.resources.filter((r) => !("addedBySite" in r && r.addedBySite)).length;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <PageIntro
          eyebrow="Where to learn"
          title="Courses and training materials"
          lede={
            <>
              Start with something free and short to find out whether the
              field holds your attention. Then go deeper: outbreak
              investigation and epidemiology training from WHO, CDC, and
              leading universities, and a {libraryCount}-item biosafety and
              biosecurity library curated by an expert panel.
            </>
          }
        />

        {/* Start here */}
        <section
          id="start"
          className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6"
        >
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Start here
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink">
            Five free starting points, in roughly the order a newcomer might
            take them: an outbreak in your classroom, the science in short
            videos, the field&apos;s own textbook, a university course, and the
            biosecurity side of the story.
          </p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {keepUp.courses.map((c, i) => (
              <li
                key={c.url}
                className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                  Step {i + 1}
                </span>
                <h3 className="font-heading text-base leading-snug font-semibold text-foreground">
                  <Ext href={c.url}>{c.name}</Ext>
                </h3>
                <p className="text-sm text-muted-foreground">{c.org}</p>
                <p className="text-sm leading-relaxed text-ink">{c.note}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Free lecture series by topic
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {keepUp.lectures.map((l) => (
                <li key={l.url}>
                  <Badge variant="outline" asChild className="h-auto px-3 py-1.5 text-sm font-normal">
                    <a href={l.url} rel="noopener" target="_blank">
                      {l.name}
                    </a>
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Outbreak response training */}
        <section id="outbreak" className="scroll-mt-24 border-t border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Outbreak investigation and response
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink">
              The training the field actually uses, from WHO&apos;s free
              emergency hub and CDC&apos;s learning network to university
              courses you can audit for nothing. Most take an evening or a
              few weeks.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {keepUp.outbreakTraining.map((c) => (
                <li key={c.url} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="font-heading text-base leading-snug font-semibold text-foreground">
                    <Ext href={c.url}>{c.name}</Ext>
                  </h3>
                  <p className="text-sm text-muted-foreground">{c.org}</p>
                  <p className="text-sm leading-relaxed text-ink">{c.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Library */}
        <section id="library" className="scroll-mt-24 border-y border-border bg-muted">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Biosafety and biosecurity training
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink">
              The other half of the field: keeping dangerous pathogens
              contained, and keeping them out of the wrong hands.{" "}
              <Ext href="https://biosecuritycentral.org">Biosecurity Central</Ext>{" "}
              is a searchable library of reliable biosecurity sources,
              reviewed by an advisory committee of global experts. Below are
              the {libraryCount} items in its training-materials section, plus{" "}
              <Ext href="https://operationoutbreak.org/resources">Operation Outbreak&apos;s free lessons and activities</Ext>
              , grouped by who publishes them. Starred items are the library&apos;s own
              &ldquo;key resources.&rdquo; Links open the resource&apos;s page
              on biosecuritycentral.org, which describes it and links onward.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {keepUp.biosecurityTraining.map((c) => (
                <li key={c.url} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="font-heading text-base leading-snug font-semibold text-foreground">
                    <Ext href={c.url}>{c.name}</Ext>
                  </h3>
                  <p className="text-sm text-muted-foreground">{c.org}</p>
                  <p className="text-sm leading-relaxed text-ink">{c.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">
              <RichText text={learning.meta.sponsor} /> Last updated {learning.meta.checked}.
            </p>

            <Accordion type="multiple" className="mt-8 rounded-xl border border-border bg-card px-5 shadow-sm">
              {groups.map((g) => (
                <AccordionItem key={g.type} value={g.type}>
                  <AccordionTrigger className="py-5 text-left font-heading text-base font-semibold text-foreground hover:no-underline sm:text-lg">
                    <span className="flex flex-1 items-center justify-between gap-4 pr-2">
                      {g.label}
                      <span className="text-sm font-normal text-muted-foreground">
                        {g.items.length}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid gap-3 pb-4 sm:grid-cols-2">
                      {g.items.map((r) => (
                        <li
                          key={r.url}
                          className="flex flex-col gap-1.5 rounded-lg border border-border bg-background p-4"
                        >
                          <div className="flex items-start gap-2">
                            {r.keyResource && (
                              <Star
                                className="mt-0.5 size-4 shrink-0 fill-amber-400 text-amber-500"
                                aria-label="Key resource"
                              />
                            )}
                            <h3 className="text-sm leading-snug font-semibold text-foreground">
                              <Ext href={r.url}>{r.title}</Ext>
                            </h3>
                          </div>
                          <p className="text-xs text-muted-foreground">{r.publisher}</p>
                          {r.tags.length > 0 && (
                            <ul className="mt-1 flex flex-wrap gap-1.5">
                              {r.tags.map((t) => (
                                <li key={t}>
                                  <Badge variant="secondary" className="h-auto px-2 py-0.5 text-[11px] font-normal">
                                    {t}
                                  </Badge>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="mt-4 text-sm text-muted-foreground">
              {keyCount} of the {libraryCount} library items are starred key
              resources. The library also holds guidance, protocols, and
              legislation beyond training: explore the whole thing at{" "}
              <Ext href="https://biosecuritycentral.org">biosecuritycentral.org</Ext>.
            </p>
          </div>
        </section>

        {/* Keep up */}
        <section id="keep-up" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Keep up with the field
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink">
            Reading one outbreak alert service and one newsletter, and
            listening to one podcast for a semester, teaches you the
            vocabulary, the institutions, and the arguments faster than any
            single course.
          </p>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                Newsletters
              </h3>
              <ul className="mt-3 space-y-3">
                {keepUp.newsletters.map((n) => (
                  <li key={n.url} className="text-sm">
                    <Ext href={n.url}>{n.name}</Ext>
                    <span className="text-muted-foreground"> · {n.org}</span>
                    {"note" in n && n.note ? (
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{n.note}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                Podcasts
              </h3>
              <ul className="mt-3 space-y-3">
                {keepUp.podcasts.map((p) => (
                  <li key={p.name} className="text-sm">
                    <span className="font-medium text-foreground">{p.name}</span>
                    <span className="text-muted-foreground"> · {p.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            <RichText text={keepUp.meta.sources} /> Last updated {keepUp.meta.checked}.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
