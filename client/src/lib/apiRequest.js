// import axios from "axios";

// const apiRequest = axios.create({
//   baseURL: "http://localhost:8800/api",
//   withCredentials: true,
// });

// export default apiRequest;

// import axios from "axios";

// const apiRequest = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });

// export default apiRequest;

import axios from "axios";

// Create Axios instance
const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// // Add request interceptor for logging and setting Authorization header
// apiRequest.interceptors.request.use((config) => {
//   console.log("Sending request to:", config.url);
//   console.log("With credentials:", config.withCredentials);

//   // Retrieve the token from localStorage
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//     console.log("Authorization header set:", config.headers.Authorization);
//   } else {
//     console.log("No token found in localStorage");
//   }

//   return config;
// }, (error) => {
//   console.error("Request error:", error);
//   return Promise.reject(error);
// });

// // Add response interceptor for debugging responses
// apiRequest.interceptors.response.use((response) => {
//   console.log("Response received from:", response.config.url);
//   console.log("Response status:", response.status);
//   return response;
// }, (error) => {
//   console.error("Response error:", error.response?.status);
//   return Promise.reject(error);
// });

export default apiRequest;
