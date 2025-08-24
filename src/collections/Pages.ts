import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        {
          slug: 'hero',
          labels: {
            singular: 'Hero',
            plural: 'Heroes'
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true
            },
            {
              name: 'subheading',
              type: 'textarea'
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media'
            },
            {
              name: 'ctaLabel',
              type: 'text'
            },
            {
              name: 'ctaHref',
              type: 'text'
            },
          ],
        },
        {
          slug: 'cardGrid',
          labels: {
            singular: 'Card Grid',
            plural: 'Card Grids'
          },
          fields: [
            {
              name: 'cards',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true
                },
                {
                  name: 'description',
                  type: 'textarea'
                },
                {
                  name: 'icon',
                  type: 'text'
                },
                // map to lucide-react icons
              ],
            },
          ],
        },
        {
          slug: 'testimonial',
          labels: {
            singular: 'Testimonial',
            plural: 'Testimonials'
          },
          fields: [
            {
              name: 'quote',
              type: 'textarea',
              required: true
            },
            {
              name: 'author',
              type: 'text',
              required: true
            },
            {
              name: 'role',
              type: 'text'
            },
          ],
        },
        {
          slug: 'content',
          labels: {
            singular: 'Content',
            plural: 'Contents'
          },
          fields: [
            {
              name: 'body',
              type: 'richText',
              // editor: lexicalEditor(), // uses payload’s lexical editor
            },
          ],
        },
        {
          slug: 'callout',
          labels: {
            singular: 'Callout',
            plural: 'Callouts'
          },
          fields: [
            {
              name: 'message',
              type: 'textarea',
              required: true
            },
            {
              name: 'variant',
              type: 'select',
              options: [
                'default',
                'destructive',
              ]
            },
            {
              name: 'ctaLabel',
              type: 'text'
            },
            {
              name: 'ctaHref',
              type: 'text'
            },
          ],
        },
        {
          slug: 'mediaBlock',
          labels: {
            singular: 'Media Block',
            plural: 'Media Blocks'
          },
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true
            },
            {
              name: 'caption',
              type: 'text'
            },
            {
              name: 'align',
              type: 'select',
              options: [
                'left',
                'right',
                'center'
              ],
              defaultValue: 'center'
            },
          ],
        },
        {
          slug: 'faq',
          labels: {
            singular: 'FAQ',
            plural: 'FAQs'
          },
          fields: [
            {
              name: 'items',
              type: 'array',
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
