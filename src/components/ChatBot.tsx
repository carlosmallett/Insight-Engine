import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Send, Sparkles } from 'lucide-react';

interface ChatBotProps {
  onNavigate?: (location: string) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export function ChatBot({ onNavigate }: ChatBotProps) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    const query = inputValue;
    setInputValue('');
    setIsExpanded(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(query);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const generateBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('attention schema')) {
      return "Found Attention Schema Theory zone in the Consciousness area. Highlighting relevant papers...";
    } else if (lowerQuery.includes('graziano') || lowerQuery.includes('tononi')) {
      return "Located papers by these authors in Consciousness research. Showing connections...";
    } else if (lowerQuery.includes('related') || lowerQuery.includes('connection')) {
      return "Activating poly-association to visualize semantic relationships.";
    } else if (lowerQuery.includes('help')) {
      return "I can help you navigate, search papers, show associations, and explain visualizations.";
    } else {
      return `Searching for "${query}" in the data forest...`;
    }
  };

  return (
    <div className="fixed bottom-6 left-6 right-24 z-40 pointer-events-auto">
      <div className="max-w-4xl">
        {/* Messages History */}
        <AnimatePresence>
          {isExpanded && messages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              className="mb-3 bg-black/60 backdrop-blur-xl border border-white/30 rounded-2xl overflow-hidden"
            >
              <div className="max-h-64 overflow-y-auto p-4 space-y-3">
                {messages.slice(-6).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
                        message.sender === 'user'
                          ? 'bg-cyan-500/30 text-white'
                          : 'bg-white/10 text-white/90'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <Sparkles className="w-3 h-3 inline mr-2 text-cyan-400" />
                      )}
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-xl border border-white/30 rounded-full px-6 py-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-sm">Chatbot</span>
            <div className="h-4 w-px bg-white/20" />
            
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              onFocus={() => setIsExpanded(true)}
              placeholder="Ask me anything about the research..."
              className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none text-sm"
            />
            
            <button
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
            >
              <Mic className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleSendMessage}
              className="p-2 bg-cyan-500/30 hover:bg-cyan-500/40 text-cyan-400 rounded-full transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
