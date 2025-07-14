// Common styles for the GPU Testing Platform
export const commonStyles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    page: {
      display: 'none',
      animation: 'fadeIn 0.5s ease-in',
    },
    pageActive: {
      display: 'block',
    },
    navBar: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '15px 30px',
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      margin: '5px 5px',
    },
    navTitle: {
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: '600',
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      padding: '8px 16px',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    navLinkHover: {
      background: 'rgba(255, 255, 255, 0.2)',
    },
    glassCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(10px)',
    },
    gradientHeader: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      padding: '15px 20px',
      borderRadius: '15px',
      textAlign: 'center' as const,
      fontWeight: '600',
    },
  };
  
  export const globalStyles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      color: #333;
    }
  
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  
    @keyframes messageSlide {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
  
    @media (max-width: 768px) {
      .landing-title {
        font-size: 2.5rem;
      }
      
      .chatbot-layout {
        flex-direction: column;
        height: auto;
      }
      
      .config-grid {
        grid-template-columns: 1fr;
        height: auto;
      }
      
      .landing-buttons {
        flex-direction: column;
        align-items: center;
      }
    }
  `;