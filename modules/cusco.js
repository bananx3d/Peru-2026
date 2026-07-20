(() => {
  window.PERU_CUSCO = {
    version: 2,
    dates: '14–17.09.2026',
    altitude: 'ok. 3 400 m n.p.m.',
    hero: 'https://commons.wikimedia.org/wiki/Special:FilePath/Plaza%20de%20Armas%2C%20Cusco%20Per%C3%BA.%20En%20el%20d%C3%ADa.jpg?width=1800',
    quickVerdict: {
      base: 'Szukajcie noclegu w historycznym centrum lub przy Avenida El Sol, ale bez stromego podejścia. San Blas jest piękny, lecz jako baza po przylocie może niepotrzebnie męczyć.',
      day15: 'Pierwszy pełny dzień: Plaza de Armas → Qorikancha → Hatun Rumiyoc → San Blas. To wystarcza, żeby zrozumieć miasto bez biegania.',
      day16: 'Jeżeli wysokość jest dobrze tolerowana: taxi do Sacsayhuamán rano, potem zejście przez San Cristóbal i po południu MAP albo San Pedro.',
      ticket: 'Sacsayhuamán jest w Circuito I Boleto Turístico. Qorikancha, katedra i MAP mają osobne wejściówki lub własne zasady.',
      rule: 'Na 3 400 m liczy się jakość zwiedzania. Trzy mocne punkty dziennie są lepsze niż siedem zaliczonych bez energii.'
    },
    days: [
      {
        date: '14.09',
        title: 'Przylot i łagodne wejście w wysokość',
        pace: 'bardzo lekko',
        blocks: [
          ['Po przylocie', 'Transfer prosto do hotelu, check-in, woda i spokojny posiłek.'],
          ['Popołudnie', 'Krótki spacer wyłącznie po płaskiej okolicy hotelu, jeśli wszyscy czują się dobrze.'],
          ['Wieczór', 'Pakowanie minimum, prysznic, lekka kolacja i sen. Bez alkoholu.']
        ],
        route: 'Lotnisko → hotel → najbliższa spokojna restauracja → odpoczynek',
        decision: 'Jeżeli ból głowy lub nudności narastają, odpuszczacie spacer i obserwujecie objawy.',
        checklist: ['Kupić wodę do pokoju', 'Zjeść lekko', 'Sprawdzić samopoczucie wszystkich', 'Przygotować dokumenty na następny dzień']
      },
      {
        date: '15.09',
        title: 'Cusco warstwa po warstwie',
        pace: 'lekko',
        blocks: [
          ['09:00–10:00', 'Plaza de Armas: spokojne wejście w układ dawnego centrum Inków i kolonialne nadpisanie miasta.'],
          ['10:15–11:45', 'Qorikancha / Santo Domingo: najważniejszy punkt dnia dla kamieniarki, religii i zderzenia dwóch porządków.'],
          ['12:00–14:00', 'Lunch i długa przerwa. Bez pośpiechu.'],
          ['14:00–16:30', 'Hatun Rumiyoc → Plaza de las Nazarenas → San Blas. Do San Blas możecie podjechać taxi i zejść pieszo.'],
          ['Wieczór', 'Kolacja blisko hotelu; Plaza de Armas po zmroku tylko jeśli energia jest dobra.']
        ],
        route: 'Plaza de Armas → Qorikancha → lunch → Hatun Rumiyoc → San Blas',
        decision: 'Jeżeli ktoś nadal czuje wysokość, kończycie dzień po Qorikancha i lunchu.',
        checklist: ['Paszport lub dokument', 'Woda', 'Krem UV', 'Lekka warstwa na wieczór', 'Gotówka na drobne wejścia']
      },
      {
        date: '16.09',
        title: 'Sacsayhuamán albo spokojniejszy wariant muzealny',
        pace: 'lekko–umiarkowanie',
        blocks: [
          ['07:30–08:00', 'Ocena samopoczucia. Decyzja: wariant A lub B.'],
          ['Wariant A', 'Taxi do Sacsayhuamán rano, 90–150 min zwiedzania, potem taxi lub zejście przez San Cristóbal.'],
          ['Wariant B', 'Jeżeli wysokość nadal męczy: MAP, San Pedro i spokojny spacer po centrum.'],
          ['Po południu', 'Jedno muzeum albo Mercado San Pedro. Nie oba na siłę.'],
          ['Wieczór', 'Pakowanie, potwierdzenie TaxiDatum i przygotowanie bagażu do Ollantaytambo.']
        ],
        route: 'A: Sacsayhuamán → San Cristóbal → centrum · B: MAP → San Pedro → hotel',
        decision: 'Sacsayhuamán robicie tylko przy dobrym samopoczuciu całej trójki.',
        checklist: ['Sprawdzić Boleto Turístico', 'Potwierdzić transfer 17.09', 'Naładować telefony i powerbank', 'Przepakować rzeczy na Sacred Valley']
      },
      {
        date: '17.09',
        title: 'Wyjazd do Sacred Valley',
        pace: 'dzień transferowy',
        blocks: [
          ['Rano', 'Lekki śniadaniowy start bez dokładania atrakcji w Cusco.'],
          ['Przed wyjazdem', 'Check-out, bagaże, woda i potwierdzenie końca trasy w Ollantaytambo.'],
          ['Trasa', 'Pisac → Moray → Maras → Chinchero → Ollantaytambo zgodnie z ustaleniem z kierowcą.']
        ],
        route: 'Cusco → Pisac → Moray → Maras → Chinchero → Ollantaytambo',
        decision: 'Nie dokładacie porannego zwiedzania Cusco przed długim objazdem.',
        checklist: ['Check-out', 'Dokumenty', 'Gotówka', 'Boleto Turístico Circuito III', 'Potwierdzić hotel w Ollantaytambo']
      }
    ],
    routes: [
      {
        id: 'inca-colonial',
        name: 'Miasto Inków pod miastem kolonialnym',
        duration: '4–6 h z lunchem',
        ideal: '15.09',
        sequence: ['Plaza de Armas', 'Qorikancha', 'Hatun Rumiyoc', 'Plaza de las Nazarenas', 'San Blas'],
        point: 'Cały sens trasy polega na obserwowaniu, jak kolonialne kościoły i domy stoją na inkaskich murach oraz zachowują dawny układ ulic.',
        map: 'https://www.google.com/maps/dir/Plaza+de+Armas+Cusco/Qorikancha/Hatun+Rumiyoc/Plaza+de+las+Nazarenas/San+Blas+Cusco'
      },
      {
        id: 'sacsayhuaman',
        name: 'Sacsayhuamán i zejście do miasta',
        duration: '3–5 h',
        ideal: '16.09 przy dobrym samopoczuciu',
        sequence: ['Taxi do wejścia', 'Zygzakowate mury', 'Rodadero i widoki', 'San Cristóbal', 'Plaza de Armas'],
        point: 'Podjazd taxi oszczędza siły. Zejście daje naturalne przejście od krajobrazu ceremonialnego do historycznego centrum.',
        map: 'https://www.google.com/maps/dir/Sacsayhuaman/San+Cristobal+Cusco/Plaza+de+Armas+Cusco'
      },
      {
        id: 'soft-day',
        name: 'Spokojny dzień muzealny',
        duration: '3–4 h',
        ideal: '16.09 przy słabszej aklimatyzacji',
        sequence: ['MAP Cusco', 'Plaza de las Nazarenas', 'Mercado San Pedro', 'Avenida El Sol'],
        point: 'Wariant bez stromych podejść i bez ekspozycji na wiatr, a nadal mocny historycznie i kulinarnie.',
        map: 'https://www.google.com/maps/dir/Museo+de+Arte+Precolombino+Cusco/Mercado+San+Pedro+Cusco/Avenida+El+Sol+Cusco'
      }
    ],
    places: [
      {
        id: 'plaza', name: 'Plaza de Armas', zone: 'centrum', time: '45–90 min', effort: 'niski', priority: 'must',
        why: 'Najlepszy punkt do zrozumienia miasta jako dawnej stolicy Tawantinsuyu oraz późniejszego centrum kolonialnego.',
        history: 'Dzisiejszy plac zajmuje część dawnej ceremonialnej przestrzeni Huacaypata. Hiszpanie zachowali centralność miejsca, ale zmienili jego architekturę i symbolikę.',
        notice: 'Patrzcie na relację między katedrą, kościołem jezuitów, arkadami i przebiegiem ulic. Plac działa jak mapa zmiany władzy.',
        photo: 'Rano szeroki kadr z arkad; wieczorem detale fasad i światła. Najlepszy punkt wysoko nad placem tylko wtedy, gdy podejście nie męczy.',
        map: 'https://www.google.com/maps/search/?api=1&query=Plaza+de+Armas+Cusco'
      },
      {
        id: 'qorikancha', name: 'Qorikancha / Santo Domingo', zone: 'Avenida El Sol', time: '60–90 min', effort: 'niski', priority: 'must',
        why: 'Najczytelniejsze w Cusco spotkanie inkaskiej architektury sakralnej z klasztorem zbudowanym po podboju.',
        history: 'Qorikancha był jednym z najważniejszych sanktuariów państwa Inków, związanym przede wszystkim z kultem Inti. Kolonialny klasztor Santo Domingo wyrósł bezpośrednio na wcześniejszych strukturach.',
        notice: 'Obserwujcie trapezowe otwory, lekko nachylone ściany, bardzo dokładne spoiny oraz różnicę zachowania kamienia i kolonialnej zabudowy podczas trzęsień ziemi.',
        photo: 'Detale kamieniarki, wewnętrzne osie i kontrast materiałów. Nie ograniczajcie się do jednego szerokiego kadru dziedzińca.',
        map: 'https://www.google.com/maps/search/?api=1&query=Qorikancha+Cusco'
      },
      {
        id: 'cathedral', name: 'Katedra w Cusco', zone: 'Plaza de Armas', time: '45–75 min', effort: 'niski', priority: 'optional',
        why: 'Wnętrze pokazuje, jak sztuka europejska została przetworzona przez lokalnych twórców i andyjskie symbole.',
        history: 'Katedra powstawała w epoce kolonialnej i zawiera ważne przykłady szkoły cuskeńskiej. To nie tylko „ładny kościół”, ale narzędzie nowego porządku religijnego.',
        notice: 'Szukajcie lokalnych elementów w malarstwie i rzeźbie oraz sposobu, w jaki świątynia dominuje nad dawną przestrzenią ceremonialną.',
        photo: 'Z zewnątrz najlepiej rano lub wieczorem. W środku respektujcie zasady fotografowania.',
        map: 'https://www.google.com/maps/search/?api=1&query=Catedral+del+Cusco'
      },
      {
        id: 'hatun-rumiyoc', name: 'Hatun Rumiyoc i kamień 12-kątny', zone: 'San Blas', time: '20–40 min', effort: 'umiarkowany', priority: 'must',
        why: 'Krótki odcinek ulicy pokazuje, jak inkaskie mury nadal prowadzą współczesne miasto.',
        history: 'Mur jest wiązany z pałacem Inca Roca. Słynny kamień jest tylko jednym elementem większego systemu precyzyjnie dopasowanych bloków.',
        notice: 'Nie patrzcie wyłącznie na jeden kamień. Obejrzyjcie całą ścianę, narożniki, zróżnicowanie bloków i sposób prowadzenia ulicy.',
        photo: 'Wcześnie rano, zanim pojawią się grupy. Użyjcie szerokiego kadru całej ściany i jednego detalu.',
        map: 'https://www.google.com/maps/search/?api=1&query=Hatun+Rumiyoc+Cusco'
      },
      {
        id: 'nazarenas', name: 'Plaza de las Nazarenas', zone: 'San Blas', time: '20–45 min', effort: 'umiarkowany', priority: 'recommended',
        why: 'Spokojniejszy plac po drodze między Hatun Rumiyoc, MAP i San Blas; dobry punkt na przerwę.',
        history: 'Okolica łączy inkaskie fundamenty, kolonialne rezydencje i późniejsze adaptacje na hotele i instytucje kultury.',
        notice: 'Zwróćcie uwagę na dziedzińce, portale i skalę dawnych rezydencji, nie tylko na luksusowe fasady.',
        photo: 'Detale drzwi, kamienne obramienia i spokojniejsze kadry bez tłumu.',
        map: 'https://www.google.com/maps/search/?api=1&query=Plaza+de+las+Nazarenas+Cusco'
      },
      {
        id: 'map', name: 'Museo de Arte Precolombino — MAP', zone: 'Plaza de las Nazarenas', time: '60–90 min', effort: 'niski', priority: 'recommended',
        why: 'Najlepszy kompaktowy wybór muzealny, jeśli chcecie zobaczyć sztukę kultur sprzed Inków bez spędzania pół dnia w gablotach.',
        history: 'Kolekcja prowadzi przez około trzy tysiące lat sztuki dawnego Peru i daje kontekst temu, co później zobaczycie w architekturze Inków.',
        notice: 'Nie oglądajcie tylko złota. Ceramika, drewno, muszle i tekstylne idee pokazują różne sposoby budowania znaczenia.',
        photo: 'Fotografowanie zależy od zasad muzeum. Zamiast dokumentować wszystko, wybierzcie po trzy obiekty, które naprawdę zapamiętacie.',
        map: 'https://www.google.com/maps/search/?api=1&query=Museo+de+Arte+Precolombino+Cusco'
      },
      {
        id: 'san-blas', name: 'San Blas', zone: 'wzgórze nad centrum', time: '60–120 min', effort: 'wysoki', priority: 'recommended',
        why: 'Dzielnica daje węższe uliczki, pracownie, widoki i spokojniejszy rytm niż ścisłe centrum.',
        history: 'Obszar zachował rzemieślniczy charakter i wyrósł na wcześniejszej andyjskiej tkance miejskiej.',
        notice: 'Największym kosztem jest podejście na wysokości. Taxi w górę i zejście pieszo to rozsądna taktyka.',
        photo: 'Warstwy dachów, strome uliczki, białe fasady i widoki na centrum.',
        map: 'https://www.google.com/maps/search/?api=1&query=Barrio+San+Blas+Cusco'
      },
      {
        id: 'san-pedro', name: 'Mercado San Pedro', zone: 'zachód centrum', time: '45–75 min', effort: 'niski', priority: 'recommended',
        why: 'Najlepszy szybki kontakt z codziennym obiegiem produktów, posiłków i zakupów poza monumentalnym centrum.',
        history: 'Hala targowa jest częścią nowoczesnego miasta, ale sprzedawane produkty prowadzą wprost do andyjskiego rolnictwa i kuchni.',
        notice: 'Najciekawsze są sekcje ziemniaków, kukurydzy, ziół, soków i lokalnych posiłków, nie same pamiątki.',
        photo: 'Najpierw pytajcie o zgodę. Fotografujcie produkty i układ stoisk bez nachalnego wchodzenia ludziom w twarz.',
        map: 'https://www.google.com/maps/search/?api=1&query=Mercado+San+Pedro+Cusco'
      },
      {
        id: 'sacsayhuaman', name: 'Sacsayhuamán', zone: 'powyżej miasta', time: '90–150 min', effort: 'umiarkowany–wysoki', priority: 'conditional',
        why: 'Najmocniejszy pokaz monumentalnej skali inkaskiej architektury i organizacji pracy w pobliżu Cusco.',
        history: 'Kompleks pełnił funkcje ceremonialne, polityczne i obronne. Jego trzy zygzakowate linie murów wykorzystują ogromne, nieregularne bloki.',
        notice: 'Nie traktujcie murów jak tajemnicy bez odpowiedzi. Patrzcie na transport, przygotowanie powierzchni, wielokrotne dopasowywanie i zarządzanie pracą.',
        photo: 'Szeroki obiektyw, linie zygzaków i człowiek w kadrze dla skali. Rano jest zwykle spokojniej i światło jest łagodniejsze.',
        map: 'https://www.google.com/maps/search/?api=1&query=Sacsayhuaman'
      },
      {
        id: 'san-cristobal', name: 'San Cristóbal i widok na Cusco', zone: 'między Sacsayhuamán a centrum', time: '20–45 min', effort: 'umiarkowany', priority: 'optional',
        why: 'Naturalny przystanek przy zejściu z Sacsayhuamán, z czytelnym widokiem na układ historycznego centrum.',
        history: 'Punkt pokazuje zależność miasta od doliny i wzgórz, na których rozmieszczono ważne miejsca ceremonialne.',
        notice: 'Zamiast fotografować tylko panoramę, spróbujcie rozpoznać Plaza de Armas, Qorikancha i osie ulic.',
        photo: 'Najlepiej po południu, gdy światło pada na czerwone dachy. Zejście może być śliskie po deszczu.',
        map: 'https://www.google.com/maps/search/?api=1&query=Mirador+de+San+Cristobal+Cusco'
      }
    ],
    food: [
      {name: 'Pierwszy dzień', budget: 'lekko i blisko', items: 'zupa quinoa, rosół, ryż, kurczak, pieczywo, owoce', note: 'Pierwszego dnia tolerancja organizmu jest ważniejsza niż kulinarne rekordy.'},
      {name: 'Tani obiad', budget: 'szukaj menú del día', items: 'zupa + drugie danie + napój', note: 'Najlepsza relacja ceny do sytości jest zwykle kilka ulic od Plaza de Armas.'},
      {name: 'Lokalne rzeczy', budget: 'średnio', items: 'pstrąg, choclo con queso, ají de gallina, lomo saltado', note: 'Dzielcie porcje, jeżeli apetyt na wysokości jest słabszy.'},
      {name: 'Mercado San Pedro', budget: 'tanio', items: 'soki, pieczywo, owoce, proste posiłki', note: 'Wybierajcie ruchliwe stoiska i świeżo przygotowane jedzenie.'},
      {name: 'Napoje', budget: 'dowolnie', items: 'woda, muña, mate de coca', note: 'Mogą poprawić komfort, ale nie leczą nasilającej się choroby wysokościowej.'}
    ],
    altitudeGuide: [
      {level: 'Zielony', symptoms: 'Lekki zadyszka przy podejściu, niewielkie zmęczenie, dobry apetyt.', action: 'Kontynuujcie wolno, pijcie regularnie i róbcie przerwy.'},
      {level: 'Żółty', symptoms: 'Ból głowy, gorszy sen, lekka nudność, wyraźne osłabienie.', action: 'Ograniczcie plan, odpoczynek, nawodnienie i brak alkoholu. Nie jedźcie wyżej dla samego zwiedzania.'},
      {level: 'Czerwony', symptoms: 'Narastająca duszność w spoczynku, trudności z chodzeniem prosto, splątanie, silne wymioty.', action: 'Pilna pomoc medyczna i zejście niżej. To nie jest moment na „przeczekanie atrakcji”.'}
    ],
    fieldNotes: [
      'W Cusco najważniejsza informacja jest w styku materiałów: inkaski kamień na dole, kolonialna cegła lub tynk powyżej.',
      'Układ ulic zachował część dawnych osi. Patrzcie nie tylko na budynki, ale także na sposób prowadzenia ulic i zamykania widoków.',
      'Wąskie ulice i strome podejścia fałszują ocenę czasu. Do każdego przejścia dodajcie zapas na odpoczynek.',
      'Sacsayhuamán ma większą wartość, gdy rozumiecie je jako zorganizowany krajobraz, nie pojedynczy „mur z wielkich kamieni”.',
      'San Blas najlepiej robić z góry w dół. Taxi na górę oszczędza energię bez odbierania przyjemności spaceru.',
      'Na Plaza de Armas usiądźcie przynajmniej raz rano i raz po zmroku — rytm miejsca zmienia się bardziej niż sama architektura.'
    ],
    ticketNotes: [
      'Boleto Turístico Circuito I obejmuje obecnie Sacsayhuamán, Q’enqo, Puka Pukara i Tambomachay.',
      'Circuito III obejmuje obecnie Pisac, Ollantaytambo, Chinchero i Moray — to właśnie wariant najbardziej pasujący do waszego transferu 17.09 i Ollantaytambo 18.09.',
      'Qorikancha, katedra i MAP nie są tym samym biletem. Sprawdźcie aktualne zasady tuż przed podróżą.',
      'Nie kupujcie pełnego pakietu tylko dlatego, że „może się przyda”. Najpierw policzcie realne miejsca z waszego planu.'
    ],
    sources: [
      {label: 'UNESCO — City of Cuzco', url: 'https://whc.unesco.org/en/list/273/'},
      {label: 'COSITUC — Boleto Turístico', url: 'https://cosituc.gob.pe/tarifario-2/'},
      {label: 'COSITUC — Sacsayhuamán', url: 'https://cosituc.gob.pe/sacsayhuaman/'},
      {label: 'MAP Cusco — oficjalna strona', url: 'https://mapcusco.pe/'},
      {label: 'Wikimedia Commons — zdjęcie hero', url: 'https://commons.wikimedia.org/wiki/File:Plaza_de_Armas,_Cusco_Per%C3%BA._En_el_d%C3%ADa.jpg'}
    ]
  };
})();
