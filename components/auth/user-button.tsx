'use client'

import { ExitIcon } from '@radix-ui/react-icons'
import { FaUser } from 'react-icons/fa'

import { LogoutButton } from '@/components/auth/logout-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCurrentUser } from '@/hooks/use-current-user'
import Link from 'next/link'

export const UserButton = () => {
  const user = useCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
        <div className="block md:hidden">
          <DropdownMenuItem>
            <Link href="/server">💻 Server</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/client"> 📱 Client</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/admin">🔑 Admin</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings">⚙️ Settings</Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

