/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.seobotai.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig
