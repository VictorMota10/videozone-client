import axios from 'axios'

export const apiRequest = axios.create({
  baseURL: 'http://localhost:3030/',
  timeout: 15000,
});