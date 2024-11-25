import React, { useEffect, useState } from "react";
import getAdminId from '../services/Security';
import "bootstrap/dist/css/bootstrap.min.css";

const Accounts = () => {
    const [clientAccounts, setClientAccounts] = useState([]);
    const [agentAccounts, setAgentAccounts] = useState([]);
    const token = localStorage.getItem('token');
    const admin = getAdminId(token);

    const fetchClientAccounts = async () => {
        try {
            const response = await fetch(
                "/SERVICE-ACCOUNT-MANAGEMENT/api/account/get-client-accounts/" + admin[0]
            );
            const data = await response.json();
            setClientAccounts(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des comptes clients :", error);
        }
    };

    const fetchAgentAccounts = async () => {
        try {
            const response = await fetch(
                "/SERVICE-ACCOUNT-MANAGEMENT/api/account/get-agent-accounts/" + admin[0]
            );
            const data = await response.json();
            setAgentAccounts(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des comptes agents :", error);
        }
    };

    useEffect(() => {
        fetchClientAccounts();
        fetchAgentAccounts();
    },);

    const handleDeleteClientAccount = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce compte ?")) {
            fetch(`/SERVICE-ACCOUNT-MANAGEMENT/accounts/${id}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (response.ok) {
                        setClientAccounts(clientAccounts.filter((clientAccount) => clientAccount.id !== id));
                        alert("Compte supprimé avec succès.");
                    } else {
                        alert("Erreur lors de la suppression du compte.");
                    }
                })
                .catch((error) => {
                    console.error("Erreur :", error);
                });
        }
    };

    const handleDeleteAgentAccount = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce compte ?")) {
            fetch(`/SERVICE-ACCOUNT-MANAGEMENT/accounts/${id}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (response.ok) {
                        setClientAccounts(agentAccounts.filter((agentAccount) => agentAccount.id !== id));
                        alert("Compte supprimé avec succès.");
                    } else {
                        alert("Erreur lors de la suppression du compte.");
                    }
                })
                .catch((error) => {
                    console.error("Erreur :", error);
                });
        }
    };

    return (
        <div className="mx-2 mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Comptes Clients</h2>
                    <div className="table-responsive">
                        {clientAccounts.length > 0 ? (
                            <table className="table table-striped table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Numéro</th>
                                        <th>Solde (XAF)</th>
                                        <th>Date de Création</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientAccounts.map((account) => (
                                        account.matricule ? null :
                                            <tr key={account.id}>
                                                <td>{account.number}</td>
                                                <td>{account.solde}</td>
                                                <td>{new Date(account.dateCreation).toLocaleString()}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-success btn-sm me-2"
                                                        onClick={() => alert("Fonction de modification à implémenter.")}
                                                    >
                                                        Recharger
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDeleteClientAccount(account.id)}
                                                    >
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center">Aucun compte client trouvé ou en cours de chargement...</p>
                        )}
                    </div>
                </div>

                <div className="col-md-6">
                    <h2 className="text-center mb-4">Comptes Agents</h2>
                    <div className="table-responsive">
                        {agentAccounts.length > 0 ? (
                            <table className="table table-striped table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Numéro</th>
                                        <th>Solde (XAF)</th>
                                        <th>Date de Création</th>
                                        <th>Matricule</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agentAccounts.map((account) => (
                                        <tr key={account.id}>
                                            <td>{account.number}</td>
                                            <td>{account.solde}</td>
                                            <td>{new Date(account.dateCreation).toLocaleString()}</td>
                                            <td>{account.matricule || "N/A"}</td>
                                            <td>
                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() => alert("Fonction de modification à implémenter.")}
                                                >
                                                    Recharger
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteAgentAccount(account.id)}
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center">Aucun compte agent trouvé ou en cours de chargement...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Accounts;
