import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { paymentsApi } from "../services/api";
import { STRIPE_PUBLISHABLE_KEY } from "../config/env";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ ticketDetails }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      localStorage.setItem("ticketDetails", JSON.stringify(ticketDetails));
      // Step 1: Create a Checkout Session on the backend
      const response = await paymentsApi.createCheckoutSession({
        ticket_details: {
          ...ticketDetails,
          success_url: `${window.location.origin}/payment-success`,
          cancel_url: `${window.location.origin}/payment-cancel`,
        },
      });
      const { data } = response;

      if (!data.url) {
        setError("Failed to create checkout session.");
        setLoading(false);
        return;
      }

      // Step 2: Redirect to the Checkout Session URL
      const stripe = await stripePromise;
      console.log("my data", data);
      console.log(stripe);
      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId: data.session_id,
      });

      if (redirectError) {
        setError(redirectError.message);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "Pay with Stripe"}
      </button>
    </div>
  );
};

export default CheckoutForm;
