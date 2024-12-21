

// import axios from "axios";

// const apiRequest = axios.create({
//   //  baseURL: import.meta.env.VITE_API_URL,
//    baseURL: "http://localhost:8800/api",
//   withCredentials: true,
// });

// export default apiRequest;

import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "http://localhost:8800/api",
  withCredentials: true, // Ensure cookies are included in requests
});

// Add a request interceptor to attach the Authorization header
apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiRequest;
