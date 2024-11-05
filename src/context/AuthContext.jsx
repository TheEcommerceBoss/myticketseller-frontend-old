import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../api";
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
          const response = await api.get("/user", {
            headers: {
              Authorization: `Bearer ${token}`,  
            },
          });
          console.log(token)
          setUserData(response.data);  
        } catch (error) {
          console.error("Failed to fetch user:", error);
          navigate('/logout'); 
        }
      };

      fetchUser();
    }
  }, [isAuthenticated, navigate]);  

  const signup = async (userData) => {
    try {
      const response = await api.post("/signup", userData);
      const { token } = response.data;
      Cookies.set("auth_token", token, { expires: 7 });
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Failed to sign up");
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post("/login", credentials);
      const { token } = response.data;
      Cookies.set("auth_token", token, { expires: 7 });
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Failed to log in");
    }
  };

  const logout = () => {
    Cookies.remove("auth_token");
    setIsAuthenticated(false);
    setUserData(null); // Clear user data on logout
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
