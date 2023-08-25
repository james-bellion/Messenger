import './globals.css'
import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

// used to trigger our toasts
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Messenger App',
  description: 'messenger clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
        </body>
    </html>
  )
}

// this is the RootLayout component is a wrapper that sets up global styles, applies fonts,
// provides context for authentication and toast notifications, and renders the
// main content of your application.
