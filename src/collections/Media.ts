import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // staticDir: path.resolve(__dirname, './media'),
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [],
};
