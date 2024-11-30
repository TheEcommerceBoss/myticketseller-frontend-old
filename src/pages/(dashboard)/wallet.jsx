import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowDown,
  Banknote,
  CirclePlus,
  Menu,
  Moon,
  PlusCircle,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../../components/(headers)/DashboardSidebar";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import logo from "../../assets/(site_assets)/logo-dark.png";
import WithdrawalModal from "./WithdrawalModal";
import AccountSetupModal from "./AccountSetupModal";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";


const WalletDashboard = () => {
  const [activeTab, setActiveTab] = useState("expenses");
  const [activeTimeframe, setActiveTimeframe] = useState("all");
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showAccountSetupModal, setShowAccountSetupModal] = useState(false);
  const { userData } = useAuth();
  console.log(userData&&userData.user.balance)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [withdrawals, setWithdrawals] = useState([]);
  const token = Cookies.get("auth_token");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/fetchUserWithdrawals`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.data.code === 200) {
          setWithdrawals(response.data.data);
          const withdrawals = response.data.data;
  
          // Reduce withdrawals to accumulate monthly totals
          const monthlyData = withdrawals.reduce((acc, withdrawal) => {
            const date = new Date(withdrawal.request_time);
            const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
            const amount = Number(withdrawal.amount);
            acc[month] = (acc[month] || 0) + amount;
            return acc;
          }, {});
  
          // Include all months in order
          const monthOrder = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
          const sortedData = monthOrder.map((month) => ({
            name: month,
            value: monthlyData[month] || 0, // Default to 0 if no data for the month
          }));
  
          setChartData(sortedData);
        } else {
          setError(response.data.message || 'Failed to fetch withdrawal records');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchWithdrawals();
  }, [token]);

   if (isLoading) {
     return <div>Loading...</div>;
   }
 
   if (error) {
     return <div className="text-red-500">{error}</div>;
   }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen ${
        theme === "dark" ? "bg-[#222]" : "bg-gray-100"
      }`}
    >
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 py-4 px-4 md:py-8 md:px-5 lg:px-8 w-full">
        <div className="flex justify-between items-center mb-8">
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

            <h1 className="hidden lg:flex text-2xl font-bold">Scanner</h1>
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
              <CirclePlus
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
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            {/* Card Section - Full Width on Mobile, Responsive on Desktop */}
            <div className="flex flex-col md:px-4  gap-4">
              <div className="bg-[#040171] text-white rounded-2xl w-full h-[13rem] p-6 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="absolute right-3 z-10">
                    <img src={logo} alt="Visa" className="w-12 md:w-12" />
                  </div>
                </div>
                <div className="flex flex-col justify-between h-full">
                  <div className="text-sm ">{userData && userData.user.account_name ? userData.user.account_name : 'Add Account to continue'}</div>

                  <div className="text-2xl tracking-wider mb-2">₦{userData ? userData.user.balance : 0.0}</div>
                  <div className="flex flex-col z-10">
                    <div className="text-sm ">{userData && userData.user.account_number ? userData.user.account_number : ' '}</div>
                    <div className="text-sm ">{userData && userData.user.bank_name ? userData.user.bank_name : ' '}</div></div>
                </div>
                <div className="absolute bottom-0 right-0 bg-[#ff6600] w-24 h-full -skew-x-12 transform origin-bottom-right"></div>
                <div className="absolute bottom-2 right-4 text-white text-xs md:text-sm font-medium">
                </div>
              </div>

              <div className="bg-black text-white rounded-2xl w-full p-4 md:p-6 relative overflow-hidden">
                <div className="flex flex-col justify-between h-full">
                  <div className="my-2 md:my-4 gap-2 flex flex-col justify-center">
                    <button
                      onClick={() => setShowAccountSetupModal(true)}
                      className="bg-white text-black px-4 py-2 md:px-6 md:py-2 rounded-full hover:bg-gray-100 transition-colors text-sm md:text-base"
                    >
                      Setup Account
                    </button>
                    <button
                      onClick={() => setShowWithdrawalModal(true)}
                      className="bg-[#040171] text-white px-4 py-2 md:px-6 md:py-2 rounded-full hover:bg-[#030171] transition-colors text-sm md:text-base"
                    >
                      Request Withdrawal
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Section - Full Width on Mobile, 2 Columns on Desktop */}
            <div
              className={`${
                theme === "light" ? "bg-white" : "bg-[#121212]"
              } md:col-span-2 rounded-3xl p-4 md:p-8 mb-4 md:mb-8 shadow-sm`}
            >
              {/* <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-8">
                <div className="flex space-x-2 mb-2 md:mb-0">
                  <button
                    className={`px-3 py-1 md:px-4 md:py-2 rounded-full ${
                      activeTab === "expenses"
                        ? "bg-[#040171] text-white"
                        : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("expenses")}
                  >
                    Withdrawal
                  </button>
                  <button
                    className={`px-3 py-1 md:px-4 md:py-2 rounded-full ${
                      activeTab === "income"
                        ? "bg-[#040171] text-white"
                        : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("income")}
                  >
                    Income
                  </button>
                </div>
                <div className="flex space-x-1 md:space-x-2">
                  {["D", "W", "M", "all"].map((timeframe) => (
                    <button
                      key={timeframe}
                      className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm ${
                        activeTimeframe === timeframe
                          ? theme === "light"
                            ? "bg-gray-200"
                            : "bg-white text-black"
                          : "text-gray-400"
                      }`}
                      onClick={() => setActiveTimeframe(timeframe)}
                    >
                      {timeframe.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div> */}

              <div className="h-48 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-black text-white p-2 rounded">
                              <p className="font-bold">₦{payload[0].value}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-8">
            <div
              className={`${
                theme === "light" ? "bg-white" : "bg-[#121212]"
              } rounded-3xl p-4 md:p-8 shadow-sm`}
            >
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
                <h2
                  className={`${
                    theme === "light" ? "text-gray-800" : "text-white"
                  } text-xl md:text-2xl font-bold  mb-2 md:mb-0`}
                >
                  Transactions
                </h2>
                
              </div>
              <div className="space-y-4 md:space-y-6">
                {withdrawals && withdrawals.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2 md:space-x-4">
                      <div className="bg-[#030171] rounded-full p-2">
                        <ArrowDown className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm md:text-base font-medium">
                          ₦ {transaction.amount}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">
                          {transaction.request_time}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm md:text-base font-medium">
                      {transaction.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <WithdrawalModal
        isOpen={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
      />
      <AccountSetupModal
        isOpen={showAccountSetupModal}
        onClose={() => setShowAccountSetupModal(false)}
      />
    </div>
  );
};

export default WalletDashboard;
