import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'

import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dakify',
  description: 'My music streaming service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Render ReactNode children from Sidebar component wrapped within a
  // SupabaseProvider user session
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <Sidebar>
            {children}
          </Sidebar>
        </SupabaseProvider>
      </body>
    </html>
  )
}
