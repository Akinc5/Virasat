"use client";

// ============================================================
// AtlasMap — the Leaflet map behind HeritageAtlas.
// Imported only on the client (Leaflet touches `window`).
// ============================================================

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { AtlasSite } from "@/components/home/HeritageAtlas";

const INDIA_CENTER: L.LatLngExpression = [22.6, 80.2];

function pinIcon(n: number, active: boolean) {
  return L.divIcon({
    className: "",
    html: `<div class="hv-map-pin${active ? " hv-map-pin--active" : ""}"><span>${n}</span></div>`,
    iconSize: [34, 42],
    iconAnchor: [17, 40],
    popupAnchor: [0, -38],
  });
}

function popupHtml(s: AtlasSite) {
  const chips = s.has3D
    ? `<span class="hv-map-chip">3D</span><span class="hv-map-chip">AR</span><span class="hv-map-chip">Guided tour</span>`
    : `<span class="hv-map-chip hv-map-chip--muted">3D preview</span>`;
  return `
    <div class="hv-map-popup">
      <img src="${s.heroImage}" alt="" />
      <div class="hv-map-popup__body">
        <p class="hv-map-popup__place">${s.city}, ${s.state}</p>
        <p class="hv-map-popup__title">${s.name}</p>
        <div class="hv-map-popup__chips">${chips}</div>
        <div class="hv-map-popup__links">
          <a href="/heritage/${s.slug}">Read the story</a>
          <a href="/experience/${s.slug}" class="hv-map-popup__primary">Explore in 3D →</a>
        </div>
      </div>
    </div>`;
}

export default function AtlasMap({
  sites,
  activeSlug,
  onSelect,
}: {
  sites: AtlasSite[];
  activeSlug: string | null;
  onSelect: (slug: string) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!box.current || map.current) return;
    const m = L.map(box.current, {
      center: INDIA_CENTER,
      zoom: 5,
      minZoom: 4,
      maxZoom: 12,
      scrollWheelZoom: false,
      zoomControl: true,
    });
    // OpenStreetMap's public tiles need no key but are meant for light use;
    // switch to a hosted tile provider before heavy production traffic.
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(m);
    sites.forEach((s, i) => {
      const marker = L.marker([s.latitude, s.longitude], { icon: pinIcon(i + 1, false), title: s.name })
        .addTo(m)
        .bindPopup(popupHtml(s), { maxWidth: 260, minWidth: 240, className: "hv-map-popup-wrap" });
      marker.on("click", () => onSelect(s.slug));
      markers.current[s.slug] = marker;
    });
    m.fitBounds(L.latLngBounds(sites.map((s) => [s.latitude, s.longitude])), { padding: [60, 60] });
    map.current = m;
    return () => {
      m.remove();
      map.current = null;
      markers.current = {};
    };
    // Sites are static for the lifetime of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fly to the selected site and open its card.
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    sites.forEach((s, i) => markers.current[s.slug]?.setIcon(pinIcon(i + 1, s.slug === activeSlug)));
    if (!activeSlug) return;
    const marker = markers.current[activeSlug];
    if (!marker) return;
    // Open the card once the flight ends so Leaflet can auto-pan it fully into view.
    m.once("moveend", () => marker.openPopup());
    m.flyTo(marker.getLatLng(), Math.max(m.getZoom(), 6), { duration: 0.9 });
  }, [activeSlug, sites]);

  return <div ref={box} className="h-full w-full" aria-label="Map of heritage sites in India" />;
}
