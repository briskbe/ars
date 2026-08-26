import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Write-enabled Sanity client for server code only.
 *
 * The token is a server-side secret — it is deliberately not prefixed with
 * NEXT_PUBLIC_, so importing this module from a client component would leave
 * the client unauthenticated rather than leaking the token into the bundle.
 * Returns `null` when the token is unset so callers can fail loudly with a
 * useful message instead of a confusing 401 from Sanity.
 */
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
    perspective: "published",
  });
}
