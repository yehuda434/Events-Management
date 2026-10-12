import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { EventFormData, EventType } from '../types';
import { PlusCircle, ArrowRight, AlertTriangle } from 'lucide-react';

export const AddEventPage: React.FC = () => {
  const navigate = useNavigate();
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [formData, setFormData] = useState<EventFormData>({
    event_type_id: '',
    start_date_time: '',
    description: '',
    address: '',
    confirmed_attendees: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Load event types for the select dropdown
  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const types = await api.getEventTypes();
        setEventTypes(types);
      } catch (err: any) {
        console.error('Error loading event types:', err);
      }
    };
    fetchEventTypes();
  }, []);

  // Format current local time for datetime-local min attribute (YYYY-MM-DDTHH:mm)
  const getMinDateTime = (): string => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. All fields are required
    if (!formData.event_type_id) {
      newErrors.event_type_id = 'יש לבחור סוג אירוע (שדה חובה).';
    }

    if (!formData.start_date_time) {
      newErrors.start_date_time = 'יש להזין תאריך ושעת אירוע (שדה חובה).';
    } else {
      // Past time validation: Not allowed in Add Event
      const selectedDate = new Date(formData.start_date_time);
      const now = new Date();
      if (selectedDate.getTime() < now.getTime() - 60000) {
        newErrors.start_date_time = 'אין אפשרות להוסיף אירוע בעל זמן עבר.';
      }
    }

    if (!formData.description || formData.description.trim() === '') {
      newErrors.description = 'יש להזין תיאור אירוע (שדה חובה).';
    }

    if (!formData.address || formData.address.trim() === '') {
      newErrors.address = 'יש להזין כתובת אירוע (שדה חובה).';
    }

    if (formData.confirmed_attendees === '' || formData.confirmed_attendees === undefined) {
      newErrors.confirmed_attendees = 'יש להזין מספר מאשרי הגעה (שדה חובה).';
    } else {
      const attendees = Number(formData.confirmed_attendees);
      if (isNaN(attendees) || attendees < 0 || attendees > 1000) {
        newErrors.confirmed_attendees = 'מספר האנשים שאישרו הגעה לא יכול להיות שלילי או גדול מ-1000.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error on change
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await api.createEvent(formData);
      navigate('/events');
    } catch (err: any) {
      console.error('Error creating event:', err);
      const errorMsg =
        err.response?.data?.error || 'אירעה שגיאה בעת שמירת האירוע. אנא נסה שוב.';
      setServerError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/events" className="btn btn-outline btn-sm" style={{ display: 'inline-flex', gap: '0.35rem' }}>
          <ArrowRight size={16} />
          <span>חזרה ללוח האירועים</span>
        </Link>
      </div>

      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">הוספת אירוע חדש</h1>
          <p className="form-subtitle">הזן את פרטי האירוע החדש. כל השדות הינם שדות חובה.</p>
        </div>

        {serverError && (
          <div className="alert alert-danger">
            <AlertTriangle size={18} />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Event Type */}
          <div className="form-group">
            <label className="form-label" htmlFor="event_type_id">
              סוג האירוע <span className="required">*</span>
            </label>
            <select
              id="event_type_id"
              name="event_type_id"
              value={formData.event_type_id}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">-- בחר סוג אירוע --</option>
              {eventTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {errors.event_type_id && <p className="form-error-msg">{errors.event_type_id}</p>}
          </div>

          {/* Start Date & Time (One field) */}
          <div className="form-group">
            <label className="form-label" htmlFor="start_date_time">
              תאריך ושעת התחלת האירוע <span className="required">*</span>
            </label>
            <input
              type="datetime-local"
              id="start_date_time"
              name="start_date_time"
              min={getMinDateTime()}
              value={formData.start_date_time}
              onChange={handleChange}
              className="form-control"
            />
            <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem' }}>
              * לא ניתן לבחור תאריך או שעה בעבר עבור אירוע חדש.
            </small>
            {errors.start_date_time && <p className="form-error-msg">{errors.start_date_time}</p>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              תיאור האירוע <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="לדוגמה: חתונת השנה של דני ומיכל באולמי גני כנען..."
              value={formData.description}
              onChange={handleChange}
              className="form-control"
            />
            {errors.description && <p className="form-error-msg">{errors.description}</p>}
          </div>

          {/* Address */}
          <div className="form-group">
            <label className="form-label" htmlFor="address">
              כתובת האירוע <span className="required">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="לדוגמה: רחוב הירקון 120, תל אביב"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
            />
            {errors.address && <p className="form-error-msg">{errors.address}</p>}
          </div>

          {/* Confirmed Attendees */}
          <div className="form-group">
            <label className="form-label" htmlFor="confirmed_attendees">
              מספר אנשים שאישרו הגעה (0 עד 1000) <span className="required">*</span>
            </label>
            <input
              type="number"
              id="confirmed_attendees"
              name="confirmed_attendees"
              min="0"
              max="1000"
              placeholder="0"
              value={formData.confirmed_attendees}
              onChange={handleChange}
              className="form-control"
            />
            {errors.confirmed_attendees && (
              <p className="form-error-msg">{errors.confirmed_attendees}</p>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              <PlusCircle size={18} />
              <span>{isSubmitting ? 'שומר אירוע...' : 'שמירת אירוע חדש'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/events')}
              className="btn btn-outline"
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
