import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

type HeroBlock = {
  heading: string
  subheading?: string
  image?: { url: string }
  ctaLabel?: string
  ctaHref?: string
}

export function Hero({ heading, subheading, image, ctaLabel, ctaHref }: HeroBlock) {
  return (
    <section className="w-full py-16 text-center">
      <Card className="max-w-4xl mx-auto overflow-hidden">
        {image?.url && (
          <Image
            src={image.url}
            alt={heading}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        )}
        <CardContent className="space-y-4 p-8">
          <h1 className="text-4xl font-bold">{heading}</h1>
          {subheading && <p className="text-lg text-muted-foreground">{subheading}</p>}
          {ctaLabel && (
            <Button asChild>
              <a href={ctaHref || "#"}>{ctaLabel}</a>
            </Button>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
