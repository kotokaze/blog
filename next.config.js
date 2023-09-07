const headers = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'same-origin' },
  { key: 'Cloudflare-CDN-Cache-Control', value: 's-maxage=300 stale-while-revalidate=3600' },
]

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
  poweredByHeader: false,

  headers: async () => [
    { source: '/(.*)', headers: headers },
  ],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/assets/**',
      },
    ]
  },

  webpack: (config, { isServer }) => {
    // load worker files as a urls by using Asset Modules
    // https://webpack.js.org/guides/asset-modules/
    if (!isServer) {
      config.module.rules.unshift({
        test: /pdf\.worker\.(min\.)?js/,
        type: 'asset/resource',
        generator: {
          filename: 'static/worker/[hash][ext][query]',
        },
      })
    }
    return config
  },
}
