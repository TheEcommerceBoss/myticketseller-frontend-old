import newApi from ".";
import { IEvent, IUpdateEventDetailsPayload } from "../../../types";

export const eventsApi = {
  createEvent: async (data: Partial<IEvent> | FormData) => {
    const res = await newApi.post("/events", data, {
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });
    return res.data;
  },
  async getEventTransactions(event_id: string) {
    const res = await newApi.get(`/events/${event_id}/transactions`);
    return res.data;
  },
  async getEventCheckins(event_id: string) {
    const res = await newApi.get(`/events/${event_id}/checkins`);
    return res.data;
  },
  async getEventSuccessfulTransactions(event_id: string) {
    const res = await newApi.get(`/events/${event_id}/successful-transactions`);
    return res.data;
  },
  async getEventAttendees(event_id: string) {
    const res = await newApi.get(`/events/${event_id}/attendees`);
    return res.data;
  },
  async getEventGuestList(event_id: string) {
    const res = await newApi.get(`/events/${event_id}/guest-list`);
    return res.data;
  },
  async getEventComplimentaries(event_id: string) {
    const res = await newApi.get(`/events/${event_id}/complimentary`);
    return res.data;
  },
  async getEventTicketScans(event_id: string) {
    const res = await newApi.get(`/events/${event_id}/ticket-scans`);
    return res.data;
  },
  getEvents: async function () {
    const res = await newApi.get(`/events`);
    return res.data;
  },
  getEventById: async (event_id: string) => {
    const res = await newApi.get(`/events/${event_id}`);
    return res.data;
  },
  updateEvent: async (event_id: string, data: Partial<IEvent>) => {
    const res = await newApi.put(`/events/${event_id}`, data);
    return res.data;
  },
  addEventSchedule: async (event_id: string, days: []) => {
    const res = await newApi.post(`events/${event_id}/days/bulk`, days);
    return res.data;
  },
  updateEventDetails: async (
    event_id: string,
    data: any | IUpdateEventDetailsPayload
  ) => {
    const res = await newApi.put(`/events/${event_id}/details`, data);
    return res.data;
  },
  getMyEvents: async () => {
    const res = await newApi.get("/events/my-events");
    return res.data;
  },
  searchEvents: async function (query: string) {
    const res = await newApi.get(`/events/search?q=${query}`);
    return res.data;
  },
  getEventsByCategory: async function (category_id: string | number) {
    const res = await newApi.get(`/events/category/${category_id}`);
    return res.data;
  },
  getEventSchedule: async function (event_id: string) {
    const res = await newApi.get(`/events/${event_id}/schedule`);
    return res.data;
  },
  deleteEvent: async function (event_id: string) {
    const res = await newApi.delete(`/events/${event_id}`);
    return res.data;
  },
  async getEventOrders(eventId: string) {
    const res = await newApi.get(`/events/${eventId}/orders`);
    return res.data;
  },
  async resendTransactionEmails(transactionId: string) {
    const res = await newApi.post(`/payments/resend-emails/${transactionId}`);
    return res.data;
  },
};
