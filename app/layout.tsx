import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'

import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserID from "@/actions/getSongsByUserID";

const font = Figtree({ subsets: ['latin'] })

// Data on the web page will always be up-to-date. The layout won't be cached.
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Dakify',
  description: 'My music streaming service',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch a specific user's songs from Supabase
  const userSongs = await getSongsByUserID();

  // Render ReactNode children from Sidebar component wrapped within a
  // UserProvider component within a SupabaseProvider user session
  // Also render a ToasterProvider component for basic notification styles
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
