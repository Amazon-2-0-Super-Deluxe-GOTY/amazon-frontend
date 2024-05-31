/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BASE_PATH}/:path*`, // Matched parameters can be used in the destination
      },
    ];
  },
};

module.exports = nextConfig;
