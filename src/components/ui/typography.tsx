export function TypographyH1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  );
}

export function TypographyH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export function TypographyH3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

export function TypographyH4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

export function TypographyP({ children }: { children: React.ReactNode }) {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      {children}
    </p>
  );
}

export function TypographyBlockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      {children}
    </blockquote>
  );
}

export function TypographyList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {children}
    </ul>
  );
}

export function TypographyInlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

export function TypographyLead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground text-xl">
      {children}
    </p>
  );
}

type TypographyType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "blockquote"
  | "list"
  | "inlineCode"
  | "lead";

export function Typography({
  type,
  children,
}: {
  type: TypographyType;
  children: React.ReactNode;
}) {
  switch (type) {
    case "h1":
      return <TypographyH1>{children}</TypographyH1>;
    case "h2":
      return <TypographyH2>{children}</TypographyH2>;
    case "h3":
      return <TypographyH3>{children}</TypographyH3>;
    case "h4":
      return <TypographyH4>{children}</TypographyH4>;
    case "p":
      return <TypographyP>{children}</TypographyP>;
    case "blockquote":
      return <TypographyBlockquote>{children}</TypographyBlockquote>;
    case "list":
      return <TypographyList>{children}</TypographyList>;
    case "inlineCode":
      return <TypographyInlineCode>{children}</TypographyInlineCode>;
    case "lead":
      return <TypographyLead>{children}</TypographyLead>;
    default:
      return null;
  }
}
