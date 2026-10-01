"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { RETURN_KEY } from "@/lib/return-to-projects";

/** Links back to the listing with the filter and page the visitor left (saved
 * by ProjectBrowser). The server snapshot is empty, so the static HTML links
 * to plain /projects. */
export default function BackToProjects({ label }: { label: string }) {
  const q = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return sessionStorage.getItem(RETURN_KEY) ?? "";
      } catch {
        return "";
      }
    },
    () => "",
  );

  return (
    <Link
      href={`/projects${q.startsWith("?") ? q : ""}`}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-4 w-4"
      >
        <path d="M12 15l-5-5 5-5" />
      </svg>
      {label}
    </Link>
  );
}
