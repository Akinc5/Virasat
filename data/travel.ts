// ============================================================
// Visit planner data: places worth seeing near each monument and
// places to stay. Coordinates are approximate (to ~100 m) and are
// used for the map and straight-line distances.
//
// Stays are well-known properties; prices change daily, so Virasat
// never shows prices — the "Check availability" button opens a
// Booking.com search (with our affiliate id when configured).
// ============================================================

export type PlaceType = "monument" | "temple" | "museum" | "market" | "nature" | "food";

export interface NearbyPlace {
  id: string;
  name: string;
  type: PlaceType;
  lat: number;
  lng: number;
  blurb: string;
}

export type StayTier = "Luxury" | "Heritage" | "Mid-range" | "Budget";

export interface Stay {
  id: string;
  name: string;
  area: string;
  city: string; // used in the Booking.com search
  tier: StayTier;
  blurb: string;
}

export interface VisitInfo {
  bestTime: string;
  hours: string;
  closed?: string;
  gettingThere: string;
  places: NearbyPlace[];
  stays: Stay[];
}

export const PLACE_TYPE_LABEL: Record<PlaceType, string> = {
  monument: "Monument",
  temple: "Temple",
  museum: "Museum",
  market: "Market",
  nature: "Nature",
  food: "Food",
};

export const VISIT_INFO: Record<string, VisitInfo> = {
  "taj-mahal": {
    bestTime: "October to March; arrive at sunrise for soft light and smaller crowds.",
    hours: "Sunrise to sunset",
    closed: "Fridays (open to worshippers at the mosque only)",
    gettingThere: "Agra Cantt railway station is about 6 km away; the Yamuna Expressway links Agra to Delhi in about 3.5 hours.",
    places: [
      { id: "agra-fort", name: "Agra Fort", type: "monument", lat: 27.1795, lng: 78.0211, blurb: "UNESCO-listed red sandstone fort where Shah Jahan spent his last years looking out at the Taj." },
      { id: "mehtab-bagh", name: "Mehtab Bagh", type: "nature", lat: 27.1797, lng: 78.0425, blurb: "Mughal garden across the Yamuna with the classic sunset view of the Taj Mahal." },
      { id: "itimad-ud-daulah", name: "Itimad-ud-Daulah's Tomb", type: "monument", lat: 27.1929, lng: 78.0311, blurb: "The 'Baby Taj', the first Mughal tomb faced in white marble with pietra dura inlay." },
      { id: "akbar-tomb", name: "Akbar's Tomb, Sikandra", type: "monument", lat: 27.2205, lng: 77.9505, blurb: "Emperor Akbar's mausoleum, set in a walled garden roamed by blackbuck." },
      { id: "kinari-bazaar", name: "Kinari Bazaar", type: "market", lat: 27.1838, lng: 78.0158, blurb: "Old-city lanes for marble inlay souvenirs, textiles and Agra's famous petha." },
      { id: "fatehpur-sikri", name: "Fatehpur Sikri", type: "monument", lat: 27.0945, lng: 77.6679, blurb: "Akbar's abandoned red sandstone capital, about an hour's drive west." },
    ],
    stays: [
      { id: "oberoi-amarvilas", name: "The Oberoi Amarvilas", area: "Taj East Gate Road", city: "Agra", tier: "Luxury", blurb: "Every room looks out at the Taj Mahal, 600 m away." },
      { id: "itc-mughal", name: "ITC Mughal", area: "Taj Ganj", city: "Agra", tier: "Luxury", blurb: "Large Mughal-style resort with gardens and a spa." },
      { id: "trident-agra", name: "Trident Agra", area: "Fatehabad Road", city: "Agra", tier: "Mid-range", blurb: "Courtyard hotel with a pool, a short drive from the monuments." },
      { id: "taj-ganj-stays", name: "Guesthouses in Taj Ganj", area: "Taj Ganj", city: "Taj Ganj, Agra", tier: "Budget", blurb: "Family-run stays within walking distance of the South Gate." },
    ],
  },
  hampi: {
    bestTime: "October to February, when days are dry and cool enough to explore on foot or by bicycle.",
    hours: "Sunrise to sunset (Vittala Temple: 8:30 am – 5:30 pm)",
    gettingThere: "Hosapete Junction railway station is 13 km away; the nearest airport is Jindal Vijaynagar (about 40 km).",
    places: [
      { id: "virupaksha", name: "Virupaksha Temple", type: "temple", lat: 15.335, lng: 76.46, blurb: "A living temple in use since the 7th century, with a 50 m gopuram over Hampi Bazaar." },
      { id: "vittala", name: "Vittala Temple", type: "temple", lat: 15.3424, lng: 76.4747, blurb: "Home of the Stone Chariot and the 'musical' pillars of the ranga mandapa." },
      { id: "hemakuta", name: "Hemakuta Hill", type: "nature", lat: 15.3335, lng: 76.4585, blurb: "Granite hill of early shrines with Hampi's favourite sunrise and sunset view." },
      { id: "matanga", name: "Matanga Hill", type: "nature", lat: 15.3367, lng: 76.4672, blurb: "The highest point in Hampi, crowned by a small Virabhadra temple." },
      { id: "lotus-mahal", name: "Lotus Mahal & Zenana Enclosure", type: "monument", lat: 15.3197, lng: 76.471, blurb: "Indo-Islamic pavilion with lotus-bud arches, next to the Elephant Stables." },
      { id: "queens-bath", name: "Queen's Bath", type: "monument", lat: 15.3155, lng: 76.468, blurb: "Royal bathing hall with a moat and ornate balconies." },
      { id: "anegundi", name: "Anegundi", type: "nature", lat: 15.353, lng: 76.49, blurb: "Village across the Tungabhadra, reached by coracle, older than Hampi itself." },
    ],
    stays: [
      { id: "evolve-back-hampi", name: "Evolve Back Kamalapura Palace", area: "Kamalapura", city: "Hampi", tier: "Luxury", blurb: "Palace-style resort inspired by Vijayanagara architecture." },
      { id: "hyatt-place-hampi", name: "Hyatt Place Hampi", area: "Hosapete", city: "Hosapete", tier: "Mid-range", blurb: "Modern hotel near the railway station, about 30 minutes from the ruins." },
      { id: "heritage-resort-hampi", name: "Heritage Resort Hampi", area: "Kamalapura", city: "Hampi", tier: "Heritage", blurb: "Cottages set in gardens close to the Royal Centre." },
      { id: "hampi-guesthouses", name: "Guesthouses near Hampi Bazaar", area: "Hampi Bazaar", city: "Hampi", tier: "Budget", blurb: "Simple rooms a short walk from Virupaksha Temple." },
    ],
  },
  "konark-sun-temple": {
    bestTime: "October to March; the Konark Dance Festival is held in December.",
    hours: "6:00 am – 8:00 pm",
    gettingThere: "Konark is 35 km from Puri and 65 km from Bhubaneswar along the Marine Drive.",
    places: [
      { id: "konark-museum", name: "Konark Archaeological Museum", type: "museum", lat: 19.8885, lng: 86.096, blurb: "ASI museum with sculptures recovered from the fallen parts of the temple." },
      { id: "chandrabhaga", name: "Chandrabhaga Beach", type: "nature", lat: 19.8653, lng: 86.1086, blurb: "Wide beach 3 km away, linked in legend to the Sun God's cure of Samba." },
      { id: "ramachandi", name: "Ramachandi Temple", type: "temple", lat: 19.854, lng: 86.066, blurb: "Temple of the local goddess where the Kushabhadra river meets the sea." },
      { id: "puri-jagannath", name: "Jagannath Temple, Puri", type: "temple", lat: 19.8048, lng: 85.8179, blurb: "One of India's holiest temples and home of the Rath Yatra." },
      { id: "raghurajpur", name: "Raghurajpur Crafts Village", type: "market", lat: 19.888, lng: 85.882, blurb: "Heritage village of pattachitra painters, near Puri." },
      { id: "pipli", name: "Pipli", type: "market", lat: 20.115, lng: 85.832, blurb: "Village famous for colourful appliqué work, on the road to Bhubaneswar." },
    ],
    stays: [
      { id: "lotus-eco-konark", name: "Lotus Eco Beach Resort", area: "Ramachandi", city: "Konark", tier: "Mid-range", blurb: "Beachside cottages on the Marine Drive between Puri and Konark." },
      { id: "toshali-sands", name: "Toshali Sands", area: "Marine Drive", city: "Puri", tier: "Mid-range", blurb: "Resort on the Puri–Konark road with gardens and a pool." },
      { id: "mayfair-puri", name: "Mayfair Heritage", area: "Chakratirtha Road", city: "Puri", tier: "Luxury", blurb: "Beachfront hotel in Puri, a 45-minute drive from Konark." },
      { id: "konark-stays", name: "Guesthouses in Konark town", area: "Konark", city: "Konark", tier: "Budget", blurb: "Simple stays within walking distance of the temple." },
    ],
  },
  "ajanta-caves": {
    bestTime: "June to March; the waterfalls in the gorge flow best after the monsoon.",
    hours: "9:00 am – 5:30 pm",
    closed: "Mondays",
    gettingThere: "Shuttle buses run from the Fardapur T-junction visitor centre; Jalgaon station is 60 km and Aurangabad 100 km away.",
    places: [
      { id: "ajanta-viewpoint", name: "Ajanta Viewpoint", type: "nature", lat: 20.5562, lng: 75.7085, blurb: "Hilltop lookout over the horseshoe gorge — the view from which the caves were rediscovered in 1819." },
      { id: "ajanta-visitor-centre", name: "Ajanta Visitor Centre", type: "museum", lat: 20.5352, lng: 75.7469, blurb: "Replicas of key caves and an introduction to the paintings." },
      { id: "ellora-from-ajanta", name: "Ellora Caves", type: "monument", lat: 20.0268, lng: 75.1795, blurb: "Hindu, Buddhist and Jain caves about 100 km south-west." },
      { id: "bibi-ka-maqbara-ajanta", name: "Bibi Ka Maqbara", type: "monument", lat: 19.9014, lng: 75.3203, blurb: "Aurangabad's 'Taj of the Deccan', built for Aurangzeb's wife." },
      { id: "lonar", name: "Lonar Crater Lake", type: "nature", lat: 19.9768, lng: 76.5085, blurb: "A saline lake in a crater made by a meteorite about 50,000 years ago." },
    ],
    stays: [
      { id: "mtdc-fardapur", name: "MTDC Holiday Resort Fardapur", area: "Fardapur", city: "Fardapur", tier: "Budget", blurb: "State tourism resort a few minutes from the visitor centre." },
      { id: "vivanta-aurangabad-ajanta", name: "Vivanta Aurangabad", area: "Rauza Bagh", city: "Aurangabad", tier: "Luxury", blurb: "Rajput-style hotel in Aurangabad, a base for both Ajanta and Ellora." },
      { id: "lemon-tree-aurangabad-ajanta", name: "Lemon Tree Hotel Aurangabad", area: "Chikalthana", city: "Aurangabad", tier: "Mid-range", blurb: "Comfortable hotel near the airport." },
    ],
  },
  "ellora-caves": {
    bestTime: "June to March; visit Cave 16 early before tour groups arrive.",
    hours: "6:00 am – 6:00 pm",
    closed: "Tuesdays",
    gettingThere: "Ellora is 30 km from Aurangabad, which has an airport and a railway station.",
    places: [
      { id: "grishneshwar", name: "Grishneshwar Temple", type: "temple", lat: 20.0247, lng: 75.17, blurb: "One of the twelve Jyotirlingas of Shiva, 1.5 km from the caves." },
      { id: "khuldabad", name: "Aurangzeb's Tomb, Khuldabad", type: "monument", lat: 20.007, lng: 75.191, blurb: "The emperor's simple open-air grave, as he wished." },
      { id: "daulatabad", name: "Daulatabad Fort", type: "monument", lat: 19.943, lng: 75.2135, blurb: "Hilltop fortress with a maze of tunnels and the Chand Minar." },
      { id: "bibi-ka-maqbara", name: "Bibi Ka Maqbara", type: "monument", lat: 19.9014, lng: 75.3203, blurb: "Aurangabad's 'Taj of the Deccan', completed in 1660." },
      { id: "panchakki", name: "Panchakki", type: "monument", lat: 19.892, lng: 75.315, blurb: "17th-century water mill powered by an underground channel." },
      { id: "aurangabad-caves", name: "Aurangabad Caves", type: "monument", lat: 19.91, lng: 75.302, blurb: "Twelve Buddhist rock-cut caves on a hillside above the city." },
    ],
    stays: [
      { id: "kailas-hotel", name: "Hotel Kailas", area: "Ellora", city: "Ellora", tier: "Mid-range", blurb: "Cottages facing the caves — the only stay right at the site." },
      { id: "vivanta-aurangabad", name: "Vivanta Aurangabad", area: "Rauza Bagh", city: "Aurangabad", tier: "Luxury", blurb: "Rajput-style hotel with gardens and a pool." },
      { id: "lemon-tree-aurangabad", name: "Lemon Tree Hotel Aurangabad", area: "Chikalthana", city: "Aurangabad", tier: "Mid-range", blurb: "Comfortable hotel near the airport." },
    ],
  },
  "red-fort": {
    bestTime: "October to March; the light and sound show runs in the evenings.",
    hours: "9:30 am – 4:30 pm",
    closed: "Mondays",
    gettingThere: "Lal Quila metro station (Violet Line) is a two-minute walk from the Lahori Gate.",
    places: [
      { id: "chandni-chowk", name: "Chandni Chowk", type: "market", lat: 28.6506, lng: 77.2303, blurb: "Shah Jahan's grand market street, still Old Delhi's busiest bazaar." },
      { id: "jama-masjid", name: "Jama Masjid", type: "monument", lat: 28.6507, lng: 77.2334, blurb: "India's largest mosque, built by Shah Jahan between 1650 and 1656." },
      { id: "paranthe-wali-gali", name: "Paranthe Wali Gali", type: "food", lat: 28.6563, lng: 77.2306, blurb: "Lane of stuffed-paratha shops serving since the 1870s." },
      { id: "sis-ganj", name: "Gurudwara Sis Ganj Sahib", type: "temple", lat: 28.6557, lng: 77.2327, blurb: "Sikh shrine marking the martyrdom of Guru Tegh Bahadur." },
      { id: "raj-ghat", name: "Raj Ghat", type: "monument", lat: 28.6406, lng: 77.2495, blurb: "Memorial at the site of Mahatma Gandhi's cremation." },
      { id: "humayun-tomb", name: "Humayun's Tomb", type: "monument", lat: 28.5933, lng: 77.2507, blurb: "UNESCO-listed garden tomb that inspired the Taj Mahal." },
    ],
    stays: [
      { id: "haveli-dharampura", name: "Haveli Dharampura", area: "Chandni Chowk", city: "Old Delhi", tier: "Heritage", blurb: "Restored 19th-century haveli a short walk from Jama Masjid." },
      { id: "imperial-delhi", name: "The Imperial", area: "Janpath", city: "New Delhi", tier: "Luxury", blurb: "Art deco landmark hotel from 1931." },
      { id: "paharganj-stays", name: "Hotels in Paharganj", area: "Paharganj", city: "Paharganj, New Delhi", tier: "Budget", blurb: "Budget hotels next to New Delhi railway station." },
    ],
  },
};

/** Straight-line distance in km (haversine). */
export function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const r = (d: number) => (d * Math.PI) / 180;
  const h = Math.sin(r(bLat - aLat) / 2) ** 2 + Math.cos(r(aLat)) * Math.cos(r(bLat)) * Math.sin(r(bLng - aLng) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export function findStay(id: string) {
  for (const [slug, info] of Object.entries(VISIT_INFO)) {
    const stay = info.stays.find((s) => s.id === id);
    if (stay) return { slug, stay };
  }
  return null;
}

export function findPlace(id: string) {
  for (const [slug, info] of Object.entries(VISIT_INFO)) {
    const place = info.places.find((p) => p.id === id);
    if (place) return { slug, place };
  }
  return null;
}

/** Booking.com search for a stay; adds the affiliate id when BOOKING_AFFILIATE_ID is set. */
export function bookingUrl(stay: Stay, checkin?: string, checkout?: string) {
  const q = new URLSearchParams({ ss: `${stay.name}, ${stay.city}` });
  if (checkin) q.set("checkin", checkin);
  if (checkout) q.set("checkout", checkout);
  if (process.env.BOOKING_AFFILIATE_ID) q.set("aid", process.env.BOOKING_AFFILIATE_ID);
  return `https://www.booking.com/searchresults.html?${q.toString()}`;
}
