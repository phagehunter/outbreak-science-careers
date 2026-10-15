"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { categories } from "@/lib/pathways";
import { roleSlug } from "@/lib/roles";
import { CategoryCard } from "./category-card";
import { CategoryIcon } from "./category-icon";

export function CareerVisualizer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const index = categories.findIndex((c) => c.id === selectedId);
  const selected = index >= 0 ? categories[index] : null;

  const step = (delta: number) => {
    if (index < 0) return;
    const next = (index + delta + categories.length) % categories.length;
    setSelectedId(categories[next].id);
  };

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {categories.map((category) => (
          <li key={category.id} className="h-full">
            <CategoryCard category={category} onSelect={setSelectedId} />
          </li>
        ))}
      </ul>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => !open && setSelectedId(null)}
      >
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
          {selected && (
            <>
              <DialogHeader className="items-start text-left">
                <CategoryIcon name={selected.icon} size="lg" className="mb-2" />
                <DialogTitle className="font-heading text-2xl tracking-tight text-foreground">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="text-base leading-relaxed text-ink">
                  {selected.description}
                </DialogDescription>
              </DialogHeader>

              <section className="mt-2">
                <h4 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  Career options
                </h4>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {selected.roles.map((role) => (
                    <li key={role}>
                      <Link
                        href={`/roles/${roleSlug(role)}/`}
                        className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
                        />
                        {role}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              {selected.relatedRoles.length > 0 && (
                <section className="mt-4">
                  <h4 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                    Related roles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.relatedRoles.map((role) => (
                      <Badge
                        key={role}
                        variant="secondary"
                        className="h-auto px-2.5 py-1 text-xs font-normal whitespace-normal"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}

              <div className="mt-6">
                <Button asChild>
                  <Link href={`/pathways/${selected.id}/`}>
                    Read the full guide
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </div>

              <nav
                aria-label="Browse categories"
                className="mt-6 flex items-center justify-between border-t border-border pt-4"
              >
                <Button variant="outline" size="sm" onClick={() => step(-1)}>
                  <ChevronLeft data-icon="inline-start" />
                  Previous
                </Button>
                <span className="text-xs text-muted-foreground">
                  {index + 1} of {categories.length}
                </span>
                <Button variant="outline" size="sm" onClick={() => step(1)}>
                  Next
                  <ChevronRight data-icon="inline-end" />
                </Button>
              </nav>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
