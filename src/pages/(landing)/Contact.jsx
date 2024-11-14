import React from "react";
import HeaderMain from "../../components/(headers)/HeaderMain";
import FeaturedEvents from "../../components/(events)/FeaturedEvents";
import WhyUs from "../../components/(others)/WhyUs";
import EventCalendar from "../../components/(others)/HowItWorks";
import Footer from "../../components/(footers)/Footer";
import { useTheme } from "../../context/ThemeContext";
import { Phone, Mail, MapPin, Twitter, Instagram, Twitch } from 'lucide-react'

function ContactPage() {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#111] text-white' : 'bg-white text-[#121212]'}`}>
            <HeaderMain variation={4} />

            <main>
                <div className="px-4 md:px-8 my-[2rem]">

                    <div className="flex flex-col md:flex-row max-w-7xl mx-auto my-10 shadow-lg rounded-lg overflow-hidden">
                        {/* Left sidebar */}
                        <div className={`bg-[#000] shadow-lg shadow-inner text-white p-8 md:w-1/3`}>
                            <h2 className="text-3xl font-bold mb-2">Contact Information</h2>
                            <p className="mb-8 font-normal text-gray-500">Say something to start a live chat!</p>

                            <div className="mt-[5rem] space-y-[2rem]">
                                <div className="flex items-center">
                                    <Phone className="mr-4" />
                                    <span>+1012 3456 789</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="mr-4" />
                                    <span>demo@gmail.com</span>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="mr-4 mt-1" />
                                    <span>132 Dartmouth Street Boston,<br />Massachusetts 02156 United States</span>
                                </div>
                            </div>

                            <div className="flex space-x-4 mt-20">
                                <Twitter className="cursor-pointer" />
                                <Instagram className="cursor-pointer" />
                                <Twitch className="cursor-pointer" />
                            </div>
                        </div>

                        {/* Right form area */}
                        <div className={`${theme === 'dark' ? 'bg-[#212121] text-white' : 'bg-white text-gray-900 shadow-lg shadow-inner'}  p-8 md:w-2/3`}>
                            <h1 className="text-4xl font-bold mb-2 text-center md:text-left">Contact Us</h1>
                            <p className="text-gray-400 mb-8 text-center md:text-left">Any question or remarks? Just write us a message!</p>

                            <form>
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                                        <input type="text" id="firstName" name="firstName" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="John" />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                                        <input type="text" id="lastName" name="lastName" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                        <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="johndoe@example.com" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                                        <input type="tel" id="phone" name="phone" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="+1 012 3456 789" />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Select Subject?</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {['General Inquiry', 'General Inquiry', 'General Inquiry', 'General Inquiry'].map((subject, index) => (
                                            <label key={index} className="flex items-center space-x-2">
                                                <input type="radio" name="subject" className="form-radio" />
                                                <span>{subject}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                                    <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Write your message.."></textarea>
                                </div>

                                <div className="text-right">
                                    <button type="submit" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function HeroSection() {
    return (
        <section className="relative w-full bg-[#040171] py-16 md:py-16 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <div className="mb-6">
                        <span className="inline-block bg-white text-blue-900 text-sm md:text-base font-semibold px-4 py-1 rounded-full">
                            Contact Us
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Contact Section
                    </h1>

                </div>
            </div>
        </section>
    );
}

export default ContactPage;