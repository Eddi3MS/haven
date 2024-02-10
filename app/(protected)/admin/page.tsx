import { Card, CardContent, CardHeader } from '@/components/ui/card'

const AdminPage = () => {
  return (
    <Card className="w-[min(600px,98%)]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4"></CardContent>
    </Card>
  )
}

export default AdminPage
