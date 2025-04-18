import { useState, useEffect } from "react";
import { PlusCircle, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { Link } from "react-router-dom";
import DashboardHeader from "../../components/(events)/DashboardHeader";

import { scanApi } from "../../shared/services/api/scanApi";
import QRScanner from "../../shared/components/custom/QRScanner";
import PropTypes from "prop-types";
const ScannerPage = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [result, setResult] = useState("No result");
  const [resultData, setresultData] = useState(null);

  // Handle QR scan result
  const handleScan = async (data) => {
    console.log("Data", data);
    if (data) {
      try {
        const response = await scanApi.scanTicket(data);
        setresultData(response);
      } catch (error) {
        console.log(error.response.data.message);
        setResult(error.response.data.message);
      }
    } else {
      console.log("Failed to parse QR code");
    }
  };

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-[#222]" : "bg-gray-100"
      }`}
    >
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 px-5 py-8 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-lg outline-none p-3 ${
                theme === "light"
                  ? "bg-gray-200 hover:bg-gray-100"
                  : "bg-[#121212]"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <h1 className="hidden text-2xl font-bold lg:flex">Scanner</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to={"/dashboard/event/create"}
              className={`rounded-full outline-none  p-3 ${
                theme === "light"
                  ? "bg-gray-200  hover:bg-gray-100"
                  : "hover:bg-[#111] bg-[#121212]"
              }`}
              aria-label="Toggle theme"
            >
              <PlusCircle
                color={theme === "light" ? "#040171" : "white"}
                size={20}
              />
            </Link>
            <button
              onClick={toggleTheme}
              className={`rounded-full outline-none p-3 ${
                theme === "light"
                  ? "bg-gray-200 hover:bg-gray-100"
                  : "hover:bg-[#111] bg-[#121212]"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <DashboardHeader />
          </div>
        </div>

        <div
          className={`${
            theme === "dark" ? "bg-[#121212]" : "border border-[#040171]"
          } rounded-lg p-6 my-6 shadow-sm`}
        >
          <h5 className="text-center mt-[1rem] mb-[2rem]">Ticket Scanner</h5>
          <div className="flex flex-col items-center justify-center ">
            <div className="bg-white shadow-lg rounded-lg w-full lg:w-[40rem] p-6 mb-6">
              {/* <Scanner
                onScan={handleScan}
                onError={handleError}
                allowMultiple={true}
                scanDelay={5000}
              /> */}
              {/* {!resultData && } */}
              <QRScanner handleScan={handleScan} />
              {resultData && resultData.status ? (
                resultData.status != "success" ? (
                  <div className="w-full h-auto p-4 mt-5 text-white bg-red-500 rounded-lg">
                    <div className="mb-4">
                      <h2 className="mt-2 text-2xl font-bold text-center">
                        Invalid Ticket
                      </h2>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-auto p-4 mt-5 text-white bg-black rounded-lg">
                    {/* Main Event Info */}
                    <div className="mb-4">
                      <h2 className="mt-2 text-2xl font-bold text-center">
                        {resultData.event_title || "Untitled Event"}
                      </h2>
                    </div>

                    <div className="mb-4">
                      <CenteredHr text="Scan Info" />
                      <p>Scan Times: {resultData.scan_times}</p>
                      <p>Last Scanned: {resultData.last_scanned}</p>
                    </div>

                    <div className="mb-4">
                      <CenteredHr text="User Info" />
                      <p>Name: {resultData.fullname}</p>
                      <p>Email: {resultData.buyer_email}</p>
                      <p>Phone Number: {resultData.phone_number}</p>
                    </div>

                    <div className="mb-4">
                      <CenteredHr text="Ticket Info" />
                      <p>Ticket Name: {resultData.ticket_name}</p>
                      <p>Ticket Type: {resultData.ticket_type}</p>
                    </div>

                    <div className="mb-4">
                      <CenteredHr text="Payment Info" />
                      <p>Price: NGN {resultData.price}</p>
                      <p>Purchase Date: {resultData.purchase_date}</p>
                      <p>Payment Status: {resultData.status}</p>
                    </div>
                  </div>
                )
              ) : result ? (
                <div className="w-full h-auto p-4 mt-5 text-white bg-red-800 rounded-lg">
                  <div className="mb-4">
                    <h2 className="mt-2 font-bold text-center text-l">
                      {result}
                    </h2>
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* {console.log(result)} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function CenteredHr({ text, style = "", type = 1 }) {
  return (
    <div className={`flex items-center my-6 pb-2 ${style}`}>
      {type == 1 ? <div className="flex-1 border-t border-gray-300"></div> : ""}
      {text && (
        <span className="mx-4 text-sm font-bold text-white">{text}</span>
      )}
      <div className="flex-1 border-t border-gray-300"></div>
    </div>
  );
}
CenteredHr.propTypes = {
  text: PropTypes.string,
  style: PropTypes.string,
  type: PropTypes.number,
};

export default ScannerPage;
