import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      // GCS bucket holding Seedream-generated wiki imagery
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
    // Prefer AVIF (falls back to WebP) for the large 2K hero images.
    formats: ["image/avif", "image/webp"],
    // GCS wiki images live at content-hashed, immutable paths, so the
    // optimizer can cache aggressively instead of re-fetching/re-encoding.
    minimumCacheTTL: 2678400, // 31 days
    // Required in Next 16. No component requests a non-default quality, so
    // the single allowed value keeps the optimizer surface minimal.
    qualities: [75],
    // Dev machines behind a fake-IP proxy (Clash/Surge enhanced mode)
    // resolve every hostname to 198.18.x.x, tripping the optimizer's
    // private-IP SSRF guard and 400-ing ALL remote images locally.
    // Dev-only escape hatch; production keeps the guard.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
  async headers() {
    return [
      {
        // /embed/* is the public-facing iframe-embeddable card. Override
        // the default DENY frame policy so blogs/forums can embed it.
        source: "/embed/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
