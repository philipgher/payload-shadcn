import { draftMode } from "next/headers"
import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug") || "/"

  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'settings' })
  const domain = settings.domain

  // enable draft mode
  const draftModeWaited = await draftMode()
  draftModeWaited.enable()

  return NextResponse.redirect(new URL(slug, domain))
}
