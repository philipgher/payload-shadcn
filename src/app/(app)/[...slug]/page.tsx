import { PageRenderer } from "@/components/page-renderer"
import { unwrapPromise } from "@/lib/utils"
import { notFound } from "next/navigation"
import { getPayload } from "payload"
import config from '@payload-config'
import { Metadata } from "next"
import { Media } from "@/payload-types"

async function getPage(slug: string) {
  const payload = await getPayload({ config })

  const data = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return data.docs?.[0] || null
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({
  params,
}: PageProps) {
  const slug = (await params).slug;
  const { data: page, error } = await unwrapPromise(getPage(slug))

  if (error) {
    throw new Error(error.message)
  }

  if (!page) {
    return notFound()
  }

  return (
    <main className="container mx-auto p-8">
      <PageRenderer layout={page.layout} />
    </main>
  )
}

const imageUrlOrImageObject = (image: string | Media) => {
  if (typeof image === "string") return image;
  if (image?.url) return image.url;
  return '';
}

// Generate <head> metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const { data: page, error } = await unwrapPromise(getPage(slug))

  if (!page) return {}

  const siteName = "My Site"
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const url = page.meta?.canonicalUrl || `${baseUrl}/${page.slug}`

  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: !page.meta.indexing?.noIndex,
      follow: !page.meta?.indexing?.noFollow,
    },
    openGraph: {
      title: page.meta?.title || page.title,
      description: page.meta?.description,
      url,
      siteName,
      type: "website",
      images: page.meta?.image ? [
        {
          url: imageUrlOrImageObject(page.meta.image),
          alt: imageUrlOrImageObject(page.meta.image)
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta?.title || page.title,
      description: page.meta?.description,
      images: page.meta?.image ? [imageUrlOrImageObject(page.meta.image)] : [],
    },
  }
}
