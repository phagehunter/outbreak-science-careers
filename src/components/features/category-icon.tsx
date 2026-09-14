import {
  Activity,
  Cpu,
  Landmark,
  Leaf,
  Megaphone,
  Microscope,
  Stethoscope,
  Truck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  activity: Activity,
  stethoscope: Stethoscope,
  microscope: Microscope,
  cpu: Cpu,
  landmark: Landmark,
  users: Users,
  leaf: Leaf,
  truck: Truck,
  megaphone: Megaphone,
  wrench: Wrench,
};

type Props = {
  name: string;
  className?: string;
  size?: "md" | "lg";
};

/** Lucide line icon in a soft tinted circle, echoing emergingtechpolicy.org's card icons. */
export function CategoryIcon({ name, className, size = "md" }: Props) {
  const Icon = ICONS[name] ?? Activity;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors duration-200",
        size === "md" ? "size-11" : "size-14",
        className,
      )}
    >
      <Icon
        strokeWidth={1.5}
        className={size === "md" ? "size-5" : "size-7"}
      />
    </span>
  );
}
