import React from 'react';
import studentPhoto from '../assets/student_yehuda.JPG';
import { 
  Database, 
  Server, 
  Layout, 
  GraduationCap, 
  Building, 
  Mail, 
  User, 
  Award, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Briefcase
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container">
      {/* Title */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
          אודות המערכת והמפתח
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          פרויקט גמר ומטלת Full Stack (משימה 3) – מכללת ג'ון ברייס (John Bryce)
        </p>
      </div>

      <div className="about-grid">
        {/* Left Column: System Details & Architecture */}
        <div className="about-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ 
              width: '42px', 
              height: '42px', 
              borderRadius: 'var(--radius-md)', 
              background: 'var(--primary-light)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'var(--primary)' 
            }}>
              <Layers size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 700 }}>על מערכת ניהול האירועים (EventMaster)</h2>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>ארכיטקטורת Full Stack מודרנית מבוססת ענן</span>
            </div>
          </div>

          <p style={{ lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            מערכת <strong>EventMaster</strong> פותחה במטרה להעניק פתרון שלם ומקצועי לניהול, תזמון ובקרת אירועים וכנסים.
            המערכת מאפשרת מעקב מדויק אחר מועדי האירועים, חישוב ימים לאחור לאירועים עתידיים, סינון לפי סוג אירוע ב-Select, 
            ובקרת כמות המוזמנים ומאשרי ההגעה בזמן אמת.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '1.5rem 0 1rem', color: '#0f172a' }}>
            🚀 מרכיבי הארכיטקטורה הטכנולוגית:
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Database */}
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <Database size={22} color="#0ea5e9" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem', color: '#0f172a' }}>
                  מסד נתונים – Neon Cloud (PostgreSQL):
                </strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  שמירת סוגי האירועים וטבלת האירועים המקושרת באמצעות Foreign Key ומחיקה שרשרתית (Cascade). 
                  כולל אילוצי Check Constraint להגבלת 0 עד 1000 מוזמנים ואינדקסים ביצועיים.
                </span>
              </div>
            </div>

            {/* Backend */}
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <Server size={22} color="#4f46e5" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem', color: '#0f172a' }}>
                  צד שרת – Node.js, Express & TypeScript:
                </strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  ארכיטקטורת שכבות נקייה (Routes, Controllers, Services/DAL, Middlewares). 
                  ממשק RESTful מלא, וולידציה קפדנית לחסימת תאריכי עבר ביצירת אירוע חדש, טיפול שגיאות גלובלי וקובץ Postman Collection מוכן.
                </span>
              </div>
            </div>

            {/* Frontend */}
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <Layout size={22} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem', color: '#0f172a' }}>
                  צד לקוח – React 18, TypeScript & Vite:
                </strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  ממשק משתמש רספונסיבי בעברית (RTL). הבחנה ויזואלית מלאה: רקע ירוק וספירת ימים לאירועים עתידיים, 
                  רקע אפור לאירועי עבר, סינון ב-Select, ומצבי תצוגה של כרטיסיות וטבלה.
                </span>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '1.75rem 0 1rem', color: '#0f172a' }}>
            ✨ דגשים עיקריים שמומשו במערכת:
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#10b981" /> שדה יחיד ומאוחד עבור תאריך ושעת התחלת האירוע (TIMESTAMPTZ).
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="#10b981" /> חישוב אוטומטי של מספר הימים שנותרו עד למועד האירוע בזמן אמת.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} color="#10b981" /> חסימת תאריכי עבר בהוספת אירוע, ואפשרות עדכון אירועים שהיו בעבר.
            </li>
          </ul>
        </div>

        {/* Right Column: Developer Profile (Yehuda Hachamov) */}
        <div className="about-card developer-profile-card">
          <div>
            {/* Developer Avatar */}
            <div className="avatar-wrapper">
              <img
                src={studentPhoto}
                alt="יהודה חכמוב - תמונת מתכנת ומנהל מוצר"
                className="developer-avatar"
              />
            </div>

            <h2 className="developer-name">יהודה חכמוב</h2>
            <p className="developer-role" style={{ fontSize: '0.85rem', lineHeight: 1.4, padding: '0.35rem 0.75rem' }}>
              Product Manager | Data Analytics & Intelligence | Full-Stack & Gen-AI
            </p>

            {/* Developer Details List */}
            <ul className="dev-details-list">
              <li className="dev-detail-row">
                <span className="dev-detail-label">
                  <GraduationCap size={16} color="var(--primary)" />
                  <span>קורס:</span>
                </span>
                <span className="dev-detail-val">פיתוח אפליקציות Web ו-Mobile</span>
              </li>

              <li className="dev-detail-row">
                <span className="dev-detail-label">
                  <Building size={16} color="var(--primary)" />
                  <span>מוסד לימודים:</span>
                </span>
                <span className="dev-detail-val">ג'ון ברייס (John Bryce)</span>
              </li>

              <li className="dev-detail-row">
                <span className="dev-detail-label">
                  <Briefcase size={16} color="var(--primary)" />
                  <span>פרויקט:</span>
                </span>
                <span className="dev-detail-val">משימה שלישית (ניהול אירועים)</span>
              </li>

              <li className="dev-detail-row">
                <span className="dev-detail-label">
                  <Mail size={16} color="var(--primary)" />
                  <span>דוא"ל ליצירת קשר:</span>
                </span>
                <span className="dev-detail-val">
                  <a href="mailto:yehuda434@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                    yehuda434@gmail.com
                  </a>
                </span>
              </li>
            </ul>

            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'right', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={16} color="var(--primary)" />
              <span>תיאור מקצועי:</span>
            </h4>
            <p style={{ textAlign: 'right', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              מנהל מוצר (Product Manager) בעל רקע שירות משמעותי בחיל האוויר הישראלי, המתמחה בהוצאה לפועל של מוצרי תוכנה קריטיים במערכות מורכבות.
              משלב ראייה תפעולית עם יכולת טכנולוגית גבוהה ב-Data Analytics, React, TypeScript, Node.js ו-Gen-AI.
            </p>

            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'right', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award size={16} color="var(--primary)" />
              <span>תחומי ליבה והתמחות:</span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.86rem', color: 'var(--text-muted)', textAlign: 'right', marginBottom: '1.25rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>אסטרטגיה וניהול מוצר:</strong> ניהול Lifecycle מלא מחיפוש הצרכים ועד הפריצה לשוק.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>תקשורת בין-צוותית:</strong> גישור מוצלח בין דרישות מורכבות בשטח לבין מפרטים טכניים לצוותי R&D.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>ניהול לפי מתודולוגיית Agile:</strong> הובלת צוותים מולטי-דיסציפלינריים בסביבה מהירה ודינמית.</span>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
