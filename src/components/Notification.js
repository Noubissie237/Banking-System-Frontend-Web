import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Persons from "./Persons";
import getAdminId from '../services/Security';

const token = localStorage.getItem('token');
const admin = getAdminId(token);

const Notification = () => {
    const [showModal, setShowModal] = useState(false);
    const [notificationType, setNotificationType] = useState("");
    const [notificationTitle, setNotificationTitle] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");

    const handleOpenModal = (type) => {
        setNotificationType(type);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNotificationTitle("");
        setNotificationMessage("");
    };

    const handleSendNotification = () => {

        const notificationData = {
            titre: notificationTitle,
            message: notificationMessage,
            idAgence: admin[0],
            destinataire: notificationType
        };

        fetch(`https://proxy.quick-send.site/SERVICE-NOTIFICATION/api/send-notification`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(notificationData),
        })
            .then((response) => {
                if (response.ok) {
                    alert(
                        `Notification envoyée à ${notificationType} :\n\nTitre: ${notificationTitle}\nMessage: ${notificationMessage}`
                    );
                } else {
                    alert("Erreur lors de l'envoi de la notification.");
                }
            })
            .catch((error) => {
                console.error("Erreur :", error);
            });

        handleCloseModal();
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Notifications</h1>
            <div className="row">

                <div className="col-md-4">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5 className="card-title">Clients</h5>
                            <p className="card-text">
                                Envoyez une notification à tous les clients enregistrés.
                            </p>
                            <button
                                className="btn btn-warning"
                                onClick={() => handleOpenModal("tous les clients")}
                            >
                                Envoyer aux clients
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5 className="card-title">Agents</h5>
                            <p className="card-text">
                                Envoyez une notification à tous les agents de votre système.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleOpenModal("tous les agents")}
                            >
                                Envoyer aux agents
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5 className="card-title">Utilisateurs</h5>
                            <p className="card-text">
                                Envoyez une notification à tous les utilisateurs du système.
                            </p>
                            <button
                                className="btn btn-success"
                                onClick={() => handleOpenModal("tous les utilisateurs")}
                            >
                                Envoyer aux utilisateurs
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Persons />

            {showModal && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Envoyer une notification à {notificationType}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">
                                            Titre de la notification
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            value={notificationTitle}
                                            onChange={(e) => setNotificationTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">
                                            Message de la notification
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="message"
                                            rows="4"
                                            value={notificationMessage}
                                            onChange={(e) =>
                                                setNotificationMessage(e.target.value)
                                            }
                                            required
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSendNotification}
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

export default Notification;
