import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Bot,
  Send,
  Upload,
  Sparkles,
  ShieldAlert,
  Compass,
  Brain,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  imagePreview?: string;
  thinkingMode?: boolean;
}

interface ForensicAdvisorChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForensicAdvisorChatModal: React.FC<ForensicAdvisorChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Greetings. I am the Senior Cadastre & Bullion Counter-Fraud Intelligence Officer for the Uganda Gold Expedition.
Under the Mining and Minerals Act 2022, my mandate is to protect sovereign capital from fraudulent black-market syndicates.

How may I assist you today?
• Audit an unsolicited gold offer or WhatsApp broker claim
• Analyze a photo of a gold bar, assay slip, or customs certificate
• Run a High-Reasoning forensic simulation on a suspected hotel scam
• Query official DGSM Cadastre coordinates and statutory export taxes`,
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useHighThinking, setUseHighThinking] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageMime, setSelectedImageMime] = useState<string>('image/jpeg');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImageMime(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() && !selectedImage) return;

    const currentInput = input;
    const currentImg = selectedImage;
    const currentMime = selectedImageMime;
    const isThinking = useHighThinking;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: currentInput || 'Forensic examination requested for attached exhibit.',
      imagePreview: currentImg || undefined,
      thinkingMode: isThinking,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSelectedImage(null);
    setLoading(true);

    try {
      if (currentImg) {
        // Image Understanding endpoint
        const res = await fetch('/api/gemini/analyze-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: currentImg,
            mimeType: currentMime,
            prompt: currentInput || 'Perform a rigorous forensic and anti-fraud analysis of this gold bar, mineral document, or offer exhibit.',
          }),
        });
        const data = await res.json();
        const replyText = data.analysis || data.error || 'Forensic examination completed.';

        setMessages((prev) => [
          ...prev,
          {
            id: `asst-${Date.now()}`,
            role: 'assistant',
            text: replyText,
          },
        ]);
      } else if (isThinking) {
        // High Thinking Deep Reasoning endpoint
        const res = await fetch('/api/gemini/deep-reasoning', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scenario: currentInput,
          }),
        });
        const data = await res.json();
        const replyText = data.analysis || data.error || 'Deep reasoning assessment complete.';

        setMessages((prev) => [
          ...prev,
          {
            id: `asst-${Date.now()}`,
            role: 'assistant',
            text: replyText,
            thinkingMode: true,
          },
        ]);
      } else {
        // Standard Multi-turn chat endpoint
        const historyPayload = messages.slice(-6).map((m) => ({
          role: m.role,
          text: m.text,
        }));

        const res = await fetch('/api/gemini/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: currentInput,
            history: historyPayload,
          }),
        });
        const data = await res.json();
        const replyText = data.text || data.error || 'Statutory intelligence dispatched.';

        setMessages((prev) => [
          ...prev,
          {
            id: `asst-${Date.now()}`,
            role: 'assistant',
            text: replyText,
          },
        ]);
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          text: `Directorate dispatch notice: ${err.message || 'Error communicating with intelligence server.'}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'reset',
        role: 'assistant',
        text: 'Session reset. State your inquiry regarding Uganda gold cadastre, assay procedures, or scam verification.',
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-[#131B2E] border-2 border-[#D4AF37] rounded-2xl max-w-3xl w-full h-[88vh] flex flex-col shadow-2xl relative gold-glow">
        {/* Header */}
        <div className="bg-[#0F172A] border-b border-[#D4AF37]/30 p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="font-cinzel text-base font-bold text-[#FEF3C7]">
                  Cadastre AI Counter-Fraud Officer
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] block">
                Powered by Gemini 3.8 Intelligence • Mining Act 2022 Trained
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              onClick={clearChat}
              className="p-1.5 rounded-lg bg-[#1E293B] text-[#94A3B8] hover:text-[#FEF3C7]"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#1E293B] text-[#94A3B8] hover:text-[#FEF3C7]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="text-[10px] font-mono text-[#64748B] mb-1">
                {m.role === 'user' ? 'INSTITUTIONAL DELEGATE' : 'CADASTRE INTELLIGENCE OFFICER'}
              </div>

              {m.imagePreview && (
                <div className="mb-2 max-w-xs rounded-lg overflow-hidden border border-[#D4AF37]">
                  <img src={m.imagePreview} alt="Exhibit upload" className="w-full h-auto" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-[#D4AF37] text-[#0B0F17] font-medium font-sans'
                    : 'bg-[#0B0F17] text-slate-200 border border-[#D4AF37]/30 font-sans shadow-lg'
                }`}
              >
                {m.thinkingMode && (
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#D4AF37] mb-2 pb-1.5 border-b border-[#D4AF37]/20 uppercase">
                    <Brain className="w-3.5 h-3.5" />
                    <span>HIGH-THINKING FORENSIC REASONING PROTOCOL</span>
                  </div>
                )}
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-xs font-mono text-[#D4AF37] p-3 bg-[#0B0F17] rounded-xl border border-[#D4AF37]/20 w-fit">
              <Sparkles className="w-4 h-4 animate-spin text-[#D4AF37]" />
              <span>Analyzing against Mining Cadastre registers & metallurgical models...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#0F172A] border-t border-[#D4AF37]/30 shrink-0 space-y-2">
          {/* Controls Bar: High Thinking toggle & Upload preview */}
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {/* High Thinking Mode Toggle */}
              <button
                type="button"
                onClick={() => setUseHighThinking(!useHighThinking)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] transition-all cursor-pointer ${
                  useHighThinking
                    ? 'bg-[#D4AF37] text-[#0B0F17] font-bold shadow'
                    : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#FEF3C7]'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                <span>High-Thinking Mode {useHighThinking ? 'ON' : 'OFF'}</span>
              </button>

              {/* Upload image trigger */}
              <label className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#1E293B] text-[#D4AF37] hover:text-[#FEF3C7] text-[11px] cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Bar / Certificate Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
            </div>

            {selectedImage && (
              <div className="flex items-center space-x-1 text-emerald-400 text-[10px]">
                <CheckCircle2 className="w-3 h-3" />
                <span>Photo ready for analysis</span>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-red-400 hover:text-red-300 ml-1"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask about a seller's claim, hotel smelting, assay testing, or URA tax..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-4 py-2.5 text-xs font-mono text-[#FEF3C7] placeholder-[#64748B] focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              disabled={loading || (!input.trim() && !selectedImage)}
              className="px-5 py-2.5 rounded-lg bg-[#D4AF37] text-[#0B0F17] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer flex items-center space-x-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dispatch</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
