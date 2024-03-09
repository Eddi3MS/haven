interface ProtectedLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex-1 w-full max-w-[min(1400px,98%)] mx-auto">
      {children}
    </div>
  )
}

export default ProtectedLayout
