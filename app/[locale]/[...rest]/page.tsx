import { notFound } from "next/navigation";

/**
 * Catch unmatched paths under a valid locale so `[locale]/not-found` renders.
 * Sibling routes (e.g. `workbench/`) take precedence over this catch-all.
 */
export default function CatchAllPage() {
  notFound();
}
