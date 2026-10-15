import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryIcon } from "@/components/features/category-icon";
import { PageIntro } from "@/components/features/page-intro";
import { SiteFooter } from "@/components/features/site-footer";
import { SiteHeader } from "@/components/features/site-header";
import { categories } from "@/lib/pathways";
import { medianPayShort, roles, roleSlug } from "@/lib/roles";
import { SITE_NAME, absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `All ${roles.length} roles: what they do and what they pay`,
  description: `Every core role in outbreak science and biosecurity, grouped by career track, with US median pay from the Bureau of Labor Statistics: epidemiologists, biostatisticians, virologists, biosurveillance analysts, biosecurity specialists, logisticians, risk communicators, and more.`,
  alternates: { canonical: absUrl("/roles/") },
  openGraph: {
    images: [{ url: absUrl("/opengraph-image.png"), width: 1200, height: 630, alt: SITE_NAME }],
    url: absUrl("/roles/"),
    title: `All ${roles.length} roles: what they do and what they pay — ${SITE_NAME}`,
    description: "Every core role in outbreak science and biosecurity, grouped by career track, with US median pay.",
  },
};

export default function RolesIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Roles in outbreak science and biosecurity",
    numberOfItems: roles.length,
    itemListElement: roles.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: r.name, url: absUrl(`/roles/${r.slug}/`) })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main className="flex-1">
        <PageIntro
          eyebrow="Roles"
          title="Every role, one page each"
          lede={
            <>
              The {roles.length} core roles across the ten career tracks, each with a plain-language description,
              US pay and outlook figures, how people get in, and where to learn. Related roles that branch
              off from these are listed on the track pages.
            </>
          }
        />
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="space-y-12">
            {categories.map((c) => (
              <section key={c.id} id={c.id} className="scroll-mt-24">
                <div className="flex items-center gap-4">
                  <CategoryIcon name={c.icon} />
                  <div>
                    <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                      <Link href={`/pathways/${c.id}/`} className="hover:text-primary">{c.title}</Link>
                    </h2>
                    <p className="text-sm text-muted-foreground">{c.tagline}</p>
                  </div>
                </div>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {c.roles.map((name) => {
                    const r = roles.find((x) => x.name === name)!;
                    const pay = medianPayShort(r.detail.bls);
                    return (
                      <li key={name}>
                        <Link
                          href={`/roles/${roleSlug(name)}/`}
                          className="group flex h-full flex-col gap-1.5 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md motion-reduce:transition-none"
                        >
                          <span className="font-heading text-base font-semibold text-foreground group-hover:text-primary">{name}</span>
                          <span className="text-sm text-muted-foreground">
                            {pay ? `Median ${pay}${r.detail.bls?.closest ? " (nearest US category)" : ""}` : "No US pay figure"}
                          </span>
                          <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                            Read the profile <ArrowRight className="size-3.5" aria-hidden="true" />
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
          <p className="mt-12 text-sm text-muted-foreground">
            Pay and outlook figures are US medians for the whole occupation from the{" "}
            <a href="https://www.bls.gov/ooh/" rel="noopener" target="_blank" className="font-medium text-primary underline-offset-4 hover:underline">Bureau of Labor Statistics Occupational Outlook Handbook</a>
            , May 2025 data, not for biosecurity work specifically.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
