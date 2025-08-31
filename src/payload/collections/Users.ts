import { checkRole } from '@/lib/access'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: checkRole(["admin", "editor"]),
    create: checkRole(["admin"]),
    update: checkRole(["admin"]),
    delete: checkRole(["admin"]),
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'author',
      options: [
        {
          // Admin → full access to everything.
          label: 'Admin',
          value: 'admin',
        },
        {
          // Editor → can manage content (Pages, Posts, Media, Navigation, Settings, SEO), but not Users.
          label: 'Editor',
          value: 'editor',
        },
        {
          // Author → can create/edit their own content (e.g. blog posts), but not publish others’.
          label: 'Author',
          value: 'author',
        },
        {
          // Viewer (optional) → can log in but read-only, no editing.
          label: 'Viewer',
          value: 'viewer',
        },
      ],
    },
  ],
}
