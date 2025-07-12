/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

interface IAppContext {
	isMenuOpen: boolean;
	toggleMenu: () => void;
	activeTimeFilter: string;
	setActiveTimeFilter: (filter: string) => void;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppProvider = ({ children }: {children: React.ReactNode}) => {
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
