import newApi from ".";

export interface IManualSale {
  event_id: string;
  ticket_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  payment_type: string;
  notes: string;
  quantity: string;
  amount_paid: string;
  price: string;
  user_id: string | number;
  ticket_type: string;
}

type ICreateManualSale = Omit<IManualSale, "user_id">;

export const manualSalesApi = {
  async createManualSale(data: ICreateManualSale) {
    const res = await newApi.post("/manual-sales", data);
    return res.data;
  },
  async getManualSales() {
    const res = await newApi.get("/manual-sales");
    return res.data;
  },
};
