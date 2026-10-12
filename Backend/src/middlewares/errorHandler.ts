import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('❌ Server Error:', err);

  // Check for PostgreSQL specific errors
  if (err.code === '23503') {
    // Foreign key violation
    res.status(400).json({
      error: 'סוג האירוע שנבחר אינו קיים במערכת (Foreign Key Violation).',
    });
    return;
  }

  if (err.code === '23514') {
    // Check constraint violation
    res.status(400).json({
      error: 'אחד הנתונים שהוזנו חורג מטווח הערכים המותר (Check Constraint Violation).',
    });
    return;
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'שגיאת שרת פנימית.';

  res.status(statusCode).json({ error: message });
};
