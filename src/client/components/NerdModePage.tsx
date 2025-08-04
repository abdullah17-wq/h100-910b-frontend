import React, { useState, useEffect, useRef } from 'react';
import { PORTS } from '../constants';
import { commonStyles } from '../styles';
import * as d3 from 'd3';

// LiveGraph Component to render the live GPU metrics
const LiveGraph = ({ metricsHistory, currentMetrics }: { metricsHistory: any[], currentMetrics: any }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!metricsHistory.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const containerWidth = svg.node()!.getBoundingClientRect().width;
    const containerHeight = svg.node()!.getBoundingClientRect().height;
    
    // Set up margins
    const margin = { top: 20, right: 120, bottom: 40, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    // Clear previous elements
    svg.selectAll('*').remove();

    // Create main group with margins
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xScale = d3.scaleLinear()
      .domain([0, metricsHistory.length - 1])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // Create grid lines
    const xAxisGrid = d3.axisBottom(xScale)
      .ticks(6)
      .tickSize(-height)
      .tickFormat(() => '');

    const yAxisGrid = d3.axisLeft(yScale)
      .ticks(5)
      .tickSize(-width)
      .tickFormat(() => '');

    // Add grid
    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(xAxisGrid as any)
      .style('stroke-dasharray', '2,2')
      .style('opacity', 0.3);

    g.append('g')
      .attr('class', 'grid')
      .call(yAxisGrid as any)
      .style('stroke-dasharray', '2,2')
      .style('opacity', 0.3);

    // Add axes
    const xAxisMain = d3.axisBottom(xScale)
      .ticks(6)
      .tickFormat((d: d3.NumberValue) => {
        const secondsAgo = (metricsHistory.length - 1 - Number(d)) * 0.3;
        return secondsAgo === 0 ? '0' : `-${Math.round(secondsAgo)}s`;
      });

    const yAxisMain = d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat((d: d3.NumberValue) => `${d}%`);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxisMain as any)
      .style('color', '#666')
      .style('font-size', '11px');

    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxisMain as any)
      .style('color', '#666')
      .style('font-size', '11px');

    // Create line generators
    const tempLine = d3.line<any>()
      .x((d, i) => xScale(i))
      .y(d => yScale(d.temperature))
      .curve(d3.curveMonotoneX);

    const memLine = d3.line<any>()
      .x((d, i) => xScale(i))
      .y(d => yScale(d.memory_util))
      .curve(d3.curveMonotoneX);

    // Draw temperature line
    g.append('path')
      .datum(metricsHistory)
      .attr('class', 'temp-line')
      .attr('d', tempLine)
      .style('stroke', '#e74c3c')
      .style('stroke-width', 2)
      .style('fill', 'none');

    // Draw memory line
    g.append('path')
      .datum(metricsHistory)
      .attr('class', 'mem-line')
      .attr('d', memLine)
      .style('stroke', '#3498db')
      .style('stroke-width', 2)
      .style('fill', 'none');

    // Add current value labels
    const tempValue = currentMetrics?.temperature || 0;
    const memValue = currentMetrics?.memory_util || 0;

    g.append('text')
      .attr('x', width + 10)
      .attr('y', 20)
      .style('fill', '#e74c3c')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text('Temperature');

    g.append('text')
      .attr('x', width + 10)
      .attr('y', 35)
      .style('fill', '#e74c3c')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text(`${tempValue.toFixed(1)}°C`);

    g.append('text')
      .attr('x', width + 10)
      .attr('y', 60)
      .style('fill', '#3498db')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text('Memory Usage');

    g.append('text')
      .attr('x', width + 10)
      .attr('y', 75)
      .style('fill', '#3498db')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text(`${memValue.toFixed(1)}%`);

    // Add axis labels
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#666')
      .text('Usage (%)');

    g.append('text')
      .attr('transform', `translate(${width / 2}, ${height + margin.bottom - 5})`)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#666')
      .text('Time');

  }, [metricsHistory, currentMetrics]);

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <svg 
        ref={svgRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          background: '#f8f9fa',
          border: '1px solid #e1e5e9',
          borderRadius: '4px'
        }}
      />
    </div>
  );
};

const NerdModePage: React.FC = () => {
  const [metricsHistory, setMetricsHistory] = useState<any[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const maxDataPoints = 60;

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(`http://localhost:${PORTS.H100}/api/gpu_metrics`);
        const data = await response.json();
        
        const timestampedData = {
          ...data,
          timestamp: Date.now()
        };
        
        setCurrentMetrics(timestampedData);
        setMetricsHistory(prev => {
          const newHistory = [...prev, timestampedData];
          return newHistory.slice(-maxDataPoints);
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    const interval = setInterval(fetchMetrics, 300);
    fetchMetrics();

    return () => clearInterval(interval);
  }, []);

  const runPromptTest = async (count: number) => {
    if (testRunning) return;
    
    setTestRunning(true);
    try {
      // Clear previous metrics to start fresh
      setMetricsHistory([]);
      
      // Send the test prompts
      for (let i = 0; i < count; i++) {
        const response = await fetch(`http://localhost:${PORTS.H100}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: `Test prompt ${i + 1} - Analyze the GPU performance impact`,
            max_tokens: 500
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to send prompt ${i + 1}`);
        }
        
        // Read the stream to completion
        const reader = response.body?.getReader();
        if (reader) {
          const decoder = new TextDecoder();
          while (true) {
            const { done } = await reader.read();
            if (done) break;
          }
        }
        
        // Small delay between prompts
        if (i < count - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    } catch (error) {
      console.error('Error running prompt test:', error);
    } finally {
      setTestRunning(false);
    }
  };

  return (
    <div style={commonStyles.container}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        height: '80vh',
      }}>
        {/* Test Controls */}
        <div style={{ 
          ...commonStyles.glassCard, 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          <h2 style={commonStyles.gradientHeader}>GPU Stress Test</h2>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={() => runPromptTest(1)}
              disabled={testRunning}
              style={{
                padding: '12px 24px',
                background: testRunning ? '#ccc' : '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                ...(testRunning ? {} : { ':hover': { background: '#2980b9' } })
              }}
            >
              {testRunning ? 'Testing...' : 'Run 1 Prompt'}
            </button>
            <button
              onClick={() => runPromptTest(3)}
              disabled={testRunning}
              style={{
                padding: '12px 24px',
                background: testRunning ? '#ccc' : '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                ...(testRunning ? {} : { ':hover': { background: '#2980b9' } })
              }}
            >
              {testRunning ? 'Testing...' : 'Run 3 Prompts'}
            </button>
            <button
              onClick={() => runPromptTest(10)}
              disabled={testRunning}
              style={{
                padding: '12px 24px',
                background: testRunning ? '#ccc' : '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                ...(testRunning ? {} : { ':hover': { background: '#2980b9' } })
              }}
            >
              {testRunning ? 'Testing...' : 'Run 10 Prompts'}
            </button>
          </div>
          <div style={{ marginTop: '10px', color: '#666', fontSize: '0.9rem' }}>
            {testRunning ? 'Test in progress...' : 'Click to test GPU performance with different prompt loads'}
          </div>
        </div>

        {/* GPU Metrics */}
        <div style={{ 
          ...commonStyles.glassCard, 
          padding: '20px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={commonStyles.gradientHeader}>GPU Performance Metrics</h2>
          <LiveGraph metricsHistory={metricsHistory} currentMetrics={currentMetrics} />
          
          {/* Current Metrics Display */}
          {currentMetrics && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '15px',
              marginTop: '20px'
            }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '15px', borderRadius: '8px' }}>
                <div style={{ color: '#e74c3c', fontWeight: 'bold' }}>Temperature</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {currentMetrics.temperature?.toFixed(1) || 'N/A'}°C
                </div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '15px', borderRadius: '8px' }}>
                <div style={{ color: '#3498db', fontWeight: 'bold' }}>Memory Usage</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {currentMetrics.memory_util?.toFixed(1) || 'N/A'}%
                </div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '15px', borderRadius: '8px' }}>
                <div style={{ fontWeight: 'bold' }}>Memory Used</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {currentMetrics.memory_used ? (currentMetrics.memory_used / 1024).toFixed(1) : 'N/A'} GB
                </div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '15px', borderRadius: '8px' }}>
                <div style={{ fontWeight: 'bold' }}>Total Memory</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {currentMetrics.memory_total ? (currentMetrics.memory_total / 1024).toFixed(1) : 'N/A'} GB
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NerdModePage;