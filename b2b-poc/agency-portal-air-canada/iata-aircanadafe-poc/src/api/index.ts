import axios, { AxiosInstance, AxiosResponse } from "axios";

export const API: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

API.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error): Promise<never> => {
    if (error.response?.status === 401) {
      // Redirect to login page
      window.location.href = "/denied-login";
    }
    return Promise.reject(error);
  },
);
