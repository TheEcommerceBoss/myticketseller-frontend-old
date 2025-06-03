/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeTimeFilter, setActiveTimeFilter] = useState("Today");

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<AppContext.Provider
			value={{
				isMenuOpen,
				toggleMenu,
				activeTimeFilter,
				setActiveTimeFilter,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
};
