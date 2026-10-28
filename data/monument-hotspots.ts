export interface MonumentHotspot {
  id: string;
  siteSlug: string;
  title: string;
  category: "Architecture" | "Engineering" | "Sacred Art" | "History" | "Landscape";
  // Coordinates are in the GLB's own space (metres, Y up, +Z = front),
  // i.e. before the viewer's displayScale is applied.
  position: string; // "x y z" point on the model surface
  normal: string;   // surface normal, orients the pin
  cameraOrbit: string; // "theta phi radius" when this stop is focused
  cameraTarget: string; // "x y z" focus target
  onModel?: boolean; // false = the feature isn't part of the 3D model (story only)
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
      position: "0m 44.8m 13.95m",
      normal: "0m 0.25m 1m",
      cameraOrbit: "0deg 72deg 62m",
      cameraTarget: "0m 46m 0m",
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
      position: "43.2m 28.4m 45.6m",
      normal: "0m 0m 1m",
      cameraOrbit: "25deg 78deg 48m",
      cameraTarget: "43.2m 30m 43.2m",
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
      onModel: false,
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
      onModel: false,
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
      position: "5.2m 25.4m 29.2m",
      normal: "0m 0m 1m",
      cameraOrbit: "8deg 84deg 26m",
      cameraTarget: "3m 22m 29m",
      badgeText: "28 Gemstones",
      shortDescription: "Intricate floral arabesques cut into translucent Makrana marble.",
      explanation:
        "The delicate flowers adorning the marble walls and the octagonal cenotaph screen are examples of Parchin Kari inlay. Artisans shaped lapis lazuli from Afghanistan, carnelian from Arabia, jade from China, and turquoise from Tibet into micro-precise petals fitted without grout.",
      trivia:
        "A single 6-inch flower motif on the central cenotaph contains up to 60 individually cut and polished gemstone segments, so seamlessly fitted that joints cannot be felt with a fingernail.",
    },
    {
      id: "taj-iwan",
      siteSlug: "taj-mahal",
      title: "The Great Iwan & Calligraphy Frame",
      category: "Sacred Art",
      position: "0m 15m 29.2m",
      normal: "0m 0m 1m",
      cameraOrbit: "0deg 82deg 55m",
      cameraTarget: "0m 18m 28m",
      badgeText: "Optical Illusion",
      shortDescription: "A vaulted portal framed by Qur'anic calligraphy in black marble.",
      explanation:
        "Each face of the mausoleum is dominated by an iwan: a tall vaulted recess set inside a rectangular frame (pishtaq). Around it runs a band of Qur'anic verses inlaid in black marble, designed by the calligrapher Amanat Khan, whose name appears on the monument.",
      trivia:
        "The letters grow taller the higher they are on the frame, so from the ground the whole inscription appears to be one uniform size.",
    },
  ],

  "konark-sun-temple": [
    {
      id: "konark-wheel",
      siteSlug: "konark-sun-temple",
      title: "The 24 Astronomical Chariot Wheels",
      category: "Engineering",
      position: "11.5m 2.05m 21.85m",
      normal: "0m 0m 1m",
      cameraOrbit: "12deg 82deg 16m",
      cameraTarget: "11.5m 2.2m 21m",
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
      position: "0m 24m 10.4m",
      normal: "0m 0.5m 1m",
      cameraOrbit: "20deg 70deg 75m",
      cameraTarget: "0m 22m 0m",
      badgeText: "Kalinga Spire",
      shortDescription: "The surviving pyramidal assembly hall, about 39 metres high.",
      explanation:
        "Rising with stepped horizontal tiers decorated with female musicians and mythical beasts, the Jagamohana is the largest surviving structure of the Konark complex.",
      trivia:
        "In 1903, British colonial engineers filled the interior of the Jagamohana with sand and sealed the doors to prevent the immense stone ceiling from collapsing.",
    },
    {
      id: "konark-horses",
      siteSlug: "konark-sun-temple",
      title: "The Seven Horses of Surya",
      category: "Sacred Art",
      position: "27.6m 2.7m 9.6m",
      normal: "0.3m 0m 1m",
      cameraOrbit: "40deg 78deg 22m",
      cameraTarget: "27.6m 2m 9m",
      badgeText: "Days of the Week",
      shortDescription: "Stone horses straining to pull the Sun God's chariot.",
      explanation:
        "Seven horses draw Surya's chariot, traditionally read as the seven days of the week, just as the 24 wheels are read as the hours of the day or the fortnights of the year. Only a few of the original horses survive near the eastern stairs.",
      trivia:
        "The temple faces east, so the first rays of the rising sun once fell through the main entrance onto the image of Surya in the sanctum.",
    },
    {
      id: "konark-mandapa",
      siteSlug: "konark-sun-temple",
      title: "The Natya Mandapa (Dance Hall)",
      category: "History",
      position: "46m 9.7m 7.5m",
      normal: "0m 0.4m 1m",
      cameraOrbit: "25deg 70deg 40m",
      cameraTarget: "46m 5m 0m",
      badgeText: "Roofless Today",
      shortDescription: "A free-standing hall where dance was offered to the Sun God.",
      explanation:
        "In front of the temple stands the natya mandapa, a raised hall whose walls and pillars are covered with carved dancers and musicians. Its roof has long since fallen, leaving a forest of pillars on a richly sculpted platform.",
      trivia:
        "The carved dance poses at Konark are so precise that they have been used as a visual reference for Odissi, the classical dance of Odisha.",
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
