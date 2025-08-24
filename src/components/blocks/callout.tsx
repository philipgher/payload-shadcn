import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

type CalloutBlock = {
  message: string
  variant?: "default" | "destructive"
  ctaLabel?: string
  ctaHref?: string
}

export function Callout({ message, variant = "default", ctaLabel, ctaHref }: CalloutBlock) {
  return (
    <Alert variant={variant} className="flex items-center justify-between">
      <AlertDescription>{message}</AlertDescription>
      {ctaLabel && (
        <Button asChild size="sm" className="ml-4">
          <a href={ctaHref || "#"}>{ctaLabel}</a>
        </Button>
      )}
    </Alert>
  )
}
