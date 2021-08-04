import { Bar, Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import ChartDataLabels from "chartjs-plugin-datalabels";

const chartDatas = (ratings: number[]) => {
  return {
    labels: ["5 ♥", "4 ♥", "3 ♥", "2 ♥", "1 ♥"],
    datasets: [
      {
        //data: [12000, 4455, 22222, 4490, 245],
        data: ratings,
        backgroundColor: [
          "#046c5cab",
          "#41ae9179",
          "#81bfac7f",
          "#df8d987a",
          "#e469797b",
        ],
        borderColor: ["#048f7a", "#36c19c", "#81bfac", "#df8d98", "#e46979"],
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
        color: "#d3d0d0",
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
      color: "#dedada",
      text: "Users' ratings",
      font: {
        size: 16,
      },
    },
    datalabels: {
      align: "end",
      color: "#dedada",
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

const RatingChart = ({ data }) => (
  <Bar plugins={[ChartDataLabels]} data={chartDatas(data)} options={options} />
);

export default RatingChart;
