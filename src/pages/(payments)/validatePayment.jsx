import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { paymentsApi } from "../../shared/services/api";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const processPayment = async () => {
      const urlParams = new URLSearchParams(location.search);
      const sessionId = urlParams.get("session_id");

      if (!sessionId) {
        setError("Session ID not found.");
        return;
      }

      // Retrieve ticket details from localStorage
      const ticketDetails = JSON.parse(localStorage.getItem("ticketDetails"));
      if (!ticketDetails) {
        setError("Ticket details not found.");
        return;
      }

      // Fetch the Checkout Session to get the PaymentIntent ID
      const sessionResult = await paymentsApi.getCheckoutSession(sessionId);
      console.log(sessionResult);

      if (sessionResult.status !== "success") {
        setError(sessionResult.message);
        return;
      }

      const paymentIntentId = sessionResult.data.payment_intent;
      const result = await paymentsApi.processPayment({
        payment_id: paymentIntentId,
        payment_method: "card",
        ticket_details: ticketDetails,
      });
      if (result.status !== "success") {
        setError(result.message);
      }
      setLoading(false);
      setMessage(result.message);
      localStorage.removeItem("ticketDetails");
      Swal.fire({
        title: "Payment Successful",
        text: result.message,
        timer: 2000,
        color: "green",
      });
      navigate("/");
    };

    processPayment();
  }, [location]);

  return (
    <div>
      {error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div>{loading ? "Processing..." : message}</div>
      )}
    </div>
  );
};

export default PaymentSuccess;
