/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "placehold.co",
      "flowbite.s3.amazonaws.com",
      "lh3.googleusercontent.com",
      "www.tlbx.app",
      "d1qxcfelrfueco.cloudfront.net",
      "dummyimage.com",
    ],
    loader: "default",
    dangerouslyAllowSVG: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      "@aws-sdk/signature-v4-multi-region":
        "commonjs @aws-sdk/signature-v4-multi-region",
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
      "supports-color": "commonjs supports-color",
    });
    return config;
  },
};

module.exports = nextConfig;
