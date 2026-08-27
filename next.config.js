/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
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
