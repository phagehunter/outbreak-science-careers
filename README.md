# Outbreak Science Careers

An interactive guide to careers in outbreak science and biosecurity, live at
**https://curtishoffmann.com/outbreak-science-careers**

Ten career tracks with US pay and outlook data, fellowships and degree programs,
free training, funding sources, and the organizations behind the field.
Patterned after [Emerging Technology Policy Careers](https://emergingtechpolicy.org)
by the Horizon Institute.

Project led by [Curtis Hoffmann](https://curtishoffmann.com). Built using
[Claude Code](https://claude.com/claude-code).

## Run it locally

```
npm install
npm run dev
```

Then open http://localhost:3000/outbreak-science-careers/

`npm run build` produces the static site in `out/`, which GitHub Actions deploys
to GitHub Pages on every push to `main`.

## Stack

Next.js (App Router, static export), React, TypeScript, Tailwind CSS, shadcn/ui.

## Licenses

- **Code** (everything in `src/`, configuration, and build files) is released under
  the [MIT License](LICENSE).
- **Content** (the site's text and the curated data in `src/data/`) is released under
  [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).
  You may share and adapt it with credit to Curtis Hoffmann and a link to this site.
- Pay and outlook figures come from the US Bureau of Labor Statistics Occupational
  Outlook Handbook. Funding-landscape figures are derived from
  [Pandemic PACT](https://www.pandemicpact.org/) (CC BY). Organization descriptions
  drawn from [biosecurity.world](https://biosecurity.world) and the
  [Biosecurity Central](https://biosecuritycentral.org) library remain those
  projects' work. Logos and names of third-party organizations belong to their owners.
