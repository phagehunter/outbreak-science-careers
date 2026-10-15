import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/#pathways", label: "Pathways", desktopOnly: true },
  { href: "/roles/", label: "Roles" },
  { href: "/get-started/", label: "Get started" },
  { href: "/learn/", label: "Learn" },
  { href: "/funding/", label: "Funding" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 font-heading text-base font-semibold tracking-tight text-foreground"
        >
          <Image
            src={logo}
            alt=""
            width={32}
            height={32}
            priority
            className="size-8 rounded-lg"
          />
          <span className="hidden sm:inline">Outbreak Science Careers</span>
          <span className="sr-only sm:hidden">Outbreak Science Careers</span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex items-center gap-0.5 sm:gap-1"
        >
          {NAV.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              asChild
              className={"desktopOnly" in item && item.desktopOnly ? "hidden sm:inline-flex" : "px-2 sm:px-3"}
            >
              <Link href={item.href} className="whitespace-nowrap">
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
