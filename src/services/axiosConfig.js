import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:2370',
  timeout: 10000,
});


// axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default instance;
