export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex-1 w-full container mx-auto flex flex-col">
      {children}
    </section>
  )
}
