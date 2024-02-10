import { LoginButton } from '@/components/header/login-button'
import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/auth'
import { NavButton } from '@/components/header/nav-button'
import { UserButton } from '@/components/header/user-button'

export const Navbar = async () => {
  const user = await currentUser()
  const isAdmin = user?.role === 'ADMIN'

  return (
    <nav className="flex justify-between items-center p-4 gap-8">
      <div className="hidden md:flex gap-x-2">
        <NavButton href="/havens" label="Imóveis" />
        <NavButton href="/create" label="Anunciar" />
        {isAdmin ? <NavButton href="/admin" label="Admin" /> : null}
        {!!user ? <NavButton href="/settings" label="Settings" /> : null}
      </div>

      {!!user ? (
        <UserButton image={user.image ?? ''} isAdmin={isAdmin} />
      ) : (
        <LoginButton asChild>
          <Button variant="default" size="lg">
            Entrar
          </Button>
        </LoginButton>
      )}
    </nav>
  )
}
