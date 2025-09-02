import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { s3Storage } from "@payloadcms/storage-s3";

import { Users } from './payload/collections/Users'
import { Pages } from './payload/collections/Pages'
import { Media } from './payload/collections/Media'

import { Settings } from './payload/globals/settings'
import { MainNav } from './payload/globals/main-nav'
import { FooterNav } from './payload/globals/footer-nav'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.S3_BUCKET) throw new Error('S3_BUCKET environment variable is not defined');
if (!process.env.S3_ACCESS_KEY_ID) throw new Error('S3_ACCESS_KEY_ID environment variable is not defined');
if (!process.env.S3_SECRET_ACCESS_KEY) throw new Error('S3_SECRET_ACCESS_KEY environment variable is not defined');
if (!process.env.S3_REGION) throw new Error('S3_REGION environment variable is not defined');
if (!process.env.DATABASE_URI) throw new Error('DATABASE_URI environment variable is not defined');
if (!process.env.PAYLOAD_SECRET) throw new Error('PAYLOAD_SECRET environment variable is not defined');

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
    s3Storage({
      collections: {
        media: true,
        // 'media-with-prefix': {
        //   prefix,
        // },
        // 'media-with-presigned-downloads': {
        //   // Filter only mp4 files
        //   signedDownloads: {
        //     shouldUseSignedURL: ({ collection, filename, req }) => {
        //       return filename.endsWith('.mp4')
        //     },
        //   },
        // },
      },
      bucket: process.env.S3_BUCKET,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
        region: process.env.S3_REGION,
      },
    }),
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
