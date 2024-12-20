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
};

export default nextConfig;
