const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-1 flex items-center justify-center">{children}</main>
  )
}

export default AuthLayout
