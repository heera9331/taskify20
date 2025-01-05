import React from "react";
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/",
  baseURL: "http://67.217.245.73/myapp/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add Authorization token to requests
axiosInstance.interceptors.request.use(
  (config: { headers: { Authorization: string; }; }) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// // Interceptor to handle responses globally
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors globally
//     if (error.response) {
//       console.error(
//         `API Error: ${error.response.status} - ${
//           error.response.data.message || error.message
//         }`
//       );
//     } else {
//       console.error(`Network Error: ${error.message}`);
//     }
//     return Promise.reject(error);
//   }
// );

export { axiosInstance as axios };
