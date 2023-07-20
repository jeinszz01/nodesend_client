/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig

module.exports = {
    env: {
        backendURL: 'http://localhost:4000',
        frontendURL: 'http://localhost:3000'
    }
}