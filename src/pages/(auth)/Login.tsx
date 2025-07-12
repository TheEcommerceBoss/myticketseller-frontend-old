import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderMain from "../../components/(headers)/HeaderMain";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
	const { theme } = useTheme();
	const { login } = useAuth();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[id]: value,
		}));
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.email || !formData.password) {
			setError("Please fill in all fields");
			return;
		}

		setLoading(true);
		try {
			await login({
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
			<HeaderMain variation={2} showsearch={true} hidemenu={true} />

			<main className="flex flex-col items-center justify-center p-4">
				<div className="w-full max-w-4xl lg:mt-10">
					<div
						className={`${
							theme === "light" ? "bg-white" : "bg-[#222]"
						} p-8 rounded-lg l:shadow-lg`}
					>
						<h1
							className={`text-3xl mt-5 mb-[3rem] text-center ${
								theme === "dark"
									? "text-white"
									: "text-[#040171]"
							}`}
						>
							Welcome Back!
						</h1>

						{error && (
							<div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
								{error}
							</div>
						)}

						<form className="space-y-4" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="email"
									className={`block text-sm mb-3 ${
										theme === "dark"
											? "text-white"
											: "text-black"
									}`}
								>
									Email Address
								</label>
								<input
									id="email"
									type="email"
									value={formData.email}
									onChange={handleChange}
									className="w-full px-4 py-3 transition bg-transparent border border-gray-300 rounded-md outline-none focus:border-black focus:ring-1 focus:ring-black"
									placeholder="Enter email address"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="password"
									className={`block text-sm mb-3 ${
										theme === "dark"
											? "text-white"
											: "text-black"
									}`}
								>
									Password
								</label>
								<input
									id="password"
									type="password"
									value={formData.password}
									onChange={handleChange}
									className="w-full px-4 py-3 transition bg-transparent border border-gray-300 rounded-md outline-none focus:border-black focus:ring-1 focus:ring-black"
									placeholder="Enter your password"
									required
								/>
							</div>

							<div className="text-left">
								<a
									href="#"
									className={`text-sm text-[#040171] hover:underline ${
										theme === "dark"
											? "text-white"
											: "text-black"
									}`}
								>
									Forgot Password?
								</a>
							</div>

							<div className="flex flex-col items-center justify-center w-full">
								<button
									type="submit"
									disabled={loading}
									className={`w-[12rem] bg-[#040171] ${
										theme === "dark"
											? "border-[#DBDAFF20]"
											: "border-[#DBDAFF50]"
									} border-4 text-white py-3 px-4 rounded-full hover:bg-blue-800 transition duration-200`}
								>
									{loading ? "Loading..." : "Login"}
								</button>
							</div>
						</form>

						<div className="mt-6 text-sm text-center text-gray-600">
							Don't have an account?{" "}
							<Link
								to="/register"
								className={`text-sm hover:underline ${
									theme === "dark"
										? "text-white"
										: "text-[#040171]"
								}`}
							>
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
