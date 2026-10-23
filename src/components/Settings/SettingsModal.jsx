import React, { useState, useEffect } from 'react';
import { X, Key, Cpu, ShieldCheck, Sparkles, Check, Globe } from 'lucide-react';
import { getAiConfig, saveAiConfig, AI_PROVIDERS } from '../../services/aiEngine';

export default function SettingsModal({ isOpen, onClose, language, setLanguage, theme, setTheme }) {
  const [config, setConfig] = useState(getAiConfig());
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setConfig(getAiConfig());
      setIsSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveAiConfig(config);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">AI Engine & Theme Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Appearance Theme */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Appearance Theme:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTheme && setTheme('light')}
                className={`p-3 rounded-xl border text-center text-xs font-bold transition cursor-pointer ${
                  theme === 'light'
                    ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-500 text-purple-950 dark:text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ☀️ Clean Light Mode (Default)
              </button>
              <button
                type="button"
                onClick={() => setTheme && setTheme('dark')}
                className={`p-3 rounded-xl border text-center text-xs font-bold transition cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-purple-950/50 border-purple-500 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🌙 Futuristic Dark Mode
              </button>
            </div>
          </div>

          {/* Engine Mode */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Select AI Engine Provider:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  id: AI_PROVIDERS.BUILTIN,
                  title: 'Built-in Omni Engine',
                  desc: '100% Free • Unlimited • Zero API Key Needed',
                  badge: 'RECOMMENDED'
                },
                {
                  id: AI_PROVIDERS.GEMINI,
                  title: 'Google Gemini Pro',
                  desc: 'Requires free Google AI Studio Key',
                  badge: 'API KEY'
                },
                {
                  id: AI_PROVIDERS.OPENAI,
                  title: 'OpenAI GPT-4o',
                  desc: 'Requires custom OpenAI Platform Key',
                  badge: 'BYOK'
                },
                {
                  id: AI_PROVIDERS.OPENROUTER,
                  title: 'OpenRouter / Claude',
                  desc: 'Multi-provider AI gateway API',
                  badge: 'BYOK'
                }
              ].map((prov) => (
                <button
                  key={prov.id}
                  type="button"
                  onClick={() => setConfig({ ...config, provider: prov.id })}
                  className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    config.provider === prov.id
                      ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-500 text-purple-950 dark:text-white shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{prov.title}</span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-purple-700 dark:text-purple-300">
                      {prov.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">{prov.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom API Key input if not builtin */}
          {config.provider !== AI_PROVIDERS.BUILTIN && (
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Enter your {config.provider.toUpperCase()} API Key:</span>
              </label>
              <input
                type="password"
                value={config.apiKey || ''}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                placeholder="sk-..."
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
              />
              <p className="text-[10px] text-slate-500">
                Your key is stored securely in your browser's local storage and never leaves your computer.
              </p>
            </div>
          )}

          {/* Language Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Default Interface Language:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`p-3 rounded-xl border text-center text-xs font-bold transition cursor-pointer ${
                  language === 'en'
                    ? 'bg-purple-600 text-white border-purple-500'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                English (International)
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                className={`p-3 rounded-xl border text-center text-xs font-bold transition cursor-pointer ${
                  language === 'ta'
                    ? 'bg-purple-600 text-white border-purple-500'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                தமிழ் (Tamil Bilingual)
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition cursor-pointer"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Sparkles className="w-4 h-4" />}
            <span>{isSaved ? 'Saved Settings!' : 'Save & Apply'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
