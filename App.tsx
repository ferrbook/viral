import React, { useState } from 'react';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { AboutPage, PrivacyPage } from './components/StaticPages';
import { generateSocialContent } from './services/geminiService';
import { GeneratedContent, InputData } from './types';
import { Zap, Globe, Info, LayoutGrid, Sparkles, MoveRight, Layers, Smartphone, Bot } from 'lucide-react';

const App: React.FC = () => {
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'privacy'>('home');

  const handleGenerate = async (data: InputData) => {
    setIsGenerating(true);
    setError(null);
    
    // Smooth scroll to output
    const outputElement = document.getElementById('engine-output');
    if (outputElement) outputElement.scrollIntoView({ behavior: 'smooth' });

    try {
      const result = await generateSocialContent(data);
      setContent(result);
    } catch (err) {
      console.error(err);
      setError("We couldn't generate that content. Please check your connection or try a different input.");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderHome = () => (
      <div className="space-y-24">
        {/* Hero Section */}
        <section className="relative pt-20 pb-10 px-4">
           <div className="max-w-7xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-xs font-mono mb-8 animate-fade-in">
                 <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                 System Online: Gemini 3 Pro
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 brand-font tracking-tighter animate-fade-in">
                 Go Global. <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">
                    Go Viral.
                 </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in delay-100">
                 The ultimate content engine. Transform a single idea into 
                 <span className="text-white font-bold"> 6000+ words</span> of genius, 
                 viral threads, and video scripts instantly.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-slate-500 animate-fade-in delay-200">
                  <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" /> Multi-Platform
                  </div>
                  <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-fuchsia-400" /> AI-Powered Analysis
                  </div>
                  <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-400" /> Mobile Ready
                  </div>
              </div>
           </div>
        </section>

        {/* The Engine (Tool) */}
        <section id="engine" className="max-w-[1600px] mx-auto px-4 w-full">
            <div className="flex flex-col lg:flex-row gap-8 min-h-[800px]">
                {/* Input */}
                <div className="w-full lg:w-[450px] flex-shrink-0 flex flex-col gap-6">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-fuchsia-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <InputSection onGenerate={handleGenerate} isGenerating={isGenerating} />
                    </div>
                    
                    {error && (
                        <div className="p-4 bg-red-900/20 text-red-400 rounded-xl border border-red-500/20 text-sm flex items-center gap-2">
                        <span className="font-bold">Error:</span> {error}
                        </div>
                    )}

                    <div className="hidden lg:block p-8 bg-slate-900/50 rounded-2xl border border-slate-800">
                         <h4 className="text-white font-bold mb-4 brand-font flex items-center gap-2 text-lg">
                           <Sparkles className="w-5 h-5 text-yellow-400" /> Smart Tips
                         </h4>
                         <div className="space-y-4">
                            <TipItem title="Use Images" desc="Upload a chart or screenshot. The AI will analyze the data inside it." />
                            <TipItem title="Be Specific" desc="Type 'Write about AI' vs 'Analyze the impact of LLMs on junior devs'." />
                            <TipItem title="Get Massive" desc="We now generate 6000+ character deep-dive articles automatically." />
                         </div>
                    </div>
                </div>

                {/* Output */}
                <div id="engine-output" className="flex-1 min-w-0">
                    <OutputSection content={content} isGenerating={isGenerating} />
                </div>
            </div>
        </section>

        {/* Why Viral Section */}
        <section className="py-24 border-t border-slate-800/50 bg-slate-900/20">
             <div className="max-w-7xl mx-auto px-4">
                 <div className="text-center mb-16">
                     <h2 className="text-4xl font-bold text-white mb-4 brand-font">Why top creators choose viral.</h2>
                     <p className="text-slate-400">Stop wasting hours on formatting. Start creating influence.</p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <BenefitCard 
                        title="Massive Scale" 
                        desc="Most tools give you 500 words. We give you 6000. Dive deeper than anyone else in your niche."
                        color="bg-cyan-500"
                     />
                     <BenefitCard 
                        title="Tone Mastery" 
                        desc="Switch from a Harvard Professor to a TikTok Trendsetter with a single click. Context awareness is built-in."
                        color="bg-fuchsia-500"
                     />
                     <BenefitCard 
                        title="Visual Intelligence" 
                        desc="Don't just type. Upload. We see your images and turn pixels into persuasion instantly."
                        color="bg-emerald-500"
                     />
                 </div>
             </div>
        </section>
      </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] selection:bg-cyan-500/30">
      
      {/* Navbar */}
      <nav className="border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center text-white relative z-10 group-hover:border-cyan-500/50 transition-colors">
                    <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-tight brand-font leading-none">
                viral<span className="text-cyan-400">.</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Content Engine</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-1 bg-slate-900/50 p-1.5 rounded-full border border-slate-800 shadow-xl">
             <NavButton active={currentPage === 'home'} onClick={() => setCurrentPage('home')} icon={LayoutGrid}>Engine</NavButton>
             <NavButton active={currentPage === 'about'} onClick={() => setCurrentPage('about')} icon={Info}>About</NavButton>
          </div>

          <div className="flex items-center gap-4">
             <button className="hidden sm:flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95">
               <span>Launch App</span>
               <MoveRight className="w-3 h-3" />
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'about' && <div className="max-w-[1440px] mx-auto px-4 py-8"><AboutPage /></div>}
        {currentPage === 'privacy' && <div className="max-w-[1440px] mx-auto px-4 py-8"><PrivacyPage /></div>}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-[#020617] py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-slate-500 text-sm flex flex-col md:flex-row items-center gap-2">
             <span className="font-bold text-slate-300 text-lg">viral.</span> 
             <span className="hidden md:inline text-slate-700">|</span>
             <span>&copy; 2024 Global Content Engine. All rights reserved.</span>
           </div>
           <div className="flex items-center gap-8">
              <button onClick={() => setCurrentPage('about')} className="text-slate-500 hover:text-white text-sm transition-colors font-medium">About</button>
              <button onClick={() => setCurrentPage('privacy')} className="text-slate-500 hover:text-white text-sm transition-colors font-medium">Privacy</button>
              <button className="text-slate-500 hover:text-white text-sm transition-colors font-medium">Terms</button>
           </div>
        </div>
      </footer>

    </div>
  );
};

const NavButton = ({ active, onClick, children, icon: Icon }: any) => (
    <button 
        onClick={onClick}
        className={`
            flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all
            ${active ? 'bg-slate-800 text-white shadow-md ring-1 ring-white/10' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}
        `}
    >
        <Icon className="w-4 h-4" />
        {children}
    </button>
);

const TipItem = ({ title, desc }: { title: string, desc: string }) => (
    <div className="flex gap-3 items-start">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
        <div>
            <strong className="text-slate-200 block text-sm mb-0.5">{title}</strong>
            <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
        </div>
    </div>
);

const BenefitCard = ({ title, desc, color }: { title: string, desc: string, color: string }) => (
    <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1">
        <div className={`w-12 h-1 rounded-full ${color} mb-6`}></div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
);

export default App;