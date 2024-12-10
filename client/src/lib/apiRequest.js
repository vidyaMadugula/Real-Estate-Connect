

import axios from "axios";

const apiRequest = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
  //  baseURL: "http://localhost:8800/api",
  withCredentials: true,
});

export default apiRequest;
