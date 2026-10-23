// Pre-built customizable responsive website templates for the AI Website Builder

export const WEBSITE_TEMPLATES = [
  {
    id: 'saas-modern',
    name: 'OmniFlow AI SaaS',
    category: 'SaaS & Tech',
    description: 'High-converting landing page with hero, features grid, pricing table, and testimonials.',
    prompt: 'A modern neon-accented dark mode SaaS landing page for an AI automation platform with interactive pricing and feature cards',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OmniFlow AI - Next Gen Workflow Automation</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .glow-purple { box-shadow: 0 0 50px -10px rgba(168, 85, 247, 0.4); }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  <!-- Navigation -->
  <nav class="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <span class="text-xl font-black text-white">⚡</span>
        </div>
        <span class="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">OmniFlow.ai</span>
      </div>
      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#features" class="hover:text-white transition">Features</a>
        <a href="#solutions" class="hover:text-white transition">Solutions</a>
        <a href="#pricing" class="hover:text-white transition">Pricing</a>
        <a href="#faq" class="hover:text-white transition">FAQ</a>
      </div>
      <div class="flex items-center gap-4">
        <a href="#" class="text-sm font-semibold text-slate-300 hover:text-white transition">Sign In</a>
        <a href="#pricing" class="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-semibold text-sm shadow-lg shadow-purple-500/25 transition transform hover:-translate-y-0.5">Start Free Trial</a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="relative pt-24 pb-20 overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,40,200,0.25),transparent_60%)] pointer-events-none"></div>
    <div class="max-w-5xl mx-auto px-6 text-center relative z-10">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-8">
        <span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
        OmniFlow 3.0 is Live • Multimodal Engine
      </div>
      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
        Automate Any Workflow with <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">Autonomous AI</span>
      </h1>
      <p class="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Connect your apps, train custom neural agents, and create websites, videos, and workflows 10x faster with zero code.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 font-bold text-base shadow-xl shadow-purple-600/30 hover:scale-105 transition transform flex items-center justify-center gap-3">
          Deploy Your First Agent
          <span>→</span>
        </button>
        <button class="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 font-semibold text-slate-300 hover:text-white transition flex items-center justify-center gap-2">
          <span>▶</span> Watch 2-min Demo
        </button>
      </div>

      <!-- Stats Bar -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20 pt-10 border-t border-slate-800">
        <div>
          <div class="text-3xl font-extrabold text-white">99.9%</div>
          <div class="text-xs text-slate-400 mt-1">Accuracy Rate</div>
        </div>
        <div>
          <div class="text-3xl font-extrabold text-white">10M+</div>
          <div class="text-xs text-slate-400 mt-1">Workflows Run</div>
        </div>
        <div>
          <div class="text-3xl font-extrabold text-white">140+</div>
          <div class="text-xs text-slate-400 mt-1">Native Integrations</div>
        </div>
        <div>
          <div class="text-3xl font-extrabold text-white">4.9/5</div>
          <div class="text-xs text-slate-400 mt-1">Customer Rating</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section id="features" class="py-24 bg-slate-900/50 border-y border-slate-800/80">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">Supercharged Capabilities</h2>
        <h3 class="text-3xl md:text-5xl font-extrabold text-white">Everything your team needs to build with AI</h3>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="p-8 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/50 transition group">
          <div class="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">
            🎬
          </div>
          <h4 class="text-xl font-bold text-white mb-3">Prompt to Video Engine</h4>
          <p class="text-slate-400 text-sm leading-relaxed">Generate cinematic 4K video clips, voiceovers, and dynamic scene transitions from simple text scripts.</p>
        </div>
        <div class="p-8 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 transition group">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">
            🌐
          </div>
          <h4 class="text-xl font-bold text-white mb-3">Instant Website Builder</h4>
          <p class="text-slate-400 text-sm leading-relaxed">Turn natural language ideas into full-fledged, responsive, interactive websites with clean production code.</p>
        </div>
        <div class="p-8 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-pink-500/50 transition group">
          <div class="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">
            🎓
          </div>
          <h4 class="text-xl font-bold text-white mb-3">AI Adaptive Tutor</h4>
          <p class="text-slate-400 text-sm leading-relaxed">Real-time spoken English training, grammar feedback, and interactive study flashcards tailored to your goals.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing -->
  <section id="pricing" class="py-24">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">Simple Pricing</h2>
        <h3 class="text-3xl md:text-4xl font-extrabold text-white">Invest in your superpowers</h3>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Starter -->
        <div class="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between">
          <div>
            <h4 class="text-lg font-bold text-white mb-2">Starter</h4>
            <p class="text-slate-400 text-xs mb-6">Perfect for individuals and students</p>
            <div class="text-4xl font-black text-white mb-6">$0 <span class="text-sm font-normal text-slate-400">/ forever free</span></div>
            <ul class="space-y-3 text-sm text-slate-300">
              <li class="flex items-center gap-2">✓ 100 AI credits per month</li>
              <li class="flex items-center gap-2">✓ Standard video generation</li>
              <li class="flex items-center gap-2">✓ Basic English tutor module</li>
              <li class="flex items-center gap-2">✓ Export to HTML/CSS</li>
            </ul>
          </div>
          <button class="mt-8 w-full py-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold transition">Get Started Free</button>
        </div>
        <!-- Pro -->
        <div class="p-8 rounded-2xl border-2 border-purple-500 bg-gradient-to-b from-purple-950/40 via-slate-900/60 to-slate-950 relative flex flex-col justify-between glow-purple">
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-xs font-extrabold tracking-wide uppercase">Most Popular</div>
          <div>
            <h4 class="text-lg font-bold text-white mb-2">Pro Creator</h4>
            <p class="text-slate-400 text-xs mb-6">For creators, developers, & learners</p>
            <div class="text-4xl font-black text-white mb-6">$19 <span class="text-sm font-normal text-slate-400">/ month</span></div>
            <ul class="space-y-3 text-sm text-slate-300">
              <li class="flex items-center gap-2">✓ Unlimited AI Generations</li>
              <li class="flex items-center gap-2">✓ 4K 60fps Video rendering</li>
              <li class="flex items-center gap-2">✓ Voice AI English Coach with audio</li>
              <li class="flex items-center gap-2">✓ Custom Domain Hosting</li>
              <li class="flex items-center gap-2">✓ Full Code Export & Canva tools</li>
            </ul>
          </div>
          <button class="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition shadow-lg shadow-purple-600/30">Upgrade to Pro</button>
        </div>
        <!-- Enterprise -->
        <div class="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between">
          <div>
            <h4 class="text-lg font-bold text-white mb-2">Enterprise</h4>
            <p class="text-slate-400 text-xs mb-6">For scale-ups and custom teams</p>
            <div class="text-4xl font-black text-white mb-6">$89 <span class="text-sm font-normal text-slate-400">/ month</span></div>
            <ul class="space-y-3 text-sm text-slate-300">
              <li class="flex items-center gap-2">✓ Dedicated GPU Cluster</li>
              <li class="flex items-center gap-2">✓ Custom Fine-tuned Models</li>
              <li class="flex items-center gap-2">✓ 24/7 Priority Support</li>
              <li class="flex items-center gap-2">✓ SOC2 & GDPR Compliance</li>
            </ul>
          </div>
          <button class="mt-8 w-full py-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold transition">Contact Sales</button>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-slate-800/80 py-12 bg-slate-950">
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
      <div>© 2026 OmniFlow AI. Built with love for creators and builders.</div>
      <div class="flex items-center gap-6">
        <a href="#" class="hover:text-slate-300">Privacy</a>
        <a href="#" class="hover:text-slate-300">Terms</a>
        <a href="#" class="hover:text-slate-300">Documentation</a>
        <a href="#" class="hover:text-slate-300">Twitter</a>
      </div>
    </div>
  </footer>
</body>
</html>`
  },
  {
    id: 'portfolio-creator',
    name: 'Modern Creative Portfolio',
    category: 'Portfolio',
    description: 'Sleek dark portfolio for designers, content creators, and developers with showcase gallery.',
    prompt: 'A bold minimalist portfolio for a digital creator with project showcase, skills radar, and contact form',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aravind Kumar - Creative Director & AI Engineer</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-black text-white font-sans antialiased">
  <header class="p-8 max-w-6xl mx-auto flex justify-between items-center border-b border-zinc-900">
    <span class="text-2xl font-black tracking-tighter">ARAVIND.</span>
    <nav class="space-x-8 text-sm font-medium text-zinc-400">
      <a href="#work" class="hover:text-white transition">Work</a>
      <a href="#about" class="hover:text-white transition">About</a>
      <a href="#contact" class="hover:text-white transition">Contact</a>
    </nav>
  </header>
  <main class="max-w-6xl mx-auto px-8 py-20">
    <div class="max-w-3xl mb-24">
      <span class="text-emerald-400 font-mono text-sm tracking-wider uppercase mb-4 block">Available for Q2 Projects</span>
      <h1 class="text-6xl md:text-8xl font-black tracking-tight leading-none mb-8">
        Crafting AI <br><span class="text-zinc-600 hover:text-emerald-400 transition">Products</span> & Digital Media.
      </h1>
      <p class="text-xl text-zinc-400 leading-relaxed font-light">
        Bridging the gap between cutting-edge multimodal AI models and human-centered user experiences. Based in Chennai & San Francisco.
      </p>
    </div>

    <!-- Projects Grid -->
    <section id="work" class="mb-28">
      <h2 class="text-sm uppercase tracking-widest text-zinc-500 font-bold mb-10">Selected Works (2025 - 2026)</h2>
      <div class="grid md:grid-cols-2 gap-10">
        <div class="group cursor-pointer">
          <div class="aspect-[16/10] bg-gradient-to-tr from-purple-900 via-indigo-900 to-zinc-900 rounded-2xl mb-5 overflow-hidden flex items-center justify-center p-8 group-hover:scale-[1.02] transition">
            <span class="text-5xl font-black opacity-30 group-hover:opacity-100 transition">GENESIS</span>
          </div>
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-2xl font-bold group-hover:text-emerald-400 transition">Genesis AI Studio</h3>
              <p class="text-zinc-400 text-sm mt-1">Generative Video & Audio Editing Tool</p>
            </div>
            <span class="font-mono text-xs border border-zinc-800 px-3 py-1 rounded-full text-zinc-400">Web App</span>
          </div>
        </div>

        <div class="group cursor-pointer">
          <div class="aspect-[16/10] bg-gradient-to-tr from-emerald-950 via-teal-900 to-zinc-900 rounded-2xl mb-5 overflow-hidden flex items-center justify-center p-8 group-hover:scale-[1.02] transition">
            <span class="text-5xl font-black opacity-30 group-hover:opacity-100 transition">LINGUA</span>
          </div>
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-2xl font-bold group-hover:text-emerald-400 transition">Lingua Voice Engine</h3>
              <p class="text-zinc-400 text-sm mt-1">Real-time Multilingual English Tutor</p>
            </div>
            <span class="font-mono text-xs border border-zinc-800 px-3 py-1 rounded-full text-zinc-400">Mobile / Web</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills & Stack -->
    <section class="p-10 rounded-3xl bg-zinc-950 border border-zinc-900 mb-28">
      <h2 class="text-xl font-bold mb-6">Expertise & Technologies</h2>
      <div class="flex flex-wrap gap-3">
        <span class="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 font-mono text-sm">Full-Stack React</span>
        <span class="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 font-mono text-sm">Large Language Models</span>
        <span class="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 font-mono text-sm">Runway & Sora Prompting</span>
        <span class="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 font-mono text-sm">Tailwind CSS</span>
        <span class="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 font-mono text-sm">Web Speech API</span>
        <span class="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 font-mono text-sm">UI/UX Design</span>
      </div>
    </section>

    <!-- Contact CTA -->
    <section id="contact" class="text-center py-16 border-t border-zinc-900">
      <h2 class="text-4xl font-extrabold mb-4">Have an ambitious project?</h2>
      <p class="text-zinc-400 mb-8 max-w-lg mx-auto">Let’s turn your vision into an astonishing digital product.</p>
      <a href="mailto:hello@example.com" class="inline-block px-8 py-4 rounded-full bg-white text-black font-extrabold hover:bg-emerald-400 transition">Get In Touch</a>
    </section>
  </main>
</body>
</html>`
  },
  {
    id: 'food-restaurant',
    name: 'Artisan Cafe & Bistro',
    category: 'Restaurant & Cafe',
    description: 'Warm, appetizing modern cafe website with digital menu, reservations, and chef specials.',
    prompt: 'A warm ambient cafe & bistro website with dark amber aesthetics, signature menu items, and reservation booking',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aura Bistro & Specialty Coffee</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-stone-950 text-stone-100 font-serif">
  <header class="p-6 border-b border-stone-800 text-center">
    <div class="text-xs uppercase tracking-[0.3em] text-amber-500 font-sans mb-1">Artisan Roastery & Kitchen</div>
    <div class="text-3xl font-bold tracking-tight">AURA BISTRO</div>
  </header>
  <section class="max-w-4xl mx-auto px-6 py-20 text-center">
    <span class="text-amber-500 text-4xl block mb-4">☕</span>
    <h1 class="text-4xl md:text-6xl font-light italic mb-6">Handcrafted Moments, One Brew at a Time</h1>
    <p class="text-stone-400 font-sans max-w-xl mx-auto leading-relaxed mb-10">Fresh single-origin roasts, organic sourdough pastries, and warm evening tapas in the heart of the city.</p>
    <div class="flex justify-center gap-4 font-sans text-sm font-semibold">
      <a href="#menu" class="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white transition">View Menu</a>
      <a href="#book" class="px-6 py-3 rounded-full border border-stone-700 hover:border-amber-600 text-stone-300 transition">Reserve a Table</a>
    </div>
  </section>

  <!-- Menu Preview -->
  <section id="menu" class="max-w-4xl mx-auto px-6 py-16 font-sans border-t border-stone-900">
    <h2 class="text-2xl font-serif text-center mb-12">Signature Offerings</h2>
    <div class="grid md:grid-cols-2 gap-8">
      <div class="p-6 rounded-2xl bg-stone-900/50 border border-stone-800">
        <div class="flex justify-between items-baseline mb-2">
          <h3 class="font-bold text-lg text-amber-400">Cardamom Infused Cold Brew</h3>
          <span class="font-bold text-stone-300">$6.50</span>
        </div>
        <p class="text-stone-400 text-sm">24-hour slow drip Ethiopian Yirgacheffe with green cardamom and oat foam.</p>
      </div>
      <div class="p-6 rounded-2xl bg-stone-900/50 border border-stone-800">
        <div class="flex justify-between items-baseline mb-2">
          <h3 class="font-bold text-lg text-amber-400">Truffle Brioche Toast</h3>
          <span class="font-bold text-stone-300">$14.00</span>
        </div>
        <p class="text-stone-400 text-sm">Poached organic eggs, wild forest mushrooms, and white truffle emulsion.</p>
      </div>
    </div>
  </section>
</body>
</html>`
  }
];

export function generateCustomWebsiteHtml(prompt, style = 'modern-dark') {
  const title = prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt;
  
  // Dynamic theme colors
  let primaryGradient = 'from-purple-600 via-indigo-600 to-pink-600';
  let badgeColor = 'bg-purple-950/50 text-purple-300 border-purple-500/30';
  let accentHex = '#9333ea';

  if (style === 'emerald') {
    primaryGradient = 'from-emerald-500 via-teal-600 to-cyan-500';
    badgeColor = 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30';
    accentHex = '#10b981';
  } else if (style === 'cyberpunk') {
    primaryGradient = 'from-cyan-400 via-fuchsia-500 to-yellow-400';
    badgeColor = 'bg-fuchsia-950/50 text-cyan-300 border-cyan-500/30';
    accentHex = '#06b6d4';
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Built with OmniAI</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .hero-glow {
      background: radial-gradient(circle at 50% 20%, rgba(147, 51, 234, 0.18), transparent 70%);
    }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen antialiased">
  <!-- Nav -->
  <header class="border-b border-slate-800 bg-slate-950/70 backdrop-blur sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-tr ${primaryGradient} flex items-center justify-center font-black text-white text-lg">⚡</div>
        <span class="font-extrabold text-lg text-white">Nova<span class="text-purple-400">Launch</span></span>
      </div>
      <nav class="hidden md:flex items-center gap-6 text-sm text-slate-400">
        <a href="#about" class="hover:text-white transition">About</a>
        <a href="#features" class="hover:text-white transition">Features</a>
        <a href="#showcase" class="hover:text-white transition">Showcase</a>
        <a href="#contact" class="hover:text-white transition">Contact</a>
      </nav>
      <button class="px-4 py-2 rounded-lg bg-white text-slate-950 font-bold text-xs hover:bg-slate-200 transition">Get Started</button>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero-glow pt-20 pb-16 px-6 text-center">
    <div class="max-w-4xl mx-auto">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${badgeColor} text-xs font-semibold uppercase tracking-wider mb-6">
        <span>✨ AI Generated Experience</span>
      </div>
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
        ${prompt}
      </h1>
      <p class="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
        Crafted dynamically in real-time by OmniAI Studio. Fully responsive, production-ready, and optimized for speed and conversion.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <button class="px-6 py-3 rounded-xl bg-gradient-to-r ${primaryGradient} font-bold text-white shadow-lg shadow-purple-600/20 hover:scale-105 transition">Explore Now</button>
        <button class="px-6 py-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-medium transition">Learn More</button>
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section id="features" class="py-20 px-6 max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">Key Highlights</h2>
      <h3 class="text-3xl font-extrabold text-white">Engineered for Perfection</h3>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
        <div class="text-3xl mb-4">🚀</div>
        <h4 class="text-lg font-bold text-white mb-2">Ultra Fast & Responsive</h4>
        <p class="text-slate-400 text-sm">Loads in sub-milliseconds with mobile-first CSS and modern responsive design grids.</p>
      </div>
      <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
        <div class="text-3xl mb-4">🎨</div>
        <h4 class="text-lg font-bold text-white mb-2">Modern Visual Aesthetics</h4>
        <p class="text-slate-400 text-sm">Glassmorphic cards, gradient accents, and accessible contrast engineered for high engagement.</p>
      </div>
      <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
        <div class="text-3xl mb-4">🔒</div>
        <h4 class="text-lg font-bold text-white mb-2">Production Ready</h4>
        <p class="text-slate-400 text-sm">Download as single HTML file and deploy instantly to Netlify, Vercel, or GitHub Pages.</p>
      </div>
    </div>
  </section>

  <!-- Call to action -->
  <section class="py-16 px-6 max-w-5xl mx-auto my-12 rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900/80 border border-purple-500/20 text-center">
    <h3 class="text-3xl font-bold text-white mb-4">Ready to launch your vision?</h3>
    <p class="text-slate-300 max-w-xl mx-auto mb-8 text-sm">Join thousands of creators and businesses innovating with AI today.</p>
    <button class="px-8 py-3.5 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition">Get Started Today</button>
  </section>

  <!-- Footer -->
  <footer class="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
    Generated by OmniAI Web Studio • Customize & export freely.
  </footer>
</body>
</html>`;
}
