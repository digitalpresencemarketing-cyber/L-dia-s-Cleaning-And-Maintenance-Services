// Avaliações enviadas pelos clientes pelo próprio site.
// Ficam numa fila de aprovação até a dona aprovar no /admin.

import { PENDING_REVIEWS_ID, readRow, writeRow } from "./supabase";

export type PendingReview = {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
  photo: string;
  createdAt: string;
};

export const MAX_PENDING = 100;

export async function readPending(): Promise<PendingReview[]> {
  const data = await readRow(PENDING_REVIEWS_ID, true);
  const items = (data as { items?: unknown } | null)?.items;
  return Array.isArray(items) ? (items as PendingReview[]) : [];
}

export function writePending(items: PendingReview[]) {
  return writeRow(PENDING_REVIEWS_ID, { items });
}

/** "Sharon Gomes" → "SG" */
export function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0] ?? "?").slice(0, 2);
  return letters.toUpperCase();
}

/** "Sharon Gomes" → "Sharon G." (privacidade do cliente) */
export function displayName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return parts[0] ?? "";
  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
}

export function monthYear(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "America/New_York" });
}
