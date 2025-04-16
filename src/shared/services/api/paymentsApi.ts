import newApi from ".";

export const paymentsApi = {
  intiate: async function (data: {
    tickets: { ticket_id: string | number; quantity: number }[];
    attendee_info: {
      full_name: string;
      email: string;
      phone_number: string;
    };
    paymentMethod: "flutterwave" | "paystack" | "stripe";
    marketingConsent: boolean;
    currencyCode: string;
    conversionRate: string;
  }) {
    const res = await newApi.post("/payments/initiate", data);
    return res.data;
  },
  verify: async function (reference: string, paymentMethod: string) {
    let payment_method: string;
    if (paymentMethod === "card" || paymentMethod === "stripe") {
      payment_method = "stripe";
    } else {
      payment_method = "flutterwave";
    }
    const res = await newApi.post(`/payments/verify/${reference}`, {
      paymentMethod: payment_method,
    });
    return res.data;
  },
  createCheckoutSession: async function (data: any) {
    const res = await newApi.post("/payments/create-checkout-session", data);
    return res.data;
  },
  getCheckoutSession: async function (session_id: string) {
    const res = await newApi.post(`/payments/get-session`, {
      session_id,
    });
    return res.data;
  },
  processPayment: async function (data: any) {
    const res = await newApi.post("/payments/process-payment", data);
    return res.data;
  },
};
