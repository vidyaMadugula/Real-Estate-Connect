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

// Add request interceptor for logging
apiRequest.interceptors.request.use((config) => {
  console.log("Sending request to:", config.url);
  console.log("With credentials:", config.withCredentials);
  console.log("Authorization header:", config.headers.Authorization);
  return config;
}, (error) => {
  // Handle request error here
  console.error("Request error:", error);
  return Promise.reject(error);
});

// Add response interceptor for debugging responses
apiRequest.interceptors.response.use((response) => {
  console.log("Response received from:", response.config.url);
  console.log("Response status:", response.status);
  return response;
}, (error) => {
  // Handle response error here
  console.error("Response error:", error.response?.status);
  return Promise.reject(error);
});

export default apiRequest;
