import { getHavenData } from "@/actions/getHavenData"
import PieChart from "@/components/pie-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Analytics = async () => {
  const data = await getHavenData()

  return (
    <div className="my-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Anúncios por status</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <PieChart
            data={{
              labels: ["Aprovados", "Reprovados", "Pendentes"],
              datasets: [
                {
                  label: "anúncios",
                  data: [
                    data.approvedCount,
                    data.rejectedCount,
                    data.pendingCount,
                  ],
                  backgroundColor: ["#E879F9", "#F87171", "#A78BFA"],
                },
              ],
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Anúncios por categoria</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <PieChart
            data={{
              labels: ["Venda", "Aluguel"],
              datasets: [
                {
                  label: "imóveis",
                  data: [data.sellCount, data.rentCount],
                  backgroundColor: ["#4ADE80", "#818CF8"],
                },
              ],
            }}
          />
        </CardContent>
      </Card>
      <Card></Card>
    </div>
  )
}

export default Analytics
