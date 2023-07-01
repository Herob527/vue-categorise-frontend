import axios from 'axios';
import { API_URL } from './constants';

const axiosApi = axios.create({
  url: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export { axiosApi };
