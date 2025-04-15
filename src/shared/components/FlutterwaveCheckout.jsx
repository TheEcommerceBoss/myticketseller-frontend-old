/* eslint-disable react/prop-types */
import { useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { paymentsApi } from "../services/api";
import Swal from "sweetalert2";
import flutterwaveLogo from "../../assets/(svg)/flutterwave.svg";

export default function FlutterwaveCheckout({
	ticketDetails,
	setShowFlutterWave = true,
}) {
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
		if (
			response.status === "completed" ||
			response.status === "successful"
		) {
			setLoading(true);

			const paymentResult = await paymentsApi.processPayment({
				payment_id: response.transaction_id,
				payment_method: "flutterwave",
				ticket_details: ticketDetails,
			});

			if (paymentResult.status === "success") {
				Swal.fire({
					title: "Ticket sold successfully",
					message:
						"Payment successful! Check your email for the ticket.",
					color: "green",
					timer: 5000,
				});
				setShowFlutterWave(false);
				window.location.href = `/event/view/${ticketDetails.event_id}`;
			} else {
				setError(paymentResult.message);
				console.log("some err");
			}
		} else {
			setError("Payment failed. Please try again.");
			setError("An error");
		}
		setLoading(false);
		closePaymentModal();
	}

	return (
		<div className="p-4 md:py-10">
			<div className="flex justify-center">
				<img src={flutterwaveLogo} alt="Flutterwave" />
			</div>
			<h1 className="my-2 text-xl text-center lg:text-2xl">
				Proceed with Payment
			</h1>
			<div className="text-sm text-center text-gray-600 lg:text-base">
				You will be redirected to the Flutterwave checkout
			</div>
			<div className="flex justify-between py-4 my-8 text-lg border-gray-200 border-y lg:text-xl">
				<span>Total</span>
				<span>{`${ticketDetails.currencyCode} ${ticketDetails.total_amount}`}</span>
			</div>
			<div>
				<FlutterWaveButton
					{...config}
					text={loading ? "Processing..." : "Pay Now"}
					callback={handleFlutterwavePayment}
					onClose={() => setLoading(false)}
					disabled={loading}
					className="w-full p-3 text-white rounded-md bg-primary"
				/>
				{error && (
					<div className="mt-2 text-center text-red-500">{error}</div>
				)}
			</div>
		</div>
	);
}
