import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Cookies from "js-cookie";
import Swal from 'sweetalert2';

const WithdrawalModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { theme } = useTheme();
  const token = Cookies.get("auth_token");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/requestWithdrawal`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code === 200) {
        Swal.fire('Account Update Successful', response.data.message, 'success').then(() => {
          window.location.reload(); // Reloads the page
        onClose();
        });
        console.log(response.data.message)
        // You might want to add a success message or update the user's balance here
      } else {
        setError(response.data.message || 'An error occurred');
        console.log(response.message)
      }
    } catch (error) {
      console.error(error.response.data.message)
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md mx-auto my-6 px-4">
        <div className={` ${theme === "dark" ? "bg-[#121212]" : "bg-white"
          } relative flex flex-col w-full  rounded-xl shadow-2xl border border-gray-200`}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <X size={24} />
          </button>

          {/* Modal Content */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Request Withdrawal
              </h2>
              <p className="text-sm text-gray-600">
                Specify the amount you wish to withdraw
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="amount" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Withdrawal Amount
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    ₦
                  </span>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                      text-sm"
                    placeholder="0.00"
                    
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium 
                    text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm 
                    text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Withdraw'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModal;