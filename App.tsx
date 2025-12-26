import React, { useState, useEffect } from 'react';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { AboutPage, PrivacyPage } from './components/StaticPages';
import { generateSocialContent } from './services/geminiService';
import { GeneratedContent, InputData } from './types';
import { 
  Zap, Globe, Info, LayoutGrid, Sparkles, MoveRight, 
  ChevronDown, Users, TrendingUp, Rocket, 
  BarChart4, Cpu, Code
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
      setError(err.message);
    } finally { setIsGenerating(false); }
  };

  const scrollToEngine = () => document.getElementById('engine')?.scrollIntoView({ behavior: 'smooth' });

  const renderHome = () => (
      <div className="space-y-40">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center pt-20 px-4 overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
              <div className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse"></div>
              <div className="absolute bottom-[10%] right-[5%] w-[50rem] h-[50rem] bg-fuchsia-500/10 rounded-full blur-[160px] animate-pulse delay-700"></div>
           </div>

           <div className="max-w-7xl mx-auto text-center relative z-10 py-12">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-900/60 border border-slate-800 text-cyan-400 text-sm font-bold mb-10 animate-fade-in shadow-2xl backdrop-blur-xl">
                 <Rocket className="w-4 h-4" />
                 <span>محرك التوليف الفوري: مفتوح ومجاني بالكامل</span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-bold text-white mb-10 brand-font tracking-tighter animate-fade-in leading-[0.85]">
                 اصنع تأثيرك <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 pb-2">
                    بذكاء مجاني.
                 </span>
              </h1>
              
              <p className="text-xl md:text-3xl text-slate-400 max-w-4xl mx-auto mb-16 leading-relaxed animate-fade-in delay-100 font-light px-4 text-center">
                 حول أي فكرة إلى مقالات ضخمة، منشورات فيروسية، وفيديوهات في ثوانٍ. 
                 المحرك يعمل بأحدث تقنيات الذكاء الاصطناعي التجريبية لضمان وصولك للجمهور مجاناً.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in delay-200">
                  <button onClick={scrollToEngine} className="group relative px-12 py-6 bg-white text-slate-950 rounded-2xl font-bold text-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-4">
                    ابدأ التوليف الآن
                    <MoveRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button onClick={() => setCurrentPage('about')} className="px-12 py-6 bg-slate-900/50 text-white rounded-2xl font-bold text-2xl border border-slate-800 hover:bg-slate-800 backdrop-blur-md transition-all">
                    كيف نحقق الانتشار؟
                  </button>
              </div>

              <div className="mt-24 pt-12 border-t border-slate-800/30 flex flex-wrap items-center justify-center gap-x-16 gap-y-10 text-slate-600 opacity-60">
                  <span className="font-bold text-2xl tracking-[0.2em]">FREE ACCESS</span>
                  <span className="font-bold text-2xl tracking-[0.2em]">OPEN ENGINE</span>
                  <span className="font-bold text-2xl tracking-[0.2em]">INFINITE CONTENT</span>
              </div>
           </div>

           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-40 hover:opacity-100 transition-opacity" onClick={scrollToEngine}>
              <ChevronDown className="w-10 h-10 text-slate-400" />
           </div>
        </section>

        {/* Real-time Stats */}
        <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 py-10">
            <StatCard icon={Users} label="Daily Syntheses" value="850K+" />
            <StatCard icon={BarChart4} label="Processed Data" value="Unlimited" />
            <StatCard icon={Globe} label="Supported Regions" value="Global" />
        </section>

        {/* The Engine Area */}
        <section id="engine" className="max-w-[1600px] mx-auto px-4 w-full pt-20">
            <div className="mb-20 text-center">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 brand-font">مركز التوليف</h2>
                <p className="text-slate-400 text-2xl font-light">ببساطة، أدخل موضوعك هنا وشاهد السحر.</p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12 min-h-[900px]">
                <div className="w-full lg:w-[500px] flex-shrink-0 flex flex-col gap-10">
                    <InputSection onGenerate={handleGenerate} isGenerating={isGenerating} />
                    
                    {error && (
                        <div className="p-8 bg-red-950/20 text-red-400 rounded-[2rem] border border-red-500/20 text-lg animate-fade-in">
                          <p className="font-bold mb-2">تنبيه المحرك:</p>
                          <p className="opacity-90">{error}</p>
                        </div>
                    )}

                    <div className="p-12 bg-slate-900/60 rounded-[3rem] border border-slate-800/50 backdrop-blur-2xl">
                         <h4 className="text-white font-bold mb-8 brand-font flex items-center gap-4 text-3xl">
                           <Sparkles className="w-8 h-8 text-yellow-400" /> ميزات المحرك
                         </h4>
                         <div className="space-y-8 text-right">
                            <FeatureItem title="تحليل فوري" desc="يعالج المحرك الروابط، النصوص، والصور بدقة متناهية." />
                            <FeatureItem title="محتوى ضخم" desc="توليد مقالات تتجاوز 6000 حرف بضغطة زر واحدة." />
                         </div>
                    </div>
                </div>

                <div id="engine-output" className="flex-1 min-w-0">
                    <OutputSection content={content} isGenerating={isGenerating} />
                </div>
            </div>
        </section>
      </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-200">
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 border-b ${scrolled ? 'bg-[#020617]/95 backdrop-blur-3xl border-slate-800 py-4 shadow-2xl' : 'bg-transparent border-transparent py-8'}`}>
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <Zap className="w-10 h-10 text-cyan-400 fill-cyan-400/20" />
            <div className="flex flex-col">
                <span className="text-3xl font-bold text-white tracking-tighter brand-font leading-none">viral<span className="text-cyan-400">.</span></span>
                <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-2">Open Intelligence</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-slate-900/60 p-2 rounded-full border border-slate-800/50 backdrop-blur-xl">
             <NavButton active={currentPage === 'home'} onClick={() => setCurrentPage('home')} icon={LayoutGrid}>المحرك</NavButton>
             <NavButton active={currentPage === 'about'} onClick={() => setCurrentPage('about')} icon={Info}>الفلسفة</NavButton>
          </div>

          <button onClick={scrollToEngine} className="hidden sm:flex items-center gap-3 text-base font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-4 rounded-2xl hover:shadow-cyan-500/20 transition-all active:scale-95">
             <span>بدء المحرك</span>
             <MoveRight className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'about' && <div className="max-w-[1440px] mx-auto px-4 py-40"><AboutPage /></div>}
        {currentPage === 'privacy' && <div className="max-w-[1440px] mx-auto px-4 py-40"><PrivacyPage /></div>}
      </main>

      <footer className="border-t border-slate-800 bg-[#020617] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <div className="flex items-center justify-center gap-4 mb-8">
                <Zap className="w-10 h-10 text-cyan-400" />
                <span className="text-4xl font-bold text-white brand-font">viral.</span>
           </div>
           <p className="text-slate-600 text-sm font-mono uppercase tracking-[0.3em]">
             &copy; 2024 viral. Free & Open Engine.
           </p>
        </div>
      </footer>
    </div>
  );
};

const NavButton = ({ active, onClick, children, icon: Icon }: any) => (
    <button onClick={onClick} className={`flex items-center gap-3 px-8 py-3 rounded-full text-base font-bold transition-all ${active ? 'bg-slate-800 text-white shadow-2xl' : 'text-slate-400 hover:text-white'}`}>
        <Icon className="w-5 h-5" />
        {children}
    </button>
);

const FeatureItem = ({ title, desc }: { title: string, desc: string }) => (
    <div className="flex flex-col gap-2">
        <strong className="text-slate-100 text-xl brand-font">{title}</strong>
        <p className="text-base text-slate-500 leading-relaxed">{desc}</p>
    </div>
);

const StatCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="p-12 rounded-[3rem] bg-slate-900/40 border border-slate-800 text-center hover:bg-slate-900/60 transition-all group">
        <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform">
            <Icon className="w-10 h-10 text-cyan-400" />
        </div>
        <div className="text-5xl font-bold text-white mb-3 brand-font">{value}</div>
        <div className="text-slate-500 uppercase tracking-widest text-sm font-bold">{label}</div>
    </div>
);

export default App;