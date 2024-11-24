import axios from 'axios';

const BASE_URL = '/SERVICE-USERS/api';

export const getClients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-clients`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des clients :', error);
    throw error; 
  }
};


export const getAgents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-agents`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des agents :', error);
      throw error; 
    }
  };
  