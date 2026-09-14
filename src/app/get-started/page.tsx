import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageIntro } from "@/components/features/page-intro";
import { SiteFooter } from "@/components/features/site-footer";
import { SiteHeader } from "@/components/features/site-header";
import routesData from "@/data/entry-routes.json";
import orgsData from "@/data/organizations.json";
import programsData from "@/data/programs.json";
import { RichText } from "@/components/features/rich-text";
import { absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get started: fellowships, programs, and degrees",
  description:
    "Named entry routes into outbreak science and biosecurity: CDC fellowships, the Epidemic Intelligence Service, ELBI, iGEM, biodefense and biosecurity degree programs, and the organizations that help students and early-career people get in.",
  keywords: ["biosecurity fellowships", "public health fellowships", "Epidemic Intelligence Service", "Public Health Associate Program", "biodefense master's", "biosecurity degree programs", "ELBI fellowship", "field epidemiology training program"],
  alternates: { canonical: absUrl("/get-started/") },
  openGraph: { images: [{ url: absUrl("/opengraph-image.png"), width: 512, height: 512, alt: "Outbreak Science Careers" }], url: absUrl("/get-started/"), title: "Get started: fellowships, programs, and degrees — Outbreak Science Careers", description: "Named entry routes into outbreak science and biosecurity, grouped by where you are now." },
};

type Route = (typeof routesData.routes)[number];
type Org = (typeof orgsData.organizations)[number];
type Program = (typeof programsData.programs)[number];

const LEVELS = ["masters", "phd", "certificate", "undergrad"] as const;
const levelLabels = programsData.meta.levels as Record<string, string>;

const STAGES = ["school", "early", "mid", "credential"] as const;
const stageLabels = routesData.meta.stages as Record<string, string>;
const sourceLabels = routesData.meta.sources as Record<string, string>;

const STAGE_LEDE: Record<string, string> = {
  school:
    "You do not need a degree to start. These are open to anyone curious, and several are free.",
  early:
    "Most structured fellowships sit here. They are competitive, but there are more of them than most people realize, and they are the usual bridge from study into a first job.",
  mid: "If you already have a career in medicine, science, engineering, or government, these exist to move you across.",
  credential:
    "Where the field's recognized credentials and dedicated degrees live.",
};

const ORG_KIND_LABEL: Record<string, string> = {
  program: "Fellowships and programs",
  nonprofit: "Nonprofits and institutes",
  research: "Research groups and university centers",
  intergovernmental: "UN bodies",
  thinktank: "Think tanks",
  media: "Podcasts and media",
};
const ORG_KIND_ORDER = ["program", "nonprofit", "research", "intergovernmental", "thinktank", "media"];

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

function RouteCard({ r }: { r: Route }) {
  return (
    <li className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="font-heading text-base leading-snug font-semibold text-foreground">
        <Ext href={r.url}>{r.name}</Ext>
      </h3>
      <p className="text-sm text-muted-foreground"><RichText text={r.org} /></p>
      <dl className="mt-1 grid gap-1.5 text-sm">
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 font-medium text-foreground">Format</dt>
          <dd className="text-ink"><RichText text={r.format} /></dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 font-medium text-foreground">Who</dt>
          <dd className="text-ink"><RichText text={r.who} /></dd>
        </div>
      </dl>
      <p className="mt-1 text-sm leading-relaxed text-ink"><RichText text={r.why} /></p>
    </li>
  );
}

export default function GetStartedPage() {
  const byStage = STAGES.map((s) => ({
    stage: s,
    label: stageLabels[s],
    routes: routesData.routes.filter((r) => r.stage === s),
  }));
  const orgsByKind = ORG_KIND_ORDER.map((k) => ({
    kind: k,
    label: ORG_KIND_LABEL[k],
    orgs: (orgsData.organizations as Org[]).filter((o) => o.kind === k),
  })).filter((g) => g.orgs.length > 0);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <PageIntro
          eyebrow="Get started"
          title="How do I actually get in?"
          lede={
            <>
              There are named programs that admit students and early-career
              people into this field every year. Here are dozens with a real
              track record, grouped by where you are now, then the degree
              programs built for this field, and the organizations whose job is
              to help people get in.
            </>
          }
        >
          <nav aria-label="Stages" className="mt-8 flex flex-wrap gap-2">
            {byStage.map((g) => (
              <Badge key={g.stage} variant="outline" asChild className="h-auto bg-background px-3 py-1.5 text-sm font-medium">
                <a href={`#${g.stage}`}>{g.label}</a>
              </Badge>
            ))}
            <Badge variant="outline" asChild className="h-auto bg-background px-3 py-1.5 text-sm font-medium">
              <a href="#programs">Degree programs</a>
            </Badge>
            <Badge variant="outline" asChild className="h-auto bg-background px-3 py-1.5 text-sm font-medium">
              <a href="#organizations">Organizations</a>
            </Badge>
          </nav>
        </PageIntro>

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="my-10 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
            <strong className="font-semibold">Check before you apply.</strong>{" "}
            {routesData.meta.note}
            <span className="mt-1 block">Last updated {routesData.meta.checked}.</span>
          </div>
        </div>

        {byStage.map((g, i) => (
          <section
            key={g.stage}
            id={g.stage}
            className={
              i % 2 === 1
                ? "scroll-mt-24 border-y border-border bg-muted"
                : "scroll-mt-24"
            }
          >
            <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {g.label}
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink">
                {STAGE_LEDE[g.stage]}
              </p>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {g.routes.map((r) => (
                  <RouteCard key={r.name} r={r} />
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* Degree programs */}
        <section id="programs" className="scroll-mt-24 border-t border-border bg-muted">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Degree programs built for this field
            </h2>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-ink">
              Most people in biosecurity arrive through a general degree in
              science, medicine, public health, or policy. A small number of
              programs are built specifically for the field. This list will
              grow; if you know a program that belongs here,{" "}
              <a href="mailto:curtis@operationoutbreak.org" className="font-medium text-primary underline-offset-4 hover:underline">
                email Curtis
              </a>
              .
            </p>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              {programsData.meta.note} Last updated {programsData.meta.checked}.
            </p>
            <div className="mt-8 space-y-10">
              {LEVELS.map((lvl) => {
                const items = (programsData.programs as Program[]).filter((p) => p.level === lvl);
                if (items.length === 0) return null;
                return (
                  <div key={lvl}>
                    <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                      {levelLabels[lvl]}
                    </h3>
                    <ul className="mt-3 grid gap-4 md:grid-cols-2">
                      {items.map((p) => (
                        <li key={p.url} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-sm">
                          <h4 className="font-heading text-base leading-snug font-semibold text-foreground">
                            <Ext href={p.url}>{p.name}</Ext>
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {p.school} · {p.country}
                          </p>
                          <p className="text-sm text-ink">
                            <span className="font-medium text-foreground">Format </span>
                            {p.format}
                          </p>
                          <p className="text-sm leading-relaxed text-ink">{p.about}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Organizations */}
        <section id="organizations" className="scroll-mt-24 border-t border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Organizations that help people get in
            </h2>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-ink">
              The{" "}
              <Ext href="https://biosecurity.world">biosecurity.world</Ext>{" "}
              project maintains an open map of the field. These are the {orgsData.meta.total} organizations it
              tags as working on education and careers. Use it as a list of
              places to look, not as a ranking.
            </p>

            <div className="mt-8 space-y-10">
              {orgsByKind.map((g) => (
                <div key={g.kind}>
                  <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                    {g.label}
                  </h3>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {g.orgs.map((o) => (
                      <li key={o.id} className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-4">
                        <h4 className="text-sm leading-snug font-semibold text-foreground">
                          <Ext href={o.url}>{o.name}</Ext>
                        </h4>
                        {o.where.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {o.where.slice(0, 3).join(" · ")}
                          </p>
                        )}
                        <p className="text-sm leading-relaxed text-ink">
                          {o.description.length > 220
                            ? o.description.slice(0, 217).trimEnd() + "…"
                            : o.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sources */}
        <section className="border-t border-border bg-muted">
          <div className="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-muted-foreground sm:px-6">
            <h2 className="text-sm font-semibold tracking-wide uppercase">Sources</h2>
            <ul className="mt-3 space-y-1.5">
              {Object.values(sourceLabels).map((s) => (
                <li key={s}><RichText text={s} /></li>
              ))}
            </ul>
            <p className="mt-4 text-base text-ink">
              Not sure which of these fits you?{" "}
              <a href="https://meetings.hubspot.com/curtis-hoffmann" rel="noopener" target="_blank" className="font-medium text-primary underline-offset-4 hover:underline">
                Schedule a free conversation with Curtis
              </a>{" "}
              about education and career paths.
            </p>
            <p className="mt-4">
              Looking for what to study first? See{" "}
              <Link href="/learn/" className="font-medium text-primary underline-offset-4 hover:underline">
                Where to learn
              </Link>
              . Need money for study, research, or a project? See{" "}
              <Link href="/funding/" className="font-medium text-primary underline-offset-4 hover:underline">
                Funding
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
