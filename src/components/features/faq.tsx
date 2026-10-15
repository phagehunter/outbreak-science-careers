import Link from "next/link";
import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import routesData from "@/data/entry-routes.json";
import programsData from "@/data/programs.json";
import fundingData from "@/data/funding.json";
import { categories } from "@/lib/pathways";
import { medianPayShort, roles } from "@/lib/roles";
import { absUrl } from "@/lib/site";

/*
 * Home-page FAQ. Answers are drafted from the site's own sources (WHO pandemic
 * guidance, CDC NERD Academy, the BLS Occupational Outlook Handbook, and the
 * routes, programs, and funders listed on this site). Figures are computed from
 * the data files so they cannot drift. Each entry carries a plain-text version
 * of the answer for the FAQPage structured data.
 *
 * STATUS: drafted 15 October 2026; awaiting Curtis's review like all site copy.
 */

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} rel="noopener" target="_blank" className="font-medium text-primary underline-offset-4 hover:underline">
      {children}
      <ExternalLink className="ml-0.5 inline size-3.5 align-[-0.125em]" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
function In({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-medium text-primary underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}

const epi = roles.find((r) => r.name === "Epidemiologist");
const epiPay = medianPayShort(epi?.detail.bls);
const epiOutlook = epi?.detail.bls?.outlook?.replace(/ growth.*$/, "");
const epiJobs = epi?.detail.bls?.jobs?.replace(/ \(\d{4}\)$/, "");

/** Roles with the fastest BLS-projected growth, from role-details.json. */
const growth = roles
  .map((r) => ({ r, pct: Number(r.detail.bls?.outlook?.match(/^(-?\d+)%/)?.[1] ?? NaN) }))
  .filter((x) => !Number.isNaN(x.pct))
  .sort((a, b) => b.pct - a.pct);
const fastest = growth.slice(0, 4);
const schoolRoutes = routesData.routes.filter((r) => r.stage === "school");
const studyFunders = fundingData.sources.filter((s) => s.stage === "study");

export type FaqItem = { id: string; question: string; answer: ReactNode; plain: string };

export const faqItems: FaqItem[] = [
  {
    id: "what-is-outbreak-science",
    question: "What is outbreak science?",
    plain: `Outbreak science is the work of preventing, detecting, and responding to outbreaks of infectious disease, whether they arise naturally, by accident, or deliberately. It is not one profession but a team of them: epidemiologists who find cases and trace spread, laboratory scientists who identify the pathogen, clinicians who treat patients, data specialists who turn signals into warnings, policy and biosecurity staff who set rules and budgets, logisticians who move supplies, and communicators who keep the public informed. The World Health Organization's pandemic preparedness guidance is built on this whole-of-society idea: government leads, but the health sector, other sectors, and communities each carry responsibilities of their own. This site organizes the field into ${categories.length} career tracks and ${roles.length} core roles.`,
    answer: (
      <>
        <p>
          Outbreak science is the work of preventing, detecting, and responding to outbreaks of infectious disease,
          whether they arise naturally, by accident, or deliberately. It is not one profession but a team of them:
          epidemiologists who find cases and trace spread, laboratory scientists who identify the pathogen, clinicians
          who treat patients, data specialists who turn signals into warnings, policy and biosecurity staff who set rules
          and budgets, logisticians who move supplies, and communicators who keep the public informed.
        </p>
        <p>
          The World Health Organization&apos;s{" "}
          <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK143067/">pandemic preparedness guidance</Ext> is built on
          this whole-of-society idea: government leads, but the health sector, other sectors, and communities each carry
          responsibilities of their own. This site organizes the field into{" "}
          <In href="/#pathways">{categories.length} career tracks</In> and <In href="/roles/">{roles.length} core roles</In>.
        </p>
      </>
    ),
  },
  {
    id: "outbreak-science-vs-biosecurity",
    question: "How is biosecurity different from outbreak science?",
    plain: "Biosecurity is the part of the field concerned with preventing the misuse of biology and with keeping dangerous pathogens contained: laboratory biosafety and biosecurity, screening of DNA synthesis orders, export controls, the Biological Weapons Convention, and defenses against deliberate or engineered threats. Outbreak science is wider and includes natural outbreaks, clinical care, and public health response. The two overlap heavily; many people move between them, and the same tracks on this site (policy, research, engineering, data) serve both.",
    answer: (
      <>
        <p>
          Biosecurity is the part of the field concerned with preventing the misuse of biology and with keeping
          dangerous pathogens contained: laboratory biosafety and biosecurity, screening of DNA synthesis orders, export
          controls, the Biological Weapons Convention, and defenses against deliberate or engineered threats. Outbreak
          science is wider and includes natural outbreaks, clinical care, and public health response.
        </p>
        <p>
          The two overlap heavily; many people move between them, and the same tracks on this site (
          <In href="/pathways/policy/">policy</In>, <In href="/pathways/research/">research</In>,{" "}
          <In href="/pathways/engineering/">engineering</In>, <In href="/pathways/data-tech/">data</In>) serve both.
        </p>
      </>
    ),
  },
  {
    id: "do-i-need-an-mph",
    question: "Do I need a medical degree or a master of public health (MPH)?",
    plain: `Not for most of the field. Epidemiologists typically enter with a master's degree, often an MPH; clinical roles need the relevant clinical license; many research roles expect a PhD; but biomedical engineers, logisticians, data scientists, communicators, and policy analysts usually start with a bachelor's degree and build from there. The US Bureau of Labor Statistics lists the typical entry education for each occupation, and this site shows it on every role page. Several named programs, such as CDC's Public Health Associate Program, admit people with a bachelor's degree and train them on the job.`,
    answer: (
      <>
        <p>
          Not for most of the field. Epidemiologists typically enter with a master&apos;s degree, often an MPH; clinical
          roles need the relevant clinical license; many research roles expect a PhD; but biomedical engineers,
          logisticians, data scientists, communicators, and policy analysts usually start with a bachelor&apos;s degree
          and build from there.
        </p>
        <p>
          The US Bureau of Labor Statistics lists the typical entry education for each occupation, and this site shows
          it on <In href="/roles/">every role page</In>. Several named programs, such as CDC&apos;s Public Health Associate
          Program, admit people with a bachelor&apos;s degree and train them on the job; see{" "}
          <In href="/get-started/#early">Get started</In>.
        </p>
      </>
    ),
  },
  {
    id: "epidemiologist-salary",
    question: "How much do epidemiologists make?",
    plain: `The US median pay for epidemiologists was ${epiPay} a year in May 2025, according to the Bureau of Labor Statistics, with ${epiJobs} jobs and projected growth of ${epiOutlook} between 2025 and 2035, much faster than the average for all occupations. Pay varies widely by employer: state and local health departments, federal agencies such as CDC, universities, hospitals, and industry. These are figures for the whole occupation, not for outbreak work specifically.`,
    answer: (
      <>
        <p>
          The US median pay for epidemiologists was <strong>{epiPay}</strong> a year in May 2025, according to the{" "}
          <Ext href={epi?.detail.bls?.url ?? "https://www.bls.gov/ooh/"}>Bureau of Labor Statistics</Ext>, with {epiJobs}{" "}
          jobs and projected growth of {epiOutlook} between 2025 and 2035, much faster than the average for all
          occupations.
        </p>
        <p>
          Pay varies widely by employer: state and local health departments, federal agencies such as CDC,
          universities, hospitals, and industry. These are figures for the whole occupation, not for outbreak work
          specifically. See the <In href="/roles/epidemiologist/">epidemiologist profile</In> for the full snapshot.
        </p>
      </>
    ),
  },
  {
    id: "fastest-growing-roles",
    question: "Which roles in this field are growing fastest?",
    plain: `By the Bureau of Labor Statistics' 2025–35 projections for the nearest US occupation, the fastest-growing core roles on this site are ${fastest.map((x) => `${x.r.name} (${x.pct}%)`).join(", ")}. Projections describe the whole occupation, not outbreak work alone, and growth rates say nothing about how many openings there are: a large occupation growing slowly can still hire more people than a small one growing fast.`,
    answer: (
      <>
        <p>
          By the Bureau of Labor Statistics&apos; 2025–35 projections for the nearest US occupation, the fastest-growing
          core roles on this site are{" "}
          {fastest.map((x, i) => (
            <span key={x.r.slug}>
              {i > 0 && (i === fastest.length - 1 ? ", and " : ", ")}
              <In href={`/roles/${x.r.slug}/`}>{x.r.name}</In> ({x.pct}%)
            </span>
          ))}
          .
        </p>
        <p>
          Projections describe the whole occupation, not outbreak work alone, and growth rates say nothing about how
          many openings there are: a large occupation growing slowly can still hire more people than a small one
          growing fast. Every <In href="/roles/">role page</In> shows the number of jobs alongside the growth rate.
        </p>
      </>
    ),
  },
  {
    id: "start-in-school",
    question: "How can I get started while I am still in school?",
    plain: `You do not need a degree to begin. This site lists ${schoolRoutes.length} routes open to students, several of them free: Operation Outbreak's classroom outbreak simulations, CDC's student internships, the iGEM synthetic-biology competition, BlueDot Impact's Biosecurity Fundamentals course, and the University of Bath's online biosecurity course. Start with something short to find out whether the field holds your attention, then pick a track.`,
    answer: (
      <>
        <p>
          You do not need a degree to begin. This site lists {schoolRoutes.length} routes open to students, several of
          them free: Operation Outbreak&apos;s classroom outbreak simulations, CDC&apos;s student internships, the iGEM
          synthetic-biology competition, BlueDot Impact&apos;s Biosecurity Fundamentals course, and the University of
          Bath&apos;s online biosecurity course.
        </p>
        <p>
          Start with something short to find out whether the field holds your attention, then pick a track. The{" "}
          <In href="/get-started/#school">school and undergraduate</In> section of Get started and the{" "}
          <In href="/learn/#start">Start here</In> list on Learn are built for exactly this.
        </p>
      </>
    ),
  },
  {
    id: "funding-for-study",
    question: "Is there funding to study or train in this field?",
    plain: `Yes. The Funding page lists ${fundingData.sources.length} funders, ${studyFunders.length} of them for paying for study: the NSF Graduate Research Fellowship, NIH F31 and F32 fellowships, BlueDot Impact's career transition and rapid grants, the NIH Oxford-Cambridge Scholars Program, and others, plus ${programsData.programs.length} degree programs built for the field. Many fellowships on Get started are paid positions rather than grants: CDC's Public Health Associate Program and Epidemic Intelligence Service, for example, are salaried two-year posts.`,
    answer: (
      <>
        <p>
          Yes. The <In href="/funding/">Funding page</In> lists {fundingData.sources.length} funders,{" "}
          {studyFunders.length} of them for paying for study: the NSF Graduate Research Fellowship, NIH F31 and F32
          fellowships, BlueDot Impact&apos;s career transition and rapid grants, the NIH Oxford-Cambridge Scholars
          Program, and others, plus <In href="/get-started/#programs">{programsData.programs.length} degree programs</In>{" "}
          built for the field.
        </p>
        <p>
          Many fellowships on Get started are paid positions rather than grants: CDC&apos;s Public Health Associate
          Program and Epidemic Intelligence Service, for example, are salaried two-year posts.
        </p>
      </>
    ),
  },
  {
    id: "where-jobs-are-posted",
    question: "Where are outbreak science and biosecurity jobs posted?",
    plain: "Public health jobs cluster on a few boards: APHA's Public Health CareerMart, ASPPH's Public Health Jobs, and the APHL Career Center for laboratory roles. US federal positions, including CDC epidemiologists, are posted on USAJOBS. WHO recruits through its own careers site, and humanitarian response roles appear on ReliefWeb. For biosecurity specifically, the 80,000 Hours job board tags roles by problem area. The Get started page keeps the current list.",
    answer: (
      <>
        <p>
          Public health jobs cluster on a few boards: APHA&apos;s Public Health CareerMart, ASPPH&apos;s Public Health
          Jobs, and the APHL Career Center for laboratory roles. US federal positions, including CDC epidemiologists,
          are posted on USAJOBS. WHO recruits through its own careers site, and humanitarian response roles appear on
          ReliefWeb. For biosecurity specifically, the 80,000 Hours job board tags roles by problem area.
        </p>
        <p>
          The <In href="/get-started/#jobs">Find jobs</In> section of Get started keeps the current list with links.
        </p>
      </>
    ),
  },
];

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": absUrl("/#faq"),
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.plain },
    })),
  };
}

export function Faq() {
  return (
    <Accordion type="multiple" className="rounded-xl border border-border bg-card px-5 shadow-sm">
      {faqItems.map((f) => (
        <AccordionItem key={f.id} value={f.id} id={f.id} className="scroll-mt-24">
          <AccordionTrigger className="py-4 text-left text-base font-semibold text-foreground hover:no-underline">
            {f.question}
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-5 text-base leading-relaxed text-ink">{f.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
