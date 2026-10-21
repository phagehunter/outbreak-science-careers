import type { Metadata } from "next";
import { ArrowDown, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CareerVisualizer } from "@/components/features/career-visualizer";
import { SiteFooter } from "@/components/features/site-footer";
import { SiteHeader } from "@/components/features/site-header";
import { SITE_DESCRIPTION, SITE_TITLE, absUrl } from "@/lib/site";
import { categories, totalRoles } from "@/lib/pathways";
import { Faq, faqJsonLd } from "@/components/features/faq";
import { roles } from "@/lib/roles";
import routesData from "@/data/entry-routes.json";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: absUrl("/") },
  openGraph: { images: [{ url: absUrl("/opengraph-image.png"), width: 1200, height: 630, alt: "Outbreak Science Careers" }], url: absUrl("/"), title: SITE_TITLE, description: SITE_DESCRIPTION },
};

const roleCount = categories.reduce((n, c) => n + totalRoles(c), 0);

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      <SiteHeader />

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-muted">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--accent),transparent_60%)]"
          />
          <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <p className="mb-4 text-sm font-semibold tracking-wide text-primary uppercase">
              Outbreak science &amp; biosecurity
            </p>
            <h1 className="max-w-3xl font-heading text-4xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Your path into the fight against the next outbreak
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">
              Outbreak science is about as interdisciplinary as a field can
              get. Explore {categories.length} career tracks and {roleCount} roles, from
              epidemiology and the laboratory to policy, logistics, and
              communication, and find where your skills fit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#pathways">
                  Explore the pathways
                  <ArrowDown data-icon="inline-end" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#about">Who this is for</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Pathways */}
        <section
          id="pathways"
          className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="mb-10 max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Career pathways
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink">
              Pick a track to see the roles inside it. Every track needs
              people, and most careers in this field cross between several of
              them.
            </p>
          </div>
          <CareerVisualizer />
        </section>

        {/* What is outbreak science */}
        <section id="what-is" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
                What is outbreak science?
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-ink lg:col-span-2">
              <p>
                Outbreak science is the work of preventing, detecting, and responding to outbreaks of infectious
                disease, whether they arise naturally, by accident, or deliberately. Epidemiologists find cases and
                trace spread; laboratory scientists identify the pathogen; clinicians treat patients; data specialists
                turn signals into warnings; policy and biosecurity staff set the rules and budgets; logisticians move
                supplies; communicators keep the public informed. Biosecurity is the part of this field that guards
                against misuse of biology and keeps dangerous pathogens contained.
              </p>
              <p>
                No single degree covers it, which is the point of this guide: {categories.length} tracks,{" "}
                {roles.length} core roles with pay and outlook figures, {routesData.routes.length} named ways in,
                and the funders behind the work.
              </p>
              <dl className="grid grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Tracks</dt>
                  <dd className="mt-1 font-heading text-2xl font-semibold text-foreground">{categories.length}</dd>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Core roles</dt>
                  <dd className="mt-1 font-heading text-2xl font-semibold text-foreground">{roles.length}</dd>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Ways in</dt>
                  <dd className="mt-1 font-heading text-2xl font-semibold text-foreground">{routesData.routes.length}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="scroll-mt-20 border-t border-border bg-muted"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
                Who this is for
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-ink lg:col-span-2">
              <p>
                This guide is for students, early-career scientists, clinicians,
                and career changers who want to work on preventing, detecting,
                and responding to outbreaks, whether natural, accidental, or
                deliberate.
              </p>
              <p>
                It&apos;s patterned after the{" "}
                <a
                  href="https://emergingtechpolicy.org"
                  rel="noopener"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Emerging Technology Policy Careers
                </a>{" "}
                site by the Horizon Institute, which covers the policy side of
                this landscape in depth.
              </p>
              <p>
                Why ten tracks rather than one? When the World Health
                Organization rewrote its{" "}
                <a href="https://www.ncbi.nlm.nih.gov/books/NBK143067/" rel="noopener" target="_blank" className="font-medium text-primary underline-offset-4 hover:underline">
                  pandemic preparedness guidance
                </a>
                , it built the plan on a whole-of-society principle: government
                leads, but the health sector, other sectors, and communities
                each carry responsibilities of their own. The US CDC teaches
                high-school students the{" "}
                <a href="https://www.cdc.gov/nerd-academy/careers/index.html" rel="noopener" target="_blank" className="font-medium text-primary underline-offset-4 hover:underline">
                  same lesson
                </a>
                : during an outbreak investigation, experts work as a team, each
                bringing different skills to the shared goal of stopping the
                spread. Engineers,
                logisticians, journalists, and counselors belong here beside
                epidemiologists and virologists.
              </p>
              <p className="text-sm text-muted-foreground">
                Disclaimer: Role lists are a starting point, not a complete
                census.
              </p>
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                  Want to talk it through?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-balance text-ink">
                  Book a free conversation with Curtis about education and
                  career paths in outbreak science.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button asChild>
                    <a href="https://meetings.hubspot.com/curtis-hoffmann" rel="noopener" target="_blank">
                      Schedule a conversation
                      <CalendarDays data-icon="inline-end" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:curtis@operationoutbreak.org">Email Curtis</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="mb-8 max-w-2xl">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Questions people ask first
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink">
                Short answers with links to the longer ones. Figures come from the Bureau of Labor Statistics and
                the programs listed on this site.
              </p>
            </div>
            <Faq />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
