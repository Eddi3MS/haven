import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'
import Image from 'next/image'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

interface HeaderProps {
  label: string
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn('text-3xl font-semibold', font.className)}>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/haven-imoveis-74ece.appspot.com/o/nm_haven_light.png?alt=media"
          width={368}
          height={90}
          alt="haven"
          className="w-[245px] h-[60px]"
        />
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  )
}
