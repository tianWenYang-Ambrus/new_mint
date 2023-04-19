/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
  images: {
    domains: ['ambrus.s3.amazonaws.com', 'cdn.ambrus.studio'],
  },
};

module.exports = nextConfig;
