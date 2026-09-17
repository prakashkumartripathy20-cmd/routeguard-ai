const fs = require('fs');
const path = require('path');

const arunachalMasterData = {
  state: "Arunachal Pradesh",
  state_code: "AR",
  census_code: 12,
  total_districts: 28,
  divisions: [
    {
      id: "kameng",
      name: "Kameng Division (ପଶ୍ଚିମ)",
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
      name: "Subansiri Division (ମଧ୍ୟ-ପଶ୍ଚିମ)",
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
      name: "Siang Division (ମଧ୍ୟ)",
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
      name: "Lohit & Dibang Division (ପୂର୍ବ)",
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
      name: "Patkai Division (ଦକ୍ଷିଣ-ପୂର୍ବ)",
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

// Auto-generate standard Wards for every village
arunachalMasterData.divisions.forEach(div => {
  div.districts.forEach(dist => {
    dist.circles.forEach(cir => {
      cir.villages = cir.villages.map((vilName, vIdx) => ({
        id: `VIL_${dist.name.substring(0,3).toUpperCase()}_${vIdx+1}`,
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

const outputPath = path.join(__dirname, '..', 'arunachal_master_data.json');
fs.writeFileSync(outputPath, JSON.stringify(arunachalMasterData, null, 2));
console.log("Successfully generated arunachal_master_data.json at " + outputPath);
