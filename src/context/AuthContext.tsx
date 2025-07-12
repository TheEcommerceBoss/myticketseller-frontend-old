import { createContext, ReactNode, useContext, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { authApi } from "../shared/services/api/authApi";
import PropTypes from "prop-types";

const AuthContext = createContext<any>(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error("useMyContext must be used within a MyContextProvider");
	}
	return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!Cookies.get("access_token")
	);
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	// useEffect(() => {
	// 	if (!isAuthenticated) return;

	// }, [isAuthenticated, navigate]);

	const signup = async (userData: any) => {
		try {
			const response = await authApi.register(userData);
			const { access_token, refresh_token } = response;
			Cookies.set("access_token", access_token, { expires: 1 });
			Cookies.set("refresh_token", refresh_token, { expires: 30 });
			setIsAuthenticated(true);
			navigate("/dashboard");
		} catch (error: any) {
			console.error("Signup error:", error);
			throw new Error(
				error.response?.data?.message || "Failed to sign up"
			);
		}
	};

	const login = async (credentials: any) => {
		try {
			await authApi.login(credentials);
			setIsAuthenticated(true);
			navigate("/dashboard");
		} catch (error: any) {
			console.error("Login error:", error);
			throw new Error(
				error.response?.data?.message || "Failed to log in"
			);
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

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
