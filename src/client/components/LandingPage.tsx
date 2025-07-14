import React from 'react';
import { useNavigate } from 'react-router-dom';
import { commonStyles } from '../styles';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div style={commonStyles.container}>
      <div className="landing-content" style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1 
          className="landing-title"
          style={{
            fontSize: '4rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '20px',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          }}
        >
          GPU Testing Platform
        </h1>
        <p 
          className="landing-subtitle"
          style={{
            fontSize: '1.5rem',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '60px',
          }}
        >
          Compare and test different GPU machines with various LLM models
        </p>
        <div 
          className="landing-buttons"
          style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            className="landing-button"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '20px 40px',
              borderRadius: '20px',
              fontSize: '1.2rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: '200px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => handleNavigation('/chat')}
          >
            🤖 Start Chatbot
          </button>
          <button
            className="landing-button"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '20px 40px',
              borderRadius: '20px',
              fontSize: '1.2rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: '200px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => handleNavigation('/nerd-mode')}
          >
            ⚙️ Configure Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;