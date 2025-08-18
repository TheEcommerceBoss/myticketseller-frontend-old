import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import logoDark from '../../assets/(site_assets)/logo-dark.png';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

interface FooterProps {
	theme?: string;
}

const Footer = ({ theme: propTheme }: FooterProps) => {
	const [email, setEmail] = useState('');
	const { theme } = useTheme();
	const currentTheme = propTheme || theme;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Subscribing with email:', email);
	};

	return (
		<footer className="font-sans relative">
			<div className="px-3 mx-auto max-w-5xl mb-8">
				<div className={`${
					currentTheme === 'dark' 
						? 'bg-gray-800 text-white' 
						: 'bg-white text-gray-900'
				} rounded-2xl shadow-xl p-6 border ${
					currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'
				}`}>
					<h2 className="text-2xl font-semibold text-center mb-2">JOIN MY TICKETSELLER PARTY COMMUNITY</h2>
					<p className={`mb-4 text-center ${
						currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
					}`}>Sign up for our newsletter to get exclusive event access, discounts and updates.</p>
					<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
						<div className={`flex-grow flex items-center border rounded-lg ${
							currentTheme === 'dark' 
								? 'border-gray-600 bg-gray-700' 
								: 'border-gray-300 bg-white'
						}`}>
							<svg className={`w-5 h-5 ml-3 mr-2 ${
								currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
							}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
							</svg>
							<input
								type="email"
								placeholder="Enter Email Address"
								className={`flex-grow p-3 focus:outline-none bg-transparent ${
									currentTheme === 'dark' 
										? 'text-white placeholder-gray-400' 
										: 'text-gray-900 placeholder-gray-500'
								}`}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<button
							type="submit"
							className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300 font-medium whitespace-nowrap"
						>
							Subscribe
						</button>
					</form>
				</div>
			</div>

			<div className={`${
				currentTheme === 'light' ? 'bg-[#040171B0]' : 'bg-[#040171]'
			} text-white p-6 pt-8 rounded-t-lg`}>
				<div className="flex flex-wrap justify-between mb-8">
					<div className="w-full md:w-1/4 mb-6 md:mb-0">
						<h3 className="text-2xl font-bold mb-4">
							<img src={logoDark} className='w-[6rem]' alt="My TicketSeller Logo" />
						</h3>
					</div>
					<div className="w-full md:w-1/4 mb-6 md:mb-0 px-5">
						<p className="text-sm">
							Whether you are looking for the hottest nightlife events, exclusive parties, or unique gatherings, My TicketSeller has got you covered!
						</p>
					</div>
					<div className="w-full md:w-1/4 mb-6 md:mb-0">
						<h4 className="font-bold mb-2">Our Services</h4>
						<ul className="text-sm space-y-1">
							<li><Link to={'/login'} className="hover:text-orange-300 transition-colors">Ticketing Solutions</Link></li>
							<li><Link to={'/about'} className="hover:text-orange-300 transition-colors">About</Link></li>
							<li><Link to={'/pricing'} className="hover:text-orange-300 transition-colors">Pricing Plans</Link></li>
						</ul>
					</div>
					<div className="w-full md:w-1/4">
						<h4 className="font-bold mb-2">Terms</h4>
						<ul className="text-sm space-y-1">
							<li><Link to={'/terms'} className="hover:text-orange-300 transition-colors">Terms and Conditions</Link></li>
							<li><Link to={'/privacy'} className="hover:text-orange-300 transition-colors">Privacy Policy</Link></li>
						</ul>
					</div>
				</div>

				<div className="flex flex-col md:flex-row justify-between items-center border-t border-blue-800 pt-4">
					<p className="text-sm mb-4 md:mb-0 text-center">© 2024, My TicketSeller</p>
					<div className="flex space-x-4">
						<Facebook size={20} className="hover:text-orange-300 transition-colors cursor-pointer" />
						<Twitter size={20} className="hover:text-orange-300 transition-colors cursor-pointer" />
						<Instagram size={20} className="hover:text-orange-300 transition-colors cursor-pointer" />
						<Youtube size={20} className="hover:text-orange-300 transition-colors cursor-pointer" />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;