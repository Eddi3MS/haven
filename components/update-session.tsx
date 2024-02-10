'use client'

import { useSession } from 'next-auth/react'

export const UpdateSession = ({ shouldUpdate }: { shouldUpdate: boolean }) => {
  const { update } = useSession()

  if (shouldUpdate) {
    update()
  }
  return null
}
