import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/features/site-footer";
import { SiteHeader } from "@/components/features/site-header";
import { categories } from "@/lib/pathways";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-muted">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <p className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">404</p>
            <h1 className="max-w-3xl font-heading text-3xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl">
              That page is not here.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink">
              The address may have changed when the site was reorganized, or there may be a typo in the link. Everything
              on the site is reachable from the four pages below.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/">
                  Home
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild><Link href="/roles/">All roles</Link></Button>
              <Button size="lg" variant="outline" asChild><Link href="/get-started/">Get started</Link></Button>
              <Button size="lg" variant="outline" asChild><Link href="/learn/">Learn</Link></Button>
              <Button size="lg" variant="outline" asChild><Link href="/funding/">Funding</Link></Button>
            </div>
          </div>
        </section>
        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Career pathways</h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/pathways/${c.id}/`} className="block rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
