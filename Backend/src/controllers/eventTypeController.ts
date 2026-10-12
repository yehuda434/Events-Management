import { Request, Response, NextFunction } from 'express';
import { eventTypeService } from '../services/eventTypeService';

export const eventTypeController = {
  // GET /api/event-types
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const types = await eventTypeService.getAll();
      res.json(types);
    } catch (err) {
      next(err);
    }
  },
};
