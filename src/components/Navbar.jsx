import React from 'react';
import { Sparkles, Settings, Globe, ShieldCheck, Sun, Moon } from 'lucide-react';

export default function Navbar({ activeTab, onOpenSettings, language, setLanguage, theme, toggleTheme }) {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between transition-colors duration-200">
      {/* Brand logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 p-[1.5px] shadow-md shadow-purple-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg md:text-xl tracking-tight bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-800 dark:from-white dark:via-slate-100 dark:to-purple-400 bg-clip-text text-transparent">
              OmniAI Studio
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 uppercase tracking-wider">
              Z-Canva Light
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
            {language === 'ta' 
              ? 'வீடியோ • இணையதளம் • ஆங்கிலப் பயிற்சி • டிசைன் - அனைத்தும் ஒன்றில்'
              : 'Video • Websites • English & Study Coach • Graphic Suite'}
          </p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Light / Dark Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        {/* Language switch */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          title="Switch Language / மொழியை மாற்றுக"
        >
          <Globe className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
        </button>

        {/* Engine status indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>AI Engine Active</span>
        </div>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white shadow-xs transition cursor-pointer"
          title="AI Settings & API Keys"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
