import { useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { paymentsApi } from "../services/api";

export default function FlutterwaveCheckout({ ticketDetails }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: `tx_${Date.now()}`,
    amount: ticketDetails.total_amount,
    currency: ticketDetails.currencyCode,
    payment_options: "card, mobilemoneyghana, ussd",
    customer: {
      email: ticketDetails.attendee_info.email,
      phone_number: ticketDetails.attendee_info.phone_number,
      name: ticketDetails.attendee_info.full_name,
    },
    customizations: {
      title: "Event Ticket Payment",
      description: `Payment for ${ticketDetails.eventName}`,
    },
  };

  async function handleFlutterwavePayment(response) {
    if (response.status === "successful") {
      const paymentResult = await paymentsApi.processPayment({
        payment_id: response.transaction_id,
        payment_method: "flutterwave",
        ticket_details: ticketDetails,
      });

      console.log("my result", paymentResult);
      if (paymentResult.status === "success") {
        alert("Payment successful! Check your email for the ticket.");
      } else {
        setError(paymentResult.message);
      }
    } else {
      setError("Payment failed. Please try again.");
    }
    setLoading(false);
    closePaymentModal();
  }

  console.log(ticketDetails);

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <h1>Payment for Event</h1>
      <small>Handle payment for event</small>
      <FlutterWaveButton
        {...config}
        text={loading ? "Processing..." : "Pay Now"}
        callback={handleFlutterwavePayment}
        onClose={() => setLoading(false)}
        disabled={loading}
      />
    </div>
  );
}
