import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FAQItem = {
  question: string
  answer: string
}

type FAQBlock = {
  items: FAQItem[]
}

export function FAQ({ items }: FAQBlock) {
  return (
    <section className="max-w-2xl mx-auto">
      <Accordion type="single" collapsible>
        {items?.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
