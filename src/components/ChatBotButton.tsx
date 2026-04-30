import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Mic, Send, Sparkles, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export function ChatBotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

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
      return "Found Attention Schema Theory in Consciousness Studies. Highlighting relevant papers...";
    } else if (lowerQuery.includes('robotics')) {
      return "Located Robotics category with subcategories including biomimetic approaches and human-robot interaction.";
    } else if (lowerQuery.includes('help')) {
      return "I can help you navigate, search papers, explore categories, and explain research connections.";
    } else {
      return `Searching for "${query}" in the knowledge forest...`;
    }
  };

  return (
    <div className="fixed bottom-6 left-[218px] z-40">
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 left-0 w-96 bg-black/80 backdrop-blur-xl border border-white/30 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-white">AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-white/40 pt-8">
                  <Sparkles className="w-8 h-8 mx-auto mb-3 text-cyan-400/40" />
                  <p>Ask me anything about the research...</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
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
                ))
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your question..."
                  className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none text-sm"
                />
                <button
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-1.5 bg-cyan-500/30 hover:bg-cyan-500/40 text-cyan-400 rounded-full transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/30 flex items-center justify-center hover:bg-white/10 transition-all shadow-lg ${
          isOpen ? 'bg-white/10' : ''
        }`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}