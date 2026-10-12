import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { EventItem, EventType } from '../types';
import { EventCard } from '../components/EventCard';
import { Filter, PlusCircle, LayoutGrid, Table, RefreshCw, Trash2, Edit3 } from 'lucide-react';

export const EventsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Load event types once
  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const types = await api.getEventTypes();
        setEventTypes(types);
      } catch (err: any) {
        console.error('Error fetching event types:', err);
      }
    };
    fetchEventTypes();
  }, []);

  // Fetch events whenever selectedTypeId changes
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!selectedTypeId) {
          const data = await api.getAllEvents();
          setEvents(data);
        } else {
          const data = await api.getEventsByType(Number(selectedTypeId));
          setEvents(data);
        }
      } catch (err: any) {
        console.error('Error fetching events:', err);
        setError('אירעה שגיאה בטעינת האירועים. אנא ודא שהשרת פעיל.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedTypeId]);

  // Handle event deletion
  const handleDeleteEvent = async (id: number) => {
    try {
      await api.deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      console.error('Error deleting event:', err);
      alert('אירעה שגיאה במחיקת האירוע. נסה שוב.');
    }
  };

  const now = new Date();
  const upcomingCount = events.filter((e) => new Date(e.start_date_time) >= now).length;
  const pastCount = events.filter((e) => new Date(e.start_date_time) < now).length;

  return (
    <div className="container">
      {/* Page Title & Add Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>לוח אירועים</h1>
          <p style={{ color: 'var(--text-muted)' }}>צפייה, סינון וניהול כלל האירועים והכנסים במערכת</p>
        </div>

        <Link to="/events/add" className="btn btn-primary">
          <PlusCircle size={18} />
          <span>הוספת אירוע חדש</span>
        </Link>
      </div>

      {/* Filter Bar with Select */}
      <div className="filter-bar">
        <div className="filter-group">
          <Filter size={20} color="var(--primary)" />
          <label htmlFor="eventTypeSelect" style={{ fontWeight: 600, fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
            סינון לפי סוג אירוע:
          </label>
          <select
            id="eventTypeSelect"
            value={selectedTypeId}
            onChange={(e) => setSelectedTypeId(e.target.value)}
            className="select-input"
          >
            <option value="">-- כל סוגי האירועים --</option>
            {eventTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stats Summary Pills */}
        <div className="stats-summary">
          <span className="stat-pill all">
            סה"כ: <strong>{events.length}</strong>
          </span>
          <span className="stat-pill upcoming">
            עתידיים: <strong>{upcomingCount}</strong>
          </span>
          <span className="stat-pill past">
            התקיימו: <strong>{pastCount}</strong>
          </span>
        </div>

        {/* View Mode Toggle: Cards vs Table */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`btn btn-sm ${viewMode === 'cards' ? 'btn-primary' : 'btn-outline'}`}
            title="תצוגת כרטיסיות"
          >
            <LayoutGrid size={16} />
            <span>כרטיסיות</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-outline'}`}
            title="תצוגת טבלה"
          >
            <Table size={16} />
            <span>טבלה</span>
          </button>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
          <RefreshCw size={32} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '0.75rem', fontSize: '1.1rem' }}>טוען אירועים...</p>
        </div>
      )}

      {error && !loading && (
        <div className="alert alert-danger">
          <span>{error}</span>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && events.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            לא נמצאו אירועים בקטגוריה זו
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            טרם הוזנו אירועים עבור סוג האירוע שנבחר, או שמסד הנתונים ריק.
          </p>
          <Link to="/events/add" className="btn btn-primary">
            <PlusCircle size={18} />
            <span>הוסף את האירוע הראשון עכשיו</span>
          </Link>
        </div>
      )}

      {/* Cards View */}
      {!loading && !error && events.length > 0 && viewMode === 'cards' && (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onDelete={handleDeleteEvent} />
          ))}
        </div>
      )}

      {/* Table View */}
      {!loading && !error && events.length > 0 && viewMode === 'table' && (
        <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', overflowX: 'auto', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid var(--border-color)', color: '#475569' }}>
                <th style={{ padding: '1rem' }}>קוד</th>
                <th style={{ padding: '1rem' }}>סוג אירוע</th>
                <th style={{ padding: '1rem' }}>תיאור</th>
                <th style={{ padding: '1rem' }}>תאריך ושעה</th>
                <th style={{ padding: '1rem' }}>סטטוס / ימים שנותרו</th>
                <th style={{ padding: '1rem' }}>כתובת</th>
                <th style={{ padding: '1rem' }}>מאשרי הגעה</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => {
                const eventDate = new Date(event.start_date_time);
                const isPast = eventDate.getTime() < now.getTime();
                const diffTime = eventDate.getTime() - now.getTime();
                const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return (
                  <tr
                    key={event.id}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      backgroundColor: isPast ? 'var(--past-bg)' : 'var(--upcoming-bg)',
                    }}
                  >
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{event.id}</td>
                    <td style={{ padding: '1rem' }}>{event.event_type_name || event.event_type_id}</td>
                    <td style={{ padding: '1rem', fontWeight: 600, color: '#0f172a' }}>{event.description}</td>
                    <td style={{ padding: '1rem' }}>
                      {eventDate.toLocaleString('he-IL', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {isPast ? (
                        <span style={{ background: 'var(--past-badge-bg)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.8rem' }}>
                          התקיים
                        </span>
                      ) : (
                        <span style={{ background: 'var(--upcoming-badge-bg)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.8rem' }}>
                          עתידי (נותרו {daysRemaining} ימים)
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>{event.address}</td>
                    <td style={{ padding: '1rem' }}>{event.confirmed_attendees}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => navigate(`/events/edit/${event.id}`)}
                          className="btn btn-outline btn-sm"
                          title="עריכה"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`האם אתה בטוח שברצונך למחוק את האירוע: "${event.description}"?`)) {
                              handleDeleteEvent(event.id);
                            }
                          }}
                          className="btn btn-danger btn-sm"
                          title="מחיקה"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
