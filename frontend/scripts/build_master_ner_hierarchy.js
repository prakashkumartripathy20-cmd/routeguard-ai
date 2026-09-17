const fs = require('fs');
const path = require('path');

// Clean Arunachal data with English titles
const arunachalPradeshData = {
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
      id: "kameng",
      name: "Kameng Division (West)",
      districts: [
        {
          name: "Tawang",
          circles: [
            { name: "Tawang", villages: ["Tawang Town", "Kharung", "Lhou", "Gyangkhar", "Seru", "Mukto"] },
            { name: "Kitpi", villages: ["Kitpi", "Lhou Basti", "Namet", "Paikhar"] },
            { name: "Jang", villages: ["Jang", "Mago", "Thingbu", "Rho", "Lemberdung"] },
            { name: "Lumla", villages: ["Lumla", "Dudunghar", "Zemithang", "Khinmey", "Socktsen"] }
          ]
        },
        {
          name: "West Kameng",
          circles: [
            { name: "Bomdila", villages: ["Bomdila HQ", "Sera", "Wanghoo", "Pedung", "Rahu"] },
            { name: "Dirang", villages: ["Dirang Basti", "Thembang", "Sange", "Manda", "Rama Camp"] },
            { name: "Bhalukpong", villages: ["Bhalukpong Town", "Tipi", "Sessa", "Pinjoli", "Dojmara"] },
            { name: "Rupa", villages: ["Rupa Basti", "Jigaon", "Sallari", "Shergaon"] },
            { name: "Kalaktang", villages: ["Kalaktang", "Balemu", "Boha", "Angkaling", "Morshing"] },
            { name: "Singchung", villages: ["Singchung", "Dahlung", "Nafra Link", "Kaspi"] }
          ]
        },
        {
          name: "Bichom",
          circles: [
            { name: "Nafra", villages: ["Nafra Basti", "Draka", "Khellong", "Nachiban"] },
            { name: "Lada", villages: ["Lada HQ", "Sawa", "Bana Link"] }
          ]
        },
        {
          name: "East Kameng",
          circles: [
            { name: "Seppa", villages: ["Seppa Town", "Pechang", "Type Colony", "Kakoki"] },
            { name: "Chayang Tajo", villages: ["Chayang Tajo", "Khenewa", "Pipu", "Gyawepurang"] },
            { name: "Bameng", villages: ["Bameng", "Pakke Camp", "Liyak"] }
          ]
        },
        {
          name: "Pakke-Kessang",
          circles: [
            { name: "Pakke-Kessang", villages: ["Lemmi HQ", "Rilloh", "Veo"] },
            { name: "Seijosa", villages: ["Seijosa Basti", "Darlong", "A2", "Upper Mobuso"] }
          ]
        }
      ]
    },
    {
      id: "subansiri",
      name: "Subansiri Division (Central-West)",
      districts: [
        {
          name: "Papum Pare",
          circles: [
            { name: "Yupia", villages: ["Yupia HQ", "Tigdo", "Hollongi", "Borum"] },
            { name: "Kimin", villages: ["Kimin Town", "Lichi", "Kheel", "Belapu"] },
            { name: "Sagalee", villages: ["Sagalee", "Leporiang", "Mengio", "Toru"] }
          ]
        },
        {
          name: "Itanagar Capital Complex",
          circles: [
            { name: "Itanagar", villages: ["Itanagar Core", "Ganga Village", "Chimpu", "Jully"] },
            { name: "Naharlagun", villages: ["Model Village", "Nirjuli", "Banderdewa", "Karsingsa"] }
          ]
        },
        {
          name: "Lower Subansiri",
          circles: [
            { name: "Ziro", villages: ["Hapoli", "Hari", "Hong", "Bullaa", "Hija", "Dutta"] },
            { name: "Yachuli", villages: ["Yachuli", "Mai", "Pitapool", "Talo"] }
          ]
        },
        {
          name: "Keyi Panyor",
          circles: [
            { name: "Yachuli", villages: ["Yachuli Sadar", "Pistana", "Kheel"] }
          ]
        },
        {
          name: "Kurung Kumey",
          circles: [
            { name: "Koloriang", villages: ["Koloriang Town", "Damin", "Parsiparlo", "Nyapin", "Sangram"] }
          ]
        },
        {
          name: "Kra Daadi",
          circles: [
            { name: "Palin", villages: ["Palin HQ", "Chambang", "Yangte", "Tali", "Pipsorang"] }
          ]
        },
        {
          name: "Kamle",
          circles: [
            { name: "Raga", villages: ["Raga HQ", "Giba", "Dollungmukh", "Puchigeko"] }
          ]
        },
        {
          name: "Upper Subansiri",
          circles: [
            { name: "Daporijo", villages: ["Daporijo Town", "Dumporijo", "Nacho", "Taliha", "Siyum"] }
          ]
        }
      ]
    },
    {
      id: "siang",
      name: "Siang Division (Central)",
      districts: [
        {
          name: "East Siang",
          circles: [
            { name: "Pasighat", villages: ["Pasighat Municipal", "Ruksin", "Mebo", "Sille-Oyan", "Bilat"] }
          ]
        },
        {
          name: "West Siang",
          circles: [
            { name: "Aalo", villages: ["Aalo Town", "Liromoba", "Yomcha", "Kamba", "Darak"] }
          ]
        },
        {
          name: "Siang",
          circles: [
            { name: "Boleng", villages: ["Boleng HQ", "Pangin", "Rumgong", "Kaying", "Riga"] }
          ]
        },
        {
          name: "Upper Siang",
          circles: [
            { name: "Yingkiong", villages: ["Yingkiong Town", "Tuting", "Gelling", "Singa", "Mariyang"] }
          ]
        },
        {
          name: "Lower Siang",
          circles: [
            { name: "Likabali", villages: ["Likabali HQ", "Nari", "Gensi", "Kora"] }
          ]
        },
        {
          name: "Leparada",
          circles: [
            { name: "Basar", villages: ["Basar Town", "Tirbin", "Daring", "Sago"] }
          ]
        },
        {
          name: "Shi-Yomi",
          circles: [
            { name: "Tato", villages: ["Tato HQ", "Mechuka Valley", "Monigong", "Pidi"] }
          ]
        }
      ]
    },
    {
      id: "lohit_dibang",
      name: "Lohit & Dibang Division (East)",
      districts: [
        {
          name: "Dibang Valley",
          circles: [
            { name: "Anini", villages: ["Anini Town", "Etalin", "Anelih", "Kronli", "Mipi"] }
          ]
        },
        {
          name: "Lower Dibang Valley",
          circles: [
            { name: "Roing", villages: ["Roing Town", "Dambuk", "Hunzli", "Koronu", "Desali"] }
          ]
        },
        {
          name: "Lohit",
          circles: [
            { name: "Tezu", villages: ["Tezu Municipality", "Sunpura", "Wakro", "Tafragam"] }
          ]
        },
        {
          name: "Anjaw",
          circles: [
            { name: "Hawai", villages: ["Hawai HQ", "Hayuliang", "Manchal", "Walong", "Kibithu"] }
          ]
        },
        {
          name: "Namsai",
          circles: [
            { name: "Namsai", villages: ["Namsai Town", "Chowkham", "Mahadevpur", "Lathao", "Piyong"] }
          ]
        }
      ]
    },
    {
      id: "patkai",
      name: "Patkai Division (South-East)",
      districts: [
        {
          name: "Tirap",
          circles: [
            { name: "Khonsa", villages: ["Khonsa Town", "Deomali", "Namsang", "Lazu", "Dadam", "Soha"] }
          ]
        },
        {
          name: "Changlang",
          circles: [
            { name: "Changlang HQ", villages: ["Changlang HQ", "Miao", "Jairampur", "Bordumsa", "Diyun", "Nampong"] }
          ]
        },
        {
          name: "Longding",
          circles: [
            { name: "Longding", villages: ["Longding Town", "Kanubari", "Pangchau", "Wakka", "Pumao"] }
          ]
        }
      ]
    }
  ]
};

// Auto-generate standard Wards for every village in Arunachal
arunachalPradeshData.divisions.forEach(div => {
  div.districts.forEach(dist => {
    dist.circles.forEach(cir => {
      cir.villages = cir.villages.map((vilName, vIdx) => ({
        id: `VIL_${dist.name.replace(/[^A-Z]/gi, '').substring(0,3).toUpperCase()}_${vIdx+1}`,
        name: vilName,
        wards: [
          { ward_no: 1, name: `${vilName} - Ward 01 (Upper Sector)` },
          { ward_no: 2, name: `${vilName} - Ward 02 (Middle Sector)` },
          { ward_no: 3, name: `${vilName} - Ward 03 (Market/TCP)` },
          { ward_no: 4, name: `${vilName} - Ward 04 (Lower Basti)` }
        ]
      }));
    });
  });
});

// Build 7 other NER States
const otherStates = [
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
        id: "div_upper_assam",
        name: "Upper Assam Division",
        districts: [
          { name: "Dibrugarh", circles: [{ name: "Dibrugarh Sadar", villages: ["Dibrugarh Town", "Chabua", "Moran", "Naharkatia"] }] },
          { name: "Tinsukia", circles: [{ name: "Tinsukia Sadar", villages: ["Tinsukia Town", "Digboi", "Margherita", "Doomdooma"] }] },
          { name: "Sivasagar", circles: [{ name: "Sivasagar Sadar", villages: ["Sivasagar Town", "Nazira", "Amguri", "Demow"] }] },
          { name: "Jorhat", circles: [{ name: "Jorhat Sadar", villages: ["Jorhat Town", "Titabor", "Mariani", "Teok"] }] },
          { name: "Golaghat", circles: [{ name: "Golaghat Sadar", villages: ["Golaghat Town", "Bokakhat", "Dergaon", "Sarupathar"] }] },
          { name: "Charaideo", circles: [{ name: "Sonari Sadar", villages: ["Sonari", "Mahmora", "Sapekhati"] }] },
          { name: "Majuli", circles: [{ name: "Garamur Sadar", villages: ["Garamur", "Kamalabari", "Jaimati"] }] }
        ]
      },
      {
        id: "div_lower_assam",
        name: "Lower Assam Division",
        districts: [
          { name: "Kamrup Metropolitan", circles: [{ name: "Guwahati Sadar", villages: ["Dispur", "Chandmari", "Panbazar", "Zoo Road", "Jalukbari", "Khanapara"] }] },
          { name: "Kamrup Rural", circles: [{ name: "Amingaon Sadar", villages: ["Amingaon", "North Guwahati", "Hazo", "Rangia", "Bayan"] }] },
          { name: "Nalbari", circles: [{ name: "Nalbari Sadar", villages: ["Nalbari Town", "Tihu", "Ghurath"] }] },
          { name: "Barpeta", circles: [{ name: "Barpeta Sadar", villages: ["Barpeta Town", "Howly", "Sarthebari", "Pathsala"] }] },
          { name: "Dhubri", circles: [{ name: "Dhubri Sadar", villages: ["Dhubri Town", "Gauripur", "Bilasipara", "Golakganj"] }] },
          { name: "Goalpara", circles: [{ name: "Goalpara Sadar", villages: ["Goalpara Town", "Dudhnoi", "Lakhipur", "Krishnai"] }] },
          { name: "Bongaigaon", circles: [{ name: "Bongaigaon Sadar", villages: ["Bongaigaon Town", "Abhayapuri", "Bijni"] }] }
        ]
      },
      {
        id: "div_central_assam",
        name: "Central Assam Division",
        districts: [
          { name: "Nagaon", circles: [{ name: "Nagaon Sadar", villages: ["Nagaon Town", "Kaliaobor", "Raha", "Dhing", "Samaguri"] }] },
          { name: "Morigaon", circles: [{ name: "Morigaon Sadar", villages: ["Morigaon Town", "Jagiroad", "Bhuragaon", "Laharighat"] }] },
          { name: "Hojai", circles: [{ name: "Hojai Sadar", villages: ["Hojai Town", "Lanka", "Doboka"] }] },
          { name: "Sonitpur", circles: [{ name: "Tezpur Sadar", villages: ["Tezpur Town", "Dhekiajuli", "Jamuguri", "Rangapara"] }] },
          { name: "Biswanath", circles: [{ name: "Biswanath Sadar", villages: ["Biswanath Chariali", "Gohpur", "Helem"] }] }
        ]
      },
      {
        id: "div_barak_valley",
        name: "Barak Valley & N.C. Hills Division",
        districts: [
          { name: "Cachar", circles: [{ name: "Silchar Sadar", villages: ["Silchar Municipal", "Lakhipur", "Sonai", "Katigorah"] }] },
          { name: "Karimganj", circles: [{ name: "Karimganj Sadar", villages: ["Karimganj Town", "Badarpur", "Nilambazar", "Patharkandi"] }] },
          { name: "Hailakandi", circles: [{ name: "Hailakandi Sadar", villages: ["Hailakandi Town", "Lala", "Algapur"] }] },
          { name: "Dima Hasao", circles: [{ name: "Haflong Sadar", villages: ["Haflong", "Umrangso", "Mahur", "Maibang"] }] }
        ]
      },
      {
        id: "div_bodoland_hills",
        name: "Hills & Bodoland Division",
        districts: [
          { name: "Karbi Anglong", circles: [{ name: "Diphu Sadar", villages: ["Diphu", "Bokajan", "Howraghat"] }] },
          { name: "Kokrajhar", circles: [{ name: "Kokrajhar Sadar", villages: ["Kokrajhar Town", "Gossaigaon", "Dotma"] }] },
          { name: "Chirang", circles: [{ name: "Kajalgaon Sadar", villages: ["Kajalgaon", "Sidli", "Bijni"] }] },
          { name: "Udalguri", circles: [{ name: "Udalguri Sadar", villages: ["Udalguri Town", "Tangla", "Rowta"] }] },
          { name: "Baksa", circles: [{ name: "Musalpur Sadar", villages: ["Musalpur", "Tamulpur", "Salbari"] }] }
        ]
      }
    ]
  },
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
        id: "div_khasi_jaintia",
        name: "Khasi & Jaintia Hills Division",
        districts: [
          { name: "East Khasi Hills", circles: [{ name: "Shillong Sadar", villages: ["Shillong Central", "Laitumkhrah", "Police Bazar", "Mawlai", "Upper Shillong", "Cherrapunji/Sohra"] }] },
          { name: "West Khasi Hills", circles: [{ name: "Nongstoin Sadar", villages: ["Nongstoin", "Mairang", "Ranikor"] }] },
          { name: "Ri-Bhoi", circles: [{ name: "Nongpoh Sadar", villages: ["Nongpoh", "Byrnihat", "Umling"] }] },
          { name: "West Jaintia Hills", circles: [{ name: "Jowai Sadar", villages: ["Jowai Town", "Amlarem", "Nartiang"] }] },
          { name: "East Jaintia Hills", circles: [{ name: "Khliehriat Sadar", villages: ["Khliehriat", "Sutnga", "Lad Rymbai"] }] }
        ]
      },
      {
        id: "div_garo_hills",
        name: "Garo Hills Division",
        districts: [
          { name: "West Garo Hills", circles: [{ name: "Tura Sadar", villages: ["Tura Municipal", "Chandmari Tura", "Rongram", "Phulbari"] }] },
          { name: "East Garo Hills", circles: [{ name: "Williamnagar Sadar", villages: ["Williamnagar", "Rongjeng", "Songsak"] }] },
          { name: "South Garo Hills", circles: [{ name: "Baghmara Sadar", villages: ["Baghmara", "Chokpot", "Gasuapara"] }] },
          { name: "North Garo Hills", circles: [{ name: "Resubelpara Sadar", villages: ["Resubelpara", "Mendipathar", "Bajengdoba"] }] }
        ]
      }
    ]
  },
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
        id: "div_imphal_valley",
        name: "Imphal Valley Division",
        districts: [
          { name: "Imphal East", circles: [{ name: "Porompat Sadar", villages: ["Porompat", "Heingang", "Kshetrigao", "Lamlai"] }] },
          { name: "Imphal West", circles: [{ name: "Lamphelpat Sadar", villages: ["Lamphelpat", "Thangmeiband", "Singjamei", "Langthabal"] }] },
          { name: "Thoubal", circles: [{ name: "Thoubal Sadar", villages: ["Thoubal Town", "Yairipok", "Wanging", "Lilong"] }] },
          { name: "Bishnupur", circles: [{ name: "Bishnupur Sadar", villages: ["Bishnupur Town", "Moirang", "Nambol", "Loktak"] }] }
        ]
      },
      {
        id: "div_manipur_hills",
        name: "Hills Region Division",
        districts: [
          { name: "Churachandpur", circles: [{ name: "Churachandpur Sadar", villages: ["Churachandpur Town", "Tuibong", "Singngat"] }] },
          { name: "Ukhrul", circles: [{ name: "Ukhrul Sadar", villages: ["Ukhrul Town", "Kamjong", "Phungyar"] }] },
          { name: "Senapati", circles: [{ name: "Senapati Sadar", villages: ["Senapati Town", "Mao", "Tadubi"] }] },
          { name: "Tamenglong", circles: [{ name: "Tamenglong Sadar", villages: ["Tamenglong Town", "Tamei", "Noney"] }] },
          { name: "Chandel", circles: [{ name: "Chandel Sadar", villages: ["Chandel Town", "Tengnoupal", "Moreh Border Town"] }] }
        ]
      }
    ]
  },
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
        id: "div_nagaland_central",
        name: "Central & Southern Division",
        districts: [
          { name: "Kohima", circles: [{ name: "Kohima Sadar", villages: ["Kohima Capital Core", "Northern Angami", "Southern Angami", "Tseminyu Link"] }] },
          { name: "Dimapur", circles: [{ name: "Dimapur Sadar", villages: ["Dimapur Municipal", "Chumoukedima", "Niuland", "Purana Bazar"] }] },
          { name: "Mokokchung", circles: [{ name: "Mokokchung Sadar", villages: ["Mokokchung Town", "Changtongya", "Tuli"] }] },
          { name: "Wokha", circles: [{ name: "Wokha Sadar", villages: ["Wokha Town", "Sanis", "Bhandari"] }] },
          { name: "Phek", circles: [{ name: "Phek Sadar", villages: ["Phek Town", "Pfutsero", "Chozuba"] }] }
        ]
      },
      {
        id: "div_nagaland_eastern",
        name: "Northern & Eastern Division",
        districts: [
          { name: "Mon", circles: [{ name: "Mon Sadar", villages: ["Mon Town", "Aboi", "Tizit", "Tobu"] }] },
          { name: "Tuensang", circles: [{ name: "Tuensang Sadar", villages: ["Tuensang Town", "Longkhim", "Noklak Link"] }] },
          { name: "Zunheboto", circles: [{ name: "Zunheboto Sadar", villages: ["Zunheboto Town", "Aghunato", "Satakha"] }] },
          { name: "Kiphire", circles: [{ name: "Kiphire Sadar", villages: ["Kiphire Town", "Pungro", "Seyochung"] }] },
          { name: "Longleng", circles: [{ name: "Longleng Sadar", villages: ["Longleng Town", "Tamlu"] }] }
        ]
      }
    ]
  },
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
        id: "div_mizoram_north",
        name: "Northern Division",
        districts: [
          { name: "Aizawl", circles: [{ name: "Aizawl Sadar", villages: ["Aizawl Core Municipal", "Zemabawk", "Kulikawn", "Bawngkawn", "Durtlang"] }] },
          { name: "Kolasib", circles: [{ name: "Kolasib Sadar", villages: ["Kolasib Town", "Vairengte", "Bairabi"] }] },
          { name: "Mamit", circles: [{ name: "Mamit Sadar", villages: ["Mamit Town", "Lengpui", "Zawlnuam"] }] },
          { name: "Champhai", circles: [{ name: "Champhai Sadar", villages: ["Champhai Town", "Zokhawthar Border", "Khawzawl Link"] }] }
        ]
      },
      {
        id: "div_mizoram_south",
        name: "Southern Division",
        districts: [
          { name: "Lunglei", circles: [{ name: "Lunglei Sadar", villages: ["Lunglei Town", "Hnahthial", "Tlabung"] }] },
          { name: "Serchhip", circles: [{ name: "Serchhip Sadar", villages: ["Serchhip Town", "Thenzawl", "North Vanlaiphai"] }] },
          { name: "Lawngtlai", circles: [{ name: "Lawngtlai Sadar", villages: ["Lawngtlai Town", "Sangau", "Chawngte"] }] },
          { name: "Siaha", circles: [{ name: "Siaha Sadar", villages: ["Siaha Town", "Tipa", "Phura"] }] }
        ]
      }
    ]
  },
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
        id: "div_tripura_west",
        name: "West & South Division",
        districts: [
          { name: "West Tripura", circles: [{ name: "Agartala Sadar", villages: ["Agartala Core Municipal", "Badharghat", "Pratapgarh", "Jirania"] }] },
          { name: "Sepahijala", circles: [{ name: "Bishramganj Sadar", villages: ["Bishramganj", "Sonamura", "Jatrapur"] }] },
          { name: "Khowai", circles: [{ name: "Khowai Sadar", villages: ["Khowai Town", "Teliamura", "Kalyanpur"] }] },
          { name: "Gomati", circles: [{ name: "Udaipur Sadar", villages: ["Udaipur Town", "Amarpur", "Karbook"] }] },
          { name: "South Tripura", circles: [{ name: "Belonia Sadar", villages: ["Belonia Town", "Sabroom", "Santirbazar"] }] }
        ]
      },
      {
        id: "div_tripura_north",
        name: "North & Dhalai Division",
        districts: [
          { name: "North Tripura", circles: [{ name: "Dharmanagar Sadar", villages: ["Dharmanagar", "Kanchanpur", "Panisagar"] }] },
          { name: "Unakoti", circles: [{ name: "Kailashahar Sadar", villages: ["Kailashahar Town", "Kumarghat"] }] },
          { name: "Dhalai", circles: [{ name: "Ambassa Sadar", villages: ["Ambassa Town", "Kamalpur", "Gandacherra", "Longtharai Valley"] }] }
        ]
      }
    ]
  },
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
        id: "div_sikkim_east_north",
        name: "East & North Division",
        districts: [
          { name: "Gangtok", circles: [{ name: "Gangtok Sadar", villages: ["Gangtok Core Municipal", "Tadong", "Deorali", "Ranipool", "Rumtek"] }] },
          { name: "Mangan", circles: [{ name: "Mangan Sadar", villages: ["Mangan Town", "Chungthang", "Lachen", "Lachung"] }] },
          { name: "Pakyong", circles: [{ name: "Pakyong Sadar", villages: ["Pakyong Town", "Rhenock", "Rangpo"] }] }
        ]
      },
      {
        id: "div_sikkim_west_south",
        name: "West & South Division",
        districts: [
          { name: "Namchi", circles: [{ name: "Namchi Sadar", villages: ["Namchi Town", "Jorethang", "Ravangla", "Melli"] }] },
          { name: "Gyalshing", circles: [{ name: "Gyalshing Sadar", villages: ["Gyalshing Town", "Pelling", "Yuksom", "Dentam"] }] },
          { name: "Soreng", circles: [{ name: "Soreng Sadar", villages: ["Soreng Town", "Nayabazar", "Dharamdin"] }] }
        ]
      }
    ]
  }
];

// Auto generate wards for other states as well
otherStates.forEach(st => {
  st.divisions.forEach(div => {
    div.districts.forEach(dist => {
      dist.circles.forEach(cir => {
        cir.villages = cir.villages.map((vName, vIdx) => ({
          id: `VIL_${dist.name.replace(/[^A-Z]/gi, '').substring(0,3).toUpperCase()}_${vIdx+1}`,
          name: vName,
          wards: [
            { ward_no: 1, name: `${vName} - Ward 01 (Upper Sector)` },
            { ward_no: 2, name: `${vName} - Ward 02 (Middle Sector)` },
            { ward_no: 3, name: `${vName} - Ward 03 (Market/TCP)` },
            { ward_no: 4, name: `${vName} - Ward 04 (Lower Basti)` }
          ]
        }));
      });
    });
  });
});

const masterNerHierarchy = {
  region: "North Eastern Region (NER)",
  totalStates: 8,
  states: [arunachalPradeshData, ...otherStates]
};

const masterNerPath = path.join(__dirname, '..', 'master_ner_hierarchy.json');
fs.writeFileSync(masterNerPath, JSON.stringify(masterNerHierarchy, null, 2));
console.log("Successfully generated master_ner_hierarchy.json at " + masterNerPath);

const arunachalPath = path.join(__dirname, '..', 'arunachal_master_data.json');
fs.writeFileSync(arunachalPath, JSON.stringify(arunachalPradeshData, null, 2));

const appArunachalPath = path.join(__dirname, '..', 'src', 'app', 'regional-hierarchy', 'arunachal_master_data.json');
fs.writeFileSync(appArunachalPath, JSON.stringify(arunachalPradeshData, null, 2));

const appNerPath = path.join(__dirname, '..', 'src', 'app', 'regional-hierarchy', 'master_ner_hierarchy.json');
fs.writeFileSync(appNerPath, JSON.stringify(masterNerHierarchy, null, 2));

console.log("Copied json files to src/app/regional-hierarchy/");
