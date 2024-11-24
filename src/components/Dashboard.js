import React, { useState, useEffect } from 'react';
import CardInfo from "./CardInfo";
import { getAgents, getClients } from "../services/apiService";
import Demandes from './Demandes';
import getAdminId from '../services/Security';

const Dashboard = () => {

  const [clients, setClients] = useState([]);
  const [agents, setAgents] = useState([]);
  const token = localStorage.getItem('token');
  const admin = getAdminId(token);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const client = await getClients();
        setClients(client);
      } catch (error) {
        console.log("Impossible de charger les clients");
      }
    };
    fetchClient();
  }, []
  );

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const agent = await getAgents();
        setAgents(agent);
      } catch (error) {
        console.log("Impossible de charger les agents");
      }
    };
    fetchAgent();
  }, []
  );

  return (

    <div className="p-4">
      <div className="row mb-4">
        <CardInfo title="Solde" color="success" icon="bi-cash-coin" value={admin[2]} unit="XAF"
          svg={
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="green" className="bi bi-cash-coin" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0" />
              <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
              <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
              <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
            </svg>
          }
        />
        <CardInfo title="Clients" color="warning" icon="bi-people" value={clients.length} unit="Client(s)"
          svg={
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="orange" className="bi bi-people" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
            </svg>
          }
        />
        <CardInfo title="Agents" color="primary" icon="bi-person-bounding-box" value={agents.length} unit="Agent(s)"
          svg={
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="blue" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
              <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            </svg>
          } />
      <Demandes />
      </div>
    </div>

  );

};

export default Dashboard;