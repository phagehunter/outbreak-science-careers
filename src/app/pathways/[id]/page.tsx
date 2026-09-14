import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CategoryIcon } from "@/components/features/category-icon";
import { MatchedResources } from "@/components/features/matched-resources";
import { RoleList } from "@/components/features/role-list";
import { RichText } from "@/components/features/rich-text";
import { SITE_NAME, absUrl } from "@/lib/site";
import { SiteFooter } from "@/components/features/site-footer";
import { SiteHeader } from "@/components/features/site-header";
import {
  categories,
  getCategory,
  getNeighbours,
  totalRoles,
} from "@/lib/pathways";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return categories.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const c = getCategory(id);
  if (!c) return {};
  const description = `${c.tagline} ${c.description}`.slice(0, 300);
  return {
    title: `${c.title} careers`,
    description,
    keywords: [c.title, ...c.roles.slice(0, 5), "outbreak science careers", "biosecurity careers"],
    alternates: { canonical: absUrl(`/pathways/${c.id}/`) },
    openGraph: { images: [{ url: absUrl("/opengraph-image.png"), width: 512, height: 512, alt: "Outbreak Science Careers" }], url: absUrl(`/pathways/${c.id}/`), title: `${c.title} careers — Outbreak Science Careers`, description: c.tagline },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { id } = await params;
  const c = getCategory(id);
  if (!c) notFound();
  const { prev, next } = getNeighbours(c.id);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: absUrl("/") },
          { "@type": "ListItem", position: 2, name: "Career pathways", item: absUrl("/#pathways") },
          { "@type": "ListItem", position: 3, name: c.title, item: absUrl(`/pathways/${c.id}/`) },
        ],
      },
      {
        "@type": "Article",
        headline: `${c.title} careers`,
        description: c.tagline,
        url: absUrl(`/pathways/${c.id}/`),
        inLanguage: "en-US",
        author: { "@type": "Person", name: "Curtis Hoffmann", url: "https://curtishoffmann.com" },
        about: c.roles.map((r) => ({ "@type": "Occupation", name: r })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main className="flex-1">
        {/* Guide header */}
        <section className="border-b border-border bg-muted">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm">
              <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/#pathways" className="hover:text-foreground">
                    Career pathways
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground" aria-current="page">
                  {c.title}
                </li>
              </ol>
            </nav>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              <CategoryIcon name={c.icon} size="lg" />
              <div className="max-w-3xl">
                <p className="mb-2 text-sm font-semibold tracking-wide text-primary uppercase">
                  Career pathway
                </p>
                <h1 className="font-heading text-3xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl">
                  {c.title}
                </h1>
                <p className="mt-3 text-lg text-ink">{c.tagline}</p>
                <p className="mt-5 text-base leading-relaxed text-ink">
                  {c.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_20rem]">
          <article className="space-y-12">
            {c.work && c.work.length > 0 && (
              <section id="work" className="scroll-mt-24">
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                  What the work looks like
                </h2>
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

            <section id="roles" className="scroll-mt-24">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                Career options
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {totalRoles(c)} roles in this track. The first group are the
                core options; related roles branch off from them.
              </p>
              <div className="mt-5">
                <RoleList names={c.roles} />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Pay and outlook figures are US medians for the whole
                occupation from the{" "}
                <a href="https://www.bls.gov/ooh/" rel="noopener" target="_blank" className="font-medium text-primary underline-offset-4 hover:underline">
                  Bureau of Labor Statistics Occupational Outlook Handbook
                </a>
                , not for biosecurity work specifically, and not a promise about
                any particular job.
              </p>
              {c.relatedRoles.length > 0 && (
                <>
                  <h3 className="mt-6 mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                    Related roles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {c.relatedRoles.map((role) => (
                      <Badge
                        key={role}
                        variant="secondary"
                        className="h-auto px-2.5 py-1 text-xs font-normal whitespace-normal"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </section>

            {c.entry && c.entry.length > 0 && (
              <section id="entry" className="scroll-mt-24">
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                  How people get in
                </h2>
                <ul className="mt-5 space-y-3">
                  {c.entry.map((line) => (
                    <li key={line} className="flex gap-3 text-base leading-relaxed text-ink">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <RichText text={line} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <MatchedResources tags={c.learnTags ?? []} />
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                Keep exploring
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/get-started/" className="font-medium text-primary underline-offset-4 hover:underline">
                    Get started: fellowships, programs, and first steps
                  </Link>
                </li>
                <li>
                  <Link href="/learn/" className="font-medium text-primary underline-offset-4 hover:underline">
                    Learn: free courses and training materials
                  </Link>
                </li>
                <li>
                  <Link href="/funding/" className="font-medium text-primary underline-offset-4 hover:underline">
                    Funding: grants, fellowships, and who pays for this work
                  </Link>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                All pathways
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm">
                {categories.map((other) => (
                  <li key={other.id}>
                    {other.id === c.id ? (
                      <span className="font-semibold text-foreground">{other.title}</span>
                    ) : (
                      <Link
                        href={`/pathways/${other.id}/`}
                        className="text-ink hover:text-primary"
                      >
                        {other.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <Separator />
        <nav
          aria-label="Browse pathways"
          className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <Button variant="outline" asChild>
            <Link href={`/pathways/${prev.id}/`}>
              <ChevronLeft data-icon="inline-start" />
              {prev.title}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#pathways">
              <ArrowLeft data-icon="inline-start" />
              All pathways
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/pathways/${next.id}/`}>
              {next.title}
              <ChevronRight data-icon="inline-end" />
            </Link>
          </Button>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
