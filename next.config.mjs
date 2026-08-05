/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Media uploads (hero images, gallery photos) routinely exceed the 1MB
    // default limit for Server Action request bodies.
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
}

export default nextConfig
