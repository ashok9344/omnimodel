import React, { useState } from 'react';
import { 
  Sparkles, 
  Video, 
  Film, 
  Play, 
  Download, 
  Copy, 
  Check, 
  Layers, 
  Sliders, 
  Wand2, 
  Clock, 
  Volume2
} from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import { generateVideoStoryboard } from '../../services/aiEngine';

export default function VideoStudio({ language }) {
  const [prompt, setPrompt] = useState('Cyberpunk neon metropolis with flying cars in heavy rain 4K cinematic');
  const [style, setStyle] = useState('Cinematic 8K');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [duration, setDuration] = useState('10s');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const samplePrompts = [
    { label: '🏙️ Cyberpunk City', text: 'Cyberpunk neon metropolis with flying vehicles in rainy night 8K cinematic' },
    { label: '🍕 Food Reel / Short', text: 'Cheesy artisan wood-fired pizza pulled apart with steam rising, macro 4K' },
    { label: '🌊 Bioluminescent Ocean', text: 'Glowing jellyfish and deep oceanic bioluminescent creatures underwater' },
    { label: '🚀 AI Space Odyssey', text: 'Futuristic astronaut stepping onto an alien crystalline planet with double rings' }
  ];

  const handleGenerate = async (e) => {
    e && e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const data = await generateVideoStoryboard({
        prompt,
        style,
        ratio: aspectRatio,
        duration
      });
      setVideoData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  React.useEffect(() => {
    handleGenerate();
  }, []);

  const copyScenePrompt = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const exportStoryboardJson = () => {
    if (!videoData) return;
    const blob = new Blob([JSON.stringify(videoData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omni-video-storyboard-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Film className="w-3.5 h-3.5" />
            <span>Z-AI Gen-3 Video Engine</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'ta' ? 'AI வீடியோ தயாரிப்பு ஸ்டுடியோ' : 'AI Video Creator & Storyboard Studio'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            {language === 'ta' 
              ? 'எழுத்திலிருந்து முழு வீடியோ, ரீல்ஸ் மற்றும் குரல் விவரிப்பை உருவாக்குங்கள்.' 
              : 'Turn text prompts into cinematic video storyboards, camera motion cues, and dynamic video reels.'}
          </p>
        </div>

        {videoData && (
          <div className="flex items-center gap-2">
            <button
              onClick={exportStoryboardJson}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Export Storyboard JSON</span>
            </button>
          </div>
        )}
      </div>

      {/* Input & Parameters Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none space-y-5">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-2">
              {language === 'ta' ? 'வீடியோ பிராம்ட் (விளக்கம்):' : 'Video Prompt / Story Script:'}
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your scene (e.g. Cinematic camera flying through a futuristic city at sunset with neon reflections...)"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm leading-relaxed"
              />
              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="absolute right-3 bottom-3 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Rendering...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>{language === 'ta' ? 'வீடியோவை உருவாக்கு' : 'Generate Video'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Try inspiration:</span>
            {samplePrompts.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(s.text)}
                className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/60 transition cursor-pointer"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Customization Settings Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            {/* Style Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Art & Visual Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="Cinematic 8K">Cinematic 8K (Hollywood Look)</option>
                <option value="Anime & 2D Animation">Anime & 2D Animation (Ghibli/Makoto)</option>
                <option value="Photorealistic Drone">Photorealistic Drone Shot</option>
                <option value="Cyberpunk Synthwave">Cyberpunk Synthwave</option>
                <option value="3D Pixar Style">3D Animated CGI (Pixar Style)</option>
              </select>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: '16:9', label: '16:9 (YouTube)' },
                  { id: '9:16', label: '9:16 (Reels/Shorts)' },
                  { id: '1:1', label: '1:1 (Square)' }
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setAspectRatio(r.id)}
                    className={`py-2 px-1 text-[11px] font-bold rounded-lg transition text-center cursor-pointer ${
                      aspectRatio === r.id
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Duration
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['5s', '10s', '15s'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d)}
                    className={`py-2 text-[11px] font-bold rounded-lg transition text-center cursor-pointer ${
                      duration === d
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Video Preview & Storyboard Section */}
      {videoData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Canvas Player */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>{language === 'ta' ? 'லைவ் வீடியோ ப்ரிவியூ' : 'Live Interactive Video Player'}</span>
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Audio Voiceover & Subtitles Synced
              </span>
            </div>

            <VideoPlayer videoData={videoData} language={language} />

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-xs text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>💡 Tip: Click the play button to hear the synchronized AI voiceover!</span>
              <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">FPS: 60 • 4K Neural</span>
            </div>
          </div>

          {/* Storyboard Scene Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Storyboard & Scene Prompts</span>
              </h2>
              <span className="text-xs text-purple-700 dark:text-purple-300 font-mono font-bold">
                {videoData.scenes.length} Scenes
              </span>
            </div>

            <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
              {videoData.scenes.map((scene, idx) => (
                <div
                  key={scene.id}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-500/40 shadow-xs transition group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 text-purple-800 dark:text-purple-300 text-[11px] font-bold">
                      Scene {idx + 1} ({scene.timestamp})
                    </span>
                    <button
                      onClick={() => copyScenePrompt(scene.visualPrompt, idx)}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                      title="Copy Visual Prompt for Midjourney/Runway"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{scene.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {scene.visualPrompt}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
                    <div className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium flex items-center gap-1.5">
                      <span className="text-slate-500 font-bold uppercase text-[9px]">Camera:</span>
                      {scene.cameraMovement}
                    </div>
                    <div className="text-[11px] text-amber-700 dark:text-amber-300/90 font-medium flex items-center gap-1.5">
                      <Volume2 className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span className="text-slate-500 font-bold uppercase text-[9px]">Narration:</span>
                      "{scene.audioNarration}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
