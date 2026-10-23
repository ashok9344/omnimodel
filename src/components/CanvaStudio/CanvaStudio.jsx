import React, { useState, useRef, useEffect } from 'react';
import { 
  Palette, 
  Sparkles, 
  Download, 
  Layers, 
  Type, 
  Sliders, 
  Wand2, 
  Image as ImageIcon,
  Check,
  RefreshCw,
  Tag
} from 'lucide-react';
import { generateCanvaPreset } from '../../services/aiEngine';

export default function CanvaStudio({ language }) {
  const [prompt, setPrompt] = useState('CYBER SECURITY SUMMIT 2026');
  const [headline, setHeadline] = useState('FUTURE OF AI & TECH 2026');
  const [subtitle, setSubtitle] = useState('THE DEFINITIVE MULTIMODAL REVOLUTION');
  const [badgeText, setBadgeText] = useState('★ LIMITED PASSES ★');
  const [selectedFormat, setSelectedFormat] = useState('thumbnail');
  const [selectedGradient, setSelectedGradient] = useState('purple-pink');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef(null);

  const gradients = {
    'purple-pink': { c1: '#4c1d95', c2: '#ec4899', name: 'Cyber Neon' },
    'emerald-teal': { c1: '#064e3b', c2: '#14b8a6', name: 'Emerald Flux' },
    'dark-gold': { c1: '#18181b', c2: '#f59e0b', name: 'Luxury Gold' },
    'midnight-blue': { c1: '#0f172a', c2: '#3b82f6', name: 'Deep Ocean' }
  };

  const samplePrompts = [
    { label: '🔥 Mega Sale 50% Off', head: 'MEGA SUMMER SALE', sub: 'UP TO 50% OFF STOREWIDE', badge: 'TODAY ONLY' },
    { label: '🚀 Tech AI Conference', head: 'AI SUMMIT 2026', sub: 'BUILDING THE NEXT DECADE', badge: 'EXCLUSIVE EVENT' },
    { label: '💪 Fitness Gym Reel', head: 'NO EXCUSES • WORK HARD', sub: 'TRANSFORM YOUR BODY IN 30 DAYS', badge: 'JOIN NOW' },
    { label: '🎙️ Podcast Thumbnail', head: 'THE CREATIVE MINDSET', sub: 'EPISODE 42 • WITH INDUSTRY LEADERS', badge: 'NEW EPISODE' }
  ];

  const handleApplyPreset = (p) => {
    setHeadline(p.head);
    setSubtitle(p.sub);
    setBadgeText(p.badge);
  };

  const handleAiDesign = async () => {
    setIsGenerating(true);
    try {
      const data = await generateCanvaPreset(prompt, selectedFormat);
      setHeadline(data.title);
      setSubtitle(data.subtitle);
      setBadgeText(data.badge);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // 1. Draw rich background gradient
    const gradDef = gradients[selectedGradient] || gradients['purple-pink'];
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, gradDef.c1);
    grad.addColorStop(1, gradDef.c2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Geometric accents / grid
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const circleGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width * 0.4);
    circleGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    circleGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = circleGrad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // 3. Draw Badge
    if (badgeText) {
      ctx.save();
      ctx.font = 'bold 18px "Inter", sans-serif';
      ctx.fillStyle = '#ffffff';
      const badgeWidth = ctx.measureText(badgeText).width + 36;
      const badgeHeight = 36;
      const badgeX = (width - badgeWidth) / 2;
      const badgeY = height * 0.22;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 18);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#fef08a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(badgeText, width / 2, badgeY + badgeHeight / 2);
      ctx.restore();
    }

    // 4. Draw Headline
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 20;

    let fontSize = 42;
    if (headline.length > 25) fontSize = 34;
    ctx.font = `900 ${fontSize}px "Inter", sans-serif`;

    const lines = wrapText(ctx, headline, width * 0.85);
    const startY = height * 0.45 - (lines.length * fontSize) / 3;

    lines.forEach((line, i) => {
      ctx.fillText(line, width / 2, startY + (i * fontSize * 1.15));
    });
    ctx.restore();

    // 5. Draw Subtitle
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '600 18px "Inter", sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 10;
    ctx.fillText(subtitle, width / 2, height * 0.72);
    ctx.restore();

    // 6. Watermark branding
    ctx.save();
    ctx.font = '12px "Inter", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.textAlign = 'center';
    ctx.fillText('DESIGNED IN OMNIAI CANVA STUDIO', width / 2, height - 24);
    ctx.restore();

  }, [headline, subtitle, badgeText, selectedFormat, selectedGradient]);

  function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  const downloadCanvasImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageUri = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = imageUri;
    a.download = `omni-canva-graphic-${Date.now()}.png`;
    a.click();
  };

  const getCanvasDimensions = () => {
    if (selectedFormat === 'square') return { width: 600, height: 600 };
    if (selectedFormat === 'story') return { width: 450, height: 750 };
    return { width: 720, height: 405 };
  };

  const dims = getCanvasDimensions();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-500/30 text-pink-800 dark:text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>Canva AI Design Studio</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'ta' ? 'கேன்வா AI கிராபிக்ஸ் & போஸ்டர் டிசைனர்' : 'Canva AI Graphic & Social Post Studio'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            {language === 'ta'
              ? 'யூடியூப் தம்ப்னைல், இன்ஸ்டாகிராம் போஸ்ட், பேனர் ஆகியவற்றை நொடிகளில் வடிவமைத்து PNG ஆக பதிவிறக்குங்கள்.'
              : 'Generate YouTube thumbnails, Instagram posts, and posters with dynamic typography and high-resolution PNG export.'}
          </p>
        </div>

        <button
          onClick={downloadCanvasImage}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-pink-600/20 transition cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download High-Res PNG</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Design Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Magic Generator */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
              AI One-Click Auto-Design
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Cyber security conference 2026..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-pink-500"
              />
              <button
                onClick={handleAiDesign}
                disabled={isGenerating}
                className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Generate</span>
              </button>
            </div>

            {/* Presets */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">Quick Templates:</span>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplyPreset(s)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Canvas Format & Dimensions */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Canvas Dimensions
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'thumbnail', label: 'YouTube (16:9)' },
                { id: 'square', label: 'Instagram (1:1)' },
                { id: 'story', label: 'Story/Reel (9:16)' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFormat(f.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
                    selectedFormat === f.id
                      ? 'bg-pink-600 text-white shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Gradient Theme */}
            <div className="pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                Gradient Color Palette
              </span>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(gradients).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedGradient(key)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-semibold cursor-pointer ${
                      selectedGradient === key ? 'border-pink-500 bg-pink-50/50 dark:bg-slate-800 text-slate-900 dark:text-white' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-black/10 dark:border-white/20"
                      style={{ background: `linear-gradient(135deg, ${val.c1}, ${val.c2})` }}
                    />
                    <span>{val.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Text Layer Customization */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Live Text Editor
            </span>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1 font-semibold">Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1 font-semibold">Subtitle</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1 font-semibold">Badge Sticker</label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Graphic Canvas Preview */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-2xl">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-4">
            Canvas Resolution: {dims.width} x {dims.height}px
          </div>

          <div className="relative shadow-xl rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700/80">
            <canvas
              ref={canvasRef}
              width={dims.width}
              height={dims.height}
              className="max-w-full h-auto object-contain block"
            />
          </div>

          <div className="mt-6 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span>✨ Real-time vector font rendering</span>
            <span>•</span>
            <span>📸 Lossless PNG Export</span>
          </div>
        </div>
      </div>
    </div>
  );
}
