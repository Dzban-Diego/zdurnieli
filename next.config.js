/** @type {import('next').NextConfig} */
const nextPWA = require("next-pwa");

const withPWA = nextPWA({
  dest: "public",
});

const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

module.exports = withPWA(nextConfig);
