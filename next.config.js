/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Plain <img> + Sanity CDN. Skip Vercel Image Optimization so it
    // does not store a transformed copy of every photo.
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
    // Keep these files out of every serverless trace. public/ is served as
    // static assets; the Studio-only packages must not ride along on /api.
    outputFileTracingExcludes: {
      "*": [
        "public/**",
        "scripts/**",
        "SANITY_SETUP.md",
        "node_modules/@swc/core*/**",
        "node_modules/@esbuild/**",
        "node_modules/webpack/**",
        "node_modules/terser/**",
        "node_modules/typescript/**",
      ],
      "/api/**": [
        "node_modules/sanity/**",
        "node_modules/@sanity/vision/**",
        "node_modules/@sanity/icons/**",
        "node_modules/@sanity/locale-nl-nl/**",
        "node_modules/styled-components/**",
      ],
    },
  },
  async redirects() {
    return [
      // The *.vercel.app address stays reachable for previews, but the
      // public site lives on the real domain — one URL per page for Google.
      {
        source: "/:path*",
        has: [{ type: "host", value: "ars-vert.vercel.app" }],
        destination: "https://www.ars-metals.be/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
