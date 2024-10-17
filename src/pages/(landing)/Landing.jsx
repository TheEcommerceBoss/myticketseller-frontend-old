import React from "react";
import HeaderMain from "../../components/(headers)/HeaderMain";
import Banner from '../../assets/(landing)/banner.png';
import Clown from '../../assets/(landing)/clown.png';
import Banner2 from '../../assets/(landing)/banner2.png';
import FeaturedEvents from "../../components/(events)/FeaturedEvents";
import { Ticket } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";  // Adjust path as necessary
import WhyUs from "../../components/(others)/WhyUs";
import EventCalendar from "../../components/(others)/HowItWorks";

function LandingPage() {
    const { theme } = useTheme();

    return (
        <>

            <div
                className="relative w-full h-[calc(90vh)] lg:h-[calc(100vh - 10rem)] bg-cover bg-center"
                style={{
                    backgroundImage: 'url("' + Banner + '")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: "no-repeat",
                }}
            >
                <HeaderMain variation={1} />

                <div className={`absolute inset-0 bg-[#040171B0] opacity-${theme == 'light' ? 90 : 50} `}></div>
                <div className="absolute inset-0 flex lg:items-center  justify-center">
                    <div className="text-center max-w-5xl mx-auto mt-[12rem] md:mt-[20rem]  lg:mt-0 px-6 mb-12 z-10">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl flex items-center text-white  font-gochi lg:mb-6">
                            <div className="hidden lg:flex items-center justify-center gap-1 flex-wrap my-2">
                                <span className="hidden lg:flex text-white mx-[.5rem]">YOUR</span>
                                <div className=" mt-1">
                                    <div className="relative inline-flex items-center bg-orange-500 rounded-full px-2 py-2">
                                        <div className="absolute flex rounded-full mx-2 items-center justify-center flex-col w-[3rem] h-[3rem] bg-orange-500 animate-spin-move">
                                            <img src={Clown} className="text-white w-[2rem] h-[2rem]  animate-spin-slow " />
                                        </div>
                                        <div className="w-[15rem] h-[4rem] bg-cover bg-center rounded-full overflow-hidden">
                                            <img src={Banner2} alt="Event crowd" className="w-full h-full object-cover" />
                                        </div>
                                    </div>

                                </div>
                                <span className="text-white mx-[.5rem]">ULTIMATE </span>
                                <span className="text-white mx-[.5rem]">EVENTS </span>
                                <span className="text-white mx-[.5rem]">TICKET </span>
                                <span className="text-white mx-[.5rem]">DESTINATION! </span>
                            </div>
                            <div className="flex lg:hidden items-center justify-center gap-1  flex-wrap my-2">
                                <div className=" mb-5">
                                    <div className="relative inline-flex items-center bg-orange-500 rounded-full px-2 py-2">
                                        <div className="absolute flex rounded-full mx-2 items-center justify-center flex-col w-[3rem] h-[3rem] bg-orange-500 animate-spin-move">
                                            <img src={Clown} className="text-white w-[2rem] h-[2rem]  animate-spin-slow " />
                                        </div>
                                        <div className="w-[15rem] h-[4rem] bg-cover bg-center rounded-full overflow-hidden">
                                            <img src={Banner2} alt="Event crowd" className="w-full h-full object-cover" />
                                        </div>
                                    </div>

                                </div>
                                <span>
                                    <span className="text-white mx-[.5rem]">YOUR</span>
                                    <span className="text-white mx-[.5rem]">ULTIMATE </span>
                                    <span className="text-white mx-[.5rem]">EVENTS </span>
                                    <span className="text-white mx-[.5rem]">TICKET </span>
                                    <span className="text-white mx-[.5rem]">DESTINATION! </span>
                                </span>
                            </div>
                        </h1>

                        <p className="text-lg text-gray-200 max-w-3xl mt-1 lg:mt-5 lg:pt-[3rem] mx-auto ">
                            Whether you are looking for the hottest nightlife events, exclusive
                            parties, or intimate gatherings, My TicketSeller has got you covered.
                        </p>
                    </div>
                </div>
            </div>
            <FeaturedEvents />
            <WhyUs />
            <EventCalendar />
        </>
    );
}

export default LandingPage;