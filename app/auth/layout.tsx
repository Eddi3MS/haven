interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex-1 w-full container mx-auto flex flex-col justify-center items-center">
      {children}
    </div>
  )
}

export default AuthLayout
