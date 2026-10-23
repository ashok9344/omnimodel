import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import VideoStudio from './components/VideoStudio/VideoStudio';
import WebsiteBuilder from './components/WebsiteBuilder/WebsiteBuilder';
import StudyTrainer from './components/StudyTrainer/StudyTrainer';
import CanvaStudio from './components/CanvaStudio/CanvaStudio';
import AiChat from './components/AiChat/AiChat';
import SettingsModal from './components/Settings/SettingsModal';

function App() {
  const [activeTab, setActiveTab] = useState('video');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' or 'ta'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('omni_theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('omni_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          language={language}
          theme={theme}
        />

        {/* Dynamic Studio Workspace Area */}
        <main className="flex-1 overflow-y-auto bg-slate-100/60 dark:bg-slate-950/40 transition-colors duration-200">
          {activeTab === 'video' && <VideoStudio language={language} theme={theme} />}
          {activeTab === 'website' && <WebsiteBuilder language={language} theme={theme} />}
          {activeTab === 'study' && <StudyTrainer language={language} theme={theme} />}
          {activeTab === 'design' && <CanvaStudio language={language} theme={theme} />}
          {activeTab === 'chat' && <AiChat language={language} theme={theme} />}
        </main>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />
    </div>
  );
}

export default App;
