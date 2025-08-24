import { Card, CardContent } from "@/components/ui/card"
import * as Icons from "lucide-react"

type CardItem = {
  title: string
  description?: string
  icon?: keyof typeof Icons
}

type CardGridBlock = {
  cards: CardItem[]
}

export function CardGrid({ cards }: CardGridBlock) {
  return (
    <section className="grid gap-6 grid-cols-1 md:grid-cols-3">
      {cards?.map((card, i) => {
        const Icon = card.icon ? (Icons[card.icon] as any) : null
        return (
          <Card key={i} className="p-6 space-y-4">
            {Icon && <Icon className="w-8 h-8 text-primary" />}
            <CardContent>
              <h3 className="font-semibold text-xl">{card.title}</h3>
              {card.description && (
                <p className="text-muted-foreground">{card.description}</p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}
