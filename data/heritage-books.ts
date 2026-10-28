export interface HeritageBook {
  id: string;
  siteSlug: string;
  title: string;
  author: string;
  year: number | string;
  publisher?: string;
  badge: "Essential Masterwork" | "Architectural Survey" | "Archaeological Standard" | "Historical Classic" | "Art & Photography";
  description: string;
  whyRead: string;
  keyTopics: string[];
  googleBooksQuery: string;
}

export const HERITAGE_BOOKS: Record<string, HeritageBook[]> = {
  "taj-mahal": [
    {
      id: "taj-book-1",
      siteSlug: "taj-mahal",
      title: "The Complete Taj Mahal and the Riverfront Gardens of Agra",
      author: "Ebba Koch",
      year: 2006,
      publisher: "Thames & Hudson",
      badge: "Architectural Survey",
      description:
        "The definitive monograph by the only Western art historian permitted to conduct a full architectural survey of the complex for the Archaeological Survey of India (ASI).",
      whyRead:
        "Features exhaustive floor plans, precise elevation drawings, and the revelation that the Taj was not an isolated garden tomb, but the centerpiece of a grand 44-estate riverfront city.",
      keyTopics: ["Architectural Survey", "Riverfront Gardens", "Pietra Dura Inlay", "Floor Plans"],
      googleBooksQuery: "The Complete Taj Mahal Ebba Koch",
    },
    {
      id: "taj-book-2",
      siteSlug: "taj-mahal",
      title: "Taj Mahal: Passion and Genius at the Heart of the Moghul Empire",
      author: "Giles Tillotson",
      year: 2008,
      publisher: "Harvard University Press",
      badge: "Historical Classic",
      description:
        "An engaging biography of the monument exploring Mughal politics, Shah Jahan's artistic patronages, and how romantic European myths developed around it.",
      whyRead:
        "Separates fact from romantic fiction, addressing the myth of the black Taj Mahal and detailing the court records of contemporary Mughal chronicler Abdul Hamid Lahori.",
      keyTopics: ["Mughal Court History", "Shah Jahan", "Romantic Myths", "Cultural Biography"],
      googleBooksQuery: "Taj Mahal Passion and Genius Giles Tillotson",
    },
    {
      id: "taj-book-3",
      siteSlug: "taj-mahal",
      title: "The Taj Mahal and Its Incarnation: Original Research Works",
      author: "Dr. R. Nath",
      year: 2004,
      publisher: "The Historical Research Documentation Programme",
      badge: "Essential Masterwork",
      description:
        "A rigorous technical study by India's pre-eminent historian of Mughal architecture examining the mathematical grid, calligraphy inscriptions, and structural acoustics.",
      whyRead:
        "Provides exact architectural cross-sections of the double dome and translates the Koranic calligraphic inscriptions adorning the main gateways.",
      keyTopics: ["Double Dome Mechanics", "Koranic Calligraphy", "Mathematical Symmetry", "Stone Inlay"],
      googleBooksQuery: "Taj Mahal R Nath architectural research",
    },
  ],

  "hampi": [
    {
      id: "hampi-book-1",
      siteSlug: "hampi",
      title: "Vijayanagara: Splendour in Ruins",
      author: "George Michell & John M. Fritz",
      year: 2014,
      publisher: "Mapin Publishing",
      badge: "Archaeological Standard",
      description:
        "Written by the co-directors of the international Vijayanagara Research Project who mapped, excavated, and documented Hampi for more than two decades.",
      whyRead:
        "Brings the vast 25-square-kilometer ruins to life with aerial survey maps, architectural reconstructions, and deep analysis of the Sacred and Royal centers.",
      keyTopics: ["Archaeological Mapping", "Sacred Landscape", "Royal Enclosures", "Tungabhadra Valley"],
      googleBooksQuery: "Vijayanagara Splendour in Ruins George Michell John Fritz",
    },
    {
      id: "hampi-book-2",
      siteSlug: "hampi",
      title: "A Forgotten Empire: Vijayanagar; A Contribution to the History of India",
      author: "Robert Sewell",
      year: 1900,
      publisher: "Swan Sonnenschein & Co. / Classic Edition",
      badge: "Historical Classic",
      description:
        "The landmark foundational work that introduced the splendor of Vijayanagara to the modern world, featuring firsthand Portuguese eyewitness chronicles.",
      whyRead:
        "Contains direct translations of travelers Domingos Paes and Fernão Nunes, who witnessed the diamond bazaars, royal celebrations, and military power of King Krishnadevaraya.",
      keyTopics: ["Portuguese Eyewitnesses", "Diamond Markets", "Krishnadevaraya", "Empire Chronicle"],
      googleBooksQuery: "A Forgotten Empire Vijayanagar Robert Sewell",
    },
    {
      id: "hampi-book-3",
      siteSlug: "hampi",
      title: "Hampi (Monumental Legacy)",
      author: "Anila Verghese",
      year: 2002,
      publisher: "Oxford University Press",
      badge: "Essential Masterwork",
      description:
        "A concise, scholarly introduction exploring how temple rituals, classical arts, and Deccan trade shaped the monumental architecture of Vittala and Virupaksha.",
      whyRead:
        "Explains the religious symbolism behind the iconic stone chariot, the acoustic engineering of the 56 musical pillars, and the bazaar avenues.",
      keyTopics: ["Vittala Temple", "Musical Pillars", "Stone Chariot", "Temple Bazaars"],
      googleBooksQuery: "Hampi Monumental Legacy Anila Verghese Oxford",
    },
  ],

  "konark-sun-temple": [
    {
      id: "konark-book-1",
      siteSlug: "konark-sun-temple",
      title: "Konarak: The Heritage of Mankind (2 Volumes)",
      author: "Karuna Sagar Behera",
      year: 1996,
      publisher: "Aryan Books International",
      badge: "Essential Masterwork",
      description:
        "The crowning reference work on Konark by Odisha's foremost archaeological historian, documenting the art, architecture, and folklore of the Sun Temple.",
      whyRead:
        "Details palm-leaf manuscripts (Baya Chakada) that recorded the daily construction accounts, master artisan salaries, and the legendary sacrifice of young architect Dharmapada.",
      keyTopics: ["Palm-Leaf Chronicles", "Baya Chakada", "Dharmapada Legend", "Sculptural Iconography"],
      googleBooksQuery: "Konarak The Heritage of Mankind Karuna Sagar Behera",
    },
    {
      id: "konark-book-2",
      siteSlug: "konark-sun-temple",
      title: "The Sun Temple of Konark",
      author: "Thomas E. Donaldson & K.S. Behera",
      year: 2003,
      publisher: "Archaeological Survey of India",
      badge: "Architectural Survey",
      description:
        "An exhaustive iconographical catalogue detailing every carved panel, celestial musician, and the astronomical alignment of the 24 chariot wheels.",
      whyRead:
        "Explains the mathematical calculations of the sundial spokes, how to read exact local solar time, and the symbolism of Surya's 7 celestial chariot horses.",
      keyTopics: ["Astronomical Sundials", "Dance Hall (Natya Mandapa)", "Solar Deities", "Kalinga Shikhara"],
      googleBooksQuery: "Sun Temple of Konark Thomas Donaldson KS Behera",
    },
    {
      id: "konark-book-3",
      siteSlug: "konark-sun-temple",
      title: "Konark (ASI Guidebook Series)",
      author: "Debala Mitra",
      year: 1968,
      publisher: "Director General, Archaeological Survey of India",
      badge: "Archaeological Standard",
      description:
        "Written by the first woman Director General of the Archaeological Survey of India, outlining the structural conservation and excavation history of the site.",
      whyRead:
        "Provides official ASI records on how the sanctum was preserved, the removal of the colossal stone horses and elephants, and structural stabilization methods.",
      keyTopics: ["ASI Conservation", "Structural History", "Sanctum Sand Filling", "Elephant Sculptures"],
      googleBooksQuery: "Konark Debala Mitra Archaeological Survey of India",
    },
  ],

  "ajanta-caves": [
    {
      id: "ajanta-book-1",
      siteSlug: "ajanta-caves",
      title: "The Ajanta Caves: Ancient Paintings of Buddhist India",
      author: "Benoy K. Behl",
      year: 1998,
      publisher: "Thames & Hudson",
      badge: "Art & Photography",
      description:
        "A historic photographic masterwork capturing the luminous natural colors and spiritual grace of the 1,500-year-old murals without damaging flash.",
      whyRead:
        "Features stunning full-color spreads of the Bodhisattva Padmapani and Vajrapani, explaining how natural mineral pigments have survived over 15 centuries.",
      keyTopics: ["Mural Preservation", "Bodhisattva Padmapani", "Mineral Pigments", "Jataka Tales"],
      googleBooksQuery: "The Ajanta Caves Ancient Paintings Benoy K Behl",
    },
    {
      id: "ajanta-book-2",
      siteSlug: "ajanta-caves",
      title: "Ajanta: History and Development (Volume 1: The End of the Golden Age)",
      author: "Walter M. Spink",
      year: 2005,
      publisher: "Brill Academic Publishers",
      badge: "Essential Masterwork",
      description:
        "The revolutionary study by University of Michigan's Walter Spink, who spent 50 years documenting Ajanta's rock-cut chronology.",
      whyRead:
        "Demonstrates that the magnificent second-phase caves were carved in an explosive burst of royal patronage during a brief 17-year window under Emperor Harishena (460–477 CE).",
      keyTopics: ["Vakataka Empire", "Emperor Harishena", "Chronological Phasing", "Chaitya Excavation"],
      googleBooksQuery: "Ajanta History and Development Walter Spink Brill",
    },
    {
      id: "ajanta-book-3",
      siteSlug: "ajanta-caves",
      title: "The Art of Ajanta: New Perspectives",
      author: "B.N. Goswamy & Ratan Parimoo",
      year: 2012,
      publisher: "National Museum Institute / Aryan Books",
      badge: "Archaeological Standard",
      description:
        "A multidisciplinary exploration of the narrative compositions, costume traditions, jewelry, and international trade routes depicted on the monastery walls.",
      whyRead:
        "Reveals how Ajanta serves as a visual encyclopedia of ancient Indian cosmopolitan life, featuring foreign embassies, silk trade, and courtly ceremonies.",
      keyTopics: ["Silk Road Trade", "Visual Encyclopedia", "Ancient Fashion & Jewelry", "Buddhist Monasticism"],
      googleBooksQuery: "The Art of Ajanta New Perspectives Ratan Parimoo",
    },
  ],

  "ellora-caves": [
    {
      id: "ellora-book-1",
      siteSlug: "ellora-caves",
      title: "The Kailas at Ellora: A New Synthesis of Indian Architecture and Sculpture",
      author: "M.K. Dhavalikar",
      year: 2003,
      publisher: "Books & Books",
      badge: "Architectural Survey",
      description:
        "A comprehensive monograph on Cave 16 (Kailasa Temple), the largest monolithic rock excavation on Earth, carved top-to-bottom from a single volcanic basalt cliff.",
      whyRead:
        "Details the engineering calculations required to chisel 200,000 tons of rock downward, and interprets the monumental narrative friezes of the Ramayana and Mahabharata.",
      keyTopics: ["Top-Down Quarrying", "Basalt Excavation", "Kailasa Monolith", "Epic Friezes"],
      googleBooksQuery: "The Kailas at Ellora MK Dhavalikar",
    },
    {
      id: "ellora-book-2",
      siteSlug: "ellora-caves",
      title: "Ellora: Monolithic Splendour",
      author: "T.V. Pathy",
      year: 1980,
      publisher: "Vikas Publishing House",
      badge: "Essential Masterwork",
      description:
        "An authoritative art-historical study examining the Rashtrakuta royal patronage under King Krishna I and the artistic evolution of the Hindu cave temples.",
      whyRead:
        "Provides an in-depth breakdown of the famous Ravana Ka Khai (Cave 14), Dumar Lena (Cave 29), and the multi-story Buddhist viharas.",
      keyTopics: ["Rashtrakuta Dynasty", "King Krishna I", "Dumar Lena", "Cave Temple Typology"],
      googleBooksQuery: "Ellora Monolithic Splendour TV Pathy",
    },
    {
      id: "ellora-book-3",
      siteSlug: "ellora-caves",
      title: "Caves of Ellora: Harmony in Rock-Cut Art",
      author: "Carmel Berkson",
      year: 1992,
      publisher: "Mapin Publishing",
      badge: "Art & Photography",
      description:
        "A magnificent visual and philosophical study celebrating the peaceful coexistence of Buddhist, Hindu, and Jain sanctuaries along the 2-kilometer basalt cliff.",
      whyRead:
        "Focuses on the spatial dynamics and dramatic chiaroscuro light effects inside the rock halls, exploring why ancient rulers supported all three religions equally.",
      keyTopics: ["Tri-Religious Harmony", "Jain Indrasabha", "Chiaroscuro Lighting", "Basalt Sculpture"],
      googleBooksQuery: "Caves of Ellora Carmel Berkson Mapin",
    },
  ],
  "red-fort": [
    {
      id: "redfort-book-1",
      siteSlug: "red-fort",
      title: "The Last Mughal: The Fall of a Dynasty, Delhi 1857",
      author: "William Dalrymple",
      year: 2006,
      publisher: "Bloomsbury",
      badge: "Historical Classic",
      description:
        "A narrative history of the final years of the Mughal court inside the Red Fort and the siege of Delhi during the Revolt of 1857.",
      whyRead:
        "Built on thousands of Persian and Urdu documents, it shows daily life in the fort and why its capture in 1857 ended the Mughal empire.",
      keyTopics: ["Bahadur Shah Zafar", "Revolt of 1857", "Mughal Court", "Shahjahanabad"],
      googleBooksQuery: "The Last Mughal William Dalrymple",
    },
    {
      id: "redfort-book-2",
      siteSlug: "red-fort",
      title: "Mughal Architecture: An Outline of Its History and Development (1526–1858)",
      author: "Ebba Koch",
      year: 1991,
      publisher: "Prestel",
      badge: "Architectural Survey",
      description:
        "A concise survey of Mughal building from Babur to the end of the empire, including Shah Jahan's palaces at Delhi.",
      whyRead:
        "Places the Red Fort's halls of audience and marble pavilions within the wider development of Mughal palace design.",
      keyTopics: ["Shah Jahan", "Palace Architecture", "Diwan-i-Am", "Diwan-i-Khas"],
      googleBooksQuery: "Mughal Architecture Ebba Koch outline",
    },
    {
      id: "redfort-book-3",
      siteSlug: "red-fort",
      title: "Chandni Chowk: The Mughal City of Old Delhi",
      author: "Swapna Liddle",
      year: 2017,
      publisher: "Speaking Tiger",
      badge: "Historical Classic",
      description:
        "A history of Shahjahanabad, the walled city that grew around the Red Fort, from its founding to the present day.",
      whyRead:
        "Explains how the fort, the great mosque and the market streets were planned together as one imperial capital.",
      keyTopics: ["Shahjahanabad", "Urban History", "Old Delhi", "Mughal Capital"],
      googleBooksQuery: "Chandni Chowk Mughal City of Old Delhi Swapna Liddle",
    },
  ],
};

export const ALL_BOOKS: HeritageBook[] = Object.values(HERITAGE_BOOKS).flat();

export function findBook(id: string) {
  return ALL_BOOKS.find((b) => b.id === id) ?? null;
}

/** Bookshop search for a title; adds the Amazon Associates tag when AMAZON_ASSOCIATE_TAG is set. */
export function bookshopUrl(book: HeritageBook) {
  const q = new URLSearchParams({ k: `${book.title} ${book.author}`, i: "stripbooks" });
  if (process.env.AMAZON_ASSOCIATE_TAG) q.set("tag", process.env.AMAZON_ASSOCIATE_TAG);
  return `https://www.amazon.in/s?${q.toString()}`;
}
