import { cn } from "@/lib/utils"
import { SafePost } from "@/types"
import {
  categoriesTranslated,
  statusTranslated,
} from "@/utils/categoryTranslation"
import { formatToCurrency } from "@/utils/format-inputs"
import { generateCloudinaryImageURL } from "@/utils/generateCloudinaryImageURL"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { BiArea, BiBath, BiBed, BiEdit, BiHome } from "react-icons/bi"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { ActionButton } from "./action-button"
import { DetailTooltip } from "./detail-tooltip"

export const PostCard = ({
  post,
  showActions = false,
}: {
  post: SafePost
  showActions?: boolean
}) => {
  return (
    <Card className="shadow-md overflow-hidden relative">
      <CardHeader className="p-4 relative">
        <Image
          src={generateCloudinaryImageURL(post.images?.[0].publicId)}
          alt={post.title}
          width={300}
          height={200}
          className="w-full rounded-t-md"
        />
        {showActions && (
          <div className="absolute bottom-5 right-5 flex flex-col gap-2">
            <Button
              size="icon"
              className="bg-blue-400 hover:bg-blue-500"
              asChild
            >
              <Link href={`/update/${post.id}`}>
                <BiEdit />
              </Link>
            </Button>

            <Button size="icon" variant="outline" asChild>
              <Link href={`/havens/${post.id}`} scroll={false}>
                <EyeOpenIcon />
              </Link>
            </Button>

            <ActionButton type="DELETE" postId={post.id} />
          </div>
        )}
      </CardHeader>

      <Badge
        className={cn("absolute top-5 left-5 z-10")}
        variant={post.category}
      >
        {categoriesTranslated[post.category]}
      </Badge>

      {showActions ? (
        <Badge
          className={cn(
            "absolute top-5 right-5 z-10",
            post.status === "PENDING" && "bg-blue-600 hover:bg-blue-700",
            post.status === "APPROVED" && "bg-green-600 hover:bg-green-700",
            post.status === "REJECTED" && "bg-red-600 hover:bg-red-700"
          )}
        >
          {statusTranslated[post.status]}
        </Badge>
      ) : null}

      <CardContent className="flex justify-between items-center p-4 pt-0">
        <CardTitle className="line-clamp-1">{post.title}</CardTitle>
        <span className="text-muted-foreground">
          {formatToCurrency(String(post.price))}
        </span>
      </CardContent>

      <CardFooter className="flex w-full justify-between p-4 pt-0">
        <DetailTooltip text="Quartos">
          <BiBed fontSize={16} /> {post.bedroomCount}
        </DetailTooltip>
        <DetailTooltip text="Banheiros">
          <BiBath fontSize={16} /> {post.bathroomCount}
        </DetailTooltip>
        <DetailTooltip text="Área Total">
          <BiArea fontSize={16} /> {post.area}m²
        </DetailTooltip>
        <DetailTooltip text="Área Construída">
          <BiHome fontSize={16} /> {post.builtArea}m²
        </DetailTooltip>
      </CardFooter>
    </Card>
  )
}
