import newApi from ".";

export const scanApi = {
  scanTicket: async function (ticket_code: string) {
    const res = await newApi.post("/scans/scan-ticket", { ticket_code });
    return res.data;
  },
};
