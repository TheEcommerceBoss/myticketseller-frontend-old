import { useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

export default function FlutterwaveCheckout({ ticketDetails }) {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const config = {
		public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
		tx_ref: `tx_${Date.now()}`,
		amount: ticketDetails.total_amount,
		currency: "USD",
		payment_options: "card, mobilemoneyghana, ussd",
		customer: {
			email: ticketDetails.buyer_email,
			phone_number: ticketDetails.phone_number,
			name: ticketDetails.buyer_name,
		},
		customizations: {
			title: "Event Ticket Payment",
			description: `Payment for ${ticketDetails.eventName}`,
		},
	};

	async function handleFlutterwavePayment(response) {
		if (response.status === "successful") {
			// TODO: Handle successful payment
		}
	}

	console.log(ticketDetails);

	return (
		<div>
			{error && <div className="text-red-500">{error}</div>}
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
