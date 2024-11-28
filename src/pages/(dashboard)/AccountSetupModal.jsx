import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountSetupModal = ({ isOpen, onClose, onAccountSetupSuccess }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [banks, setBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}FetchBanks`);
        setBanks(response.data.banks.data);
      } catch (error) {
        console.error('Error fetching banks:', error);
        setError('Unable to fetch bank list. Please try again.');
      }
    };

    if (isOpen) {
      fetchBanks();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}updateAccountDetails`,
        {
          account_number: accountNumber,
          bank_code: selectedBank,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.code === 200) {
        onClose();
        onAccountSetupSuccess && onAccountSetupSuccess(response.data);
      } else {
        setError(response.data.message || 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred while processing your request');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex px-5 items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8"> {/* Increased padding from p-6 to p-8 */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Setup Account</h2>
          <p className="text-gray-600 mt-2">Enter your account details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased spacing from space-y-4 to space-y-6 */}
          <div>
            <label 
              htmlFor="accountNumber" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your account number"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="bank" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Bank
            </label>
            <select
              id="bank"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a bank</option>
              {banks.map((bank) => (
                <option key={bank.code} value={bank.code}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>

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
                         text-gray-700 bg-white hover:bg-gray-100 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 border border-transparent rounded-md 
                         text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSetupModal;