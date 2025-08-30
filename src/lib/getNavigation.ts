import { getPayload } from "payload"
import config from '@payload-config'

export async function getNavigation() {
  const payload = await getPayload({ config })

  const data = await payload.find({
    collection: "navigation",
  })

  return data.docs[1]?.items || []
}
