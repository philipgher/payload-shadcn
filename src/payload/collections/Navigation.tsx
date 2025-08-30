// collections/Navigation.ts
import { CollectionConfig } from "payload"

export const Navigation: CollectionConfig = {
  slug: "navigation",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "items",
      type: "array",
      label: "Navigation Items",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "linkType",
          type: "radio",
          options: [
            { label: "Internal Page", value: "page" },
            { label: "Custom URL", value: "custom" },
          ],
          defaultValue: "page",
        },
        {
          name: "page",
          type: "relationship",
          relationTo: "pages",
          admin: {
            condition: (_, siblingData) => siblingData.linkType === "page",
          },
        },
        {
          name: "url",
          type: "text",
          admin: {
            condition: (_, siblingData) => siblingData.linkType === "custom",
          },
        },
        {
          name: "children",
          type: "array",
          label: "Sub Items",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "page",
              type: "relationship",
              relationTo: "pages",
            },
            {
              name: "url",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
}
