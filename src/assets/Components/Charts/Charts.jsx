import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ currency }) => {
  const [chartData, setChartData] = useState([]);
  const { id } = useParams();
  const [days, setDays] = useState(1);

  const getChartData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    );
    const data = await response.json();
    setChartData(data.prices);
  };

  useEffect(() => {
    getChartData();
  }, [id, currency, days]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.25,
        borderWidth: 2,
        borderColor: '#ff6b6b',
        backgroundColor: "rgba(255, 107, 107, 0.2)",
      },
      point: {
        radius: 3,
        backgroundColor: '#ff6b6b',
        borderColor: '#fff',
        hoverRadius: 6,
        hoverBorderWidth: 2,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
          color: '#555',
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
          color: '#555',
        },
        grid: {
          color: '#eee',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `Price Changes for ${id.toUpperCase()} (${currency.toUpperCase()}) - Last ${days} Day(s)`,
        color: '#333',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
  };

  const chartDataConfig = {
    labels: chartData.map((value) => {
      const date = new Date(value[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Price in ${currency.toUpperCase()}`,
        data: chartData.map((value) => value[1]),
        borderColor: "#ff6b6b",
        borderWidth: 2,
        backgroundColor: "rgba(255, 107, 107, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-4">
      {/* Chart Container */}
      <div className="relative w-full" style={{ height: "400px" }}>
        <Line data={chartDataConfig} options={chartOptions} />
      </div>

      {/* Buttons to change time period */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition-colors duration-300"
          onClick={() => setDays(1)}
        >
          24 Hours
        </button>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition-colors duration-300"
          onClick={() => setDays(30)}
        >
          1 Month
        </button>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition-colors duration-300"
          onClick={() => setDays(365)}
        >
          1 Year
        </button>
      </div>
    </div>
  );
};

export default Charts;
