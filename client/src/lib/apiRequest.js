

import axios from "axios";

// const apiRequest = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   // baseURL: "http://localhost:8800/api",
//   withCredentials: true,
//   timeout: 10000,
// });
const token = localStorage.getItem("token"); 
const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "http://localhost:8800/api",
  withCredentials: true,
  headers: { Authorization: `Bearer ${token}` }
});

export default apiRequest;

