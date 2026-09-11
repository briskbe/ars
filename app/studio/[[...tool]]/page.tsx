/**
 * The CMS lives here. Visit /studio in the browser.
 *
 * force-static keeps the Studio shell as static assets instead of a
 * serverless function, so Vercel does not store a fat Function bundle
 * for this route on every deployment.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
