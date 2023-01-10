import { CircleStackIcon, CubeIcon } from "@heroicons/react/20/solid";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import { Line, Chart } from "react-chartjs-2";
import CardComponents from "../../components/CardComponents";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const colors = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "blue",
  "purple",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [180, 300, 280, 100, 500, 230, 200],
    },
    {
      label: "Dataset 2",
      data: [150, 100, 200, 146, 256, 450, 330],
    },
  ],
};

function createGradient(ctx, area) {
  const gradient = ctx.createLinearGradient(0, 230, 0, 50);

  gradient.addColorStop(1, "rgba(20,23,39,0.2)");
  gradient.addColorStop(0.2, "rgba(72,72,176,0.0)");
  gradient.addColorStop(0, "rgba(20,23,39,0)"); //purple colors

  return gradient;
}

export default function Dashboard() {
  const ref = useRef();
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    const chart = ref.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        tension: 0.4,
        borderWidth: 0,
        pointRadius: 0,
        borderColor: "#ff8000",
        borderWidth: 3,
        fill: true,
        backgroundColor: createGradient(chart.ctx, chart.chartArea),
        maxBarThickness: 6,
      })),
    };

    setChartData(chartData);
  }, []);

  return (
    <>
      <div className="flex gap-5 mb-5">
        <CardComponents>
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium text-gray-600 mb-1">Sales</div>
            <div className="px-3 text-right basis-1/3">
              <div className="inline-block w-8 h-8 text-center text-white p-2 rounded-lg bg-gradient-to-tl from-orange-700 to-orange-300">
                <CircleStackIcon />
              </div>
            </div>
          </div>
          <div className="text-2xl font-medium mb-1">1.200.000.000,00</div>
          <div className="ml-3 text-lg font-bold text-green-400">+55%</div>
        </CardComponents>
        <CardComponents>
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium text-gray-600 mb-1">
              Products
            </div>
            <div className="px-3 text-right basis-1/3">
              <div className="inline-block w-8 h-8 text-center text-white p-2 rounded-lg bg-gradient-to-tl from-orange-700 to-orange-300">
                <CircleStackIcon />
              </div>
            </div>
          </div>
          <div className="text-2xl font-medium mb-1">122</div>
          <div className="ml-3 text-lg font-bold text-green-400">+55%</div>
        </CardComponents>
        <CardComponents>
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium text-gray-600 mb-1">Sales</div>
            <div className="px-3 text-right basis-1/3">
              <div className="inline-block w-8 h-8 text-center text-white p-2 rounded-lg bg-gradient-to-tl from-orange-700 to-orange-300">
                <CircleStackIcon />
              </div>
            </div>
          </div>
          <div className="text-2xl font-medium mb-1">1.200.000.000,00</div>
          <div className="ml-3 text-lg font-bold text-green-400">+55%</div>
        </CardComponents>
      </div>
      <div className="w-full h-80 px-5 py-10">
        <p className="text-xl font-semibold text-blue-gray-400 text-center">
          Monthly Report
        </p>
        <Line
          ref={ref}
          datasetIdKey="1"
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            interaction: {
              intersect: false,
              mode: "index",
            },
            scales: {
              y: {
                grid: {
                  drawBorder: false,
                  display: true,
                  drawOnChartArea: true,
                  drawTicks: false,
                  borderDash: [5, 5],
                },
                ticks: {
                  display: true,
                  padding: 10,
                  color: "#b2b9bf",
                  font: {
                    size: 11,
                    family: "Open Sans",
                    style: "normal",
                    lineHeight: 2,
                  },
                },
              },
              x: {
                grid: {
                  drawBorder: false,
                  display: false,
                  drawOnChartArea: false,
                  drawTicks: false,
                  borderDash: [5, 5],
                },
                ticks: {
                  display: true,
                  color: "#b2b9bf",
                  padding: 20,
                  font: {
                    size: 11,
                    family: "Open Sans",
                    style: "normal",
                    lineHeight: 2,
                  },
                },
              },
            },
          }}
        />
      </div>
    </>
  );
}
