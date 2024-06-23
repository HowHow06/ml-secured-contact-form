/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL, // need to declare for them to work at client side
  },
};

export default nextConfig;
