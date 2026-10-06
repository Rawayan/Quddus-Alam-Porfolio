import type { MetadataRoute } from "next";

const baseUrl = "https://your-domain.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/gallery",
    "/achievements",
    "/gaibandha",
    "/contact",
    "/bn",
    "/bn/gallery",
    "/bn/achievements",
    "/bn/gaibandha",
    "/bn/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" || route === "/bn" ? 1 : 0.8,
  }));
}