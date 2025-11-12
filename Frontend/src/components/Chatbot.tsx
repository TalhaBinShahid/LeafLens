import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, AlertCircle } from 'lucide-react';
import { sendChatMessage, startChatSession } from '../lib/api';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

interface ChatbotProps {
  disease: string;
}

export function Chatbot({ disease }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionId, setSessionId] = useState<string>('');



  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  // Cleanup: end chat session when component unmounts
  // useEffect(() => {
  //   return () => {
  //     if (sessionId) startChatSession(sessionId).catch(console.error);
  //   };
  // }, [sessionId]);

  
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const response = await startChatSession(disease);
        setSessionId(response.session_id);
        console.log("Chat session started with ID:", response.session_id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to start chat session.');
      }
    }
    initializeChat();
  }, [disease]);


  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setError('');

    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const botResponse = await sendChatMessage(sessionId, userMessage);
      setMessages(prev => [...prev, { type: 'bot', content: String(botResponse.response) }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex flex-col h-full">
      <div className="flex items-center gap-2 pb-4 border-b border-dark-800">
        <MessageCircle className="w-5 h-5 text-leaf-500" />
        <h3 className="font-semibold">Disease Assistant</h3>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-4 min-h-96 max-h-96">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <MessageCircle className="w-12 h-12 text-dark-700 mb-3" />
            <p className="text-dark-400 text-sm">
              Ask questions about <span className="font-medium">{disease}</span> or treatment options
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                msg.type === 'user'
                  ? 'bg-leaf-500 text-dark-950'
                  : 'bg-dark-800 text-dark-200 border border-dark-700'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-dark-800 text-dark-200 border border-dark-700 px-4 py-2 rounded-lg text-sm">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-dark-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-2 mb-3 bg-red-500/10 border border-red-500/30 rounded text-red-300 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="pt-4 border-t border-dark-800 space-y-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Ask a question..."
          className="input-field resize-none text-sm h-20"
        />

        <button
          onClick={handleSendMessage}
          disabled={!input.trim() || loading}
          className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-2"
        >
          <Send className="w-4 h-4" />
          Send
        </button>
      </div>
    </div>
  );
}
