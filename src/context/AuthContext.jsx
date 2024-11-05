import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("auth_token"));
  const navigate = useNavigate();

  const signup = async (userData) => {
    try {
      console.log('start')
      const response = await api.post("/signup", userData);
      const { token } = response.data.token;
      console.log(response)

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
      console.log('start')
      const response = await api.post("/login", credentials);
      const { token } = response.data.token;
      // console.log(response)

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
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
