import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const PersonalAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your personal store assistant. I can help you with product questions, order status, and provide insights about your business. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('order') || input.includes('status')) {
      return 'I can help you check order status! Please provide the order ID and I\'ll look it up for you.';
    }
    if (input.includes('product') || input.includes('inventory')) {
      return 'For product information, I can show you current stock levels, sales data, and product performance. What specific product would you like to know about?';
    }
    if (input.includes('sales') || input.includes('revenue')) {
      return 'Your current sales metrics: Today: $3,245 | This Week: $18,567 | This Month: $78,234. Would you like more detailed analytics?';
    }
    if (input.includes('help')) {
      return 'I can assist with: Order status checks, Product inventory, Sales insights, Customer support tickets, and general business analytics. What would you like to explore?';
    }
    
    return 'I understand you\'re asking about: "' + userInput + '". Could you be more specific? I can help with orders, inventory, sales data, or customer support.';
  };

  return (
    <div className="p-6 h-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-200 hover:shadow-md">
        <div className="bg-white border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Bot className="text-blue-600" size={24} />
            Personal Assistant
          </h2>
          <p className="text-sm text-gray-600">Your AI-powered business helper</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                  message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                }`}>
                  {message.sender === 'user' ? (
                    <User size={16} className="text-white" />
                  ) : (
                    <Bot size={16} className="text-gray-600" />
                  )}
                </div>
                <div className={`rounded-lg p-3 transition-all duration-200 hover:shadow-md ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md transform hover:scale-105"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAssistant;