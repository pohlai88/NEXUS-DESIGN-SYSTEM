/**
 * Next.js Configuration Example
 * 
 * Optimized configuration for using AIBOS Web Components in Next.js
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize package imports for better tree-shaking
  experimental: {
    optimizePackageImports: ['@aibos/design-system'],
  },

  // Cache Web Component assets for better performance
  async headers() {
    return [
      {
        source: '/node_modules/@aibos/design-system/dist/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Webpack configuration for better tree-shaking
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimize client-side bundle
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };
    }
    return config;
  },

  // Transpile Web Components from node_modules
  transpilePackages: ['@aibos/design-system'],
};

module.exports = nextConfig;

