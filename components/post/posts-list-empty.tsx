import Link from "next/link"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

const PostsListEmpty = ({ isPublished = false }: { isPublished?: boolean }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center w-full fade-in gap-4">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Erro.</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-left">Nenhum imóvel encontrado.</p>
        </CardContent>

        <CardFooter className="">
          {!isPublished ? (
            <Button asChild>
              <Link href="/havens">Limpar Filtros?</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/create">Criar um anúncio?</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default PostsListEmpty
