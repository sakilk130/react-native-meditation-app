import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:3000';
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
