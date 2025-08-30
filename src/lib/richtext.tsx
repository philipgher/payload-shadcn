// src/lib/richtext.tsx
import * as React from "react"
import { Typography, T } from "@/components/ui/typography"

type LexicalNode = any

function renderText(node: any, key?: React.Key) {
  // Basic text rendering; extend to handle marks if you store them explicitly
  return <React.Fragment key={key}>{node.text ?? ""}</React.Fragment>
}

function renderChildren(nodes: LexicalNode[] = []) {
  return nodes.map((child: LexicalNode, i: number) => renderNode(child, i))
}

export function renderNode(node: LexicalNode, key?: React.Key): React.ReactNode {
  if (!node) return null

  switch (node.type) {
    case "heading": {
      const tag = (node.tag as "h1" | "h2" | "h3" | "h4") || "h2"
      return (
        <Typography key={key} as={tag}>
          {renderChildren(node.children)}
        </Typography>
      )
    }
    case "paragraph":
      // Empty paragraphs still reserve vertical rhythm
      if (!node.children?.length) return <T.P key={key}>&nbsp;</T.P>
      return <T.P key={key}>{renderChildren(node.children)}</T.P>

    case "quote":
      return <T.Blockquote key={key}>{renderChildren(node.children)}</T.Blockquote>

    case "list": {
      const Comp = node.listType === "number" ? T.OL : T.UL
      return <Comp key={key}>{renderChildren(node.children)}</Comp>
    }
    case "listitem":
      return <T.LI key={key}>{renderChildren(node.children)}</T.LI>

    case "link": {
      const props: any = {
        href: node.url || "#",
        target: node.newTab ? "_blank" : undefined,
        rel: node.newTab ? "noopener noreferrer" : undefined,
      }
      return (
        <Typography key={key} as="a" {...props}>
          {renderChildren(node.children)}
        </Typography>
      )
    }

    case "linebreak":
      return <br key={key} />

    // If you store horizontal rules
    case "horizontalrule":
      return <Typography key={key} as="hr" />

    // Text leaf
    case "text":
      return renderText(node, key)

    // Unknown nodes fall back to span
    default:
      return <Typography key={key} as="span">{renderChildren(node.children)}</Typography>
  }
}

export function RichText({ body }: { body: any }) {
  const nodes = body?.root?.children ?? []
  return <div className="space-y-6">{renderChildren(nodes)}</div>
}
