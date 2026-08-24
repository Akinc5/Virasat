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
    threeDModels: [
      {
        id: "model_01",
        heritageSiteId: "site_01",
        modelUrl: "/models/taj-mahal.glb",
        format: "glb",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
        audioDescriptionText: `Welcome to the Taj Mahal, one of India's most celebrated monuments. Standing beside the Yamuna River in Agra, the Taj Mahal was commissioned by Mughal emperor Shah Jahan in memory of his wife, Mumtaz Mahal. Construction of the main mausoleum began in 1632 and was completed in 1648. Before you stands a vast white-marble mausoleum raised on a monumental platform. A great central dome rises above the main chamber, surrounded by four slender minarets at the corners. The building's remarkable symmetry is one of the defining characteristics of its design. Look closely at the marble surfaces and you will find delicate floral carvings, intricate stone-inlay work and Arabic calligraphy. Inside, a finely carved marble screen surrounds the cenotaphs of Mumtaz Mahal and Shah Jahan. In front of the mausoleum stretches a formal Mughal garden, divided by pathways and water channels. At the sides are a mosque and a guest house built in contrasting red sandstone. The Taj Mahal is not simply a monument. It is a remarkable combination of architecture, garden design, craftsmanship and cultural history—preserved today as a masterpiece of world heritage.`,
        audioTranslations: {
          hi: `ताजमहल में आपका स्वागत है, जो भारत के सबसे प्रसिद्ध स्मारकों में से एक है। आगरा में यमुना नदी के किनारे स्थित, ताजमहल का निर्माण मुगल सम्राट शाहजहां ने अपनी पत्नी मुमताज महल की याद में करवाया था। मुख्य मकबरे का निर्माण 1632 में शुरू हुआ और 1648 में पूरा हुआ। आपके सामने एक विशाल चबूतरे पर बना सफेद संगमरमर का एक विशाल मकबरा है। मुख्य कक्ष के ऊपर एक शानदार केंद्रीय गुंबद है, जो कोनों पर चार पतली मीनारों से घिरा है। इमारत की उल्लेखनीय समरूपता इसके डिजाइन की मुख्य विशेषताओं में से एक है। संगमरमर की सतहों को ध्यान से देखें और आपको नाजुक फूलों की नक्काशी, जटिल पत्थर की जड़ाई का काम और अरबी सुलेख मिलेगा। अंदर, एक बारीक नक्काशीदार संगमरमर की जाली मुमताज महल और शाहजहां की कब्रों को घेरे हुए है। मकबरे के सामने एक औपचारिक मुगल उद्यान फैला है, जो रास्तों और पानी के चैनलों द्वारा विभाजित है। किनारों पर लाल बलुआ पत्थर से बनी एक मस्जिद और एक गेस्ट हाउस है। ताजमहल सिर्फ एक स्मारक नहीं है। यह वास्तुकला, उद्यान डिजाइन, शिल्प कौशल और सांस्कृतिक इतिहास का एक उल्लेखनीय संयोजन है—जिसे आज विश्व धरोहर की उत्कृष्ट कृति के रूप में संरक्षित किया गया है।`,
          te: `భారతదేశంలోని అత్యంత ప్రసిద్ధ కట్టడాలలో ఒకటైన తాజ్ మహల్‌కు స్వాగతం. ఆగ్రాలో యమునా నది ఒడ్డున ఉన్న తాజ్ మహల్‌ను మొఘల్ చక్రవర్తి షాజహాన్ తన భార్య ముంతాజ్ మహల్ జ్ఞాపకార్థం నిర్మించాడు. ప్రధాన సమాధి నిర్మాణం 1632 లో ప్రారంభమై 1648 లో పూర్తయింది. మీ ముందు ఒక భారీ వేదికపై నిర్మించిన విశాలమైన తెల్లని పాలరాతి సమాధి ఉంది. ప్రధాన గది పైన ఒక గొప్ప కేంద్ర గోపురం ఉండి, నాలుగు మూలల్లో నాలుగు సన్నని మినార్లతో ఆవరించి ఉంది. ఈ భవనం యొక్క అద్భుతమైన సౌష్టవం దాని రూపకల్పన యొక్క ప్రధాన లక్షణాలలో ఒకటి. పాలరాయి ఉపరితలాలను నిశితంగా పరిశీలిస్తే, సున్నితమైన పూల చెక్కడాలు, సంక్లిష్టమైన రాతి పొదుగుల పని మరియు అరబిక్ కాలిగ్రఫీని మీరు కనుగొంటారు. లోపల, అందంగా చెక్కబడిన పాలరాతి తెర ముంతాజ్ మహల్ మరియు షాజహాన్‌ల సమాధులను చుట్టి ఉంటుంది. సమాధి ముందు భాగంలో ఒక అధికారిక మొఘల్ ఉద్యానవనం ఉంది, ఇది మార్గాలు మరియు నీటి మార్గాల ద్వారా విభజించబడింది. ఇరువైపులా ఎర్ర ఇసుకరాయితో నిర్మించిన మసీదు మరియు అతిథి గృహం ఉన్నాయి. తాజ్ మహల్ కేవలం ఒక స్మారక చిహ్నం మాత్రమే కాదు. ఇది వాస్తుశిల్పం, ఉద్యానవన రూపకల్పన, నైపుణ్యం మరియు సాంస్కృతిక చరిత్రల అద్భుతమైన కలయిక—ఈ రోజు ప్రపంచ వారసత్వ అద్భుతంగా భద్రపరచబడింది.`,
          ta: `இந்தியாவின் மிகவும் புகழ்பெற்ற நினைவுச்சின்னங்களில் ஒன்றான தாஜ்மஹால் உங்களை வரவேற்கிறது. ஆக்ராவில் யமுனை நதிக்கரையில் அமைந்துள்ள தாஜ்மஹால், முகலாய பேரரசர் ஷாஜஹானால் அவரது மனைவி மும்தாஜ் மஹாலின் நினைவாக கட்டப்பட்டது. பிரதான கல்லறையின் கட்டுமானம் 1632 இல் தொடங்கி 1648 இல் நிறைவடைந்தது. உங்களுக்கு முன்னால் ஒரு பிரம்மாண்டமான மேடையில் எழுப்பப்பட்ட ஒரு பரந்த வெள்ளை பளிங்கு கல்லறை நிற்கிறது. பிரதான அறைக்கு மேலே ஒரு பெரிய மைய குவிமாடம் உயர்ந்துள்ளது, அதன் மூலைகளில் நான்கு மெல்லிய மினாராக்கள் உள்ளன. கட்டிடத்தின் குறிப்பிடத்தக்க சமச்சீர்நிலை அதன் வடிவமைப்பின் முக்கிய பண்புகளில் ஒன்றாகும். பளிங்கு மேற்பரப்புகளை உற்று நோக்கினால், நுட்பமான மலர் வேலைப்பாடுகள், சிக்கலான கல் பதிப்பு வேலைகள் மற்றும் அரபு கையெழுத்துக்கலைகளை நீங்கள் காணலாம். உள்ளே, ஒரு நேர்த்தியாக செதுக்கப்பட்ட பளிங்கு திரை மும்தாஜ் மஹால் மற்றும் ஷாஜஹானின் கல்லறைகளை சூழ்ந்துள்ளது. கல்லறைக்கு முன்னால் ஒரு முறையான முகலாய தோட்டம் நீண்டுள்ளது, இது பாதைகள் மற்றும் நீர் வழிகளால் பிரிக்கப்பட்டுள்ளது. பக்கவாட்டில் மாறுபட்ட சிவப்பு மணற்கல்லால் கட்டப்பட்ட ஒரு மசூதியும் விருந்தினர் மாளிகையும் உள்ளன. தாஜ்மஹால் வெறும் ஒரு நினைவுச்சின்னம் மட்டுமல்ல. இது கட்டிடக்கலை, தோட்ட வடிவமைப்பு, கைவினைத்திறன் மற்றும் கலாச்சார வரலாறு ஆகியவற்றின் குறிப்பிடத்தக்க கலவையாகும் - இது இன்று உலக பாரம்பரியத்தின் தலைசிறந்த படைப்பாக பாதுகாக்கப்படுகிறது.`,
          ml: `ഇന്ത്യയിലെ ഏറ്റവും പ്രശസ്തമായ സ്മാരകങ്ങളിലൊന്നായ താജ്മഹലിലേക്ക് സ്വാഗതം. ആഗ്രയിലെ യമുനാ നദിയുടെ തീരത്ത് സ്ഥിതി ചെയ്യുന്ന താജ്മഹൽ, മുഗൾ ചക്രവർത്തിയായ ഷാജഹാൻ തന്റെ ഭാര്യ മുംതാസ് മഹലിന്റെ സ്മരണയ്ക്കായി നിർമ്മിച്ചതാണ്. പ്രധാന ശവകുടീരത്തിന്റെ നിർമ്മാണം 1632-ൽ ആരംഭിച്ച് 1648-ൽ പൂർത്തിയായി. നിങ്ങളുടെ മുന്നിൽ വലിയൊരു തറയിൽ നിർമ്മിച്ചിരിക്കുന്ന വിശാലമായ വെളുത്ത മാർബിൾ ശവകുടീരമുണ്ട്. പ്രധാന അറയ്ക്ക് മുകളിലായി ഒരു വലിയ മധ്യ താഴികക്കുടം ഉയർന്നുനിൽക്കുന്നു, നാല് കോണുകളിലായി നാല് നേർത്ത മിനാരങ്ങൾ ഇതിന് ചുറ്റുമുണ്ട്. കെട്ടിടത്തിന്റെ അതിശയകരമായ സമമിതി അതിൻ്റെ രൂപകൽപ്പനയുടെ പ്രധാന സവിശേഷതകളിലൊന്നാണ്. മാർബിൾ പ്രതലങ്ങൾ സൂക്ഷ്മമായി നിരീക്ഷിച്ചാൽ, സൂക്ഷ്മമായ പുഷ്പ കൊത്തുപണികളും സങ്കീർണ്ണമായ കല്ല് പതിക്കൽ ജോലികളും അറബിക് കാലിഗ്രാഫിയും നിങ്ങൾക്ക് കാണാം. ഉള്ളിൽ, മനോഹരമായി കൊത്തിയെടുത്ത മാർബിൾ സ്ക്രീൻ മുംതാസ് മഹലിന്റെയും ഷാജഹാന്റെയും ശവകുടീരങ്ങളെ ചുറ്റിപ്പറ്റി നിൽക്കുന്നു. ശവകുടീരത്തിന് മുൻപിലായി പാതകളാലും ജലപാതകളാലും വിഭജിക്കപ്പെട്ട ഒരു മുഗൾ ഉദ്യാനമുണ്ട്. വശങ്ങളിലായി ചുവന്ന മണൽക്കല്ലിൽ നിർമ്മിച്ച ഒരു പള്ളിയും അതിഥി മന്ദിരവും ഉണ്ട്. താജ്മഹൽ കേവലമൊരു സ്മാരകമല്ല. വാസ്തുവിദ്യ, പൂന്തോട്ട രൂപകൽപ്പന, കരകൗശലവിദ്യ, സാംസ്കാരിക ചരിത്രം എന്നിവയുടെ ശ്രദ്ധേയമായ ഒരു സംയോജനമാണിത് - ലോക പൈതൃകത്തിന്റെ ഒരു മാസ്റ്റർപീസായി ഇന്ന് സംരക്ഷിക്കപ്പെട്ടിരിക്കുന്നു.`,
        },
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
    threeDModels: [
      {
        id: "model_02",
        heritageSiteId: "site_02",
        modelUrl: "/models/hampi.glb",
        format: "glb",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
        audioDescriptionText: `Welcome to Hampi, a remarkable archaeological landscape in Karnataka and the former capital of the Vijayanagara Empire. Surrounded by the Tungabhadra River, rugged granite hills and open plains, Hampi was once a powerful and prosperous city. Between the fourteenth and sixteenth centuries, its rulers built magnificent temples, royal complexes, markets, gateways, water systems and defensive structures. Today, more than 1,600 surviving remains reveal the scale and sophistication of this ancient capital. Among its most remarkable monuments is the Vittala Temple complex, famous for its ornate architecture and iconic stone chariot. Hampi's architecture is predominantly associated with the Dravidian tradition, while some secular buildings also incorporate Indo-Islamic architectural elements. The city was conquered in 1565 and subsequently abandoned, leaving behind an extraordinary archaeological landscape. Hampi is more than a collection of ruins. It is a window into the political power, religious traditions, engineering, architecture and everyday life of the Vijayanagara civilization.`,
        audioTranslations: {
          hi: `हम्पी में आपका स्वागत है, जो कर्नाटक में एक उल्लेखनीय पुरातात्विक परिदृश्य है और विजयनगर साम्राज्य की पूर्व राजधानी है। तुंगभद्रा नदी, बीहड़ ग्रेनाइट पहाड़ियों और खुले मैदानों से घिरा, हम्पी कभी एक शक्तिशाली और समृद्ध शहर था। चौदहवीं और सोलहवीं शताब्दी के बीच, इसके शासकों ने शानदार मंदिरों, शाही परिसरों, बाजारों, प्रवेश द्वारों, जल प्रणालियों और रक्षात्मक संरचनाओं का निर्माण किया। आज, 1,600 से अधिक जीवित अवशेष इस प्राचीन राजधानी के पैमाने और परिष्कार को प्रकट करते हैं। इसके सबसे उल्लेखनीय स्मारकों में विठ्ठल मंदिर परिसर है, जो अपनी अलंकृत वास्तुकला और प्रतिष्ठित पत्थर के रथ के लिए प्रसिद्ध है। हम्पी की वास्तुकला मुख्य रूप से द्रविड़ परंपरा से जुड़ी है, जबकि कुछ धर्मनिरपेक्ष इमारतों में इंडो-इस्लामिक स्थापत्य तत्व भी शामिल हैं। 1565 में शहर पर विजय प्राप्त की गई और बाद में इसे छोड़ दिया गया, जिससे एक असाधारण पुरातात्विक परिदृश्य पीछे छूट गया। हम्पी केवल खंडहरों का संग्रह नहीं है। यह विजयनगर सभ्यता की राजनीतिक शक्ति, धार्मिक परंपराओं, इंजीनियरिंग, वास्तुकला और रोजमर्रा की जिंदगी में झांकने वाली एक खिड़की है।`,
          te: `హంపికి స్వాగతం, ఇది కర్ణాటకలోని అద్భుతమైన పురావస్తు ప్రదేశం మరియు విజయనగర సామ్రాజ్యపు పూర్వ రాజధాని. తుంగభద్ర నది, కఠినమైన గ్రానైట్ కొండలు మరియు విశాలమైన మైదానాలతో చుట్టుముట్టబడిన హంపి ఒకప్పుడు శక్తివంతమైన మరియు సంపన్నమైన నగరం. పద్నాలుగవ మరియు పదహారవ శతాబ్దాల మధ్య, దీని పాలకులు అద్భుతమైన దేవాలయాలు, రాజ సముదాయాలు, మార్కెట్లు, ముఖద్వారాలు, నీటి వ్యవస్థలు మరియు రక్షణ నిర్మాణాలను నిర్మించారు. నేడు, మిగిలి ఉన్న 1,600 కంటే ఎక్కువ అవశేషాలు ఈ పురాతన రాజధాని యొక్క స్థాయిని మరియు అధునాతనతను వెల్లడిస్తున్నాయి. దీని అత్యంత అద్భుతమైన కట్టడాలలో విఠల దేవాలయ సముదాయం ఒకటి, ఇది అలంకరించబడిన వాస్తుశిల్పం మరియు ప్రసిద్ధ రాతి రథానికి ప్రసిద్ధి చెందింది. హంపి వాస్తుశిల్పం ప్రధానంగా ద్రావిడ సంప్రదాయంతో ముడిపడి ఉంది, అయితే కొన్ని లౌకిక భవనాలలో ఇండో-ఇస్లామిక్ వాస్తుశిల్ప అంశాలు కూడా ఉన్నాయి. 1565 లో నగరం జయించబడింది మరియు తరువాత వదిలివేయబడింది, అసాధారణమైన పురావస్తు ప్రదేశాన్ని వదిలివేసింది. హంపి శిథిలాల సముదాయం కంటే ఎక్కువ. ఇది విజయనగర నాగరికత యొక్క రాజకీయ శక్తి, మతపరమైన సంప్రదాయాలు, ఇంజనీరింగ్, వాస్తుశిల్పం మరియు దైనందిన జీవితంలోకి చూసే ఒక కిటికీ.`,
          ta: `கர்நாடகாவில் உள்ள குறிப்பிடத்தக்க தொல்பொருள் நிலப்பரப்பும் விஜயநகரப் பேரரசின் முன்னாள் தலைநகரமுமான ஹம்பிக்கு உங்களை வரவேற்கிறோம். துங்கபத்ரா நதி, கரடுமுரடான கிரானைட் மலைகள் மற்றும் திறந்தவெளி சமவெளிகளால் சூழப்பட்ட ஹம்பி ஒரு காலத்தில் சக்திவாய்ந்த மற்றும் வளமான நகரமாக இருந்தது. பதினான்காம் மற்றும் பதினாறாம் நூற்றாண்டுகளுக்கு இடையில், அதன் ஆட்சியாளர்கள் அற்புதமான கோவில்கள், அரச வளாகங்கள், சந்தைகள், நுழைவாயில்கள், நீர் அமைப்புகள் மற்றும் தற்காப்பு கட்டமைப்புகளை கட்டினர். இன்று, எஞ்சியிருக்கும் 1,600 க்கும் மேற்பட்ட எச்சங்கள் இந்த பழங்கால தலைநகரத்தின் அளவையும் நுட்பத்தையும் வெளிப்படுத்துகின்றன. அதன் மிகவும் குறிப்பிடத்தக்க நினைவுச்சின்னங்களில் விட்டலா கோவில் வளாகம் ஒன்றாகும், இது அதன் அலங்கரிக்கப்பட்ட கட்டிடக்கலை மற்றும் சின்னமான கல் தேருக்கு பிரபலமானது. ஹம்பியின் கட்டிடக்கலை முக்கியமாக திராவிட மரபுடன் தொடர்புடையது, அதே நேரத்தில் சில மதச்சார்பற்ற கட்டிடங்களில் இந்தோ-இஸ்லாமிய கட்டிடக்கலை கூறுகளும் உள்ளன. இந்த நகரம் 1565 இல் கைப்பற்றப்பட்டு பின்னர் கைவிடப்பட்டது, ஒரு அசாதாரண தொல்பொருள் நிலப்பரப்பை விட்டுச்சென்றது. ஹம்பி வெறும் இடிபாடுகளின் தொகுப்பு அல்ல. இது விஜயநகர நாகரிகத்தின் அரசியல் அதிகாரம், மத மரபுகள், பொறியியல், கட்டிடக்கலை மற்றும் அன்றாட வாழ்க்கைக்கான ஒரு சாளரமாகும்.`,
          ml: `കർണാടകയിലെ ശ്രദ്ധേയമായ ഒരു പുരാവസ്തു ഭൂപ്രദേശവും വിജയനഗര സാമ്രാജ്യത്തിന്റെ മുൻ തലസ്ഥാനവുമായ ഹംപിയിലേക്ക് സ്വാഗതം. തുംഗഭദ്ര നദി, പരുക്കൻ ഗ്രാനൈറ്റ് കുന്നുകൾ, തുറസ്സായ സമതലങ്ങൾ എന്നിവയാൽ ചുറ്റപ്പെട്ട ഹംപി ഒരുകാലത്ത് ശക്തവും സമ്പന്നവുമായ ഒരു നഗരമായിരുന്നു. പതിനാലാം നൂറ്റാണ്ടിനും പതിനാറാം നൂറ്റാണ്ടിനുമിടയിൽ, ഇതിന്റെ ഭരണാധികാരികൾ ഗംഭീരമായ ക്ഷേത്രങ്ങൾ, രാജകീയ സമുച്ചയങ്ങൾ, വിപണികൾ, കവാടങ്ങൾ, ജല സംവിധാനങ്ങൾ, പ്രതിരോധ ഘടനകൾ എന്നിവ നിർമ്മിച്ചു. ഇന്ന്, അവശേഷിക്കുന്ന 1,600-ലധികം അവശിഷ്ടങ്ങൾ ഈ പുരാതന തലസ്ഥാനത്തിന്റെ വലുപ്പവും സങ്കീർണ്ണതയും വെളിപ്പെടുത്തുന്നു. അലങ്കരിച്ച വാസ്തുവിദ്യയ്ക്കും പ്രശസ്തമായ കൽരഥത്തിനും പേരുകേട്ട വിത്തല ക്ഷേത്ര സമുച്ചയമാണ് ഇതിലെ ഏറ്റവും ശ്രദ്ധേയമായ സ്മാരകങ്ങളിലൊന്ന്. ഹംപിയുടെ വാസ്തുവിദ്യ പ്രധാനമായും ദ്രാവിഡ പാരമ്പര്യവുമായി ബന്ധപ്പെട്ടിരിക്കുന്നു, അതേസമയം ചില മതേതര കെട്ടിടങ്ങളിൽ ഇന്തോ-ഇസ്ലാമിക് വാസ്തുവിദ്യാ ഘടകങ്ങളും ഉൾപ്പെടുന്നു. 1565-ൽ നഗരം കീഴടക്കപ്പെടുകയും തുടർന്ന് ഉപേക്ഷിക്കപ്പെടുകയും ചെയ്തു, അസാധാരണമായ ഒരു പുരാവസ്തു ഭൂപ്രദേശം അവശേഷിപ്പിച്ചു. ഹംപി വെറുമൊരു അവശിഷ്ടങ്ങളുടെ ശേഖരമല്ല. വിജയനഗര നാഗരികതയുടെ രാഷ്ട്രീയ ശക്തി, മതപരമായ പാരമ്പര്യങ്ങൾ, എഞ്ചിനീയറിംഗ്, വാസ്തുവിദ്യ, ദൈനംദിന ജീവിതം എന്നിവയിലേക്കുള്ള ഒരു ജാലകമാണിത്.`,
        },
      }
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
    threeDModels: [
      {
        id: "model_03",
        heritageSiteId: "site_03",
        modelUrl: "/models/konark.glb",
        format: "glb",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
        audioDescriptionText: `Welcome to the Sun Temple at Konark, on the eastern coast of India in Odisha. Built in the thirteenth century during the reign of King Narasimhadeva I, this extraordinary temple was conceived as the monumental chariot of Surya, the Hindu Sun God. Look closely at the temple platform and you will see twenty-four enormous carved wheels, arranged as twelve pairs. The wheels are richly decorated with symbolic designs and scenes, while sculptures of horses reinforce the powerful image of a celestial chariot moving across the heavens. The temple complex once included a principal sanctuary, an audience hall and a dance hall, along with other structures within an enclosed area. Its walls are covered with an extraordinary variety of sculptures depicting divine figures, musicians, dancers, animals, scenes of contemporary life and other forms of artistic expression. Konark represents the culmination of Kalingan temple architecture and provides an exceptional window into the religious, social and artistic world of thirteenth-century Odisha.`,
        audioTranslations: {
          hi: `ओडिशा में भारत के पूर्वी तट पर स्थित कोणार्क के सूर्य मंदिर में आपका स्वागत है। तेरहवीं शताब्दी में राजा नरसिम्हादेव प्रथम के शासनकाल के दौरान निर्मित, इस असाधारण मंदिर की कल्पना हिंदू सूर्य देवता, सूर्य के विशाल रथ के रूप में की गई थी। मंदिर के चबूतरे को ध्यान से देखें और आपको बारह जोड़े के रूप में व्यवस्थित चौबीस विशाल नक्काशीदार पहिए दिखाई देंगे। पहियों को प्रतीकात्मक डिजाइनों और दृश्यों से समृद्ध रूप से सजाया गया है, जबकि घोड़ों की मूर्तियां आकाश में चलते हुए एक खगोलीय रथ की शक्तिशाली छवि को सुदृढ़ करती हैं। मंदिर परिसर में कभी एक मुख्य गर्भगृह, एक दर्शक कक्ष और एक नृत्य कक्ष के साथ-साथ एक संलग्न क्षेत्र के भीतर अन्य संरचनाएं शामिल थीं। इसकी दीवारें मूर्तियों की एक असाधारण विविधता से ढकी हुई हैं, जो दिव्य आकृतियों, संगीतकारों, नर्तकियों, जानवरों, समकालीन जीवन के दृश्यों और कलात्मक अभिव्यक्ति के अन्य रूपों को दर्शाती हैं। कोणार्क कलिंगन मंदिर वास्तुकला की परिणति का प्रतिनिधित्व करता है और तेरहवीं शताब्दी के ओडिशा की धार्मिक, सामाजिक और कलात्मक दुनिया में एक असाधारण खिड़की प्रदान करता है।`,
          te: `ఒడిశాలో భారతదేశపు తూర్పు తీరంలో ఉన్న కోణార్క్ సూర్య దేవాలయానికి స్వాగతం. పదమూడవ శతాబ్దంలో మొదటి నరసింహదేవ రాజు పాలనలో నిర్మించబడిన ఈ అసాధారణ దేవాలయం హిందూ సూర్య భగవానుడైన సూర్యుని భారీ రథంగా భావించబడింది. దేవాలయ వేదికను నిశితంగా పరిశీలిస్తే, పన్నెండు జతలుగా అమర్చబడిన ఇరవై నాలుగు భారీ చెక్కబడిన చక్రాలను మీరు చూస్తారు. చక్రాలు ప్రతీకాత్మక నమూనాలు మరియు దృశ్యాలతో అద్భుతంగా అలంకరించబడ్డాయి, అయితే గుర్రాల శిల్పాలు ఆకాశం గుండా కదులుతున్న ఖగోళ రథం యొక్క శక్తివంతమైన చిత్రాన్ని బలపరుస్తాయి. దేవాలయ సముదాయంలో ఒకప్పుడు ఒక ప్రధాన గర్భగుడి, ఒక ప్రేక్షక మందిరం మరియు ఒక నృత్య మందిరంతో పాటు చుట్టుముట్టబడిన ప్రాంతంలో ఇతర నిర్మాణాలు కూడా ఉన్నాయి. దీని గోడలు దైవిక రూపాలు, సంగీతకారులు, నృత్యకారులు, జంతువులు, సమకాలీన జీవిత దృశ్యాలు మరియు ఇతర కళాత్మక వ్యక్తీకరణలను వర్ణించే అసాధారణమైన వివిధ రకాల శిల్పాలతో కప్పబడి ఉంటాయి. కోణార్క్ కళింగ దేవాలయ వాస్తుశిల్పం యొక్క పరాకాష్టను సూచిస్తుంది మరియు పదమూడవ శతాబ్దపు ఒడిశా యొక్క మతపరమైన, సామాజిక మరియు కళాత్మక ప్రపంచంలోకి అసాధారణమైన కిటికీని అందిస్తుంది.`,
          ta: `இந்தியாவின் கிழக்குக் கடற்கரையில் ஒடிசாவில் உள்ள கோனார்க் சூரியனார் கோவிலுக்கு உங்களை வரவேற்கிறோம். பதின்மூன்றாம் நூற்றாண்டில் முதலாம் நரசிம்மதேவ மன்னரின் ஆட்சியின் போது கட்டப்பட்ட இந்த அசாதாரண கோவில், இந்து சூரிய கடவுளான சூரியனின் பிரம்மாண்டமான ரதமாக உருவகப்படுத்தப்பட்டது. கோவில் மேடையை உற்று நோக்கினால், பன்னிரண்டு ஜோடிகளாக அமைக்கப்பட்ட இருபத்து நான்கு பெரிய செதுக்கப்பட்ட சக்கரங்களை நீங்கள் காணலாம். சக்கரங்கள் குறியீட்டு வடிவமைப்புகள் மற்றும் காட்சிகளால் செழுமையாக அலங்கரிக்கப்பட்டுள்ளன, அதே நேரத்தில் குதிரைகளின் சிற்பங்கள் வானக் குறுக்கே நகரும் ஒரு வான ரதத்தின் சக்திவாய்ந்த உருவத்தை வலுப்படுத்துகின்றன. கோவில் வளாகத்தில் ஒரு காலத்தில் ஒரு பிரதான கருவறை, ஒரு பார்வையாளர் மண்டபம் மற்றும் ஒரு நடன மண்டபம் ஆகியவை இருந்தன. அதன் சுவர்கள் தெய்வீக உருவங்கள், இசைக்கலைஞர்கள், நடனக் கலைஞர்கள், விலங்குகள், சமகால வாழ்க்கையின் காட்சிகள் மற்றும் கலை வெளிப்பாட்டின் பிற வடிவங்களை சித்தரிக்கும் பல்வேறு சிற்பங்களால் மூடப்பட்டுள்ளன. கோனார்க் கலிங்க கோவில் கட்டிடக்கலையின் உச்சத்தை குறிக்கிறது மற்றும் பதின்மூன்றாம் நூற்றாண்டு ஒடிசாவின் மத, சமூக மற்றும் கலை உலகிற்கு ஒரு விதிவிலக்கான சாளரத்தை வழங்குகிறது.`,
          ml: `ഇന്ത്യയുടെ കിഴക്കൻ തീരത്ത് ഒഡീഷയിലുള്ള കൊണാർക്കിലെ സൂര്യക്ഷേത്രത്തിലേക്ക് സ്വാഗതം. പതിമൂന്നാം നൂറ്റാണ്ടിൽ ഒന്നാം നരസിംഹദേവ രാജാവിന്റെ ഭരണകാലത്ത് നിർമ്മിച്ച ഈ അസാധാരണ ക്ഷേത്രം, ഹിന്ദു സൂര്യദേവനായ സൂര്യന്റെ ഭീമാകാരമായ രഥമായി വിഭാവനം ചെയ്തതാണ്. ക്ഷേത്രത്തിന്റെ തറയിലേക്ക് സൂക്ഷ്മമായി നോക്കിയാൽ, പന്ത്രണ്ട് ജോഡികളായി ക്രമീകരിച്ചിരിക്കുന്ന ഇരുപത്തിനാല് വലിയ കൊത്തുപണികളുള്ള ചക്രങ്ങൾ നിങ്ങൾക്ക് കാണാം. ചക്രങ്ങൾ പ്രതീകാത്മക രൂപകല്പനകളാലും ദൃശ്യങ്ങളാലും സമൃദ്ധമായി അലങ്കരിച്ചിരിക്കുന്നു, അതേസമയം കുതിരകളുടെ ശില്പങ്ങൾ ആകാശത്തിലൂടെ സഞ്ചരിക്കുന്ന ഒരു സ്വർഗ്ഗീയ രഥത്തിന്റെ ശക്തമായ ചിത്രം ശക്തിപ്പെടുത്തുന്നു. ക്ഷേത്ര സമുച്ചയത്തിൽ ഒരു കാലത്ത് ഒരു പ്രധാന ശ്രീകോവിൽ, ഒരു സദസ്സ് ഹാൾ, ഒരു നൃത്ത ഹാൾ എന്നിവയും ഒരു സംരക്ഷിത പ്രദേശത്തിനുള്ളിലെ മറ്റ് ഘടനകളും ഉൾപ്പെട്ടിരുന്നു. ഇതിന്റെ ചുവരുകൾ ദൈവിക രൂപങ്ങൾ, സംഗീതജ്ഞർ, നർത്തകർ, മൃഗങ്ങൾ, സമകാലീന ജീവിതത്തിന്റെ ദൃശ്യങ്ങൾ, മറ്റ് തരത്തിലുള്ള കലാപരമായ ആവിഷ്കാരങ്ങൾ എന്നിവ ചിത്രീകരിക്കുന്ന അസാധാരണമായ വൈവിധ്യമാർന്ന ശില്പങ്ങളാൽ മൂടപ്പെട്ടിരിക്കുന്നു. കൊണാർക്ക് കലിംഗ ക്ഷേത്ര വാസ്തുവിദ്യയുടെ പാരമ്യത്തെ പ്രതിനിധീകരിക്കുന്നു കൂടാതെ പതിമൂന്നാം നൂറ്റാണ്ടിലെ ഒഡീഷയുടെ മതപരവും സാമൂഹികവും കലാപരവുമായ ലോകത്തിലേക്ക് അസാധാരണമായ ഒരു ജാലകം നൽകുന്നു.`,
        },
      }
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
    threeDModels: [
      {
        id: "model_04",
        heritageSiteId: "site_04",
        modelUrl: "/models/ajanta.glb",
        format: "glb",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
        audioDescriptionText: `Welcome to the Ajanta Caves in Maharashtra, a remarkable group of Buddhist rock-cut monuments carved into a dramatic cliff above the Waghora River. The earliest caves date from the second and first centuries BCE. Centuries later, during the fifth and sixth centuries CE, a second major phase of construction created many richly decorated caves. The complex contains thirty caves, including monasteries known as viharas and worship spaces known as chaityagrihas. Step inside, and the rock itself becomes architecture. Halls, pillars, chambers and sanctuaries were carefully carved directly into the cliff. Ajanta is especially famous for its remarkable mural paintings and sculptures. These artworks portray Buddhist themes while also revealing details about the society, clothing, architecture and cultural life of ancient India. The caves represent an extraordinary combination of architecture, sculpture and painting. Together, they provide a rare record of the development of Buddhist art and religious culture in India across several centuries.`,
        audioTranslations: {
          hi: `महाराष्ट्र में अजंता की गुफाओं में आपका स्वागत है, जो वाघोरा नदी के ऊपर एक नाटकीय चट्टान में उकेरे गए बौद्ध रॉक-कट स्मारकों का एक उल्लेखनीय समूह है। सबसे पुरानी गुफाएं दूसरी और पहली शताब्दी ईसा पूर्व की हैं। सदियों बाद, पांचवीं और छठी शताब्दी ईस्वी के दौरान, निर्माण के दूसरे प्रमुख चरण ने कई समृद्ध रूप से सजाए गए गुफाओं का निर्माण किया। परिसर में तीस गुफाएं हैं, जिनमें विहार के रूप में जाने जाने वाले मठ और चैत्यगृह के रूप में जाने जाने वाले पूजा स्थल शामिल हैं। अंदर कदम रखें, और चट्टान ही वास्तुकला बन जाती है। हॉल, खंभे, कक्ष और गर्भगृह को सावधानीपूर्वक सीधे चट्टान में उकेरा गया था। अजंता विशेष रूप से अपने उल्लेखनीय भित्ति चित्रों और मूर्तियों के लिए प्रसिद्ध है। ये कलाकृतियाँ बौद्ध विषयों को चित्रित करती हैं और साथ ही प्राचीन भारत के समाज, कपड़ों, वास्तुकला और सांस्कृतिक जीवन के बारे में विवरण प्रकट करती हैं। गुफाएं वास्तुकला, मूर्तिकला और पेंटिंग के एक असाधारण संयोजन का प्रतिनिधित्व करती हैं। साथ में, वे कई शताब्दियों में भारत में बौद्ध कला और धार्मिक संस्कृति के विकास का एक दुर्लभ रिकॉर्ड प्रदान करते हैं।`,
          te: `వాఘోరా నదికి పైన ఉన్న నాటకీయ కొండలో చెక్కబడిన బౌద్ధ రాతి కట్టడాల అద్భుతమైన సమూహమైన మహారాష్ట్రలోని అజంతా గుహలకు స్వాగతం. పురాతన గుహలు క్రీస్తుపూర్వం రెండవ మరియు ఒకటవ శతాబ్దాల నాటివి. శతాబ్దాల తరువాత, క్రీస్తుశకం ఐదవ మరియు ఆరవ శతాబ్దాల కాలంలో, రెండవ ప్రధాన నిర్మాణ దశ అనేక గొప్ప అలంకరించబడిన గుహలను సృష్టించింది. ఈ సముదాయంలో ముప్పై గుహలు ఉన్నాయి, వీటిలో విహారాలు అని పిలువబడే మఠాలు మరియు చైత్యగృహాలు అని పిలువబడే పూజా స్థలాలు ఉన్నాయి. లోపలికి అడుగుపెట్టండి, రాయి మాత్రమే వాస్తుశిల్పంగా మారుతుంది. హాళ్లు, స్తంభాలు, గదులు మరియు గర్భగుడులు జాగ్రత్తగా నేరుగా కొండలో చెక్కబడ్డాయి. అజంతా ముఖ్యంగా అద్భుతమైన కుడ్యచిత్రాలు మరియు శిల్పాలకు ప్రసిద్ధి చెందింది. ఈ కళాఖండాలు బౌద్ధ ఇతివృత్తాలను చిత్రీకరించడమే కాకుండా ప్రాచీన భారతదేశ సమాజం, దుస్తులు, వాస్తుశిల్పం మరియు సాంస్కృతిక జీవితం గురించి వివరాలను కూడా వెల్లడిస్తాయి. గుహలు వాస్తుశిల్పం, శిల్పం మరియు చిత్రలేఖనం యొక్క అసాధారణ కలయికను సూచిస్తాయి. ఇవి కలిసి, అనేక శతాబ్దాలుగా భారతదేశంలో బౌద్ధ కళ మరియు మతపరమైన సంస్కృతి అభివృద్ధికి అరుదైన రికార్డును అందిస్తాయి.`,
          ta: `மகாராஷ்டிராவில் உள்ள அஜந்தா குகைகளுக்கு உங்களை வரவேற்கிறோம், இது வஹோரா நதிக்கு மேலே ஒரு வியத்தகு பாறையில் செதுக்கப்பட்ட பௌத்த பாறை வெட்டு நினைவுச்சின்னங்களின் குறிப்பிடத்தக்க குழுவாகும். ஆரம்பகால குகைகள் கி.மு. இரண்டாம் மற்றும் முதல் நூற்றாண்டுகளைச் சேர்ந்தவை. பல நூற்றாண்டுகளுக்குப் பிறகு, ஐந்தாம் மற்றும் ஆறாம் நூற்றாண்டுகளில், கட்டுமானத்தின் இரண்டாவது பெரிய கட்டம் பல அழகாக அலங்கரிக்கப்பட்ட குகைகளை உருவாக்கியது. இந்த வளாகத்தில் முப்பது குகைகள் உள்ளன, இதில் விஹாரங்கள் எனப்படும் மடாலயங்கள் மற்றும் சைத்யகிருகங்கள் எனப்படும் வழிபாட்டு இடங்கள் அடங்கும். உள்ளே நுழைந்தால், பாறையே கட்டிடக்கலையாக மாறுகிறது. மண்டபங்கள், தூண்கள், அறைகள் மற்றும் கருவறைகள் கவனமாக நேரடியாக பாறையில் செதுக்கப்பட்டன. அஜந்தா குறிப்பாக அதன் குறிப்பிடத்தக்க சுவரோவியங்கள் மற்றும் சிற்பங்களுக்கு பிரபலமானது. இந்த கலைப்படைப்புகள் பௌத்த கருப்பொருள்களை சித்தரிப்பதோடு பண்டைய இந்தியாவின் சமூகம், உடைகள், கட்டிடக்கலை மற்றும் கலாச்சார வாழ்க்கை பற்றிய விவரங்களையும் வெளிப்படுத்துகின்றன. குகைகள் கட்டிடக்கலை, சிற்பம் மற்றும் ஓவியம் ஆகியவற்றின் அசாதாரண கலவையை பிரதிபலிக்கின்றன. அவை ஒன்றிணைந்து, பல நூற்றாண்டுகளாக இந்தியாவில் பௌத்த கலை மற்றும் மத கலாச்சாரத்தின் வளர்ச்சியின் அரிய பதிவை வழங்குகின்றன.`,
          ml: `വാഘോറ നദിക്ക് മുകളിലുള്ള നാടകീയമായ ഒരു പാറക്കെട്ടിൽ കൊത്തിയെടുത്ത ബുദ്ധമത പാറ വെട്ട് സ്മാരകങ്ങളുടെ ശ്രദ്ധേയമായ കൂട്ടമായ മഹാരാഷ്ട്രയിലെ അജന്ത ഗുഹകളിലേക്ക് സ്വാഗതം. ആദ്യകാല ഗുഹകൾ ബിസി രണ്ടാം നൂറ്റാണ്ടിലും ഒന്നാം നൂറ്റാണ്ടിലുമുള്ളതാണ്. നൂറ്റാണ്ടുകൾക്ക് ശേഷം, സിഇ അഞ്ചാം നൂറ്റാണ്ടിലും ആറാം നൂറ്റാണ്ടിലും, നിർമ്മാണത്തിന്റെ രണ്ടാമത്തെ പ്രധാന ഘട്ടം സമൃദ്ധമായി അലങ്കരിച്ച നിരവധി ഗുഹകൾ സൃഷ്ടിച്ചു. വിഹാരങ്ങൾ എന്നറിയപ്പെടുന്ന ആശ്രമങ്ങളും ചൈത്യഗൃഹങ്ങൾ എന്നറിയപ്പെടുന്ന ആരാധനാ സ്ഥലങ്ങളും ഉൾപ്പെടെ മുപ്പത് ഗുഹകളാണ് സമുച്ചയത്തിലുള്ളത്. ഉള്ളിലേക്ക് കടക്കുക, പാറ തന്നെ വാസ്തുവിദ്യയായി മാറുന്നു. ഹാളുകൾ, തൂണുകൾ, അറകൾ, ശ്രീകോവിലുകൾ എന്നിവ ശ്രദ്ധയോടെ നേരിട്ട് പാറയിൽ കൊത്തിയെടുത്തതാണ്. അജന്ത അതിലെ അതിശയകരമായ ചുവർച്ചിത്രങ്ങൾക്കും ശില്പങ്ങൾക്കും പ്രത്യേകം പ്രസിദ്ധമാണ്. ഈ കലാസൃഷ്ടികൾ ബുദ്ധമത പ്രമേയങ്ങൾ ചിത്രീകരിക്കുന്നതോടൊപ്പം പുരാതന ഇന്ത്യയിലെ സമൂഹം, വസ്ത്രധാരണം, വാസ്തുവിദ്യ, സാംസ്കാരിക ജീവിതം എന്നിവയെക്കുറിച്ചുള്ള വിശദാംശങ്ങളും വെളിപ്പെടുത്തുന്നു. ഗുഹകൾ വാസ്തുവിദ്യ, ശില്പം, പെയിന്റിംഗ് എന്നിവയുടെ അസാധാരണമായ സംയോജനത്തെ പ്രതിനിധീകരിക്കുന്നു. ഇവ ഒരുമിച്ച്, പല നൂറ്റാണ്ടുകളിലായി ഇന്ത്യയിലെ ബുദ്ധ കലയുടെയും മത സംസ്കാരത്തിന്റെയും വികാസത്തിന്റെ അപൂർവമായ ഒരു രേഖ നൽകുന്നു.`,
        },
      }
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
    threeDModels: [
      {
        id: "model_05",
        heritageSiteId: "site_05",
        modelUrl: "/models/ellora.glb",
        format: "glb",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
        audioDescriptionText: `Welcome to the Ellora Caves in Maharashtra, one of India's most remarkable achievements in rock-cut architecture. Along a high basalt cliff, thirty-four monasteries and temples extend for more than two kilometres. They were created between approximately the sixth and twelfth centuries and represent three major religious traditions: Buddhism, Hinduism and Jainism. The Buddhist caves include monasteries and worship spaces, while the Hindu group contains some of the most extraordinary rock-cut architecture in India. At the heart of this group is Cave Sixteen, the magnificent Kailasa Temple. Unlike a structure assembled piece by piece, the temple was carved directly out of the living rock, making its creation an extraordinary engineering and artistic achievement. The Jain caves form the later phase of the complex and contain delicate sculptures and architectural details. Ellora's greatest significance lies not only in its artistic achievement, but also in the coexistence of Buddhist, Hindu and Jain monuments within the same landscape. Today, Ellora stands as a remarkable testimony to ancient India's architecture, craftsmanship, religious diversity and technological skill.`,
        audioTranslations: {
          hi: `महाराष्ट्र में एलोरा की गुफाओं में आपका स्वागत है, जो रॉक-कट वास्तुकला में भारत की सबसे उल्लेखनीय उपलब्धियों में से एक है। एक ऊंची बेसाल्ट चट्टान के साथ, चौंतीस मठ और मंदिर दो किलोमीटर से अधिक तक फैले हुए हैं। वे लगभग छठी और बारहवीं शताब्दी के बीच बनाए गए थे और तीन प्रमुख धार्मिक परंपराओं का प्रतिनिधित्व करते हैं: बौद्ध धर्म, हिंदू धर्म और जैन धर्म। बौद्ध गुफाओं में मठ और पूजा स्थल शामिल हैं, जबकि हिंदू समूह में भारत की कुछ सबसे असाधारण रॉक-कट वास्तुकला शामिल है। इस समूह के केंद्र में गुफा सोलह, शानदार कैलाश मंदिर है। एक-एक करके इकट्ठी की गई संरचना के विपरीत, मंदिर को सीधे जीवंत चट्टान से उकेरा गया था, जिससे इसका निर्माण एक असाधारण इंजीनियरिंग और कलात्मक उपलब्धि बन गया। जैन गुफाएं परिसर के बाद के चरण का निर्माण करती हैं और इनमें नाजुक मूर्तियां और स्थापत्य विवरण शामिल हैं। एलोरा का सबसे बड़ा महत्व न केवल इसकी कलात्मक उपलब्धि में निहित है, बल्कि एक ही परिदृश्य में बौद्ध, हिंदू और जैन स्मारकों के सह-अस्तित्व में भी है। आज, एलोरा प्राचीन भारत की वास्तुकला, शिल्प कौशल, धार्मिक विविधता और तकनीकी कौशल के एक उल्लेखनीय प्रमाण के रूप में खड़ा है।`,
          te: `రాతి నిర్మాణాలలో భారతదేశపు అత్యంత అద్భుతమైన విజయాలలో ఒకటైన మహారాష్ట్రలోని ఎల్లోరా గుహలకు స్వాగతం. ఒక ఎత్తైన బసాల్ట్ కొండ వెంబడి, ముప్పై నాలుగు మఠాలు మరియు దేవాలయాలు రెండు కిలోమీటర్ల కంటే ఎక్కువ విస్తరించి ఉన్నాయి. ఇవి సుమారు ఆరవ మరియు పన్నెండవ శతాబ్దాల మధ్య సృష్టించబడ్డాయి మరియు మూడు ప్రధాన మత సంప్రదాయాలను సూచిస్తాయి: బౌద్ధమతం, హిందూమతం మరియు జైనమతం. బౌద్ధ గుహలలో మఠాలు మరియు పూజా స్థలాలు ఉన్నాయి, అయితే హిందూ సమూహం భారతదేశంలోని అత్యంత అసాధారణమైన రాతి నిర్మాణాలను కలిగి ఉంది. ఈ సమూహానికి గుండెకాయ గుహ పదహారు, అద్భుతమైన కైలాస దేవాలయం. ముక్కలుగా కలిపిన నిర్మాణం వలె కాకుండా, ఆలయం నేరుగా సజీవ రాయి నుండి చెక్కబడింది, దీని సృష్టి ఒక అసాధారణ ఇంజనీరింగ్ మరియు కళాత్మక విజయంగా నిలిచింది. జైన గుహలు సముదాయం యొక్క తరువాతి దశను ఏర్పరుస్తాయి మరియు సున్నితమైన శిల్పాలు మరియు నిర్మాణ వివరాలను కలిగి ఉంటాయి. ఎల్లోరా యొక్క గొప్ప ప్రాముఖ్యత దాని కళాత్మక సాధనలో మాత్రమే కాకుండా, ఒకే భూభాగంలో బౌద్ధ, హిందూ మరియు జైన కట్టడాలు సహజీవనం చేయడంలో కూడా ఉంది. నేడు, ఎల్లోరా పురాతన భారతదేశ వాస్తుశిల్పం, నైపుణ్యం, మత వైవిధ్యం మరియు సాంకేతిక నైపుణ్యానికి విశేషమైన నిదర్శనంగా నిలుస్తుంది.`,
          ta: `பாறை வெட்டு கட்டிடக்கலையில் இந்தியாவின் மிகவும் குறிப்பிடத்தக்க சாதனைகளில் ஒன்றான மகாராஷ்டிராவில் உள்ள எல்லோரா குகைகளுக்கு உங்களை வரவேற்கிறோம். உயரமான பாசால்ட் பாறை நெடுகிலும், முப்பத்து நான்கு மடாலயங்கள் மற்றும் கோவில்கள் இரண்டு கிலோமீட்டருக்கும் மேலாக நீண்டுள்ளன. அவை ஏறக்குறைய ஆறாம் மற்றும் பன்னிரண்டாம் நூற்றாண்டுகளுக்கு இடையில் உருவாக்கப்பட்டன மற்றும் மூன்று முக்கிய மத மரபுகளைப் பிரதிபலிக்கின்றன: பௌத்தம், இந்து மதம் மற்றும் சமணம். பௌத்த குகைகளில் மடாலயங்கள் மற்றும் வழிபாட்டு இடங்கள் உள்ளன, அதே நேரத்தில் இந்து குழு இந்தியாவில் மிகவும் அசாதாரணமான பாறை வெட்டு கட்டிடக்கலைகளைக் கொண்டுள்ளது. இந்தக் குழுவின் மையத்தில் பதினாறாம் குகை உள்ளது, இது அற்புதமான கைலாச நாதர் கோயில். ஒரு ஒரு பகுதியாக சேர்க்கப்பட்ட ஒரு கட்டமைப்பைப் போலல்லாமல், இந்த கோவில் நேரடியாக வாழும் பாறையிலிருந்து செதுக்கப்பட்டுள்ளது, இது அதன் படைப்பை ஒரு அசாதாரண பொறியியல் மற்றும் கலை சாதனையாக மாற்றுகிறது. சமண குகைகள் வளாகத்தின் பிற்கால கட்டத்தை உருவாக்குகின்றன மற்றும் நுட்பமான சிற்பங்கள் மற்றும் கட்டிடக்கலை விவரங்களைக் கொண்டுள்ளன. எல்லோராவின் மிகப் பெரிய முக்கியத்துவம் அதன் கலைச் சாதனையில் மட்டுமல்லாமல், ஒரே நிலப்பரப்பிற்குள் பௌத்த, இந்து மற்றும் சமண நினைவுச்சின்னங்கள் இணைந்து வாழ்வதிலும் உள்ளது. இன்று, எல்லோரா பண்டைய இந்தியாவின் கட்டிடக்கலை, கைவினைத்திறன், மத பன்முகத்தன்மை மற்றும் தொழில்நுட்பத் திறன் ஆகியவற்றிற்கு ஒரு குறிப்பிடத்தக்க சான்றாக நிற்கிறது.`,
          ml: `പാറ വെട്ട് വാസ്തുവിദ്യയിൽ ഇന്ത്യയുടെ ഏറ്റവും ശ്രദ്ധേയമായ നേട്ടങ്ങളിലൊന്നായ മഹാരാഷ്ട്രയിലെ എല്ലോറ ഗുഹകളിലേക്ക് സ്വാഗതം. ഉയർന്ന ബസാൾട്ട് പാറക്കെട്ടിനരികിലായി, മുപ്പത്തിനാല് ആശ്രമങ്ങളും ക്ഷേത്രങ്ങളും രണ്ട് കിലോമീറ്ററിലധികം വ്യാപിച്ചുകിടക്കുന്നു. ഏകദേശം ആറാം നൂറ്റാണ്ടിനും പന്ത്രണ്ടാം നൂറ്റാണ്ടിനുമിടയിലാണ് അവ സൃഷ്ടിക്കപ്പെട്ടത്, ബുദ്ധമതം, ഹിന്ദുമതം, ജൈനമതം എന്നീ മൂന്ന് പ്രധാന മത പാരമ്പര്യങ്ങളെ പ്രതിനിധീകരിക്കുന്നു. ബുദ്ധമത ഗുഹകളിൽ ആശ്രമങ്ങളും ആരാധനാ സ്ഥലങ്ങളും ഉൾപ്പെടുന്നു, അതേസമയം ഹിന്ദു ഗ്രൂപ്പിൽ ഇന്ത്യയിലെ ഏറ്റവും അസാധാരണമായ ചില പാറ വെട്ട് വാസ്തുവിദ്യ അടങ്ങിയിരിക്കുന്നു. ഈ കൂട്ടത്തിന്റെ ഹൃദയഭാഗത്താണ് പതിനാറാം ഗുഹ, ഗംഭീരമായ കൈലാസ ക്ഷേത്രം. ഭാഗങ്ങളായി കൂട്ടിച്ചേർത്ത ഒരു ഘടനയിൽ നിന്ന് വ്യത്യസ്തമായി, ക്ഷേത്രം നേരിട്ട് ജീവനുള്ള പാറയിൽ നിന്ന് കൊത്തിയെടുത്തതാണ്, ഇത് അതിന്റെ സൃഷ്ടിയെ അസാധാരണമായ എഞ്ചിനീയറിംഗ്, കലാപരമായ നേട്ടമാക്കി മാറ്റുന്നു. ജൈന ഗുഹകൾ സമുച്ചയത്തിന്റെ അവസാന ഘട്ടത്തെ രൂപപ്പെടുത്തുന്നു കൂടാതെ അതിലോലമായ ശില്പങ്ങളും വാസ്തുവിദ്യാ വിശദാംശങ്ങളും ഉൾക്കൊള്ളുന്നു. എല്ലോറയുടെ ഏറ്റവും വലിയ പ്രാധാന്യം അതിന്റെ കലാപരമായ നേട്ടത്തിൽ മാത്രമല്ല, ഒരേ ഭൂപ്രദേശത്ത് ബുദ്ധ, ഹിന്ദു, ജൈന സ്മാരകങ്ങളുടെ സഹവർത്തിത്വത്തിലുമാണ്. ഇന്ന്, പുരാതന ഇന്ത്യയുടെ വാസ്തുവിദ്യ, കരകൗശലവിദ്യ, മതപരമായ വൈവിധ്യം, സാങ്കേതിക വൈദഗ്ദ്ധ്യം എന്നിവയുടെ ശ്രദ്ധേയമായ സാക്ഷ്യപത്രമായി എല്ലോറ നിലകൊള്ളുന്നു.`,
        },
      }
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
