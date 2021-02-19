import axios from 'axios';
import {API_URL} from '@env';

export const authLogin = (data) => {
  return axios.post(`${API_URL}/auth/login`, data);
};
