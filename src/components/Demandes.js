import React, { useEffect, useState } from "react";
import CardInfo from "./CardInfo";

const Demandes = () => {
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/SERVICE-ADMIN/api/demande/get-all")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des données.");
                }
                return response.json();
            })
            .then((data) => {
                setDemandes(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur :", error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce demande ?")) {
            fetch(`/SERVICE-ADMIN/demandes/${id}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (response.ok) {
                        setDemandes(demandes.filter((demande) => demande.id !== id));
                        alert("Demande supprimé avec succès.");
                    } else {
                        alert("Erreur lors de la suppression du demande.");
                    }
                })
                .catch((error) => {
                    console.error("Erreur :", error);
                });
        }
    };

    const handleReject = (id) => {
        if (window.confirm("Voulez-vous vraiment rejetter ce demande ?")) {
            fetch(`/SERVICE-ADMIN/api/demande/update-statut/${id}?statut=REJETEE`, {
                method: "PUT",
            })
                .then((response) => {
                    if (response.ok) {
                        setDemandes(demandes.filter((demande) => demande.id !== id));
                        alert("Demande rejettée avec succès.");
                    } else {
                        alert("Erreur lors du rejet de la demande.");
                    }
                })
                .catch((error) => {
                    console.error("Erreur :", error);
                });
        }
    };

    const handleAccept = (id) => {
        fetch(`/SERVICE-ADMIN/api/demande/update-statut/${id}?statut=ACCEPTEE`, {
            method: "PUT",
        })
            .then((response) => {
                if (response.ok) {
                    setDemandes(demandes.filter((demande) => demande.id !== id));
                    alert("Demande acceptée avec succès.");
                } else {
                    alert("Erreur lors de la validation de la demande.");
                }
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


            <h1 className="mb-4 text-center mt-5" id="demande">Demandes d'ouverture de compte ({demandes.length})</h1>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Téléphone</th>
                        <th>Numéro CNI</th>
                        <th>Date</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {demandes.map((demande) => (
                        <tr key={demande.id}>
                            <td>{demande.clientNom}</td>
                            <td>{demande.clientPrenom}</td>
                            <td>{demande.clientTel}</td>
                            <td>{demande.clientNumeroCni}</td>
                            <td>{demande.dateCreation}</td>
                            <td>{demande.statut}</td>
                            <td>
                                <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() => handleAccept(demande.id)}
                                >
                                    Accepter
                                </button>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleReject(demande.id)}
                                >
                                    Rejetter
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(demande.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Demandes;