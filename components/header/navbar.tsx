import { LoginButton } from "@/components/header/login-button"
import { Button } from "@/components/ui/button"
import { currentUser } from "@/lib/auth"
import { NavButton } from "@/components/header/nav-button"
import { MenuMobile } from "@/components/header/menu-mobile"

export const Navbar = async () => {
  const user = await currentUser()
  const isAdmin = user?.role === "ADMIN"

  return (
    <nav className="flex justify-between items-center py-4 pl-4 gap-8">
      <div className="hidden md:flex gap-x-2">
        <NavButton href="/havens" label="Imóveis" />
        <NavButton href="/create" label="Anunciar" />
        {isAdmin ? <NavButton href="/admin" label="Admin" /> : null}
        {!!user ? <NavButton href="/settings" label="Configurações" /> : null}
      </div>

      <div className="md:hidden">
        <MenuMobile
          image={user?.image ?? ""}
          isAdmin={isAdmin}
          hasUser={!!user}
        />
      </div>

      <div className="hidden md:block">
        <LoginButton asChild>
          <Button variant="default" size="lg">
            Entrar
          </Button>
        </LoginButton>
      </div>
    </nav>
  )
}
