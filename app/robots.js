export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://cable.relaxdev.ru/sitemap.xml",
    host: "https://cable.relaxdev.ru",
  };
}
