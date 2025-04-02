// Base response type for API calls
interface ApiResponse<T> {
  message: string;
  data?: T;
  error?: string;
}

// User model
interface IUser {
  id: number;
  full_name: string;
  email: string;
  password: string; // Note: Typically not returned in API responses
  phone_number?: string;
  avatar_url?: string;
}

// Category model
interface ICategory {
  id: number;
  name: string;
  description?: string;
}

// Event model
interface IEvent {
  id: number;
  title: string;
  description?: string;
  category_id?: number; // Default: 1 (General)
  is_public: boolean; // Default: false
  image?: string;
  created_at: string; // ISO 8601 string (e.g., "2025-04-01T14:58:12Z")
  updated_at: string; // ISO 8601 string
  organizer_id: number;
  restrictions?: Record<string, any>; // JSON object
  number_of_expected_users?: number;
  special_guests?: { name: string }[]; // Array of objects
  authorities_to_notify?: string[]; // Array of strings
  is_password_protected: boolean; // Default: false
  event_password?: string;
  is_listed: boolean; // Default: true
  days: IEventDay[];
  tickets: ITicket[];
}

// EventDay model
interface IEventDay {
  id: number;
  event_id: number;
  event_type: "onsite" | "virtual" | "hybrid"; // Enum-like union type
  event_day: string; // Date string (e.g., "2025-05-01")
  open_door: string; // Time string (e.g., "18:00:00")
  close_door?: string; // Time string or null
  event_link?: string;
  event_password?: string; // Day-specific password
  event_address?: string;
}

// Ticket model
interface ITicket {
  id: number;
  event_id: number;
  name: string;
  type: "paid" | "free" | "group" | "guest_list" | "bottle_list" | "donation";
  price: number;
  currency: string; // e.g., "NGN"
  quantity: number;
  number_sold: number; // Default: 0
  status: "available" | "sold_out"; // Add more statuses as needed
  is_checked_in: boolean; // Default: false
}

// Types for API payloads (creation/update)
interface ICreateEventPayload {
  title: string;
  description?: string;
  category_id?: number;
  is_public?: boolean;
  image?: File; // For FormData
}

interface IUpdateEventDetailsPayload {
  restrictions?: Record<string, any>;
  number_of_expected_users?: number;
  special_guests?: { name: string }[];
  authorities_to_notify?: string[];
  is_password_protected?: boolean;
  event_password?: string;
  is_listed?: boolean;
}

interface ICreateEventDayPayload {
  event_type: "onsite" | "virtual" | "hybrid";
  event_day: string; // YYYY-MM-DD
  open_door: string; // HH:MM:SS
  close_door?: string;
  event_link?: string;
  event_password?: string;
  event_address?: string;
}

interface ICreateTicketPayload {
  event_id: number;
  name: string;
  type: "paid" | "free" | "group" | "guest_list" | "bottle_list" | "donation";
  price: number;
  currency?: string; // Default: "NGN"
  quantity: number;
}

// Response types
interface EventResponse extends ApiResponse<IEvent> {
  id: number;
}

interface EventDaysResponse extends ApiResponse<IEventDay[]> {
  ids: number[];
}

interface TicketsResponse extends ApiResponse<ITicket[]> {
  ids: number[];
}

export {
  IUser,
  ICategory,
  IEvent,
  IEventDay,
  ITicket,
  ICreateEventPayload,
  IUpdateEventDetailsPayload,
  ICreateEventDayPayload,
  ICreateTicketPayload,
  EventResponse,
  EventDaysResponse,
  TicketsResponse,
};
