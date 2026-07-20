(() => {
  const commonsFile = (file, width = 1100) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
  const commonsPage = (file) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file).replace(/%20/g, '_')}`;
  const photo = (id, category, targets, title, file, caption, extra = {}) => ({
    id,
    category,
    targets: Array.isArray(targets) ? targets : [targets],
    title,
    file,
    caption,
    image: commonsFile(file, extra.width || 1100),
    source: commonsPage(file),
    origin: 'Wikimedia Commons',
    kind: 'photograph',
    ai: false,
    verification: 'Źródło prowadzi do strony pliku z informacją o autorze i licencji.',
    ...extra
  });
  const operatorPhoto = (id, targets, title, image, source, caption) => ({
    id,
    category: 'Amazonia i Iquitos',
    targets: Array.isArray(targets) ? targets : [targets],
    title,
    image,
    source,
    caption,
    origin: 'Curassow Amazon Lodge',
    kind: 'photograph',
    ai: false,
    verification: 'Oficjalna fotografia operatora, użyta na podstawie zgody Martina.'
  });

  window.PERU_PHOTOS = {
    version: 15,
    policy: 'Wyłącznie prawdziwe fotografie z identyfikowalną stroną pliku, autorem i licencją albo oficjalne zdjęcia Curassow użyte za zgodą operatora. Zero obrazów generowanych przez AI.',
    offlineNote: 'Zdjęcia są zewnętrzne, ale moduł ma przycisk pobrania całego pakietu do pamięci podręcznej telefonu. Zrób to raz przed wyjazdem przy Wi‑Fi.',
    audit: {
      animalsExpected: 20,
      structuredPlaces: 'Cusco, Lima, Ollantaytambo, Sacred Valley oraz wszystkie etapy Ruty 3-A, 2-A i 2-B',
      reviewedAt: '2026-07-20',
      auditMethod: 'Struktura katalogu + domena źródłowa + strona autora/licencji'
    },
    items: [
      // AMAZONIA + IQUITOS — oficjalne fotografie operatora i realne zdjęcia miasta
      operatorPhoto('curassow-exploration',['curassow','canoe','river'],'Eksploracja Curassow','https://curassowlodge.com/wp-content/uploads/2025/02/exploraciones-bilingues.png','https://curassowlodge.com/about-us/','Łódź i teren w rejonie lodge — oficjalna fotografia Curassow.'),
      operatorPhoto('curassow-wildlife',['wildlife','forest'],'Dzika przyroda Curassow','https://curassowlodge.com/wp-content/uploads/2025/02/vida-silvestre.png','https://curassowlodge.com/about-us/','Fauna i las w rejonie lodge — oficjalna fotografia Curassow.'),
      operatorPhoto('curassow-location',['lodge','habitat'],'Otoczenie lodge','https://curassowlodge.com/wp-content/uploads/2025/02/especial-ubicacion.png','https://curassowlodge.com/about-us/','Leśne i rzeczne otoczenie Curassow.'),
      operatorPhoto('curassow-bungalow',['bungalow'],'Bungalow Curassow','https://curassowlodge.com/wp-content/uploads/2025/03/Bungalow-Simple-1.jpg','https://curassowlodge.com/room/simple-bungalow/','Przykład bungalowu z moskitierą i prywatną łazienką.'),
      photo('iquitos-port','Amazonia i Iquitos',['iquitos','port'],'Port w Iquitos','Iquitos Wharf Port Henry.jpg','Rzeczny charakter Iquitos najlepiej widać przy nabrzeżu.'),
      photo('iquitos-sunset','Amazonia i Iquitos',['iquitos-sunset'],'Zachód nad Iquitos','Sunset Peru Iquitos Port Henry.jpg','Miasto i rzeka po powrocie z lasu.'),
      photo('iquitos-city','Amazonia i Iquitos',['iquitos-centre'],'Iquitos','Iquitos, Peru (11470937056).jpg','Miejska zabudowa i energia portowego miasta Amazonii.'),

      // LIMA
      photo('lima-malecon','Lima',['malecon'],'Malecón de Miraflores','Malecón de Miraflores, Lima.jpg','Wybrzeże i klify Miraflores — punkt spokojnego spaceru.'),
      photo('lima-kennedy','Lima',['kennedy'],'Parque Kennedy','Parque Kennedy de Miraflores.jpg','Praktyczny środek Miraflores i początek spacerów.'),
      photo('lima-barranco','Lima',['barranco'],'Puente de los Suspiros','Puente de los Suspiros Barranco.jpg','Najbardziej charakterystyczny punkt spaceru po Barranco.'),
      photo('lima-huaca','Lima',['huaca'],'Huaca Pucllana','Huaca Pucllana, Miraflores Lima.jpg','Prekolumbijska piramida z adobe pośrodku współczesnej dzielnicy.'),
      photo('lima-surquillo','Lima',['surquillo'],'Mercado de Surquillo','Mercado Surquillo 1 Lima PE.jpg','Owoce, stoiska i lokalny lunch blisko Miraflores.'),
      photo('lima-centro','Lima',['centro'],'Plaza Mayor','Plaza Mayor, Lima, Peru.jpg','Najważniejszy punkt kolonialnego centrum Limy.'),

      // CUSCO — wszystkie 10 opisanych punktów mają przypisane zdjęcie
      photo('cusco-plaza','Cusco',['plaza','cathedral'],'Plaza de Armas i katedra','Plaza de Armas, Cusco.jpg','Kolonialne centrum wzniesione na inkaskim rdzeniu miasta.'),
      photo('cusco-qorikancha','Cusco',['qorikancha'],'Qorikancha','Qoricancha.png','Inkaska kamieniarka zachowana pod klasztorem Santo Domingo.'),
      photo('cusco-hatun','Cusco',['hatun-rumiyoc'],'Kamień dwunastokątny','Cusco Piedra de los doce angulos.jpg','Najbardziej znany detal muru przy Hatun Rumiyoc.'),
      photo('cusco-nazarenas','Cusco',['nazarenas'],'Plaza de las Nazarenas','Cusco (Peru) Monasterio de las Nazarenas.jpg','Spokojniejszy plac i historyczna zabudowa blisko centrum.'),
      photo('cusco-map','Cusco',['map'],'Museo de Arte Precolombino','Museo de Arte Precolombino (10).JPG','Muzeum prekolumbijskie w Cusco — opcja na spokojniejsze tempo.'),
      photo('cusco-san-blas','Cusco',['san-blas'],'San Blas','San Blás - Cusco.jpg','Wąskie ulice artystycznej dzielnicy na zboczu.'),
      photo('cusco-san-pedro','Cusco',['san-pedro'],'Mercado San Pedro','San Pedro Market in Cusco, Peru.jpg','Hala targowa, lokalne produkty i prosty posiłek.'),
      photo('cusco-sacsayhuaman','Cusco',['sacsayhuaman'],'Sacsayhuamán','Sacsayhuaman, Peru.jpg','Monumentalne, wielokątne bloki nad Cusco.'),
      photo('cusco-san-cristobal','Cusco',['san-cristobal'],'Widok z San Cristóbal','Vista del cusco desde san cristobal.jpg','Panorama miasta przy wariancie z dobrą aklimatyzacją.'),

      // SACRED VALLEY
      photo('valley-pisac','Sacred Valley',['pisac'],'Tarasy Pisac','Pisac Terrassen - Terraces of Pisac.jpg','Tarasy rolnicze i strome zbocza nad doliną.'),
      photo('valley-moray','Sacred Valley',['moray'],'Moray','Moray - Peru.jpg','Koncentryczne tarasy podczas przejazdu.'),
      photo('valley-maras','Sacred Valley',['maras'],'Salinas de Maras','Peru Salinas de Maras.jpg','Tysiące solnych basenów na stromym zboczu.'),
      photo('valley-chinchero','Sacred Valley',['chinchero'],'Chinchero','Chinchero, Peru (1).jpg','Wysoko położone tarasy i zabudowa na trasie z Cusco.'),

      // OLLANTAYTAMBO — dwa zdjęcia obejmują wszystkie opisane punkty
      photo('ollanta-town','Ollantaytambo',['old-town','channels','inca-bridge'],'Ollantaytambo — żywe miasto Inków','Ollantaytambo, Peru.jpg','Zachowany układ ulic i kanałów u stóp ruin.'),
      photo('ollanta-terraces','Ollantaytambo',['park','sun-temple','ten-niches','water','pinkuylluna'],'Tarasy i sektor świątynny','Ollantaytambo 1.jpg','Strome tarasy, monumentalny sektor świątynny i zbocza Pinkuylluny.'),

      // MACHU PICCHU — pełne pokrycie Ruty 3-A, 2-A oraz 2-B
      photo('machu-classic','Machu Picchu',['entry','royal','gate','exit','2a-entry','2a-upper','2a-gate','2b-entry','2b-lower','2b-gate'],'Machu Picchu i Waynapicchu','Machu Picchu - View of Huayna Picchu (3785421045).jpg','Klasyczna relacja miasta, tarasów i góry Waynapicchu.'),
      photo('machu-sun','Machu Picchu',['sun','2a-sun','2b-sun'],'Świątynia Słońca','Machu Picchu Temple of the Sun.jpg','Półkolisty mur dopasowany do naturalnej skały.'),
      photo('machu-water','Machu Picchu',['water'],'Kanał wodny','91 - Machu Picchu - Juin 2009.jpg','System wodny jest jednym z najważniejszych elementów inżynierii miasta.'),
      photo('machu-climb','Machu Picchu',['climb'],'Schody na Waynapicchu','Steps to Huayna Picchu.jpg','Stromy odcinek szlaku — tempo i bezpieczeństwo są ważniejsze od zdjęcia.'),
      photo('machu-summit','Machu Picchu',['summit'],'Tarasy Waynapicchu','Huayna Picchu Terrass.jpg','Górne tarasy i zmiana perspektywy na llaqta.'),
      photo('machu-descent','Machu Picchu',['descent'],'Zejście z Waynapicchu','Huayna Picchu Descending pathway.jpg','Wąskie zejście wymaga uwagi i zachowania odstępu.'),
      photo('machu-quarry','Machu Picchu',['2a-quarry','2b-quarry'],'Kamieniołom i sektor miejski','Rock Quarry, Western Urban Sector & Agricultural Terraces.jpg','Surowa skała obok gotowej kamieniarki pokazuje proces budowy.'),
      photo('machu-windows','Machu Picchu',['2a-temples','2b-temples'],'Świątynia Trzech Okien','Machu Picchu - Temple of Three Windows (5055231295).jpg','Główny punkt ceremonialnego rdzenia miasta.'),
      photo('machu-inti','Machu Picchu',['2a-inti','2b-inti'],'Intiwatana','Intihuatana, Machu Picchu.jpg','Rzeźbiony kamień na wyniesionej platformie ceremonialnej.'),
      photo('machu-sacred','Machu Picchu',['2a-sacred','2b-sacred'],'Roca Sagrada','Sacred Rock (7914093954).jpg','Skała, mur i górski horyzont tworzą jeden układ.'),
      photo('machu-east','Machu Picchu',['2a-east','2b-east'],'Wschodni sektor miejski','Machu-picchu-c01.jpg','Przejścia, magazyny i rytm kamiennych otworów.'),
      photo('machu-mirrors','Machu Picchu',['2a-mirrors','2b-mirrors'],'Espejos de Agua','Machu Picchu, Water Mirrors.jpg','Dwie kamienne misy w kontekście pomieszczenia.'),
      photo('machu-condor','Machu Picchu',['condor','2a-condor','2b-condor'],'Świątynia Kondora','Machu Picchu Temple of the condor.jpg','Naturalna skała i obróbka tworzą kompozycję kojarzoną z kondorem.'),
      photo('machu-exit','Machu Picchu',['2a-exit','2b-exit'],'Sektor miejski przy końcu trasy','Gabled stone houses and agricultural terraces in the urban sector of Machu Picchu.jpg','Zabudowa i tarasy podsumowują przejście przez miasto.'),

      // ZWIERZĘTA — dokładnie wszystkie 20 gatunków z modułu Amazonii i Wildlife Trackera
      photo('animal-pink-dolphin','Zwierzęta',['pink-dolphin'],'Delfin amazoński','Amazon river dolphin 3.jpg','W terenie najczęściej zobaczycie grzbiet i moment oddechu.'),
      photo('animal-giant-otter','Zwierzęta',['giant-otter'],'Wydra olbrzymia','Giant otter (Pteronura brasiliensis).JPG','Duży, społeczny drapieżnik wodny Amazonii.'),
      photo('animal-capybara','Zwierzęta',['capybara'],'Kapibara','Capybara, Hydrochoerus hydrochaeris.jpg','Największy współczesny gryzoń, związany z brzegami i wodą.'),
      photo('animal-red-howler','Zwierzęta',['red-howler'],'Wyjec rudy','Red Howler Monkey (32126289696).jpg','Naczelny częściej najpierw słyszany niż widziany.'),
      photo('animal-squirrel-monkey','Zwierzęta',['squirrel-monkey'],'Sajmiri','Squirrel Monkey (5528519628).jpg','Małe, bardzo ruchliwe małpy przemieszczające się grupami.'),
      photo('animal-pygmy-marmoset','Zwierzęta',['pygmy-marmoset'],'Marmozeta karłowata','Pygmy marmoset (Cebuella pygmaea) climbing tree.jpg','Jeden z najmniejszych naczelnych świata, często przy pniach.'),
      photo('animal-woolly-monkey','Zwierzęta',['woolly-monkey'],'Wełniak','Lagothrix lagotricha.jpg','Cięższa sylwetka i chwytliwy ogon w wysokich koronach.'),
      photo('animal-sloth','Zwierzęta',['sloth'],'Leniwiec','Brown-throated sloth (Bradypus variegatus) (9370119683).jpg','W koronach drzew szukaj nieruchomej, zaokrąglonej sylwetki.'),
      photo('animal-jaguar','Zwierzęta',['jaguar'],'Jaguar','Jaguar, Panthera Onca.jpg','Fotografia identyfikacyjna; bezpośrednie spotkanie pozostaje bardzo mało prawdopodobne.'),
      photo('animal-caiman','Zwierzęta',['spectacled-caiman'],'Kajman okularowy','Caiman crocodilus. Spectacled Caiman (28288541767).jpg','Nocą najłatwiej wykrywany po odbiciu światła w oczach.'),
      photo('animal-anaconda','Zwierzęta',['anaconda'],'Anakonda zielona','Green Anaconda 001.jpg','Masywny wodny dusiciel — obserwacja wyłącznie z dystansu.'),
      photo('animal-emerald-boa','Zwierzęta',['emerald-boa'],'Boa szmaragdowy','Corallus caninus.jpg','Zielone ciało zwinięte na gałęzi nad leśną roślinnością.'),
      photo('animal-hoatzin','Zwierzęta',['hoatzin'],'Hoacyn','Opisthocomus hoazin.jpg','Czubaty ptak nadrzecznych zarośli, często zdradzający się głosem.'),
      photo('animal-macaw','Zwierzęta',['macaw'],'Ara niebiesko-żółta','Blue & Yellow Macaw (Ara ararauna) (8079749386).jpg','Duże papugi zwykle obserwowane parami lub w locie.'),
      photo('animal-toucan','Zwierzęta',['toucan'],'Tukan','Ramphastos tucanus.jpg','Duży dziób jest łatwy do rozpoznania, ale ptak często siedzi wysoko.'),
      photo('animal-great-potoo','Zwierzęta',['great-potoo'],'Potoo wielki','Great potoo (Nyctibius grandis) Rio Napo.jpg','Pionowa sylwetka doskonale udaje złamany konar.'),
      photo('animal-kingfisher','Zwierzęta',['kingfisher'],'Zimorodek amazoński','Amazon Kingfisher (Chloroceryle amazona).jpg','Często przelatuje nisko nad wodą i siada na odsłoniętych gałęziach.'),
      photo('animal-piranha','Zwierzęta',['piranha'],'Pirania czerwonobrzucha','Pygocentrus nattereri.jpg','Realna ryba ekosystemu, nie filmowy potwór.'),
      photo('animal-bullet-ant','Zwierzęta',['bullet-ant'],'Mrówka pociskowa','Paraponera clavata.jpg','Duża samotna mrówka — nie dotykać i nie prowokować.'),
      photo('animal-frog','Zwierzęta',['poison-frog'],'Drzewołaz','Poison Dart Frog.jpg','Mały płaz ściółki; nie dotykać i nie niszczyć otoczenia dla zdjęcia.'),

      // ROŚLINY — mały, celowy zestaw najważniejszych roślin Amazonii
      photo('plant-ceiba','Rośliny',['ceiba'],'Ceiba / kapokowiec','Ceiba pentandra.jpg','Ogromne drzewo z przyporami korzeniowymi, ważne dla struktury lasu.'),
      photo('plant-rubber','Rośliny',['rubber-tree'],'Kauczukowiec brazylijski','Rubber tree.jpg','Drzewo związane z historią boomu kauczukowego Iquitos.'),
      photo('plant-cacao','Rośliny',['cacao'],'Kakaowiec','Cocoa Pods.JPG','Owoce wyrastające bezpośrednio z pnia i grubszych gałęzi.'),
      photo('plant-aguaje','Rośliny',['aguaje'],'Aguaje','Mauritia flexuosa (19861732855).jpg','Palma ważna dla mokradeł, zwierząt i lokalnej gospodarki.'),
      photo('plant-victoria','Rośliny',['victoria-amazonica'],'Victoria amazonica','Victoria amazonica.jpg','Ogromne liście rośliny wodnej na spokojnych wodach.'),
      photo('plant-heliconia','Rośliny',['heliconia'],'Helikonia','Heliconia rostrata 3.jpg','Wyraziste kwiatostany typowe dla wilgotnych tropików.')
    ]
  };
})();
