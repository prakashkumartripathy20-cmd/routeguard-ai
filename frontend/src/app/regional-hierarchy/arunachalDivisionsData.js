// arunachalDivisionsData.js - Regional Hierarchy Module for Arunachal Pradesh

export const arunachalPradeshHierarchy = {
  id: "state_arunachal",
  name: "Arunachal Pradesh",
  capital: "Itanagar",
  totalDivisions: 5,
  totalDistricts: 28,
  riskProfile: "High Alpine & Landslide Prone",
  divisions: [
    {
      id: "div_kameng",
      name: "Kameng Division (Western Division)",
      headquarters: "Bomdila",
      strategicFocus: "High Altitude Border Security (Bhutan & China Border), Defense Logistics & Tourism",
      lifelineHighway: "NH-13 (Bhalukpong-Tawang Corridor)",
      riskLevel: "Critical",
      districts: [
        {
          name: "Tawang",
          headquarters: "Tawang",
          elevation: "3,048 m",
          subDivisions: ["Tawang Sadar", "Lumla", "Jang"],
          primaryRisk: "Heavy Snowfall & Avalanche (Sela Pass)"
        },
        {
          name: "West Kameng",
          headquarters: "Bomdila",
          elevation: "2,217 m",
          subDivisions: ["Bomdila", "Bhalukpong", "Dirang", "Rupa", "Singchung"],
          primaryRisk: "Severe Landslide & Flash Floods (Sessa/Bhalukpong)"
        },
        {
          name: "Bichom",
          headquarters: "Napangphung",
          elevation: "1,150 m",
          subDivisions: ["Nafra", "Lada"],
          primaryRisk: "Slope Erosion & Road Blockages"
        },
        {
          name: "East Kameng",
          headquarters: "Seppa",
          elevation: "363 m",
          subDivisions: ["Seppa", "Chayang Tajo", "Bameng"],
          primaryRisk: "Kameng River Washout & Cloudburst"
        },
        {
          name: "Pakke-Kessang",
          headquarters: "Lemmi",
          elevation: "450 m",
          subDivisions: ["Pakke-Kessang", "Seijosa", "Pijerang"],
          primaryRisk: "River Siltation & Forest Road Inaccessibility"
        }
      ]
    },
    {
      id: "div_subansiri",
      name: "Subansiri Division (Mid-Western Division)",
      headquarters: "Ziro / Yachuli",
      strategicFocus: "Capital Region Coordination, Horticulture, Hydroelectric Operations & Remote Northern Valleys",
      lifelineHighway: "NH-415 & NH-13 (Subansiri Corridor)",
      riskLevel: "Moderate to High",
      districts: [
        {
          name: "Papum Pare",
          headquarters: "Yupia",
          elevation: "180 m",
          subDivisions: ["Yupia", "Sagalee", "Kimin"],
          primaryRisk: "Urban Inundation & Bank Erosion"
        },
        {
          name: "Itanagar Capital Complex",
          headquarters: "Itanagar",
          elevation: "320 m",
          subDivisions: ["Itanagar", "Naharlagun", "Banderdewa"],
          primaryRisk: "Highway Sinking & Mudslides"
        },
        {
          name: "Lower Subansiri",
          headquarters: "Ziro",
          elevation: "1,572 m",
          subDivisions: ["Ziro", "Yachuli"],
          primaryRisk: "Hill Slump & Winter Fog Isolation"
        },
        {
          name: "Keyi Panyor",
          headquarters: "Yachuli",
          elevation: "1,200 m",
          subDivisions: ["Yachuli", "Pistana"],
          primaryRisk: "Road Subsidence"
        },
        {
          name: "Kurung Kumey",
          headquarters: "Koloriang",
          elevation: "1,040 m",
          subDivisions: ["Koloriang", "Nyapin", "Damin"],
          primaryRisk: "Border Transit Washouts & Footbridge Collapses"
        },
        {
          name: "Kra Daadi",
          headquarters: "Jamin",
          elevation: "980 m",
          subDivisions: ["Palin", "Tali", "Chambang"],
          primaryRisk: "Remote Valley Road Isolation"
        },
        {
          name: "Kamle",
          headquarters: "Raga",
          elevation: "1,320 m",
          subDivisions: ["Raga", "Giba"],
          primaryRisk: "Kamle River Flood Surges"
        },
        {
          name: "Upper Subansiri",
          headquarters: "Daporijo",
          elevation: "600 m",
          subDivisions: ["Daporijo", "Dumporijo", "Nacho"],
          primaryRisk: "Bridge Failure & Landslides"
        }
      ]
    },
    {
      id: "div_siang",
      name: "Siang Division (Central Division)",
      headquarters: "Pasighat",
      strategicFocus: "Siang River Basin Management, Flood Control, Agriculture & Mechuka-Pasighat Trade Route",
      lifelineHighway: "NH-513 & NH-13 (Siang Basin Link)",
      riskLevel: "High (Floods & Earthquakes)",
      districts: [
        {
          name: "East Siang",
          headquarters: "Pasighat",
          elevation: "155 m",
          subDivisions: ["Pasighat", "Ruksin", "Mebo"],
          primaryRisk: "Siang River Heavy Floods & Soil Inundation"
        },
        {
          name: "West Siang",
          headquarters: "Aalo",
          elevation: "610 m",
          subDivisions: ["Aalo", "Liromoba"],
          primaryRisk: "Yomgo River Bank Cutting"
        },
        {
          name: "Siang",
          headquarters: "Boleng",
          elevation: "420 m",
          subDivisions: ["Boleng", "Pangin", "Rumgong"],
          primaryRisk: "Massive Silt Movement & Mudslides"
        },
        {
          name: "Upper Siang",
          headquarters: "Yingkiong",
          elevation: "500 m",
          subDivisions: ["Yingkiong", "Tuting", "Gelling"],
          primaryRisk: "High Seismic Vulnerability & River Damming"
        },
        {
          name: "Lower Siang",
          headquarters: "Likabali",
          elevation: "180 m",
          subDivisions: ["Likabali", "Nari"],
          primaryRisk: "Foot-hill Waterlogging & Mud Debris"
        },
        {
          name: "Leparada",
          headquarters: "Basar",
          elevation: "660 m",
          subDivisions: ["Basar", "Tirbin"],
          primaryRisk: "Highway Sinking Zones"
        },
        {
          name: "Shi-Yomi",
          headquarters: "Tato",
          elevation: "1,800 m",
          subDivisions: ["Mechuka", "Tato", "Monigong"],
          primaryRisk: "Extreme Snow Isolation & High-Altitude Passes Blockage"
        }
      ]
    },
    {
      id: "div_lohit_dibang",
      name: "Lohit and Dibang Division (Eastern Division)",
      headquarters: "Tezu / Namsai",
      strategicFocus: "Eastern Himalayan Border (Kaho/Kibithu), Mishmi Hill Ecology & Trade Hubs",
      lifelineHighway: "NH-115 & NH-13 (Lohit-Dibang Corridor)",
      riskLevel: "Critical",
      districts: [
        {
          name: "Dibang Valley",
          headquarters: "Anini",
          elevation: "1,968 m",
          subDivisions: ["Anini", "Etalin", "Kronli"],
          primaryRisk: "Severe Rockfalls & Extended Road Cutoffs"
        },
        {
          name: "Lower Dibang Valley",
          headquarters: "Roing",
          elevation: "390 m",
          subDivisions: ["Roing", "Dambuk"],
          primaryRisk: "Dibang River Surges & Gravel Erosion"
        },
        {
          name: "Lohit",
          headquarters: "Tezu",
          elevation: "210 m",
          subDivisions: ["Tezu", "Sunpura"],
          primaryRisk: "River Channel Shifting & Flash Floods"
        },
        {
          name: "Anjaw",
          headquarters: "Hawai",
          elevation: "1,290 m",
          subDivisions: ["Hawai", "Hayuliang", "Walong", "Kibithu"],
          primaryRisk: "Precipitous Gorge Road Blockages (LAC Lifeline)"
        },
        {
          name: "Namsai",
          headquarters: "Namsai",
          elevation: "140 m",
          subDivisions: ["Namsai", "Chowkham", "Mahadevpur"],
          primaryRisk: "Seasonal Riverine Flooding (Noa-Dihing River)"
        }
      ]
    },
    {
      id: "div_patkai",
      name: "Patkai Division (South-Eastern / TCL)",
      headquarters: "Khonsa",
      strategicFocus: "Patkai Range Internal Security, Myanmar Border Coordination & Mineral/Petroleum Resources",
      lifelineHighway: "NH-215 & NH-315A (Patkai Links)",
      riskLevel: "High (Security & Monsoon Slips)",
      districts: [
        {
          name: "Tirap",
          headquarters: "Khonsa",
          elevation: "1,258 m",
          subDivisions: ["Khonsa", "Deomali", "Namsang"],
          primaryRisk: "Steep Valley Mudslides & Corridor Vulnerabilities"
        },
        {
          name: "Changlang",
          headquarters: "Changlang",
          elevation: "580 m",
          subDivisions: ["Changlang", "Miao", "Jairampur", "Bordumsa"],
          primaryRisk: "Burhi Dihing River Floods & Forest Track Washaways"
        },
        {
          name: "Longding",
          headquarters: "Longding",
          elevation: "1,040 m",
          subDivisions: ["Longding", "Kanubari", "Pangchau"],
          primaryRisk: "Remote Border Road Soil Liquefaction"
        }
      ]
    }
  ]
};
