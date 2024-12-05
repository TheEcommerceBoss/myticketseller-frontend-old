import React from "react";
import HeaderMain from "../../components/(headers)/HeaderMain";
import FeaturedEvents from "../../components/(events)/FeaturedEvents";
import WhyUs from "../../components/(others)/WhyUs";
import EventCalendar from "../../components/(others)/HowItWorks";
import Footer from "../../components/(footers)/Footer";
import { useTheme } from "../../context/ThemeContext";
import ViewEventComponent from "../../components/(events)/ViewEvents";

function ViewEvent() {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <HeaderMain variation={4} showsearch={true} />
            
            <main>
                 <ViewEventComponent  variation={1}  />
             </main>

            <Footer />
        </div>
    );
}
 

export default ViewEvent;