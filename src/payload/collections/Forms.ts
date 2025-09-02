import type { CollectionConfig } from "payload";

export const Forms: CollectionConfig = {
  slug: "forms",
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
      name: "notifyEmail",
      type: "text",
      label: "Notification Email",
      admin: {
        description: "Send form submissions to this email (e.g. site owner).",
      },
    },
    {
      name: "sendAutoresponse",
      type: "checkbox",
      label: "Send confirmation email to submitter",
      defaultValue: false,
    },
    {
      name: "autoresponseField",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.sendAutoresponse === true,
        description: "Which field contains the submitter's email? (E.g. 'email')",
      },
    },

    {
      name: "fields",
      type: "array",
      label: "Form Fields",
      minRows: 1,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "name",
          type: "text",
          required: true,
          unique: false,
        },
        {
          name: "type",
          type: "select",
          required: true,
          options: [
            { label: "Text", value: "text" },
            { label: "Email", value: "email" },
            { label: "Textarea", value: "textarea" },
            { label: "Checkbox", value: "checkbox" },
            { label: "Select", value: "select" },
          ],
        },
        {
          name: "required",
          type: "checkbox",
          defaultValue: false,
        },
        {
          name: "options",
          type: "array",
          label: "Options (for select)",
          admin: {
            condition: (data, siblingData) => siblingData?.type === "select",
          },
          fields: [{ name: "label", type: "text" }, { name: "value", type: "text" }],
        },
      ],
    },
    {
      name: "successMessage",
      type: "text",
      defaultValue: "Thank you for your submission!",
    },
  ],
};
