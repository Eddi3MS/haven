"use client"
import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = ({
  data,
}: {
  data: {
    labels: string[]
    datasets: [{ label: string; data: number[]; backgroundColor: string[] }]
  }
}) => {
  return (
    <div className="w-[250px]">
      <Pie data={data} />
    </div>
  )
}

export default PieChart
