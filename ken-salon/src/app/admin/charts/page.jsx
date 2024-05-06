"use client";
import React from "react";

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';


import ChartCard from "../../../components/Chart/ChartCard";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import ChartLegend from "../../../components/Chart/ChartLegend";
import PageTitle from "../../../components/Typography/PageTitle";
import {
  doughnutOptions,
  lineOptions,
  barOptions,
  doughnutLegends,
  lineLegends,
  barLegends,
} from "../../../utils/demo/chartsData";

// Register Chart.js components
Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
function Charts() {
  return (
    <div
      className="h-screen overflow-hidden"
      onWheel={(e) => {
        
        const container = e.currentTarget;
        container.scrollTo({
          top: container.scrollTop + e.deltaY * 4, 
          behavior: "smooth",
        });
      }}
    >
      <PageTitle>Charts</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Doughnut">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Lines">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
          <ChartCard title="Bars">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
        </ChartCard>

        
      </div>
    </div>
  );
}

export default Charts;
