import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

/**
 * Renders a plain string that may contain Markdown-style links: [text](url).
 * External links open in a new tab and carry an icon; internal links (starting
 * with "/") use next/link so the basePath is applied.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, href] = m;
    if (href.startsWith("/")) {
      parts.push(
        <Link key={i++} href={href} className="font-medium text-primary underline-offset-4 hover:underline">
          {label}
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={i++}
          href={href}
          rel="noopener"
          target="_blank"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {label}
          <ExternalLink className="ml-0.5 inline size-3 align-[-0.125em]" aria-hidden="true" />
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <span className={className}>{parts}</span>;
}
