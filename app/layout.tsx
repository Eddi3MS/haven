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
      <html lang="pt-BR" className="bg-slate-50 antialiased">
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <Toaster />
          <Header />
          <main className="flex-1 flex flex-col items-center justify-center pb-4 min-h-[calc(100svh-90px)]">
            {children}
          </main>
        </body>
      </html>
    </SessionProvider>
  )
}
