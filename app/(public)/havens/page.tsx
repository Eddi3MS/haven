import { listPosts } from "@/actions/posts/list-posts"
import { DetailTooltip } from "@/components/detail-tooltip"
import { Filters, SearchParamsType } from "@/components/filter"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatToCurrency } from "@/utils/format-inputs"
import { generateCloudinaryImageURL } from "@/utils/generateCloudinaryImageURL"
import Image from "next/image"
import Link from "next/link"
import { BiArea, BiBath, BiBed, BiHome } from "react-icons/bi"

const Havens = async ({ searchParams }: { searchParams: SearchParamsType }) => {
  const data = await listPosts()
  return (
    <>
      <div className="flex justify-between w-full py-4">
        <h1 className="text-2xl font-semibold text-center">Imóveis</h1>
        <DropdownMenu>
          <DropdownMenuTrigger aria-label="abrir menu">
            <Button variant="outline">Filtros</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[320px]" align="end">
            <Filters searchParams={searchParams} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {data.map((item) => (
          <Link key={item.id} href={`/havens/${item.id}`} passHref>
            <Card className="shadow-md overflow-hidden">
              <CardHeader className="p-4">
                <Image
                  src={generateCloudinaryImageURL(item.images?.[0].publicId)}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="w-full rounded-t-md"
                />
              </CardHeader>

              <CardContent className="flex justify-between p-4 pt-0">
                <CardTitle>{item.title}</CardTitle>
                <span className="text-muted-foreground">
                  {formatToCurrency(String(item.price))}
                </span>
              </CardContent>

              <CardFooter className="flex w-full justify-between p-4 pt-0">
                <DetailTooltip text="Quartos">
                  <BiBed fontSize={16} /> {item.bedroomCount}
                </DetailTooltip>
                <DetailTooltip text="Banheiros">
                  <BiBath fontSize={16} /> {item.bathroomCount}
                </DetailTooltip>
                <DetailTooltip text="Área Total">
                  <BiArea fontSize={16} /> {item.area}m²
                </DetailTooltip>
                <DetailTooltip text="Área Construída">
                  <BiHome fontSize={16} /> {item.builtArea}m²
                </DetailTooltip>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Havens
