"use client"

import { useCurrentUser } from "@/hooks/use-current-user"
import { returnGreetings } from "@/utils/greetings"
import Link from "next/link"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Dialog, DialogContent } from "./ui/dialog"

export const NoPhoneWarning = () => {
  const user = useCurrentUser()

  return (
    <Dialog open={!user?.phone}>
      <DialogContent
        className="p-0 w-auto bg-transparent border-none"
        showClose={false}
      >
        <Card>
          <CardHeader>
            <CardTitle>{returnGreetings(user?.name)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              Para anunciar seus imóveis na Haven, atualize seu cadastro,
              acrescentando um telefone para contato.
            </p>
            <p>
              A Haven não exerce nenhum intermédio e é através ele que possíveis
              interessados entrarão em contato.
            </p>
          </CardContent>
          <CardFooter className="justify-end">
            <Button asChild>
              <Link href="/settings">Vá para configurações.</Link>
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
