import axios from "axios";
import { config } from "dotenv";

config({ path: ".env" });

const API_URL = process.env.CASSO_API_URL;

const cassoReqInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Apikey ${process.env.API_KEY_CASSO}`,
  },
});

// Response interceptors for API calls
cassoReqInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptors for API calls
cassoReqInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default cassoReqInstance;
