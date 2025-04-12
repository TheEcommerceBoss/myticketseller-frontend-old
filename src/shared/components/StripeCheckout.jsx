// components/CheckoutForm.js
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

export function CheckoutForm({ clientSecret }) {
	const stripe = useStripe();
	const elements = useElements();

	console.log(stripe, clientSecret);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) return;

		const result = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: { name: "John Doe" },
			},
		});
		console.log(result);

		if (result.error) {
			console.error(result.error.message);
		} else if (result.paymentIntent.status === "succeeded") {
			const res = await paymentsApi.verify(
				result.paymentIntent.id,
				"stripe"
			);
			console.log(res);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			<button
				type="submit"
				disabled={!stripe || !clientSecret}
				className="px-4 py-2 text-white bg-orange-500 rounded"
			>
				Pay
			</button>
		</form>
	);
}

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { paymentsApi } from "../../api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function StripeModal({ clientSecret }) {
	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm clientSecret={clientSecret} />
		</Elements>
	);
}
