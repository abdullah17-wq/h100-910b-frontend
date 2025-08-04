import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as d3 from "d3";

// Import components
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import ChatBotPage from './components/ChatBotPage';
import NerdModePage from './components/NerdModePage';

// Import utilities
import { globalStyles } from './styles';

// Import API routing & run process
import { run_process } from './api/router';
import { PORTS } from './constants';

// Main App with Router
const App = () => {
  useEffect(() => {
    // This runs when component mounts
    run_process();
    
    const checkTunnel = async () => {
      try {
        const response = await fetch(`http://localhost:${PORTS["H100"]}/health`);
        const data = await response.json();
        console.log('Tunnel status:', data);
      } catch (error) {
        console.error('Tunnel check failed:', error);
      }
    };

    // Delay check to allow tunnel to establish
    const timer = setTimeout(checkTunnel, 2000);
    
    return () => {
      // Cleanup on unmount
      clearTimeout(timer);
    };
  }, []); // Empty dependency array = runs once on mount

  return (
    <>
      <style>{globalStyles}</style>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<ChatBotPage />} />
            <Route path="/nerd-mode" element={<NerdModePage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!); 
root.render(<App />);