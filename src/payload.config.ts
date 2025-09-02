import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { s3Storage } from '@payloadcms/storage-s3';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { Users } from './payload/collections/Users'
import { Pages } from './payload/collections/Pages'
import { Media } from './payload/collections/Media'

import { Settings } from './payload/globals/settings'
import { MainNav } from './payload/globals/main-nav'
import { FooterNav } from './payload/globals/footer-nav'
import { Forms } from './payload/collections/Forms'
import { FormSubmissions } from './payload/collections/FormSubmissions'

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
    Forms,
    FormSubmissions,
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
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION,
      },
    }),
  ],
  email: nodemailerAdapter({
    defaultFromAddress: 'info@payloadcms.com',
    defaultFromName: 'Payload',
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 1025,
      // Mailhog doesn't use TLS
      secure: process.env.SMTP_USER && process.env.SMTP_PASS ? true : false,
      ...(process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        }
        : {}),
    },
  }),
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
})
