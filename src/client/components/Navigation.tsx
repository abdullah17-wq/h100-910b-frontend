import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { commonStyles } from '../styles';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/chat', label: 'Chatbot' },
    { path: '/nerd-mode', label: 'Configuration' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className="nav-bar"
      style={commonStyles.navBar}
    >
      <h1 style={commonStyles.navTitle}>GPU Testing Platform</h1>
      <div className="nav-links" style={commonStyles.navLinks}>
        {navItems.map((item) => (
          <a
            key={item.path}
            href="#"
            className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            style={{
              ...commonStyles.navLink,
              ...(isActive(item.path) && commonStyles.navLinkHover),
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate(item.path);
            }}
            onMouseEnter={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 