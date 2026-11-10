"use client";

import BackLink from "@/components/ui/BackLink";
import { useSyncExternalStore } from "react";
import { RETURN_KEY, returnQueryFor } from "@/lib/return-to-projects";

/** Links back to the listing with the filter and page the visitor left (saved
 * by ProjectBrowser). The server snapshot is empty, so the static HTML links
 * to plain /projects. */
export default function BackToProjects({
  label,
  slug,
}: {
  label: string;
  slug: string;
}) {
  const q = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return returnQueryFor(slug, sessionStorage.getItem(RETURN_KEY));
      } catch {
        return "";
      }
    },
    () => "",
  );

  return (
    <BackLink
      href={`/projects${q.startsWith("?") ? q : ""}`}
      label={label}
    />
  );
}
