import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
const AccountSetupModal = ({ isOpen, onClose, onAccountSetupSuccess }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [banks, setBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useTheme();
  const token = Cookies.get("auth_token");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/fetchbanks`
        );
        setBanks(response.data.message.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
        setError("Unable to fetch bank list. Please try again.");
      }
    };

    if (isOpen) {
      fetchBanks();
    }
  }, [isOpen]);

  // New function to resolve account name
  const resolveAccountName = async (accountNum, bankCode) => {
    setError("");
    
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/resolveAccount`,
        {
          account_number: accountNum,
          bank_code: bankCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );  
      
      console.log(response.data)
      
      if (response.data.code === 200 && response.data.message) {
        setAccountName(response.data.message.account_name || "");
      } else {
        setError(response.data.message || "Unable to resolve account name");
        setAccountName("");
      }
    } catch (error) {
      setError("Error resolving account name");
      setAccountName("");
      
    } finally {
      setIsLoading(false);
    }
  };

  // Handle account number input
  const handleAccountNumberChange = (e) => {
    const inputAccountNumber = e.target.value;
    
    // Only allow numeric input
    const numericAccountNumber = inputAccountNumber.replace(/\D/g, '');
    setAccountNumber(numericAccountNumber);

    // If account number is 10 digits and a bank is selected, resolve account
    if (numericAccountNumber.length === 10 && selectedBank) {
      resolveAccountName(numericAccountNumber, selectedBank);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const selectedBankName = banks.find((bank) => bank.code === selectedBank)?.name;
  
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/updateAccountDetails`,
        {
          account_number: accountNumber,
          bank_code: selectedBank,
          bank_name: selectedBankName,
          account_name: accountName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response.data);
  
      if (response.data.code === 200) {
        Swal.fire('Account Update Successful', 'Account Details have been updated Successfully!!!', 'success').then(() => {
          window.location.reload(); // Reloads the page
        });
        onAccountSetupSuccess && onAccountSetupSuccess(response.data);
      } else {
        setError(response.data.message || "An error occurred");
      }
    } catch (error) {
      setError("An error occurred while processing your request");
    } finally {
      setIsLoading(false);
    }
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex px-5 items-center justify-center bg-black bg-opacity-50">
      <div
        className={` ${
          theme === "dark" ? "bg-[#121212]" : "bg-white"
        }  rounded-lg shadow-xl w-full max-w-md p-8`}
      >
        <div className="text-center mb-6">
          <h2
            className={`text-xl font-bold  mt-1 ${
              theme === "dark" ? "text-white" : "text-[#040171]"
            }`}
          >
            Setup Account
          </h2>
          <p className="text-gray-400 mt-2">Enter your account details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="accountNumber"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              className={` ${
                theme === "dark" ? "bg-[#121212]" : "bg-white"
              }  w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your account number"
              maxLength="10"
              required
            />
          </div>
          
         

          <div>
            <label
              htmlFor="bank"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Bank
            </label>
            <select
              id="bank"
              value={selectedBank}
              onChange={(e) => {
                setSelectedBank(e.target.value);
                // If account number is 10 digits, resolve when bank is selected
                if (accountNumber.length === 10) {
                  resolveAccountName(accountNumber, e.target.value);
                }
              }}
              className={` ${
                theme === "dark" ? "bg-[#121212]" : "bg-white"
              }  w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              required
            >
              <option value="">Select a bank</option>
              {banks.map((bank, index) => (
                <option key={index} value={bank.code}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
          
          {accountName && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Account Name
              </label>
              <div 
                className={`w-full px-3 py-2 border border-gray-300 rounded-md 
                ${theme === "dark" ? "bg-[#121212] text-white" : "bg-white"}`}
              >
                {accountName}
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 border border-gray-300 rounded-md
                         text-black bg-white hover:bg-gray-100 focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !accountName}
              className="w-full py-2 px-4 border border-transparent rounded-md
                         text-white bg-blue-600 hover:bg-blue-400 focus:outline-none
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSetupModal;