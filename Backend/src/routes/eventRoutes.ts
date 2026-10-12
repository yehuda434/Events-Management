import { Router } from 'express';
import { eventController } from '../controllers/eventController';
import { validateCreateEvent, validateUpdateEvent } from '../middlewares/validation';

const router = Router();

// GET /api/events - החזרת כל האירועים (עבור תצוגה כללית)
router.get('/', eventController.getAll);

// GET /api/events/by-type/:eventTypeId - החזרת כל האירועים מסוג מסוים
router.get('/by-type/:eventTypeId', eventController.getByTypeId);

// GET /api/events/:id - החזרת אירוע ספציפי לפי קוד אירוע
router.get('/:id', eventController.getById);

// POST /api/events - הוספת אירוע חדש
router.post('/', validateCreateEvent, eventController.create);

// PUT /api/events/:id - עדכון אירוע קיים
router.put('/:id', validateUpdateEvent, eventController.update);

// DELETE /api/events/:id - מחיקת אירוע קיים
router.delete('/:id', eventController.delete);

export default router;
