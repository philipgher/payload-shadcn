import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { seoPlugin } from '@payloadcms/plugin-seo'

import { Users } from './payload/collections/Users'
import { Pages } from './payload/collections/Pages'
import { Media } from './payload/collections/Media'
import { MainNav } from './payload/globals/main-nav'
import { FooterNav } from './payload/globals/footer-nav'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Pages,
    Media,
  ],
  globals: [
    MainNav,
    FooterNav,
  ],
  plugins: [
    seoPlugin({
      collections: [
        'pages',
      ],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Website.com — ${doc.title}`,
      generateDescription: ({ doc }) => doc.excerpt
    })
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
