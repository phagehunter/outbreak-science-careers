import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { roleSlug } from "@/lib/roles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import details from "@/data/role-details.json";

type Bls = {
  occupation: string;
  url: string;
  medianPay?: string;
  education?: string;
  outlook?: string;
  jobs?: string;
  whatTheyDo?: string;
  closest?: boolean;
  pending?: boolean;
};
type Detail = { summary?: string | null; summarySource?: string; bls?: Bls };

const roles = details.roles as Record<string, Detail>;

/** Core roles of a track as an accordion: plain-language summary + BLS quick facts. */
export function RoleList({ names }: { names: string[] }) {
  return (
    <Accordion type="multiple" className="rounded-xl border border-border bg-card px-5 shadow-sm">
      {names.map((name) => {
        const d = roles[name];
        const bls = d?.bls;
        const hasFacts = bls && !bls.pending && bls.medianPay;
        return (
          <AccordionItem key={name} value={name}>
            <AccordionTrigger className="py-4 text-left hover:no-underline">
              <span className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-1 pr-2">
                <span className="text-base font-semibold text-foreground">{name}</span>
                {hasFacts && (
                  <span className="text-sm font-normal text-muted-foreground">
                    median {bls.medianPay!.replace(/ per year.*$/, "")}
                    {bls.closest ? " (nearest US category)" : " (US)"}
                  </span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-5">
              {d?.summary && (
                <p className="text-base leading-relaxed text-ink">{d.summary}</p>
              )}
              {d?.summarySource && (
                <p className="text-xs text-muted-foreground">
                  Definition:{" "}
                  <a href="https://www.cdc.gov/nerd-academy/careers/index.html" rel="noopener" target="_blank" className="font-medium text-primary underline-offset-4 hover:underline">
                    {d.summarySource}
                  </a>
                  .
                </p>
              )}
              {hasFacts ? (
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    US labor-market snapshot
                    {bls.closest && (
                      <Badge variant="outline" className="ml-2 align-middle text-[11px] font-normal normal-case tracking-normal">
                        nearest category: {bls.occupation}
                      </Badge>
                    )}
                  </p>
                  <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="font-medium text-foreground">Median pay</dt>
                      <dd className="text-ink">{bls.medianPay}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Typical entry education</dt>
                      <dd className="text-ink">{bls.education}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Job outlook</dt>
                      <dd className="text-ink">{bls.outlook}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Jobs in the US</dt>
                      <dd className="text-ink">{bls.jobs}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-xs text-muted-foreground">
                    <a
                      href={bls.url}
                      rel="noopener"
                      target="_blank"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      BLS Occupational Outlook Handbook: {bls.occupation}
                      <ExternalLink className="ml-0.5 inline size-3 align-[-0.125em]" aria-hidden="true" />
                    </a>
                    . Page last modified 27 Aug 2026.
                  </p>
                </div>
              ) : bls?.pending ? (
                <p className="text-sm text-muted-foreground">
                  US figures for this role come under{" "}
                  <a
                    href={bls.url}
                    rel="noopener"
                    target="_blank"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {bls.occupation}
                    <ExternalLink className="ml-0.5 inline size-3 align-[-0.125em]" aria-hidden="true" />
                  </a>{" "}
                  in the BLS handbook; figures for this role are not quoted here.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No US handbook occupation matches this role closely enough
                  to quote pay or outlook figures.
                </p>
              )}
              <p className="text-sm">
                <Link href={`/roles/${roleSlug(name)}/`} className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline">
                  Full profile: {name}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
