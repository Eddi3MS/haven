import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import React from "react"

const Loading = () => {
  return (
    <>
      <div className="flex justify-between w-full py-4 animate-pulse">
        <div className="flex gap-2 items-center">
          <div className="h-5 w-12 bg-gray-300 rounded-md" />
          <div className="h-8 w-48 bg-gray-300 rounded-md" />
        </div>

        <div className="h-9 w-32 bg-gray-300 rounded-md" />
      </div>

      <Card className="w-full animate-pulse">
        <CardHeader>
          <div className="w-full mx-auto rounded-t-md overflow-hidden">
            <div className="h-[235px] w-full bg-gray-300" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid gap-2">
            <div className="h-6 w-48 bg-gray-300" />
            <div className="h-4 w-1/2 bg-gray-300" />
          </div>
          <div className="h-5 w-full bg-gray-300" />

          <div className="flex w-full justify-between">
            <div className="w-10 h-6 bg-gray-300 rounded-sm" />
            <div className="w-10 h-6 bg-gray-300 rounded-sm" />
            <div className="w-10 h-6 bg-gray-300 rounded-sm" />
            <div className="w-10 h-6 bg-gray-300 rounded-sm" />
          </div>
        </CardContent>

        <CardFooter className="grid gap-2">
          <div className="h-9 w-48 bg-gray-300" />
          <div className="h-9 w-48 bg-gray-300" />
        </CardFooter>
      </Card>
    </>
  )
}

export default Loading
