import { SafePost } from "@/types"
import Link from "next/link"
import React, { ReactNode } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { formatToCurrency } from "@/utils/format-inputs"
import { DetailTooltip } from "../detail-tooltip"
import { BiArea, BiBath, BiBed, BiHome } from "react-icons/bi"
import { generateCloudinaryImageURL } from "@/utils/generateCloudinaryImageURL"
import {
  categoriesTranslated,
  statusTranslated,
} from "@/utils/categoryTranslation"
import { cn } from "@/lib/utils"

export const PostCard = ({
  post,
  showStatus = false,
}: {
  post: SafePost
  showStatus?: boolean
}) => {
  return (
    <Card className="shadow-md overflow-hidden relative">
      <CardHeader className="p-4">
        <Image
          src={generateCloudinaryImageURL(post.images?.[0].publicId)}
          alt={post.title}
          width={300}
          height={200}
          className="w-full rounded-t-md"
        />
      </CardHeader>

      <Badge
        className={cn(
          "absolute top-5 left-5 z-10",
          post.category === "SELL" && "bg-blue-600 hover:bg-blue-700",
          post.category === "RENT" && "bg-green-600 hover:bg-green-700"
        )}
      >
        {categoriesTranslated[post.category]}
      </Badge>

      {showStatus ? (
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
        <CardTitle>{post.title}</CardTitle>
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
