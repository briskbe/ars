import { client } from "./client";

const REVALIDATE_SECONDS = 60;

/**
 * Wraps the Sanity client with ISR revalidation. Errors (missing dataset,
 * network failures, unconfigured project at build time) resolve to `null` so
 * the page falls back to its hard-coded defaults instead of failing the build.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["sanity"] },
    });
  } catch (err) {
    console.warn("[sanity] fetch failed, falling back to defaults:", err instanceof Error ? err.message : err);
    return null as T;
  }
}
