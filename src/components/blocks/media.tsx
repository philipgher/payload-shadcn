import Image from "next/image"

type MediaBlock = {
  media: { url: string }
  caption?: string
  align?: "left" | "right" | "center"
}

export function MediaBlock({ media, caption, align = "center" }: MediaBlock) {
  return (
    <figure className={`flex justify-${align} my-8`}>
      <div className="max-w-xl">
        <Image
          src={media.url}
          alt={caption || ""}
          width={800}
          height={600}
          className="rounded-xl"
        />
        {caption && (
          <figcaption className="mt-2 text-sm text-muted-foreground text-center">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  )
}
