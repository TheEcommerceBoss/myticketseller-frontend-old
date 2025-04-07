import { X } from "lucide-react";

const PaystackModal = ({ paystack, onClose }) => (
  <>
    <div className="bg-[#000080] h-full text-white rounded-lg ">
      <div className="flex justify-between p-6">
        <h3 className="mb-4 text-xl font-normal">Checkout</h3>
        <div className="flex flex-col items-end">
          <button
            onClick={onClose}
            className="p-2 bg-white bg-opacity-50 rounded-full"
          >
            <X className="w-6 h-6 font-bold text-white" />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <iframe
          src={paystack}
          title="Paystack Payment"
          width="100%"
          height="500"
          frameBorder="0"
          allow="payment"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  </>
);

export default PaystackModal;
