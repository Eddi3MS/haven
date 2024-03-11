import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"

export const LoadingPostCard = () => {
  return (
    <Card className="shadow-md animate-pulse">
      <CardHeader className="p-4">
        <div className="w-full rounded-t-md aspect-video bg-gray-300" />
      </CardHeader>
      <CardContent className="flex justify-between items-center p-4 pt-0">
        <div className="w-24 h-6 bg-gray-300" />

        <div className="w-20 h-6 bg-gray-300" />
      </CardContent>

      <CardFooter className="flex w-full justify-between p-4 pt-0">
        <div className="w-10 h-6 bg-gray-300 rounded-sm" />
        <div className="w-10 h-6 bg-gray-300 rounded-sm" />
        <div className="w-10 h-6 bg-gray-300 rounded-sm" />
        <div className="w-10 h-6 bg-gray-300 rounded-sm" />
      </CardFooter>
    </Card>
  )
}
