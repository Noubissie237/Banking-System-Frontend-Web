import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TOTAL_DEPOT = 6;
const TOTAL_TRANSFERT = 8;
const TOTAL_RETRAIT = 13;
const TOTAL_RECHARGE = 6;

const Diagram = () => {
  const data = {
    labels: ["Dépôt", "Transfert", "Retrait", "Recharge"],
    datasets: [
      {
        label: "Opérations bancaires",
        data: [TOTAL_DEPOT, TOTAL_TRANSFERT, TOTAL_RETRAIT, TOTAL_RECHARGE],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ maxWidth: "450px", margin: "0 auto" }}>
      <h3 className="text-center">Transaction Diagram</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Diagram;
