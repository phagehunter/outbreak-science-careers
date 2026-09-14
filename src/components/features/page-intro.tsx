import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  lede: ReactNode;
  children?: ReactNode;
};

/** Standard page opener: eyebrow, h1, one-paragraph lede, on the warm surface. */
export function PageIntro({ eyebrow, title, lede, children }: Props) {
  return (
    <section className="border-b border-border bg-muted">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl font-heading text-3xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink">{lede}</p>
        {children}
      </div>
    </section>
  );
}
