import { auth } from "@/auth"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
import "./globals.css"
import { Header } from "@/components/header"
import { inter } from "@/app/fonts/fonts"

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
        <body className={`${inter.className} min-h-svh flex flex-col`}>
          <Toaster />
          <Header />
          <main className="flex h-full flex-col items-center justify-center">
            {children}
          </main>
        </body>
      </html>
    </SessionProvider>
  )
}
