import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create ThemeContext
export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const savedTheme = Cookies.get("theme");
		if (savedTheme) {
			setTheme(savedTheme);
		} else {
			Cookies.set("theme", "light", { expires: 365 });
		}
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === "light" ? "dark" : "light";
			Cookies.set("theme", newTheme, { expires: 365 });
			return newTheme;
		});
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	return useContext(ThemeContext);
};
