import pathways from "@/data/career-pathways.json";

/** One of the ten career tracks. Optional fields are filled in progressively. */
export type Category = {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  roles: string[];
  relatedRoles: string[];
  /** "What the work looks like" — short bullet points. */
  work?: string[];
  /** "How people get in" — typical entry routes, training, first jobs. */
  entry?: string[];
  /** Biosecurity Central topic tags used to match learning resources. */
  learnTags?: string[];
  /** "How careers move": one paragraph on a typical progression through the track. */
  progression?: string;
};

export type PathwaysMeta = {
  title: string;
  descriptionStatus: "draft" | "reviewed";
  descriptionNote?: string;
  sources?: string[];
};

export const meta = pathways.meta as PathwaysMeta;
export const categories = pathways.categories as Category[];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getNeighbours(id: string): { prev: Category; next: Category } {
  const i = categories.findIndex((c) => c.id === id);
  const n = categories.length;
  return {
    prev: categories[(i - 1 + n) % n],
    next: categories[(i + 1) % n],
  };
}

export function totalRoles(c: Category): number {
  return c.roles.length + c.relatedRoles.length;
}

export const roleCount = categories.reduce((n, c) => n + totalRoles(c), 0);
