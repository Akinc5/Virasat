"use client";

// ============================================================
// ExperienceViewer — 3D Model Viewer
//
// Renders a real Sketchfab embed when site.sketchfabModelId is set,
// otherwise shows the animated placeholder.
//
// TO ADD A NATIVE 3D EXPERIENCE (Three.js):
//  1. Install: npm install three @react-three/fiber @react-three/drei
//  2. Replace the SketchfabViewer below with a <Canvas> component
//  3. Load your .glb model using useGLTF from @react-three/drei
// ============================================================

import { useState, useEffect, useRef } from "react";
import { Maximize2, Minimize2, RotateCcw, Info } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";
import { SketchfabViewer } from "@/components/experience/SketchfabViewer";
import { cn } from "@/lib/utils";
import type { HeritageSite } from "@/types";

interface ExperienceViewerProps {
  site: HeritageSite;
  className?: string;
}

export function ExperienceViewer({ site, className }: ExperienceViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi" | "te" | "ta" | "ml">("en");

  const hasSketchfab = Boolean(site.sketchfabModelId);
  const hasModel = site.threeDModels && site.threeDModels.length > 0;
  const firstModel = hasModel ? site.threeDModels![0] : null;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cancelFlag = useRef(false);

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
      // Use our local API proxy to completely bypass browser CORS/CORB restrictions
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
    
    // Always use Cloud Google TTS for Indian languages to guarantee playback
    // since many devices lack local Telugu, Tamil, Malayalam voices.
    if (language !== "en") {
      playGoogleTTS(text, language);
      return;
    }

    // Fallback to local SpeechSynthesis for English
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

  // ── Real Sketchfab embed ──────────────────────────────────
  if (hasSketchfab) {
    return (
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden flex flex-col",
          "bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)]",
          isFullscreen && "fixed inset-0 z-50 rounded-none",
          className
        )}
      >
        <SketchfabViewer
          modelId={site.sketchfabModelId!}
          title={site.name}
          className="flex-1 min-h-[400px]"
        />
        
        {firstModel?.audioDescriptionText && (
          <div className="bg-black/20 p-4 border-t border-[var(--hv-bg-border)] flex flex-col sm:flex-row items-center justify-center gap-4 mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[var(--hv-text-primary)]">Language:</span>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)] rounded-md px-2 py-1 text-sm text-[var(--hv-text-primary)] focus:outline-none focus:border-amber-500"
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
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors font-medium text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              {isPlayingAudio ? "Stop Audio" : "Play Description"}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── Placeholder for sites without a model ────────────────
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)]",
        isFullscreen && "fixed inset-0 z-50 rounded-none",
        className
      )}
      role="region"
      aria-label={`3D viewer for ${site.name}`}
    >
      {/* Viewer Area */}
      <div className="aspect-video relative flex items-center justify-center min-h-[400px]">
        {isLoading ? (
          <Spinner size="lg" label="Loading 3D model…" />
        ) : (
          <>
            {/* ── REPLACE THIS SECTION WITH <Canvas> FOR REAL 3D ── */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(212,160,23,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.4) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
                aria-hidden="true"
              />

              {/* Rotating placeholder object */}
              <div className="relative">
                <div
                  className="w-40 h-40 rounded-full border-2 border-amber-500/30 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="w-28 h-28 rounded-full border-2 border-amber-500/50 flex items-center justify-center animate-spin"
                    style={{ animationDuration: "8s" }}>
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40" />
                  </div>
                </div>
                {/* Orbit ring */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-amber-500/20 animate-spin"
                  style={{ animationDuration: "12s", animationDirection: "reverse" }}
                  aria-hidden="true"
                />
              </div>

              <div className="mt-8 text-center z-10">
                <p className="font-display text-xl font-semibold text-[var(--hv-text-primary)] mb-2">
                  {site.name}
                </p>
                <p className="text-sm text-[var(--hv-text-muted)] mb-1">
                  3D model not yet available for this site
                </p>
                <p className="text-xs text-amber-500/70 font-mono">
                  {/* Extension point marker for developers */}
                  {"/* Three.js Canvas goes here */"}
                </p>
              </div>
            </div>
            {/* ── END PLACEHOLDER ── */}
          </>
        )}

        {/* Top Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-9 h-9 rounded-lg glass-card hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            onClick={() => setIsLoading(true)}
            className="w-9 h-9 rounded-lg glass-card hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
            aria-label="Reset view"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Info badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 glass-card px-3 py-1.5 rounded-lg">
          <Info size={13} className="text-amber-400" />
          <span className="text-xs text-[var(--hv-text-muted)]">
            3D experience placeholder — see README for integration guide
          </span>
        </div>
      </div>

      {firstModel?.audioDescriptionText && (
        <div className="bg-black/20 p-4 border-t border-[var(--hv-bg-border)] flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[var(--hv-text-primary)]">Language:</span>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)] rounded-md px-2 py-1 text-sm text-[var(--hv-text-primary)] focus:outline-none focus:border-amber-500"
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
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors font-medium text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            {isPlayingAudio ? "Stop Audio" : "Play Description"}
          </button>
        </div>
      )}
    </div>
  );
}

