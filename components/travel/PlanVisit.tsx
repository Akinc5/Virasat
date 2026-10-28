"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { BedDouble, Bookmark, BookmarkCheck, CalendarDays, Clock, Compass, ExternalLink, MapPin, Navigation, Train } from "lucide-react";
import { PLACE_TYPE_LABEL, distanceKm, type VisitInfo } from "@/data/travel";
import { savedItemIds, toggleSaveItem } from "@/app/heritage/actions";
import { cn } from "@/lib/utils";

const VisitMap = dynamic(() => import("@/components/travel/VisitMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[var(--hv-bg-secondary)]" />,
});

const TIER_STYLE: Record<string, string> = {
  Luxury: "bg-[var(--hv-text-primary)] text-[var(--hv-bg-primary)]",
  Heritage: "bg-[var(--hv-gold)]/15 text-[var(--hv-gold-muted)]",
  "Mid-range": "bg-[var(--hv-blue)]/10 text-[var(--hv-blue-dark)]",
  Budget: "bg-[var(--hv-bg-secondary)] text-[var(--hv-text-secondary)]",
};

function isoDate(offsetDays: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function PlanVisit({
  siteSlug,
  siteName,
  lat,
  lng,
  info,
}: {
  siteSlug: string;
  siteName: string;
  lat: number;
  lng: number;
  info: VisitInfo;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"places" | "stays">("places");
  const [active, setActive] = useState<string | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [checkin, setCheckin] = useState(() => isoDate(14));
  const [checkout, setCheckout] = useState(() => isoDate(16));

  const places = useMemo(
    () =>
      info.places
        .map((p) => ({ ...p, km: distanceKm(lat, lng, p.lat, p.lng) }))
        .sort((a, b) => a.km - b.km),
    [info.places, lat, lng]
  );

  useEffect(() => {
    savedItemIds(siteSlug).then((ids) => setSaved(new Set(ids))).catch(() => {});
  }, [siteSlug]);

  const toggle = async (id: string) => {
    const res = await toggleSaveItem(id);
    if ("login" in res) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/heritage/${siteSlug}#plan`)}`);
      return;
    }
    setSaved((prev) => {
      const next = new Set(prev);
      if (res.saved) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const saveButton = (id: string) => {
    const on = saved.has(id);
    return (
      <button
        type="button"
        onClick={() => toggle(id)}
        aria-pressed={on}
        aria-label={on ? "Remove from my trip" : "Save to my trip"}
        title={on ? "Saved to My trip" : "Save to My trip"}
        className={cn(
          "w-8 h-8 shrink-0 rounded-full grid place-items-center border transition-colors",
          on
            ? "bg-[var(--hv-gold)]/15 border-[var(--hv-gold)] text-[var(--hv-gold-muted)]"
            : "border-[var(--hv-bg-border)] text-[var(--hv-text-muted)] hover:text-[var(--hv-text-primary)]"
        )}
      >
        {on ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Practical info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { icon: CalendarDays, label: "Best time to visit", value: info.bestTime },
          { icon: Clock, label: "Opening hours", value: info.closed ? `${info.hours}. Closed ${info.closed}.` : info.hours },
          { icon: Train, label: "Getting there", value: info.gettingThere },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] p-5">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--hv-blue)] mb-2">
              <Icon size={14} /> {label}
            </p>
            <p className="text-sm text-[var(--hv-text-secondary)] leading-relaxed">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Map */}
        <div className="lg:col-span-3 h-[360px] md:h-[520px] rounded-2xl overflow-hidden border border-[var(--hv-bg-border)] shadow-sm relative z-0">
          <VisitMap monument={{ lat, lng, name: siteName }} places={places} activeId={active} onSelect={(id) => { setTab("places"); setActive(id); }} />
        </div>

        {/* Lists */}
        <div className="lg:col-span-2 flex flex-col rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] overflow-hidden md:h-[520px]">
          <div role="tablist" className="grid grid-cols-2 p-1.5 m-3 mb-0 rounded-full bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)]">
            {([
              ["places", `Nearby (${places.length})`, Compass],
              ["stays", `Stays (${info.stays.length})`, BedDouble],
            ] as const).map(([key, label, Icon]) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={cn(
                  "flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-medium transition-colors",
                  tab === key ? "bg-[var(--hv-text-primary)] text-[var(--hv-bg-primary)]" : "text-[var(--hv-text-secondary)]"
                )}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>

          {tab === "places" ? (
            <ol className="flex-1 overflow-y-auto p-3 space-y-2">
              {places.map((p, i) => (
                <li key={p.id}>
                  <div
                    className={cn(
                      "rounded-xl border p-3.5 transition-colors cursor-pointer",
                      active === p.id ? "border-[var(--hv-gold)] bg-[var(--hv-gold)]/5" : "border-[var(--hv-bg-border)] hover:border-[var(--hv-gold)]/50"
                    )}
                    onClick={() => setActive(p.id)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 shrink-0 rounded-full grid place-items-center text-[11px] font-semibold bg-[var(--hv-gold-muted)] text-white">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm text-[var(--hv-text-primary)] leading-snug">{p.name}</p>
                        <p className="mt-0.5 text-[11px] text-[var(--hv-text-muted)]">
                          {PLACE_TYPE_LABEL[p.type]} · {p.km < 1 ? `${Math.round(p.km * 1000)} m` : `${p.km.toFixed(p.km < 10 ? 1 : 0)} km`} away
                        </p>
                        <p className="mt-1.5 text-xs text-[var(--hv-text-secondary)] leading-relaxed">{p.blurb}</p>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-[var(--hv-blue-dark)] hover:underline"
                        >
                          <Navigation size={11} /> Directions
                        </a>
                      </div>
                      <span onClick={(e) => e.stopPropagation()}>
                        {saveButton(p.id)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <label className="text-[11px] text-[var(--hv-text-muted)]">
                  Check-in
                  <input
                    type="date"
                    value={checkin}
                    min={isoDate(0)}
                    onChange={(e) => setCheckin(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[var(--hv-bg-border)] bg-[var(--hv-bg-primary)] px-2.5 py-2 text-xs text-[var(--hv-text-primary)]"
                  />
                </label>
                <label className="text-[11px] text-[var(--hv-text-muted)]">
                  Check-out
                  <input
                    type="date"
                    value={checkout}
                    min={checkin}
                    onChange={(e) => setCheckout(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[var(--hv-bg-border)] bg-[var(--hv-bg-primary)] px-2.5 py-2 text-xs text-[var(--hv-text-primary)]"
                  />
                </label>
              </div>
              {info.stays.map((s) => (
                <div key={s.id} className="rounded-xl border border-[var(--hv-bg-border)] p-3.5">
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <span className={cn("inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5", TIER_STYLE[s.tier])}>{s.tier}</span>
                      <p className="font-medium text-sm text-[var(--hv-text-primary)] leading-snug">{s.name}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[var(--hv-text-muted)]">
                        <MapPin size={10} /> {s.area}
                      </p>
                      <p className="mt-1.5 text-xs text-[var(--hv-text-secondary)] leading-relaxed">{s.blurb}</p>
                    </div>
                    {saveButton(s.id)}
                  </div>
                  <a
                    href={`/go/stay/${s.id}?checkin=${checkin}&checkout=${checkout > checkin ? checkout : ""}`}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-[#003b95] hover:bg-[#00296b] text-white text-xs font-semibold py-2.5 transition-colors"
                  >
                    Check availability on Booking.com <ExternalLink size={12} />
                  </a>
                </div>
              ))}
              <p className="text-[10px] text-[var(--hv-text-muted)] leading-relaxed px-1">
                Prices and availability are shown on Booking.com. Virasat may earn a commission at no extra cost to you.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
