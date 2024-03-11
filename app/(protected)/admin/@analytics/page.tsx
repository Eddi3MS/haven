import { getHavenData } from "@/actions/getHavenData"
import PieChart from "@/components/pie-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"

const Analytics = async () => {
  const data = await getHavenData()
  return (
    <div className="my-4 flex gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Anúncios por status</CardTitle>
        </CardHeader>
        <CardContent>
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
          <CardTitle>Anúncios por categoria</CardTitle>
        </CardHeader>
        <CardContent>
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
    </div>
  )
}

export default Analytics
