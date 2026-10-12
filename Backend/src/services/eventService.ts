import { query } from '../db';
import { Event, CreateEventDTO, UpdateEventDTO } from '../types';

export const eventService = {
  // Get all events
  async getAll(): Promise<Event[]> {
    const result = await query<Event>(
      `SELECT 
        e.id, 
        e.event_type_id, 
        et.name AS event_type_name, 
        e.start_date_time, 
        e.description, 
        e.address, 
        e.confirmed_attendees
      FROM events e
      JOIN event_types et ON e.event_type_id = et.id
      ORDER BY e.start_date_time ASC`
    );
    return result.rows;
  },

  // Get all events by specific event type ID
  async getByTypeId(eventTypeId: number): Promise<Event[]> {
    const result = await query<Event>(
      `SELECT 
        e.id, 
        e.event_type_id, 
        et.name AS event_type_name, 
        e.start_date_time, 
        e.description, 
        e.address, 
        e.confirmed_attendees
      FROM events e
      JOIN event_types et ON e.event_type_id = et.id
      WHERE e.event_type_id = $1
      ORDER BY e.start_date_time ASC`,
      [eventTypeId]
    );
    return result.rows;
  },

  // Get specific event by ID
  async getById(id: number): Promise<Event | null> {
    const result = await query<Event>(
      `SELECT 
        e.id, 
        e.event_type_id, 
        et.name AS event_type_name, 
        e.start_date_time, 
        e.description, 
        e.address, 
        e.confirmed_attendees
      FROM events e
      JOIN event_types et ON e.event_type_id = et.id
      WHERE e.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },

  // Add new event
  async create(data: CreateEventDTO): Promise<Event> {
    const insertResult = await query<{ id: number }>(
      `INSERT INTO events (event_type_id, start_date_time, description, address, confirmed_attendees)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        data.event_type_id,
        data.start_date_time,
        data.description,
        data.address,
        data.confirmed_attendees,
      ]
    );

    const createdId = insertResult.rows[0].id;
    const fullEvent = await this.getById(createdId);
    return fullEvent!;
  },

  // Update existing event
  async update(id: number, data: UpdateEventDTO): Promise<Event | null> {
    const updateResult = await query(
      `UPDATE events 
       SET event_type_id = $1, 
           start_date_time = $2, 
           description = $3, 
           address = $4, 
           confirmed_attendees = $5
       WHERE id = $6
       RETURNING id`,
      [
        data.event_type_id,
        data.start_date_time,
        data.description,
        data.address,
        data.confirmed_attendees,
        id,
      ]
    );

    if (updateResult.rowCount === 0) {
      return null;
    }

    return await this.getById(id);
  },

  // Delete event
  async delete(id: number): Promise<boolean> {
    const result = await query(
      'DELETE FROM events WHERE id = $1 RETURNING id',
      [id]
    );
    return (result.rowCount ?? 0) > 0;
  },
};
