import { query } from '../db';
import { EventType } from '../types';

export const eventTypeService = {
  // Get all event types
  async getAll(): Promise<EventType[]> {
    const result = await query<EventType>(
      'SELECT id, name FROM event_types ORDER BY id ASC'
    );
    return result.rows;
  },

  // Get event type by id
  async getById(id: number): Promise<EventType | null> {
    const result = await query<EventType>(
      'SELECT id, name FROM event_types WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },
};
