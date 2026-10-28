import type { HeritageSite, ThreeDModel } from "@/types";

/** A self-hosted GLB we can render with <model-viewer> (and so place in AR). */
export function isRealModel(model: ThreeDModel): boolean {
  return model.source === "blender" || model.source === "scan";
}

export function realModels(site: HeritageSite): ThreeDModel[] {
  return (site.threeDModels ?? []).filter(isRealModel);
}

/** Guided tours pin stories to Blender geometry, so only those models get one. */
export function hasTour(site: HeritageSite): boolean {
  return realModels(site).some((m) => m.source === "blender");
}
