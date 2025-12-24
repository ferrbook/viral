import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight, Type, Image as ImageIcon, Link as LinkIcon, Upload, X } from 'lucide-react';
import { InputData } from '../types';

interface InputSectionProps {
  onGenerate: (data: InputData) => void;
  isGenerating: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onGenerate, isGenerating }) => {
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = () => {
    if (activeTab === 'text' && text.trim()) {
      onGenerate({ text });
    } else if (activeTab === 'image' && selectedImage) {
      onGenerate({ 
        text: text.trim() || "Describe this image in detail and create viral content from it.", 
        image: selectedImage.split(',')[1],
        mimeType
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setMimeType(file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-1 flex flex-col h-full shadow-2xl relative overflow-hidden group border border-slate-700/50">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 opacity-80"></div>
      
      <div className="p-6 flex flex-col h-full bg-slate-900/40 rounded-xl">
          <div className="flex items-center space-x-2 mb-6 bg-slate-900/50 p-1 rounded-xl w-fit border border-slate-800">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'text' ? 'bg-slate-800 text-white shadow-md ring-1 ring-slate-700' : 'text-slate-500 hover:text-white'
              }`}
            >
              <Type className="w-4 h-4" />
              Text / URL
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'image' ? 'bg-slate-800 text-white shadow-md ring-1 ring-slate-700' : 'text-slate-500 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Visual
            </button>
          </div>

          <div className="flex-1 flex flex-col">
            {activeTab === 'text' ? (
                <div className="relative flex-1 group">
                    <textarea
                    className="w-full h-full p-6 rounded-xl border border-slate-700 bg-slate-800/30 text-slate-100 placeholder-slate-500 focus:bg-slate-800/50 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none outline-none font-medium leading-relaxed text-lg"
                    placeholder="Paste article content, a news URL, or a rough idea here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isGenerating}
                    />
                    <div className="absolute bottom-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 text-xs">
                        Enter to generate
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col gap-4">
                <div 
                    className="flex-1 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400/50 hover:bg-slate-800/30 transition-all group relative overflow-hidden"
                    onClick={() => !selectedImage && fileInputRef.current?.click()}
                >
                    {selectedImage ? (
                    <div className="relative w-full h-full p-4">
                        <img src={selectedImage} alt="Upload" className="w-full h-full object-contain rounded-lg" />
                        <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                            className="absolute top-2 right-2 p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white border border-slate-700 shadow-lg"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    ) : (
                    <>
                        <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-slate-700">
                           <Upload className="w-8 h-8 text-cyan-400" />
                        </div>
                        <p className="text-slate-300 font-bold text-lg">Drop image here</p>
                        <p className="text-slate-500 text-sm mt-2">or click to browse</p>
                    </>
                    )}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
                <textarea
                    className="h-28 p-4 rounded-xl border border-slate-700 bg-slate-800/30 text-slate-100 placeholder-slate-500 focus:bg-slate-800/50 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all"
                    placeholder="Any specific context for this image?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                </div>
            )}
          </div>

          <div className="mt-8">
            <button
              onClick={handleGenerate}
              disabled={(!text.trim() && !selectedImage) || isGenerating}
              className={`
                w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white transition-all shadow-xl text-lg relative overflow-hidden
                ${(!text.trim() && !selectedImage) || isGenerating 
                  ? 'bg-slate-800 cursor-not-allowed opacity-50 border border-slate-700' 
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-[1.02] hover:shadow-cyan-500/25 border border-cyan-500/50'}
              `}
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  GO VIRAL
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-4 font-mono uppercase tracking-widest opacity-60">
               Powered by Gemini 1.5 Pro
            </p>
          </div>
      </div>
    </div>
  );
};
