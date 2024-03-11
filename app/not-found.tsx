import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import React from "react"

const NotFound = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Página não encontrada.</CardTitle>
      </CardHeader>
      <CardContent>
        <p>A página que você tentou acessar não foi encontrada.</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href="/">Voltar</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default NotFound
