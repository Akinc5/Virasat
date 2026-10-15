"use client";

import { useState, useEffect, useRef } from "react";
import { Maximize2, Minimize2, Box, Volume2, VolumeX } from "lucide-react";
import { SketchfabViewer } from "@/components/experience/SketchfabViewer";
import { cn } from "@/lib/utils";
import type { HeritageSite } from "@/types";

// Register custom HTML elements for TypeScript compilation safety
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

interface ExperienceViewerProps {
  site: HeritageSite;
  className?: string;
}

export function ExperienceViewer({ site, className }: ExperienceViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi" | "te" | "ta" | "ml">("en");

  const hasSketchfab = Boolean(site.sketchfabModelId);
  const hasModel = Boolean(
    site.threeDModels && site.threeDModels.length > 0 && site.threeDModels[0].modelUrl !== ""
  );
  const firstModel = site.threeDModels && site.threeDModels.length > 0 ? site.threeDModels[0] : null;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cancelFlag = useRef(false);

  // Load Google Model-Viewer script from CDN dynamically on client side if needed
  useEffect(() => {
    if (!hasSketchfab && hasModel) {
      const existingScript = document.querySelector('script[src*="model-viewer"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
        document.head.appendChild(script);
      }
    }
  }, [hasSketchfab, hasModel]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      stopAnyAudio();
    };
  }, []);

  // Stop audio when changing language if it's playing
  useEffect(() => {
    if (isPlayingAudio) {
      stopAnyAudio();
    }
  }, [language]);

  const stopAnyAudio = () => {
    cancelFlag.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  const playGoogleTTS = async (text: string, lang: string) => {
    cancelFlag.current = false;
    
    // Split text into chunks < 200 chars safely for all browsers
    const sentences = (text.match(/[^.।!?]+[.।!?]*/g) || [text]).map(s => s.trim()).filter(Boolean);
    const chunks: string[] = [];
    
    let currentChunk = "";
    for (const sentence of sentences) {
      if (sentence.length >= 200) {
        if (currentChunk) chunks.push(currentChunk);
        let remaining = sentence;
        while (remaining.length > 0) {
           chunks.push(remaining.substring(0, 190));
           remaining = remaining.substring(190);
        }
        currentChunk = "";
      } else if ((currentChunk + " " + sentence).length < 200) {
        currentChunk += (currentChunk ? " " : "") + sentence;
      } else {
        if (currentChunk) chunks.push(currentChunk);
        currentChunk = sentence;
      }
    }
    if (currentChunk) chunks.push(currentChunk);

    for (let i = 0; i < chunks.length; i++) {
      if (cancelFlag.current) break;
      
      const chunk = chunks[i];
      const url = `/api/tts?text=${encodeURIComponent(chunk)}&lang=${lang}`;
      
      const audio = new Audio(url);
      audioRef.current = audio;
      
      try {
        await new Promise((resolve, reject) => {
          audio.onended = resolve;
          audio.onerror = reject;
          audio.play().catch(reject);
        });
      } catch (err) {
        console.error("Audio playback failed", err);
        break;
      }
    }
    
    if (!cancelFlag.current) {
      setIsPlayingAudio(false);
    }
  };

  const toggleAudio = () => {
    const text = language === "en" ? firstModel?.audioDescriptionText : (firstModel?.audioTranslations as any)?.[language];
    if (!text) return;

    if (isPlayingAudio) {
      stopAnyAudio();
      return;
    }

    setIsPlayingAudio(true);

    const langMap = { en: "en-IN", hi: "hi-IN", te: "te-IN", ta: "ta-IN", ml: "ml-IN" };
    const bcpTag = langMap[language];
    
    if (language !== "en") {
      playGoogleTTS(text, language);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.lang = bcpTag;
    
    const voices = window.speechSynthesis.getVoices();
    const googleVoice = voices.find(v => v.name.includes("Google") && v.lang.startsWith("en"));
    if (googleVoice) utterance.voice = googleVoice;
    
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    
    window.speechSynthesis.speak(utterance);
  };

  // Render State 1: Sketchfab Embed (High-fidelity textured model)
  if (hasSketchfab) {
    return (
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden flex flex-col",
          "bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)] shadow-xl",
          isFullscreen && "fixed inset-0 z-50 rounded-none",
          className
        )}
        role="region"
        aria-label={`3D model for ${site.name}`}
      >
        <SketchfabViewer
          modelId={site.sketchfabModelId!}
          title={site.name}
          className="flex-1 min-h-[500px]"
        />

        {/* Audio Player Footer */}
        {firstModel?.audioDescriptionText && (
          <div className="bg-stone-950/80 backdrop-blur-md p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-stone-300">Narrator Language:</span>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-stone-900 border border-white/15 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="ml">മലയാളം (Malayalam)</option>
              </select>
            </div>
            
            <button 
              onClick={toggleAudio}
              className={cn(
                "px-5 py-2 rounded-full font-medium text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer",
                isPlayingAudio 
                  ? "bg-rose-600 hover:bg-rose-700 text-white" 
                  : "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/20"
              )}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX size={14} />
                  <span>Stop Narration</span>
                </>
              ) : (
                <>
                  <Volume2 size={14} />
                  <span>Play Site Audio Guide</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Render State 2: Model-Viewer (if only local GLB is available)
  if (hasModel && firstModel) {
    return (
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden flex flex-col",
          "bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)] shadow-xl",
          isFullscreen && "fixed inset-0 z-50 rounded-none",
          className
        )}
        role="region"
        aria-label={`3D viewer for ${site.name}`}
      >
        <div className="flex-1 min-h-[500px] relative bg-stone-900/60">
          <model-viewer
            src={firstModel.modelUrl}
            alt={`Interactive 3D model of ${site.name}`}
            camera-controls
            auto-rotate
            rotation-per-second="15deg"
            ar
            ar-modes="webxr scene-viewer quick-look"
            shadow-intensity="1.5"
            style={{ width: "100%", height: "100%", minHeight: "500px", display: "block" }}
          >
            <button
              slot="ar-button"
              className="absolute bottom-4 right-4 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-full font-medium text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 z-20 cursor-pointer"
            >
              <Box size={14} />
              View in AR
            </button>
          </model-viewer>

          {/* Fullscreen control */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-9 h-9 rounded-lg bg-black/60 hover:bg-black/80 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-md border border-white/10"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>

        {/* Audio Player Footer */}
        {firstModel.audioDescriptionText && (
          <div className="bg-stone-950/80 backdrop-blur-md p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-stone-300">Narrator Language:</span>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-stone-900 border border-white/15 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="ml">മലയാളം (Malayalam)</option>
              </select>
            </div>
            
            <button 
              onClick={toggleAudio}
              className={cn(
                "px-5 py-2 rounded-full font-medium text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer",
                isPlayingAudio 
                  ? "bg-rose-600 hover:bg-rose-700 text-white" 
                  : "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/20"
              )}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX size={14} />
                  <span>Stop Narration</span>
                </>
              ) : (
                <>
                  <Volume2 size={14} />
                  <span>Play Site Audio Guide</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Render State 3: Coming soon fallback
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden flex flex-col",
        "bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)]",
        isFullscreen && "fixed inset-0 z-50 rounded-none",
        className
      )}
      role="region"
      aria-label={`3D coming soon for ${site.name}`}
    >
      <div className="aspect-video relative flex flex-col items-center justify-center min-h-[450px] p-6 text-center">
        <div className="w-20 h-20 rounded-full border border-amber-500/30 flex items-center justify-center animate-pulse mb-4">
          <Box size={32} className="text-amber-500" />
        </div>
        <span className="text-xs uppercase font-semibold text-amber-500 tracking-wider mb-2">
          3D Walkthrough In Production
        </span>
        <h3 className="font-display text-2xl font-bold text-[var(--hv-text-primary)] mb-2">
          {site.name}
        </h3>
        <p className="text-sm text-[var(--hv-text-muted)] max-w-md">
          High-density photogrammetry scans are being processed for this site.
        </p>
      </div>
    </div>
  );
}
