import { revalidate } from '@/lib/revalidate';
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // staticDir: path.resolve(__dirname, './media'),
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [],
  hooks: {
    afterChange: [
      // When media is changed, purge cache (not working out where media is used)
      async ({ doc }) => {
        await revalidate('/')
      }
    ]
  }
};
