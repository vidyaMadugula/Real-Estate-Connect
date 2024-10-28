import axios from "axios"
// const apiRequest=axios.create({
//     baseURL:process.env.API_URL,
//     withCredentials:true,
// });

const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8800/api',  // Fallback to local server if env variable is missing
    withCredentials: true,
});

export default apiRequest;