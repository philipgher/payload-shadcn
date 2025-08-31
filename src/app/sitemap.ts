// app/sitemap.ts
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/pages?depth=0`)
  const { docs: pages } = await res.json()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"

  return pages
    .filter((p: any) => !p.meta?.hideInSitemap)
    .map((p: any) => ({
      url: `${baseUrl}/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly",
      priority: p.meta?.sitemapPriority || 0.5,
    }))
}
