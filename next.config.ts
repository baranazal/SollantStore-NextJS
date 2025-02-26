import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: "2mb"
    },
  },
  images: {
    domains: ['eachcpvnomxtooeglbtg.supabase.co'], // Add your Supabase project domain
  }
};

export default nextConfig;
