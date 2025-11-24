import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/common/Header';
import { chatService } from '../services/chatService';
import { Send, Bot, User, Trash2, Sparkles } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ChatbotPage = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your CSE Insight AI assistant. I can help you with market information, stock analysis, and investment guidance. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = [
    "What's the current ASPI value?",
    "Show me top gainers today",
    "Explain P/E ratio",
    "Is now a good time to invest?",
    "What are market hours?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message = input) => {
    if (!message.trim()) return;

    const userMessage = {
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatService.sendMessage(message.trim());
      const assistantMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date(response.timestamp),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Chat cleared. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
      <Header />

      <main className="pt-24 pb-6 px-6 md:px-12 lg:px-20 h-screen flex flex-col">
        <div className="max-w-4xl mx-auto flex-1 flex flex-col w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                AI Investment Assistant
              </h1>
              <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                Ask me anything about CSE and investing
              </p>
            </div>
            <button
              onClick={clearChat}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-purple-200 hover:bg-purple-800/50'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Trash2 size={20} />
            </button>
          </div>

          {/* Chat Container */}
          <div
            className={`flex-1 rounded-2xl overflow-hidden flex flex-col ${
              isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
            }`}
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isDark ? 'bg-accent-cyan/20' : 'bg-emerald-100'
                      }`}
                    >
                      <Bot size={16} className="text-accent-cyan" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-accent-cyan text-gray-900'
                        : isDark
                        ? 'bg-purple-800/50 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === 'user'
                          ? 'text-gray-700'
                          : isDark
                          ? 'text-purple-300'
                          : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isDark ? 'bg-purple-600' : 'bg-gray-800'
                      }`}
                    >
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDark ? 'bg-accent-cyan/20' : 'bg-emerald-100'
                    }`}
                  >
                    <Bot size={16} className="text-accent-cyan" />
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      isDark ? 'bg-purple-800/50' : 'bg-gray-100'
                    }`}
                  >
                    <LoadingSpinner size="sm" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-6 pb-4">
                <p className={`text-sm mb-3 ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                  <Sparkles size={14} className="inline mr-1" />
                  Try asking:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(suggestion)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        isDark
                          ? 'bg-purple-800/50 text-purple-200 hover:bg-purple-700/50'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className={`p-4 border-t ${isDark ? 'border-purple-800/50' : 'border-gray-200'}`}>
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={loading}
                  className={`flex-1 px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                    isDark
                      ? 'bg-[#0a0e27] border-purple-800 text-white placeholder-purple-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="px-4 py-3 rounded-xl bg-accent-cyan text-gray-900 transition-all hover:bg-accent-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatbotPage;
