import { auth } from "@/auth"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
import "./globals.css"
import { Header } from "@/components/header"
import { inter } from "@/app/fonts/fonts"

export const metadata: Metadata = {
  title: "Haven Samonte - Imóveis",
  description: "Encontre a casa dos seus sonhos, pra comprar ou alugar.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ""),
  alternates: {
    canonical: "/",
  },
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
          <main className="flex-1 w-full container mx-auto flex flex-col min-h-[calc(100svh-90px)] pb-4">
            {children}
          </main>
        </body>
      </html>
    </SessionProvider>
  )
}
