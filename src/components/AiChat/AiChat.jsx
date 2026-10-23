import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquareText, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Copy, 
  Check, 
  Volume2, 
  Code2,
  Palette,
  GraduationCap,
  Film
} from 'lucide-react';
import { speech } from '../../utils/speech';

export default function AiChat({ language }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      persona: 'director',
      text: "Hello! I am your OmniAI Copilot. Whether you need a cinematic video script, modern website code, English grammar coaching, or Canva graphics, I'm here to assist. What can we create today?",
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [selectedPersona, setSelectedPersona] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const chatEndRef = useRef(null);

  const personas = [
    { id: 'all', name: 'Universal AI', icon: Sparkles, color: 'text-purple-600 dark:text-purple-400' },
    { id: 'video', name: 'Video Director', icon: Film, color: 'text-indigo-600 dark:text-indigo-400' },
    { id: 'web', name: 'Web Dev Pro', icon: Code2, color: 'text-blue-600 dark:text-blue-400' },
    { id: 'english', name: 'English Coach', icon: GraduationCap, color: 'text-emerald-600 dark:text-emerald-400' },
    { id: 'design', name: 'Canva Designer', icon: Palette, color: 'text-pink-600 dark:text-pink-400' }
  ];

  const quickPrompts = [
    "Write a 15-second viral YouTube Shorts script about future AI robots",
    "Give me 5 professional phrases to replace 'I did not went' in an interview",
    "How to create a high-converting landing page hero section in Tailwind CSS?",
    "Explain the difference between Machine Learning and Deep Learning in simple terms"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (userText) => {
    const textToSend = userText || input;
    if (!textToSend.trim()) return;

    const userMessage = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    setTimeout(() => {
      let aiResponseText = "";
      const lower = textToSend.toLowerCase();

      if (lower.includes('script') || lower.includes('video') || lower.includes('shorts') || selectedPersona === 'video') {
        aiResponseText = `🎬 **Viral 15-Second Video Script Concept:**\n\n**Hook (0-3s):** [Visual: Fast drone zoom into a futuristic neon skyline]\n*Voiceover:* "What if everything you knew about creativity changed overnight?"\n\n**Body (3-10s):** [Visual: Dynamic transitions showcasing neural AI models rendering 4K worlds]\n*Voiceover:* "From autonomous web builders to cinematic studios, the tools of tomorrow are already here."\n\n**CTA (10-15s):** [Visual: Bold kinetic typography 'OmniAI Studio']\n*Voiceover:* "Don't just watch the future—build it. Link in bio!"`;
      } else if (lower.includes('phrase') || lower.includes('english') || lower.includes('interview') || selectedPersona === 'english') {
        aiResponseText = `🎓 **5 Professional Native Phrases for Your Interview:**\n\n1. *"I was unfortunately unable to attend the session due to a prior commitment."* (Replaces 'I did not went')\n2. *"Could you kindly elaborate on the core objectives of this department?"*\n3. *"I take great pride in delivering results under demanding deadlines."*\n4. *"My methodology centers around iterative problem-solving and proactive collaboration."*\n5. *"I look forward to discussing how my skills align with your vision."*`;
      } else if (lower.includes('tailwind') || lower.includes('code') || lower.includes('landing') || selectedPersona === 'web') {
        aiResponseText = `🌐 **Tailwind Hero Section Component:**\n\n\`\`\`html\n<section class="min-h-screen bg-slate-950 flex items-center justify-center text-center px-6">\n  <div class="max-w-4xl mx-auto">\n    <span class="px-4 py-1.5 rounded-full bg-purple-950/60 text-purple-300 text-xs font-bold border border-purple-500/30">Next-Gen AI Platform</span>\n    <h1 class="text-6xl font-black text-white mt-6 mb-4 tracking-tight">Build at the Speed of Thought</h1>\n    <p class="text-slate-400 text-lg max-w-xl mx-auto mb-8">Deploy production-ready websites and video media in seconds with autonomous neural agents.</p>\n    <button class="px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-600/30 transition">Get Started Free</button>\n  </div>\n</section>\n\`\`\``;
      } else {
        aiResponseText = `✨ That's an insightful prompt! Here is a structured breakdown:\n\n• **Core Concept:** ${textToSend}\n• **Key Takeaway:** By synthesizing multimodal neural pipelines (Video, Web, Language), we achieve frictionless creative workflows.\n• **Recommended Next Step:** Test this concept directly in our Video Studio or Website Builder modules to see immediate live results!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          persona: selectedPersona,
          text: aiResponseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsGenerating(false);
    }, 1000);
  };

  const copyText = (txt, i) => {
    navigator.clipboard.writeText(txt);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>Universal Multimodal AI Assistant</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'ta' ? 'அனைத்து AI உதவிகள் & கோபைலட்' : 'Omni Universal AI Copilot'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            {language === 'ta'
              ? 'கோடிங், ஸ்கிரிப்ட், டிசைன், ஆங்கில பயிற்சி மற்றும் சந்தேகங்களுக்கு உடனடியாக பதிலளிக்கும்.'
              : 'Brainstorm creative concepts, get instant code solutions, write scripts, or learn complex topics.'}
          </p>
        </div>

        {/* Persona Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs rounded-xl overflow-x-auto">
          {personas.map((p) => {
            const Icon = p.icon;
            const isSel = selectedPersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(p.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  isSel ? 'bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${p.color}`} />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Container */}
      <div className="rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col h-[650px] overflow-hidden">
        {/* Messages List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-4 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-5 ${
                  m.sender === 'user'
                    ? 'bg-purple-600 text-white rounded-br-none shadow-md shadow-purple-600/20'
                    : 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-bl-none text-slate-900 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-bold">{m.sender === 'user' ? 'You' : 'OmniAI Copilot'}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px]">{m.time}</span>
                    {m.sender === 'ai' && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => speech.speak(m.text)}
                          className="hover:text-purple-600 dark:hover:text-purple-400 transition cursor-pointer"
                          title="Read Aloud"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => copyText(m.text, idx)}
                          className="hover:text-purple-600 dark:hover:text-purple-400 transition cursor-pointer"
                          title="Copy Answer"
                        >
                          {copiedIdx === idx ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {m.text}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {isGenerating && (
            <div className="flex items-center gap-3 text-xs text-purple-600 dark:text-purple-400 p-2">
              <div className="w-4 h-4 border-2 border-purple-500/30 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin" />
              <span>Omni Copilot is reasoning and formulating response...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-6 py-2 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800/60 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0">Prompts:</span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="text-xs px-3 py-1 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 whitespace-nowrap transition cursor-pointer"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything or request a script, code snippet, or grammar analysis..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition cursor-pointer disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
