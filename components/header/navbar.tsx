import { LoginButton } from '@/components/header/login-button'
import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/auth'
import { NavButton } from '@/components/header/nav-button'
import { UserButton } from '@/components/header/user-button'

export const Navbar = async () => {
  const user = await currentUser()
  const isAdmin = user?.role === 'ADMIN'

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[min(600px,98%)] shadow-sm">
      <div className="hidden md:flex gap-x-2">
        <NavButton href="/server" label="Server" />
        <NavButton href="/client" label="Client" />
        {isAdmin ? <NavButton href="/admin" label="Admin" /> : null}
        <NavButton href="/settings" label="Settings" />
      </div>

      {!!user ? (
        <UserButton image={user.image ?? ''} isAdmin={isAdmin} />
      ) : (
        <LoginButton asChild>
          <Button variant="secondary" size="lg">
            Sign in
          </Button>
        </LoginButton>
      )}
    </nav>
  )
}
