import { Card } from "@/components/ui/card"

interface LayoutProps {
  children: React.ReactNode
  analytics: React.ReactNode
}

const Layout = ({ children, analytics }: LayoutProps) => {
  return (
    <>
      {analytics}
      <div className="">{children}</div>
    </>
  )
}

export default Layout
