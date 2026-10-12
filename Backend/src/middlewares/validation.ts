import { Request, Response, NextFunction } from 'express';

export const validateCreateEvent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { event_type_id, start_date_time, description, address, confirmed_attendees } = req.body;

  // 1. Check all required fields are present and not empty
  if (
    event_type_id === undefined ||
    event_type_id === null ||
    !start_date_time ||
    !description ||
    typeof description !== 'string' ||
    description.trim() === '' ||
    !address ||
    typeof address !== 'string' ||
    address.trim() === '' ||
    confirmed_attendees === undefined ||
    confirmed_attendees === null
  ) {
    res.status(400).json({
      error: 'כל השדות הינם שדות חובה (סוג אירוע, תאריך ושעה, תיאור, כתובת, ומספר מאשרי הגעה).',
    });
    return;
  }

  // 2. Validate event_type_id
  const typeId = Number(event_type_id);
  if (isNaN(typeId) || typeId <= 0 || !Number.isInteger(typeId)) {
    res.status(400).json({ error: 'קוד סוג אירוע אינו תקין.' });
    return;
  }

  // 3. Validate confirmed_attendees (0 to 1000)
  const attendees = Number(confirmed_attendees);
  if (isNaN(attendees) || attendees < 0 || attendees > 1000 || !Number.isInteger(attendees)) {
    res.status(400).json({
      error: 'מספר האנשים שאישרו הגעה חייב להיות מספר שלם בין 0 ל-1000.',
    });
    return;
  }

  // 4. Validate start_date_time
  const eventDate = new Date(start_date_time);
  if (isNaN(eventDate.getTime())) {
    res.status(400).json({ error: 'תאריך ושעת האירוע אינם תקינים.' });
    return;
  }

  // 5. When adding event: past date is NOT allowed (with 60-second grace period)
  const now = new Date();
  if (eventDate.getTime() < now.getTime() - 60000) {
    res.status(400).json({
      error: 'אין אפשרות להוסיף אירוע שמועדו בעבר.',
    });
    return;
  }

  next();
};

export const validateUpdateEvent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { event_type_id, start_date_time, description, address, confirmed_attendees } = req.body;

  // 1. Check all required fields are present and not empty
  if (
    event_type_id === undefined ||
    event_type_id === null ||
    !start_date_time ||
    !description ||
    typeof description !== 'string' ||
    description.trim() === '' ||
    !address ||
    typeof address !== 'string' ||
    address.trim() === '' ||
    confirmed_attendees === undefined ||
    confirmed_attendees === null
  ) {
    res.status(400).json({
      error: 'כל השדות הינם שדות חובה (סוג אירוע, תאריך ושעה, תיאור, כתובת, ומספר מאשרי הגעה).',
    });
    return;
  }

  // 2. Validate event_type_id
  const typeId = Number(event_type_id);
  if (isNaN(typeId) || typeId <= 0 || !Number.isInteger(typeId)) {
    res.status(400).json({ error: 'קוד סוג אירוע אינו תקין.' });
    return;
  }

  // 3. Validate confirmed_attendees (0 to 1000)
  const attendees = Number(confirmed_attendees);
  if (isNaN(attendees) || attendees < 0 || attendees > 1000 || !Number.isInteger(attendees)) {
    res.status(400).json({
      error: 'מספר האנשים שאישרו הגעה חייב להיות מספר שלם בין 0 ל-1000.',
    });
    return;
  }

  // 4. Validate start_date_time (no restriction on past dates for update)
  const eventDate = new Date(start_date_time);
  if (isNaN(eventDate.getTime())) {
    res.status(400).json({ error: 'תאריך ושעת האירוע אינם תקינים.' });
    return;
  }

  next();
};
