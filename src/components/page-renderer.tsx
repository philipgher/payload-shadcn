import { Hero } from "./blocks/hero"
import { CardGrid } from "./blocks/card-grid"
import { Testimonial } from "./blocks/testimonial"
import { Content } from "./blocks/content"
import { Callout } from "./blocks/callout"
import { MediaBlock } from "./blocks/media"
import { FAQ } from "./blocks/faq"

export function PageRenderer({ layout }: { layout: any[] }) {
  return (
    <div className="space-y-16">
      {layout?.map((block, i) => {
        switch (block.blockType) {
          case "hero":
            return <Hero key={i} {...block} />
          case "cardGrid":
            return <CardGrid key={i} {...block} />
          case "testimonial":
            return <Testimonial key={i} {...block} />
          case "content":
            return <Content key={i} {...block} />
          case "callout":
            return <Callout key={i} {...block} />
          case "mediaBlock":
            return <MediaBlock key={i} {...block} />
          case "faq":
            return <FAQ key={i} {...block} />
          default:
            return null
        }
      })}
    </div>
  )
}
