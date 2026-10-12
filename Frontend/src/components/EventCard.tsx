import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EventItem } from '../types';
import { Calendar, MapPin, Users, Trash2, Edit3, Clock, AlertCircle } from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  onDelete: (id: number) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onDelete }) => {
  const navigate = useNavigate();

  const eventDate = new Date(event.start_date_time);
  const now = new Date();
  const isPast = eventDate.getTime() < now.getTime();

  // Calculate days remaining for upcoming events
  const diffTime = eventDate.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const formatHebrewDate = (date: Date) => {
    return date.toLocaleDateString('he-IL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDeleteClick = () => {
    if (window.confirm(`האם אתה בטוח שברצונך למחוק את האירוע: "${event.description}"?`)) {
      onDelete(event.id);
    }
  };

  return (
    <div className={`event-card ${isPast ? 'past' : 'upcoming'}`}>
      <div>
        {/* Header: Type and Status */}
        <div className="event-card-header">
          <span className="event-type-badge">
            {event.event_type_name || `סוג אירוע #${event.event_type_id}`}
          </span>
          <span className="event-status-badge">
            {isPast ? 'האירוע התקיים' : 'אירוע עתידי'}
          </span>
        </div>

        {/* Days remaining badge (for upcoming events only) */}
        {!isPast && (
          <div className="days-counter-badge">
            <Clock size={16} />
            <span>
              {daysRemaining === 0
                ? 'האירוע מתקיים היום!'
                : daysRemaining === 1
                ? 'נותר יום אחד בלבד!'
                : `נותרו עוד ${daysRemaining} ימים`}
            </span>
          </div>
        )}

        {isPast && (
          <div className="days-counter-badge" style={{ background: '#e2e8f0', color: '#475569', borderColor: '#cbd5e1' }}>
            <AlertCircle size={16} />
            <span>אירוע מן העבר</span>
          </div>
        )}

        {/* Description */}
        <h3 className="event-description">{event.description}</h3>

        {/* Details: Date, Address, Attendees */}
        <div className="event-meta">
          <div className="event-meta-item">
            <Calendar size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <span>{formatHebrewDate(eventDate)}</span>
          </div>

          <div className="event-meta-item">
            <MapPin size={18} style={{ color: '#ef4444', flexShrink: 0 }} />
            <span>{event.address}</span>
          </div>

          <div className="event-meta-item">
            <Users size={18} style={{ color: '#0ea5e9', flexShrink: 0 }} />
            <span>
              <strong>{event.confirmed_attendees}</strong> משתתפים אישרו הגעה
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Delete and Edit */}
      <div className="event-card-actions">
        <button
          type="button"
          onClick={() => navigate(`/events/edit/${event.id}`)}
          className="btn btn-outline btn-sm"
          title="עדכון אירוע"
        >
          <Edit3 size={15} />
          <span>עריכה</span>
        </button>

        <button
          type="button"
          onClick={handleDeleteClick}
          className="btn btn-danger btn-sm"
          title="מחיקת אירוע"
        >
          <Trash2 size={15} />
          <span>מחיקה</span>
        </button>
      </div>
    </div>
  );
};
