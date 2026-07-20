(() => {
  window.PERU_OLLANTA = {
    version: 1,
    dates: '17–20.09.2026',
    altitude: 'ok. 2 860 m n.p.m.',
    hero: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ollantaytambo%2C%20Peru.jpg?width=1800',
    quickVerdict: {
      stay: 'Nocleg najlepiej w starej części miasteczka lub między placem a stacją. Priorytet: przechowanie dużych plecaków do wieczora 20.09.',
      ruins: '18.09 idźcie do parku archeologicznego na otwarcie. Daje to chłodniejsze powietrze, mniej grup i spokojniejsze zdjęcia.',
      town: 'Ollantaytambo nie kończy się na ruinach. Stare kwartały, kanały i bramy są równie ważne, bo pokazują żywe inkaskie miasto.',
      pinkuylluna: 'Pinkuylluna jest opcjonalna. Wejście jest strome i nieosłonięte; robicie je tylko przy dobrej pogodzie i energii.',
      train: '19.09 bądźcie na stacji około 12:25. Duże plecaki zostają w hotelu; do Aguas bierzecie małe plecaki.'
    },
    days: [
      {
        date: '17.09', title: 'Przyjazd przez Sacred Valley', pace: 'spokojny wieczór',
        blocks: [
          ['Po przyjeździe', 'Check-in, prysznic, sprawdzenie przechowania dużych plecaków do 20.09.'],
          ['Przed zachodem', 'Krótki spacer po Plaza de Armas i najbliższych ulicach starego miasta.'],
          ['Wieczór', 'Kolacja i przygotowanie biletu na park archeologiczny na rano.']
        ],
        decision: 'Po pełnym dniu transferowym nie wchodzicie już na Pinkuyllunę ani do ruin.',
        checklist: ['Potwierdzić przechowanie dużych plecaków', 'Sprawdzić Boleto Turístico Circuito III', 'Kupić wodę', 'Ustawić budzik na wczesne wejście']
      },
      {
        date: '18.09', title: 'Pełny dzień w Ollantaytambo', pace: 'ruiny rano, miasto później',
        blocks: [
          ['06:30–07:00', 'Śniadanie lub szybki lekki start.'],
          ['07:00–09:30', 'Park archeologiczny: tarasy, sektor świątynny, Świątynia Słońca, widoki i zejście.'],
          ['10:00–12:00', 'Późne śniadanie / wczesny lunch i odpoczynek.'],
          ['12:00–14:00', 'Stare miasto: kwartały kancha, kanały, bramy i spokojne uliczki.'],
          ['15:00–17:00', 'Opcja A: Pinkuylluna. Opcja B: kawa, rynek i spacer bez podejścia.'],
          ['Wieczór', 'Kolacja i spokojny wieczór. Bez forsowania przed Machu Picchu.']
        ],
        decision: 'Pinkuylluna tylko przy suchej nawierzchni, dobrej energii i braku problemów z kolanami lub wysokością.',
        checklist: ['Bilet / dokument', 'Woda', 'Krem UV', 'Czapka', 'Buty z przyczepnością', 'Zrobić zdjęcie godzin pociągu']
      },
      {
        date: '19.09', title: 'Spokojny poranek i pociąg do Aguas Calientes', pace: 'bez pośpiechu',
        blocks: [
          ['Rano', 'Śniadanie, ostatni spacer po kanałach albo kawa. Bez dodatkowej góry.'],
          ['10:30–11:30', 'Przepakowanie: duże plecaki zostają w hotelu, małe jadą do Aguas.'],
          ['11:50–12:05', 'Wyjście w stronę stacji — zależnie od położenia hotelu.'],
          ['12:25', 'Być na stacji.'],
          ['12:55', 'PeruRail Expedition do Machu Picchu Pueblo.']
        ],
        decision: 'Jeżeli hotel jest dalej od stacji albo pada, wyjdźcie wcześniej i weźcie mototaxi.',
        checklist: ['Paszporty', 'Bilety kolejowe', 'Małe plecaki', 'Potwierdzenie hotelu Aguas', 'Odebrać / zostawić kwit bagażowy']
      },
      {
        date: '20.09', title: 'Powrót po Machu Picchu', pace: 'noc logistyczna',
        blocks: [
          ['Wieczór', 'Pociąg 18:20 lub rekomendowany 20:50 do Ollantaytambo.'],
          ['Po przyjeździe', 'Odebranie dużych plecaków i nocleg albo wcześniej ustalony transfer.'],
          ['Priorytet', 'Bez szukania transportu na miejscu po nocnym przyjeździe. Wszystko ustalone wcześniej.']
        ],
        decision: 'Przy pociągu 20:50 najbezpieczniej nocować w Ollantaytambo i jechać na lotnisko następnego dnia.',
        checklist: ['Potwierdzić późny check-in', 'Mieć adres hotelu offline', 'Gotówka na mototaxi', 'Nie zapomnieć dużych plecaków']
      }
    ],
    ticket: {
      title: 'Najbardziej logiczny bilet dla was',
      product: 'Boleto Turístico Parcial — Circuito III',
      current: 'Na oficjalnej stronie COSITUC obecnie widnieje S/70 dla turysty zagranicznego i 2 dni ważności.',
      includes: ['Pisac', 'Ollantaytambo', 'Chinchero', 'Moray'],
      strategy: 'Kupno / aktywacja 17.09 pasuje do objazdu Sacred Valley, a drugi dzień ważności pokrywa park archeologiczny w Ollantaytambo 18.09.',
      warning: 'Cena, ważność i punkty sprzedaży mogą zmienić się przed wrześniem 2026. Sprawdźcie oficjalną stronę COSITUC przed wyjazdem.'
    },
    places: [
      {
        id: 'park', name: 'Park Archeologiczny Ollantaytambo', zone: 'zachodnia część miasta', time: '90–150 min', effort: 'umiarkowany–wysoki', priority: 'must',
        why: 'To jeden z najważniejszych kompleksów inkaskich w Sacred Valley i jednocześnie miejsce związane z przebudową królewskiej posiadłości Pachacuteca oraz późniejszym oporem Manco Inki.',
        route: 'Wejście → tarasy → sektor ceremonialny → Świątynia Słońca → widoki → zejście przez dolne sektory.',
        notice: 'Czytajcie układ pionowo: tarasy kontrolują stok, sektory ceremonialne dominują nad doliną, a naprzeciwko widać spichlerze Pinkuylluny.',
        photo: 'Wejdźcie na otwarcie. Szeroki kadr tarasów z człowiekiem oddaje skalę lepiej niż sam detal kamienia.',
        map: 'https://www.google.com/maps/search/?api=1&query=Parque+Arqueologico+Ollantaytambo'
      },
      {
        id: 'sun-temple', name: 'Świątynia Słońca i sześć monolitów', zone: 'górny sektor', time: '20–40 min w ramach parku', effort: 'wysoki', priority: 'must',
        why: 'Najbardziej spektakularny punkt kompleksu: ogromne bloki porfiru, precyzyjne spoiny i ślady przerwanego projektu.',
        route: 'Podejście głównymi schodami i tarasami; bez skrótów poza wyznaczoną trasą.',
        notice: 'Zwróćcie uwagę na występy montażowe, różne etapy obróbki, niedokończenie konstrukcji oraz kamieniołom po drugiej stronie doliny.',
        photo: 'Detal spoin i szeroki kadr z doliną. Nie opierajcie sprzętu o kamień.',
        map: 'https://www.google.com/maps/search/?api=1&query=Temple+of+the+Sun+Ollantaytambo'
      },
      {
        id: 'ten-niches', name: 'Mur Dziesięciu Niszy', zone: 'górny sektor', time: '10–20 min', effort: 'wysoki', priority: 'recommended',
        why: 'Długi rytmiczny mur pokazuje ceremonialny język inkaskiej architektury i kontrolę proporcji.',
        route: 'Oglądany po drodze do sektora świątynnego.',
        notice: 'Patrzcie na powtarzalność nisz, lekkie pochylenie ściany i sposób, w jaki architektura kieruje wzrok.',
        photo: 'Kadrujcie rytm nisz po skosie, nie tylko frontalnie.',
        map: 'https://www.google.com/maps/search/?api=1&query=Wall+of+Ten+Niches+Ollantaytambo'
      },
      {
        id: 'water', name: 'Sektor wodny i Baño de la Ñusta', zone: 'dolny sektor', time: '20–40 min', effort: 'niski', priority: 'recommended',
        why: 'Pokazuje, że woda była jednocześnie infrastrukturą, elementem ceremonii i narzędziem organizacji przestrzeni.',
        route: 'Najlepiej oglądać przy zejściu, kiedy nogi potrzebują odpoczynku.',
        notice: 'Obserwujcie jakość kanałów, kontrolę przepływu i powiązanie fontann z osiami zabudowy.',
        photo: 'Krótki czas migawki dla faktury wody albo spokojny detal kamienia. Nie blokujcie przejścia.',
        map: 'https://www.google.com/maps/search/?api=1&query=Bath+of+the+Nusta+Ollantaytambo'
      },
      {
        id: 'old-town', name: 'Stare miasto i kwartały kancha', zone: 'na północ od placu', time: '60–120 min', effort: 'niski', priority: 'must',
        why: 'To najważniejszy dowód, że Ollantaytambo jest żywym miastem o zachowanym inkaskim układzie, nie tylko stanowiskiem archeologicznym.',
        route: 'Plaza → Calle del Medio / Chaupi Calle → boczne uliczki → bramy kwartałów → powrót kanałami.',
        notice: 'Szukajcie pojedynczych wejść prowadzących do większych zespołów mieszkalnych, wewnętrznych dziedzińców i regularnych bloków zabudowy.',
        photo: 'Wąskie uliczki, biegnąca woda i kamienne progi. Fotografujcie mieszkańców tylko po zgodzie.',
        map: 'https://www.google.com/maps/search/?api=1&query=Old+Town+Ollantaytambo'
      },
      {
        id: 'channels', name: 'Kanały wodne', zone: 'całe stare miasto', time: '30–60 min', effort: 'niski', priority: 'must',
        why: 'Działające kanały pokazują ciągłość infrastruktury i sposób, w jaki woda porządkuje codzienne życie.',
        route: 'Najlepiej obserwować je podczas spaceru po starych kwartałach, bez osobnej wyprawy.',
        notice: 'Zwróćcie uwagę na spadek, przejścia pod ulicami, rozdział przepływu i relację kanału z wejściami do domów.',
        photo: 'Niski kadr wzdłuż kanału daje mocną linię prowadzącą.',
        map: 'https://www.google.com/maps/search/?api=1&query=Ollantaytambo+water+channels'
      },
      {
        id: 'pinkuylluna', name: 'Pinkuylluna — spichlerze i punkt widokowy', zone: 'wschodnie zbocze', time: '90–150 min', effort: 'wysoki', priority: 'optional',
        why: 'Daje najlepszy widok na park archeologiczny, układ miasta i dolinę oraz pokazuje strategiczne położenie spichlerzy.',
        route: 'Strome wejście z miasta → wyznaczona ścieżka → spichlerze → powrót tą samą drogą.',
        notice: 'Ekspozycja na słońce, luźny materiał i strome fragmenty. Nie jest to dobry pomysł po deszczu lub przy zmęczeniu.',
        photo: 'Panorama parku po drugiej stronie doliny; szeroki obiektyw i krótka ekspozycja przy wietrze.',
        map: 'https://www.google.com/maps/search/?api=1&query=Pinkuylluna+Ollantaytambo'
      },
      {
        id: 'inca-bridge', name: 'Most Inków', zone: 'południowy zachód', time: '45–75 min', effort: 'niski–umiarkowany', priority: 'optional',
        why: 'Spokojny cel krótkiego spaceru poza centrum, pokazujący kontrolę przepraw i połączenie miasta z doliną.',
        route: 'Plac → droga w stronę rzeki → most → powrót.',
        notice: 'To nie jest monumentalny punkt jak ruiny. Warto go robić dla krajobrazu i odpoczynku od tłumu.',
        photo: 'Rzeka, dolina i warstwy gór; najlepiej przy łagodnym świetle.',
        map: 'https://www.google.com/maps/search/?api=1&query=Inca+Bridge+Ollantaytambo'
      }
    ],
    food: [
      {
        id: 'chuncho', name: 'Chuncho', type: 'lokalna kuchnia i bar', budget: 'średnio',
        bestFor: 'Najlepsza kolacja, gdy chcecie jednego bardziej charakterystycznego miejsca.',
        order: 'Piqueos do dzielenia, danie z lokalnych składników i jeden koktajl z regionalnym destylatem.',
        note: 'Restauracja deklaruje korzystanie z własnej huerty i lokalnych dostawców; menu zmienia się sezonowo.',
        map: 'https://www.google.com/maps/search/?api=1&query=Chuncho+Ollantaytambo', source: 'https://www.chuncho.pe/'
      },
      {
        id: 'el-albergue', name: 'El Albergue Restaurant', type: 'restauracja przy stacji', budget: 'średnio–wyżej',
        bestFor: 'Spokojny lunch lub kolacja oraz wygodna opcja przy kolejowej logistyce.',
        order: 'Pstrąg, alpaka, świeże warzywa lub domowy makaron; wybór zależnie od sezonowego menu.',
        note: 'Restauracja działa przy stacji i korzysta z produktów z własnej farmy oraz lokalnych dostawców.',
        map: 'https://www.google.com/maps/search/?api=1&query=El+Albergue+Restaurant+Ollantaytambo', source: 'https://en.elalbergue.com/food-beverages/'
      },
      {
        id: 'cafe-mayu', name: 'Café Mayu', type: 'kawa i lekki posiłek na stacji', budget: 'tanio–średnio',
        bestFor: 'Kawa, kanapka lub awaryjny posiłek przed pociągiem.',
        order: 'Kawa, kanapka, brownie albo box lunch do pociągu.',
        note: 'Znajduje się na peronie / przy stacji i jest najbardziej praktyczne 19.09.',
        map: 'https://www.google.com/maps/search/?api=1&query=Cafe+Mayu+Ollantaytambo', source: 'https://en.elalbergue.com/food-beverages/'
      },
      {
        id: 'menu', name: 'Menú del día przy placu', type: 'lokalny tani obiad', budget: 'tanio',
        bestFor: 'Normalny sycący lunch bez robienia z każdego posiłku wydarzenia.',
        order: 'Zupa + drugie danie + napój. Wybierajcie lokal z ruchem miejscowych.',
        note: 'Nie przywiązujcie się do jednej nazwy wiele miesięcy wcześniej; na miejscu sprawdźcie aktualne menu i ruch.',
        map: 'https://www.google.com/maps/search/?api=1&query=menu+del+dia+Ollantaytambo', source: 'https://www.google.com/maps/search/?api=1&query=restaurants+Ollantaytambo'
      }
    ],
    hotelCriteria: [
      'Przechowanie dużych plecaków od 19.09 rano do późnego wieczora 20.09 — potwierdzone pisemnie.',
      'Możliwość późnego check-in po pociągu 20:50 albo jasna procedura odbioru klucza.',
      'Dojście do stacji w maksymalnie około 15–20 minut albo łatwy mototaxi.',
      'Ciepła woda, spokojny pokój i brak głośnego baru pod oknem.',
      'Elastyczne anulowanie dla noclegu zabezpieczającego 20–21.09.'
    ],
    trainRules: [
      'Na stacji 19.09 celujcie w 12:25 na pociąg 12:55.',
      'Duże plecaki zostają w hotelu w Ollantaytambo; do Aguas jadą tylko małe plecaki zgodne z zasadami przewoźnika.',
      'Adres hotelu i potwierdzenie przechowania bagażu miejcie offline.',
      'Po powrocie 20.09 nie improwizujcie z transportem. Nocleg lub taxi muszą być ustalone wcześniej.',
      'Café Mayu przy stacji jest sensownym miejscem na kawę lub szybki prowiant, ale nie traktujcie go jako bufora na spóźnienie.'
    ],
    sources: [
      {label: 'DDC Cusco — Park Archeologiczny Ollantaytambo', url: 'https://www.culturacusco.gob.pe/parques/ollantaytambo/'},
      {label: 'COSITUC — taryfa Boleto Turístico', url: 'https://cosituc.gob.pe/tarifario-2/'},
      {label: 'Chuncho — oficjalna strona', url: 'https://www.chuncho.pe/'},
      {label: 'El Albergue — jedzenie i napoje', url: 'https://en.elalbergue.com/food-beverages/'},
      {label: 'Wikimedia Commons — zdjęcie hero', url: 'https://commons.wikimedia.org/wiki/File:Ollantaytambo,_Peru.jpg'}
    ]
  };
})();
