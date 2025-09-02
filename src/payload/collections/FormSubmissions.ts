import type { CollectionConfig } from "payload";

export const FormSubmissions: CollectionConfig = {
  slug: "form-submissions",
  admin: {
    useAsTitle: "id",
    defaultColumns: ["form", "createdAt"],
  },
  access: {
    read: ({ req: { user } }) => {
      return user?.role === "admin"; // only admins can see
    },
  },
  fields: [
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      required: true,
    },
    {
      name: "data",
      type: "json",
      required: true,
    },
  ],
};
