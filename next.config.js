/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["placehold.co", "flowbite.s3.amazonaws.com"],
    loader: "default",
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
