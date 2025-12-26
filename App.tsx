import React, { useState, useEffect } from 'react';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { AboutPage, PrivacyPage } from './components/StaticPages';
import { generateSocialContent } from './services/geminiService';
import { GeneratedContent, InputData } from './types';
import { 
  Zap, Globe, Info, LayoutGrid, Sparkles, MoveRight, 
  Layers, Smartphone, Bot, ChevronDown, CheckCircle2, 
  Star, Users, TrendingUp, Search
} from 'lucide-react';

const App: React.FC = () => {
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'privacy'>('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGenerate = async (data: InputData) => {
    setIsGenerating(true);
    setError(null);
    
    const outputElement = document.getElementById('engine-output');
    if (outputElement) outputElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

    try {
      const result = await generateSocialContent(data);
      setContent(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Connection error. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const scrollToEngine = () => {
    document.getElementById('engine')?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderHome = () => (
      <div className="space-y-32">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
           {/* Animated Background Elements */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
              <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
           </div>

           <div className="max-w-7xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-bold mb-8 animate-fade-in shadow-2xl backdrop-blur-md">
                 <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                 V3.0 Global Content Engine Live
              </div>
              
              <h1 className="text-7xl md:text-9xl font-bold text-white mb-10 brand-font tracking-tighter animate-fade-in leading-[0.9]">
                 Impact at <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">
                    Light Speed.
                 </span>
              </h1>
              
              <p className="text-xl md:text-3xl text-slate-400 max-w-4xl mx-auto mb-16 leading-relaxed animate-fade-in delay-100 font-light">
                 Stop manual posting. <strong>viral.</strong> analyzes your ideas and creates 
                 <span className="text-white font-medium"> 6000+ words</span> of elite articles, 
                 viral threads, and cinematic video scripts in under 10 seconds.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in delay-200">
                  <button 
                    onClick={scrollToEngine}
                    className="group relative px-10 py-5 bg-white text-slate-950 rounded-2xl font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center gap-3"
                  >
                    Start Creating
                    <MoveRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl border border-slate-800 hover:bg-slate-800 transition-all flex items-center gap-3">
                    View Demo
                  </button>
              </div>

              <div className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 text-slate-500 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                  <span className="font-bold text-lg tracking-widest">FORBES</span>
                  <span className="font-bold text-lg tracking-widest">TECHCRUNCH</span>
                  <span className="font-bold text-lg tracking-widest">WIRED</span>
                  <span className="font-bold text-lg tracking-widest">THE VERGE</span>
              </div>
           </div>

           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={scrollToEngine}>
              <ChevronDown className="w-8 h-8 text-slate-600" />
           </div>
        </section>

        {/* Dynamic Social Proof Section */}
        <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 py-10">
            <StatCard icon={Users} label="Active Creators" value="1.2M+" />
            <StatCard icon={TrendingUp} label="Total Reach" value="4.8B" />
            <StatCard icon={Search} label="SEO Ranking" value="#1 Avg" />
        </section>

        {/* The Engine (Tool) - Persuasive Anchor */}
        <section id="engine" className="max-w-[1600px] mx-auto px-4 w-full">
            <div className="mb-16 text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 brand-font">Enter the Synthesis</h2>
                <p className="text-slate-400 text-lg">Input a URL, Text, or Image. Witness the magic.</p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-10 min-h-[850px]">
                {/* Input Sidebar */}
                <div className="w-full lg:w-[480px] flex-shrink-0 flex flex-col gap-8">
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600 via-blue-500 to-fuchsia-600 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <InputSection onGenerate={handleGenerate} isGenerating={isGenerating} />
                    </div>
                    
                    {error && (
                        <div className="p-5 bg-red-950/30 text-red-400 rounded-2xl border border-red-500/20 text-sm flex flex-col gap-1 animate-fade-in shadow-2xl">
                          <span className="font-bold flex items-center gap-2">
                             <CheckCircle2 className="w-4 h-4" /> System Alert
                          </span> 
                          <p className="opacity-80">{error}</p>
                        </div>
                    )}

                    <div className="p-10 bg-slate-900/40 rounded-3xl border border-slate-800/50 backdrop-blur-sm">
                         <h4 className="text-white font-bold mb-6 brand-font flex items-center gap-3 text-2xl">
                           <Sparkles className="w-6 h-6 text-yellow-400" /> Engine Capabilities
                         </h4>
                         <div className="space-y-6">
                            <TipItem title="Massive Context" desc="Upload technical PDFs or complex data charts. Our AI extracts the core value instantly." />
                            <TipItem title="Multi-Lingual" desc="Supports 100+ languages including Arabic, English, Spanish, and French." />
                            <TipItem title="Real-Time Virality" desc="Calculates trending probability scores based on current global internet signals." />
                         </div>
                    </div>
                </div>

                {/* Results Engine */}
                <div id="engine-output" className="flex-1 min-w-0">
                    <OutputSection content={content} isGenerating={isGenerating} />
                </div>
            </div>
        </section>

        {/* Global Reach Section */}
        <section className="py-32 relative overflow-hidden bg-slate-950">
             <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
             <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 brand-font">Built for the <span className="text-cyan-400">Borderless</span> Economy.</h2>
                    <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                        In a globalized world, content needs to speak every language. <strong>viral.</strong> optimizes your messaging for cross-cultural impact, ensuring your voice is heard from Silicon Valley to Dubai.
                    </p>
                    <ul className="space-y-4">
                        <FeatureItem text="Automatic Cultural Adaptation" />
                        <FeatureItem text="Global SEO Optimization" />
                        <FeatureItem text="Universal Emotional Mapping" />
                    </ul>
                 </div>
                 <div className="relative">
                    <div className="aspect-square bg-slate-900 rounded-[3rem] border border-slate-800 flex items-center justify-center p-12 overflow-hidden shadow-2xl shadow-cyan-500/10">
                        <Globe className="w-full h-full text-slate-800 animate-[spin_60s_linear_infinite]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Zap className="w-24 h-24 text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
                        </div>
                    </div>
                 </div>
             </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-4 py-20">
             <div className="text-center mb-16">
                 <h2 className="text-4xl font-bold text-white brand-font">Trusted by Digital Nomads</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 <TestimonialCard 
                    name="Sarah Al-Mansoori" 
                    role="Tech Founder" 
                    content="The Arabic support is flawless. It turned my 10-page strategy document into a viral LinkedIn thread in seconds."
                 />
                 <TestimonialCard 
                    name="Marcus Chen" 
                    role="Content Architect" 
                    content="The 6000-character article generation is a game changer. It's not just fluff; it's high-quality, research-backed content."
                 />
                 <TestimonialCard 
                    name="Elena Rodriguez" 
                    role="CMO" 
                    content="Finally, an AI tool that understands 'Tone'. The Wise variation gives our brand a philosophical edge we couldn't find elsewhere."
                 />
             </div>
        </section>
      </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] selection:bg-cyan-500/30 text-slate-200">
      
      {/* Premium Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#020617]/90 backdrop-blur-2xl border-slate-800/80 py-4 shadow-2xl' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20 group-hover:opacity-60 transition-opacity"></div>
                <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center text-white relative z-10 group-hover:border-cyan-500/50 transition-all group-hover:rotate-12">
                    <Zap className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-3xl font-bold text-white tracking-tighter brand-font leading-none">
                viral<span className="text-cyan-400">.</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">Global Content Engine</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1.5 rounded-full border border-slate-800/50 shadow-inner backdrop-blur-md">
             <NavButton active={currentPage === 'home'} onClick={() => setCurrentPage('home')} icon={LayoutGrid}>Engine</NavButton>
             <NavButton active={currentPage === 'about'} onClick={() => setCurrentPage('about')} icon={Info}>About</NavButton>
          </div>

          <div className="flex items-center gap-4">
             <button 
                onClick={scrollToEngine}
                className="hidden sm:flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all active:scale-95 border border-cyan-400/20"
             >
               <span>Get Started</span>
               <MoveRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'about' && <div className="max-w-[1440px] mx-auto px-4 py-32"><AboutPage /></div>}
        {currentPage === 'privacy' && <div className="max-w-[1440px] mx-auto px-4 py-32"><PrivacyPage /></div>}
      </main>

      {/* Premium Footer */}
      <footer className="border-t border-slate-800/50 bg-[#020617] pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
               <div className="col-span-1 md:col-span-2">
                   <div className="flex items-center gap-3 mb-6">
                        <Zap className="w-8 h-8 text-cyan-400" />
                        <span className="text-3xl font-bold text-white brand-font">viral.</span>
                   </div>
                   <p className="text-slate-400 text-lg max-w-sm leading-relaxed mb-8">
                       Building the intelligence layer for the next generation of global creators. Harnessing AI to amplify human creativity.
                   </p>
                   <div className="flex gap-4">
                       <SocialIcon />
                       <SocialIcon />
                       <SocialIcon />
                   </div>
               </div>
               <div>
                   <h5 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Product</h5>
                   <ul className="space-y-4 text-slate-500 text-sm">
                       <li className="hover:text-cyan-400 cursor-pointer transition-colors">Content Engine</li>
                       <li className="hover:text-cyan-400 cursor-pointer transition-colors">Video Synthesis</li>
                       <li className="hover:text-cyan-400 cursor-pointer transition-colors">Tone Mapping</li>
                       <li className="hover:text-cyan-400 cursor-pointer transition-colors">API Docs</li>
                   </ul>
               </div>
               <div>
                   <h5 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Company</h5>
                   <ul className="space-y-4 text-slate-500 text-sm">
                       <li onClick={() => setCurrentPage('about')} className="hover:text-cyan-400 cursor-pointer transition-colors">About Us</li>
                       <li onClick={() => setCurrentPage('privacy')} className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy Policy</li>
                       <li className="hover:text-cyan-400 cursor-pointer transition-colors">Terms of Service</li>
                       <li className="hover:text-cyan-400 cursor-pointer transition-colors">Contact Support</li>
                   </ul>
               </div>
           </div>
           
           <div className="pt-12 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-slate-500 text-xs font-mono uppercase tracking-[0.2em]">
                &copy; 2024 viral. Global Engine. Powered by Gemini.
              </div>
              <div className="flex items-center gap-6 text-slate-400 text-sm">
                  <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      All Systems Operational
                  </div>
              </div>
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
            flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all
            ${active ? 'bg-slate-800 text-white shadow-xl ring-1 ring-white/10' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}
        `}
    >
        <Icon className="w-4 h-4" />
        {children}
    </button>
);

const TipItem = ({ title, desc }: { title: string, desc: string }) => (
    <div className="flex gap-4 items-start group">
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-cyan-500/50 transition-colors">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
            <strong className="text-slate-100 block text-base mb-1 brand-font">{title}</strong>
            <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
        </div>
    </div>
);

const FeatureItem = ({ text }: { text: string }) => (
    <li className="flex items-center gap-3 text-slate-300">
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        <span className="font-medium">{text}</span>
    </li>
);

const StatCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="p-10 rounded-3xl bg-slate-900/30 border border-slate-800/50 text-center hover:bg-slate-900/50 transition-all group">
        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <Icon className="w-8 h-8 text-cyan-400" />
        </div>
        <div className="text-4xl font-bold text-white mb-2 brand-font">{value}</div>
        <div className="text-slate-500 uppercase tracking-widest text-xs font-bold">{label}</div>
    </div>
);

const TestimonialCard = ({ name, role, content }: { name: string, role: string, content: string }) => (
    <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all relative group">
        <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
        </div>
        <p className="text-slate-300 mb-8 italic leading-relaxed text-lg">"{content}"</p>
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center font-bold text-cyan-400">
                {name[0]}
            </div>
            <div>
                <div className="text-white font-bold">{name}</div>
                <div className="text-slate-500 text-xs uppercase tracking-wider">{role}</div>
            </div>
        </div>
        <Sparkles className="absolute top-6 right-6 w-6 h-6 text-slate-800 group-hover:text-cyan-900 transition-colors" />
    </div>
);

const SocialIcon = () => (
    <div className="w-10 h-10 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-600 cursor-pointer transition-all">
        <Globe className="w-5 h-5" />
    </div>
);

export default App;