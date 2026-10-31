"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Box, Volume2, VolumeX } from "lucide-react";
import { SketchfabViewer } from "@/components/experience/SketchfabViewer";
import { ModelViewer } from "@/components/experience/ModelViewer";
import { TourRail, TourStoryCard } from "@/components/experience/TourPanel";
import { MONUMENT_HOTSPOTS } from "@/data/monument-hotspots";
import { cn } from "@/lib/utils";
import { realModels } from "@/lib/models";
import type { HeritageSite, ThreeDModel } from "@/types";

type Language = "en" | "hi" | "te" | "ta" | "ml";
type TranslatedLanguage = keyof NonNullable<ThreeDModel["audioTranslations"]>;

// One entry per thing the visitor can switch between on the viewer
type ViewOption = { key: string; label: string; model: ThreeDModel | null };

interface ExperienceViewerProps {
  site: HeritageSite;
  className?: string;
}

export function ExperienceViewer({ site, className }: ExperienceViewerProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [language, setLanguage] = useState<Language>("en");

  // Narration lives on the site's first model entry, whichever view is shown
  const firstModel = site.threeDModels && site.threeDModels.length > 0 ? site.threeDModels[0] : null;

  // ── Model switcher: our GLBs first, then the original Sketchfab embed ──
  const views = useMemo<ViewOption[]>(() => {
    const own = realModels(site).map((m) => ({
      key: m.id,
      label: m.label ?? (m.source === "blender" ? "Virasat model" : "3D scan"),
      model: m,
    }));
    return site.sketchfabModelId ? [...own, { key: "sketchfab", label: "Sketchfab", model: null }] : own;
  }, [site]);
  const [viewKey, setViewKey] = useState<string | null>(null);
  const view = views.find((v) => v.key === viewKey) ?? views[0] ?? null;
  const shownModel = view?.model ?? null;
  const useBlenderModel = shownModel?.source === "blender";

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cancelFlag = useRef(false);

  // ── Guided tour: stops are the hotspots that exist on this 3D model ──
  const stops = useMemo(
    () => (useBlenderModel ? (MONUMENT_HOTSPOTS[site.slug] ?? []).filter((h) => h.onModel !== false) : []),
    [site.slug, useBlenderModel]
  );
  const [stopIndex, setStopIndex] = useState<number | null>(null);
  const [touring, setTouring] = useState(false);
  // Landmarks speak by default; the speaker button in the tour rail mutes them
  const [narrateTour, setNarrateTour] = useState(true);
  const activeStop = stopIndex !== null ? stops[stopIndex] : null;

  const speakStop = useCallback((text: string, onEnd?: () => void) => {
    if (!("speechSynthesis" in window)) return null;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-IN";
    u.rate = 0.95;
    const voice = window.speechSynthesis
      .getVoices()
      .find((v) => v.lang === "en-IN" || (v.name.includes("Google") && v.lang.startsWith("en")));
    if (voice) u.voice = voice;
    if (onEnd) u.onend = onEnd;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    return u;
  }, []);

  // Clicking a landmark (pin, rail chip or story-card arrow) flies the camera
  // to it and, unless muted, reads its description aloud. During autoplay
  // the tour effect below does the narrating instead.
  const selectStop = useCallback(
    (i: number | null) => {
      window.speechSynthesis?.cancel();
      setStopIndex(i);
      if (i === null) {
        setTouring(false);
        return;
      }
      const stop = stops[i];
      if (stop && narrateTour && !touring) speakStop(`${stop.title}. ${stop.explanation}`);
    },
    [stops, narrateTour, touring, speakStop]
  );

  const toggleNarration = () => {
    if (narrateTour) window.speechSynthesis?.cancel();
    else if (activeStop) speakStop(`${activeStop.title}. ${activeStop.explanation}`);
    setNarrateTour((n) => !n);
  };

  const toggleTour = () => {
    if (touring) {
      window.speechSynthesis?.cancel();
      setTouring(false);
    } else {
      setTouring(true);
      if (stopIndex === null) setStopIndex(0);
    }
  };

  const switchView = (key: string) => {
    selectStop(null);
    setViewKey(key);
  };

  // Autoplay: narrate the stop (advance when speech ends) or advance on a reading timer.
  useEffect(() => {
    if (!touring || !activeStop || stopIndex === null) return;
    const next = () => {
      if (stopIndex < stops.length - 1) {
        setStopIndex(stopIndex + 1);
      } else {
        setStopIndex(null);
        setTouring(false);
      }
    };
    if (narrateTour && "speechSynthesis" in window) {
      const u = speakStop(`${activeStop.title}. ${activeStop.explanation}`, () => setTimeout(next, 1200));
      return () => {
        if (u) u.onend = null;
        window.speechSynthesis.cancel();
      };
    }
    const words = `${activeStop.explanation} ${activeStop.trivia}`.split(/\s+/).length;
    const t = setTimeout(next, Math.max(9000, (words / 3.2) * 1000));
    return () => clearTimeout(t);
  }, [touring, activeStop, stopIndex, narrateTour, stops.length, speakStop]);

  const stopAnyAudio = useCallback(() => {
    cancelFlag.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  }, []);

  // Cleanup speech synthesis on unmount
  useEffect(() => stopAnyAudio, [stopAnyAudio]);

  const changeLanguage = (next: Language) => {
    // Stop the current narration rather than finishing it in the old language
    if (isPlayingAudio) stopAnyAudio();
    setLanguage(next);
  };

  const playGoogleTTS = async (text: string, lang: string) => {
    cancelFlag.current = false;

    // Split text into chunks < 200 chars safely for all browsers
    const sentences = (text.match(/[^.।!?]+[.।!?]*/g) || [text]).map((s) => s.trim()).filter(Boolean);
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
    const text =
      language === "en"
        ? firstModel?.audioDescriptionText
        : firstModel?.audioTranslations?.[language as TranslatedLanguage];
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
    const googleVoice = voices.find((v) => v.name.includes("Google") && v.lang.startsWith("en"));
    if (googleVoice) utterance.voice = googleVoice;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const viewer = shownModel ? (
    <div className="relative flex-1 flex flex-col">
      <ModelViewer
        key={shownModel.id}
        src={shownModel.modelUrl}
        title={site.name}
        scale={shownModel.displayScale}
        poster={shownModel.thumbnailUrl}
        orbit={shownModel.cameraOrbit}
        exposure={shownModel.exposure}
        shadowIntensity={shownModel.shadowIntensity}
        credit={null}
        className="flex-1 min-h-[520px] rounded-none border-0"
        hotspots={stops.map((h) => ({ id: h.id, label: h.title.replace(/\s*\(.*\)$/, ""), position: h.position, normal: h.normal }))}
        activeHotspot={activeStop?.id ?? null}
        onHotspotClick={(id) => selectStop(stops.findIndex((h) => h.id === id))}
        focus={activeStop ? { target: activeStop.cameraTarget, orbit: activeStop.cameraOrbit } : null}
      />
      {activeStop && stopIndex !== null && (
        <TourStoryCard stop={activeStop} index={stopIndex} total={stops.length} onSelect={selectStop} />
      )}
      {stops.length > 0 && (
        <TourRail
          stops={stops}
          activeIndex={stopIndex}
          playing={touring}
          narrate={narrateTour}
          onSelect={selectStop}
          onTogglePlay={toggleTour}
          onToggleNarrate={toggleNarration}
        />
      )}
    </div>
  ) : view && site.sketchfabModelId ? (
    <SketchfabViewer
      modelId={site.sketchfabModelId}
      title={site.name}
      className="flex-1 min-h-[520px] rounded-none border-0"
    />
  ) : null;

  if (viewer) {
    return (
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden flex flex-col",
          "bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)] shadow-xl",
          className
        )}
        role="region"
        aria-label={`3D model for ${site.name}`}
      >
        {/* Model switcher + attribution, above the canvas so nothing covers the model */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 bg-[var(--hv-bg-card)] border-b border-[var(--hv-bg-border)]">
          {views.length > 1 ? (
            <div
              role="tablist"
              aria-label="Choose a 3D model"
              className="inline-flex max-w-full overflow-x-auto [scrollbar-width:none] p-1 rounded-full bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)]"
            >
              {views.map((v) => (
                <button
                  key={v.key}
                  role="tab"
                  aria-selected={v.key === view?.key}
                  onClick={() => switchView(v.key)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap",
                    v.key === view?.key
                      ? "bg-[var(--hv-text-primary)] text-[var(--hv-bg-primary)] shadow-sm"
                      : "text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)]"
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          ) : (
            <span className="text-xs font-medium text-[var(--hv-text-secondary)]">{view?.label}</span>
          )}
          <p className="text-[11px] leading-relaxed text-[var(--hv-text-muted)] min-w-0">
            {shownModel ? (
              "Prepared in Blender by Virasat"
            ) : (
              "Original model, hosted on Sketchfab"
            )}
          </p>
        </div>

        {viewer}

        {/* Audio Player Footer */}
        {firstModel?.audioDescriptionText && (
          <div className="bg-stone-950/80 backdrop-blur-md p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-stone-300">Narrator Language:</span>
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value as Language)}
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
