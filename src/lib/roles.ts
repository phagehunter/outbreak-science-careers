import details from "@/data/role-details.json";
import { categories, type Category } from "@/lib/pathways";

export type Bls = {
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
export type RoleDetail = { summary?: string | null; summarySource?: string; bls?: Bls };

export type Role = {
  name: string;
  slug: string;
  category: Category;
  detail: RoleDetail;
};

const roleDetails = details.roles as Record<string, RoleDetail>;

/** URL slug for a role name: "AI Researcher for Outbreak Detection" → "ai-researcher-for-outbreak-detection". */
export function roleSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Every core role, in track order then the order within the track. */
export const roles: Role[] = categories.flatMap((category) =>
  category.roles.map((name) => ({
    name,
    slug: roleSlug(name),
    category,
    detail: roleDetails[name] ?? {},
  })),
);

export function getRole(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}

export function getRoleNeighbours(slug: string): { prev: Role; next: Role } {
  const i = roles.findIndex((r) => r.slug === slug);
  const n = roles.length;
  return { prev: roles[(i - 1 + n) % n], next: roles[(i + 1) % n] };
}

/** "$87,220 per year (May 2025)" → 87220 */
export function medianPayNumber(bls?: Bls): number | undefined {
  const m = bls?.medianPay?.match(/\$([\d,]+)/);
  return m ? Number(m[1].replace(/,/g, "")) : undefined;
}

/** "$87,220 per year (May 2025)" → "$87,220" */
export function medianPayShort(bls?: Bls): string | undefined {
  return bls?.medianPay?.replace(/ per year.*$/, "");
}

/** Plain-language summary with a fallback built from the BLS description. */
export function roleSummary(role: Role): string {
  if (role.detail.summary) return role.detail.summary;
  const what = role.detail.bls?.whatTheyDo;
  return what
    ? `${role.name}s work in the ${role.category.title} track of outbreak science. ${what}`
    : `${role.name}s work in the ${role.category.title} track of outbreak science: ${role.category.tagline.toLowerCase()}`;
}

export const blsPageDate = "27 Aug 2026";
