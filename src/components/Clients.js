import React, { useEffect, useState } from "react";
import CardInfo from "./CardInfo";
import getAdminId from '../services/Security';


const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newClient, setNewClient] = useState({ nom: '', prenom: '', email: '', tel: '', numero_cni: '' });

    const token = localStorage.getItem('token');
    const admin = getAdminId(token);
    useEffect(() => {
        fetch('https://proxy.quick-send.site/SERVICE-USERS/api/get-clients-agence/'+admin[0])
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des données.");
                }
                return response.json();
            })
            .then((data) => {
                setClients(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur :", error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce client ?")) {
            fetch(`https://proxy.quick-send.site/SERVICE-USERS/api/delete-client/${id}`, {
                method: "GET",
            })
                .then((response) => {
                    if (response.ok) {
                        setClients(clients.filter((client) => client.id !== id));
                        alert("Client supprimé avec succès.");
                    } else {
                        alert("Erreur lors de la suppression du client.");
                    }
                })
                .catch((error) => {
                    console.error("Erreur :", error);
                });
        }
    };

    const handleDetails = (client) => {
        alert(
            `Détails du client : \n\nNom : ${client.nom}\nPrénom : ${client.prenom}\nEmail : ${client.email}\nTéléphone : ${client.tel}\nCNI : ${client.numero_cni}`
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient({ ...newClient, [name]: value });
    };

    const handleAddClient = () => {
        fetch('https://proxy.quick-send.site/SERVICE-USERS/api/add-client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newClient),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erreur lors de l\'ajout du client');
                }
            })
            .then((data) => {
                setClients([...clients, data]);
                setShowModal(false);
                setNewClient({ nom: '', prenom: '', email: '', tel: '' });
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
                    title="Clients"
                    color="warning"
                    icon="bi-people"
                    value={clients.length}
                    unit="Client(s)"
                    svg={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            fill="orange"
                            className="bi bi-people"
                            viewBox="0 0 16 16"
                        >
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
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

            <h1 className="mb-4">Liste des Clients</h1>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.nom}</td>
                            <td>{client.prenom}</td>
                            <td>{client.email}</td>
                            <td>{client.tel}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleDetails(client)}
                                >
                                    Voir
                                </button>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => alert("Cette fonctionnalité sera bientôt disponible")}
                                >
                                    Modifier
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(client.id)}
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
                                <h5 className="modal-title">Ajouter un nouveau client</h5>
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
                                            value={newClient.nom}
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
                                            value={newClient.prenom}
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
                                            value={newClient.email}
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
                                            value={newClient.tel}
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
                                            value={newClient.numero_cni}
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
                                            value={newClient.recto_cni}
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
                                            value={newClient.verso_cni}
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
                                            value={newClient.password}
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
                                <button type="button" className="btn btn-primary" onClick={handleAddClient}>
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

export default Clients;