import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CategoryIcon } from "@/components/features/category-icon";
import { MatchedResources } from "@/components/features/matched-resources";
import { RichText } from "@/components/features/rich-text";
import { SiteFooter } from "@/components/features/site-footer";
import { SiteHeader } from "@/components/features/site-header";
import { SITE_NAME, absUrl } from "@/lib/site";
import {
  blsPageDate,
  getRole,
  getRoleNeighbours,
  medianPayNumber,
  medianPayShort,
  roleSummary,
  roles,
  roleSlug,
} from "@/lib/roles";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) return {};
  const pay = medianPayShort(role.detail.bls);
  const title = `${role.name}: what they do, pay, and how to get in`;
  const description = `${roleSummary(role)} ${pay ? `US median pay ${pay} a year (BLS). ` : ""}Part of the ${role.category.title} track in outbreak science and biosecurity.`.slice(0, 300);
  return {
    title,
    description,
    alternates: { canonical: absUrl(`/roles/${role.slug}/`) },
    openGraph: {
      images: [{ url: absUrl("/opengraph-image.png"), width: 1200, height: 630, alt: SITE_NAME }],
      url: absUrl(`/roles/${role.slug}/`),
      title: `${title} — ${SITE_NAME}`,
      description,
      type: "article",
    },
  };
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} rel="noopener" target="_blank" className="font-medium text-primary underline-offset-4 hover:underline">
      {children}
      <ExternalLink className="ml-0.5 inline size-3.5 align-[-0.125em]" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default async function RolePage({ params }: { params: Params }) {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) notFound();
  const c = role.category;
  const bls = role.detail.bls;
  const hasFacts = !!(bls && !bls.pending && bls.medianPay);
  const median = medianPayNumber(bls);
  const { prev, next } = getRoleNeighbours(role.slug);
  const siblings = c.roles.filter((n) => n !== role.name);
  const summary = roleSummary(role);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: absUrl("/") },
          { "@type": "ListItem", position: 2, name: "Roles", item: absUrl("/roles/") },
          { "@type": "ListItem", position: 3, name: c.title, item: absUrl(`/pathways/${c.id}/`) },
          { "@type": "ListItem", position: 4, name: role.name, item: absUrl(`/roles/${role.slug}/`) },
        ],
      },
      {
        "@type": "Occupation",
        name: role.name,
        description: summary,
        mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(`/roles/${role.slug}/`), lastReviewed: "2026-10-15" },
        occupationLocation: [{ "@type": "Country", name: "United States" }],
        ...(bls?.occupation ? { occupationalCategory: bls.occupation } : {}),
        ...(bls?.education ? { educationRequirements: { "@type": "EducationalOccupationalCredential", credentialCategory: bls.education } } : {}),
        ...(median
          ? {
              estimatedSalary: [
                {
                  "@type": "MonetaryAmountDistribution",
                  name: `Median annual pay, US, May 2025 (BLS, ${bls!.occupation})`,
                  currency: "USD",
                  duration: "P1Y",
                  median,
                },
              ],
            }
          : {}),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-muted">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm">
              <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/roles/" className="hover:text-foreground">Roles</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href={`/pathways/${c.id}/`} className="hover:text-foreground">{c.title}</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground" aria-current="page">{role.name}</li>
              </ol>
            </nav>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              <CategoryIcon name={c.icon} size="lg" />
              <div className="max-w-3xl">
                <p className="mb-2 text-sm font-semibold tracking-wide text-primary uppercase">
                  Career in {c.title}
                </p>
                <h1 className="font-heading text-3xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl">
                  {role.name}
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-ink">{summary}</p>
                {role.detail.summarySource && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Definition: <Ext href="https://www.cdc.gov/nerd-academy/careers/index.html">{role.detail.summarySource}</Ext>
                  </p>
                )}
                {hasFacts && (
                  <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Median pay</dt>
                      <dd className="mt-1 font-heading text-xl font-semibold text-foreground">{medianPayShort(bls)}</dd>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Entry education</dt>
                      <dd className="mt-1 text-base font-medium text-foreground">{bls!.education}</dd>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Outlook 2025–35</dt>
                      <dd className="mt-1 text-base font-medium text-foreground">{bls!.outlook?.replace(/ growth.*$/, " growth")}</dd>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">US jobs</dt>
                      <dd className="mt-1 text-base font-medium text-foreground">{bls!.jobs?.replace(/ \(\d{4}\)$/, "")}</dd>
                    </div>
                  </dl>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_20rem]">
          <article className="space-y-12">
            <section id="snapshot" className="scroll-mt-24">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">US labor-market snapshot</h2>
              {hasFacts ? (
                <>
                  <p className="mt-3 text-base leading-relaxed text-ink">
                    {bls!.closest ? (
                      <>
                        The Bureau of Labor Statistics does not track <em>{role.name}</em> as its own occupation. The nearest category is{" "}
                        <strong>{bls!.occupation}</strong>, so the figures below describe that wider group, not biosecurity work specifically.
                      </>
                    ) : (
                      <>
                        Figures for <strong>{bls!.occupation}</strong> across the whole US economy, not for outbreak or biosecurity work specifically.
                      </>
                    )}
                  </p>
                  <dl className="mt-5 grid gap-x-6 gap-y-3 rounded-xl border border-border bg-card p-5 text-sm shadow-sm sm:grid-cols-2">
                    <div><dt className="font-medium text-foreground">Median pay</dt><dd className="text-ink">{bls!.medianPay}</dd></div>
                    <div><dt className="font-medium text-foreground">Typical entry education</dt><dd className="text-ink">{bls!.education}</dd></div>
                    <div><dt className="font-medium text-foreground">Job outlook</dt><dd className="text-ink">{bls!.outlook}</dd></div>
                    <div><dt className="font-medium text-foreground">Jobs in the US</dt><dd className="text-ink">{bls!.jobs}</dd></div>
                    {bls!.whatTheyDo && (
                      <div className="sm:col-span-2"><dt className="font-medium text-foreground">What they do</dt><dd className="text-ink">{bls!.whatTheyDo}</dd></div>
                    )}
                  </dl>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Source: <Ext href={bls!.url}>BLS Occupational Outlook Handbook, {bls!.occupation}</Ext>, page last modified {blsPageDate}. Medians are for May 2025; projections cover 2025–35. Not a promise about any particular job.
                  </p>
                </>
              ) : (
                <p className="mt-3 text-base leading-relaxed text-ink">
                  No US handbook occupation matches this role closely enough to quote pay or outlook figures.
                </p>
              )}
            </section>

            {c.work && c.work.length > 0 && (
              <section id="work" className="scroll-mt-24">
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">What the work looks like</h2>
                <p className="mt-2 text-sm text-muted-foreground">Typical work across the {c.title} track; most of it will be familiar to a {role.name}.</p>
                <ul className="mt-5 space-y-3">
                  {c.work.map((line) => (
                    <li key={line} className="flex gap-3 text-base leading-relaxed text-ink">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <RichText text={line} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {c.entry && c.entry.length > 0 && (
              <section id="entry" className="scroll-mt-24">
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">How people get in</h2>
                <ul className="mt-5 space-y-3">
                  {c.entry.map((line) => (
                    <li key={line} className="flex gap-3 text-base leading-relaxed text-ink">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <RichText text={line} />
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-ink">
                  Named programs, fellowships, and degrees are on{" "}
                  <Link href="/get-started/" className="font-medium text-primary underline-offset-4 hover:underline">Get started</Link>; money for study and research is on{" "}
                  <Link href="/funding/" className="font-medium text-primary underline-offset-4 hover:underline">Funding</Link>.
                </p>
              </section>
            )}

            <section id="related" className="scroll-mt-24">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Related roles</h2>
              {siblings.length > 0 && (
                <>
                  <h3 className="mt-5 mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">Other core roles in {c.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {siblings.map((n) => (
                      <Badge key={n} variant="outline" asChild className="h-auto bg-background px-2.5 py-1 text-xs font-medium whitespace-normal">
                        <Link href={`/roles/${roleSlug(n)}/`}>{n}</Link>
                      </Badge>
                    ))}
                  </div>
                </>
              )}
              {c.relatedRoles.length > 0 && (
                <>
                  <h3 className="mt-6 mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">Roles that branch off</h3>
                  <div className="flex flex-wrap gap-2">
                    {c.relatedRoles.map((n) => (
                      <Badge key={n} variant="secondary" className="h-auto px-2.5 py-1 text-xs font-normal whitespace-normal">{n}</Badge>
                    ))}
                  </div>
                </>
              )}
            </section>

            <MatchedResources tags={c.learnTags ?? []} />
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">This role’s track</h2>
              <p className="mt-3 text-sm text-ink">
                <Link href={`/pathways/${c.id}/`} className="font-semibold text-primary underline-offset-4 hover:underline">{c.title}</Link>
                {" "}· {c.tagline}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {c.roles.map((n) => (
                  <li key={n}>
                    {n === role.name ? (
                      <span className="font-semibold text-foreground">{n}</span>
                    ) : (
                      <Link href={`/roles/${roleSlug(n)}/`} className="text-ink hover:text-primary">{n}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Keep exploring</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/roles/" className="font-medium text-primary underline-offset-4 hover:underline">All {roles.length} roles</Link></li>
                <li><Link href="/get-started/" className="font-medium text-primary underline-offset-4 hover:underline">Get started: fellowships, programs, and first steps</Link></li>
                <li><Link href="/learn/" className="font-medium text-primary underline-offset-4 hover:underline">Learn: free courses and training materials</Link></li>
                <li><Link href="/funding/" className="font-medium text-primary underline-offset-4 hover:underline">Funding: grants, fellowships, and who pays</Link></li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Not sure this is the one?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink">Book a free conversation with Curtis about paths into this work.</p>
              <Button size="sm" className="mt-3" asChild>
                <a href="https://meetings.hubspot.com/curtis-hoffmann" rel="noopener" target="_blank">
                  Schedule a conversation
                  <CalendarDays data-icon="inline-end" />
                </a>
              </Button>
            </div>
          </aside>
        </div>

        <Separator />
        <nav aria-label="Browse roles" className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Button variant="outline" asChild>
            <Link href={`/roles/${prev.slug}/`}><ChevronLeft data-icon="inline-start" />{prev.name}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/roles/"><ArrowLeft data-icon="inline-start" />All roles</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/roles/${next.slug}/`}>{next.name}<ChevronRight data-icon="inline-end" /></Link>
          </Button>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
