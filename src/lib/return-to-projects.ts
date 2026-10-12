/** sessionStorage key holding the listing's query string (?type=…&page=…) and
 * the slug of the project opened from it, so that project's page can link back
 * to the exact view the visitor left. Stored as "<slug>\n<query>". */
export const RETURN_KEY = "tp:projects-return";

export const encodeReturn = (slug: string, query: string) => `${slug}\n${query}`;

/** The saved query, but only for the project it was saved for: a page reached
 * any other way (home page, nav, a shared link) gets plain /projects. */
export function returnQueryFor(slug: string, stored: string | null) {
  if (!stored) return "";
  const at = stored.indexOf("\n");
  return at > 0 && stored.slice(0, at) === slug ? stored.slice(at + 1) : "";
}
