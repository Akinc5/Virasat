// ============================================================
// Photo galleries — openly licensed photographs from Wikimedia
// Commons (CC BY / CC BY-SA / CC0 / public domain), resized to
// 1600px. The licences require crediting each photographer;
// the credits are listed on /credits.
// ============================================================

export interface GalleryImage {
  url: string;
  title: string;
  author: string;
  license: string;
  source: string;
}

export const HERITAGE_GALLERY: Record<string, GalleryImage[]> = {
  "taj-mahal": [
    { url: "/images/heritage/taj-mahal/01.jpg", title: "The Taj Mahal from the Charbagh garden", author: "Yann; edited by King of Hearts", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Taj_Mahal,_Agra,_India_edit2.jpg" },
    { url: "/images/heritage/taj-mahal/02.jpg", title: "Mausoleum, mosque and guest house mirrored in the pool", author: "Antrix3", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Aks_The_Reflection_Taj_Mahal.jpg" },
    { url: "/images/heritage/taj-mahal/03.jpg", title: "The mausoleum and its western minaret", author: "Jakub Hałun", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:20191204_Taj_Mahal_Agra_0641_6555.jpg" },
    { url: "/images/heritage/taj-mahal/04.jpg", title: "The long reflecting pool", author: "Jakub Hałun", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:20191204_Taj_Mahal_Agra_0721_6575_DxO.jpg" },
    { url: "/images/heritage/taj-mahal/05.jpg", title: "The marble plinth from the east", author: "Jakub Hałun", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:20191204_Taj_Mahal,_Agra_0702_6568.jpg" },
    { url: "/images/heritage/taj-mahal/06.jpg", title: "View along the central water channel", author: "Yann (talk)", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Taj_Mahal,_Agra,_UP,_India.jpg" },
    { url: "/images/heritage/taj-mahal/07.jpg", title: "The Taj Mahal at midday", author: "Diego Delso", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Taj_Mahal,_Agra,_India,_2009-12-03,_DD_0011.jpg" },
    { url: "/images/heritage/taj-mahal/08.jpg", title: "Pietra dura inlay around an arch", author: "Yann (talk)", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Arch,_Taj_Mahal,_Agra,_India.jpg" },
  ],
  "hampi": [
    { url: "/images/heritage/hampi/01.jpg", title: "Krishna Pushkarani stepped tank", author: "Dey.sandip", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Krishna_Pushkarani_-_Hampi_Ruins.jpg" },
    { url: "/images/heritage/hampi/02.jpg", title: "Temple on Matanga Hill", author: "Vyacheslav Argenberg", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Hampi,_India,_Temple_on_top_of_Matanga_Hill.jpg" },
    { url: "/images/heritage/hampi/03.jpg", title: "The Lotus Mahal", author: "Vyacheslav Argenberg", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Hampi,_India,_Lotus_Mahal.jpg" },
    { url: "/images/heritage/hampi/04.jpg", title: "Reliefs on the royal throne platform", author: "Ingo Mehling", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Hampi_-_King%27s_Palace_-_Throne_Platform_-_Relief_-_15.jpg" },
    { url: "/images/heritage/hampi/05.jpg", title: "Hemakuta Hill with the Virupaksha Temple", author: "Ingo Mehling", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Hampi_-_Hemakuta_Hill,_Virupaksha_Temple.jpg" },
    { url: "/images/heritage/hampi/06.jpg", title: "Stepped water tank on the old Courtesan Street", author: "Dey.sandip", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Dancing_Girls_Bath_(Hampi_water_tank),_Hampi,_Vijayanagara,_Karnataka,_India_(2012).jpg" },
    { url: "/images/heritage/hampi/07.jpg", title: "Vishnu shrine by the Vittala Temple gateway", author: "iMahesh", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Vishnu_Temple_No.III_facing_South_Gateway_of_Vittala_Temple.jpg" },
    { url: "/images/heritage/hampi/08.jpg", title: "The Vittala Temple reflected after rain", author: "Basavaraj M", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Hampi_Vitthala_Temple_3465.jpg" },
  ],
  "konark-sun-temple": [
    { url: "/images/heritage/konark-sun-temple/01.jpg", title: "A carved chariot wheel that works as a sundial", author: "Joydeep", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Wheel_engraved_in_the_13th_century_built_Konark_Sun_Temple_in_Orissa,_India.jpg" },
    { url: "/images/heritage/konark-sun-temple/02.jpg", title: "Sculpted figures on the temple walls", author: "Joydeep", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:13th_Century_stone_curvings_at_Konark_Sun_Temple_Puri_district,_Odisha,_India_5.jpg" },
    { url: "/images/heritage/konark-sun-temple/03.jpg", title: "The Jagamohana from the gardens", author: "Joydeep Chakraborty", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Konark_Sun_Temple_Puri_district,_Odisha,_India_3.jpg" },
    { url: "/images/heritage/konark-sun-temple/04.jpg", title: "The hub of a stone wheel", author: "Subhrajyoti07", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Closeup_of_the_center_of_a_stone_wheel_-_Konark_Sun_Temple,_Orissa,_India.jpg" },
    { url: "/images/heritage/konark-sun-temple/05.jpg", title: "The temple ruins from the south-west", author: "Joydeep", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Konark_Sun_Temple_Puri_district,_Odisha,_India_1.jpg" },
    { url: "/images/heritage/konark-sun-temple/06.jpg", title: "Front view of the Sun Temple", author: "http://en.wikipedia.org/wiki/User_talk:Vinayreddym", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Konark_Sun_Temple_Front_view.jpg" },
    { url: "/images/heritage/konark-sun-temple/07.jpg", title: "The spokes of a Konark wheel", author: "Phadke09", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Konark_Sun_Temple_6.jpg" },
    { url: "/images/heritage/konark-sun-temple/08.jpg", title: "The Jagamohana up close", author: "Bhubaneswar2009", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Konark_Sun_Temple_,_Konark_,_Odisha_,_India.jpg" },
  ],
  "ajanta-caves": [
    { url: "/images/heritage/ajanta-caves/01.jpg", title: "Prayer hall of Cave 26", author: "Dey.sandip", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Cave_26,_Ajanta.jpg" },
    { url: "/images/heritage/ajanta-caves/02.jpg", title: "Monks at the cave entrances", author: "Amitabha Gupta", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Buddhist_Monks_inside_premises_of_Ajanta_Caves,_Maharashtra,_India_22.jpg" },
    { url: "/images/heritage/ajanta-caves/03.jpg", title: "Monks walking past the caves", author: "Amitabha Gupta", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Buddhist_Monks_inside_premises_of_Ajanta_Caves,_Maharashtra,_India_28.jpg" },
    { url: "/images/heritage/ajanta-caves/04.jpg", title: "The facade of Cave 26", author: "Rohit Sharma", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Exterior_of_Cave_26,_Ajanta_Caves,_Maharashtra,_India.jpg" },
    { url: "/images/heritage/ajanta-caves/05.jpg", title: "The reclining Buddha in Cave 26", author: "Rohit Sharma", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Cave_26_(Mahaparinirvana_of_the_Buddha),_Ajanta_caves.jpg" },
    { url: "/images/heritage/ajanta-caves/06.jpg", title: "Carved pillars of Cave 26", author: "Sharvarism", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Beautifully_carved_pillars_of_Ajanta_Cave_No._26.jpg" },
    { url: "/images/heritage/ajanta-caves/07.jpg", title: "Inside Cave 3", author: "Dey.sandip", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Cave_3,_Ajanta.jpg" },
    { url: "/images/heritage/ajanta-caves/08.jpg", title: "The horseshoe of caves seen from Cave 26", author: "Shishirdasika", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Ajanta_Caves_from_Cave_26.jpg" },
  ],
  "ellora-caves": [
    { url: "/images/heritage/ellora-caves/01.jpg", title: "Pillared corridor of Cave 16", author: "Dey.sandip", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Corridor_at_Cave_16,_Ellora.jpg" },
    { url: "/images/heritage/ellora-caves/02.jpg", title: "Kailasa Temple courtyard and Mahabharata reliefs", author: "Rohit Sharma", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Courtyard_and_Mahabharata_Reliefs_at_the_Kailasa_Temple,_Ellora_01.jpg" },
    { url: "/images/heritage/ellora-caves/03.jpg", title: "The Kailasa Temple mandapa roof", author: "Rohit Sharma", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Kailasa_Temple_Mandapa_roof.jpg" },
    { url: "/images/heritage/ellora-caves/04.jpg", title: "Kailasanatha Temple, carved from a single rock", author: "Vyacheslav Argenberg", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Ellora_Caves,_India,_Kailasanatha_Temple_2.jpg" },
    { url: "/images/heritage/ellora-caves/05.jpg", title: "Dashavatara Temple, Cave 15", author: "Vyacheslav Argenberg", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Ellora_Caves,_India,_Dashavatara_Temple,_Cave_15.jpg" },
    { url: "/images/heritage/ellora-caves/06.jpg", title: "Rock-cut monastery caves", author: "Vyacheslav Argenberg", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Ellora_Caves,_India,_Rock-cut_monastery_temple_caves.jpg" },
    { url: "/images/heritage/ellora-caves/07.jpg", title: "Jain Caves 33 and 34", author: "Anupamg", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Ellora_Caves_33(R)_and_34(L).jpg" },
    { url: "/images/heritage/ellora-caves/08.jpg", title: "Indra Sabha, Cave 32", author: "Shishirdasika", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Indra_sabha_Ellora_Cave_32.jpg" },
  ],
  "red-fort": [
    { url: "/images/heritage/red-fort/01.jpg", title: "Lahori Gate, the main entrance", author: "Lucky181993", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Lahori_Gate_(Red_Fort),_Delhi,_India_(2017).jpg" },
    { url: "/images/heritage/red-fort/02.jpg", title: "Naubat Khana, the drum house", author: "Jakub Hałun", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:20191203_Naubat_Khana,_Red_Fort,_Delhi_0456_6348_DxO.jpg" },
    { url: "/images/heritage/red-fort/03.jpg", title: "Diwan-i-Khas, hall of private audience", author: "Jakub Hałun", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:20191203_Diwan-i-Khas,_Red_Fort,_Delhi_0503_6358_DxO.jpg" },
    { url: "/images/heritage/red-fort/04.jpg", title: "Moti Masjid, the Pearl Mosque", author: "Jakub Hałun", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:20191203_Moti_Masjid,_Red_Fort,_Delhi_0502_6354_DxO.jpg" },
    { url: "/images/heritage/red-fort/05.jpg", title: "Painted vault of the Chatta Chowk bazaar", author: "Syed Sajidul Islam", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Red_Fort_-Delhi_-Delhi_-SSI_010.jpg" },
    { url: "/images/heritage/red-fort/06.jpg", title: "Bhadon Pavilion", author: "Syed Sajidul Islam", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Red_Fort_-Delhi_-Delhi_-SSI_025.jpg" },
    { url: "/images/heritage/red-fort/07.jpg", title: "The ramparts lit at night", author: "Sachin Mishra 24", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Red_fort-Delhi--Dsc-0001.jpg" },
    { url: "/images/heritage/red-fort/08.jpg", title: "Delhi Gate with its stone elephants", author: "Dgp4004", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Delhi_Gate,_Red_Fort,_Delhi.jpg" },
  ],
};
