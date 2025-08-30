import type { ReactNode } from 'react'

import './globals.css'
import { Inter as FontSans } from 'next/font/google'
import { getNavigation } from "@/lib/getNavigation"
import { Navigation } from "@/components/navigation"

type LayoutProps = {
  children: ReactNode
}


const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const Layout = async ({ children }: LayoutProps) => {
  const navItems = await getNavigation()

  return (
    <html lang="en">
      <body>
        <header className="border-b p-4 flex justify-between items-center">
          <div className="font-bold">MySite</div>
          <Navigation items={navItems} />
        </header>
        <main className="container mx-auto p-8">
          {children}
        </main>
      </body>
    </html>
  )
}

export default Layout
