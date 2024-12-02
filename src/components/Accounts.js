import React, { useEffect, useState } from "react";
import getAdminId from '../services/Security';
import "bootstrap/dist/css/bootstrap.min.css";

const Accounts = () => {
    const [clientAccounts, setClientAccounts] = useState([]);
    const [agentAccounts, setAgentAccounts] = useState([]);
    const [filteredClientAccounts, setFilteredClientAccounts] = useState([]);
    const [filteredAgentAccounts, setFilteredAgentAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [rechargeAmount, setRechargeAmount] = useState("");
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem('token');
    const admin = getAdminId(token);

    const fetchClientAccounts = async () => {
        try {
            const response = await fetch(
                "https://proxy.quick-send.site/SERVICE-ACCOUNT-MANAGEMENT/api/account/get-client-accounts/" + admin[0]
            );
            const data = await response.json();
            setClientAccounts(data);
            setFilteredClientAccounts(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des comptes clients :", error);
        }
    };

    const fetchAgentAccounts = async () => {
        try {
            const response = await fetch(
                "https://proxy.quick-send.site/SERVICE-ACCOUNT-MANAGEMENT/api/account/get-agent-accounts/" + admin[0]
            );
            const data = await response.json();
            setAgentAccounts(data);
            setFilteredAgentAccounts(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des comptes agents :", error);
        }
    };

    const handleRecharge = async () => {
        if (!selectedAccount || !rechargeAmount) {
            alert("Veuillez entrer un montant valide.");
            return;
        }
        try {
            const response = await fetch(
                "https://proxy.quick-send.site/SERVICE-ADMIN/api/demande/recharge-account",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        'agence': admin[0],
                        'numero': selectedAccount.number,
                        'montant': parseFloat(rechargeAmount),
                    }),
                }
            );
            if (response.ok) {
                alert("Recharge effectuée avec succès !");
                setRechargeAmount("");
                setShowModal(false);
                fetchClientAccounts();
            } else {
                const errorData = await response.json();
                alert(`Erreur : ${errorData.message}`);
            }
        } catch (error) {
            console.error("Erreur lors de la recharge :", error);
            alert("Une erreur est survenue lors de la recharge.");
        }
    };

    useEffect(() => {
        fetchClientAccounts();
        fetchAgentAccounts();
    }, [], []);

    useEffect(() => {
        const filteredClients = clientAccounts.filter(account =>
            account.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.matricule?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const filteredAgents = agentAccounts.filter(account =>
            account.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.matricule?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredClientAccounts(filteredClients);
        setFilteredAgentAccounts(filteredAgents);
    }, [searchTerm, clientAccounts, agentAccounts]);

    const handleDeleteClientAccount = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce compte ?")) {
            fetch(`https://proxy.quick-send.site/SERVICE-ACCOUNT-MANAGEMENT/accounts/${id}`, {
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
            fetch(`https://proxy.quick-send.site/SERVICE-ACCOUNT-MANAGEMENT/accounts/${id}`, {
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
                <div style={{ marginBottom: "20px" }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rechercher (par numéro ou matricule)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ maxWidth: "300px" }}
                    />
                </div>
            <div className="row mb-4">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Comptes Clients</h2>
                    <div className="table-responsive">
                        {filteredClientAccounts.length > 0 ? (
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
                                    {filteredClientAccounts.map((account) => (
                                        account.matricule ? null :
                                            <tr key={account.id}>
                                                <td>{account.number}</td>
                                                <td>{account.solde}</td>
                                                <td>{new Date(account.dateCreation).toLocaleString()}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-success btn-sm me-2"
                                                        onClick={() => {
                                                            setSelectedAccount(account);
                                                            setShowModal(true);
                                                        }}
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
                        {filteredAgentAccounts.length > 0 ? (
                            <table className="table table-striped table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Matricule</th>
                                        <th>Numéro</th>
                                        <th>Solde (XAF)</th>
                                        <th>Date de Création</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAgentAccounts.map((account) => (
                                        <tr key={account.id}>
                                            <td>{account.matricule || "N/A"}</td>
                                            <td>{account.number}</td>
                                            <td>{account.solde}</td>
                                            <td>{new Date(account.dateCreation).toLocaleString()}</td>
                                            <td>
                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() => {
                                                        setSelectedAccount(account);
                                                        setShowModal(true);
                                                    }}
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

            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content bg-info">
                            <div className="modal-header">
                                <h5 className="modal-title">Recharger le compte</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Numéro de compte : {selectedAccount.number}</p>
                                <div className="mb-3">
                                    <label htmlFor="rechargeAmount" className="form-label">Montant à recharger</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="rechargeAmount"
                                        value={rechargeAmount}
                                        onChange={(e) => setRechargeAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleRecharge}
                                >
                                    Recharger
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );

};

export default Accounts;
