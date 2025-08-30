// src/components/ui/typography.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

type Tag =
  | "h1" | "h2" | "h3" | "h4"
  | "p" | "blockquote" | "code" | "pre"
  | "ul" | "ol" | "li" | "hr" | "small" | "a" | "strong" | "em" | "span"

const classes: Record<Tag, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  blockquote: "mt-6 border-l-2 pl-6 italic",
  code: "rounded bg-muted px-1.5 py-0.5 text-sm",
  pre: "my-6 overflow-x-auto rounded-lg border p-4 text-sm",
  ul: "my-6 ml-6 list-disc space-y-2",
  ol: "my-6 ml-6 list-decimal space-y-2",
  li: "leading-7",
  hr: "my-8 border-t",
  small: "text-sm text-muted-foreground",
  a: "underline underline-offset-4 hover:decoration-2",
  strong: "font-semibold",
  em: "italic",
  span: "",
}

type TypographyProps<T extends Tag> = React.HTMLAttributes<HTMLElement> & {
  as?: T
  children?: React.ReactNode
}

export function Typography<T extends Tag = "p">({
  as,
  className,
  children,
  ...rest
}: TypographyProps<T>) {
  const Comp = (as || "p") as any
  const tag = (as || "p") as Tag
  return (
    <Comp className={cn(classes[tag], className)} {...rest}>
      {children}
    </Comp>
  )
}

// Optional ergonomic aliases
export const T = {
  H1: (p: any) => <Typography as="h1" {...p} />,
  H2: (p: any) => <Typography as="h2" {...p} />,
  H3: (p: any) => <Typography as="h3" {...p} />,
  P: (p: any) => <Typography as="p"  {...p} />,
  Blockquote: (p: any) => <Typography as="blockquote" {...p} />,
  UL: (p: any) => <Typography as="ul" {...p} />,
  OL: (p: any) => <Typography as="ol" {...p} />,
  LI: (p: any) => <Typography as="li" {...p} />,
  A: (p: any) => <Typography as="a" {...p} />,
  Code: (p: any) => <Typography as="code" {...p} />,
  Pre: (p: any) => <Typography as="pre"  {...p} />,
}
