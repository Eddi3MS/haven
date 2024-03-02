/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
}

module.exports = nextConfig
