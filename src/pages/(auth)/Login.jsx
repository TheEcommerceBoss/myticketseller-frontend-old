import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Make sure you have react-router-dom installed
import HeaderMain from "../../components/(headers)/HeaderMain";
import { useTheme } from "../../context/ThemeContext";

function LoginPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    setError(""); // Clear error when user types
  };

  // Demo credentials
  const demoCredentials = {
    email: "demo@example.com",
    password: "demo123"
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    // Demo authentication
    if (formData.email === demoCredentials.email && formData.password === demoCredentials.password) {
      // You might want to set some authentication state here
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Use demo@example.com / demo123");
    }
  };

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-white" : "bg-[#121212]"}`}>
      <HeaderMain variation={2} showsearch={true} hidemenu={true} />

      <main className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl lg:mt-10">
          <div className={`${theme === "light" ? "bg-white" : "bg-[#222]"}  p-8 rounded-lg l:shadow-lg`}>
            <h1 className={`text-3xl mt-5 mb-[3rem] text-center  ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>
              Welcome Back!
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className={`block text-sm text-black mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent px-4 py-3 rounded-md border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className={`block text-sm text-black mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent px-4 py-3 rounded-md border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="text-left">
                <a href="#" className={`text-sm text-[#040171] hover:underline ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Forgot Password?
                </a>
              </div>

              <div className="w-full flex flex-col items-center justify-center">
                <button
                  type="submit"
                  className={`w-[12rem] bg-[#040171] ${theme === 'dark' ? 'border-[#DBDAFF20]' : 'border-[#DBDAFF50]'} border-4 text-white py-3 px-4 rounded-full hover:bg-blue-800 transition duration-200`}
                >
                  Login
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Demo Credentials:
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Email: demo@example.com / Password: demo123
              </p>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className={`text-sm hover:underline ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>
                Register Here
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;