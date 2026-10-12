import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} מערכת ניהול אירועים | פותח במסגרת מטלת Full Stack (React, Node.js, TypeScript, PostgreSQL)</p>
      </div>
    </footer>
  );
};
