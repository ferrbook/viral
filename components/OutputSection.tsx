import React, { useState, useEffect } from 'react';
import { Platform, GeneratedContent, Tone } from '../types';
import { PLATFORM_CONFIG } from '../constants';
import { Copy, Check, PlayCircle, Loader2, Link as LinkIcon, Hash, BarChart3, Edit3, Share2 } from 'lucide-react';
import { generateVeoVideo } from '../services/geminiService';
import { ViralityChart } from './ViralityChart';

interface OutputSectionProps {
  content: GeneratedContent | null;
  isGenerating: boolean;
}

const AdPlaceholder = ({ label }: { label?: string }) => (
  <div className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex flex-col items-center justify-center my-4 relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]"></div>
    <div className="absolute top-2 right-2 text-[10px] text-slate-600 border border-slate-700 px-1.5 rounded uppercase tracking-wider">Ad</div>
    <span className="text-slate-500 text-sm font-mono mb-1">Google Ads Space</span>
    <span className="text-slate-600 text-xs">{label || "Responsive Display Ad"}</span>
  </div>
);

export const OutputSection: React.FC<OutputSectionProps> = ({ content, isGenerating }) => {
  const [activePlatform, setActivePlatform] = useState<Platform>(Platform.Twitter);
  const [activeTone, setActiveTone] = useState<Tone>(Tone.Formal);
  const [editedContent, setEditedContent] = useState<GeneratedContent | null>(null);
  
  const [copied, setCopied] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);

  useEffect(() => {
    if (content) {
        setEditedContent(content);
        setVideoUrl(null); // Reset video when new content arrives
    }
  }, [content]);

  // Safe generation check
  if (isGenerating) {
    return (
      <div className="glass-panel h-full min-h-[600px] flex flex-col items-center justify-center rounded-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent"></div>
        <div className="relative z-10">
          <div className="w-24 h-24 relative mb-8">
             <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
             <div className="absolute inset-0 border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
             <SparklesIcon className="w-10 h-10 text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2 brand-font">Crafting Viral Content</h3>
          <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
            Our AI is analyzing patterns, optimizing for engagement, and generating multi-tone variations just for you.
          </p>
        </div>
      </div>
    );
  }

  // Safe empty state check
  if (!editedContent) {
    return (
      <div className="glass-panel h-full min-h-[600px] flex flex-col items-center justify-center rounded-2xl p-12 text-center border-2 border-dashed border-slate-800 bg-slate-900/20">
        <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-black/50 border border-slate-800 group hover:scale-105 transition-transform duration-500">
           <div className="text-6xl group-hover:animate-bounce">🚀</div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-4 brand-font">Ready for Impact?</h3>
        <p className="text-slate-400 max-w-lg mx-auto text-lg leading-relaxed mb-8">
          Enter your topic, link, or upload an image on the left. We'll generate optimized content for <span className="text-cyan-400">Twitter, LinkedIn, Facebook</span>, and even a <span className="text-fuchsia-400">Video Script</span>.
        </p>
        <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700"></div>
            <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700"></div>
            <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700"></div>
        </div>
      </div>
    );
  }

  const currentData = activePlatform === Platform.Article 
    ? null 
    : editedContent.variations[activeTone];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditorChange = (value: string, index?: number) => {
    if (!editedContent) return;
    const newContent = { ...editedContent };

    if (activePlatform === Platform.Article) {
        newContent.longArticle = value;
    } else {
        const toneData = { ...newContent.variations[activeTone] };
        
        if (activePlatform === Platform.Twitter && index !== undefined) {
             const newThread = [...toneData.twitterThread];
             newThread[index] = value;
             toneData.twitterThread = newThread;
        } else if (activePlatform === Platform.LinkedIn) {
            toneData.linkedInPost = value;
        } else if (activePlatform === Platform.Facebook) {
            toneData.facebookPost = value;
        } else if (activePlatform === Platform.Video) {
             if (index === 0) toneData.videoScript.hook = value;
             if (index === 1) toneData.videoScript.body = value;
        }
        newContent.variations[activeTone] = toneData;
    }
    setEditedContent(newContent);
  };

  const renderEditorTools = () => (
    <div className="flex flex-wrap gap-2 mb-4 pb-2 border-b border-slate-800/50">
      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-md text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700">
        <LinkIcon className="w-3 h-3" /> Insert Link
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-md text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700">
        <Hash className="w-3 h-3" /> Auto Hashtags
      </button>
      <div className="w-px h-6 bg-slate-800 mx-1"></div>
      <span className="text-xs text-slate-500 flex items-center">Keywords:</span>
      {editedContent.suggestedKeywords.slice(0, 3).map((k, i) => (
         <span key={i} className="px-2 py-1 bg-slate-900/50 text-cyan-500 text-[10px] font-mono rounded border border-slate-800 whitespace-nowrap">
            {k}
         </span>
      ))}
    </div>
  );

  const renderMainContent = () => {
    if (activePlatform === Platform.Article) {
      return (
        <div className="space-y-4 animate-fade-in">
            {renderEditorTools()}
            <div className="relative group">
                <textarea 
                    className="w-full h-[600px] bg-slate-900/30 p-8 rounded-xl border border-slate-800 text-slate-300 leading-8 focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none resize-none font-serif text-lg transition-all"
                    value={editedContent.longArticle}
                    onChange={(e) => handleEditorChange(e.target.value)}
                />
                <div className="absolute bottom-4 right-4 text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    {editedContent.longArticle.length} characters
                </div>
            </div>
        </div>
      );
    }

    if (!currentData) return null;

    return (
      <div className="space-y-6 animate-fade-in">
        {renderEditorTools()}
        
        {activePlatform === Platform.Twitter && (
          <div className="space-y-6 relative">
             <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800"></div>
            {currentData.twitterThread.map((tweet, i) => (
              <div key={i} className="relative pl-12 group">
                 <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-cyan-400 font-bold text-xs shadow-lg z-10 group-hover:scale-110 transition-transform">
                   {i + 1}
                 </div>
                 <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600 transition-all">
                    <textarea
                        className="w-full bg-transparent border-none focus:ring-0 text-slate-200 resize-none h-auto overflow-hidden leading-relaxed"
                        rows={tweet.length > 140 ? 4 : 2}
                        value={tweet}
                        onChange={(e) => handleEditorChange(e.target.value, i)}
                    />
                 </div>
              </div>
            ))}
          </div>
        )}

        {(activePlatform === Platform.LinkedIn || activePlatform === Platform.Facebook) && (
             <div className="relative">
                 <textarea
                    className="w-full h-[500px] bg-slate-800/40 p-6 rounded-xl border border-slate-700/50 text-slate-200 leading-relaxed focus:ring-1 focus:ring-cyan-500/50 outline-none resize-none font-sans"
                    value={activePlatform === Platform.LinkedIn ? currentData.linkedInPost : currentData.facebookPost}
                    onChange={(e) => handleEditorChange(e.target.value)}
                 />
                 <div className="absolute top-4 right-4 opacity-50 hover:opacity-100 cursor-pointer">
                    <Edit3 className="w-4 h-4 text-slate-400" />
                 </div>
             </div>
        )}

        {activePlatform === Platform.Video && (
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                    <div className="p-5 rounded-xl bg-gradient-to-r from-fuchsia-900/10 to-transparent border border-fuchsia-500/20">
                        <label className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                             Hook (0-3s)
                        </label>
                        <textarea 
                            className="w-full bg-transparent text-white border-none focus:ring-0 p-0 resize-none font-bold text-xl leading-tight"
                            rows={2}
                            value={currentData.videoScript.hook}
                            onChange={(e) => handleEditorChange(e.target.value, 0)}
                        />
                    </div>
                    <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Script Body</label>
                         <textarea 
                            className="w-full bg-transparent text-slate-300 border-none focus:ring-0 p-0 resize-none h-48 leading-relaxed text-lg"
                            value={currentData.videoScript.body}
                            onChange={(e) => handleEditorChange(e.target.value, 1)}
                        />
                    </div>
                    <div className="p-4 rounded-xl bg-indigo-900/10 border border-indigo-500/20 flex gap-4 items-start">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                            <PlayCircle className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 block">Visual Direction</label>
                            <p className="text-sm text-slate-400 italic leading-relaxed">{currentData.videoScript.visualCues}</p>
                        </div>
                    </div>
                </div>

                 {/* Video Generation Button */}
                <div className="mt-8 pt-6 border-t border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="text-base font-semibold text-white">Preview AI Video</h4>
                            <p className="text-xs text-slate-500">Powered by Google Veo (720p)</p>
                        </div>
                        {!videoUrl && (
                        <button 
                            onClick={async () => {
                                setIsVideoGenerating(true);
                                try {
                                    const prompt = `Vertical video. ${currentData.videoScript.visualCues}. ${currentData.videoScript.hook}`;
                                    const url = await generateVeoVideo(prompt);
                                    setVideoUrl(url);
                                } catch(e) { console.error(e); }
                                finally { setIsVideoGenerating(false); }
                            }}
                            disabled={isVideoGenerating}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all active:scale-95 disabled:opacity-50 font-bold text-sm"
                        >
                            {isVideoGenerating ? <Loader2 className="w-4 h-4 animate-spin"/> : <PlayCircle className="w-4 h-4" />}
                            Generate Video
                        </button>
                        )}
                    </div>
                    {videoUrl && (
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-black aspect-[9/16] max-w-[280px] mx-auto group">
                            <video controls className="w-full h-full object-cover" src={videoUrl} autoPlay loop muted />
                            <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">AI Generated</div>
                        </div>
                    )}
                </div>
            </div>
        )}
      </div>
    );
  };

  const getCopyText = () => {
      if (activePlatform === Platform.Article) return editedContent.longArticle;
      if (!currentData) return "";
      switch (activePlatform) {
        case Platform.Twitter: return currentData.twitterThread.join('\n\n');
        case Platform.LinkedIn: return currentData.linkedInPost;
        case Platform.Facebook: return currentData.facebookPost;
        case Platform.Video: return `${currentData.videoScript.hook}\n${currentData.videoScript.body}\n${currentData.videoScript.callToAction}`;
        default: return "";
      }
  };

  return (
    <div className="glass-panel rounded-2xl shadow-2xl flex flex-col h-full overflow-hidden border-t-4 border-t-cyan-500">
      {/* Header & Tabs */}
      <div className="border-b border-slate-800 bg-slate-950/30">
        <div className="flex overflow-x-auto no-scrollbar p-1 gap-1 m-2 bg-slate-900/50 rounded-xl border border-slate-800/50">
          {Object.values(Platform).map((platform) => {
            const config = PLATFORM_CONFIG[platform];
            // Safety check for undefined config
            if (!config) return null;

            const isActive = activePlatform === platform;
            const Icon = config.icon;
            
            return (
              <button
                key={platform}
                onClick={() => setActivePlatform(platform)}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-semibold text-sm transition-all whitespace-nowrap min-w-[100px]
                  ${isActive 
                    ? `bg-slate-800 text-white shadow-lg ring-1 ring-white/10` 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? config.color : 'text-slate-600'}`} />
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tone & Chart Toggle Area */}
      {activePlatform !== Platform.Article && (
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/20 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                {Object.values(Tone).map(tone => (
                    <button
                        key={tone}
                        onClick={() => setActiveTone(tone)}
                        className={`text-xs uppercase tracking-wider font-bold px-4 py-1.5 rounded-md transition-all ${
                            activeTone === tone 
                            ? 'bg-slate-700 text-white shadow-sm' 
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        {tone}
                    </button>
                ))}
            </div>
            {/* Mini Stat */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
               <BarChart3 className="w-3 h-3" />
               <span>Viral Score: </span>
               <span className="text-emerald-400 font-bold">{Math.round((editedContent.viralityScore.emotion + editedContent.viralityScore.trendiness + editedContent.viralityScore.logic) / 3)}/100</span>
            </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-slate-900/10">
         <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 brand-font">
                {activePlatform === Platform.Article ? 'Long-Form Article' : `${activeTone} Variation`}
                </h3>
                <div className="flex items-center gap-2">
                <button
                    onClick={() => handleCopy(getCopyText())}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700 shadow-lg"
                >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy'}
                </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Text Content */}
                <div className="lg:col-span-2 order-2 lg:order-1">
                    {renderMainContent()}
                </div>

                {/* Sidebar: Stats & Ads */}
                <div className="order-1 lg:order-2 space-y-6">
                    <ViralityChart score={editedContent.viralityScore} />
                    
                    <AdPlaceholder label="Square Ad (300x250)" />
                    
                    <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                        <h5 className="text-xs font-bold text-slate-400 uppercase mb-3">Hashtags</h5>
                        <div className="flex flex-wrap gap-2">
                            {editedContent.suggestedHashtags.map((tag, i) => (
                                <span key={i} className="text-xs text-cyan-400 bg-cyan-900/10 px-2 py-1 rounded border border-cyan-900/20 cursor-pointer hover:bg-cyan-900/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <AdPlaceholder label="Leaderboard Ad (728x90)" />
         </div>
      </div>
    </div>
  );
};

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);
