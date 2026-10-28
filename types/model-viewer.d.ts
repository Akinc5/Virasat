import * as React from "react";

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        ar?: boolean;
        "ar-modes"?: string;
        "auto-rotate"?: boolean;
        "camera-controls"?: boolean;
        "camera-orbit"?: string;
        "camera-target"?: string;
        "field-of-view"?: string;
        "shadow-intensity"?: string;
        "rotation-per-second"?: string;
        "interpolation-decay"?: string;
        poster?: string;
        style?: React.CSSProperties;
        [key: string]: unknown;
      };
    }
  }

  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        ar?: boolean;
        "ar-modes"?: string;
        "auto-rotate"?: boolean;
        "camera-controls"?: boolean;
        "camera-orbit"?: string;
        "camera-target"?: string;
        "field-of-view"?: string;
        "shadow-intensity"?: string;
        "rotation-per-second"?: string;
        "interpolation-decay"?: string;
        poster?: string;
        style?: React.CSSProperties;
        [key: string]: unknown;
      };
    }
  }
}
