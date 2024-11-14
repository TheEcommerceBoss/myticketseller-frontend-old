import React from "react";
import HeaderMain from "../../components/(headers)/HeaderMain";
import FeaturedEvents from "../../components/(events)/FeaturedEvents";
import WhyUs from "../../components/(others)/WhyUs";
import EventCalendar from "../../components/(others)/HowItWorks";
import Footer from "../../components/(footers)/Footer";
import { useTheme } from "../../context/ThemeContext";

function AboutUs() {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <HeaderMain variation={2} />

            <main>
                <HeroSection />
                <div className="px-8 my-[5rem]">
                    <p className="text-l">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis cumque dolores aliquid minima temporibus quis velit ea unde explicabo minus beatae quasi mollitia officiis enim nostrum assumenda, modi fuga facere dignissimos a iste repudiandae quia necessitatibus molestias. Officia ipsam voluptatibus tempore ratione voluptas pariatur nostrum architecto saepe, odio veniam laborum odit quam consectetur. Nulla amet adipisci impedit alias deleniti. Laboriosam placeat suscipit ullam esse dolor id sapiente doloribus earum provident nisi ipsum, dolores, nemo non. Nobis sapiente facilis itaque ullam. Vero repellendus deserunt quasi sequi error facilis tenetur cum dignissimos ex ratione! Voluptatum dolorum excepturi molestiae saepe. Non, magnam explicabo!
                    </p>
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
                            About Us
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        About Section
                    </h1>

                </div>
            </div>
        </section>
    );
}

export default AboutUs;