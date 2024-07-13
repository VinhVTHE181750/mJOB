import {Bar} from "react-chartjs-2";
import {CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip,} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`);

const deposited = Array.from({ length: 14 }, () =>
  Math.floor(Math.random() * 500 + 100)
);
const withdrawn = Array.from(
  { length: 14 },
  (_, i) => -Math.floor(deposited[i] * (Math.random() * 0.5))
);
const earn = Array.from({ length: 14 }, (_, i) =>
  Math.floor(deposited[i] + Math.abs(withdrawn[i]) * (Math.random() + 1))
);
const spent = Array.from(
  { length: 14 },
  (_, i) => -Math.floor(earn[i] * (Math.random() * 0.5))
);

let balance = Array(14).fill(0);
balance = Array.from({ length: 14 }, (_, i) => {
  if (i === 0) {
    return deposited[i] + withdrawn[i] + earn[i] + spent[i];
  } else {
    return balance[i - 1] + deposited[i] + withdrawn[i] + earn[i] + spent[i];
  }
});

const data = {
  labels,
  datasets: [
    {
      label: "Balance",
      data: balance,
      backgroundColor: "blue",
      type: "line",
      fill: false,
    },
    {
      label: "Deposited",
      data: deposited,
      backgroundColor: "green",
      type: "bar",
      barThickness: 10,
    },
    {
      label: "Withdrawn",
      data: withdrawn,
      backgroundColor: "orange",
      type: "bar",
      barThickness: 10,
    },
    {
      label: "Earn",
      data: earn,
      backgroundColor: "lightgreen",
      type: "bar",
      barThickness: 10,
    },
    {
      label: "Spent",
      data: spent,
      backgroundColor: "red",
      type: "bar",
      barThickness: 10,
    },
  ],
};

const options = {
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  animation: {
    duration: 5000, // duration of the animation in milliseconds
    easing: "easeOutQuint", // easing function to use
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  },
};

export default function BalanceChart() {
  return <Bar data={data} options={options} />;
}
