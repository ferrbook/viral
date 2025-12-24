import React from 'react';
import { Sparkles, Globe, Zap, Shield, Cpu, Share2 } from 'lucide-react';

export const AboutPage = () => (
  <div className="max-w-5xl mx-auto text-slate-300 space-y-20 py-10">
    
    {/* Hero Section of About */}
    <div className="text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
         <Sparkles className="w-4 h-4" />
         <span>The Future of Content</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold text-white brand-font tracking-tight">
        Not just an AI. <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
           A Viral Engine.
        </span>
      </h1>
      <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Welcome to <strong>viral.</strong> — the world's most advanced content synthesizer. We don't just write; we architect influence. 
        Designed for creators, brands, and thought leaders who demand perfection at scale.
      </p>
    </div>

    {/* The Philosophy Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       <FeatureCard 
          icon={Zap} 
          title="Instant Velocity" 
          description="Transform a single vague idea into a comprehensive multi-platform campaign in seconds. No writer's block, just pure speed."
       />
       <FeatureCard 
          icon={Cpu} 
          title="Gemini 3 Pro Intelligence" 
          description="Powered by Google's most advanced cognitive models. It thinks, reasons, and structures arguments before it writes a single word."
       />
       <FeatureCard 
          icon={Globe} 
          title="Global Context" 
          description="Content that transcends borders. Our engine understands cultural nuance, trending topics, and universal emotional triggers."
       />
    </div>

    {/* Deep Dive Section */}
    <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-800 bg-slate-900/40">
       <h2 className="text-3xl font-bold text-white mb-6 brand-font">How It Works</h2>
       <div className="space-y-6 text-lg leading-relaxed text-slate-400">
          <p>
             At its core, <strong>viral.</strong> utilizes a sophisticated "Thinking Process". When you submit a request—whether it's a raw image of a chart or a URL to a breaking news story—our system engages in a deep cognitive analysis.
          </p>
          <p>
             It decomposes the input into core facts, emotional hooks, and logical arguments. Then, it reconstructs this data into four distinct artifacts:
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-cyan-500">
             <li><strong className="text-white">The Viral Tweet:</strong> Optimized for high-velocity sharing and "stop-scrolling" impact.</li>
             <li><strong className="text-white">The LinkedIn Authority:</strong> Structured to build professional credibility and thought leadership.</li>
             <li><strong className="text-white">The Deep Article:</strong> A massive 6000+ character essay that dominates SEO and provides exhaustive value.</li>
             <li><strong className="text-white">The Video Script:</strong> A scene-by-scene director's cut for TikTok and Reels.</li>
          </ul>
       </div>
    </div>

    <div className="text-center pt-10 border-t border-slate-800/50">
       <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Built for the bold. Designed for you.</p>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all group">
     <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-cyan-400" />
     </div>
     <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
     <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export const PrivacyPage = () => (
  <div className="glass-panel p-10 rounded-2xl max-w-4xl mx-auto text-slate-300">
    <div className="flex items-center gap-4 mb-8">
       <div className="w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center border border-emerald-500/20">
          <Shield className="w-6 h-6 text-emerald-400" />
       </div>
       <h1 className="text-3xl font-bold text-white brand-font">Privacy & Data Security</h1>
    </div>
    
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
           <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
           1. Zero-Retention Policy
        </h2>
        <p className="leading-relaxed bg-slate-900/50 p-6 rounded-xl border border-slate-800">
          We operate on a strict "process and forget" basis. When you send text or images to <strong>viral.</strong>, they are transmitted securely to the Gemini API for processing. Once the response is generated, your original input is discarded from our application state. We do not maintain a database of user inputs.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
           <span className="w-1.5 h-6 bg-fuchsia-500 rounded-full"></span>
           2. Intellectual Property
        </h2>
        <p className="leading-relaxed bg-slate-900/50 p-6 rounded-xl border border-slate-800">
          You own 100% of the content generated. Whether it's a 6000-character article or a 5-second video hook, the output is yours to publish, monetize, and distribute. We claim no ownership over the AI-generated results.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
           <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
           3. Third-Party Processing
        </h2>
        <p className="leading-relaxed bg-slate-900/50 p-6 rounded-xl border border-slate-800">
          Our intelligence layer is powered by Google's Gemini models. By using this service, you acknowledge that data processing occurs on Google Cloud infrastructure, adhering to their enterprise-grade security standards.
        </p>
      </section>
    </div>
  </div>
);