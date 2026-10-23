import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Film } from 'lucide-react';
import { speech } from '../../utils/speech';

export default function VideoPlayer({ videoData, language }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  const scenes = videoData?.scenes || [];
  const currentScene = scenes[currentSceneIndex] || scenes[0];

  // Play narration audio for current scene
  useEffect(() => {
    if (isPlaying && currentScene && !isMuted) {
      speech.speak(currentScene.audioNarration);
    } else {
      speech.stopSpeaking();
    }
  }, [isPlaying, currentSceneIndex, isMuted]);

  // Video Animation Loop on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;

    let particleArray = [];
    for (let i = 0; i < 40; i++) {
      particleArray.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.8 + 0.2
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // 1. Dynamic animated gradient background
      const grad = ctx.createRadialGradient(
        width / 2 + Math.sin(frame * 0.02) * 50,
        height / 2 + Math.cos(frame * 0.02) * 40,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );

      if (currentSceneIndex === 0) {
        grad.addColorStop(0, '#581c87'); // purple-900
        grad.addColorStop(0.5, '#1e1b4b'); // indigo-950
        grad.addColorStop(1, '#020617'); // slate-950
      } else if (currentSceneIndex === 1) {
        grad.addColorStop(0, '#0c4a6e'); // sky-900
        grad.addColorStop(0.5, '#064e3b'); // emerald-950
        grad.addColorStop(1, '#020617');
      } else {
        grad.addColorStop(0, '#7c2d12'); // orange-900
        grad.addColorStop(0.5, '#831843'); // pink-950
        grad.addColorStop(1, '#020617');
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Camera Motion Simulation
      ctx.save();
      const zoomScale = 1 + (Math.sin(frame * 0.015) * 0.08);
      ctx.translate(width / 2, height / 2);
      ctx.scale(zoomScale, zoomScale);
      ctx.translate(-width / 2, -height / 2);

      // Grid overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 3. Floating neural particles
      particleArray.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = currentScene?.particleColor || '#a855f7';
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 10;
        ctx.shadowColor = currentScene?.particleColor || '#a855f7';
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      });

      // 4. Central Visual Badge
      const pulseSize = 100 + Math.sin(frame * 0.05) * 12;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2 - 20, pulseSize, 0, Math.PI * 2);
      ctx.strokeStyle = currentScene?.particleColor || 'rgba(168, 85, 247, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [currentSceneIndex, currentScene]);

  // Scene progression timer
  useEffect(() => {
    let interval = null;
    if (isPlaying && scenes.length > 0) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentSceneIndex((idx) => {
              if (idx + 1 < scenes.length) {
                return idx + 1;
              } else {
                setIsPlaying(false);
                return 0;
              }
            });
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, scenes]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    speech.stopSpeaking();
    setCurrentSceneIndex(0);
    setProgress(0);
  };

  const isPortrait = videoData?.aspectRatio === '9:16';
  const isSquare = videoData?.aspectRatio === '1:1';

  return (
    <div className="flex flex-col items-center">
      {/* Video Canvas Container */}
      <div 
        className={`relative overflow-hidden rounded-2xl border-2 border-slate-300 dark:border-slate-800 bg-black shadow-xl dark:shadow-2xl transition-all duration-300 ${
          isPortrait ? 'w-[320px] aspect-[9/16]' : isSquare ? 'w-[420px] aspect-square' : 'w-full aspect-video'
        }`}
      >
        <canvas
          ref={canvasRef}
          width={640}
          height={360}
          className="w-full h-full object-cover"
        />

        {/* Top Video HUD Info */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 z-20 pointer-events-none">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-mono uppercase font-bold text-[10px]">
              {videoData?.style || 'Cinematic 8K'}
            </span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 font-mono text-[10px]">
            Scene {currentSceneIndex + 1} of {scenes.length}
          </div>
        </div>

        {/* Dynamic Center Title Preview */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none z-10">
          <div className="text-3xl md:text-4xl font-black text-white/95 tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] mb-2 uppercase max-w-md">
            {currentScene?.title || videoData?.title}
          </div>
          <div className="text-xs text-purple-300 font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 backdrop-blur">
            {currentScene?.cameraMovement || 'Pan Tracking'}
          </div>
        </div>

        {/* Bottom Subtitle / Captions Bar */}
        <div className="absolute bottom-16 left-6 right-6 text-center z-20 pointer-events-none">
          <span className="inline-block px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-white text-xs md:text-sm font-semibold tracking-wide drop-shadow-lg max-w-lg">
            "{currentScene?.subtitle || currentScene?.audioNarration}"
          </span>
        </div>

        {/* Floating Play Overlay when paused */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-purple-600/90 hover:bg-purple-500 text-white flex items-center justify-center shadow-2xl shadow-purple-600/50 backdrop-blur hover:scale-110 transition cursor-pointer z-30"
          >
            <Play className="w-7 h-7 ml-1 fill-white" />
          </button>
        )}

        {/* Scrubber Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 z-30">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Control Bar in Light & Dark Mode */}
      <div className="w-full max-w-2xl mt-4 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition cursor-pointer shadow-md shadow-purple-600/20"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
            title="Replay from Scene 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
            title={isMuted ? 'Unmute AI Voiceover' : 'Mute Voiceover'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
          </button>
        </div>

        {/* Scene switcher buttons */}
        <div className="flex items-center gap-1.5">
          {scenes.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setCurrentSceneIndex(idx);
                setProgress(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                currentSceneIndex === idx
                  ? 'bg-purple-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Scene {idx + 1}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
          {videoData?.totalDuration || '10s'} • {videoData?.aspectRatio || '16:9'}
        </div>
      </div>
    </div>
  );
}
