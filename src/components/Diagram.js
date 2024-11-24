import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import getAdminId from "../services/Security";

ChartJS.register(ArcElement, Tooltip, Legend);

const Diagram = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionCounts, setTransactionCounts] = useState({
    DEPOT: 0,
    TRANSFERT: 0,
    RETRAIT: 0,
    RECHARGE: 0,
  });

  const token = localStorage.getItem("token");
  const admin = getAdminId(token);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `/SERVICE-TRANSACTIONS/transactions/get-all-by-agence/${admin[0]}`
        );

        const data = response.data;

        const counts = data.reduce(
          (acc, transaction) => {
            acc[transaction.transactionType] =
              (acc[transaction.transactionType] || 0) + 1;
            return acc;
          },
          { DEPOT: 0, TRANSFERT: 0, RETRAIT: 0, RECHARGE: 0 }
        );

        setTransactionCounts(counts);
        setTransactions(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des transactions :", error);
      }
    };

    fetchTransactions();
  }, [admin]);

  const data = {
    labels: ["Dépôt", "Transfert", "Retrait", "Recharge"],
    datasets: [
      {
        label: "Opérations bancaires",
        data: [
          transactionCounts.DEPOT,
          transactionCounts.TRANSFERT,
          transactionCounts.RETRAIT,
          transactionCounts.RECHARGE,
        ],
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
