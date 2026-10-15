export interface MonumentHotspot {
  id: string;
  siteSlug: string;
  title: string;
  category: "Architecture" | "Engineering" | "Sacred Art" | "History" | "Landscape";
  position: string; // "x y z" coordinates on 3D surface
  normal: string;   // surface normal for rotation
  cameraOrbit: string; // "theta phi radius"
  cameraTarget: string; // "x y z" focus target
  shortDescription: string;
  explanation: string;
  trivia: string;
  badgeText: string;
}

export const MONUMENT_HOTSPOTS: Record<string, MonumentHotspot[]> = {
  "taj-mahal": [
    {
      id: "taj-dome",
      siteSlug: "taj-mahal",
      title: "The Main Marble Dome (Amrud)",
      category: "Architecture",
      position: "0m 1.25m 0m",
      normal: "0m 1m 0m",
      cameraOrbit: "0deg 65deg 2.4m",
      cameraTarget: "0m 1.15m 0m",
      badgeText: "73m Elevation",
      shortDescription: "The monumental 73-meter bulbous dome of pure Makrana marble.",
      explanation:
        "The central onion dome (known in Persian as the Amrud for its guava-like profile) rises 73 meters (240 feet) above the plinth. Engineered as a double dome, the inner ceiling is scaled for human proportions inside the funerary hall, while the towering outer dome creates an awe-inspiring presence on the Agra skyline.",
      trivia:
        "The dome is crowned by a gilded finial that seamlessly marries Islamic crescent moon motifs with the Hindu lotus and trident (trishula) symbol.",
    },
    {
      id: "taj-minarets",
      siteSlug: "taj-mahal",
      title: "The Earthquake-Safe Minarets",
      category: "Engineering",
      position: "1.15m 0.65m 1.15m",
      normal: "1m 0m 1m",
      cameraOrbit: "45deg 70deg 3.6m",
      cameraTarget: "1m 0.6m 1m",
      badgeText: "Seismic Defense",
      shortDescription: "Four 40-meter towers intentionally tilted outward.",
      explanation:
        "Standing at each corner of the raised marble plinth, the four 40-meter minarets divide into three tiers by balconies. They provide monumental frame and visual balance to the central tomb.",
      trivia:
        "The minarets are deliberately angled outward by 2 to 3 degrees. In case of a major earthquake, they are engineered to fall away from the mausoleum, protecting the central tomb from catastrophic impact.",
    },
    {
      id: "taj-darwaza",
      siteSlug: "taj-mahal",
      title: "The Great Gate (Darwaza-i-Rauza)",
      category: "Sacred Art",
      position: "0m 0.35m 1.85m",
      normal: "0m 0m 1m",
      cameraOrbit: "180deg 75deg 4.2m",
      cameraTarget: "0m 0.35m 1.5m",
      badgeText: "Optical Artistry",
      shortDescription: "Monumental red sandstone entryway framing the tomb.",
      explanation:
        "The Darwaza-i-Rauza marks the boundary between the mortal mundane world and the peaceful paradise of the gardens. Built from deep red sandstone inlaid with white marble, its vaulted pishtaq arches frame a dramatic first glimpse of the mausoleum.",
      trivia:
        "The Arabic calligraphy running up the sides of the archway was crafted with progressive optical enlargement: letters at the top are physically larger so that to someone looking from below, the writing appears uniform.",
    },
    {
      id: "taj-charbagh",
      siteSlug: "taj-mahal",
      title: "Charbagh Paradise Gardens & Lotus Pool",
      category: "Landscape",
      position: "0m -0.05m 0.85m",
      normal: "0m 1m 0m",
      cameraOrbit: "110deg 50deg 4.4m",
      cameraTarget: "0m -0.05m 0.7m",
      badgeText: "Sacred Geometry",
      shortDescription: "Persian 4-quadrant layout symbolizing the Rivers of Paradise.",
      explanation:
        "Based on the Charbagh garden philosophy of Timurid and Persian traditions, four elevated water channels intersect at a central pool, symbolizing the four rivers of honey, milk, water, and wine mentioned in Quranic paradise depictions.",
      trivia:
        "The elevated lotus tank (Al-Kawthar) is mathematically aligned so that on calm mornings, the Taj Mahal's complete silhouette is reflected on the still water with zero perspective distortion.",
    },
    {
      id: "taj-pietra-dura",
      siteSlug: "taj-mahal",
      title: "Pietra Dura (Parchin Kari) Inlay",
      category: "Sacred Art",
      position: "0m 0.45m 0.35m",
      normal: "0m 0m 1m",
      cameraOrbit: "15deg 80deg 1.7m",
      cameraTarget: "0m 0.45m 0.25m",
      badgeText: "28 Gemstones",
      shortDescription: "Intricate floral arabesques cut into translucent Makrana marble.",
      explanation:
        "The delicate flowers adorning the marble walls and the octagonal cenotaph screen are examples of Parchin Kari inlay. Artisans shaped lapis lazuli from Afghanistan, carnelian from Arabia, jade from China, and turquoise from Tibet into micro-precise petals fitted without grout.",
      trivia:
        "A single 6-inch flower motif on the central cenotaph contains up to 60 individually cut and polished gemstone segments, so seamlessly fitted that joints cannot be felt with a fingernail.",
    },
  ],

  "konark-sun-temple": [
    {
      id: "konark-wheel",
      siteSlug: "konark-sun-temple",
      title: "The 24 Astronomical Chariot Wheels",
      category: "Engineering",
      position: "0.8m 0.2m 0.3m",
      normal: "1m 0m 0m",
      cameraOrbit: "45deg 75deg 2.2m",
      cameraTarget: "0.5m 0.2m 0.2m",
      badgeText: "Functional Sundials",
      shortDescription: "Astronomical wheels that tell exact time down to minutes.",
      explanation:
        "The temple is designed as a colossal 24-wheeled chariot pulled by 7 horses. Each 10-foot wheel acts as an accurate sundial. The spokes cast shadows on markings around the rim to read solar hours, quarters, and minutes.",
      trivia:
        "Even today, calculating the exact time of day using the shadow cast by the wheel hub onto the intricate carvings yields time accurate to within 60 seconds.",
    },
    {
      id: "konark-jagamohan",
      siteSlug: "konark-sun-temple",
      title: "The Jagamohana (Assembly Hall)",
      category: "Architecture",
      position: "0m 0.8m 0m",
      normal: "0m 1m 0m",
      cameraOrbit: "0deg 60deg 3.0m",
      cameraTarget: "0m 0.6m 0m",
      badgeText: "Kalinga Spire",
      shortDescription: "The surviving 38-meter pyramidal assembly hall.",
      explanation:
        "Rising with stepped horizontal tiers decorated with female musicians and mythical beasts, the Jagamohana is the largest surviving structure of the Konark complex.",
      trivia:
        "In 1903, British colonial engineers filled the interior of the Jagamohana with sand and sealed the doors to prevent the immense stone ceiling from collapsing.",
    },
  ],

  "hampi": [
    {
      id: "hampi-stone-chariot",
      siteSlug: "hampi",
      title: "The Garuda Stone Chariot",
      category: "Sacred Art",
      position: "0m 0.35m 0m",
      normal: "0m 1m 0m",
      cameraOrbit: "35deg 70deg 2.2m",
      cameraTarget: "0m 0.3m 0m",
      badgeText: "Monolithic Shrine",
      shortDescription: "Ornate monolithic shrine to Garuda on granite wheels.",
      explanation:
        "Standing within the courtyard of the Vijaya Vittala temple, this stone chariot is actually a shrine dedicated to Garuda. Built from modular granite blocks with joints disguised by carving, it appears carved from a single boulder.",
      trivia:
        "Originally, the stone wheels could rotate freely on their axles until temple authorities locked them in place to preserve the delicate carvings from friction.",
    },
    {
      id: "hampi-musical-pillars",
      siteSlug: "hampi",
      title: "The 56 Musical Pillars of Vittala",
      category: "Engineering",
      position: "0.6m 0.4m -0.3m",
      normal: "0m 0m 1m",
      cameraOrbit: "85deg 80deg 2.0m",
      cameraTarget: "0.5m 0.4m -0.2m",
      badgeText: "Acoustic Wonder",
      shortDescription: "Granite columns tuned to distinct musical notes.",
      explanation:
        "The Ranga Mantapa of Vittala Temple features 56 cluster pillars. When tapped gently with thumb or palm, each slender pillar emits a distinct resonant musical note matching Indian classical instruments (mridangam, damru, veena).",
      trivia:
        "British scientists once cut open two pillars in Vittala Temple to discover if hollow chambers or metal bells were hidden inside—they found only solid, homogenous granite rock.",
    },
  ],

  "ajanta-caves": [
    {
      id: "ajanta-cave-26",
      siteSlug: "ajanta-caves",
      title: "Cave 26 — The Parinirvana of the Buddha",
      category: "Sacred Art",
      position: "0m 0.4m 0m",
      normal: "0m 0m 1m",
      cameraOrbit: "0deg 80deg 2.0m",
      cameraTarget: "0m 0.35m 0m",
      badgeText: "7-Meter Reclining Buddha",
      shortDescription: "Colossal rock sculpture depicting the Buddha entering nirvana.",
      explanation:
        "Carved deep into the basalt rock of the Waghora river canyon, Cave 26 is a chaitya hall containing a stunning 7-meter reclining Buddha figure surrounded by mourning celestial beings below and joyful spirits above.",
      trivia:
        "The facial expression of the reclining Buddha appears solemn and grieving from the feet, peaceful from the center, and serenely transcendent when observed from near the head.",
    },
  ],

  "ellora-caves": [
    {
      id: "ellora-kailasa",
      siteSlug: "ellora-caves",
      title: "Cave 16 — Kailasa Temple Monolith",
      category: "Engineering",
      position: "0m 0.5m 0m",
      normal: "0m 1m 0m",
      cameraOrbit: "45deg 65deg 2.8m",
      cameraTarget: "0m 0.4m 0m",
      badgeText: "200,000 Tons Excavated",
      shortDescription: "World's largest monolithic rock-cut structure carved top-to-bottom.",
      explanation:
        "Commissioned by Rashtrakuta king Krishna I in the 8th century, Kailasa Temple was not built with stones assembled together—it was carved out of a single volcanic basalt cliff from the top downward, with zero room for architectural error.",
      trivia:
        "Over 200,000 tons of rock were manually chiseled away over decades. Mughal Emperor Aurangzeb tried to destroy the temple with 1,000 workers for three years, but barely chipped a fraction of its stone.",
    },
  ],
};
