import { SERVER_URL } from "../store/constants";
import axios from "axios";

// Create an Axios instance with default configurations
const API_URL = `${SERVER_URL}/api`;
const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Export the instance
export default http;
