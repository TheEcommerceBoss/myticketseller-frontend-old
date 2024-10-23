import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";  // Adjust path as necessary
import { ArrowLeft } from "lucide-react";
 
function NotFound() {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen flex flex-col justify-center items-center bg-${theme === 'dark' ? 'gray-900' : 'white'} text-${theme === 'dark' ? 'white' : 'gray-900'} p-5`}>
            <div className="text-center">
                
                <h1 className="text-6xl font-bold mt-5">404</h1>
                <p className="text-xl mt-2">Oops! The page you're looking for doesn't exist.</p>
                <p className="text-md mt-1">It seems like you have lost your way.</p>
                
                <Link 
                    to="/" 
                    className="inline-flex items-center mt-8 px-6 py-3 text-lg font-semibold bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition duration-300"
                >
                    <ArrowLeft className="mr-2" />
                    Go back to Homepage
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
