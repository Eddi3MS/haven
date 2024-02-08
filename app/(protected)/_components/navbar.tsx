import { UserButton } from '@/components/auth/user-button'
import { NavButton } from './nav-button'

export const Navbar = () => {
  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[min(600px,98%)] shadow-sm">
      <div className="hidden md:flex gap-x-2">
        <NavButton href="/server" label="Server" />
        <NavButton href="/client" label="Client" />
        <NavButton href="/admin" label="Admin" />
        <NavButton href="/settings" label="Settings" />
      </div>
      <div className="flex md:hidden">🔑 Auth</div>
      <UserButton />
    </nav>
  )
}

