import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { INITIAL_MESSAGES } from '../constants';
import { commonStyles } from '../styles';

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, type: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      addMessage('Thanks for your message! This is a demo response.', 'bot');
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={commonStyles.container}>
      <div 
        className="chatbot-layout"
        style={{
          display: 'flex',
          gap: '20px',
          height: '80vh',
        }}
      >
        <div 
          className="chat-container"
          style={{
            flex: 2,
            ...commonStyles.glassCard,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div className="chat-header" style={commonStyles.gradientHeader}>
            AI Chatbot Interface
          </div>
          <div 
            className="chat-messages"
            style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              background: 'rgba(255, 255, 255, 0.8)',
            }}
          >
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
                }}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div
                className="message bot"
                style={{
                  marginBottom: '20px',
                  padding: '15px 20px',
                  borderRadius: '18px',
                  maxWidth: '80%',
                  background: '#F0F0F0',
                  color: '#333',
                }}
              >
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div 
            className="chat-input-container"
            style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.9)',
              borderTop: '1px solid rgba(0,0,0,0.1)',
            }}
          >
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
        
        <div 
          className="metrics-container"
          style={{
            flex: 1,
            ...commonStyles.glassCard,
            padding: '20px',
          }}
        >
          <div className="metrics-header" style={commonStyles.gradientHeader}>
            Computation Metrics
          </div>
          <div 
            className="metrics-placeholder"
            style={{
              height: '200px',
              background: 'rgba(0,0,0,0.05)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              fontStyle: 'italic',
            }}
          >
            Metrics will be displayed here
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;