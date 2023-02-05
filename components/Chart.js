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
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);


function createGradient(ctx, area) {
    const gradient = ctx.createLinearGradient(0, 230, 0, 50);

    gradient.addColorStop(1, "rgba(20,23,39,0.2)");
    gradient.addColorStop(0.2, "rgba(72,72,176,0.0)");
    gradient.addColorStop(0, "rgba(20,23,39,0)");

    return gradient;
}

export default function Dashboard({ labels, datasets }) {
    const ref = useRef();
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    const data = {
        labels,
        datasets
    };


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
        </>
    );
}
