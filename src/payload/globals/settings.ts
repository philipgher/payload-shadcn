import type { GlobalConfig } from "payload"

export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Site Settings",
  // access: {
  //   read: () => true,
  //   update: ({ req }) => !!req.user, // only logged-in users
  // },
  fields: [
    {
      name: "siteName",
      label: "Site Name",
      type: "text",
      required: true,
    },
    {
      name: "titleSuffix",
      label: "Title Suffix",
      type: "text",
      admin: {
        description: "Appended to all page titles (e.g. “| My Company”)",
      },
    },
    {
      name: "domain",
      label: "Domain Name",
      type: "text",
      required: true,
      admin: {
        description: "Used for canonical URLs and SEO (e.g. https://example.com)",
      },
      hasMany: false,
      validate: (value) => {
        if (
          typeof value !== "string" ||
          !/^https?:\/\/[^\/]+$/.test(value)
        ) {
          return "Must be a valid http or https URL without trailing slashes";
        }
        return true;
      },
    },
    {
      name: "favicon",
      label: "Favicon",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Shown in browser tabs and search results",
      },
    },
    {
      name: "defaultOGImage",
      label: "Default Open Graph Image",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Used when a page doesn’t set its own SEO image",
      },
    },
  ],
}
