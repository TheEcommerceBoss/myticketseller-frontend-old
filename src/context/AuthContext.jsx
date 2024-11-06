import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("auth_token"));
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUser = async () => {
        try {
          const token = Cookies.get("auth_token");
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(token)
          setUserData(response.data);
        } catch (error) {
          console.error("Failed to fetch user:", error);

          setIsAuthenticated(false);
          Cookies.remove("auth_token");
          navigate('/login');
        }
      };
      fetchUser();
    }
  }, [isAuthenticated, navigate]);


  const signup = async (userData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, userData);
      const { token } = response.data;
      Cookies.set("auth_token", token, { expires: 7 });
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error(error.response?.data?.message || "Failed to sign up");
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, credentials);
      const { token } = response.data;
      Cookies.set("auth_token", token, { expires: 7 });
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.message || "Failed to log in");
    }
  };

  const logout = () => {
    Cookies.remove("auth_token");
    setIsAuthenticated(false);
    setUserData(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
