'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavButton = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname()

  return (
    <Button asChild variant={pathname === href ? 'activeLink' : 'link'}>
      <Link href={href} className="uppercase font-semibold">
        {label}
      </Link>
    </Button>
  )
}

export { NavButton }
