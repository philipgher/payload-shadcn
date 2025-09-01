import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './payload/collections/Users'
import { Pages } from './payload/collections/Pages'
import { Media } from './payload/collections/Media'

import { Settings } from './payload/globals/settings'
import { MainNav } from './payload/globals/main-nav'
import { FooterNav } from './payload/globals/footer-nav'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    livePreview: {
      collections: ['pages'],
      url: async ({ data, req }) => {
        const settings = await req.payload.findGlobal({ slug: 'settings' })
        const domain = settings.domain
        const path = data.fullPath
        return `${domain}/api/preview?slug=${path}`
      }
    }
  },
  collections: [
    Users,
    Pages,
    Media,
  ],
  globals: [
    Settings,
    MainNav,
    FooterNav,
  ],
  plugins: [
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
})
