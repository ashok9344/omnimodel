import React from 'react';
import { 
  Video, 
  Globe, 
  GraduationCap, 
  Palette, 
  MessageSquareText, 
  Sparkles,
  LayoutGrid
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, language }) {
  const navItems = [
    {
      id: 'video',
      label: language === 'ta' ? 'AI வீடியோ ஸ்டுடியோ' : 'AI Video Studio',
      subtitle: language === 'ta' ? 'ரீல்ஸ் & வீடியோ உருவாக்கம்' : 'Text to Video & Reels',
      icon: Video,
      color: 'from-purple-500 to-indigo-500',
      badge: 'PRO'
    },
    {
      id: 'website',
      label: language === 'ta' ? 'AI வெப்சைட் பில்டர்' : 'AI Website Builder',
      subtitle: language === 'ta' ? 'பிராம்ட் டூ லைவ் சைட்' : 'Prompt to Live Code',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      badge: 'v0'
    },
    {
      id: 'study',
      label: language === 'ta' ? 'ஆங்கில & கல்விப் பயிற்சி' : 'English & Study AI',
      subtitle: language === 'ta' ? 'குரல் பயிற்சி & வினாடி வினா' : 'Voice Coach & Quizzes',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-500',
      badge: 'VOICE'
    },
    {
      id: 'design',
      label: language === 'ta' ? 'கேன்வா கிராபிக்ஸ்' : 'Canva AI Design',
      subtitle: language === 'ta' ? 'போஸ்டர் & சமூக மீடியா' : 'Banners, Posts & Art',
      icon: Palette,
      color: 'from-pink-500 to-rose-500',
      badge: 'NEW'
    },
    {
      id: 'chat',
      label: language === 'ta' ? 'மல்டி-மாடல் கோபைலட்' : 'Universal Copilot',
      subtitle: language === 'ta' ? 'அனைத்து AI உதவிகள்' : 'Multi-Model Assistant',
      icon: MessageSquareText,
      color: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <aside className="w-full md:w-64 lg:w-72 border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950/60 flex flex-col justify-between shrink-0 transition-colors duration-200">
      <div className="p-4 space-y-6">
        {/* Workspace pill */}
        <div className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-300">
              {language === 'ta' ? 'முழுமையான AI தளம்' : 'All-in-One Studio'}
            </span>
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
            {language === 'ta' ? 'முக்கிய AI கருவிகள்' : 'Core AI Tools'}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition cursor-pointer text-left ${
                  isActive
                    ? 'bg-purple-50 dark:bg-gradient-to-r dark:from-purple-950/70 dark:to-indigo-950/40 border border-purple-200 dark:border-purple-500/40 text-purple-950 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-900/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                      isActive
                        ? `bg-gradient-to-tr ${item.color} text-white shadow-sm`
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{item.label}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[130px]">{item.subtitle}</div>
                  </div>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      isActive
                        ? 'bg-purple-100 dark:bg-purple-500/30 text-purple-700 dark:text-purple-200 border border-purple-200 dark:border-purple-400/40'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Info Box at bottom */}
      <div className="p-4 m-3 rounded-2xl bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/20 border border-purple-100 dark:border-purple-500/20">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span className="text-xs font-bold text-slate-900 dark:text-white">Canva + Z-AI Mode</span>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
          {language === 'ta'
            ? 'வீடியோ, வெப்சைட், ஆங்கில பயிற்சி அனைத்தும் ஒரே கிளிக்கில் உருவாக்கலாம்!'
            : 'Create realistic videos, responsive websites & learn English in one browser tab!'}
        </p>
        <div className="w-full bg-slate-200 dark:bg-slate-900/80 rounded-full h-1.5 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-full rounded-full"></div>
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 mt-2">
          <span>Unlimited Generations</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Free</span>
        </div>
      </div>
    </aside>
  );
}
