import Link from "next/link";
import { Mail } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/in/phagehunter/";
const EMAIL = "curtis@operationoutbreak.org";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} ·{" "}
          <a
            href="https://curtishoffmann.com"
            rel="noopener"
            className="font-medium text-foreground hover:text-primary"
          >
            Curtis Hoffmann
          </a>
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href="/#about" className="hover:text-foreground">
            About this site
          </Link>
          <a href={`mailto:${EMAIL}`} className="hover:text-foreground">
            Share your feedback
          </a>
          <a href="https://claude.com/claude-code" rel="noopener" className="hover:text-foreground">
            Built using Claude Code
          </a>
          <span className="flex items-center gap-2">
            <a
              href={LINKEDIN_URL}
              rel="noopener"
              target="_blank"
              aria-label="Curtis Hoffmann on LinkedIn"
              className="inline-flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <LinkedInIcon className="size-4" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label={`Email ${EMAIL}`}
              className="inline-flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Mail className="size-4" strokeWidth={1.75} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
