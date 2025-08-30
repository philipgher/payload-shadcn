import { RichText } from "@/lib/richtext"

type ContentBlock = {
  body: any // Payload Lexical JSON
}

export function Content({ body }: ContentBlock) {
  return (
    <section className="max-w-3xl mx-auto">
      <RichText body={body} />
    </section>
  )
}
