// import axios from "axios"

// const apiRequest = axios.create({
//     baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8800/api',  // Fallback to local server if env variable is missing
//     withCredentials: true,
// });

// export default apiRequest;

import axios from "axios";

// Create an Axios instance with default settings
const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8800/api',  // Fallback to local server if env variable is missing
    withCredentials: true,  // Allows cookies and tokens to be sent with requests
});

// Add a request interceptor to include the token in the headers if available
apiRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
         // Replace with your token storage method
         console.log("token data",{token});
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Log any request errors
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle any errors in responses
apiRequest.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check for 401 Unauthorized response
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized! Check your authentication.");
            // Optionally, redirect to login page or handle re-authentication
        }
        return Promise.reject(error);
    }
);

export default apiRequest;
