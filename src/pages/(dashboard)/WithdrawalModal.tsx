import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { usersApi } from "../../shared/services/api/usersApi";

const WithdrawalModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useTheme();
  const token = Cookies.get("auth_token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await usersApi.requestWithdrawal({ amount });

      if (response.data.code === 200) {
        Swal.fire(
          "Account Update Successful",
          response.data.message,
          "success"
        ).then(() => {
          window.location.reload(); // Reloads the page
          onClose();
        });
        console.log(response.data.message);
        // You might want to add a success message or update the user's balance here
      } else {
        setError(response.data.message || "An error occurred");
        console.log(response.message);
      }
    } catch (error) {
      console.error(error.response.data.message);
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
      <div className="relative w-full max-w-md px-4 mx-auto my-6">
        <div
          className={` ${
            theme === "dark" ? "bg-[#121212]" : "bg-white"
          } relative flex flex-col w-full  rounded-xl shadow-2xl border border-gray-200`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute z-10 text-gray-400 top-4 right-4 hover:text-gray-600"
          >
            <X size={24} />
          </button>

          {/* Modal Content */}
          <div className="p-6 space-y-6 md:p-8">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
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
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Withdrawal Amount
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    ₦
                  </span>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full py-2 pr-3 text-sm border border-gray-300 rounded-md shadow-sm pl-7 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="px-4 py-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
                  {error}
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Processing..." : "Withdraw"}
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
