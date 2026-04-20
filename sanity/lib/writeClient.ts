import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Server-only Sanity client with write access. Requires SANITY_API_WRITE_TOKEN
 * to be set in the environment (same token used by the seed script).
 */
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    throw new Error(
      "SANITY_API_WRITE_TOKEN is not configured. Set it in .env.local to accept form submissions.",
    );
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
    perspective: "published",
  });
}
