import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:2370', // Change cette URL selon ton backend
  timeout: 10000,
});

export default instance;
