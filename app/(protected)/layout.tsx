interface ProtectedLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex-1 w-full container mx-auto flex flex-col">
      {children}
    </div>
  )
}

export default ProtectedLayout
