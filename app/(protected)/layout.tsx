interface ProtectedLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="max-w-[min(1400px,98%)] mx-auto w-full flex-1 flex flex-col gap-y-10 justify-start items-center pt-8">
      {children}
    </div>
  )
}

export default ProtectedLayout
