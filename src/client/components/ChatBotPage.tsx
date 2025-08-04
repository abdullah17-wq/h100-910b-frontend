// Updated ChatBotPage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { INITIAL_MESSAGES, PORTS } from '../constants';
import { commonStyles } from '../styles';

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch GPU metrics periodically
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(`http://localhost:${PORTS.H100}/api/gpu_metrics`);
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    const interval = setInterval(fetchMetrics, 5000);
    fetchMetrics(); // Initial fetch

    return () => clearInterval(interval);
  }, []);

  const addMessage = (text: string, type: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:${PORTS.H100}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: inputValue,
          max_tokens: 1024
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (reader) {
        let botMessage = '';
        const decoder = new TextDecoder();
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n\n').filter(line => line.trim());
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.replace('data: ', '');
              if (data === '[DONE]') {
                setIsLoading(false);
                return;
              }
              
              try {
                const parsed = JSON.parse(data);
                if (parsed.error) {
                  addMessage(`Error: ${parsed.error}`, 'bot');
                  setIsLoading(false);
                  return;
                }
                
                if (parsed.text) {
                  botMessage += parsed.text;
                  // Update the last message with new content
                  setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMsg = newMessages[newMessages.length - 1];
                    if (lastMsg.type === 'bot') {
                      lastMsg.text = botMessage;
                    } else {
                      newMessages.push({
                        id: Date.now().toString(),
                        text: botMessage,
                        type: 'bot',
                        timestamp: new Date()
                      });
                    }
                    return newMessages;
                  });
                }
              } catch (e) {
                console.error('Error parsing message:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      addMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMetrics = (metrics: any) => {
    if (!metrics) return null;
    
    return (
      <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '8px' }}>
            <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={commonStyles.container}>
      <div className="chatbot-layout" style={{ display: 'flex', gap: '20px', height: '80vh' }}>
        <div className="chat-container" style={{
          flex: 2,
          ...commonStyles.glassCard,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          <div className="chat-header" style={commonStyles.gradientHeader}>
            AI Chatbot Interface
          </div>
          <div className="chat-messages" style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            background: 'rgba(255, 255, 255, 0.8)',
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.type}`}
                style={{
                  marginBottom: '20px',
                  padding: '15px 20px',
                  borderRadius: '18px',
                  maxWidth: '80%',
                  animation: 'messageSlide 0.3s ease',
                  background: message.type === 'user' ? '#007AFF' : '#F0F0F0',
                  color: message.type === 'user' ? 'white' : '#333',
                  marginLeft: message.type === 'user' ? 'auto' : '0',
                  textAlign: message.type === 'user' ? 'right' : 'left',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {message.text}
                <div style={{
                  fontSize: '0.7rem',
                  opacity: 0.7,
                  marginTop: '5px',
                }}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot" style={{
                marginBottom: '20px',
                padding: '15px 20px',
                borderRadius: '18px',
                maxWidth: '80%',
                background: '#F0F0F0',
                color: '#333',
              }}>
                <div className="typing-indicator">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-container" style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderTop: '1px solid rgba(0,0,0,0.1)',
          }}>
            <textarea
              className="chat-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              rows={2}
              style={{
                width: '100%',
                padding: '15px 20px',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '25px',
                fontSize: '1rem',
                outline: 'none',
                resize: 'none',
                minHeight: '50px',
              }}
            />
          </div>
        </div>
        
        <div className="metrics-container" style={{
          flex: 1,
          ...commonStyles.glassCard,
          padding: '20px',
          overflowY: 'auto',
        }}>
          <div className="metrics-header" style={commonStyles.gradientHeader}>
            Computation Metrics
          </div>
          {metrics ? (
            <div style={{
              padding: '15px',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '12px',
              marginTop: '15px',
            }}>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>GPU Metrics</h3>
              {formatMetrics(metrics)}
            </div>
          ) : (
            <div style={{
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}>
              Loading metrics...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;