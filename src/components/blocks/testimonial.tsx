type TestimonialBlock = {
  quote: string
  author: string
  role?: string
}

export function Testimonial({ quote, author, role }: TestimonialBlock) {
  return (
    <blockquote className="max-w-2xl mx-auto text-center space-y-2">
      <p className="text-lg italic">“{quote}”</p>
      <footer className="text-sm font-medium">
        — {author}{role && `, ${role}`}
      </footer>
    </blockquote>
  )
}
