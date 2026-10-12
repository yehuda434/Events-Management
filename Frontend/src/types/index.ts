export interface EventType {
  id: number;
  name: string;
}

export interface EventItem {
  id: number;
  event_type_id: number;
  event_type_name?: string;
  start_date_time: string;
  description: string;
  address: string;
  confirmed_attendees: number;
}

export interface EventFormData {
  event_type_id: number | '';
  start_date_time: string;
  description: string;
  address: string;
  confirmed_attendees: number | '';
}
