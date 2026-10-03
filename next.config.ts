import type { NextConfig } from "next";

// Cloud Run's writable filesystem is in-memory: every byte Next writes to
// disk counts against the container memory limit and is never freed until
// the instance dies. Left on, the ISR page cache (~240KB per wiki page
// x 100k articles x 15 locales, crawled by bots) and the image optimizer's
// disk cache grew until Cloud Run OOM-killed the instance, taking every
// in-flight request down with a 503. Keep both caches off the filesystem;
// ISR pages then live only in Next's bounded in-memory LRU (cacheMaxMemorySize,
// 50MB default) and Cloudflare caches optimized images at the edge.
const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    isrFlushToDisk: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      // GCS bucket holding Seedream-generated wiki imagery
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
    // WebP only. AVIF encodes are ~50% slower and far heavier on memory,
    // which a 1-vCPU Cloud Run instance can't absorb under crawler load.
    formats: ["image/webp"],
    // Default list minus 2048 and 3840. `fill` images (WikiContent,
    // WikiCard) use the largest width as the <img src> fallback, so every
    // crawler that ignores srcset was requesting w=3840 — 90% of origin image
    // traffic, each one a full-size encode. Nothing renders wider than 896
    // CSS px, so 1920 still covers 2x displays.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // See the in-memory filesystem note above. (Also implied by
    // isrFlushToDisk: false; stated here so it survives that flag changing.)
    maximumDiskCacheSize: 0,
    // GCS wiki images live at content-hashed, immutable paths, so let
    // Cloudflare and browsers cache the optimized output for a long time.
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
