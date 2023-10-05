/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "placehold.co",
      "flowbite.s3.amazonaws.com",
      "lh3.googleusercontent.com",
    ],
    loader: "default",
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
