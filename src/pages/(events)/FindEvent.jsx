import React from "react";
import HeaderMain from "../../components/(headers)/HeaderMain";
import FeaturedEvents from "../../components/(events)/FeaturedEvents";
import WhyUs from "../../components/(others)/WhyUs";
import EventCalendar from "../../components/(others)/HowItWorks";
import Footer from "../../components/(footers)/Footer";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate, useParams } from "react-router-dom";

function LandingPage() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();

    


    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <HeaderMain variation={2} />
            
            <main>
                <HeroSection />
                <FeaturedEvents sortcategory={id} variation={2} />
             </main>

            <Footer />
        </div>
    );
}

function HeroSection() {
    return (
        <section className="relative w-full bg-[#040171] py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <div className="mb-6">
                        <span className="inline-block bg-white text-blue-900 text-sm md:text-base font-semibold px-4 py-1 rounded-full">
                            Events We Sponsor
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Upcoming Events
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200">
                        Upcoming events schedule must not be missed.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default LandingPage;