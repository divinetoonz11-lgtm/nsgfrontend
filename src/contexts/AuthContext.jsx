import { createContext, useState, useEffect, useContext } from "react";
import api from "@/services/api.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (err) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  const saveSession = (userData, tokenData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
    setUser(userData);
    setToken(tokenData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const signup = async (formData) => {
    try {
      const res = await api.post("/auth/signup", formData);
      return res.data;
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Signup failed",
      };
    }
  };

  const login = async (formData) => {
    try {
      const res = await api.post("/auth/login", formData);
      if (res.data.success) saveSession(res.data.user, res.data.token);
      return res.data;
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed",
      };
    }
  };

  const googleLogin = async (formData) => {
    try {
      const res = await api.post("/auth/google-login", formData);
      if (res.data.success) saveSession(res.data.user, res.data.token);
      return res.data;
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Google authentication failed",
      };
    }
  };

  // ✅ Sponsor validation (backend)
  const validateSponsor = async (sponsorId) => {
    try {
      const res = await api.get(
        `/auth/validate-sponsor/${sponsorId.trim().toUpperCase()}`
      );
      return res.data;
    } catch (err) {
      return { success: false };
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signup,
        login,
        googleLogin,
        logout,
        validateSponsor,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);