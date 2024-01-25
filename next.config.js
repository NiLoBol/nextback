/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const { withNextVideo } = require('next-video/process');

module.exports = withNextVideo(nextConfig);