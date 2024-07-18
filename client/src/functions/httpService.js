import axios from 'axios';

// Create an Axios instance with default configurations
const http = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Export the instance
export default http;