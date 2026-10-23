import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Code2, 
  Eye, 
  Download, 
  Copy, 
  Check, 
  Wand2, 
  ExternalLink,
  Sparkles,
  Layout
} from 'lucide-react';
import { WEBSITE_TEMPLATES, generateCustomWebsiteHtml } from '../../services/websiteTemplates';
import { generateWebsiteFromPrompt } from '../../services/aiEngine';

export default function WebsiteBuilder({ language }) {
  const [prompt, setPrompt] = useState('Modern dark-mode AI Startup landing page with pricing and glowing features');
  const [selectedTemplateId, setSelectedTemplateId] = useState('saas-modern');
  const [styleTheme, setStyleTheme] = useState('modern-dark');
  const [deviceView, setDeviceView] = useState('desktop');
  const [activeTab, setActiveTab] = useState('preview');
  const [htmlCode, setHtmlCode] = useState(WEBSITE_TEMPLATES[0].html);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const samplePrompts = [
    { label: '🚀 SaaS Platform', text: 'Ultra-modern SaaS landing page with dark glassmorphism, pricing table, and feature grid' },
    { label: '🎨 Creator Portfolio', text: 'Minimalist designer and developer portfolio with high contrast dark aesthetic and case studies' },
    { label: '☕ Artisan Coffee Cafe', text: 'Warm rustic bistro cafe with specialty brews menu, aesthetic photography, and table reservation' },
    { label: '🏋️ Elite Fitness Gym', text: 'High energy sports gym and personal training website with neon orange accents and membership plans' }
  ];

  const handleGenerate = async (e) => {
    e && e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const result = await generateWebsiteFromPrompt({
        prompt,
        style: styleTheme
      });
      setHtmlCode(result.html);
      setActiveTab('preview');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplateId(template.id);
    setPrompt(template.prompt);
    setHtmlCode(template.html);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(htmlCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadHtmlFile = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omni-website-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openInNewTab = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.open();
      newWindow.document.write(htmlCode);
      newWindow.document.close();
    }
  };

  const getViewportWidth = () => {
    if (deviceView === 'mobile') return 'max-w-[375px] h-[667px] shadow-2xl rounded-3xl border-4 border-slate-400 dark:border-slate-700';
    if (deviceView === 'tablet') return 'max-w-[768px] h-[780px] shadow-2xl rounded-2xl border-4 border-slate-400 dark:border-slate-700';
    return 'w-full h-[780px] rounded-xl border border-slate-300 dark:border-slate-800';
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>v0 AI Web Architect</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'ta' ? 'AI இணையதள பில்டர் (Prompt-to-Website)' : 'AI Website Generator & Live Builder'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            {language === 'ta'
              ? 'உங்கள் விருப்பத்திற்கேற்ப முழுமையான, ரெஸ்பான்சிவ் வெப்சைட்டை நொடிகளில் உருவாக்கி கோடை பதிவிறக்குங்கள்.'
              : 'Generate complete responsive websites, preview on multi-devices, edit source code, and download ready-to-deploy HTML.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={copyCode}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-xs transition cursor-pointer"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          <button
            onClick={downloadHtmlFile}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download HTML</span>
          </button>

          <button
            onClick={openInNewTab}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white shadow-xs transition cursor-pointer"
            title="Open in new window"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Input & Generator Toolbar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none space-y-4">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-2">
              {language === 'ta' ? 'வெப்சைட் பிராம்ட்:' : 'Describe the website you want to build:'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Modern AI marketing agency website with interactive pricing cards and client testimonials..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm pr-36"
              />
              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="absolute right-2 top-2 bottom-2 px-5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Building...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>{language === 'ta' ? 'உருவாக்கு' : 'Generate'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick inspiration prompts */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Quick ideas:</span>
            {samplePrompts.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(s.text)}
                className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-700/60 transition cursor-pointer"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Theme Palette & Pre-built Templates */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            {/* Color themes */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">Aesthetic Theme:</span>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'modern-dark', label: 'Dark Purple' },
                  { id: 'emerald', label: 'Emerald Tech' },
                  { id: 'cyberpunk', label: 'Cyberpunk Neon' }
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setStyleTheme(th.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      styleTheme === th.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Starter template pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider shrink-0">Templates:</span>
              {WEBSITE_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    selectedTemplateId === tmpl.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tmpl.name}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Main Viewport & Code Toolbar */}
      <div className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none overflow-hidden flex flex-col">
        {/* Sub-header toolbar */}
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
          {/* Tab buttons: Preview vs Code */}
          <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-900 p-1 rounded-xl border border-slate-300 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>HTML / CSS Code</span>
            </button>
          </div>

          {/* Device viewport switcher */}
          {activeTab === 'preview' && (
            <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-900 p-1 rounded-xl border border-slate-300 dark:border-slate-800">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                  deviceView === 'desktop' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-white font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Desktop View (100%)"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceView('tablet')}
                className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                  deviceView === 'tablet' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-white font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                  deviceView === 'mobile' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-white font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="text-xs text-slate-500 font-mono hidden md:block">
            Tailwind CSS • Responsive • Zero Dependencies
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-8 bg-slate-100 dark:bg-slate-950 flex justify-center items-start min-h-[800px] overflow-x-auto">
          {activeTab === 'preview' ? (
            <div className={`w-full transition-all duration-300 mx-auto flex justify-center ${getViewportWidth()}`}>
              <iframe
                title="Website Live Preview"
                srcDoc={htmlCode}
                className="w-full h-full rounded-xl bg-white border-none shadow-sm"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          ) : (
            <div className="w-full h-[780px] flex flex-col space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pb-2">
                <span>Directly edit the code below to update preview instantly:</span>
                <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">{htmlCode.length} characters</span>
              </div>
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-full p-4 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-emerald-400 leading-relaxed focus:outline-none focus:border-blue-500 resize-none selection:bg-purple-900"
                spellCheck="false"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
