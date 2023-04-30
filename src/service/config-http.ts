import axios from 'axios'

const API_URL = 'http://localhost:3030/'

export const apiRequest = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});