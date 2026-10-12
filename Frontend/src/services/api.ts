import axios from 'axios';
import { EventItem, EventType, EventFormData } from '../types';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:4000/api' : '/api');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Get all event types
  async getEventTypes(): Promise<EventType[]> {
    const res = await apiClient.get<EventType[]>('/event-types');
    return res.data;
  },

  // Get all events
  async getAllEvents(): Promise<EventItem[]> {
    const res = await apiClient.get<EventItem[]>('/events');
    return res.data;
  },

  // Get events by specific event type ID
  async getEventsByType(typeId: number): Promise<EventItem[]> {
    const res = await apiClient.get<EventItem[]>(`/events/by-type/${typeId}`);
    return res.data;
  },

  // Get event by ID
  async getEventById(id: number): Promise<EventItem> {
    const res = await apiClient.get<EventItem>(`/events/${id}`);
    return res.data;
  },

  // Add new event
  async createEvent(data: EventFormData): Promise<EventItem> {
    const res = await apiClient.post<EventItem>('/events', {
      event_type_id: Number(data.event_type_id),
      start_date_time: new Date(data.start_date_time).toISOString(),
      description: data.description.trim(),
      address: data.address.trim(),
      confirmed_attendees: Number(data.confirmed_attendees),
    });
    return res.data;
  },

  // Update existing event
  async updateEvent(id: number, data: EventFormData): Promise<EventItem> {
    const res = await apiClient.put<EventItem>(`/events/${id}`, {
      event_type_id: Number(data.event_type_id),
      start_date_time: new Date(data.start_date_time).toISOString(),
      description: data.description.trim(),
      address: data.address.trim(),
      confirmed_attendees: Number(data.confirmed_attendees),
    });
    return res.data;
  },

  // Delete event
  async deleteEvent(id: number): Promise<void> {
    await apiClient.delete(`/events/${id}`);
  },
};
