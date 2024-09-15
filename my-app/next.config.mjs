import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {hostname: "cdn.prod.website-files.com"}
        ],
        domains: [
            "api.microlink.io", // Microlink Image Preview
          ],
    }
};

export default nextConfig;
