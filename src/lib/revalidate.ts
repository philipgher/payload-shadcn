import { getPayload } from "payload"
import config from '@payload-config'

export async function revalidate(path: string = '/') {
  const payload = await getPayload({ config })
  const domain = await payload.findGlobal({ slug: 'settings' })

  const secret = process.env.REVALIDATE_SECRET

  await fetch(`${domain}/api?revalidate`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({ path }),
  })
}