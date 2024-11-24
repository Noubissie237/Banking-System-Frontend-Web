import axios from 'axios';
import getAdminId from '../services/Security';
const BASE_URL = '/SERVICE-USERS/api';
const BASE_URL_ADMIN = '/SERVICE-ADMIN/api/agence';


const token = localStorage.getItem('token');
const admin = getAdminId(token);



export const getClients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-clients-agence/` + admin[0]);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des clients :', error);
    throw error;
  }
};


export const getAgents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-agents-agence/` + admin[0]);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des agents :', error);
    throw error;
  }
};


export const getSolde = async () => {
  try {
    const response = await axios.get(`${BASE_URL_ADMIN}/get-solde-agence/` + admin[0]);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des agents :', error);
    throw error;
  }
};
