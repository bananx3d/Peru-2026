
window.TRIP_DATA = {
  settings: {
    tripStart: "2026-09-04T00:00:00+02:00",
    tripEnd: "2026-09-26T09:25:00-05:00",
    publicNotionUrl: "https://app.notion.com/p/3a247aa8423881cbbed8e585b38bf1fa",
    travelers: "Kuba • Weronika • Daniel",
    title: {pl:"Peru 2026", en:"Peru 2026"},
    subtitle: {pl:"Expedition Companion", en:"Expedition Companion"}
  },

  navigation: [
    ["dashboard","⌂",{pl:"Dashboard",en:"Dashboard"}],
    ["plan","▦",{pl:"Plan podróży",en:"Trip plan"}],
    ["reservations","▣",{pl:"Rezerwacje",en:"Reservations"}],
    ["transport","✈",{pl:"Loty i transport",en:"Flights & transport"}],
    ["amazon","❧",{pl:"Amazonia",en:"Amazon"}],
    ["machu","△",{pl:"Machu Picchu",en:"Machu Picchu"}],
    ["cusco","◈",{pl:"Cusco i okolice",en:"Cusco & region"}],
    ["lima","⌖",{pl:"Lima",en:"Lima"}],
    ["food","♨",{pl:"Jedzenie i napoje",en:"Food & drinks"}],
    ["wildlife","♧",{pl:"Zwierzęta",en:"Wildlife"}],
    ["photo","▧",{pl:"Photo Guide",en:"Photo Guide"}],
    ["video","▹",{pl:"Video Shot List",en:"Video Shot List"}],
    ["budget","◉",{pl:"Budżet",en:"Budget"}],
    ["packing","▤",{pl:"Packing i checklisty",en:"Packing & checklists"}],
    ["history","◇",{pl:"Historia Peru",en:"Peru history"}],
    ["journal","✎",{pl:"Dziennik",en:"Journal"}],
    ["settings","⚙",{pl:"Ustawienia",en:"Settings"}]
  ],

  tripDays: [
    {
      date:"2026-09-04", end:"2026-09-06", place:"Lima", image:"assets/lima.jpg",
      title:{pl:"Lima — przyloty i regeneracja",en:"Lima — arrivals and recovery"},
      summary:{pl:"Airbnb w Miraflores, przyloty całej trójki, sen i bardzo lekkie wejście w podróż.",en:"Miraflores base, all arrivals, sleep and a deliberately slow start."},
      items:[
        ["04.09",{pl:"Start rezerwacji Airbnb w Miraflores.",en:"Miraflores Airbnb reservation begins."}],
        ["05.09",{pl:"Przylot Kuby i Daniela. Transfer, sen, jedzenie, zero presji.",en:"Kuba and Daniel arrive. Transfer, sleep, food, no pressure."}],
        ["06.09",{pl:"Przylot Weroniki po długiej podróży. Dzień regeneracyjny.",en:"Weronika arrives after a long journey. Recovery day."}]
      ]
    },
    {
      date:"2026-09-07", end:"2026-09-12", place:"Amazonia", image:"assets/amazon-canoe.jpg",
      title:{pl:"Curassow Amazon Lodge",en:"Curassow Amazon Lodge"},
      summary:{pl:"6 dni / 5 nocy: łodzie, nocna dżungla, jeziora, zwierzęta i nocleg w obozie.",en:"6 days / 5 nights: boats, night jungle, lakes, wildlife and an overnight camp."},
      items:[
        ["07.09 • 07:15",{pl:"Lot Lima → Iquitos. Odbiór przez ekipę Curassow.",en:"Flight Lima → Iquitos. Pickup by Curassow team."}],
        ["07–11.09",{pl:"Pełny program lodge — szczegóły w sekcji Amazonia.",en:"Full lodge program — details in the Amazon section."}],
        ["12.09 • ok. 16:00",{pl:"Powrót do Iquitos i transfer pod nocleg.",en:"Return to Iquitos and transfer to accommodation."}]
      ]
    },
    {
      date:"2026-09-12", end:"2026-09-14", place:"Iquitos", image:"assets/amazon-lilies.jpg",
      title:{pl:"Iquitos — reset po dżungli",en:"Iquitos — post-jungle reset"},
      summary:{pl:"Prysznic, pranie, przepakowanie, promenada i dobre jedzenie.",en:"Shower, laundry, repacking, riverfront walk and good food."},
      items:[
        ["12.09",{pl:"Check-in po powrocie z Curassow.",en:"Check-in after returning from Curassow."}],
        ["13.09",{pl:"Spokojny dzień bez obowiązkowego programu.",en:"Slow day with no mandatory schedule."}],
        ["14.09 • rano",{pl:"Taxi na lotnisko.",en:"Taxi to the airport."}]
      ]
    },
    {
      date:"2026-09-14", end:"2026-09-17", place:"Cusco", image:"assets/cusco.jpg",
      title:{pl:"Cusco — aklimatyzacja",en:"Cusco — acclimatization"},
      summary:{pl:"Dwa lekkie dni na wysokości: Plaza de Armas, San Blas i San Pedro.",en:"Two easy altitude days: Plaza de Armas, San Blas and San Pedro."},
      items:[
        ["14.09",{pl:"Iquitos → Lima → Cusco. Po przylocie tylko jedzenie i odpoczynek.",en:"Iquitos → Lima → Cusco. Food and rest after arrival."}],
        ["15.09",{pl:"Centrum, San Blas, San Pedro, dużo przerw.",en:"Old town, San Blas, San Pedro and many breaks."}],
        ["16.09",{pl:"Drugi spokojny dzień aklimatyzacji.",en:"Second easy acclimatization day."}]
      ]
    },
    {
      date:"2026-09-17", end:"2026-09-18", place:"Sacred Valley", image:"assets/sacred-valley.jpg",
      title:{pl:"Sacred Valley → Ollantaytambo",en:"Sacred Valley → Ollantaytambo"},
      summary:{pl:"Prywatny taxi-tour: Pisac, Moray, Maras / Salineras i nocleg w Ollantaytambo.",en:"Private taxi tour: Pisac, Moray, Maras / Salineras and overnight in Ollantaytambo."},
      items:[
        ["17.09",{pl:"Cusco → Pisac → Moray → Maras / Salineras → Ollantaytambo.",en:"Cusco → Pisac → Moray → Maras / Salineras → Ollantaytambo."}],
        ["18.09",{pl:"Ruiny, stare miasto, widoki i spokojny dzień.",en:"Ruins, old town, views and a relaxed day."}]
      ]
    },
    {
      date:"2026-09-19", end:"2026-09-20", place:"Aguas Calientes", image:"assets/machu.jpg",
      title:{pl:"Aguas Calientes i Machu Picchu",en:"Aguas Calientes and Machu Picchu"},
      summary:{pl:"Pociąg, próba zakupu Ruta 2, Waynapicchu i późny powrót do Ollantaytambo.",en:"Train, attempt to buy Route 2, Waynapicchu and a late train back to Ollantaytambo."},
      items:[
        ["19.09 • 12:55",{pl:"PeruRail Expedition do Aguas Calientes.",en:"PeruRail Expedition to Aguas Calientes."}],
        ["19.09 • 14:45",{pl:"Kolejka po bilet Ruta 2 na następny dzień.",en:"Queue for next-day Route 2 ticket."}],
        ["20.09 • 07:00",{pl:"Ruta 3-A i Montaña Waynapicchu.",en:"Route 3-A and Waynapicchu Mountain."}],
        ["20.09 • 13:00/14:00",{pl:"Ruta 2 — jeśli uda się kupić.",en:"Route 2 — if available."}],
        ["20.09 • 20:50",{pl:"Pociąg do Ollantaytambo.",en:"Train to Ollantaytambo."}]
      ]
    },
    {
      date:"2026-09-21", end:"2026-09-26", place:"Lima", image:"assets/lima.jpg",
      title:{pl:"Lima — spokojna końcówka",en:"Lima — relaxed finale"},
      summary:{pl:"Taxi z Ollantaytambo na lotnisko, lot do Limy i kilka wolniejszych dni przed powrotami.",en:"Taxi from Ollantaytambo to Cusco airport, flight to Lima and a slow finale."},
      items:[
        ["21.09",{pl:"Taxi na lotnisko w Cusco i popołudniowy lot do Limy.",en:"Taxi to Cusco airport and afternoon flight to Lima."}],
        ["22–24.09",{pl:"Miraflores, Barranco, jedzenie, spacery i odpoczynek.",en:"Miraflores, Barranco, food, walks and rest."}],
        ["25–26.09",{pl:"Wyloty całej trójki.",en:"Departures for all three travelers."}]
      ]
    }
  ],

  events: [
    ["2026-09-07T03:40:00-05:00",{pl:"Zamów taxi XL na lotnisko w Limie",en:"Order XL taxi to Lima airport"}],
    ["2026-09-07T07:15:00-05:00",{pl:"Lot Lima → Iquitos",en:"Flight Lima → Iquitos"}],
    ["2026-09-14T04:40:00-05:00",{pl:"Taxi na lotnisko w Iquitos",en:"Taxi to Iquitos airport"}],
    ["2026-09-14T07:20:00-05:00",{pl:"Lot Iquitos → Lima",en:"Flight Iquitos → Lima"}],
    ["2026-09-14T11:20:00-05:00",{pl:"Lot Lima → Cusco",en:"Flight Lima → Cusco"}],
    ["2026-09-19T12:25:00-05:00",{pl:"Bądź na stacji w Ollantaytambo",en:"Be at Ollantaytambo station"}],
    ["2026-09-19T12:55:00-05:00",{pl:"Pociąg do Aguas Calientes",en:"Train to Aguas Calientes"}],
    ["2026-09-20T05:00:00-05:00",{pl:"Pobudka — Machu Picchu",en:"Wake up — Machu Picchu"}],
    ["2026-09-20T07:00:00-05:00",{pl:"Wejście Ruta 3-A / Waynapicchu",en:"Route 3-A / Waynapicchu entry"}],
    ["2026-09-20T20:50:00-05:00",{pl:"Pociąg do Ollantaytambo",en:"Train to Ollantaytambo"}]
  ],

  curassow: {
    days: [
      {
        day:1, image:"assets/amazon-canoe.jpg",
        title:{pl:"Pierwszy kontakt z dżunglą",en:"First contact with the jungle"},
        schedule:[
          ["09:15",{pl:"Odbiór z lotniska lub hotelu w Iquitos. Transfer lądem i szybką łodzią — około 3 godziny do lodge.",en:"Pickup from Iquitos airport or hotel. Road and speedboat transfer — about 3 hours to the lodge."}],
          ["Po przyjeździe",{pl:"Powitalny napój z lokalnych owoców i zakwaterowanie w prywatnym bungalow.",en:"Welcome drink made from local fruit and check-in to a private bungalow."}],
          ["13:00",{pl:"Obiad.",en:"Lunch."}],
          ["Popołudnie",{pl:"Spacer po dzikiej dżungli przez 2–3 godziny: rośliny lecznicze, kauczukowce oraz poszukiwanie małp, leniwców i ptaków.",en:"2–3 hour jungle walk: medicinal plants, rubber trees and wildlife search for monkeys, sloths and birds."}],
          ["19:00",{pl:"Kolacja.",en:"Dinner."}],
          ["Noc",{pl:"Wyprawa łodzią w poszukiwaniu kajmanów, węży, nocnych ptaków, żab, tarantul, kapibar i innych zwierząt.",en:"Night boat excursion searching for caimans, snakes, nocturnal birds, frogs, tarantulas, capybaras and more."}]
        ]
      },
      {
        day:2, image:"assets/amazon-lilies.jpg",
        title:{pl:"Jeziora, delfiny i zachód słońca",en:"Lakes, dolphins and sunset"},
        schedule:[
          ["06:00",{pl:"Wczesna eksploracja łodzią i spacer po dżungli. Wędkowanie piranii, ryb oscar, sardynek i sumów. Opcjonalna obserwacja ptaków. Śniadanie może być podane na łodzi. Aktywność trwa 5–6 godzin.",en:"Early boat exploration and jungle walk. Fishing for piranha, oscar fish, sardines and catfish. Optional birdwatching. Breakfast may be served on board. Activity lasts 5–6 hours."}],
          ["13:00",{pl:"Obiad.",en:"Lunch."}],
          ["Popołudnie",{pl:"Wyprawa łodzią po jeziorach: gigantyczne lilie Victoria amazonica, różowe i szare delfiny, opcjonalna kąpiel oraz zachód słońca nad Amazonką.",en:"Lake excursion: giant Victoria amazonica lilies, pink and grey dolphins, optional swimming and Amazon sunset."}],
          ["19:00",{pl:"Kolacja.",en:"Dinner."}],
          ["Noc",{pl:"Spacer po dżungli: tarantule, pająki, ropuchy trzcinowe, żaby, węże, gryzonie i małpy.",en:"Night jungle walk: tarantulas, spiders, cane toads, frogs, snakes, rodents and monkeys."}]
        ]
      },
      {
        day:3, image:"assets/amazon-monkey.jpg",
        title:{pl:"Ptaki hoatzin, małpy i swobodny wieczór",en:"Hoatzins, monkeys and flexible night"},
        schedule:[
          ["08:00",{pl:"Śniadanie.",en:"Breakfast."}],
          ["Rano",{pl:"Eksploracja łodzią i spacer po dżungli w poszukiwaniu prehistorycznych ptaków hoatzin, małp i innych gatunków.",en:"Boat exploration and jungle walk searching for prehistoric hoatzin birds, monkeys and other species."}],
          ["13:00",{pl:"Obiad.",en:"Lunch."}],
          ["Popołudnie",{pl:"Wyprawa łodzią w poszukiwaniu ptaków, małp, leniwców i innych dzikich zwierząt.",en:"Boat excursion searching for birds, monkeys, sloths and other wildlife."}],
          ["19:00",{pl:"Kolacja.",en:"Dinner."}],
          ["Noc",{pl:"Wycieczka wybierana wspólnie z przewodnikiem, zależnie od warunków i preferencji grupy.",en:"Night excursion chosen with the guide depending on conditions and group preferences."}]
        ]
      },
      {
        day:4, image:"assets/amazon-frog.jpg",
        title:{pl:"Jezioro Yarina i survival",en:"Lake Yarina and jungle survival"},
        schedule:[
          ["08:00",{pl:"Śniadanie.",en:"Breakfast."}],
          ["Rano",{pl:"Wyprawa łodzią na jezioro Yarina. Eksploracja pierwotnej dżungli w poszukiwaniu anakond, małp, ptaków i ssaków.",en:"Boat trip to Lake Yarina. Primary jungle exploration searching for anacondas, monkeys, birds and mammals."}],
          ["13:00",{pl:"Obiad.",en:"Lunch."}],
          ["Popołudnie",{pl:"Eksploracja łodzią lub pieszo. Nauka podstaw przetrwania: materiały na schronienie, pnącza jako źródło wody oraz poszukiwanie jedzenia.",en:"Boat or walking exploration. Survival basics: shelter materials, vines as water sources and finding food."}],
          ["19:00",{pl:"Kolacja.",en:"Dinner."}],
          ["Wieczór",{pl:"Czas wolny i odpoczynek.",en:"Free evening and rest."}]
        ]
      },
      {
        day:5, image:"assets/amazon-canoe.jpg",
        title:{pl:"Obóz głęboko w dżungli",en:"Deep jungle camp"},
        schedule:[
          ["08:00",{pl:"Śniadanie.",en:"Breakfast."}],
          ["Po śniadaniu",{pl:"Wyjście do obozu w głębi dżungli. Nocleg w namiotach.",en:"Departure for a camp deep in the jungle. Overnight in tents."}],
          ["Cały dzień",{pl:"Pływanie canoe, marsz, wędkowanie, wypatrywanie kajmanów i słuchanie nocnej „symfonii” dżungli. Obiad i kolacja są wliczone.",en:"Canoeing, walking, fishing, caiman spotting and listening to the jungle sound symphony. Lunch and dinner included."}]
        ]
      },
      {
        day:6, image:"assets/amazon-lilies.jpg",
        title:{pl:"Powrót, wioska i Iquitos",en:"Return, village and Iquitos"},
        schedule:[
          ["Rano",{pl:"Powrót z obozu do lodge.",en:"Return from camp to the lodge."}],
          ["08:00",{pl:"Śniadanie.",en:"Breakfast."}],
          ["Przed południem",{pl:"Wizyta w wiosce San Juan lub Ayacucho, możliwość zakupu rękodzieła i podsumowanie pięciu dni w dżungli.",en:"Visit San Juan or Ayacucho village, opportunity to buy handicrafts and recap the jungle experience."}],
          ["13:00",{pl:"Obiad.",en:"Lunch."}],
          ["13:30–14:00",{pl:"Wyjazd do Iquitos.",en:"Departure to Iquitos."}],
          ["około 16:00",{pl:"Planowany przyjazd do Iquitos i transfer do hotelu lub na lotnisko.",en:"Estimated arrival in Iquitos and transfer to hotel or airport."}]
        ]
      }
    ],
    info: [
      {
        title:{pl:"Podstawowe informacje",en:"Basic information"},
        bullets:[
          {pl:"Standardowy wyjazd z Iquitos do lodge: 09:30.",en:"Standard departure from Iquitos to the lodge: 09:30."},
          {pl:"Powrót z lodge po obiedzie, około 13:30; przyjazd do Iquitos około 16:00.",en:"Return after lunch around 13:30; arrival in Iquitos around 16:00."},
          {pl:"Od lipca do września poziom wody opada, więc na odcinku przy rzece Yanayacu może być potrzebna dodatkowa łódź.",en:"From July to September water levels fall, so an additional boat may be needed near the Yanayacu River entrance."},
          {pl:"Program może się zmienić zależnie od pogody, poziomu wody i aktywności zwierząt.",en:"The program may change depending on weather, water levels and wildlife activity."}
        ]
      },
      {
        title:{pl:"Transport",en:"Transport"},
        bullets:[
          {pl:"Cena obejmuje odbiór z lotniska lub hotelu pierwszego dnia oraz prywatny transfer vanem i łodzią.",en:"The rate includes first-day airport or hotel pickup plus private van and speedboat transfer."},
          {pl:"Osoby przylatujące rano mogą zostać zabrane do centrum na śniadanie i krótki spacer przed wyjazdem do lodge.",en:"Early arrivals may be taken into the city for breakfast and a short city visit before lodge departure."},
          {pl:"Jeśli jesteście już w Iquitos, odbiór z hotelu odbywa się zwykle między 09:15 a 09:30.",en:"If already in Iquitos, hotel pickup is usually between 09:15 and 09:30."},
          {pl:"Wcześniejszy prywatny powrót przed końcem programu może kosztować dodatkowo 150 USD i nie obejmuje zwrotu za niewykorzystane dni.",en:"An early private return before the program ends may cost an additional USD 150 with no refund for unused days."}
        ]
      }
    ]
  },

  packing: [
    {
      category:{pl:"Ubrania",en:"Clothing"},
      items:[
        {id:"hat",pl:"Kapelusz z szerokim rondem lub czapka",en:"Broad-brimmed hat or cap"},
        {id:"longshirts",pl:"Koszule z długim rękawem",en:"Long-sleeved shirts"},
        {id:"tshirts",pl:"Lekkie T-shirty",en:"Lightweight T-shirts"},
        {id:"buff",pl:"Bandana lub buff",en:"Bandana or buff"},
        {id:"pants",pl:"Lekkie spodnie cargo / trekkingowe",en:"Lightweight cargo or trekking pants"},
        {id:"rainjacket",pl:"Lekka kurtka wodoodporna",en:"Light waterproof jacket"},
        {id:"sandals",pl:"Sandały lub Crocsy do lodge",en:"Sandals or Crocs for the lodge"},
        {id:"shoes",pl:"Buty trekkingowe lub sportowe — lodge zapewnia kalosze",en:"Hiking or athletic shoes — rubber boots are provided"},
        {id:"socks",pl:"Lekkie, wysokie skarpety",en:"Lightweight high socks"},
        {id:"poncho",pl:"Porządne poncho przeciwdeszczowe",en:"High-quality rain poncho"}
      ]
    },
    {
      category:{pl:"Sprzęt i akcesoria",en:"Gear & accessories"},
      items:[
        {id:"sunglasses",pl:"Okulary przeciwsłoneczne",en:"Sunglasses"},
        {id:"camera",pl:"Aparat / telefon, baterie i dodatkowe karty pamięci",en:"Camera / phone, batteries and extra memory cards"},
        {id:"bottle",pl:"Pusta butelka na wodę",en:"Empty water bottle"},
        {id:"tissues",pl:"Małe paczki chusteczek",en:"Small tissue packs"},
        {id:"waterproof",pl:"Wodoodporne etui na telefon i aparat",en:"Waterproof pouches for phone and camera"},
        {id:"ziploc",pl:"Duże i małe woreczki strunowe",en:"Large and small zip-lock bags"},
        {id:"binoculars",pl:"Lornetka",en:"Binoculars"},
        {id:"daypack",pl:"Mały, lekki plecak",en:"Small lightweight backpack"},
        {id:"notebook",pl:"Mały notes i długopis",en:"Small notebook and pen"},
        {id:"headlamp",pl:"Latarka i/lub czołówka",en:"Flashlight and/or headlamp"},
        {id:"lantern",pl:"Mała lampka do namiotu",en:"Small lantern"},
        {id:"powerbank",pl:"Powerbank",en:"Power bank"}
      ]
    },
    {
      category:{pl:"Higiena i ochrona",en:"Hygiene & protection"},
      items:[
        {id:"wash",pl:"Żel do mycia i szampon",en:"Body wash and shampoo"},
        {id:"sunscreen",pl:"Krem przeciwsłoneczny do twarzy i ciała",en:"Sunscreen for face and body"},
        {id:"repellent",pl:"Repelent na owady — np. 25–30% DEET lub odpowiednik",en:"Insect repellent — e.g. 25–30% DEET or equivalent"},
        {id:"washcloth",pl:"Gąbka lub mała myjka",en:"Bath sponge or washcloth"},
        {id:"sanitizer",pl:"Żel do dezynfekcji rąk",en:"Hand sanitizer"}
      ]
    },
    {
      category:{pl:"Apteczka — omów z lekarzem",en:"Medical kit — discuss with a doctor"},
      items:[
        {id:"malaria",pl:"Ustal z lekarzem profilaktykę malarii; nie zaczynaj leków na własną rękę",en:"Discuss malaria prophylaxis with a doctor; do not self-prescribe"},
        {id:"stomach",pl:"Środek na dolegliwości żołądkowe",en:"Medicine for stomach discomfort"},
        {id:"diarrhea",pl:"Środek przeciwbiegunkowy",en:"Anti-diarrheal medication"},
        {id:"antibiotic",pl:"Antybiotyk wyłącznie jeśli przepisze go lekarz",en:"Antibiotic only if prescribed by a doctor"},
        {id:"hydrocortisone",pl:"Krem z hydrokortyzonem na ukąszenia — po konsultacji",en:"Hydrocortisone cream for bites — after consultation"},
        {id:"ointment",pl:"Maść antyseptyczna i plastry",en:"Antiseptic ointment and adhesive bandages"},
        {id:"pain",pl:"Standardowy lek przeciwbólowy, który dobrze tolerujesz",en:"A standard pain reliever you already tolerate"}
      ]
    },
    {
      category:{pl:"Dokumenty i pieniądze",en:"Documents & money"},
      items:[
        {id:"passport",pl:"Oryginalny paszport",en:"Original passport"},
        {id:"copies",pl:"Co najmniej dwie kopie paszportu i ubezpieczenia",en:"At least two copies of passport and insurance"},
        {id:"insurance",pl:"Polisa i karta ubezpieczenia medycznego",en:"Travel insurance policy and medical insurance card"},
        {id:"cash",pl:"Banknoty USD/EUR w bardzo dobrym stanie — bez naderwań i zabrudzeń",en:"USD/EUR notes in excellent condition — no tears or stains"},
        {id:"offline",pl:"Bilety i dokumenty zapisane offline",en:"Tickets and documents saved offline"}
      ]
    }
  ],

  publicReservations: [
    {place:"Lima",dates:"04–07.09",type:{pl:"Airbnb — Miraflores",en:"Airbnb — Miraflores"},status:"confirmed"},
    {place:"Amazonia",dates:"07–12.09",type:{pl:"Curassow Amazon Lodge",en:"Curassow Amazon Lodge"},status:"confirmed"},
    {place:"Iquitos",dates:"12–14.09",type:{pl:"Airbnb",en:"Airbnb"},status:"confirmed"},
    {place:"Cusco",dates:"14–17.09",type:{pl:"Hotel — do rezerwacji",en:"Hotel — to book"},status:"todo"},
    {place:"Ollantaytambo",dates:"17–19.09",type:{pl:"Hotel — do rezerwacji",en:"Hotel — to book"},status:"todo"},
    {place:"Aguas Calientes",dates:"19–20.09",type:{pl:"Hotel — do rezerwacji",en:"Hotel — to book"},status:"todo"},
    {place:"Ollantaytambo",dates:"20–21.09",type:{pl:"Noc anulowalna — do rezerwacji",en:"Refundable night — to book"},status:"todo"},
    {place:"Lima",dates:"21–26.09",type:{pl:"Hotel — do rezerwacji",en:"Hotel — to book"},status:"todo"}
  ],

  transport: [
    ["07.09 • 07:15–09:05","Lima → Iquitos","Star Peru 2I3111","confirmed"],
    ["14.09 • 07:20–09:20","Iquitos → Lima","SKY H25361","confirmed"],
    ["14.09 • 11:20–12:50","Lima → Cusco","SKY H25025","confirmed"],
    ["19.09 • 12:55","Ollantaytambo → Aguas Calientes","PeruRail Expedition","confirmed"],
    ["20.09 • 20:50","Aguas Calientes → Ollantaytambo",{pl:"Rekomendowany — do kupienia",en:"Recommended — to buy"},"todo"],
    ["21.09 • popołudnie","Cusco → Lima",{pl:"Do kupienia",en:"To buy"},"todo"]
  ],

  wildlife: [
    ["🐒",{pl:"Małpy",en:"Monkeys"},{pl:"Najlepsze szanse rano i podczas cichego przemieszczania łodzią.",en:"Best chances in the morning and during quiet boat travel."}],
    ["🦥",{pl:"Leniwce",en:"Sloths"},{pl:"Szukaj wysoko w koronach drzew, zwłaszcza przy brzegach rzeki.",en:"Look high in the canopy, especially along river edges."}],
    ["🐬",{pl:"Różowe delfiny",en:"Pink river dolphins"},{pl:"Najczęściej wypatrywane na otwartej wodzie i przy zachodzie.",en:"Often spotted in open water and around sunset."}],
    ["🐊",{pl:"Kajmany",en:"Caimans"},{pl:"Najbardziej aktywne nocą; zawsze słuchaj przewodnika.",en:"Most active at night; always follow the guide."}],
    ["🦜",{pl:"Ary, tukany i hoatziny",en:"Macaws, toucans and hoatzins"},{pl:"Lornetka mocno zwiększa szanse na dobry widok.",en:"Binoculars greatly improve viewing chances."}],
    ["🐍",{pl:"Węże i anakondy",en:"Snakes and anacondas"},{pl:"Nie podchodź i nie dotykaj; obserwuj wyłącznie z przewodnikiem.",en:"Do not approach or touch; observe only with the guide."}],
    ["🕷️",{pl:"Tarantule i pająki",en:"Tarantulas and spiders"},{pl:"Nocne spacery dają największą szansę na obserwację.",en:"Night walks offer the best chance of sightings."}],
    ["🐸",{pl:"Żaby",en:"Frogs"},{pl:"Słuchaj ich po deszczu i przy wilgotnych fragmentach lasu.",en:"Listen for them after rain and in damp forest areas."}]
  ],

  foods: [
    ["Ceviche",{pl:"Najlepiej w Limie, w miejscu z dużym ruchem i świeżą rotacją ryb.",en:"Best in Lima at a busy place with fast fish turnover."}],
    ["Lomo saltado",{pl:"Wołowina, cebula, pomidor, frytki i ryż — klasyczne połączenie peruwiańsko-chińskie.",en:"Beef, onion, tomato, fries and rice — a classic Peruvian-Chinese mix."}],
    ["Ají de gallina",{pl:"Kremowy, lekko pikantny kurczak z żółtą papryką ají.",en:"Creamy, mildly spicy chicken with yellow ají pepper."}],
    ["Anticuchos",{pl:"Grillowane szaszłyki, tradycyjnie z serca wołowego.",en:"Grilled skewers, traditionally beef heart."}],
    ["Causa limeña",{pl:"Warstwowa przekąska z ziemniaków, limonki, ají i nadzienia.",en:"Layered potato dish with lime, ají and filling."}],
    ["Chicha morada",{pl:"Bezalkoholowy napój z fioletowej kukurydzy.",en:"Non-alcoholic purple corn drink."}],
    ["Pisco sour",{pl:"Klasyczny koktajl z pisco, limonki, syropu i białka.",en:"Classic cocktail with pisco, lime, syrup and egg white."}],
    ["Owoce Amazonii",{pl:"Pytaj o camu camu, aguaje, coconę i świeże soki.",en:"Ask for camu camu, aguaje, cocona and fresh juices."}]
  ]
};
