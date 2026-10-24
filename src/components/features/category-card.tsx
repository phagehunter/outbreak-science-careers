import { ArrowRight } from "lucide-react";
import { CategoryIcon } from "./category-icon";
import { totalRoles, type Category } from "@/lib/pathways";

type Props = {
  category: Category;
  onSelect: (id: string) => void;
};

export function CategoryCard({ category, onSelect }: Props) {
  const total = totalRoles(category);
  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      aria-haspopup="dialog"
      className="group flex h-full w-full flex-col items-start gap-4 rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <CategoryIcon
        name={category.icon}
        className="group-hover:bg-primary group-hover:text-primary-foreground"
      />
      <div className="flex flex-1 flex-col gap-1.5">
        <h3 className="font-heading text-base leading-snug font-semibold text-foreground">
          {category.title}
        </h3>
        <p className="balance-text text-sm leading-relaxed text-ink">{category.tagline}</p>
      </div>
      <div className="flex w-full items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {total} {total === 1 ? "role" : "roles"}
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-primary">
          Explore
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </span>
      </div>
    </button>
  );
}
