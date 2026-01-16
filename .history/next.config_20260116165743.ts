import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 关键：允许 Next.js 识别公网域名的访问
  output: "standalone",
  // 配置静态资源加载前缀为公网地址（替换成你的 localtunnel 地址）
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://lemon-coats-refuse.loca.lt"
      : "",
  // 允许跨域加载资源
  crossOrigin: "anonymous",
  // 禁用静态资源缓存（调试阶段）
  // generateStaticParams: async () => ({
  //   dynamic: true,
  // }),
};

export default nextConfig;
