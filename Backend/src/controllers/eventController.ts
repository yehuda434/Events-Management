import { Request, Response, NextFunction } from 'express';
import { eventService } from '../services/eventService';

export const eventController = {
  // GET /api/events
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const events = await eventService.getAll();
      res.json(events);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/events/by-type/:eventTypeId
  async getByTypeId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const eventTypeId = parseInt(req.params.eventTypeId, 10);
      if (isNaN(eventTypeId)) {
        res.status(400).json({ error: 'קוד סוג אירוע חייב להיות מספר תקין.' });
        return;
      }

      const events = await eventService.getByTypeId(eventTypeId);
      res.json(events);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/events/:id
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'קוד אירוע חייב להיות מספר תקין.' });
        return;
      }

      const event = await eventService.getById(id);
      if (!event) {
        res.status(404).json({ error: `אירוע בעל קוד ${id} לא נמצא.` });
        return;
      }

      res.json(event);
    } catch (err) {
      next(err);
    }
  },

  // POST /api/events
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { event_type_id, start_date_time, description, address, confirmed_attendees } = req.body;
      const newEvent = await eventService.create({
        event_type_id: Number(event_type_id),
        start_date_time,
        description: description.trim(),
        address: address.trim(),
        confirmed_attendees: Number(confirmed_attendees),
      });

      res.status(201).json(newEvent);
    } catch (err) {
      next(err);
    }
  },

  // PUT /api/events/:id
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'קוד אירוע חייב להיות מספר תקין.' });
        return;
      }

      const { event_type_id, start_date_time, description, address, confirmed_attendees } = req.body;
      const updatedEvent = await eventService.update(id, {
        event_type_id: Number(event_type_id),
        start_date_time,
        description: description.trim(),
        address: address.trim(),
        confirmed_attendees: Number(confirmed_attendees),
      });

      if (!updatedEvent) {
        res.status(404).json({ error: `אירוע בעל קוד ${id} לא נמצא לעדכון.` });
        return;
      }

      res.json(updatedEvent);
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/events/:id
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'קוד אירוע חייב להיות מספר תקין.' });
        return;
      }

      const deleted = await eventService.delete(id);
      if (!deleted) {
        res.status(404).json({ error: `אירוע בעל קוד ${id} לא נמצא למחיקה.` });
        return;
      }

      res.status(200).json({ message: `אירוע מספר ${id} נמחק בהצלחה.`, id });
    } catch (err) {
      next(err);
    }
  },
};
