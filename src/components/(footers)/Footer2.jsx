import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import logoDark from "../../assets/(site_assets)/logo-dark.png"; // Adjust path as necessary
import { Link } from "react-router-dom";

const Footer = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle newsletter signup logic here
		console.log("Subscribing with email:", email);
	};

	return (
		<footer className="font-sans relative mt-[10rem]">
			<div className="absolute px-3 mx-auto max-w-5xl  left-0 right-0 -top-[6rem] md:-top-24">
				<div className="p-6 bg-white shadow-xl rounded-2xl ">
					<h2 className="mb-2 text-2xl font-semibold text-center">
						JOIN MY TICKETSELLER PARTY COMMUNITY
					</h2>
					<p className="mb-4 text-gray-600">
						Sign up for our newsletter to get exclusive event
						access, discounts and updates.
					</p>
					<form onSubmit={handleSubmit} className="flex flex-wrap">
						<div className="flex items-center flex-grow bg-white border border-gray-300 rounded-l-lg">
							<svg
								className="w-5 h-5 ml-3 mr-2 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								></path>
							</svg>
							<input
								type="email"
								placeholder="Enter Email Address"
								className="flex-grow p-2 focus:outline-none"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<button
							type="submit"
							className="flex flex-col items-center w-full px-6 py-2 mt-3 text-center text-white transition duration-300 bg-orange-500 rounded-lg md:w-auto md:rounded-none md:mt-0 md:rounded-r-lg hover:bg-orange-600"
						>
							Subscribe
						</button>
					</form>
				</div>
			</div>

			<div className="bg-[#040171] text-white p-6 pt-[15rem] md:pt-[8rem] rounded-t-lg">
				<div className="flex flex-wrap justify-between mb-8">
					<div className="w-full mb-6 md:w-1/4 md:mb-0">
						<h3 className="mb-4 text-2xl font-bold">
							<img src={logoDark} className="w-[6rem]" />
						</h3>
					</div>
					<div className="w-full px-5 mb-6 md:w-1/4 md:mb-0">
						<p className="text-sm">
							Whether you are looking for the hottest nightlife
							events, exclusive parties, or unique gatherings, My
							TicketSeller has got you covered!
						</p>
					</div>
					<div className="w-full mb-6 md:w-1/4 md:mb-0">
						<h4 className="mb-2 font-bold">Our Services</h4>
						<ul className="space-y-1 text-sm">
							<li>
								<Link to={"/login"}>Ticketing Solutions</Link>
							</li>
							<li>
								<Link to={"/about"}>About</Link>
							</li>
							<li>
								<Link to={"/pricing"}>Pricing Plans</Link>
							</li>
						</ul>
					</div>
					<div className="w-full md:w-1/4">
						<h4 className="mb-2 font-bold">Terms</h4>
						<ul className="space-y-1 text-sm">
							<li>
								<Link to={"/terms"}>Terms and Conditions</Link>
							</li>
							<li>
								<Link to={"/privacy"}>Privacy Policy</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="flex flex-col items-center justify-between pt-4 border-t border-blue-800 md:flex-row">
					<p className="mb-4 text-sm text-center md:mb-0">
						© 2024, My TicketSeller
					</p>
					<div className="flex justify-between space-x-4">
						<Facebook size={20} />
						<Twitter size={20} />
						<Instagram size={20} />
						<Youtube size={20} />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
