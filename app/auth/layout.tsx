import bg from "@/assets/bg.webp"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="flex-1 flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      {children}
    </main>
  )
}

export default AuthLayout
