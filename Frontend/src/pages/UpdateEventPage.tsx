import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { EventFormData, EventType } from '../types';
import { Edit3, ArrowRight, AlertTriangle, RefreshCw } from 'lucide-react';

export const UpdateEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [formData, setFormData] = useState<EventFormData>({
    event_type_id: '',
    start_date_time: '',
    description: '',
    address: '',
    confirmed_attendees: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  // Helper to convert ISO string to YYYY-MM-DDTHH:mm for datetime-local input
  const formatForDateTimeInput = (isoDateString: string): string => {
    try {
      const d = new Date(isoDateString);
      // adjust for local timezone
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().slice(0, 16);
    } catch {
      return '';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [types, event] = await Promise.all([
          api.getEventTypes(),
          api.getEventById(Number(id)),
        ]);
        setEventTypes(types);
        setFormData({
          event_type_id: event.event_type_id,
          start_date_time: formatForDateTimeInput(event.start_date_time),
          description: event.description,
          address: event.address,
          confirmed_attendees: event.confirmed_attendees,
        });
      } catch (err: any) {
        console.error('Error loading event for update:', err);
        setServerError('אירעה שגיאה בטעינת נתוני האירוע או שהאירוע אינו קיים.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. All fields are required
    if (!formData.event_type_id) {
      newErrors.event_type_id = 'יש לבחור סוג אירוע (שדה חובה).';
    }

    if (!formData.start_date_time) {
      newErrors.start_date_time = 'יש להזין תאריך ושעת אירוע (שדה חובה).';
    }
    // Note: Per requirement, in UPDATE: "אין בעיה לעדכן אירוע שהיה בעבר" - so no past-date block!

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

    if (!validate() || !id) {
      return;
    }

    setIsSubmitting(true);
    try {
      await api.updateEvent(Number(id), formData);
      navigate('/events');
    } catch (err: any) {
      console.error('Error updating event:', err);
      const errorMsg =
        err.response?.data?.error || 'אירעה שגיאה בעת עדכון האירוע. אנא נסה שוב.';
      setServerError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <RefreshCw size={36} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>טוען נתוני אירוע לעדכון...</p>
      </div>
    );
  }

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
          <h1 className="form-title">עדכון אירוע #{id}</h1>
          <p className="form-subtitle">ערוך את פרטי האירוע ושמור את השינויים. (ניתן לעדכן גם אירועי עבר)</p>
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

          {/* Start Date & Time */}
          <div className="form-group">
            <label className="form-label" htmlFor="start_date_time">
              תאריך ושעת התחלת האירוע <span className="required">*</span>
            </label>
            <input
              type="datetime-local"
              id="start_date_time"
              name="start_date_time"
              value={formData.start_date_time}
              onChange={handleChange}
              className="form-control"
            />
            <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem' }}>
              * בעדכון אירוע מותר להזין גם תאריכי עבר.
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
              <Edit3 size={18} />
              <span>{isSubmitting ? 'מעדכן אירוע...' : 'שמירת עדכון'}</span>
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
