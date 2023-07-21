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
        backendURL: 'https://nodesend-backend-ord6.onrender.com',
        frontendURL: 'https://next-node-send.netlify.app'
    }
}