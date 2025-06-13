/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      cache: false,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins: [...config.plugins],
    }
  },
  // Add cache control headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
  // Disable static optimization for development
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@uiw/react-markdown-preview'],
  },
};

export default nextConfig;
