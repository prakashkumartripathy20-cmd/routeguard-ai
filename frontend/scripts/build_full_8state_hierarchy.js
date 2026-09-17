const fs = require('fs');
const path = require('path');

// District Base Coordinates Map (lat, lon)
const districtCoords = {
  // ARUNACHAL PRADESH
  "Tawang": [27.5861, 91.8594],
  "West Kameng": [27.2645, 92.4162],
  "Bichom": [27.1800, 92.5500],
  "East Kameng": [27.3556, 93.0361],
  "Pakke-Kessang": [26.9700, 93.1200],
  "Papum Pare": [27.0844, 93.6053],
  "Itanagar Capital Complex": [27.0844, 93.6053],
  "Lower Subansiri": [27.5458, 93.8322],
  "Keyi Panyor": [27.4500, 93.7500],
  "Kurung Kumey": [27.9064, 93.3511],
  "Kra Daadi": [27.7200, 93.6300],
  "Kamle": [27.6000, 94.0200],
  "Upper Subansiri": [27.9875, 94.2211],
  "East Siang": [28.0667, 95.3333],
  "West Siang": [28.1667, 94.8000],
  "Siang": [28.3300, 94.9700],
  "Upper Siang": [28.6167, 95.0500],
  "Lower Siang": [27.6500, 94.6600],
  "Leparada": [27.9800, 94.6800],
  "Shi-Yomi": [28.5300, 94.3700],
  "Dibang Valley": [28.9833, 95.9000],
  "Lower Dibang Valley": [28.1333, 95.8333],
  "Lohit": [27.9167, 96.1667],
  "Anjaw": [27.8833, 96.8000],
  "Namsai": [27.6667, 95.8667],
  "Tirap": [27.0167, 95.5667],
  "Changlang": [27.1167, 95.7333],
  "Longding": [26.8667, 95.3333],

  // ASSAM
  "Dibrugarh": [27.4728, 94.9120],
  "Tinsukia": [27.4922, 95.3537],
  "Sivasagar": [26.9826, 94.6425],
  "Jorhat": [26.7509, 94.2037],
  "Golaghat": [26.5167, 93.9667],
  "Charaideo": [27.0300, 94.8900],
  "Majuli": [26.9500, 94.1600],
  "Kamrup Metropolitan": [26.1445, 91.7362],
  "Kamrup Rural": [26.3100, 91.5800],
  "Nalbari": [26.4400, 91.4400],
  "Barpeta": [26.3228, 91.0069],
  "Dhubri": [26.0207, 89.9740],
  "Goalpara": [26.1822, 90.6277],
  "Bongaigaon": [26.4800, 90.5600],
  "South Salmara-Mankachar": [25.5600, 89.8700],
  "Baksa": [26.6800, 91.4100],
  "Bajali": [26.5100, 91.1700],
  "Nagaon": [26.3452, 92.6840],
  "Morigaon": [26.2500, 92.3300],
  "Hojai": [26.0000, 92.8600],
  "Darrang": [26.4500, 92.0300],
  "Udalguri": [26.7400, 92.1300],
  "Sonitpur": [26.6338, 92.8006],
  "Biswanath": [26.7300, 93.1500],
  "Cachar": [24.8333, 92.7789],
  "Karimganj": [24.8700, 92.3500],
  "Hailakandi": [24.6800, 92.5600],
  "Dima Hasao": [25.1800, 93.0100],
  "Karbi Anglong": [25.8428, 93.4350],
  "West Karbi Anglong": [25.8000, 92.5500],
  "Kokrajhar": [26.4014, 90.2697],
  "Chirang": [26.5300, 90.5000],
  "Tamulpur": [26.6200, 91.5600],

  // MEGHALAYA
  "East Khasi Hills": [25.5788, 91.8933],
  "West Khasi Hills": [25.5200, 91.2700],
  "South West Khasi Hills": [25.3200, 91.2400],
  "Eastern West Khasi Hills": [25.5600, 91.4300],
  "Ri-Bhoi": [25.9000, 91.8800],
  "West Jaintia Hills": [25.4500, 92.2000],
  "East Jaintia Hills": [25.3400, 92.3700],
  "West Garo Hills": [25.5142, 90.2033],
  "East Garo Hills": [25.6500, 90.6200],
  "South Garo Hills": [25.1900, 90.6300],
  "North Garo Hills": [25.9000, 90.5800],
  "South West Garo Hills": [25.4400, 89.9300],

  // MANIPUR
  "Imphal East": [24.8000, 93.9700],
  "Imphal West": [24.8170, 93.9368],
  "Thoubal": [24.6300, 94.0100],
  "Bishnupur": [24.6300, 93.7600],
  "Kakching": [24.4800, 93.9800],
  "Jiribam": [24.8000, 93.1200],
  "Churachandpur": [24.3333, 93.6833],
  "Ukhrul": [25.1167, 94.3667],
  "Senapati": [25.2700, 94.0200],
  "Tamenglong": [24.9800, 93.4900],
  "Chandel": [24.2500, 94.3000],
  "Kangpokpi": [25.1500, 93.9700],
  "Tengnoupal": [24.3500, 94.1500],
  "Pherzawl": [24.2100, 93.2000],
  "Noney": [24.8200, 93.6000],
  "Kamjong": [24.8000, 94.5000],

  // NAGALAND
  "Kohima": [25.6747, 94.1100],
  "Dimapur": [25.9060, 93.7271],
  "Mokokchung": [26.3256, 94.5203],
  "Wokha": [26.1000, 94.2600],
  "Phek": [25.6600, 94.4700],
  "Zunheboto": [25.9700, 94.5200],
  "Peren": [25.5700, 93.7300],
  "Tseminyu": [25.9000, 94.2100],
  "Chumoukedima": [25.8100, 93.7700],
  "Niuland": [25.9800, 93.8500],
  "Mon": [26.7500, 95.0667],
  "Tuensang": [26.2833, 94.8333],
  "Longleng": [26.5400, 94.8000],
  "Kiphire": [25.9000, 94.7800],
  "Noklak": [26.2000, 95.0200],
  "Shamator": [26.1200, 94.9000],

  // MIZORAM
  "Aizawl": [23.7271, 92.7176],
  "Kolasib": [24.2333, 92.6833],
  "Mamit": [23.9300, 92.4800],
  "Champhai": [23.4667, 93.3333],
  "Khawzawl": [23.5300, 93.1800],
  "Saitual": [23.9700, 92.9700],
  "Lunglei": [22.8833, 92.7333],
  "Serchhip": [23.3000, 92.8500],
  "Lawngtlai": [22.5200, 92.8900],
  "Siaha": [22.4800, 92.9800],
  "Hnahthial": [22.9600, 92.9300],

  // TRIPURA
  "West Tripura": [23.8315, 91.2868],
  "Sepahijala": [23.6300, 91.3300],
  "Khowai": [24.0600, 91.6000],
  "Gomati": [23.5333, 91.4833],
  "South Tripura": [23.2500, 91.4600],
  "North Tripura": [24.3667, 92.1667],
  "Unakoti": [24.3000, 92.0100],
  "Dhalai": [23.8500, 91.8500],

  // SIKKIM
  "Gangtok": [27.3389, 88.6065],
  "Mangan": [27.5000, 88.5333],
  "Pakyong": [27.2400, 88.5900],
  "Namchi": [27.1667, 88.3500],
  "Gyalshing": [27.2833, 88.2500],
  "Soreng": [27.1600, 88.2000]
};

const statesData = [
  // STATE 1: ARUNACHAL PRADESH
  {
    id: "state_arunachal",
    name: "Arunachal Pradesh",
    capital: "Itanagar",
    code: "AR",
    census_code: 12,
    riskProfile: "🔴 High Alpine & Landslide Prone",
    totalDivisions: 5,
    totalDistricts: 28,
    divisions: [
      {
        id: "div_ar_kameng",
        name: "Kameng Division (West)",
        districts: [
          { name: "Tawang", circles: [
            { name: "Tawang Sadar", villages: ["Tawang Town", "Kharung", "Lhou", "Gyangkhar", "Seru", "Mukto"] },
            { name: "Kitpi", villages: ["Kitpi", "Lhou Basti", "Namet", "Paikhar"] },
            { name: "Jang", villages: ["Jang", "Mago", "Thingbu", "Rho", "Lemberdung"] },
            { name: "Lumla", villages: ["Lumla", "Dudunghar", "Zemithang", "Khinmey", "Socktsen"] }
          ]},
          { name: "West Kameng", circles: [
            { name: "Bomdila", villages: ["Bomdila HQ", "Sera", "Wanghoo", "Pedung", "Rahu"] },
            { name: "Dirang", villages: ["Dirang Basti", "Thembang", "Sange", "Manda", "Rama Camp"] },
            { name: "Bhalukpong", villages: ["Bhalukpong Town", "Tipi", "Sessa", "Pinjoli", "Dojmara"] },
            { name: "Rupa", villages: ["Rupa Basti", "Jigaon", "Sallari", "Shergaon"] },
            { name: "Kalaktang", villages: ["Kalaktang", "Balemu", "Boha", "Angkaling", "Morshing"] },
            { name: "Singchung", villages: ["Singchung", "Dahlung", "Nafra Link", "Kaspi"] }
          ]},
          { name: "Bichom", circles: [
            { name: "Nafra", villages: ["Nafra Basti", "Draka", "Khellong", "Nachiban"] },
            { name: "Lada", villages: ["Lada HQ", "Sawa", "Bana Link"] }
          ]},
          { name: "East Kameng", circles: [
            { name: "Seppa", villages: ["Seppa Town", "Pechang", "Type Colony", "Kakoki"] },
            { name: "Chayang Tajo", villages: ["Chayang Tajo", "Khenewa", "Pipu", "Gyawepurang"] },
            { name: "Bameng", villages: ["Bameng", "Pakke Camp", "Liyak"] }
          ]},
          { name: "Pakke-Kessang", circles: [
            { name: "Pakke-Kessang", villages: ["Lemmi HQ", "Rilloh", "Veo"] },
            { name: "Seijosa", villages: ["Seijosa Basti", "Darlong", "A2", "Upper Mobuso"] }
          ]}
        ]
      },
      {
        id: "div_ar_subansiri",
        name: "Subansiri Division (Central-West)",
        districts: [
          { name: "Papum Pare", circles: [
            { name: "Yupia", villages: ["Yupia HQ", "Tigdo", "Hollongi", "Borum"] },
            { name: "Kimin", villages: ["Kimin Town", "Lichi", "Kheel", "Belapu"] },
            { name: "Sagalee", villages: ["Sagalee", "Leporiang", "Mengio", "Toru"] }
          ]},
          { name: "Itanagar Capital Complex", circles: [
            { name: "Itanagar", villages: ["Itanagar Core", "Ganga Village", "Chimpu", "Jully"] },
            { name: "Naharlagun", villages: ["Model Village", "Nirjuli", "Banderdewa", "Karsingsa"] }
          ]},
          { name: "Lower Subansiri", circles: [
            { name: "Ziro", villages: ["Hapoli", "Hari", "Hong", "Bullaa", "Hija", "Dutta"] },
            { name: "Yachuli", villages: ["Yachuli", "Mai", "Pitapool", "Talo"] }
          ]},
          { name: "Keyi Panyor", circles: [
            { name: "Yachuli Sadar", villages: ["Yachuli Sadar", "Pistana", "Kheel Basti"] }
          ]},
          { name: "Kurung Kumey", circles: [
            { name: "Koloriang", villages: ["Koloriang Town", "Damin", "Parsiparlo", "Nyapin", "Sangram"] }
          ]},
          { name: "Kra Daadi", circles: [
            { name: "Palin", villages: ["Palin HQ", "Chambang", "Yangte", "Tali", "Pipsorang"] }
          ]},
          { name: "Kamle", circles: [
            { name: "Raga", villages: ["Raga HQ", "Giba", "Dollungmukh", "Puchigeko"] }
          ]},
          { name: "Upper Subansiri", circles: [
            { name: "Daporijo", villages: ["Daporijo Town", "Dumporijo", "Nacho", "Taliha", "Siyum"] }
          ]}
        ]
      },
      {
        id: "div_ar_siang",
        name: "Siang Division (Central)",
        districts: [
          { name: "East Siang", circles: [
            { name: "Pasighat", villages: ["Pasighat Municipal", "Ruksin", "Mebo", "Sille-Oyan", "Bilat"] }
          ]},
          { name: "West Siang", circles: [
            { name: "Aalo", villages: ["Aalo Town", "Liromoba", "Yomcha", "Kamba", "Darak"] }
          ]},
          { name: "Siang", circles: [
            { name: "Boleng", villages: ["Boleng HQ", "Pangin", "Rumgong", "Kaying", "Riga"] }
          ]},
          { name: "Upper Siang", circles: [
            { name: "Yingkiong", villages: ["Yingkiong Town", "Tuting", "Gelling", "Singa", "Mariyang"] }
          ]},
          { name: "Lower Siang", circles: [
            { name: "Likabali", villages: ["Likabali HQ", "Nari", "Gensi", "Kora"] }
          ]},
          { name: "Leparada", circles: [
            { name: "Basar", villages: ["Basar Town", "Tirbin", "Daring", "Sago"] }
          ]},
          { name: "Shi-Yomi", circles: [
            { name: "Tato", villages: ["Tato HQ", "Mechuka Valley", "Monigong", "Pidi"] }
          ]}
        ]
      },
      {
        id: "div_ar_lohit",
        name: "Lohit & Dibang Division (East)",
        districts: [
          { name: "Dibang Valley", circles: [
            { name: "Anini", villages: ["Anini Town", "Etalin", "Anelih", "Kronli", "Mipi"] }
          ]},
          { name: "Lower Dibang Valley", circles: [
            { name: "Roing", villages: ["Roing Town", "Dambuk", "Hunzli", "Koronu", "Desali"] }
          ]},
          { name: "Lohit", circles: [
            { name: "Tezu", villages: ["Tezu Municipality", "Sunpura", "Wakro", "Tafragam"] }
          ]},
          { name: "Anjaw", circles: [
            { name: "Hawai", villages: ["Hawai HQ", "Hayuliang", "Manchal", "Walong", "Kibithu"] }
          ]},
          { name: "Namsai", circles: [
            { name: "Namsai", villages: ["Namsai Town", "Chowkham", "Mahadevpur", "Lathao", "Piyong"] }
          ]}
        ]
      },
      {
        id: "div_ar_patkai",
        name: "Patkai Division (South-East)",
        districts: [
          { name: "Tirap", circles: [
            { name: "Khonsa", villages: ["Khonsa Town", "Deomali", "Namsang", "Lazu", "Dadam", "Soha"] }
          ]},
          { name: "Changlang", circles: [
            { name: "Changlang HQ", villages: ["Changlang HQ", "Miao", "Jairampur", "Bordumsa", "Diyun", "Nampong"] }
          ]},
          { name: "Longding", circles: [
            { name: "Longding", villages: ["Longding Town", "Kanubari", "Pangchau", "Wakka", "Pumao"] }
          ]}
        ]
      }
    ]
  },

  // STATE 2: ASSAM
  {
    id: "state_assam",
    name: "Assam",
    capital: "Dispur / Guwahati",
    code: "AS",
    census_code: 18,
    riskProfile: "🟡 Severe Annual Flood & Erosion Zone",
    totalDivisions: 5,
    totalDistricts: 35,
    divisions: [
      {
        id: "div_as_upper",
        name: "Upper Assam Division",
        districts: [
          { name: "Dibrugarh", circles: [
            { name: "Dibrugarh Sadar", villages: ["Dibrugarh Town", "Chabua", "Moran", "Naharkatia", "Tengakhat"] },
            { name: "Tingkhong", villages: ["Tingkhong Town", "Rajgarh", "Khowang", "Moranhat"] }
          ]},
          { name: "Tinsukia", circles: [
            { name: "Tinsukia Sadar", villages: ["Tinsukia Town", "Digboi", "Margherita", "Doomdooma", "Makum"] },
            { name: "Sadiya", villages: ["Chapakhowa", "Kundil", "Islampur", "Shantipur"] }
          ]},
          { name: "Sivasagar", circles: [
            { name: "Sivasagar Sadar", villages: ["Sivasagar Town", "Nazira", "Amguri", "Demow", "Rongpur"] },
            { name: "Sonari Circle", villages: ["Bhojo", "Suffry", "Borhat", "Towkok"] }
          ]},
          { name: "Jorhat", circles: [
            { name: "Jorhat Sadar", villages: ["Jorhat Town", "Titabor", "Mariani", "Teok", "Cinnamara"] },
            { name: "Majuli Sub-Circle", villages: ["Jatrapur", "Kamalabari West", "Bhogpur"] }
          ]},
          { name: "Golaghat", circles: [
            { name: "Golaghat Sadar", villages: ["Golaghat Town", "Bokakhat", "Dergaon", "Sarupathar", "Numaligarh"] },
            { name: "Dhanauri", villages: ["Barpathar", "Kachamari", "Merapani"] }
          ]},
          { name: "Charaideo", circles: [
            { name: "Sonari Sadar", villages: ["Sonari Town", "Mahmora", "Sapekhati", "Mathurapur"] }
          ]},
          { name: "Majuli", circles: [
            { name: "Garamur Sadar", villages: ["Garamur", "Kamalabari", "Jaimati", "Auniati", "Dakhinpat"] }
          ]}
        ]
      },
      {
        id: "div_as_lower",
        name: "Lower Assam Division",
        districts: [
          { name: "Kamrup Metropolitan", circles: [
            { name: "Guwahati Sadar", villages: ["Dispur Capital", "Chandmari", "Panbazar", "Zoo Road", "Jalukbari", "Khanapara", "Ganeshguri", "Beltola"] },
            { name: "Azara Circle", villages: ["Azara", "Dharapur", "Garal", "Mirza", "Kahilipara"] }
          ]},
          { name: "Kamrup Rural", circles: [
            { name: "Amingaon Sadar", villages: ["Amingaon", "North Guwahati", "Hazo", "Rangia", "Bayan"] },
            { name: "Boko Circle", villages: ["Boko Town", "Chaygaon", "Goraimari", "Lampi"] }
          ]},
          { name: "Nalbari", circles: [
            { name: "Nalbari Sadar", villages: ["Nalbari Town", "Tihu", "Ghurath", "Barka", "Mukalmua"] }
          ]},
          { name: "Barpeta", circles: [
            { name: "Barpeta Sadar", villages: ["Barpeta Town", "Howly", "Sarthebari", "Pathsala", "Jania"] }
          ]},
          { name: "Dhubri", circles: [
            { name: "Dhubri Sadar", villages: ["Dhubri Town", "Gauripur", "Bilasipara", "Golakganj", "Agomani"] }
          ]},
          { name: "Goalpara", circles: [
            { name: "Goalpara Sadar", villages: ["Goalpara Town", "Dudhnoi", "Lakhipur", "Krishnai", "Matia"] }
          ]},
          { name: "Bongaigaon", circles: [
            { name: "Bongaigaon Sadar", villages: ["Bongaigaon Town", "Abhayapuri", "Bijni", "Manikpur"] }
          ]},
          { name: "South Salmara-Mankachar", circles: [
            { name: "Mankachar Sadar", villages: ["Mankachar Town", "Hatsingimari", "Fekamari"] }
          ]},
          { name: "Baksa", circles: [
            { name: "Musalpur Sadar", villages: ["Musalpur Town", "Tamulpur", "Salbari", "Barama"] }
          ]},
          { name: "Bajali", circles: [
            { name: "Pathsala Sadar", villages: ["Pathsala Town", "Bajali Core", "Choukhuty"] }
          ]}
        ]
      },
      {
        id: "div_as_central",
        name: "Central Assam Division",
        districts: [
          { name: "Nagaon", circles: [
            { name: "Nagaon Sadar", villages: ["Nagaon Town", "Kaliaobor", "Raha", "Dhing", "Samaguri", "Rupahihat"] }
          ]},
          { name: "Morigaon", circles: [
            { name: "Morigaon Sadar", villages: ["Morigaon Town", "Jagiroad", "Bhuragaon", "Laharighat", "Mayong"] }
          ]},
          { name: "Hojai", circles: [
            { name: "Hojai Sadar", villages: ["Hojai Town", "Lanka", "Doboka", "Lumding"] }
          ]},
          { name: "Darrang", circles: [
            { name: "Mangaldai Sadar", villages: ["Mangaldai Town", "Sipajhar", "Kharupetia", "Dalgaon"] }
          ]},
          { name: "Udalguri", circles: [
            { name: "Udalguri Sadar", villages: ["Udalguri Town", "Tangla", "Rowta", "Khoirabari"] }
          ]},
          { name: "Sonitpur", circles: [
            { name: "Tezpur Sadar", villages: ["Tezpur Town", "Dhekiajuli", "Jamuguri", "Rangapara", "Chariduar"] }
          ]},
          { name: "Biswanath", circles: [
            { name: "Biswanath Sadar", villages: ["Biswanath Chariali", "Gohpur", "Helem", "Behali"] }
          ]}
        ]
      },
      {
        id: "div_as_barak",
        name: "Barak Valley & N.C. Hills Division",
        districts: [
          { name: "Cachar", circles: [
            { name: "Silchar Sadar", villages: ["Silchar Municipal", "Lakhipur", "Sonai", "Katigorah", "Dholai", "Baskandi"] }
          ]},
          { name: "Karimganj", circles: [
            { name: "Karimganj Sadar", villages: ["Karimganj Town", "Badarpur", "Nilambazar", "Patharkandi", "Ramkrishna Nagar"] }
          ]},
          { name: "Hailakandi", circles: [
            { name: "Hailakandi Sadar", villages: ["Hailakandi Town", "Lala", "Algapur", "Katlicherra"] }
          ]},
          { name: "Dima Hasao", circles: [
            { name: "Haflong Sadar", villages: ["Haflong Town", "Umrangso", "Mahur", "Maibang", "Harangajao"] }
          ]}
        ]
      },
      {
        id: "div_as_bodoland",
        name: "Hills & Bodoland Division",
        districts: [
          { name: "Karbi Anglong", circles: [
            { name: "Diphu Sadar", villages: ["Diphu Town", "Bokajan", "Howraghat", "Phuloni", "Manja"] }
          ]},
          { name: "West Karbi Anglong", circles: [
            { name: "Hamren Sadar", villages: ["Hamren Town", "Donkamokam", "Baithalangso"] }
          ]},
          { name: "Kokrajhar", circles: [
            { name: "Kokrajhar Sadar", villages: ["Kokrajhar Town", "Gossaigaon", "Dotma", "Bhadrapor"] }
          ]},
          { name: "Chirang", circles: [
            { name: "Kajalgaon Sadar", villages: ["Kajalgaon Town", "Sidli", "Bijni", "Runikhata"] }
          ]},
          { name: "Tamulpur", circles: [
            { name: "Tamulpur Sadar", villages: ["Tamulpur Town", "Goreswar", "Nagrijuli"] }
          ]}
        ]
      }
    ]
  },

  // STATE 3: MEGHALAYA
  {
    id: "state_meghalaya",
    name: "Meghalaya",
    capital: "Shillong",
    code: "ML",
    census_code: 17,
    riskProfile: "🔴 Extreme Rainfall & Flash Flood Hazard",
    totalDivisions: 2,
    totalDistricts: 12,
    divisions: [
      {
        id: "div_ml_khasi",
        name: "Khasi & Jaintia Hills Division",
        districts: [
          { name: "East Khasi Hills", circles: [
            { name: "Shillong Sadar", villages: ["Shillong Central", "Laitumkhrah", "Police Bazar", "Mawlai", "Upper Shillong", "Cherrapunji/Sohra", "Pynursla", "Mawsynram"] }
          ]},
          { name: "West Khasi Hills", circles: [
            { name: "Nongstoin Sadar", villages: ["Nongstoin Town", "Mairang", "Ranikor", "Mawkyrwat Link"] }
          ]},
          { name: "South West Khasi Hills", circles: [
            { name: "Mawkyrwat Sadar", villages: ["Mawkyrwat Town", "Ranikor Basti", "Nonghyllam"] }
          ]},
          { name: "Eastern West Khasi Hills", circles: [
            { name: "Mairang Sadar", villages: ["Mairang Town", "Mawthadraishan", "Kynshi"] }
          ]},
          { name: "Ri-Bhoi", circles: [
            { name: "Nongpoh Sadar", villages: ["Nongpoh Town", "Byrnihat", "Umling", "Umsning", "Jirang"] }
          ]},
          { name: "West Jaintia Hills", circles: [
            { name: "Jowai Sadar", villages: ["Jowai Town", "Amlarem", "Nartiang", "Thadlaskein"] }
          ]},
          { name: "East Jaintia Hills", circles: [
            { name: "Khliehriat Sadar", villages: ["Khliehriat Town", "Sutnga", "Lad Rymbai", "Saipung"] }
          ]}
        ]
      },
      {
        id: "div_ml_garo",
        name: "Garo Hills Division",
        districts: [
          { name: "West Garo Hills", circles: [
            { name: "Tura Sadar", villages: ["Tura Municipal", "Chandmari Tura", "Rongram", "Phulbari", "Dadenggre"] }
          ]},
          { name: "East Garo Hills", circles: [
            { name: "Williamnagar Sadar", villages: ["Williamnagar Town", "Rongjeng", "Songsak", "Samanda"] }
          ]},
          { name: "South Garo Hills", circles: [
            { name: "Baghmara Sadar", villages: ["Baghmara Town", "Chokpot", "Gasuapara", "Rongara"] }
          ]},
          { name: "North Garo Hills", circles: [
            { name: "Resubelpara Sadar", villages: ["Resubelpara Town", "Mendipathar", "Bajengdoba", "Dainadubi"] }
          ]},
          { name: "South West Garo Hills", circles: [
            { name: "Ampati Sadar", villages: ["Ampati Town", "Betasing", "Zikzak"] }
          ]}
        ]
      }
    ]
  },

  // STATE 4: MANIPUR
  {
    id: "state_manipur",
    name: "Manipur",
    capital: "Imphal",
    code: "MN",
    census_code: 14,
    riskProfile: "🔴 Seismic Zone V & Hill Corridor Slip",
    totalDivisions: 2,
    totalDistricts: 16,
    divisions: [
      {
        id: "div_mn_valley",
        name: "Imphal Valley Division",
        districts: [
          { name: "Imphal East", circles: [
            { name: "Porompat Sadar", villages: ["Porompat Town", "Heingang", "Kshetrigao", "Lamlai", "Sawombung"] }
          ]},
          { name: "Imphal West", circles: [
            { name: "Lamphelpat Sadar", villages: ["Lamphelpat Town", "Thangmeiband", "Singjamei", "Langthabal", "Patsoi", "Wangoi"] }
          ]},
          { name: "Thoubal", circles: [
            { name: "Thoubal Sadar", villages: ["Thoubal Town", "Yairipok", "Wangjing", "Lilong"] }
          ]},
          { name: "Bishnupur", circles: [
            { name: "Bishnupur Sadar", villages: ["Bishnupur Town", "Moirang", "Nambol", "Loktak Lake", "Kumbi"] }
          ]},
          { name: "Kakching", circles: [
            { name: "Kakching Sadar", villages: ["Kakching Town", "Wabagai", "Sugnoo"] }
          ]},
          { name: "Jiribam", circles: [
            { name: "Jiribam Sadar", villages: ["Jiribam Town", "Borobekra", "Lantanba"] }
          ]}
        ]
      },
      {
        id: "div_mn_hills",
        name: "Hills Region Division",
        districts: [
          { name: "Churachandpur", circles: [
            { name: "Churachandpur Sadar", villages: ["Churachandpur Town", "Tuibong", "Singngat", "Henglep", "Thanlon"] }
          ]},
          { name: "Ukhrul", circles: [
            { name: "Ukhrul Sadar", villages: ["Ukhrul Town", "Kamjong Link", "Phungyar", "Chingai", "Lungchong Maiphei"] }
          ]},
          { name: "Senapati", circles: [
            { name: "Senapati Sadar", villages: ["Senapati Town", "Mao", "Tadubi", "Paomata", "Willong"] }
          ]},
          { name: "Tamenglong", circles: [
            { name: "Tamenglong Sadar", villages: ["Tamenglong Town", "Tamei", "Noney Link", "Tousem"] }
          ]},
          { name: "Chandel", circles: [
            { name: "Chandel Sadar", villages: ["Chandel Town", "Tengnoupal Link", "Moreh Border Town", "Chakpikarong"] }
          ]},
          { name: "Kangpokpi", circles: [
            { name: "Kangpokpi Sadar", villages: ["Kangpokpi Town", "Saitu Gamphazol", "Saikul"] }
          ]},
          { name: "Tengnoupal", circles: [
            { name: "Tengnoupal Sadar", villages: ["Tengnoupal Town", "Moreh Core", "Machhi"] }
          ]},
          { name: "Pherzawl", circles: [
            { name: "Pherzawl Sadar", villages: ["Pherzawl HQ", "Vangai Range", "Parbung"] }
          ]},
          { name: "Noney", circles: [
            { name: "Noney Sadar", villages: ["Noney Town", "Longmai", "Khoupum", "Nungba"] }
          ]},
          { name: "Kamjong", circles: [
            { name: "Kamjong Sadar", villages: ["Kamjong Town", "Sahamphung", "Kasom Khullen"] }
          ]}
        ]
      }
    ]
  },

  // STATE 5: NAGALAND
  {
    id: "state_nagaland",
    name: "Nagaland",
    capital: "Kohima",
    code: "NL",
    census_code: 13,
    riskProfile: "🟡 Steep Terrain Landslide Corridor",
    totalDivisions: 2,
    totalDistricts: 16,
    divisions: [
      {
        id: "div_nl_central",
        name: "Central & Southern Division",
        districts: [
          { name: "Kohima", circles: [
            { name: "Kohima Sadar", villages: ["Kohima Capital Core", "Northern Angami", "Southern Angami", "Jakhama", "Chiephobozou"] }
          ]},
          { name: "Dimapur", circles: [
            { name: "Dimapur Sadar", villages: ["Dimapur Municipal", "Chumoukedima Link", "Niuland Link", "Purana Bazar", "Dhansiripar"] }
          ]},
          { name: "Mokokchung", circles: [
            { name: "Mokokchung Sadar", villages: ["Mokokchung Town", "Changtongya", "Tuli", "Mangkolemba", "Kobulong"] }
          ]},
          { name: "Wokha", circles: [
            { name: "Wokha Sadar", villages: ["Wokha Town", "Sanis", "Bhandari", "Sungro"] }
          ]},
          { name: "Phek", circles: [
            { name: "Phek Sadar", villages: ["Phek Town", "Pfutsero", "Chozuba", "Meluri"] }
          ]},
          { name: "Zunheboto", circles: [
            { name: "Zunheboto Sadar", villages: ["Zunheboto Town", "Aghunato", "Satakha", "Pughoboto", "Akuluto"] }
          ]},
          { name: "Peren", circles: [
            { name: "Peren Sadar", villages: ["Peren Town", "Jalukie", "Tening", "Nthiu"] }
          ]},
          { name: "Tseminyu", circles: [
            { name: "Tseminyu Sadar", villages: ["Tseminyu Town", "Tsogin", "Chunlikha"] }
          ]},
          { name: "Chumoukedima", circles: [
            { name: "Chumoukedima Sadar", villages: ["Chumoukedima Town", "Medziphema", "Seithekema"] }
          ]},
          { name: "Niuland", circles: [
            { name: "Niuland Sadar", villages: ["Niuland Town", "Kuhuboto", "Aghunaqa"] }
          ]}
        ]
      },
      {
        id: "div_nl_eastern",
        name: "Northern & Eastern Division",
        districts: [
          { name: "Mon", circles: [
            { name: "Mon Sadar", villages: ["Mon Town", "Aboi", "Tizit", "Tobu", "Chen", "Naginimora"] }
          ]},
          { name: "Tuensang", circles: [
            { name: "Tuensang Sadar", villages: ["Tuensang Town", "Longkhim", "Noksen", "Chessore"] }
          ]},
          { name: "Longleng", circles: [
            { name: "Longleng Sadar", villages: ["Longleng Town", "Tamlu", "Yongnyah"] }
          ]},
          { name: "Kiphire", circles: [
            { name: "Kiphire Sadar", villages: ["Kiphire Town", "Pungro", "Seyochung", "Sitimi"] }
          ]},
          { name: "Noklak", circles: [
            { name: "Noklak Sadar", villages: ["Noklak Town", "Thonoknyu", "Panso"] }
          ]},
          { name: "Shamator", circles: [
            { name: "Shamator Sadar", villages: ["Shamator Town", "Chessore Link", "Tulumung"] }
          ]}
        ]
      }
    ]
  },

  // STATE 6: MIZORAM
  {
    id: "state_mizoram",
    name: "Mizoram",
    capital: "Aizawl",
    code: "MZ",
    census_code: 15,
    riskProfile: "🔴 High Slope Instability & Flash Flood",
    totalDivisions: 2,
    totalDistricts: 11,
    divisions: [
      {
        id: "div_mz_north",
        name: "Northern Division",
        districts: [
          { name: "Aizawl", circles: [
            { name: "Aizawl Sadar", villages: ["Aizawl Core Municipal", "Zemabawk", "Kulikawn", "Bawngkawn", "Durtlang", "Tlangnuam"] }
          ]},
          { name: "Kolasib", circles: [
            { name: "Kolasib Sadar", villages: ["Kolasib Town", "Vairengte", "Bairabi", "Kawnpui"] }
          ]},
          { name: "Mamit", circles: [
            { name: "Mamit Sadar", villages: ["Mamit Town", "Lengpui", "Zawlnuam", "West Phaileng"] }
          ]},
          { name: "Champhai", circles: [
            { name: "Champhai Sadar", villages: ["Champhai Town", "Zokhawthar Border", "Khawbund", "Vaphai"] }
          ]},
          { name: "Khawzawl", circles: [
            { name: "Khawzawl Sadar", villages: ["Khawzawl Town", "Biatate", "Rabung"] }
          ]},
          { name: "Saitual", circles: [
            { name: "Saitual Sadar", villages: ["Saitual Town", "Keifang", "Phullen"] }
          ]}
        ]
      },
      {
        id: "div_mz_south",
        name: "Southern Division",
        districts: [
          { name: "Lunglei", circles: [
            { name: "Lunglei Sadar", villages: ["Lunglei Town", "Hnahthial Link", "Tlabung", "Bunghmun", "Lungsen"] }
          ]},
          { name: "Serchhip", circles: [
            { name: "Serchhip Sadar", villages: ["Serchhip Town", "Thenzawl", "North Vanlaiphai", "East Lungdar"] }
          ]},
          { name: "Lawngtlai", circles: [
            { name: "Lawngtlai Sadar", villages: ["Lawngtlai Town", "Sangau", "Chawngte", "Bungtlang South"] }
          ]},
          { name: "Siaha", circles: [
            { name: "Siaha Sadar", villages: ["Siaha Town", "Tipa", "Phura", "Tuipang"] }
          ]},
          { name: "Hnahthial", circles: [
            { name: "Hnahthial Sadar", villages: ["Hnahthial Town", "South Vanlaiphai", "Tarpho"] }
          ]}
        ]
      }
    ]
  },

  // STATE 7: TRIPURA
  {
    id: "state_tripura",
    name: "Tripura",
    capital: "Agartala",
    code: "TR",
    census_code: 16,
    riskProfile: "🟡 Border River Overflow & Siltation",
    totalDivisions: 2,
    totalDistricts: 8,
    divisions: [
      {
        id: "div_tr_west",
        name: "West & South Division",
        districts: [
          { name: "West Tripura", circles: [
            { name: "Agartala Sadar", villages: ["Agartala Core Municipal", "Badharghat", "Pratapgarh", "Jirania", "Ranirbazar", "Dukli"] }
          ]},
          { name: "Sepahijala", circles: [
            { name: "Bishramganj Sadar", villages: ["Bishramganj", "Sonamura", "Jatrapur", "Boxanagar", "Nalchar"] }
          ]},
          { name: "Khowai", circles: [
            { name: "Khowai Sadar", villages: ["Khowai Town", "Teliamura", "Kalyanpur", "Champaknagar"] }
          ]},
          { name: "Gomati", circles: [
            { name: "Udaipur Sadar", villages: ["Udaipur Town", "Amarpur", "Karbook", "Matabari"] }
          ]},
          { name: "South Tripura", circles: [
            { name: "Belonia Sadar", villages: ["Belonia Town", "Sabroom", "Santirbazar", "Rajnagar"] }
          ]}
        ]
      },
      {
        id: "div_tr_north",
        name: "North & Dhalai Division",
        districts: [
          { name: "North Tripura", circles: [
            { name: "Dharmanagar Sadar", villages: ["Dharmanagar", "Kanchanpur", "Panisagar", "Kadamtala"] }
          ]},
          { name: "Unakoti", circles: [
            { name: "Kailashahar Sadar", villages: ["Kailashahar Town", "Kumarghat", "Pecharthal"] }
          ]},
          { name: "Dhalai", circles: [
            { name: "Ambassa Sadar", villages: ["Ambassa Town", "Kamalpur", "Gandacherra", "Longtharai Valley", "Manu"] }
          ]}
        ]
      }
    ]
  },

  // STATE 8: SIKKIM
  {
    id: "state_sikkim",
    name: "Sikkim",
    capital: "Gangtok",
    code: "SK",
    census_code: 11,
    riskProfile: "🔴 GLOF (Glacial Lake Outburst) & Alpine Avalanche",
    totalDivisions: 2,
    totalDistricts: 6,
    divisions: [
      {
        id: "div_sk_east_north",
        name: "East & North Division",
        districts: [
          { name: "Gangtok", circles: [
            { name: "Gangtok Sadar", villages: ["Gangtok Core Municipal", "Tadong", "Deorali", "Ranipool", "Rumtek", "Singtam"] }
          ]},
          { name: "Mangan", circles: [
            { name: "Mangan Sadar", villages: ["Mangan Town", "Chungthang", "Lachen", "Lachung", "Dzongu"] }
          ]},
          { name: "Pakyong", circles: [
            { name: "Pakyong Sadar", villages: ["Pakyong Town", "Rhenock", "Rangpo", "Rorathang"] }
          ]}
        ]
      },
      {
        id: "div_sk_west_south",
        name: "West & South Division",
        districts: [
          { name: "Namchi", circles: [
            { name: "Namchi Sadar", villages: ["Namchi Town", "Jorethang", "Ravangla", "Melli", "Yangang"] }
          ]},
          { name: "Gyalshing", circles: [
            { name: "Gyalshing Sadar", villages: ["Gyalshing Town", "Pelling", "Yuksom", "Dentam", "Tashiding"] }
          ]},
          { name: "Soreng", circles: [
            { name: "Soreng Sadar", villages: ["Soreng Town", "Nayabazar", "Dharamdin", "Chumbong"] }
          ]}
        ]
      }
    ]
  }
];

// Base District Elevation Map (m)
const districtElevations = {
  "Tawang": 3048, "West Kameng": 2217, "Bichom": 1850, "East Kameng": 1100, "Pakke-Kessang": 950,
  "Papum Pare": 750, "Itanagar Capital Complex": 750, "Lower Subansiri": 1568, "Keyi Panyor": 1400,
  "Kurung Kumey": 1350, "Kra Daadi": 1280, "Kamle": 1150, "Upper Subansiri": 1250, "East Siang": 155,
  "West Siang": 620, "Siang": 750, "Upper Siang": 1100, "Lower Siang": 380, "Leparada": 890,
  "Shi-Yomi": 1420, "Dibang Valley": 1950, "Lower Dibang Valley": 390, "Lohit": 410, "Anjaw": 1780,
  "Namsai": 160, "Tirap": 850, "Changlang": 580, "Longding": 720,
  "Kamrup Metropolitan": 55, "Dibrugarh": 108, "Jorhat": 116, "Cachar": 35, "Dima Hasao": 512,
  "East Khasi Hills": 1525, "West Khasi Hills": 1350, "Ri-Bhoi": 540, "West Jaintia Hills": 1380, "West Garo Hills": 349,
  "Imphal East": 786, "Imphal West": 786, "Churachandpur": 914, "Ukhrul": 1662, "Senapati": 1420,
  "Kohima": 1444, "Dimapur": 145, "Mokokchung": 1325, "Mon": 890, "Tuensang": 1370,
  "Aizawl": 1132, "Lunglei": 722, "Champhai": 1678,
  "West Tripura": 35, "North Tripura": 140, "Dhalai": 180,
  "Gangtok": 1650, "Mangan": 1310, "Namchi": 1315, "Gyalshing": 1280
};

const wardTypeConfigs = [
  {
    ward_no: 1,
    suffix: "Ward 01 (Upper Ridge Sector)",
    type_name: "Upper Ridge & Administrative Watch Sector",
    elev_delta: +180,
    pop_base: 450,
    pop_var: 180,
    hh_base: 90,
    hh_var: 35,
    area: 1.8,
    hazard: "Ridge Wind & Slope Slump Hazard Index: 0.35 (Moderate)",
    color: "#a855f7",
    infra: "High-Altitude Water Reservoir, VHF Telemetry Relay Tower, Ridge Watchpost",
    members: ["Tashi Norbu", "Pemba Tshering", "Lobsang Dorjee", "Wangchu Lama", "Rinchen Khandu"]
  },
  {
    ward_no: 2,
    suffix: "Ward 02 (Middle Residential Belt)",
    type_name: "Middle Residential & Primary Civic Services Belt",
    elev_delta: +60,
    pop_base: 1250,
    pop_var: 420,
    hh_base: 240,
    hh_var: 80,
    area: 2.6,
    hazard: "Low Seismic & Landslide Hazard Index: 0.14 (Safe Civic Zone)",
    color: "#10b981",
    infra: "Gram Panchayat HQ Hall, Primary Health Sub-Center, Govt Middle School",
    members: ["Sangey Lhamo", "Biren Gogoi", "Karsang Tsering", "Dawa Zangmu", "Pema Sonam"]
  },
  {
    ward_no: 3,
    suffix: "Ward 03 (Market/TCP Transit Hub)",
    type_name: "Market Bazaar & Transit Checkpost (TCP) Corridor",
    elev_delta: -20,
    pop_base: 880,
    pop_var: 310,
    hh_base: 175,
    hh_var: 60,
    area: 1.4,
    hazard: "Highway Traffic Flow & Cut-Slope Erosion Index: 0.44 (Moderate-High)",
    color: "#f59e0b",
    infra: "Commercial Highway Bazaar, Police Transit Checkpost (TCP), Fuel Depot",
    members: ["Dorjee Khandu", "Rajesh Chettri", "Tsering Dhondup", "Sonam Tobgay", "Khandu Wangmo"]
  },
  {
    ward_no: 4,
    suffix: "Ward 04 (Lower River Valley Basti)",
    type_name: "Lower River Valley Basin & Paddy Agricultural Basti",
    elev_delta: -140,
    pop_base: 420,
    pop_var: 160,
    hh_base: 85,
    hh_var: 30,
    area: 3.4,
    hazard: "River Flash Flood & Debris Runoff Vulnerability Index: 0.78 (Red Alert)",
    color: "#ef4444",
    infra: "Terraced Paddy Granary, Stream Canal Sluice Gate, Agri Storage Yard",
    members: ["Jambey Tashi", "Kipgen Kuki", "Naba Kumar Das", "Passang Norbu", "Phurpa Tsering"]
  }
];

// Helper to systematically populate lat, lon, and 4 Gram Wards per village across ALL districts in ALL 8 States
statesData.forEach(st => {
  st.divisions.forEach(div => {
    div.districts.forEach(dist => {
      const basePos = districtCoords[dist.name] || [26.1445, 91.7362];
      const baseElev = districtElevations[dist.name] || 950;
      
      dist.circles.forEach((cir, cIdx) => {
        cir.villages = cir.villages.map((vItem, vIdx) => {
          const vName = typeof vItem === 'string' ? vItem : vItem.name;
          const cleanDistName = dist.name.replace(/[^A-Z]/gi, '').substring(0,3).toUpperCase();
          const vilId = `VIL_${cleanDistName}_${vIdx+1}`;
          
          const vilLat = basePos[0] + (cIdx * 0.02) + (vIdx * 0.008);
          const vilLon = basePos[1] + (cIdx * 0.02) + (vIdx * 0.008);

          const latOffsets = [0.0025, 0.0010, -0.0010, -0.0025];
          const lonOffsets = [0.0025, -0.0010, 0.0010, -0.0025];

          const wards = wardTypeConfigs.map((cfg, wIdx) => {
            const seed = (cIdx * 7 + vIdx * 13 + wIdx * 19) % 5;
            const pop = cfg.pop_base + ((cIdx + vIdx * 3 + wIdx * 7) % cfg.pop_var);
            const hh = cfg.hh_base + ((cIdx * 2 + vIdx * 5 + wIdx * 3) % cfg.hh_var);
            const elev = baseElev + cfg.elev_delta;
            const memberName = cfg.members[seed];

            return {
              ward_no: cfg.ward_no,
              name: `${vName} - ${cfg.suffix}`,
              type_name: cfg.type_name,
              lat: parseFloat((vilLat + latOffsets[wIdx]).toFixed(4)),
              lon: parseFloat((vilLon + lonOffsets[wIdx]).toFixed(4)),
              elevation_m: elev,
              population: pop,
              households: hh,
              area_sqkm: cfg.area,
              hazard_rating: cfg.hazard,
              hazard_color: cfg.color,
              infrastructure: cfg.infra,
              ward_member: memberName
            };
          });

          return {
            id: vilId,
            name: vName,
            lat: parseFloat(vilLat.toFixed(4)),
            lon: parseFloat(vilLon.toFixed(4)),
            elevation_m: baseElev,
            wards: wards
          };
        });
      });
    });
  });
});

let totalDistrictsCount = 0;
let totalCirclesCount = 0;
let totalVillagesCount = 0;
let totalWardsCount = 0;

statesData.forEach(st => {
  let stDistricts = 0;
  st.divisions.forEach(div => {
    stDistricts += div.districts.length;
    div.districts.forEach(dist => {
      totalCirclesCount += dist.circles.length;
      dist.circles.forEach(cir => {
        totalVillagesCount += cir.villages.length;
        cir.villages.forEach(v => {
          totalWardsCount += v.wards.length;
        });
      });
    });
  });
  st.totalDistricts = stDistricts;
  st.totalDivisions = st.divisions.length;
  totalDistrictsCount += stDistricts;
});

const masterNerHierarchy = {
  region: "North Eastern Region (NER)",
  totalStates: 8,
  totalDistricts: totalDistrictsCount,
  totalCircles: totalCirclesCount,
  totalVillages: totalVillagesCount,
  totalWards: totalWardsCount,
  states: statesData
};

console.log("Full NER Hierarchy Metrics with GPS Coordinates:", {
  totalStates: masterNerHierarchy.totalStates,
  totalDistricts: masterNerHierarchy.totalDistricts,
  totalCircles: masterNerHierarchy.totalCircles,
  totalVillages: masterNerHierarchy.totalVillages,
  totalWards: masterNerHierarchy.totalWards
});

// Output JSON files
const masterNerPath = path.join(__dirname, '..', 'master_ner_hierarchy.json');
fs.writeFileSync(masterNerPath, JSON.stringify(masterNerHierarchy, null, 2));

const appNerPath = path.join(__dirname, '..', 'src', 'app', 'regional-hierarchy', 'master_ner_hierarchy.json');
fs.writeFileSync(appNerPath, JSON.stringify(masterNerHierarchy, null, 2));

console.log("Successfully generated master_ner_hierarchy.json with lat/lon for all wards!");
