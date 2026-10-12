import { Router } from 'express';
import { eventTypeController } from '../controllers/eventTypeController';

const router = Router();

// GET /api/event-types - החזרת כל סוגי האירועים
router.get('/', eventTypeController.getAll);

export default router;
