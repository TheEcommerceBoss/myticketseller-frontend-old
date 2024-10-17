import React from "react";
import HeaderMain from "../../components/(headers)/HeaderMain";
import Banner from '../../assets/(landing)/banner.png';
import FeaturedEvents from "../../components/(events)/FeaturedEvents";

function LandingPage() {

    return (
        <>
            <div
                className=" relative w-full bg-cover bg-center"
                style={{
                    height: "calc(100vh - 10rem)",
                    backgroundImage: 'url("' +Banner + '")', backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 bg-[#040171B0] opacity-70"></div>
                <HeaderMain variation={1} />
            </div>
            <FeaturedEvents />
        </>
    );
}

export default LandingPage;
