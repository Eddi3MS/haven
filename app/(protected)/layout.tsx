interface ProtectedLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="w-full flex flex-col gap-y-10 items-center justify-start pt-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400 to-cyan-800">
      {children}
    </div>
  )
}

export default ProtectedLayout
