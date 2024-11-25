import React, { useEffect, useState } from "react";
import CardInfo from "./CardInfo";
import getAdminId from '../services/Security';


const Agents = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newAgent, setNewAgent] = useState({ nom: '', prenom: '', email: '', tel: '', numero_cni: '' });

    const token = localStorage.getItem('token');
    const admin = getAdminId(token);

    useEffect(() => {
        fetch("https://proxy.quick-send.site/SERVICE-USERS/api/get-agents-agence/"+admin[0])
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des données.");
                }
                return response.json();
            })
            .then((data) => {
                setAgents(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur :", error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce agent ?")) {
            fetch(`https://proxy.quick-send.site/SERVICE-USERS/api/delete-agent/${id}`, {
                method: "GET",
            })
                .then((response) => {
                    if (response.ok) {
                        setAgents(agents.filter((agent) => agent.id !== id));
                        alert("Agent supprimé avec succès.");
                    } else {
                        alert("Erreur lors de la suppression du agent.");
                    }
                })
                .catch((error) => {
                    console.error("Erreur :", error);
                });
        }
    };

    const handleDetails = (agent) => {
        alert(
            `Détails de l'agent : \n\nMatricule : ${agent.matricule}\nNom : ${agent.nom}\nPrénom : ${agent.prenom}\nEmail : ${agent.email}\nTéléphone : ${agent.tel}\nCNI : ${agent.numero_cni}`
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAgent({ ...newAgent, [name]: value });
    };

    const handleAddAgent = () => {
        fetch('https://proxy.quick-send.site/SERVICE-USERS/api/add-agent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAgent),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erreur lors de l\'ajout du agent');
                }
            })
            .then((data) => {
                setAgents([...agents, data]); 
                setShowModal(false); 
                setNewAgent({ nom: '', prenom: '', email: '', tel: '' });
            })
            .catch((error) => {
                console.error("Erreur :", error);
            });
    };

    if (loading) {
        return <p>Chargement des données...</p>;
    }

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <CardInfo
                    title="Agents"
                    color="primary"
                    icon="bi-people"
                    value={agents.length}
                    unit="Agent(s)"
                    svg={
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="blue" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      </svg>
                    }
                />
            </div>
            <button className="btn btn-success mb-3" onClick={() => setShowModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                </svg>
                <span className="mx-2">
                    Ajouter
                </span>
            </button>

            <h1 className="mb-4">Liste des Agents</h1>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Matricule</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {agents.map((agent) => (
                        <tr key={agent.id}>
                            <td>{agent.matricule}</td>
                            <td>{agent.nom}</td>
                            <td>{agent.prenom}</td>
                            <td>{agent.email}</td>
                            <td>{agent.tel}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleDetails(agent)}
                                >
                                    Voir
                                </button>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => alert("Fonction de modification à implémenter.")}
                                >
                                    Modifier
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(agent.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ajouter un nouvel agent</h5>
                                <button type="button" className="close ms-auto" onClick={() => setShowModal(false)}>
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="nom" className="form-label">Nom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nom"
                                            name="nom"
                                            value={newAgent.nom}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="prenom" className="form-label">Prénom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="prenom"
                                            name="prenom"
                                            value={newAgent.prenom}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={newAgent.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tel" className="form-label">Téléphone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="tel"
                                            name="tel"
                                            value={newAgent.tel}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="numero_cni" className="form-label">Numéro CNI</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="numero_cni"
                                            name="numero_cni"
                                            value={newAgent.numero_cni}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="recto_cni" className="form-label">Recto CNI</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="recto_cni"
                                            name="recto_cni"
                                            value={newAgent.recto_cni}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="verso_cni" className="form-label">Verso CNI</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="verso_cni"
                                            name="verso_cni"
                                            value={newAgent.verso_cni}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={newAgent.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Annuler
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleAddAgent}>
                                    Ajouter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Agents;