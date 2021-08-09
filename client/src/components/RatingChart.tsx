import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import ChartDataLabels from "chartjs-plugin-datalabels";

const chartDatas = (ratings: number[]) => {
  return {
    labels: ["5 ♥", "4 ♥", "3 ♥", "2 ♥", "1 ♥"],
    datasets: [
      {
        data: ratings,
        backgroundColor: [
          "#10a38dcc",
          "#5bc0a5ab",
          "#a6dfce93",
          "#ecafb779",
          "#ec84927a",
        ],
        borderColor: [
          "#037261",
          "#36c19cd2",
          "#81bfacdf",
          "#d8a0a8be",
          "#eb7585c5",
        ],
        borderWidth: 1.5,
        categoryPercentage: 1.0,
        barPercentage: 0.5,
      },
    ],
  };
};

const options = {
  indexAxis: "y",
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: "#b9c2c0",
        autoSkip: false,
        font: {
          size: () => {
            if (window.innerWidth > 499) {
              return "18";
            }
            return "12";
          },
        },
      },
    },
  },
  layout: {
    padding: {
      right: 20,
    },
  },
  animation: false,
  responsive: true,
  aspectRatio: () => {
    if (window.innerWidth > 499) {
      return "2";
    }
    return "1.7";
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      color: "#b9c2c0",
      text: "Users' ratings",
      font: {
        size: 16,
      },
    },
    datalabels: {
      align: "end",
      color: "#a19fa0",
      anchor: "end",
      offset: 7,
      font: () => {
        const size = window.innerWidth > 499 ? "15" : "12";
        return {
          size,
        };
      },
    },
  },
};

interface RatingChartProps {
  data: number[];
}

const RatingChart: React.FC<RatingChartProps> = ({ data }) => (
  <Bar plugins={[ChartDataLabels]} data={chartDatas(data)} options={options} />
);

export default RatingChart;
