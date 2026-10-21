/** Site-wide constants used by metadata, sitemap, and structured data. */
export const SITE_URL = "https://curtishoffmann.com";
export const BASE_PATH = "/outbreak-science-careers";
export const SITE_ORIGIN = `${SITE_URL}${BASE_PATH}`;
export const SITE_NAME = "Outbreak Science Careers";
export const SITE_TAGLINE = "Pathways into outbreak science and biosecurity";
/** Home-page <title> and share title; kept under 60 characters. */
export const SITE_TITLE = "Outbreak Science Careers: roles, pay and pathways";
export const SITE_DESCRIPTION =
  "An interactive guide to careers in outbreak science and biosecurity: ten career tracks, US pay and outlook data, fellowships and degree programs, free training, and funding.";
export const AUTHOR = { name: "Curtis Hoffmann", url: "https://curtishoffmann.com" };

/** Absolute URL for a site path (with or without leading slash). */
export function absUrl(path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${p}`;
}
