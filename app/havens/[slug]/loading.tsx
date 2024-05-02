import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import React from "react"

const Loading = () => {
  return (
    <>
      <div className="flex justify-between w-full py-4 animate-pulse">
        <div className="flex gap-2 items-center">
          <div className="h-9 w-9 aspect-square bg-gray-300 rounded-md" />
          <div className="h-8 flex-1 bg-gray-300 rounded-md" />
        </div>
        <div className="h-9 w-20 bg-gray-300" />
      </div>

      <Card className="w-full animate-pulse">
        <CardHeader>
          <div className="w-full mx-auto rounded-t-md overflow-hidden">
            <div className="h-[235px] w-full bg-gray-300" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2 pt-0 md:pt-0">
          <div className="grid gap-2">
            <div className="h-6 w-full bg-gray-300" />
            <div className="h-4 w-full bg-gray-300" />
          </div>

          <div className="flex w-full max-w-md gap-2">
            <div className="w-10 h-6 bg-gray-300 rounded-sm" />
            <div className="w-10 h-6 bg-gray-300 rounded-sm" />
            <div className="w-10 h-6 bg-gray-300 rounded-sm" />
            <div className="w-10 h-6 bg-gray-300 rounded-sm" />
          </div>

          <div className="h-5 w-full bg-gray-300" />

          <div className="h-1 w-full bg-gray-300" />

          <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
            <p className="flex flex-col justify-between gap-2">
              <span className="h-5 w-12 bg-gray-300" />
              <span className="h-5 w-24 bg-gray-300" />
            </p>

            <div className="h-1 w-full bg-gray-300 md:hidden" />

            <div className="flex-col items-stretch min-w-[250px]">
              <p className="flex justify-between text-lg">
                <span className="h-5 w-12 bg-gray-300" />
                <span className="h-5 w-24 bg-gray-300" />
              </p>
              <p className="flex justify-between text-lg">
                <span className="h-5 w-12 bg-gray-300" />
                <span className="h-5 w-24 bg-gray-300" />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default Loading
