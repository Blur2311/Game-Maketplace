import axios, { AxiosResponse, AxiosError } from 'axios';
import Swal from 'sweetalert2';
import {env} from './env';

const apiClient = axios.create({
  baseURL: env.API_URL
});

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

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 423) {
      Swal.fire({
        icon: 'error',
        title: 'Tài khoản đang bị khóa',
        text: (error.response.data as { message?: string })?.message
      });
    } else if (error.response?.status === 403) {
      // console.error('fix the api usage: ', error?.request?.responseURL);
      // Swal.fire({
      //   icon: 'error',
      //   title: 'fix api usage now!!!'
      // });
    } else if (error?.response) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: (error.response.data as { message?: string })?.message
        });
    }
    return Promise.reject(error);
  }
);

export default apiClient;