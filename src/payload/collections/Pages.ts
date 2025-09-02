import { canEditOwn, checkRole } from '@/lib/access';
import { revalidate } from '@/lib/revalidate';
import { Page } from '@/payload-types'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // public
    create: checkRole(["admin", "editor", "author"]),
    update: canEditOwn(["author"]),
    delete: checkRole(["admin"]),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'isHome',
              type: 'checkbox',
              label: 'Set as Homepage',
              defaultValue: false,
              admin: {
                position: 'sidebar',
                description:
                  'Mark this page as the homepage. Only one page can be homepage.',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              hasMany: false,
              validate: (slug, { data }) => {
                const typedData = data as Partial<Page>
                if (typedData?.isHome) return true; // skip validation if homepage
                if (slug === 'admin' || slug === 'api' || slug === 'static' || slug === 'graphql') {
                  return 'This slug is reserved.';
                }
                // Forbidden characters: slashes, spaces, ?, #, %, &, +, :, ;, ", <, >, \, |, *, ', `
                const forbiddenPattern = /[\/\s\?#%&\+:;"<>\\|\*'`]/;
                if (slug && forbiddenPattern.test(slug)) {
                  return 'Slug contains forbidden characters: / ? # % & + : ; " < > \\ | * \' ` or spaces.';
                }
                return true;
              },
              admin: {
                condition: (data, siblingData) => !siblingData?.isHome, // hide slug if homepage
              },
            },
            {
              name: "parent",
              type: "relationship",
              relationTo: "pages",
              hasMany: false,
              admin: {
                condition: (data) => !data?.isHome, // hide parent if homepage
                description: "Select a parent page to nest this page under. This will affect the page's URL. E.g., selecting 'About' as the parent and setting the slug to 'team' will result in the URL '/about/team'. SEO benefits include better site structure and keyword relevance.",
              },
              validate: (parent, { data }) => {
                const typedData = data as Partial<Page>
                if (typedData?.isHome && parent) {
                  return 'The homepage cannot have a parent.';
                }

                if (parent && parent === typedData.id) {
                  return 'A page cannot be its own parent.';
                }
                return true;
              },
            },
            {
              name: "fullPath",
              type: "text",
              admin: { readOnly: true },
              unique: true,
              hooks: {
                beforeValidate: [
                  async ({ data, req }) => {
                    const typedData = data as Partial<Page>;
                    let path = typedData.slug
                    if (typedData.parent) {
                      const parent = await req.payload.findByID({
                        collection: "pages",
                        id: typeof typedData.parent === "string" ? typedData.parent : typedData.parent.id,
                      })
                      path = `${parent.fullPath}/${typedData.slug}`
                    }
                    return path
                  },
                ],
              },
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
          ]
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            // {
            //   type: 'ui',
            //   name: 'seoPreview',
            //   admin: {
            //     components: {
            //       Field: SeoPreview,
            //     },
            //   },
            // },
            {
              name: 'title',
              type: 'text',
              label: 'Meta Title',
              required: true,
              localized: true,
              hooks: {
                beforeChange: [
                  async ({ data, value }) => !value ? data?.title : value,
                ],
              },
              admin: {
                description: 'Appears in search engines and browser tabs (recommended under 60 chars).',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Meta Description',
              required: true,
              localized: true,
              hooks: {
                beforeChange: [
                  async ({ data, value }) => !value ? data?.excerpt : value,
                ],
              },
              admin: {
                description: 'Summary shown in search results (recommended under 160 chars).',
              },
            },
            {
              name: 'image',
              type: 'upload',
              label: 'Meta / OG Image',
              relationTo: 'media',
              admin: {
                description: 'Image used in link previews (Facebook, Twitter, etc).',
              },
            },
            {
              name: 'canonicalUrl',
              type: 'text',
              label: 'Canonical URL',
              admin: {
                description: 'If left blank, defaults to this page’s URL.',
              },
              hooks: {
                beforeChange: [
                  async ({ data, value, req }) => {
                    const settings = await req.payload.findGlobal({ slug: 'settings' })
                    return !value ? `${settings.domain}/${data?.slug}` : value
                  }
                ],
              },
            },
            {
              name: 'social',
              type: 'group',
              label: 'Social Sharing',
              fields: [
                {
                  name: 'ogTitle',
                  type: 'text',
                  label: 'OpenGraph Title',
                  admin: { description: 'Overrides Meta Title for social sharing.' },
                },
                {
                  name: 'ogDescription',
                  type: 'textarea',
                  label: 'OpenGraph Description',
                  admin: { description: 'Overrides Meta Description for social sharing.' },
                },
                {
                  name: 'twitterCard',
                  type: 'select',
                  label: 'Twitter Card Type',
                  options: [
                    { label: 'Summary', value: 'summary' },
                    { label: 'Summary with Large Image', value: 'summary_large_image' },
                  ],
                  defaultValue: 'summary_large_image',
                },
              ],
            },
            {
              name: 'indexing',
              type: 'group',
              label: 'Search Engine Controls',
              fields: [
                {
                  name: 'noIndex',
                  type: 'checkbox',
                  label: 'No Index',
                  defaultValue: false,
                },
                {
                  name: 'noFollow',
                  type: 'checkbox',
                  label: 'No Follow',
                  defaultValue: false,
                },
                {
                  name: 'hideInSitemap',
                  type: 'checkbox',
                  label: 'Hide in Sitemap',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'sitemap',
              type: 'group',
              label: 'Sitemap Settings',
              fields: [
                {
                  name: 'priority',
                  type: 'select',
                  label: 'Sitemap Priority',
                  options: [
                    { label: '0.0 (lowest)', value: '0.0' },
                    { label: '0.3', value: '0.3' },
                    { label: '0.5 (default)', value: '0.5' },
                    { label: '0.7', value: '0.7' },
                    { label: '1.0 (highest)', value: '1.0' },
                  ],
                  defaultValue: '0.5',
                },
                {
                  name: 'changefreq',
                  type: 'select',
                  label: 'Change Frequency',
                  options: [
                    { label: 'Always', value: 'always' },
                    { label: 'Hourly', value: 'hourly' },
                    { label: 'Daily', value: 'daily' },
                    { label: 'Weekly', value: 'weekly' },
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Yearly', value: 'yearly' },
                    { label: 'Never', value: 'never' },
                  ],
                  defaultValue: 'monthly',
                },
              ],
            },
          ],
        },
        {
          label: 'Author',
          fields: [
            {
              name: "author",
              type: "relationship",
              relationTo: "users",
              required: true,
              defaultValue: ({ user }) => user?.id,
            },
          ]
        }
      ]
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        if (!data) return

        // enforce only one homepage
        if (data.isHome) {
          const existing = await req.payload.find({
            collection: 'pages',
            where: { isHome: { equals: true } },
          })

          if (
            existing.docs.length > 0 &&
            existing.docs[0].id !== data.id // allow updating the same doc
          ) {
            throw new Error('There can only be one homepage.')
          }

          data.slug = '' // homepage slug
          data.parent = undefined // homepage has no parent
          data.fullPath = '/' // homepage path
          return data
        }

        return data
      },
    ],

    afterChange: [
      // When a page changes, update children recursively
      async ({ doc, req }) => {
        const typedDoc = doc as Page

        const children = await req.payload.find({
          collection: "pages",
          where: { parent: { equals: typedDoc.id } },
          limit: 1000, // adjust if you expect more
        })

        for (const child of children.docs) {
          const newFullPath = `${typedDoc.fullPath}/${child.slug}`

          // Only update if changed (avoid infinite loops)
          if (child.fullPath !== newFullPath) {
            await req.payload.update({
              collection: "pages",
              id: child.id,
              data: {
                fullPath: newFullPath,
              },
            })
          }
        }
      },

      // When a page changes, revalidate
      async ({ doc }) => {
        const typedDoc = doc as Page
        if (!typedDoc.fullPath) return
        await revalidate(typedDoc.fullPath)
      },
    ],

    afterDelete: [
      // When page is deleted, purge cache
      async ({ doc }) => {
        await revalidate('/')
      }
    ]
  },
}
