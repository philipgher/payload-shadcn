import { PageRenderer } from "@/components/page-renderer"
import { unwrapPromise } from "@/lib/utils"
import { notFound } from "next/navigation"
import { getPayload } from "payload"
import config from '@payload-config'

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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  console.log("Fetching page with slug:", slug);

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
