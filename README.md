# מערכת לניהול אירועים (Event Management System)
**מטלת Full Stack (ג'ון ברייס)**  
טכנולוגיות: **React | Node.js (TypeScript) | Express | Neon (PostgreSQL)**

---

## 📁 מבנה הפרויקט

```text
events-system/
├── Database/
│   └── events_db.sql               # סקריפט יצירת הטבלאות ונתוני Seed
├── Backend/
│   ├── src/
│   │   ├── config/                 # קונפיגורציית משתני סביבה
│   │   ├── controllers/            # בקרי ה-REST API
│   │   ├── db/                     # חיבור ל-Neon PostgreSQL (pg pool)
│   │   ├── middlewares/            # וולידציות וטיפול שגיאות מרכזי
│   │   ├── routes/                 # ניתוב הבקשות (Routes)
│   │   ├── services/               # שכבת שאילתות מסד הנתונים (DAL)
│   │   ├── types/                  # טיפוסי TypeScript
│   │   ├── app.ts                  # אפליקציית Express
│   │   └── server.ts               # נקודת כניסה והרצת השרת
│   ├── .env.example                # דוגמה למשתני סביבה
│   ├── Postman_Collection.json     # קובץ Export של פוסטמן לבדיקות
│   ├── package.json
│   └── tsconfig.json
├── Frontend/
│   ├── src/
│   │   ├── components/             # Navbar, Footer, EventCard
│   │   ├── pages/                  # HomePage, AboutPage, EventsListPage, AddEventPage, UpdateEventPage
│   │   ├── services/               # שירות API מול השרת (Axios)
│   │   ├── styles/                 # עיצוב מודרני ב-CSS
│   │   ├── types/                  # טיפוסי TypeScript
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
└── .gitignore
```

---

## 🚀 הוראות הרצה

### 1. מסד נתונים (Neon)
1. פתח את לוח הבקרה של Neon ב-SQL Editor.
2. הרץ את הקובץ `Database/events_db.sql`.

### 2. צד שרת (Backend)
1. פתח טרמינל ועבור לתיקיית `Backend`:
   ```bash
   cd Backend
   ```
2. הגדר בקובץ `.env` את ה-`DATABASE_URL` שלך מ-Neon:
   ```env
   PORT=4000
   DATABASE_URL=postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require
   ```
3. הרץ את השרת במצב פיתוח:
   ```bash
   npm run dev
   ```
   השרת ירוץ בכתובת: `http://localhost:4000/api`

### 3. בדיקות צד השרת (Postman)
1. ייבא ל-Postman את הקובץ: `Backend/Postman_Collection.json`.
2. הרץ את הבקשות לווידוא תקינות כל ה-Routes והוולידציות.

### 4. צד לקוח (Frontend)
1. פתח חלון טרמינל חדש ועבור לתיקיית `Frontend`:
   ```bash
   cd Frontend
   ```
2. הרץ את אפליקציית ה-React:
   ```bash
   npm run dev
   ```
3. פתח את הדפדפן בכתובת: `http://localhost:3000`

### 5. הרצה באמצעות Docker (Docker & Docker Compose)
הפרויקט נבנה וארוז כ-Docker Images הזמינים ב-Docker Hub:
* **Backend Image:** `yehuda434/events-backend:latest`
* **Frontend Image:** `yehuda434/events-frontend:latest`

#### הרצה מהירה באמצעות Docker Compose:
```bash
# הרצת שרתי ה-Backend וה-Frontend יחד:
docker compose up -d
```
האפליקציה תהיה זמינה ב:
* **Frontend:** `http://localhost:3000`
* **Backend:** `http://localhost:4000/api`

---

## 📦 הוראות הגשה (יצירת קובץ ZIP)
לפי הנחיות המטלה:
1. ודא כי תיקיות `node_modules` מחוקות מ-`Backend` ומ-`Frontend`.
2. צור קובץ ZIP יחיד בשם התלמיד המכיל את שלוש התיקיות:
   - `Database`
   - `Backend`
   - `Frontend`
