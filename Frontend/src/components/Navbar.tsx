import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, PlusCircle, Info, Home } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="nav-brand">
          <div className="nav-brand-icon">
            <Calendar size={22} />
          </div>
          <span>EventMaster</span>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Home size={18} />
              <span>בית</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Calendar size={18} />
              <span>כל האירועים</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/events/add" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <PlusCircle size={18} />
              <span>הוספת אירוע</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Info size={18} />
              <span>אודות</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
