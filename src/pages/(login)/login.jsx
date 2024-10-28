import React from "react";
import HeaderMain from "../../components/(headers)/HeaderMain";
import FeaturedEvents from "../../components/(events)/FeaturedEvents";
import WhyUs from "../../components/(others)/WhyUs";
import EventCalendar from "../../components/(others)/HowItWorks";
import Footer from "../../components/(footers)/Footer";
import { useTheme } from "../../context/ThemeContext";
import ViewEventComponent from "../../components/(events)/ViewEvents";

function LoginPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-white" : "bg-[#121212]"}`}>
      <HeaderMain variation={2} showsearch={true} hidemenu={true} />

      <main className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl lg:mt-10">



          <div className={`${theme === "light" ? "bg-white" : "bg-[#222]"}  p-8 rounded-lg shadow-lg`}>
            <h1 className={`text-2xl mt-5 mb-[3rem] text-center font-semibold  ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>Welcome Back!</h1>

            <form className="space-y-6">
              <div>
                <label htmlFor="email" className={`block text-sm  text-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full bg-transparent px-4 py-3 rounded-md border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className={`block text-sm  text-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="text-left">
                <a href="#" className={`text-sm text-[#040171] hover:underline ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Forgot Password?
                </a>
              </div>

              <div className="w-full flex flex-col items-center justify-center">
                <button
                  type="submit"
                  className={`w-[10rem] bg-[#040171]  ${theme === 'dark' ? 'border-[#DBDAFF20]' : 'border-[#DBDAFF50]'} border-4  text-white py-3 px-4 rounded-full hover:bg-blue-800 transition duration-200`}
                >
                  Login
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-[#040171] font-semibold hover:underline">
                Register Here
              </a>
            </div>
          </div>
        </div>


      </main>


    </div>
  );
}


export default LoginPage;