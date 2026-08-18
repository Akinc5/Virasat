"use client";

import { RotateCcw, ZoomIn, ZoomOut, Maximize2, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface ViewerControlsProps {
  onReset?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFullscreen?: () => void;
  onScreenshot?: () => void;
  className?: string;
}

interface ControlButtonProps {
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
}

function ControlButton({ onClick, icon, label }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--hv-bg-elevated)] hover:bg-amber-500/10 border border-[var(--hv-bg-border)] hover:border-amber-500/30 text-[var(--hv-text-muted)] hover:text-amber-400 transition-all duration-200 group"
      aria-label={label}
      title={label}
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-xs">{label}</span>
    </button>
  );
}

export function ViewerControls({
  onReset,
  onZoomIn,
  onZoomOut,
  onFullscreen,
  onScreenshot,
  className,
}: ViewerControlsProps) {
  return (
    <div
      className={cn("flex flex-wrap gap-3", className)}
      role="toolbar"
      aria-label="3D viewer controls"
    >
      <ControlButton onClick={onReset} icon={<RotateCcw size={18} />} label="Reset" />
      <ControlButton onClick={onZoomIn} icon={<ZoomIn size={18} />} label="Zoom In" />
      <ControlButton onClick={onZoomOut} icon={<ZoomOut size={18} />} label="Zoom Out" />
      <ControlButton onClick={onFullscreen} icon={<Maximize2 size={18} />} label="Fullscreen" />
      <ControlButton onClick={onScreenshot} icon={<Camera size={18} />} label="Screenshot" />
    </div>
  );
}
