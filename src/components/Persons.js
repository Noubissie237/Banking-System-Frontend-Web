import React, { useEffect, useState } from "react";
import getAdminId from '../services/Security';

const token = localStorage.getItem('token');
const admin = getAdminId(token);



const Persons = () => {
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [notificationTitle, setNotificationTitle] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");

    const filteredPersons = persons.filter(person =>
        person.nom.toLowerCase().includes(search.toLowerCase()) ||
        person.prenom.toLowerCase().includes(search.toLowerCase()) ||
        person.tel.includes(search) ||
        person.email.toLowerCase().includes(search.toLowerCase())
    );

    const [showModal, setShowModal] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const handleNotifierClick = (person) => {
        setSelectedPerson(person);
        setShowModal(true);
    };

    useEffect(() => {
        fetch("/SERVICE-USERS/api/get-persons/" + admin[0])
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des données.");
                }
                return response.json();
            })
            .then((data) => {
                setPersons(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur :", error);
                setLoading(false);
            });
    }, []);

    const handleNotifier = (tel) => {
        const notificationData = {
            titre: notificationTitle,
            message: notificationMessage,
            idAgence: admin[0],
            destinataire: tel
        };

        fetch(`/SERVICE-NOTIFICATION/api/send-notification`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(notificationData),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Notification envoyée avec succès.");
                } else {
                    alert("Erreur lors de l'envoi de la notification.");
                }
            })
            .catch((error) => {
                console.error("Erreur :", error);
            });

        setShowModal(false);
    };



    if (loading) {
        return <p>Chargement des données...</p>;
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center mt-5" id="person">Envoyer une notification ciblée</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Rechercher par nom, prénom, téléphone ou email"
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Téléphone</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPersons.map((person) => (
                        <tr key={person.id}>
                            <td>{person.nom}</td>
                            <td>{person.prenom}</td>
                            <td>{person.tel}</td>
                            <td>{person.email}</td>
                            <td>{person.role}</td>
                            <td>
                                <button
                                    className="btn btn-sm me-2"
                                    title="Notifier"
                                    onClick={() => handleNotifierClick(person)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-chat-dots" viewBox="0 0 16 16">
                                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Envoyer une notification</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowModal(false);
                                        setNotificationTitle("");
                                        setNotificationMessage("");
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Notifier : <strong>{selectedPerson.nom} {selectedPerson.prenom}</strong></p>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Titre</label>
                                        <input
                                            type="text"
                                            id="title"
                                            className="form-control"
                                            value={notificationTitle}
                                            onChange={(e) => setNotificationTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">Message</label>
                                        <textarea
                                            id="message"
                                            className="form-control"
                                            rows="3"
                                            value={notificationMessage}
                                            onChange={(e) => setNotificationMessage(e.target.value)}
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setShowModal(false);
                                        setNotificationTitle("");
                                        setNotificationMessage("");
                                    }}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleNotifier(selectedPerson.tel)}
                                >
                                    Envoyer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Persons;