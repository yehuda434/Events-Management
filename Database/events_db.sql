-- ========================================================
-- Database Schema for Event Management System (PostgreSQL / Neon)
-- ========================================================

-- 1. Drop existing tables if they exist (clean slate)
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS event_types CASCADE;

-- 2. Create Event Types Table (טבלת סוגי אירועים)
CREATE TABLE event_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 3. Create Events Table (טבלת אירועים)
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_type_id INT NOT NULL,
    start_date_time TIMESTAMPTZ NOT NULL,
    description TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    confirmed_attendees INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_event_type FOREIGN KEY (event_type_id) 
        REFERENCES event_types(id) ON DELETE CASCADE,
    CONSTRAINT chk_attendees_range CHECK (confirmed_attendees >= 0 AND confirmed_attendees <= 1000)
);

-- 4. Create Index on Foreign Key for optimal query performance
CREATE INDEX idx_events_event_type_id ON events(event_type_id);

-- ========================================================
-- Seed Initial Sample Data (נתונים ראשוניים לבדיקה)
-- ========================================================

-- Insert Event Types
INSERT INTO event_types (name) VALUES
    ('חתונה'),
    ('כנס'),
    ('מסיבה'),
    ('ערב חברה'),
    ('יום הולדת');

-- Insert Sample Events (Both past and upcoming events for validation)
INSERT INTO events (event_type_id, start_date_time, description, address, confirmed_attendees) VALUES
    -- Upcoming events (אירועים עתידיים - יקבלו רקע ירוק)
    (1, NOW() + INTERVAL '14 days', 'חתונת השנה של דני ומיכל', 'אולמי גני כנען, נס ציונה', 350),
    (2, NOW() + INTERVAL '30 days', 'כנס שנתי למפתחי Full Stack ו-AI', 'מרכז הירידים, אקספו תל אביב', 500),
    (3, NOW() + INTERVAL '5 days', 'מסיבת פורים מטורפת לחברי הקהילה', 'מועדון הבלוק, דרך שלמה 157, תל אביב', 180),
    (4, NOW() + INTERVAL '45 days', 'ערב גיבוש שנתי לצוות הפיתוח', 'מלון דן, קיסריה', 85),
    
    -- Past events (אירועים שהתקיימו בעבר - יקבלו רקע אפור)
    (2, NOW() - INTERVAL '60 days', 'האקתון פיתוח מערכות ענן', 'הבורסה לניירות ערך, אחוזת בית 2, תל אביב', 120),
    (3, NOW() - INTERVAL '15 days', 'מסיבת יום הולדת 30 לעידן', 'פאב המנזר, אלנבי 60, תל אביב', 45);
