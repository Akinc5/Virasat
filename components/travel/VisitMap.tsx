"use client";

// Leaflet map of a monument and the places around it (client only).

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { NearbyPlace } from "@/data/travel";

export interface MapPoint {
  lat: number;
  lng: number;
  name: string;
}

function icon(label: string, kind: "home" | "place", active: boolean) {
  return L.divIcon({
    className: "",
    html: `<div class="hv-map-pin${kind === "home" ? " hv-map-pin--home" : ""}${active ? " hv-map-pin--active" : ""}"><span>${label}</span></div>`,
    iconSize: [34, 42],
    iconAnchor: [17, 40],
    popupAnchor: [0, -38],
  });
}

export default function VisitMap({
  monument,
  places,
  activeId,
  onSelect,
}: {
  monument: MapPoint;
  places: NearbyPlace[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!box.current || map.current) return;
    const m = L.map(box.current, { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(m);
    L.marker([monument.lat, monument.lng], { icon: icon("★", "home", false), title: monument.name, zIndexOffset: 1000 })
      .addTo(m)
      .bindPopup(`<strong>${monument.name}</strong>`);
    places.forEach((p, i) => {
      const mk = L.marker([p.lat, p.lng], { icon: icon(String(i + 1), "place", false), title: p.name })
        .addTo(m)
        .bindPopup(`<strong>${p.name}</strong>`);
      mk.on("click", () => onSelect(p.id));
      markers.current[p.id] = mk;
    });
    const pts = [[monument.lat, monument.lng] as L.LatLngTuple, ...places.map((p) => [p.lat, p.lng] as L.LatLngTuple)];
    m.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 14 });
    map.current = m;
    return () => {
      m.remove();
      map.current = null;
      markers.current = {};
    };
    // Points are fixed for the page's lifetime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const m = map.current;
    if (!m) return;
    places.forEach((p, i) => markers.current[p.id]?.setIcon(icon(String(i + 1), "place", p.id === activeId)));
    const mk = activeId ? markers.current[activeId] : null;
    if (!mk) return;
    m.once("moveend", () => mk.openPopup());
    m.flyTo(mk.getLatLng(), Math.max(m.getZoom(), 13), { duration: 0.8 });
  }, [activeId, places]);

  return <div ref={box} className="h-full w-full" aria-label={`Map of places near ${monument.name}`} />;
}
