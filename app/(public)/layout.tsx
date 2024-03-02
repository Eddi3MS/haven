export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex-1 w-full max-w-[min(1400px,98%)] mx-auto">
      {children}
    </section>
  )
}
