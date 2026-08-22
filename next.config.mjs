/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    serverExternalPackages: ['@prisma/client', '@prisma/adapter-pg', 'pg', 'sharp'],
};

export default nextConfig;
