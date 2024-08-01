import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://seu-backend-url/api', // Substitua pelo URL do seu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;