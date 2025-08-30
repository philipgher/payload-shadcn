import { getPayload } from "payload"
import config from '@payload-config'

export async function getMainNavigation() {
  const payload = await getPayload({ config })

  const data = await payload.findGlobal({
    slug: 'mainNav'
  });

  return data.items || []
}


export async function getFooterNavigation() {
  const payload = await getPayload({ config })

  const data = await payload.findGlobal({
    slug: 'footerNav'
  });

  return data || []
}
