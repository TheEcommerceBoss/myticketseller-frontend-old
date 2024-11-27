// import React from "react";
import HeaderMain from "../../components/(headers)/HeaderMain";
// import FeaturedEvents from "../../components/(events)/FeaturedEvents";
// import WhyUs from "../../components/(others)/WhyUs";
// import EventCalendar from "../../components/(others)/HowItWorks";
import Footer from "../../components/(footers)/Footer";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

const pricing = [
  {
    id: 1,
    title: "Basic Pricing",
    description:
      "This is the description message for the Basic Pricing page, IDK why lorem doesnt wanna work",
    pricing: {
      monthly: {
        currency: "$",
        amount: 5,
      },
      yearly: {
        currency: "$",
        amount: 500,
      },
    },
    features: [
      {
        name: "Feature Name",
        value: "Active",
      },
      {
        name: "Feature Name",
        value: "Active",
      },
      {
        name: "Feature Name",
        value: "Active",
      },
      {
        name: "Feature Name",
        value: "Active",
      },
    ],
  },
  {
    id: 2,
    title: "Pro Pricing",
    description:
      "This is the description message for the Pro Pricing page, IDK why lorem doesnt wanna work",
    pricing: {
      monthly: {
        currency: "$",
        amount: 10,
      },
      yearly: {
        currency: "$",
        amount: 1000,
      },
    },
    features: [
      {
        name: "Feature Name",
        value: "Active",
      },
      {
        name: "Feature Name",
        value: "Active",
      },
      {
        name: "Feature Name",
        value: "Active",
      },
      {
        name: "Feature Name",
        value: "Active",
      },
    ],
  },
  {
    id: 3,
    title: "Premium Pricing",
    description:
      "This is the description message for the Premium Pricing page, IDK why lorem doesnt wanna work",
    pricing: {
      monthly: {
        currency: "$",
        amount: 50,
      },
      yearly: {
        currency: "$",
        amount: 5000,
      },
    },
    features: [
      {
        name: "Feature Name",
        value: "Active",
      },
      {
        name: "Feature Name",
        value: "Active",
      },
      {
        name: "Feature Name",
        value: "Active",
      },
      {
        name: "Feature Name",
        value: "Active",
      },
    ],
  },
];

function PricingPage() {
  const { theme } = useTheme();
  const [mode, SetMode] = useState("monthly");
  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-[#111] text-white" : "bg-white text-gray-900"
      }`}
    >
      <HeaderMain variation={4} />

      <main>
        <div className="px-8 my-[5rem]">
          <div className="grid md:grid-cols-3">
            {pricing.map((data, index) => (
              <div key={index} className="px-5 ">
                <div className="bg-[#222] py-5 text-center text-white rounded-t-md w-full">
                  <p className="text-lg ">{data.title}</p>
                </div>
                <div
                  className={`${
                    theme == "dark" ? "bg-black" : "bg-white"
                  }  shadow-inner px-10 py-5`}
                >
                  <p className="text-gray-500">{data.description}</p>

                  <div className="py-5">
                    {data.features.map((data, index) => (
                      <div
                        key={index}
                        className={`border-gray-500  ${
                          index > 0 && "border-t-2"
                        } py-3`}
                      >
                        <div className="grid grid-cols-2">
                          <p className="text-start">{data.name}</p>
                          <p className="text-end">{data.value}</p>
                        </div>
                      </div>
                    ))}
                    <div className=" py-5">
                      <button
                        className={`${
                          theme != "dark"
                            ? "bg-[#121212] text-white"
                            : "bg-white text-[#121212]"
                        } w-full py-2 rounded-sm`}
                      >
                        {data.pricing.monthly.currency}{" "}
                        {mode == "monthly"
                          ? data.pricing.monthly.amount
                          : data.pricing.yearly.amount}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
              Pricing
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Pricing Section
          </h1>
        </div>
      </div>
    </section>
  );
}

export default PricingPage;
