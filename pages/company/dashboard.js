import { CircleStackIcon, CubeIcon } from "@heroicons/react/20/solid"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js/auto"
import { useEffect, useRef, useState } from "react"
import { Line, Chart } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const colors = [
    'red',
    'orange',
    'yellow',
    'lime',
    'green',
    'teal',
    'blue',
    'purple',
];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [180, 300, 280, 100, 500, 230, 200],
        },
        {
            label: 'Dataset 2',
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

    const ref = useRef()
    const [chartData, setChartData] = useState(
        {
            datasets: [],
        })

    useEffect(() => {
        const chart = ref.current;

        if (!chart) {
            return;
        }

        const chartData = {
            ...data,
            datasets: data.datasets.map(dataset => ({
                ...dataset,
                tension: 0.4,
                borderWidth: 0,
                pointRadius: 0,
                borderColor: "#f8fc03",
                borderWidth: 3,
                fill: true,
                backgroundColor: createGradient(chart.ctx, chart.chartArea),
                maxBarThickness: 6,
            })),
        };

        setChartData(chartData);
    }, [])


    return (
        <>
            <div class="flex flex-wrap -mx-3">

                <div class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                    <div class="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
                        <div class="flex-auto p-4">
                            <div class="flex flex-row -mx-3 h-12">
                                <div class="flex-none w-2/3 max-w-full px-3">
                                    <div>
                                        <p class="mb-0 font-sans font-semibold leading-normal text-sm">
                                            Today's Sales
                                        </p>
                                        <h5 class="mb-0 font-bold">
                                            Rp. 1.000.000,00
                                            <span class="leading-normal ml-3 text-sm font-bold text-lime-500">+55%</span>
                                        </h5>
                                    </div>
                                </div>
                                <div class="px-3 text-right basis-1/3">
                                    <div class="inline-block w-12 h-12 text-center text-white p-2 rounded-lg bg-gradient-to-tl from-orange-700 to-orange-300">
                                        <CircleStackIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                    <div class="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
                        <div class="flex-auto p-4">
                            <div class="flex flex-row -mx-3 h-12">
                                <div class="flex-none w-2/3 max-w-full px-3">
                                    <div>
                                        <p class="mb-0 font-sans font-semibold leading-normal text-sm">
                                            Products
                                        </p>
                                        <h5 class="mb-0 font-bold">
                                            Rp. 1.000.000,00
                                            <span class="leading-normal ml-3 text-sm font-bold text-lime-500">+55%</span>
                                        </h5>
                                    </div>
                                </div>
                                <div class="px-3 text-right basis-1/3">
                                    <div class="inline-block w-12 h-12 text-center text-white p-2 rounded-lg bg-gradient-to-tl from-orange-700 to-orange-300">
                                        <CubeIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                    <div class="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
                        <div class="flex-auto p-4">
                            <div class="flex flex-row -mx-3 h-12">
                                <div class="flex-none w-2/3 max-w-full px-3">
                                    <div>
                                        <p class="mb-0 font-sans font-semibold leading-normal text-sm">
                                            Inventory
                                        </p>
                                        <h5 class="mb-0 font-bold">
                                            Rp. 1.000.000,00
                                            <span class="leading-normal ml-3 text-sm font-bold text-lime-500">+55%</span>
                                        </h5>
                                    </div>
                                </div>
                                <div class="px-3 text-right basis-1/3">
                                    <div class="inline-block w-12 h-12 text-center text-white p-2 rounded-lg bg-gradient-to-tl from-orange-700 to-orange-300">
                                        <CubeIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                    <div class="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
                        <div class="flex-auto p-4">
                            <div class="flex flex-row -mx-3 h-12">
                                <div class="flex-none w-2/3 max-w-full px-3">
                                    <div>
                                        <p class="mb-0 font-sans font-semibold leading-normal text-sm">
                                            Monthly Report
                                        </p>
                                        <h5 class="mb-0 font-bold">
                                            Rp. 1.000.000,00
                                            <span class="leading-normal ml-3 text-sm font-bold text-lime-500">+55%</span>
                                        </h5>
                                    </div>
                                </div>
                                <div class="px-3 text-right basis-1/3">
                                    <div class="inline-block w-12 h-12 text-center text-white p-2 rounded-lg bg-gradient-to-tl from-orange-700 to-orange-300">
                                        <CircleStackIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-full h-80">
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
    )
}
