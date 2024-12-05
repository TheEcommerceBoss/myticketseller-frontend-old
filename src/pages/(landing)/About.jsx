import React, { useEffect, useState } from "react";
import HeaderMain from "../../components/(headers)/HeaderMain";
import FeaturedEvents from "../../components/(events)/FeaturedEvents";
import WhyUs from "../../components/(others)/WhyUs";
import EventCalendar from "../../components/(others)/HowItWorks";
import Footer from "../../components/(footers)/Footer";
import { useTheme } from "../../context/ThemeContext";
import api from "../../api";

function AboutUs() {
  const { theme } = useTheme();
  const [siteinfo, setSiteInfo] = useState([])
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const response = await api.get("/get_sitedetails", {
          headers: {

          },
        });
        setSiteInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchMeta();

  }, []);
  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
    >
      <HeaderMain variation={4} />

      <main>
        <HeroSection />
        <div className="px-8 my-[5rem]">
          <p className="text-xl">
            {
              siteinfo.siteinfo && siteinfo.siteinfo.about_company && (
                <div dangerouslySetInnerHTML={{ __html: siteinfo.siteinfo.about_company }} />
              )
            }
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
