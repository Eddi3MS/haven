import { auth } from "@/auth"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Haven - Imóveis",
  description: "O lugar certo pra comprar ou alugar.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="pt-BR" className="bg-slate-50">
        <body
          className={`${inter.className} min-h-svh flex flex-col max-w-[min(1600px,100%)] mx-auto drop-shadow-md`}
        >
          <Toaster />
          <Header />
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
