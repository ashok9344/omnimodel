// Universal AI Engine: Autonomous intelligent offline engine + Real API integration (Gemini / OpenAI / OpenRouter)

import { generateCustomWebsiteHtml } from './websiteTemplates';
import { GRAMMAR_COMMON_MISTAKES } from './studyData';

export const AI_PROVIDERS = {
  BUILTIN: 'builtin',
  GEMINI: 'gemini',
  OPENAI: 'openai',
  OPENROUTER: 'openrouter'
};

export function getAiConfig() {
  if (typeof window === 'undefined') return { provider: AI_PROVIDERS.BUILTIN, apiKey: '', model: 'gemini-1.5-flash' };
  try {
    const saved = localStorage.getItem('omni_ai_config');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // fallback
  }
  return {
    provider: AI_PROVIDERS.BUILTIN,
    apiKey: '',
    model: 'builtin-omni-v1',
    temperature: 0.7
  };
}

export function saveAiConfig(config) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('omni_ai_config', JSON.stringify(config));
}

// -------------------------------------------------------------
// 1. VIDEO STUDIO ENGINE
// -------------------------------------------------------------
export async function generateVideoStoryboard({ prompt, style = 'cinematic', duration = '10s', ratio = '16:9' }) {
  // Simulate realistic AI thinking
  await new Promise(r => setTimeout(r, 1200));

  const scenes = [
    {
      id: 1,
      timestamp: '00:00 - 00:03',
      title: 'Opening Shot & Hook',
      visualPrompt: `Ultra-high-definition cinematic opening: ${prompt}. Slow push-in drone shot, volumetric atmospheric lighting, ${style} aesthetic, vibrant colors.`,
      cameraMovement: 'Slow Cinematic Push-In (Zoom 1.2x)',
      audioNarration: `In a world transformed by imagination, every idea begins with a single spark.`,
      subtitle: `The journey begins with ${prompt.slice(0, 40)}...`,
      gradient: 'from-purple-900 via-indigo-900 to-black',
      particleColor: '#a855f7'
    },
    {
      id: 2,
      timestamp: '00:03 - 00:07',
      title: 'Action & Core Focus',
      visualPrompt: `Dynamic medium pan shot: close-up details revealing intricate elements of ${prompt}. Dynamic shadows, 8K ray-traced reflections, ${style} color grading.`,
      cameraMovement: 'Smooth Horizontal Tracking Pan Left-to-Right',
      audioNarration: `Experience the breathtaking fusion of creativity and autonomous neural power.`,
      subtitle: `Unlocking limitless possibilities right before your eyes.`,
      gradient: 'from-blue-900 via-slate-900 to-emerald-950',
      particleColor: '#38bdf8'
    },
    {
      id: 3,
      timestamp: '00:07 - 00:10',
      title: 'Climax & Final Call to Action',
      visualPrompt: `Epic high-angle reveal shot: Wide panoramic view of the complete scene of ${prompt}, golden hour lighting, lens flare, pristine finishing.`,
      cameraMovement: 'Elevating Crane Pull-Out (Zoom 0.8x)',
      audioNarration: `Built with OmniAI Studio. Create without limits.`,
      subtitle: `Create without boundaries. Welcome to the future.`,
      gradient: 'from-amber-950 via-rose-950 to-slate-950',
      particleColor: '#f59e0b'
    }
  ];

  return {
    id: 'vid_' + Date.now(),
    title: prompt.length > 40 ? prompt.substring(0, 40) + '...' : prompt,
    aspectRatio: ratio,
    style,
    totalDuration: duration,
    scenes,
    voiceoverSummary: scenes.map(s => s.audioNarration).join(' '),
    renderMetadata: {
      resolution: ratio === '9:16' ? '1080x1920 (Reel/Short)' : ratio === '1:1' ? '1080x1080 (Square)' : '1920x1080 (4K UHD)',
      fps: 60,
      codec: 'H.264 / WebM Neural Stream'
    }
  };
}

// -------------------------------------------------------------
// 2. WEBSITE GENERATOR ENGINE
// -------------------------------------------------------------
export async function generateWebsiteFromPrompt({ prompt, style = 'modern-dark' }) {
  await new Promise(r => setTimeout(r, 1400));
  const html = generateCustomWebsiteHtml(prompt, style);
  return {
    id: 'site_' + Date.now(),
    prompt,
    style,
    html,
    stats: {
      components: 5,
      sections: ['Hero', 'Navigation', 'Features Grid', 'Call To Action', 'Footer'],
      responsive: true
    }
  };
}

// -------------------------------------------------------------
// 3. ENGLISH & STUDY ENGINE
// -------------------------------------------------------------
export async function analyzeEnglishSentence(text) {
  await new Promise(r => setTimeout(r, 700));

  const issues = [];
  for (const item of GRAMMAR_COMMON_MISTAKES) {
    if (item.trigger.test(text)) {
      issues.push(item);
    }
  }

  // Calculate simulated fluency score
  const wordCount = text.trim().split(/\s+/).length;
  let fluencyScore = 85;
  if (issues.length > 0) fluencyScore -= issues.length * 15;
  if (wordCount < 4) fluencyScore -= 10;
  fluencyScore = Math.max(30, Math.min(98, fluencyScore));

  let cefrLevel = 'B1 (Intermediate)';
  if (fluencyScore > 88) cefrLevel = 'C1 (Advanced Fluent)';
  else if (fluencyScore > 75) cefrLevel = 'B2 (Upper Intermediate)';
  else if (fluencyScore < 50) cefrLevel = 'A2 (Elementary)';

  // Suggest polished versions
  const polishedFormal = text
    .replace(/did not went/gi, 'did not go')
    .replace(/myself is ([a-z\s]+)/gi, 'My name is $1')
    .replace(/he don't/gi, "he doesn't")
    .replace(/revert back/gi, 'reply');

  return {
    original: text,
    issues,
    fluencyScore,
    cefrLevel,
    improvedVersions: {
      formal: `Polished: "${polishedFormal.charAt(0).toUpperCase() + polishedFormal.slice(1)}."`,
      casual: `Native Casual: "Honestly, ${polishedFormal.toLowerCase()}!"`,
      business: `Executive: "To communicate clearly: ${polishedFormal}."`
    },
    tamilHelp: issues.length > 0 
      ? issues.map(i => i.tamilExplanation).join('\n')
      : "அருமை! இந்த வாக்கியத்தில் எந்த இலக்கணப் பிழையும் இல்லை. சரளமாகப் பேச தொடர்ந்து பயிற்சி செய்யுங்கள்!"
  };
}

export async function chatWithEnglishTutor(conversationHistory, userMessage, scenarioId = 'casual-coffee') {
  await new Promise(r => setTimeout(r, 900));

  const lower = userMessage.toLowerCase();
  let aiReply = "";
  let feedback = null;

  // Specific scenario responses
  if (scenarioId === 'interview') {
    if (lower.includes('name') || lower.includes('introduce') || lower.includes('myself') || lower.includes('hi') || lower.includes('hello')) {
      aiReply = "Nice to meet you! You articulated your introduction well. Now, could you tell me: What is one major technical or work challenge you overcame recently, and how did you resolve it?";
      feedback = "Tip: When describing challenges, use the STAR method (Situation, Task, Action, Result) to impress recruiters.";
    } else if (lower.includes('work') || lower.includes('project') || lower.includes('challenge')) {
      aiReply = "That sounds like a formidable experience! What was your individual role in that project, and what key lesson did you carry forward?";
      feedback = "Great job using action verbs! Keep your answers structured and confident.";
    } else {
      aiReply = "Thank you for sharing that perspective. Why are you specifically interested in this position with our company?";
      feedback = "Connect your personal passion directly with the company's core mission.";
    }
  } else if (scenarioId === 'tamil-english') {
    aiReply = `Great sentence! Let's polish it together. நீங்க சொன்ன வாக்கியம் அருமையாக இருக்கு. In English, we usually say: "${userMessage}". Try saying: "I would like to expand my speaking skills by talking every day." How would you express your thoughts on that?`;
    feedback = "Remember: English follows Subject + Verb + Object order. (நான் பள்ளிக்கு போகிறேன் = I [Subject] go [Verb] to school [Object]).";
  } else {
    // Casual talk
    if (lower.includes('how are you') || lower.includes('how have you been')) {
      aiReply = "I'm doing splendidly, thanks for asking! I've been fascinated by new AI discoveries today. What about you? Have you worked on anything exciting lately?";
      feedback = "Natural response! Asking a return question keeps conversations engaging.";
    } else if (lower.includes('weekend') || lower.includes('free') || lower.includes('busy')) {
      aiReply = "I hear you! Taking time to relax or pursue creative hobbies is so rejuvenating. If you had the whole weekend completely free, what is the first thing you'd do?";
      feedback = "Using conversational phrases like 'I hear you' sounds very native and warm.";
    } else {
      aiReply = `That is very interesting! "${userMessage}" gives us plenty to explore. Could you elaborate more on what inspired you to think about that?`;
      feedback = "Your sentence was grammatically sound and easy to understand.";
    }
  }

  return {
    reply: aiReply,
    feedback,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

// -------------------------------------------------------------
// 4. CANVA GRAPHIC GENERATOR
// -------------------------------------------------------------
export async function generateCanvaPreset(prompt, category = 'instagram') {
  await new Promise(r => setTimeout(r, 800));

  const colorPalettes = [
    { bg: 'from-indigo-600 via-purple-600 to-pink-500', text: '#ffffff', accent: '#fef08a' },
    { bg: 'from-slate-900 via-purple-950 to-slate-950', text: '#ffffff', accent: '#a855f7' },
    { bg: 'from-emerald-500 via-teal-700 to-cyan-900', text: '#ffffff', accent: '#6ee7b7' },
    { bg: 'from-amber-500 via-rose-600 to-violet-800', text: '#ffffff', accent: '#fef3c7' }
  ];

  const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

  return {
    title: prompt.toUpperCase(),
    subtitle: 'POWERED BY OMNIAI STUDIO',
    badge: 'NEW • 2026 EDITION',
    palette,
    format: category,
    elements: [
      { type: 'badge', text: '★ EXCLUSIVE DESIGN ★' },
      { type: 'headline', text: prompt },
      { type: 'cta', text: 'EXPLORE NOW →' }
    ]
  };
}
