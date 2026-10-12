import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, PlusCircle, CheckCircle, Clock, Users, ArrowLeft } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            ברוכים הבאים ל-<span>EventMaster</span>, המערכת המובילה לניהול אירועים וכנסים
          </h1>
          <p className="hero-description">
            מערכת EventMaster מעניקה לכם שליטה מלאה על כלל האירועים שלכם – מחתונות יוקרתיות ומסיבות תוססות, 
            ועד כנסים מקצועיים וערבי גיבוש לחברות. באמצעות המערכת תוכלו לסנן אירועים לפי קטגוריות, לעקוב אחר מועדי האירועים, 
            לצפות בספירה לאחור של הימים שנותרו עד לאירוע, לנהל את כמות מאשרי ההגעה ולעדכן פרטים בזמן אמת בצורה פשוטה, 
            חכמה ואינטואיטיבית.
          </p>

          <div className="hero-actions">
            <Link to="/events" className="btn btn-primary">
              <Calendar size={18} />
              <span>צפייה בכל האירועים</span>
              <ArrowLeft size={16} />
            </Link>

            <Link to="/events/add" className="btn btn-outline">
              <PlusCircle size={18} />
              <span>הוספת אירוע חדש</span>
            </Link>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
            alt="אירוע חגיגי וכנס מרשים"
            className="hero-image"
          />
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
          היתרונות המרכזיים של המערכת
        </h2>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Clock size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>מעקב זמנים חכם</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              הבחנה ויזואלית חדה בין אירועים עתידיים (בצבע ירוק עם ספירת ימים מדויקת) לבין אירועים שהתקיימו (בצבע אפור).
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Users size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>אישורי הגעה מבוקרים</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              בקרת כמות מוזמנים ומאשרי הגעה מוגבלת בדיוק עד 1000 משתתפים, עם מנגנון מניעת שגיאות מובנה.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <CheckCircle size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>סינון מהיר לפי סוג</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              שליפה מותאמת אישית של כל סוג אירוע בנפרד (חתונות, כנסים, מסיבות וערבי חברה) ישירות מתוך מסד הנתונים.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
