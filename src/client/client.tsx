import React from 'react';
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

// Main App with Router
const App = () => {
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
