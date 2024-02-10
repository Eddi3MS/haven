'use client'

import { LogoutButton } from '@/components/auth/logout-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ExitIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { FaUser } from 'react-icons/fa'

export const UserButton = ({
  image = '',
  isAdmin,
}: {
  image?: string
  isAdmin: boolean
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={image} />
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

          {isAdmin ? (
            <DropdownMenuItem>
              <Link href="/admin">🔑 Admin</Link>
            </DropdownMenuItem>
          ) : null}

          <DropdownMenuItem>
            <Link href="/settings">⚙️ Settings</Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
