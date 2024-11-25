import React, { useState, useEffect } from "react";
import axios from "axios";
import getAdminId from '../services/Security';
import '../styles/Transaction.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const token = localStorage.getItem('token');
    const admin = getAdminId(token);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(
                    "https://proxy.quick-send.site/SERVICE-TRANSACTIONS/transactions/get-all-by-agence/" + admin[0]
                );
                setTransactions(response.data);
                applyFilter(response.data, filter, searchTerm);
            } catch (error) {
                console.error("Erreur lors de la récupération des transactions :", error);
            }
        };

        fetchTransactions();
    }, [admin, filter, searchTerm]);

    const applyFilter = (data, filter, searchTerm) => {
        let filteredData = data;

        if (filter !== "ALL") {
            filteredData = data.filter(
                (transaction) => transaction.transactionType === filter
            );
        }

        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredData = filteredData.filter((transaction) =>
                transaction.transactionType.toLowerCase().includes(lowerCaseSearchTerm) ||
                transaction.numeroSender.toLowerCase().includes(lowerCaseSearchTerm) ||
                transaction.numeroReceiver.toLowerCase().includes(lowerCaseSearchTerm) ||
                transaction.amount.toString().includes(lowerCaseSearchTerm)
            );
        }

        setFilteredTransactions(filteredData);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        applyFilter(transactions, newFilter, searchTerm);
        setShowDropdown(false);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="transactions-container" style={{ padding: "20px" }}>
            <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 className="text-warning">Transactions</h2>
                <div style={{ position: "relative" }}>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "24px"
                        }}
                    >
                        ...
                    </button>
                    {showDropdown && (
                        <ul style={{
                            position: "absolute",
                            listStyleType: "none",
                            padding: "0",
                            margin: "0",
                            border: "1px solid #ccc",
                            background: "white",
                            zIndex: 1,
                            width: "150px"
                        }}>
                            <li onClick={() => handleFilterChange("ALL")} style={{ padding: "10px 15px", cursor: "pointer" }}>
                                Toutes
                            </li>
                            <li onClick={() => handleFilterChange("DEPOT")} style={{ padding: "10px 15px", cursor: "pointer" }}>
                                DEPOT
                            </li>
                            <li onClick={() => handleFilterChange("RETRAIT")} style={{ padding: "10px 15px", cursor: "pointer" }}>
                                RETRAIT
                            </li>
                            <li onClick={() => handleFilterChange("TRANSFERT")} style={{ padding: "10px 15px", cursor: "pointer" }}>
                                TRANSFERT
                            </li>
                            <li onClick={() => handleFilterChange("RECHARGE")} style={{ padding: "10px 15px", cursor: "pointer" }}>
                                RECHARGE
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ maxWidth: "300px" }}
                />
            </div>

            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col" className="text-info">Type</th>
                        <th scope="col" className="text-info">Sender</th>
                        <th scope="col" className="text-info">Receiver</th>
                        <th scope="col" className="text-info">Amount</th>
                        <th scope="col" className="text-info">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.slice().reverse().map((transaction, index) => (
                        <tr key={index}>
                            <th
                                style={{
                                    fontSize: "15px",
                                    fontFamily: "arial, Sans serif",
                                    color: transaction.transactionType === "RETRAIT" ? "red" : "green"
                                }}
                            >
                                {transaction.transactionType}
                            </th>
                            <td>
                                {transaction.numeroSender === "00000000" ? "Mon Agence" : transaction.numeroSender}
                            </td>
                            <td>{transaction.numeroReceiver}</td>
                            <td className="fw-bold">{transaction.amount.toLocaleString()} XAF</td>
                            <td>{new Date(transaction.dateEvent).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;
