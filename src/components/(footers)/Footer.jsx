import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import logoDark from '../../assets/(site_assets)/logo-dark.png';  // Adjust path as necessary

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter signup logic here
        console.log('Subscribing with email:', email);
    };

    return (
        <footer className="font-sans relative mt-[10rem]">
            <div className="absolute px-3 mx-auto max-w-5xl  left-0 right-0 -top-[6rem] md:-top-24">
                <div className="bg-white rounded-2xl shadow-xl p-6 ">
                    <h2 className="text-2xl font-semibold text-center mb-2">JOIN MY TICKETSELLER PARTY COMMUNITY</h2>
                    <p className="text-gray-600 mb-4">Sign up for our newsletter to get exclusive event access, discounts and updates.</p>
                    <form onSubmit={handleSubmit} className="flex flex-wrap">
                        <div className="flex-grow flex items-center border border-gray-300 rounded-l-lg bg-white">
                            <svg className="w-5 h-5 text-gray-500 ml-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
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
                            className="bg-orange-500 flex  w-full md:w-auto text-white px-6 py-2 rounded-lg md:rounded-none mt-3 md:mt-0 text-center flex-col items-center  md:rounded-r-lg hover:bg-orange-600 transition duration-300"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="bg-[#040171] text-white p-6 pt-[15rem] md:pt-[8rem] rounded-t-lg">
                <div className="flex flex-wrap justify-between mb-8">
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold mb-4">
                            <img src={logoDark} className='w-[6rem]' />

                        </h3>

                    </div>
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <p className="text-sm">
                            Whether you are looking for the hottest nightlife events, exclusive parties, or unique gatherings, My TicketSeller has got you covered!
                        </p>
                    </div>
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h4 className="font-bold mb-2">Our Services</h4>
                        <ul className="text-sm space-y-1">
                            <li>Ticketing Solutions</li>
                            <li>Blog</li>
                            <li>Pricing Plans</li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4">
                        <h4 className="font-bold mb-2">Terms</h4>
                        <ul className="text-sm space-y-1">
                            <li>Terms and Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Refund Policy</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center border-t border-blue-800 pt-4">
                    <p className="text-sm mb-4 md:mb-0 text-center">© 2024, My TicketSeller</p>
                    <div className="flex space-x-4 justify-between">
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