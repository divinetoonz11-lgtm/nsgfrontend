import axios from "axios";

// ✅ Backend URL (VPS)
const api = axios.create({
  baseURL: "http://187.127.146.140:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // important for auth
});

// ✅ Request interceptor (token auto attach)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor (error handle)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    // Optional: auto logout if token invalid
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;