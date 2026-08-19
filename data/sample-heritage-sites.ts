// ============================================================
// HeritageVerse — Sample Heritage Data
//
// DEMO CONTENT — Replace with real data via admin dashboard or
// database seeding. Images reference /images/ in public/.
//
// To use with Prisma seed: import this file in prisma/seed.ts
// ============================================================

import type { HeritageSite } from "@/types";

export const sampleHeritageSites: HeritageSite[] = [
  {
    id: "site_01",
    name: "Taj Mahal",
    slug: "taj-mahal",
    shortDescription:
      "An ivory-white marble mausoleum on the south bank of the Yamuna river, a symbol of eternal love.",
    description:
      "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, India. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal. The complex encompasses the mausoleum, a mosque, a guest house, and formal gardens.",
    state: "Uttar Pradesh",
    city: "Agra",
    region: "North India",
    latitude: 27.1751,
    longitude: 78.0421,
    historicalPeriod: "Mughal Era (1526–1857 CE)",
    architecturalStyle: "Mughal",
    category: "Monument",
    unescoStatus: "World Heritage Site",
    yearBuilt: 1648,
    history:
      "Construction began around 1632 and was completed around 1648. The project employed approximately 20,000 artisans under the guidance of a board of architects led by the court architect to the emperor, Ustad Ahmad Lahauri. The building complex was designated a UNESCO World Heritage Site in 1983.",
    architecture:
      "The Taj Mahal incorporates and expands upon design traditions of Persian and earlier Mughal architecture. The mausoleum features a white marble dome that reaches 73 metres, flanked by four minarets. The interior chamber is an octagon and allows for entry from each face, though only the two facing the garden are used. The interior walls are decorated with intricate pietra dura inlay work.",
    culturalSignificance:
      "The Taj Mahal is regarded as the finest example of Mughal architecture, a style that combines elements of Persian, Indian, and Islamic architectural styles. It is widely considered one of the most beautiful buildings in the world and has been described as 'the jewel of Muslim art in India'.",
    heroImage: "/images/heritage/taj-mahal-hero.jpg",
    sketchfabModelId: "33149233cefd492b9abdd50fe5a8c921",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    media: [
      {
        id: "media_01",
        heritageSiteId: "site_01",
        type: "image",
        url: "/images/heritage/taj-mahal-1.jpg",
        title: "Taj Mahal at Dawn",
        createdAt: new Date("2024-01-01"),
      },
      {
        id: "media_02",
        heritageSiteId: "site_01",
        type: "image",
        url: "/images/heritage/taj-mahal-2.jpg",
        title: "The Great Gate (Darwaza-i-Rauza)",
        createdAt: new Date("2024-01-01"),
      },
    ],
    timelineEvents: [
      {
        id: "te_01",
        heritageSiteId: "site_01",
        year: 1631,
        title: "Death of Mumtaz Mahal",
        description:
          "Mumtaz Mahal dies during childbirth, prompting Shah Jahan to commission a grand mausoleum.",
      },
      {
        id: "te_02",
        heritageSiteId: "site_01",
        year: 1632,
        title: "Construction Begins",
        description:
          "Over 20,000 craftsmen from across India and Central Asia begin construction.",
      },
      {
        id: "te_03",
        heritageSiteId: "site_01",
        year: 1648,
        title: "Main Structure Completed",
        description:
          "The principal mausoleum is completed. Work on surrounding structures continues until 1653.",
      },
      {
        id: "te_04",
        heritageSiteId: "site_01",
        year: 1983,
        title: "UNESCO World Heritage Site",
        description:
          "The Taj Mahal is inscribed as a UNESCO World Heritage Site.",
      },
    ],
  },
  {
    id: "site_02",
    name: "Hampi",
    slug: "hampi",
    shortDescription:
      "The ruins of the glorious Vijayanagara Empire, a UNESCO World Heritage Site spread across a stunning boulder landscape.",
    description:
      "Hampi is an ancient village in Karnataka, home to the ruins of the medieval Vijayanagara Empire. Located along the Tungabhadra River, Hampi's surreal landscape of giant boulders is dotted with hundreds of temples, royal pavilions, bazaars, and sacred sites.",
    state: "Karnataka",
    city: "Hampi",
    region: "South India",
    latitude: 15.335,
    longitude: 76.4601,
    historicalPeriod: "Medieval (1200–1526 CE)",
    architecturalStyle: "Dravidian",
    category: "Ruins",
    unescoStatus: "World Heritage Site",
    yearBuilt: 1336,
    history:
      "The Vijayanagara Empire was established in 1336 CE by Harihara I and Bukka Raya I of the Sangama Dynasty. Hampi was its capital city. At its peak, Hampi was the second largest medieval city in the world, home to over 500,000 people. The empire fell in 1565 after the Battle of Talikota.",
    architecture:
      "Hampi's architecture is a classic example of Vijayanagara style — a blend of Dravidian and Indo-Islamic influences. The iconic Virupaksha Temple, Vittala Temple (with its famous musical pillars), and the Stone Chariot are masterpieces of craftsmanship.",
    culturalSignificance:
      "Hampi was a major center of Hindu culture, religion, and commerce. The Vijayanagara Empire was a stronghold of Hindu tradition and its kings were great patrons of art, literature, and architecture. Today Hampi is revered as a sacred place by Hindus.",
    heroImage: "/images/heritage/hampi-hero.jpg",
    sketchfabModelId: "dfaf413f0ce845a3b798b0bb4079962a",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    media: [
      {
        id: "media_03",
        heritageSiteId: "site_02",
        type: "image",
        url: "/images/heritage/hampi-1.jpg",
        title: "Vittala Temple Stone Chariot",
        createdAt: new Date("2024-01-01"),
      },
    ],
    timelineEvents: [
      {
        id: "te_05",
        heritageSiteId: "site_02",
        year: 1336,
        title: "Vijayanagara Empire Founded",
        description: "Harihara I and Bukka Raya I establish the empire.",
      },
      {
        id: "te_06",
        heritageSiteId: "site_02",
        year: 1565,
        title: "Battle of Talikota",
        description:
          "The Deccan Sultanates defeat and sack Vijayanagara, marking the empire's end.",
      },
      {
        id: "te_07",
        heritageSiteId: "site_02",
        year: 1986,
        title: "UNESCO World Heritage Site",
        description: "Group of Monuments at Hampi inscribed by UNESCO.",
      },
    ],
  },
  {
    id: "site_03",
    name: "Konark Sun Temple",
    slug: "konark-sun-temple",
    shortDescription:
      "A 13th-century Sun Temple in Odisha, designed as a colossal chariot of the sun god Surya.",
    description:
      "The Konark Sun Temple is a 13th-century CE Sun temple at Konark, about 35 km northeast of Puri, on the coast of Odisha. The temple is attributed to King Narasimhadeva I of the Eastern Ganga dynasty, built around 1250 CE.",
    state: "Odisha",
    city: "Konark",
    region: "East India",
    latitude: 19.8876,
    longitude: 86.0945,
    historicalPeriod: "Medieval (1200–1526 CE)",
    architecturalStyle: "Nagara",
    category: "Temple",
    unescoStatus: "World Heritage Site",
    yearBuilt: 1250,
    history:
      "The temple was built by King Narasimhadeva I of the Eastern Ganga Dynasty around 1250 CE. It is believed that 1,200 artisans worked for 12 years to complete the temple. The main spire (shikhara) collapsed in the 19th century, but the audience hall (jagamohana) remains intact.",
    architecture:
      "The entire temple was designed in the shape of a colossal chariot of the Sun God Surya, with 24 elaborately carved stone wheels and drawn by a team of seven horses. The temple demonstrates the pinnacle of Kalinga architecture with intricate stone carvings depicting scenes from everyday life, celestial beings, and erotic sculptures.",
    culturalSignificance:
      "The Sun Temple is a masterpiece of Odishan architecture and sculpture. The intricate carvings are a visual encyclopedia of medieval Indian life — from musicians and dancers to divine beings and erotic art. The temple is a symbol of Odisha's cultural identity.",
    heroImage: "/images/heritage/konark-hero.jpg",
    sketchfabModelId: "6cc905be2ae34e8091eb1eaa84a17738",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    media: [
      {
        id: "media_04",
        heritageSiteId: "site_03",
        type: "image",
        url: "/images/heritage/konark-1.jpg",
        title: "The Stone Chariot Wheels",
        createdAt: new Date("2024-01-01"),
      },
    ],
    timelineEvents: [
      {
        id: "te_08",
        heritageSiteId: "site_03",
        year: 1250,
        title: "Temple Constructed",
        description:
          "Built by King Narasimhadeva I of the Eastern Ganga dynasty.",
      },
      {
        id: "te_09",
        heritageSiteId: "site_03",
        year: 1984,
        title: "UNESCO World Heritage Site",
        description: "Konark Sun Temple inscribed as a UNESCO World Heritage Site.",
      },
    ],
  },
  {
    id: "site_04",
    name: "Ajanta Caves",
    slug: "ajanta-caves",
    shortDescription:
      "Magnificent rock-cut Buddhist cave monuments from the 2nd century BCE, renowned for their ancient murals.",
    description:
      "The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE in Aurangabad district of Maharashtra. The caves include paintings and rock-cut sculptures described as among the finest surviving examples of ancient Indian art.",
    state: "Maharashtra",
    city: "Aurangabad",
    region: "West India",
    latitude: 20.5519,
    longitude: 75.7033,
    historicalPeriod: "Ancient (Before 600 CE)",
    architecturalStyle: "Rock-Cut",
    category: "Cave",
    unescoStatus: "World Heritage Site",
    yearBuilt: -200,
    history:
      "The caves were carved in two phases. The first phase occurred from the 2nd century BCE to 1st century CE. After a gap of several centuries, the second phase of construction began in the 5th-6th century CE under the patronage of the Vakataka king Harishena. The caves were abandoned after his death and remained unknown until rediscovered in 1819 by British soldiers.",
    architecture:
      "The caves represent two distinct types of Buddhist monuments — chaitya-grihas (sanctuaries) and viharas (monasteries). The caves feature elaborate facades, decorated gateways, and pillared halls. The paintings inside use natural pigments and depict the life of the Buddha and the Jataka tales.",
    culturalSignificance:
      "Ajanta is one of the greatest artistic achievements in human history. The murals are considered the finest surviving examples of Indian art from this period and had a profound influence on Buddhist art across Asia — from Sri Lanka to Japan.",
    heroImage: "/images/heritage/ajanta-hero.jpg",
    sketchfabModelId: "d916f1bc949c4284ab3fe56ddbfe660d",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    media: [
      {
        id: "media_05",
        heritageSiteId: "site_04",
        type: "image",
        url: "/images/heritage/ajanta-1.jpg",
        title: "Cave 1 Murals",
        createdAt: new Date("2024-01-01"),
      },
    ],
    timelineEvents: [
      {
        id: "te_10",
        heritageSiteId: "site_04",
        year: -200,
        title: "First Phase Begins",
        description: "First caves carved during the Satavahana period.",
      },
      {
        id: "te_11",
        heritageSiteId: "site_04",
        year: 480,
        title: "Second Phase Complete",
        description:
          "Major excavations under Vakataka patronage completed. Caves subsequently abandoned.",
      },
      {
        id: "te_12",
        heritageSiteId: "site_04",
        year: 1819,
        title: "Rediscovered",
        description:
          "British officer John Smith rediscovers the caves while on a tiger hunt.",
      },
      {
        id: "te_13",
        heritageSiteId: "site_04",
        year: 1983,
        title: "UNESCO World Heritage Site",
        description: "Ajanta Caves inscribed as a UNESCO World Heritage Site.",
      },
    ],
  },
  {
    id: "site_05",
    name: "Ellora Caves",
    slug: "ellora-caves",
    shortDescription:
      "A remarkable complex of 34 monasteries and temples showcasing Hindu, Buddhist, and Jain art and architecture.",
    description:
      "Ellora is a UNESCO World Heritage Site located in the Aurangabad district of Maharashtra. It is one of the largest rock-cut monastery-temple cave complexes in the world, featuring Buddhist, Hindu, and Jain monuments and artwork dating from the 600–1000 CE period.",
    state: "Maharashtra",
    city: "Aurangabad",
    region: "West India",
    latitude: 20.0268,
    longitude: 75.1795,
    historicalPeriod: "Early Medieval (600–1200 CE)",
    architecturalStyle: "Rock-Cut",
    category: "Cave",
    unescoStatus: "World Heritage Site",
    yearBuilt: 600,
    history:
      "Ellora was built between 600 and 1000 CE and features 34 caves — 12 Buddhist, 17 Hindu, and 5 Jain. The site demonstrates the religious harmony of the period. The crowning achievement is the Kailasa Temple (Cave 16), dedicated to Lord Shiva.",
    architecture:
      "The Kailasa Temple (Cave 16) is the largest monolithic rock excavation in the world, carved from a single rock. It replicates the legendary home of Lord Shiva in the Himalayas and covers an area twice the size of the Parthenon in Athens. The 12 Buddhist caves feature viharas with multi-storied facades.",
    culturalSignificance:
      "Ellora is unique for showcasing three living religions side by side, demonstrating the religious pluralism of ancient India. The Kailasa Temple alone required the removal of 400,000 tons of rock over 100 years.",
    heroImage: "/images/heritage/ellora-hero.jpg",
    sketchfabModelId: "1a5ec1e212f9451e80dc051e97164d17",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    media: [
      {
        id: "media_06",
        heritageSiteId: "site_05",
        type: "image",
        url: "/images/heritage/ellora-1.jpg",
        title: "Kailasa Temple Aerial View",
        createdAt: new Date("2024-01-01"),
      },
    ],
    timelineEvents: [
      {
        id: "te_14",
        heritageSiteId: "site_05",
        year: 600,
        title: "Buddhist Caves Begin",
        description: "First Buddhist caves carved under Rashtrakuta patronage.",
      },
      {
        id: "te_15",
        heritageSiteId: "site_05",
        year: 757,
        title: "Kailasa Temple Construction",
        description:
          "Rashtrakuta king Krishna I orders the construction of the monolithic Kailasa Temple.",
      },
      {
        id: "te_16",
        heritageSiteId: "site_05",
        year: 1000,
        title: "Final Caves Completed",
        description: "Jain caves completed, marking the end of major construction.",
      },
      {
        id: "te_17",
        heritageSiteId: "site_05",
        year: 1983,
        title: "UNESCO World Heritage Site",
        description: "Ellora Caves inscribed as a UNESCO World Heritage Site.",
      },
    ],
  },
];

// Utility: get a site by slug from sample data
export function getSampleSiteBySlug(slug: string): HeritageSite | undefined {
  return sampleHeritageSites.find((site) => site.slug === slug);
}

// Utility: get featured sites (first 3 for homepage)
export function getFeaturedSites(count = 3): HeritageSite[] {
  return sampleHeritageSites.slice(0, count);
}

// All unique states from sample data
export const sampleStates = [
  ...new Set(sampleHeritageSites.map((s) => s.state)),
].sort();
