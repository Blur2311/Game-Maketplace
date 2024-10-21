import axios, { AxiosResponse, AxiosError } from 'axios';
import { env } from './env';
import { handleLockedAccount, handleForbiddenAccess } from './utils/errorHandling';

if (!env.API_URL) {
  throw new Error('API_URL không được định nghĩa trong biến môi trường');
}

const apiClient = axios.create({
  baseURL: env.API_URL
});

// Request interceptor to add Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 423) {
      handleLockedAccount((error.response.data as { message?: string })?.message || 'Account is locked');
    } else if (error.response?.status === 403) {
      handleForbiddenAccess();
    }
    return Promise.reject(error);
  }
);

export default apiClient;