import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Search, X, Menu } from "lucide-react";
import logo from "../../assets/(site_assets)/logo.png";
import logoDark from "../../assets/(site_assets)/logo-dark.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import Cookies from "js-cookie";
import newApi from "../../api";
const LocationData = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocationData = async () => {
      try {
        const currentTime = Date.now();
        const locationData = Cookies.get("locationData");
        const lastSavedTime = Cookies.get("locationDataTime");

        if (
          locationData &&
          lastSavedTime &&
          currentTime - lastSavedTime < 5 * 60 * 1000
        ) {
          setLocation(JSON.parse(locationData));
        } else {
          const ipResponse = await newApi.get("/ip");
          const ipData = await ipResponse.data;
          const ipAddress =
            ipData.ip === "127.0.0.1" ? "129.205.124.208" : ipData.ip;
          // const ipAddress = '100.43.96.0';
          console.log(`https://freeipapi.com/api/json/${ipAddress}`);

          const response = await fetch(
            `https://freeipapi.com/api/json/${ipAddress}`
          );
          console.log(ipData);
          const data = await response.json();
          const flagUrl = `https://flagcdn.com/w320/${data.countryCode.toLowerCase()}.png`;

          const locationInfo = {
            country: data.country,
            countryCode: data.countryCode,
            cityName: data.city,
            regionName: data.region,
            timeZone: data.timezone,
            flag: flagUrl,
          };

          // const response = await fetch(`https://freeipapi.com/api/json/${ipAddress}`);
          // const data = await response.json();
          // const flagUrl = `https://flagcdn.com/w320/${data.countryCode.toLowerCase()}.png`;

          //  const locationInfo = {
          //   country: data.countryName,
          //   countryCode: data.countryCode,
          //   currency: data.currency.name,
          //   currencyCode: data.currency.code,
          //   flag: flagUrl,
          //   cityName: data.cityName,
          //   continent: data.continent,
          //   continentCode: data.continentCode,
          //   regionName: data.regionName,
          //   zipCode: data.zipCode,
          //   timeZone: data.timeZone
          // };

          // Save the data to the cookie
          Cookies.set("locationData", JSON.stringify(locationInfo), {
            expires: 1 / 24,
          }); // Expires in 1 hour
          Cookies.set("locationDataTime", currentTime, { expires: 1 / 24 });

          // Set the location state
          setLocation(locationInfo);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching location data", error);
      }
    };

    getLocationData();
  }, []);

  return (
    <div>
      {location ? (
        <button
          className={`overflow-hidden rounded-full w-[1rem] h-[1rem]`}
          aria-label="Toggle theme"
        >
          <img
            src={location.flag}
            className="object-contain w-full h-full"
            alt="Country Flag"
          />
        </button>
      ) : (
        <button
          className={`overflow-hidden rounded-full w-[1rem] h-[1rem]`}
          aria-label="Toggle theme"
        ></button>
      )}
    </div>
  );
};

const HeaderMain = ({ variation, showsearch, hidemenu, nobg }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const locations = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching:", searchQuery, "in", location);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  const searchEvent = () => {
    if (searchQuery) {
      navigate("/event/search/" + searchQuery);
      // alert(searchQuery)
    }
  };

  return (
    <header
      className={` flex items-center justify-center ${
        variation === 1 ? "absolute w-full" : ""
      }`}
    >
      <nav
        className={`flex items-center  ${
          variation === 1 ? "lg:mt-[2rem] lg:w-[80%] lg:rounded-full " : ""
        }  w-full  z-50 justify-between  p-3  ${
          nobg
            ? "bg-transparent"
            : theme === "light"
            ? "bg-white"
            : "bg-[#121212]"
        }  ${!hidemenu && "shadow-lg"}`}
      >
        <div className="flex relative items-end">
          <Link
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            to={"/"}
          >
            <img
              src={theme === "light" ? logo : logoDark}
              className="px-5 pr-0 py-2 w-[5.5rem]"
              alt=""
            />
          </Link>
          <LocationData />
        </div>
        {!hidemenu && (
          <>
            <div className="hidden space-x-6 lg:flex">
              {variation === 1 || variation === 4 ? (
                <>
                  {" "}
                  <Link
                    to="/"
                    className={`hover:text-orange-500 text-lg ${
                      locations.pathname == "/"
                        ? "text-orange-600"
                        : theme === "light"
                        ? "text-gray-700"
                        : "text-white"
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/event/find"
                    className={`hover:text-orange-500 text-lg ${
                      locations.pathname.startsWith("/event")
                        ? "text-orange-600"
                        : theme === "light"
                        ? "text-gray-700"
                        : "text-white"
                    }`}
                  >
                    Events
                  </Link>
                  <Link
                    to="/about"
                    className={`hover:text-orange-500 text-lg ${
                      locations.pathname == "/about"
                        ? "text-orange-600"
                        : theme === "light"
                        ? "text-gray-700"
                        : "text-white"
                    }`}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className={`hover:text-orange-500 text-lg ${
                      locations.pathname == "/contact"
                        ? "text-orange-600"
                        : theme === "light"
                        ? "text-gray-700"
                        : "text-white"
                    }`}
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/pricing"
                    className={`hover:text-orange-500 text-lg ${
                      locations.pathname == "/pricing"
                        ? "text-orange-600"
                        : theme === "light"
                        ? "text-gray-700"
                        : "text-white"
                    }`}
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/login"
                    className={`hover:text-orange-500 text-lg $${
                      locations.pathname == "/login"
                        ? "text-orange-600"
                        : theme === "light"
                        ? "text-gray-700"
                        : "text-white"
                    }`}
                  >
                    Login
                  </Link>
                </>
              ) : showsearch ? (
                <>
                  <div className="hidden px-4 mx-auto max-w-4xl lg:flex">
                    <form
                      onSubmit={handleSearch}
                      className="flex overflow-hidden items-center bg-white rounded-full border border-gray-200 shadow-lg"
                    >
                      <div className="flex flex-1 items-center divide-x divide-gray-200">
                        {/* Search Input */}
                        <div className="flex flex-1 items-center px-4 py-1">
                          <Search className="mr-3 w-5 h-5 text-gray-600" />
                          <input
                            type="search"
                            placeholder="Search events"
                            value={searchQuery}
                            onSubmit={searchEvent}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full text-lg placeholder-gray-500 text-gray-700 outline-none"
                          />
                        </div>

                        {/* Location Input */}
                        <div className="flex items-center px-4 py-1">
                          <MapPin className="mr-3 w-5 h-5 text-gray-600" />
                          <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onSubmit={searchEvent}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-40 text-lg placeholder-gray-500 text-gray-700 outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        onClick={searchEvent}
                        onSubmit={searchEvent}
                        className="p-4 bg-orange-500 transition-colors hover:bg-orange-600"
                      >
                        <Search className="w-6 h-6 text-white" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="flex items-center px-3 space-x-4">
              {variation === 2 ? (
                <Link
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  to={"/"}
                  className={`text-gray-700 hover:text-orange-500 text-lg ${
                    theme === "light" ? "text-gray-700" : "text-white"
                  }`}
                >
                  Home
                </Link>
              ) : (
                ""
              )}
              <button
                onClick={toggleTheme}
                className={`rounded-full p-3 ${
                  theme === "light"
                    ? "bg-gray-200  hover:bg-gray-100"
                    : "hover:bg-orange-400 bg-orange-500"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              <Link
                to={variation != 2 ? "/event/find" : "/login"}
                className="hidden gap-2 items-center px-5 py-3 text-white bg-orange-500 rounded-full transition duration-300 lg:flex align-center hover:bg-orange-600"
              >
                {variation === 2 ? (
                  <>
                    <span className="">Login</span>
                  </>
                ) : (
                  <>
                    <Search size={18} />{" "}
                    <span className="hidden lg:flex">Find Events</span>
                  </>
                )}
              </Link>

              <div className="flex items-center lg:hidden">
                <button
                  onClick={toggleMenu}
                  className="bg-orange-500 text-black pl-2 py-2 h-[3rem] lg:h-[4rem] pr-[2.5rem] lg:pr-[3.5rem] rounded-full relative flex items-center z-10"
                >
                  <span className="mx-4 text-sm text-white lg:text-lg font-sora">
                    <Link
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      to={"/event/find"}
                      className=""
                    >
                      <Search size={18} />
                    </Link>
                  </span>
                  <div className="bg-orange-500 mx-1 h-[3rem] lg:h-[4rem] w-[3rem] lg:w-[4rem] right-0  absolute rounded-full flex align-center items-center justify-center">
                    {isMenuOpen ? (
                      <X className="lg:w-[1.6rem] text-white w-[1.4rem] lg:h-[1.6rem] h-[1.4rem]" />
                    ) : (
                      <Menu className="lg:w-[1.6rem] text-white w-[1.4rem] lg:h-[1.6rem] h-[1.4rem]" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </>
        )}
      </nav>
      <div
        className={`fixed top-0 right-0 w-full h-0 bg-orange-600 rounded-full transition-all z-30 duration-300 ease-in-out flex flex-col items-center justify-center ${
          isMenuOpen ? "h-screen rounded-none" : ""
        }`}
        style={{
          clipPath: isMenuOpen
            ? "circle(150% at 95% 3.5rem)"
            : "circle(0% at 95% 3.5rem)",
        }}
      >
        {isMenuOpen && (
          <nav className="space-y-4 text-2xl text-white">
            <Link
              to="/"
              onClick={toggleMenu}
              className="block transition-colors hover:text-orange-300 font-gluten"
            >
              Home
            </Link>
            <Link
              to="/event/find"
              onClick={toggleMenu}
              className="block transition-colors hover:text-orange-300 font-gluten"
            >
              Events
            </Link>
            <Link
              to="/about"
              onClick={toggleMenu}
              className="block transition-colors hover:text-orange-300 font-gluten"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={toggleMenu}
              className="block transition-colors hover:text-orange-300 font-gluten"
            >
              Contact Us
            </Link>
            <Link
              to="/pricing"
              onClick={toggleMenu}
              className="block transition-colors hover:text-orange-300 font-gluten"
            >
              Pricing
            </Link>
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block transition-colors hover:text-orange-300 font-gluten"
            >
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default HeaderMain;
