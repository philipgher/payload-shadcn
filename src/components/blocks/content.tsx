import { Typography } from "@/components/ui/typography"

type ContentBlock = {
  body: { [key: string]: any } // Payload rich text JSON
}

export function Content({ body }: ContentBlock) {
  // Replace with a real rich-text renderer if needed
  return (
    <section className="prose mx-auto">
      <Typography as="div">{JSON.stringify(body)}</Typography>
    </section>
  )
}
