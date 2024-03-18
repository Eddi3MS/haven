interface LayoutProps {
  children: React.ReactNode
  analytics: React.ReactNode
}

const Layout = ({ children, analytics }: LayoutProps) => {
  return (
    <>
      {analytics}
      {children}
    </>
  )
}

export default Layout
