import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { API_URL } from 'constants/api';

const axiosInstance = (baseURL: string) => axios.create({
  baseURL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export const apiClient = applyCaseMiddleware(axiosInstance(API_URL), {
  ignoreHeaders: true
});
