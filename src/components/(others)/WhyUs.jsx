import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import easy from "../../assets/(landing)/easy.png";
import placard from "../../assets/(landing)/placard.png";
import planeticket from "../../assets/(landing)/planeticket.png";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
const ReasonsOption = [
    { title: "Exclusive Events", image: easy, description: "Access tickets to the trendiest parties and events around the city." },
    { title: "Easy Payments", image: placard, description: "Secure and hassle-free checkout, so you can focus on the fun." },
    { title: "Instant Ticket Delivery", image: planeticket, description: "Get your tickets sent straight to your inbox, ready for the big night!" },
];
function WhyUs() {
    const { theme } = useTheme();

    return (
        <>
            <div className=" bg-[#040171] px-4 w-full pt-[3rem]">
                <div className="text-center mb-8">
                 
                    <h2 className="text-2xl font-bold text-white pb-1 relative inline-block">
                        WHY MY TICKETSELLER?
                        <span className="absolute bottom-0 right-0 w-[3rem] h-[.1rem] bg-white "></span>
                        <span className="absolute bottom-1 right-0 w-[3rem] h-[.1rem] bg-white "></span>
                    </h2>

                </div>
                <div className="flex flex-col md:flex-row gap-[1rem]  justify-around">
                    {ReasonsOption.map((eventType, index) => (

                        <div key={index} className="flex p-5 px-[3rem] lg:px-[5rem] gap-2 items-center flex-col">
                            <img src={eventType.image} className="w-[4rem]" alt="" />
                            <h4 className="text-xl font-bold text-white text-center">
                                {eventType.title}
                            </h4>
                            <p className="text-sm text-gray-300 text-center text-white" >
                                {eventType.description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center flex-col py-[3rem] pb-[4rem] ">
                    <Link   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
 to={'/services'} className="flex align-center items-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-full hover:bg-orange-600 transition duration-300">
                        View our Services
                    </Link>
                </div>
            </div>
        </>
    )

}

export default WhyUs;