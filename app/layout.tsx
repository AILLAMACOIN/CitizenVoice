import "./globals.css"
import { Inter } from "next/font/google"
import { AppWrapper } from "./components/app-wrapper"
import type { Metadata } from 'next'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Citizen Voice',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'UAE Government Citizen Feedback Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
