import { useState } from "react";
import HeaderMain from "../../components/(headers)/HeaderMain";
import signup_image from "../../assets/(utils)/signup.png";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

function SignupPage() {
  const { theme } = useTheme();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.acceptTerms) {
      setError("Please accept the Terms & Conditions");
      return;
    }

    setLoading(true); // Start loading
    try {
      await signup({
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-white" : "bg-[#121212]"
      }`}
    >
      <div
        className={`${
          theme === "light" ? "bg-white" : "bg-[#222]"
        } rounded-lg shadow-lg min-h-screen flex`}
      >
        <div className="flex flex-col justify-start items-center p-6 w-full bg-blue-50 lg:w-1/2 lg:pl-8">
          <div className="flex flex-col items-start w-full">
            <HeaderMain
              variation={2}
              showsearch={true}
              nobg={true}
              hidemenu={true}
            />
          </div>
          <div className="hidden lg:w-full lg:flex items-center justify-center mt-[8rem] rounded-l-lg">
            <img
              src={signup_image}
              alt="Registration illustration"
              className="w-4/5"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center p-6 w-full lg:w-1/2 lg:pl-8">
          <h1
            className={`text-3xl font-bold mb-2 ${
              theme === "dark" ? "text-white" : "text-[#040171]"
            }`}
          >
            Create your Account
          </h1>
          <p
            className={`mb-6 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            It's free and easy
          </p>

          {error && (
            <div className="p-3 mb-4 text-red-700 bg-red-100 rounded border border-red-400">
              {error}
            </div>
          )}

          <form className="space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fullName"
                className={`block text-sm mb-1 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="px-4 py-3 w-full bg-transparent rounded-md border border-gray-300 transition outline-none focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className={`block text-sm mb-1 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-3 w-full bg-transparent rounded-md border border-gray-300 transition outline-none focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block text-sm mb-1 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="px-4 py-3 w-full bg-transparent rounded-md border border-gray-300 transition outline-none focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className={`block text-sm mb-1 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="px-4 py-3 w-full bg-transparent rounded-md border border-gray-300 transition outline-none focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Confirm password"
                required
              />
            </div>

            <div className="flex items-start">
              <input
                id="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mt-1 mr-2"
                required
              />
              <label
                htmlFor="acceptTerms"
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                By creating an account you agree to the{" "}
                <a href="#" className="text-[#040171] hover:underline">
                  Terms & Conditions
                </a>
                , and our{" "}
                <a href="#" className="text-[#040171] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <button
                type="submit"
                disabled={loading}
                className={`w-[12rem] bg-[#040171] ${
                  theme === "dark" ? "border-[#DBDAFF20]" : "border-[#DBDAFF50]"
                } border-4 text-white py-3 px-4 rounded-full hover:bg-blue-800 transition duration-200`}
              >
                {loading ? "Loading..." : "Register"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className={`text-sm hover:underline ${
                theme === "dark" ? "text-white" : "text-[#040171]"
              }`}
            >
              Login Here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
