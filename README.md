# Outbreak Science Careers

An interactive guide to careers in outbreak science and biosecurity, live at
**https://curtishoffmann.com/outbreak-science-careers/**

Ten career tracks, 35 role profiles with US pay and outlook data, named entry routes
(fellowships, internships, competitions, degree programs), free training, the funders
behind the field, and the job boards where the openings are posted. Patterned after
[Emerging Technology Policy Careers](https://emergingtechpolicy.org) by the Horizon
Institute.

Project led by [Curtis Hoffmann](https://curtishoffmann.com). Built using
[Claude Code](https://claude.com/product/claude-code).

## What is on the site

| Page | What it holds |
|---|---|
| Home | The ten tracks, "What is outbreak science?", an FAQ |
| `/roles/` and `/roles/<role>/` | One page per core role: plain-language summary, BLS snapshot (median pay, entry education, outlook, jobs), how people get in, related roles, matched training |
| `/pathways/<track>/` | Track guides: what the work looks like, career options, how people get in, how careers move, where to learn |
| `/get-started/` | Entry routes by career stage, degree programs, organizations that help people in, job boards |
| `/learn/` | Free courses, the Biosecurity Central training library, newsletters and podcasts |
| `/funding/` | Fellowships and grants by stage, funding models, who funds the field, a funder directory |

## Data

Everything the pages show lives in `src/data/`, one JSON file per subject:

| File | Contents | Source |
|---|---|---|
| `career-pathways.json` | Tracks, roles, related roles, work, entry, progression | Curated for this site |
| `role-details.json` | Per-role summary and BLS quick facts | CDC NERD Academy; BLS Occupational Outlook Handbook (May 2025 medians, 2025–35 projections) |
| `entry-routes.json` | Fellowships, internships, competitions, courses by stage | The programs' own pages |
| `programs.json` | Degree programs built for the field | The programs' own pages |
| `organizations.json` | Organizations that help people get in | biosecurity.world, plus additions |
| `learning-resources.json` | Biosafety and biosecurity training library | Biosecurity Central |
| `keep-up.json` | Courses, lectures, newsletters, podcasts | The publishers' pages |
| `funding.json` | Funders by stage, funding models, landscape figures, funder directory | Funders' pages; Pandemic PACT; biosecurity.world |
| `jobs.json` | Job boards | The boards' own pages |

Counts shown in the copy (tracks, roles, routes, programs, funders) are computed from these
files at build time, so adding an entry updates the page.

## Keeping it current

Links move. The repository includes a checker:

```bash
node scripts/check-links.mjs            # every external link in src/, report to scripts/link-report.json
node scripts/check-links.mjs --only cdc.gov
```

Some hosts refuse scripts (bls.gov, cdc.gov, Johns Hopkins, FutureLearn, LinkedIn) and
show as 403 or 999; open those in a browser instead. After fixing links, update the
`meta.checked` date in the affected data files; the sitemap's `lastmod` and the
"Last updated" notices read from it.

BLS figures: the handbook is revised each spring (new median pay) and every other
autumn (new projections). Re-read the pages linked from `role-details.json` and update
the `bls` blocks; the source line in `src/lib/roles.ts` carries the page date.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000/outbreak-science-careers/. `npm run build` writes the
static site to `out/`, which the GitHub Actions workflow deploys to GitHub Pages on
every push to `main`. `npm run lint` runs ESLint.

## Stack

Next.js (App Router, static export), React, TypeScript, Tailwind CSS, shadcn/ui.
Every page sets its own title, description, canonical URL and Open Graph tags; the
site ships WebSite, FAQPage, Article, Occupation, ItemList and BreadcrumbList structured
data, a sitemap, robots.txt and an `llms.txt` summary for AI search tools.

## Licenses

- **Code** (everything in `src/`, configuration, and build files) is released under the
  [MIT License](LICENSE).
- **Content** (the site's text and the curated data in `src/data/`) is released under
  [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).
  You may share and adapt it with credit to Curtis Hoffmann and a link to this site.
- Pay and outlook figures come from the US Bureau of Labor Statistics Occupational
  Outlook Handbook. Funding-landscape figures are derived from
  [Pandemic PACT](https://www.pandemicpact.org/) (CC BY). Organization descriptions
  drawn from [biosecurity.world](https://biosecurity.world) and the
  [Biosecurity Central](https://biosecuritycentral.org) library remain those
  projects' work. Logos and names of third-party organizations belong to their owners.
