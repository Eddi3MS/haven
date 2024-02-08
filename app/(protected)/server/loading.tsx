import { Card, CardContent, CardHeader } from '@/components/ui/card'

const loading = () => {
  return (
    <Card className="w-[min(600px,98%)] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          💻 Server component
        </p>
      </CardHeader>
      <CardContent className="space-y-4 animate-pulse">
        <div className="rounded-lg border bg-gray-200 h-[50px] shadow-sm"></div>
        <div className="rounded-lg border bg-gray-200 h-[50px] shadow-sm"></div>
        <div className="rounded-lg border bg-gray-200 h-[50px] shadow-sm"></div>
        <div className="rounded-lg border bg-gray-200 h-[50px] shadow-sm"></div>
        <div className="rounded-lg border bg-gray-200 h-[50px] shadow-sm"></div>
      </CardContent>
    </Card>
  )
}

export default loading
