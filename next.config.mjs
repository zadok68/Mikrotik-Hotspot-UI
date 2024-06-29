 /** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    assetPrefix: '/',
    basePath:'',
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
};

export default nextConfig;
