"use client";

/**
 * The CMS lives here. Visit /studio in the browser.
 * The Studio is a client-side React app — it cannot be pre-rendered.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
