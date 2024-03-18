"use client"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import { Button } from "./ui/button"

const BackButton = ({ children }: { children?: ReactNode }) => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <Button onClick={handleClick} size={!children ? "icon" : "default"}>
      {children ? children : <ArrowLeftIcon className="h-4 w-4" />}
    </Button>
  )
}

export default BackButton
