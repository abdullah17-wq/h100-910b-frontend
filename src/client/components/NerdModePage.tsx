import React, { useState } from 'react';
import { GPU_MACHINES, LLM_MODELS, PRECISION_MODES } from '../constants';
import { commonStyles } from '../styles';

const NerdModePage: React.FC = () => {
  const [selectedGPU, setSelectedGPU] = useState(GPU_MACHINES[0].id);
  const [selectedModel, setSelectedModel] = useState(LLM_MODELS[0].id);
  const [selectedPrecision, setSelectedPrecision] = useState(PRECISION_MODES[0].id);

  return (
    <div style={commonStyles.container}>
      <div 
        className="config-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          height: '80vh',
        }}
      >
        <div 
          className="config-section"
          style={{
            ...commonStyles.glassCard,
            padding: '30px',
          }}
        >
          <div className="config-header" style={commonStyles.gradientHeader}>
            System Configuration
          </div>
          <div 
            className="dropdown-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div 
              className="dropdown-group"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                margin: '5px 0px',
              }}
            >
              <label 
                className="dropdown-label"
                style={{
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '1rem',
                }}
              >
                GPU Machine
              </label>
              <select
                className="dropdown"
                value={selectedGPU}
                onChange={(e) => setSelectedGPU(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '2px solid rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  background: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0,0,0,0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {GPU_MACHINES.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.name} ({machine.gpu})
                  </option>
                ))}
              </select>
            </div>

            <div 
              className="dropdown-group"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <label 
                className="dropdown-label"
                style={{
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '1rem',
                }}
              >
                LLM Model
              </label>
              <select
                className="dropdown"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '2px solid rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  background: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0,0,0,0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {LLM_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            <div 
              className="dropdown-group"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <label 
                className="dropdown-label"
                style={{
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '1rem',
                }}
              >
                Precision Mode
              </label>
              <select
                className="dropdown"
                value={selectedPrecision}
                onChange={(e) => setSelectedPrecision(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '2px solid rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  background: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0,0,0,0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {PRECISION_MODES.map((mode) => (
                  <option key={mode.id} value={mode.id}>
                    {mode.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div 
          className="config-section"
          style={{
            ...commonStyles.glassCard,
            padding: '30px',
          }}
        >
          <div className="config-header" style={commonStyles.gradientHeader}>
            Performance Settings
          </div>
          <div 
            className="config-placeholder"
            style={{
              background: 'rgba(0,0,0,0.05)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              fontStyle: 'italic',
              minHeight: '200px',
              margin: '5px 0px',
            }}
          >
            Additional configuration options will appear here
          </div>
        </div>

        <div 
          className="config-section"
          style={{
            ...commonStyles.glassCard,
            padding: '30px',
          }}
        >
          <div className="config-header" style={commonStyles.gradientHeader}>
            Model Parameters
          </div>
          <div 
            className="config-placeholder"
            style={{
              background: 'rgba(0,0,0,0.05)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              fontStyle: 'italic',
              minHeight: '200px',
            }}
          >
            Model-specific parameters and settings
          </div>
        </div>

        <div 
          className="config-section"
          style={{
            ...commonStyles.glassCard,
            padding: '30px',
          }}
        >
          <div className="config-header" style={commonStyles.gradientHeader}>
            Testing Options
          </div>
          <div 
            className="config-placeholder"
            style={{
              background: 'rgba(0,0,0,0.05)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              fontStyle: 'italic',
              minHeight: '200px',
            }}
          >
            Testing and benchmarking configuration
          </div>
        </div>
      </div>
    </div>
  );
};

export default NerdModePage;