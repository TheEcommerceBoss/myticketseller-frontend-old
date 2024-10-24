import React, { useState } from 'react';
import { X } from 'lucide-react';

const TicketModal = ({ isOpen, onClose, eventTitle, eventDateTime, eventId }) => {
  const [ticketCounts, setTicketCounts] = useState({
    regular: 2,
    vip: 0
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });



  if (!isOpen) return null;

  const handleTicketChange = (type, operation) => {
    setTicketCounts(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (operation === 'add' ? 1 : -1))
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { ticketCounts, formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#040171]">{eventTitle}</h2>
              <p className="text-gray-600">{eventDateTime}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Ticket Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Select Ticket</h3>
            
            {/* Regular Ticket */}
            <div className="bg-white shadow-sm border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-[#040171]">NGN 10,000</p>
                  <p className="text-gray-600">REGULAR</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleTicketChange('regular', 'subtract')}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{ticketCounts.regular}</span>
                  <button
                    onClick={() => handleTicketChange('regular', 'add')}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#040171] text-white hover:bg-blue-900"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* VIP Ticket */}
            <div className="bg-white shadow-sm border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-[#040171]">NGN 10,000</p>
                  <p className="text-gray-600">VIP</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleTicketChange('vip', 'subtract')}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{ticketCounts.vip}</span>
                  <button
                    onClick={() => handleTicketChange('vip', 'add')}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#040171] text-white hover:bg-blue-900"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Attendee Information Form */}
          <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold mb-4">Attendee Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email Address"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter Phone Number"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-orange-600 transition-colors"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;