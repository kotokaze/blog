/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  swcMinify: false, // For PDF.js
  experimental: {
    typedRoutes: true,
  },

  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.microcms-assets.io',
      pathname: '/assets/**',
    }],
  },

  ...((process.env.NODE_ENV === 'development') && {
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
  }),

  webpack: (config, { isServer }) => {
    // load worker files as a urls by using Asset Modules

    // https://webpack.js.org/guides/asset-modules/
    if (!isServer) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      config.module.rules.unshift({
        test: /pdf\.worker(\.min)?\.m?js$/,
        type: 'asset/resource',
        mimetype: 'application/javascript',
        generator: {
          filename: 'static/worker/[hash][ext]',
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
};

export default nextConfig;
