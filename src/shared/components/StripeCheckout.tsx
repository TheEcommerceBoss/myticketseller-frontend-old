/* eslint-disable react/prop-types */
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { paymentsApi } from "../services/api";
import { STRIPE_PUBLISHABLE_KEY } from "../config/env";
import stripeLogo from "../../assets/(svg)/stripe.svg";
// Initialize Stripe with your publishable key
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ ticketDetails }) => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleCheckout = async () => {
		setLoading(true);

		try {
			localStorage.setItem(
				"ticketDetails",
				JSON.stringify(ticketDetails)
			);
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
	console.log(ticketDetails);
	return (
		<div className="p-4 md:py-10">
			<div className="flex justify-center">
				<img src={stripeLogo} alt="Stripe" />
			</div>
			<h1 className="my-2 text-xl text-center lg:text-2xl">
				Proceed with Payment
			</h1>
			<div className="text-sm text-center text-gray-600 lg:text-base">
				You will be redirected to the Stripe checkout
			</div>
			<div className="flex justify-between py-4 my-8 text-lg border-gray-200 border-y lg:text-xl">
				<span>Total</span>
				<span>{`${ticketDetails.currencyCode} ${ticketDetails.total_amount}`}</span>
			</div>
			<div>
				<button
					onClick={handleCheckout}
					disabled={loading}
					className="w-full p-3 text-white rounded-md bg-primary"
				>
					{loading ? "Processing..." : "Pay Now"}
				</button>
				{error && (
					<div className="mt-2 text-center text-red-500">{error}</div>
				)}
			</div>
		</div>
	);
};

export default CheckoutForm;
