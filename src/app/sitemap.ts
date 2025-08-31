import { MetadataRoute } from "next"
import { getPayload } from "payload"
import config from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: "pages",
    limit: 10000,
  })

  const settings = await payload.findGlobal({ slug: "settings" })
  const baseUrl = settings.domain || "https://example.com"

  return pages.docs
    .filter((p: any) => !p.meta?.hideInSitemap)
    .map((p: any) => ({
      url: `${baseUrl}/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: p.meta?.sitemapFrequency || "weekly",
      priority: p.meta?.sitemapPriority || 0.5,
    }))
}
