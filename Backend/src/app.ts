import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import eventTypeRoutes from './routes/eventTypeRoutes';
import eventRoutes from './routes/eventRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/event-types', eventTypeRoutes);
app.use('/api/events', eventRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: `הנתיב המבוקש ${req.method} ${req.originalUrl} לא קיים בשרת.` });
});

// Central Error Handler
app.use(errorHandler);

export default app;
