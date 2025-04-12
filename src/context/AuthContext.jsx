import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { authApi } from "../shared/services/api.ts";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("access_token")
  );
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     const fetchUser = async () => {
  //       const maxRetries = 5;
  //       let attempt = 0;
  //       const token = Cookies.get("auth_token");
  //       while (attempt < maxRetries) {
  //         try {
  //           const response = await axios.get(
  //             `${import.meta.env.VITE_API_URL}/user`,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             }
  //           );
  //           setUserData(response.data);
  //           console.log(response.data);
  //           return; // Exit the loop on successful request
  //         } catch (error) {
  //           attempt++;
  //           if (attempt >= maxRetries) {
  //             console.error("Failed to fetch user after retries:", error);
  //             setIsAuthenticated(false);
  //             Cookies.remove("auth_token");
  //             navigate("/login");
  //             return;
  //           }
  //           await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
  //         }
  //       }
  //     };
  //     fetchUser();
  //   }
  // }, [isAuthenticated, navigate]);

  const signup = async (userData) => {
    try {
      const response = await authApi.register(userData);
      const { access_token, refresh_token } = response;
      Cookies.set("access_token", access_token, { expires: 1 });
      Cookies.set("refresh_token", refresh_token, { expires: 30 });
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error(error.response?.data?.message || "Failed to sign up");
    }
  };

  const login = async (credentials) => {
    try {
      await authApi.login(credentials);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.message || "Failed to log in");
    }
  };

  const logout = () => {
    Cookies.remove("access_token");
    setIsAuthenticated(false);
    setUserData(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
