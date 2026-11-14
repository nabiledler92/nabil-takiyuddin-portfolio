/** Site-wide constants. The public URL comes from NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://nabil-takiyuddin.vercel.app"
).replace(/\/+$/, "");

export const SITE_NAME = "Nabil Takiyuddin";

export function absoluteUrl(path = "/"): string {
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
