(() => {
  window.PERU_MACHU = {
    version: 2,
    hero: 'https://commons.wikimedia.org/wiki/Special:FilePath/Machu%20Picchu%20%28Peru%29.jpg?width=1900',
    ticket: {
      date: '20.09.2026',
      entry: '07:00',
      route: 'Circuito 3 — Ruta 3-A Montaña Waynapicchu',
      holder: 'Kuba · Weronika · Daniel',
      status: 'Kupione'
    },
    verified: {
      date: '20.07.2026',
      headline: 'Waynapicchu jest ponownie otwarte',
      text: 'Ministerstwo Kultury poinformowało o ponownym otwarciu trasy od 1 lipca 2026 po pracach konserwacyjnych. Do września sytuację trzeba sprawdzić jeszcze raz, ponieważ trasy górskie mogą być czasowo zamykane ze względów bezpieczeństwa.',
      source: 'https://www.gob.pe/institucion/cultura/noticias/1412861-ministerio-de-cultura-anuncia-la-reapertura-de-la-montana-waynapicchu-desde-el-1-de-julio'
    },
    mission: [
      {time:'05:00', title:'Pobudka i pełne śniadanie', text:'Nie wychodzić na samej kawie. Woda, lekki posiłek, toaleta i ostatnia kontrola dokumentów.'},
      {time:'05:35', title:'Kolejka do autobusów', text:'Bilet autobusowy mieć wcześniej. Margines jest ważniejszy niż dodatkowe 20 minut snu.'},
      {time:'około 06:00', title:'Autobus do wejścia', text:'Przejazd zwykle trwa około 25–30 minut. Po wyjściu toaleta i ustawienie się do właściwej kolejki.'},
      {time:'06:40', title:'Kontrola dokumentów', text:'Oryginalny paszport dla każdego. Sprawdzić zgodność danych z biletem i nie pomylić kolejki tras.'},
      {time:'07:00', title:'Wejście Ruta 3-A', text:'Od tego momentu trzymać spokojne tempo. Nie spalać nóg przed bramką na górę.'},
      {time:'07:20–07:45', title:'Sektor królewski i wodny', text:'Patrzeć na jakość murów, kanały, fontanny i relację budowli z naturalną skałą.'},
      {time:'około 07:45', title:'Kontrola Waynapicchu', text:'Wpisać się zgodnie z poleceniami obsługi. Ustalić punkt spotkania, gdyby grupa się rozdzieliła.'},
      {time:'07:50–10:30', title:'Podejście, szczyt i zejście', text:'Oficjalny opis trasy podaje 2,4 km. Na stromych odcinkach telefon zostaje schowany, dopóki nie stoicie stabilnie.'},
      {time:'10:30–11:45', title:'Dokończenie Circuito 3', text:'Nie przyspieszać bez potrzeby. Zobaczyć dolne sektory, architekturę wysokiej rangi i Świątynię Kondora, jeśli aktualne barierki prowadzą tym przebiegiem.'},
      {time:'11:30–12:40', title:'Przerwa poza bramkami', text:'Toaleta, nawodnienie i szybkie jedzenie. Przy dodatkowym wejściu o 13:00 nie zjeżdżać do Aguas Calientes.'},
      {time:'13:00 lub 14:00', title:'Opcjonalna Ruta 2', text:'Priorytet: wcześniejsza godzina. Przy tej samej godzinie 2-A przed 2-B.'},
      {time:'po drugim wejściu', title:'Autobus, bagaże i pociąg', text:'Odebrać małe plecaki, zjeść i dotrzeć na stację minimum 30 minut wcześniej. 20:50 pozostaje wariantem bezpiecznym.'}
    ],
    route3: [
      {id:'entry', order:'01', name:'Wejście i tarasy dolne', type:'orientacja', time:'10–15 min', look:'Zamiast polować od razu na panoramę, zobacz jak tarasy stabilizują strome zbocze i odprowadzają wodę.', photo:'Pierwszy szeroki kadr dopiero z miejsca, w którym wolno się zatrzymać.'},
      {id:'royal', order:'02', name:'Circuito de la Realeza', type:'architektura', time:'20–30 min', look:'Najlepsza kamieniarka, kontrolowane wejścia, niewielkie pomieszczenia wysokiej rangi i naturalna skała wbudowana w projekt.', photo:'Detale łączeń bloków i przejścia światła przez otwory.'},
      {id:'sun', order:'03', name:'Świątynia Słońca', type:'ceremonia', time:'8–12 min', look:'Półkolisty mur, precyzyjna obróbka i relacja z naturalnym głazem. Nie dopasowywać na siłę każdej szczeliny do teorii astronomicznej.', photo:'Krzywizna muru najlepiej czyta się po skosie, nie na wprost.'},
      {id:'water', order:'04', name:'Kanały i fontanny', type:'inżynieria', time:'10–15 min', look:'Spadek kanału, kolejne punkty poboru oraz sposób prowadzenia wody między sektorami.', photo:'Krótki film pokazujący przepływ i różnicę poziomów.'},
      {id:'gate', order:'05', name:'Bramka Waynapicchu', type:'kontrola', time:'5–10 min', look:'To punkt przejścia z llaqta na trasę górską. Sprawdźcie zasady, godzinę i stan całej trójki.', photo:'Bez zatrzymywania kolejki; zdjęcie tylko z boku, jeśli obsługa pozwala.'},
      {id:'climb', order:'06', name:'Strome schody', type:'wysiłek', time:'45–75 min', look:'Krótkie kroki, ręce wolne i pełna koncentracja. Nowe barierki i zabezpieczenia nie usuwają ekspozycji.', photo:'Nie fotografować podczas ruchu. Najpierw stabilna pozycja.'},
      {id:'summit', order:'07', name:'Górne tarasy i widok', type:'panorama', time:'20–35 min', look:'Z góry llaqta staje się mała wobec zakola Urubamby i masywu Vilcabamba. To najlepszy moment na zrozumienie krajobrazu.', photo:'Szeroki kadr z miastem i rzeką; pionowe ujęcie schodów tylko z bezpiecznej platformy.'},
      {id:'descent', order:'08', name:'Zejście', type:'bezpieczeństwo', time:'45–70 min', look:'Zmęczenie zwiększa ryzyko. Nie przyspieszać za grupą i przepuszczać ludzi wyłącznie na szerszych fragmentach.', photo:'Telefon schowany na stromych odcinkach.'},
      {id:'condor', order:'09', name:'Dolny sektor i Świątynia Kondora', type:'interpretacja', time:'20–35 min', look:'Naturalna skała zestawiona z obróbką. Nazwa jest współczesną interpretacją, nie podpisem pozostawionym przez Inków.', photo:'Pokazać formę razem z otoczeniem, a nie tylko ciasny detal.'},
      {id:'exit', order:'10', name:'Wyjście i regeneracja', type:'logistyka', time:'15–30 min', look:'Zapisać godzinę wyjścia, ocenić nogi i dopiero wtedy potwierdzić plan drugiego wejścia.', photo:'Ostatni kadr nie jest wart biegu ani cofania się pod prąd.'}
    ],
    focusCards: [
      {title:'Kamieniarka', text:'Szukaj różnic między murami użytkowymi a wysokiej rangi. Precyzja jest komunikatem społecznym, nie tylko popisem technicznym.'},
      {title:'Woda', text:'Machu Picchu działało dzięki ujęciu źródła, kanałom i seriom fontann. Woda organizuje przestrzeń równie mocno jak ściany.'},
      {title:'Skała', text:'Inkowie rzadko „czyścili” teren do zera. Naturalne głazy stają się częścią murów, świątyń i kompozycji widokowej.'},
      {title:'Krajobraz', text:'Patrz na relację miasta z górami, zakolem rzeki i siodłem między Machupicchu a Waynapicchu.'},
      {title:'Dachy i życie', text:'Dzisiejsze ruiny były pełne strzechy, drewna, tkanin, dymu, żywności i ludzi. Kamień to tylko zachowany szkielet.'},
      {title:'Ruch jednokierunkowy', text:'Nie odkładaj ważnego kadru „na później”. Na trasie zwykle nie można się cofnąć.'}
    ],
    route2: {
      verified: 'Oficjalne mapy DDC Cusco wskazują maksymalny czas pobytu 2 godziny 30 minut dla obu tras. Rzeczywisty przebieg zawsze wyznaczają barierki i obsługa w dniu wizyty.',
      maxStay: '2 h 30 min',
      priority: ['2-A o 13:00','2-B o 13:00','2-A lub 2-B o 14:00','15:00 tylko awaryjnie'],
      rule:'Godzina wygrywa z literą trasy. 2-B o 13:00 jest lepsza dla waszego dnia niż 2-A o 14:00.',
      differences: [
        {name:'Ruta 2-A', verdict:'Pierwszy wybór przy tej samej godzinie', text:'Wyższa, klasyczna perspektywa na llaqta i pełniejszy początek przez sektor rolniczy. Następnie najważniejsza część miejska: kamieniołom, Plaza de los Templos, Intiwatana, Roca Sagrada, Espejos de Agua i dolne sektory.'},
        {name:'Ruta 2-B', verdict:'Bardzo dobra alternatywa', text:'Klasyczny widok z niższej platformy i niemal ten sam rdzeń miejski. Rezygnujecie głównie z nieco wyższego początku, a nie z całego „prawdziwego Machu Picchu”.'}
      ],
      compare: [
        {label:'Zdjęcie klasyczne', a:'Wyższa platforma; najbardziej pocztówkowa perspektywa.', b:'Dolna platforma; nadal klasyczny kadr, ale mniej z góry.'},
        {label:'Początek trasy', a:'Więcej wejścia przez tarasy i wyższy punkt widokowy.', b:'Szybsze wejście na dolną platformę i przejście w stronę miasta.'},
        {label:'Rdzeń miejski', a:'Bardzo szeroki: place, świątynie, kamieniołom, Intiwatana, Roca Sagrada i wschodnie sektory.', b:'Równie szeroki po połączeniu tras przy Foso Seco; większość najważniejszych sektorów jest wspólna.'},
        {label:'Wysiłek po Waynapicchu', a:'Odrobinę więcej podejścia na początku.', b:'Minimalnie łagodniejszy start — sensowny po zmęczeniu 3-A.'},
        {label:'Dla was', a:'Bierzcie przy tej samej godzinie i dobrym stanie nóg.', b:'Bierzcie bez wahania, gdy jest wcześniejsza albo tylko ona została.'}
      ],
      after3A: [
        {title:'Klasyczna panorama', text:'Ruta 3-A daje widok z Waynapicchu, lecz Ruta 2 pokazuje llaqta z kultowej strony platform rolniczych. To zupełnie inne zdjęcie i inny sposób czytania planu miasta.'},
        {title:'Plaza de los Templos', text:'Tutaj zobaczycie Templo Principal i Templo de las Tres Ventanas — monumentalny, ceremonialny rdzeń, którego nie należy traktować jak zwykłych domów.'},
        {title:'Caos Granítico', text:'Kamieniołom pokazuje proces, a nie tylko efekt: naturalne wychodnie granitu, bloki w różnych fazach obróbki i budowę dopasowaną do skały.'},
        {title:'Intiwatana i Roca Sagrada', text:'Dwa najbardziej rozpoznawalne punkty interpretacyjne wysokiej części miasta. Nazwy i funkcje są częściowo interpretacjami badaczy, więc patrzcie na formę i kontekst.'},
        {title:'Miasto jako całość', text:'Po królewskim Circuito 3 Ruta 2 daje pełniejszy przekrój: rolnictwo, przestrzenie ceremonialne, place, magazyny, mieszkania i system ruchu.'},
        {title:'Częściowa powtórka', text:'Espejos de Agua, dolny sektor i Templo del Cóndor mogą częściowo pokrywać się z waszym porannym przebiegiem. To nie wada — drugi raz łatwiej zauważyć detale.'}
      ],
      routes: [
        {
          id:'2a',
          name:'Ruta 2-A · Ruta diseñada',
          badge:'Najlepszy wybór przy tej samej godzinie',
          summary:'Najbardziej kompletny klasyczny spacer: wyższa platforma z pocztówkową panoramą, a potem niemal pełny przekrój przez ceremonialne i miejskie serce Machu Picchu.',
          mapUrl:'https://www.machupicchu.gob.pe/wp-content/uploads/2024/06/C2-R2A.pdf',
          quick:[
            ['Widok','wyższa platforma klasyczna'],
            ['Limit','maks. 2 h 30 min'],
            ['Wysiłek','umiarkowany; więcej podejścia na początku'],
            ['Największy zysk','panorama + Plaza de los Templos + Intiwatana']
          ],
          steps:[
            {id:'2a-entry', order:'01', name:'Wejście i podejście przez sektor rolniczy', time:'10–20 min', look:'Warstwy tarasów nie są dekoracją. Stabilizują zbocze, magazynują i odprowadzają wodę oraz tworzą kontrolowane wejście do llaqta.', photo:'Nie zatrzymujcie ruchu przy pierwszym widoku. Najlepszy kadr jest wyżej.'},
            {id:'2a-upper', order:'02', name:'Plataforma Superior — klasyczne zdjęcie', time:'10–20 min', look:'Zwróćcie uwagę na podział miasta: tarasy po lewej, gęsta strefa miejska po prawej, Waynapicchu jako dominanta i wąskie siodło terenu.', photo:'Najpierw szeroki poziomy kadr, potem pion z tarasami prowadzącymi wzrok ku Waynapicchu.'},
            {id:'2a-gate', order:'03', name:'Llaqta Punku i Foso Seco', time:'5–10 min', look:'Brama i sucha fosa zaznaczają przejście między sektorami. To kontrola ruchu, symboliczna granica i element organizacji przestrzeni.', photo:'Użyj murów i przejścia jako naturalnej ramy; nie blokuj wąskiego szlaku.'},
            {id:'2a-sun', order:'04', name:'Mirador del Templo del Sol', time:'5–10 min', look:'Półkolisty mur świątyni obejmuje naturalną skałę. Patrz na jakość obróbki i relację budowli z tarasem poniżej.', photo:'Kadr po skosie najlepiej pokazuje krzywiznę ściany.'},
            {id:'2a-quarry', order:'05', name:'Caos Granítico — kamieniołom', time:'10–15 min', look:'To warsztat w krajobrazie: wychodnie granitu, pęknięcia, bloki w trakcie oddzielania i ślady pracy. Miasto wyrasta z tej samej skały, na której stoi.', photo:'Szukaj kontrastu między nieregularną skałą a precyzyjnymi murami w tle.'},
            {id:'2a-temples', order:'06', name:'Plaza de los Templos', time:'10–15 min', look:'Templo Principal i Templo de las Tres Ventanas tworzą ceremonialny zespół. Duże bloki i staranna kamieniarka sygnalizują wysoką rangę.', photo:'Trzy okna fotografuj lekko z boku, aby było widać grubość muru i krajobraz za nimi.'},
            {id:'2a-inti', order:'07', name:'Pirámide del Intiwatana', time:'8–12 min', look:'Tarasowa „piramida” wynosi rzeźbiony kamień nad otoczenie. Nie sprowadzaj go do prostego zegara słonecznego — funkcja była zapewne szersza i ceremonialna.', photo:'Pokaż kamień razem z platformą i górami, nie jako oderwany obiekt.'},
            {id:'2a-sacred', order:'08', name:'Roca Sagrada', time:'5–10 min', look:'Ważniejszy od samego kształtu jest dialog skały z górskim horyzontem. Interpretacje „odwzorowania góry” traktujcie jako hipotezę, nie pewnik.', photo:'Szerzej: skała, mur i tło. Ciasny kadr usuwa cały sens miejsca.'},
            {id:'2a-east', order:'09', name:'Doce Vanos i Qolqas Orientales', time:'10–15 min', look:'Seria otworów, przejść i magazynowych przestrzeni pokazuje rytm architektury oraz logistyczne zaplecze miasta.', photo:'Powtarzalność vanos najlepiej wygląda pod lekkim kątem, jak rytm prowadzący w głąb.'},
            {id:'2a-mirrors', order:'10', name:'Conjunto Espejos de Agua', time:'5–10 min', look:'Dwie okrągłe misy są często łączone z obserwacją nieba, ale ich dokładna funkcja nie jest rozstrzygnięta. Patrz na wodę, odpływ i położenie w pomieszczeniu.', photo:'Nie dotykaj i nie nachylaj telefonu nad kamieniem; ujęcie z dopuszczonego przejścia.'},
            {id:'2a-condor', order:'11', name:'Templo del Cóndor i Plaza del Pisonay', time:'10–20 min', look:'Naturalne skały i obróbka tworzą formę kojarzoną z kondorem. Nazwa jest nowoczesną interpretacją. Plac pokazuje bardziej codzienny, społeczny wymiar miasta.', photo:'Najpierw całe założenie, dopiero potem detal „skrzydeł”.'},
            {id:'2a-exit', order:'12', name:'Reserva Arqueológica i wyjście', time:'10–15 min', look:'Nie cofajcie się. Podsumujcie trasę: od tarasów, przez centrum ceremonialne, do sektorów mieszkalnych i wyjścia.', photo:'Ostatni kadr tylko wtedy, gdy nie wymaga zatrzymania grupy ani ruchu pod prąd.'}
          ]
        },
        {
          id:'2b',
          name:'Ruta 2-B · Terraza Inferior',
          badge:'Najlepsza alternatywa, zwłaszcza o wcześniejszej godzinie',
          summary:'Trasa zaczyna się na niższej platformie widokowej, lecz po dojściu do Foso Seco wchodzi w niemal ten sam miejski rdzeń co 2-A. To nadal pełne klasyczne Machu Picchu.',
          mapUrl:'https://www.machupicchu.gob.pe/wp-content/uploads/2024/06/6-C2-R2B.pdf',
          quick:[
            ['Widok','dolna platforma klasyczna'],
            ['Limit','maks. 2 h 30 min'],
            ['Wysiłek','umiarkowany; odrobinę łagodniejszy start'],
            ['Największy zysk','prawie cały rdzeń miejski bez wyższej platformy']
          ],
          steps:[
            {id:'2b-entry', order:'01', name:'Wejście i dolny pas tarasów', time:'10–15 min', look:'Trasa szybciej prowadzi na niższy poziom sektora rolniczego. Widać konstrukcyjną rolę tarasów i ich powiązanie z drogą wejściową.', photo:'Użyj tarasów jako linii prowadzących, ale nie próbuj odtwarzać na siłę kadru z wyższej platformy.'},
            {id:'2b-lower', order:'02', name:'Plataforma Inferior — klasyczny widok', time:'10–15 min', look:'Perspektywa jest niższa i bliższa zabudowie. Dzięki temu miasto wygląda bardziej przestrzennie, a nie jak płaska pocztówka.', photo:'Szeroki kadr z Waynapicchu, drugi z mocniejszym pierwszym planem tarasów.'},
            {id:'2b-gate', order:'03', name:'Foso Seco — połączenie z rdzeniem trasy', time:'5–10 min', look:'Od tego punktu doświadczenie 2-B staje się bardzo podobne do 2-A. To ważniejsze niż różnica wysokości pierwszego zdjęcia.', photo:'Krótki kadr przejścia między rolniczym i miejskim charakterem stanowiska.'},
            {id:'2b-sun', order:'04', name:'Mirador del Templo del Sol', time:'5–10 min', look:'Obserwuj półkolisty mur, naturalną skałę i kontrolę widoku na świątynię z góry.', photo:'Po skosie, bez zoomowania wyłącznie na jeden kamień.'},
            {id:'2b-quarry', order:'05', name:'Caos Granítico — kamieniołom', time:'10–15 min', look:'Nieregularny teren jest świadectwem procesu budowy. Tu najłatwiej zrozumieć, że architektura nie została przywieziona na „pustą działkę”.', photo:'Zestaw surową skałę z gotowym murem w jednym kadrze.'},
            {id:'2b-temples', order:'06', name:'Plaza de los Templos', time:'10–15 min', look:'Templo Principal i Templo de las Tres Ventanas są centralnym punktem ceremonialnym. Porównaj ich kamieniarkę z prostszymi murami mieszkalnymi.', photo:'Trzy okna razem z otaczającą ścianą — nie tylko same otwory.'},
            {id:'2b-inti', order:'07', name:'Pirámide del Intiwatana', time:'8–12 min', look:'Położenie ponad placami i tarasami jest częścią znaczenia tego miejsca. Nazwa Intiwatana nie rozwiązuje automatycznie jego funkcji.', photo:'Kadr kontekstowy z platformą i górami.'},
            {id:'2b-sacred', order:'08', name:'Roca Sagrada', time:'5–10 min', look:'Zobacz, jak skała, mur i krajobraz tworzą jeden układ. Możliwe podobieństwo do sylwety gór pozostaje interpretacją.', photo:'Szeroko i z dystansu, zgodnie z kierunkiem ruchu.'},
            {id:'2b-east', order:'09', name:'Doce Vanos i Qolqas Orientales', time:'10–15 min', look:'To dobry moment, by spojrzeć na magazyny, ciągi przejść i rytm otworów zamiast skupiać się wyłącznie na świątyniach.', photo:'Powtarzalne otwory jako geometryczna sekwencja.'},
            {id:'2b-mirrors', order:'10', name:'Conjunto Espejos de Agua', time:'5–10 min', look:'Misy mogły mieć funkcję ceremonialną lub obserwacyjną, ale nie ma prostego dowodu na jedną odpowiedź. Najważniejszy jest ich kontekst architektoniczny.', photo:'Z wyznaczonego przejścia, bez dotykania kamienia.'},
            {id:'2b-condor', order:'11', name:'Templo del Cóndor i Plaza del Pisonay', time:'10–20 min', look:'Forma „kondora” powstaje dzięki naturalnej skale i obróbce. Plac przypomina, że Machu Picchu było zamieszkanym miejscem, nie tylko sanktuarium.', photo:'Najpierw cała kompozycja; detal dopiero jako drugi kadr.'},
            {id:'2b-exit', order:'12', name:'Reserva Arqueológica i wyjście', time:'10–15 min', look:'Zakończenie jest wspólne z 2-A. Sprawdźcie godzinę, nawodnienie i margines na autobus oraz pociąg.', photo:'Nie wracajcie pod prąd po pominięty kadr.'}
          ]
        }
      ],
      glossary: [
        ['Qolqas','magazyny; wentylowane budynki służące przechowywaniu zapasów'],
        ['Llaqta Punku','brama lub kontrolowane wejście do miasta'],
        ['Foso Seco','„sucha fosa”; granica i element podziału przestrzeni'],
        ['Phaqcha','fontanna lub punkt kontrolowanego przepływu wody'],
        ['Waka / huaca','miejsce, obiekt lub element krajobrazu o szczególnym znaczeniu sakralnym'],
        ['Vano','otwór architektoniczny: drzwiowy, okienny albo nisza'],
        ['Andenes','tarasy stabilizujące zbocze i wykorzystywane rolniczo lub konstrukcyjnie']
      ]
    },
    rules: [
      {id:'passport', text:'Oryginalny paszport każdego uczestnika'},
      {id:'ticket', text:'Bilet 3-A zapisany offline na co najmniej dwóch telefonach'},
      {id:'bag', text:'Plecak nie większy niż 40 × 35 × 20 cm'},
      {id:'water', text:'Woda w lekkiej butelce; jedzenie dopiero poza bramkami'},
      {id:'rain', text:'Lekka kurtka przeciwdeszczowa — nie parasol'},
      {id:'shoes', text:'Buty z przyczepną, miękką podeszwą'},
      {id:'camera', text:'Bez statywu, monopodu, selfie sticka i drona'},
      {id:'train', text:'Bilet powrotny i plan stacji sprawdzone poprzedniego wieczoru'}
    ],
    risk: [
      {level:'zielony', title:'Sucho i dobra widoczność', action:'Normalne spokojne tempo. Nadal nie fotografować podczas ruchu na stromych schodach.'},
      {level:'żółty', title:'Mokre schody, mgła lub duży tłok', action:'Większy odstęp, ręce wolne, mniej zdjęć i dłuższy czas zejścia. Pociąg 20:50 staje się oczywistym wyborem.'},
      {level:'czerwony', title:'Zamknięcie trasy lub decyzja obsługi', action:'Nie dyskutować z zabezpieczeniem. Realizować wskazany wariant zastępczy i zachować dokumentację komunikatu.'}
    ],
    prohibited: [
      'plecaki i torby większe niż 40 × 35 × 20 cm',
      'jedzenie, naczynia i alkohol',
      'parasole, laski bez uzasadnionej potrzeby, statywy, monopody i selfie sticki',
      'bieganie, skakanie, kładzenie się i schodzenie z wyznaczonej trasy',
      'dotykanie, przesuwanie lub opieranie się o elementy kamienne',
      'drony, palenie i wapowanie'
    ],
    sources: [
      {label:'Oficjalne obwody i trasy', url:'https://www.machupicchu.gob.pe/circuits-and-routes/?lang=en'},
      {label:'Oficjalna mapa PDF — Ruta 2-A', url:'https://www.machupicchu.gob.pe/wp-content/uploads/2024/06/C2-R2A.pdf'},
      {label:'Oficjalna mapa PDF — Ruta 2-B', url:'https://www.machupicchu.gob.pe/wp-content/uploads/2024/06/6-C2-R2B.pdf'},
      {label:'Opis nowych tras Ministerstwa Kultury', url:'https://www.gob.pe/institucion/culturacusco/noticias/965160-ministerio-de-cultura-implementa-nuevos-circuitos-para-visitar-machupicchu-a-partir-del-1-de-junio'},
      {label:'Oficjalny kodeks zachowania', url:'https://www.machupicchu.gob.pe/code-of-conduct/?lang=en'},
      {label:'Reotwarcie Waynapicchu 01.07.2026', url:'https://www.gob.pe/institucion/cultura/noticias/1412861-ministerio-de-cultura-anuncia-la-reapertura-de-la-montana-waynapicchu-desde-el-1-de-julio'},
      {label:'UNESCO — Historic Sanctuary', url:'https://whc.unesco.org/en/list/274/'},
      {label:'Licencja prawdziwego zdjęcia hero', url:'https://commons.wikimedia.org/wiki/File:Machu_Picchu_(Peru).jpg'}
    ]
  };

  const L = (pl, en, es) => ({ pl, en, es });
  const pointHistory = {
    entry: {
      title: L('Tarasy jako fundament miasta', 'Terraces as the city’s foundation', 'Terrazas como fundamento de la ciudad'),
      body: [
        L('Tarasy Machu Picchu nie były jedynie polami. Ich warstwy kamienia, żwiru, piasku i gleby stabilizowały strome zbocze oraz odprowadzały ogromne ilości wody podczas intensywnych opadów.', 'Machu Picchu’s terraces were not merely fields. Layers of stone, gravel, sand and soil stabilised the steep ridge and drained intense rainfall.', 'Las terrazas de Machu Picchu no eran solo campos. Capas de piedra, grava, arena y tierra estabilizaban la ladera y drenaban lluvias intensas.'),
        L('Bez tej niewidocznej infrastruktury monumentalna zabudowa nie mogłaby bezpiecznie funkcjonować. Wchodząc, patrzcie więc na przekrój zbocza, a nie wyłącznie na panoramę.', 'Without this hidden infrastructure the monumental architecture could not function safely. Read the slope before chasing the panorama.', 'Sin esta infraestructura oculta la arquitectura monumental no podría funcionar con seguridad. Leed la ladera antes de perseguir la panorámica.')
      ]
    },
    royal: {
      title: L('Dlaczego mówi się o sektorze królewskim', 'Why this is called the royal sector', 'Por qué se llama sector real'),
      body: [
        L('Precyzyjniejsza kamieniarka, kontrolowane wejścia i niewielkie zespoły pomieszczeń wskazują na wysoką rangę użytkowników. To jeden z argumentów za interpretacją Machu Picchu jako królewskiej posiadłości związanej z Pachacutecem.', 'Finer masonry, controlled entrances and compact room groups indicate high-status users. This supports the interpretation of Machu Picchu as a royal estate associated with Pachacuti.', 'La cantería fina, accesos controlados y pequeños conjuntos de recintos indican usuarios de alto rango. Esto apoya la interpretación de una propiedad real vinculada a Pachacútec.'),
        L('Nie oznacza to jednak, że całe stanowisko było prywatnym pałacem. Funkcje ceremonialne, administracyjne, rolnicze i usługowe współistniały w jednym złożonym organizmie.', 'It does not mean the entire site was a private palace. Ceremonial, administrative, agricultural and service functions coexisted.', 'No significa que todo el sitio fuera un palacio privado. Funciones ceremoniales, administrativas, agrícolas y de servicio coexistían.')
      ]
    },
    sun: {
      title: L('Świątynia Słońca i naturalna skała', 'Temple of the Sun and natural rock', 'Templo del Sol y roca natural'),
      body: [
        L('Półkolisty mur należy do najbardziej wyrafinowanej kamieniarki na stanowisku. Budowlę osadzono na naturalnej skale, pod którą znajduje się przestrzeń tradycyjnie nazywana Grobowcem Królewskim, choć jej dokładna funkcja pozostaje dyskutowana.', 'The curved wall is among the site’s finest masonry. It sits on natural rock above a chamber traditionally called the Royal Tomb, although its exact function remains debated.', 'El muro curvo pertenece a la cantería más fina. Se apoya sobre roca natural y una cámara llamada tradicionalmente Tumba Real, aunque su función exacta sigue debatida.'),
        L('Okna i orientacja budowli łączone są z obserwacją Słońca, lecz ostrożniej mówić o świadomym związku z cyklem słonecznym niż o prostym „obserwatorium” działającym jak współczesny instrument.', 'Its windows and orientation relate to the solar cycle, but it is safer to speak of deliberate solar relationships than a simple modern-style observatory.', 'Sus ventanas y orientación se relacionan con el ciclo solar, pero es más prudente hablar de una relación solar intencional que de un observatorio moderno.')
      ]
    },
    water: {
      title: L('Woda organizowała przestrzeń', 'Water organised the site', 'El agua organizaba el espacio'),
      body: [
        L('Źródło położone powyżej miasta zasilało kanał i serię kolejnych fontann. Układ wymagał dokładnego spadku, kontroli przepływu i stałego utrzymania.', 'A spring above the city fed a canal and a sequence of fountains. The system required careful gradient, flow control and maintenance.', 'Un manantial sobre la ciudad alimentaba un canal y una serie de fuentes. El sistema exigía pendiente precisa, control del flujo y mantenimiento.'),
        L('Dostęp do wody odzwierciedlał również organizację społeczną: najważniejsze zespoły otrzymywały ją wcześniej, zanim przepływała do niższych sektorów.', 'Access to water also reflected social organisation: high-status compounds received it before lower sectors.', 'El acceso al agua también reflejaba organización social: los conjuntos de mayor rango la recibían antes que los sectores inferiores.')
      ]
    },
    gate: {
      title: L('Z miasta na górski szlak', 'From city to mountain trail', 'De la ciudad al sendero de montaña'),
      body: [
        L('Waynapicchu góruje nad llaqta i jest integralną częścią kompozycji krajobrazowej. Inkaskie schody oraz niewielkie tarasy pokazują, że szczyt nie był wyłącznie naturalnym tłem.', 'Waynapicchu dominates the llaqta and forms part of its designed landscape. Inca stairs and small terraces show that the peak was more than a natural backdrop.', 'Waynapicchu domina la llaqta y forma parte de su paisaje diseñado. Escaleras incas y pequeñas terrazas muestran que la cumbre era más que un fondo natural.'),
        L('Dokładna funkcja zabudowy na górze nie jest pewna. Najbezpieczniej traktować ją jako przestrzeń o szczególnym znaczeniu, powiązaną z ruchem, obserwacją i rytuałem, bez udawania jednej ostatecznej odpowiedzi.', 'The exact function of its structures is uncertain. Treat it as a special space linked to movement, observation and ritual rather than forcing one final answer.', 'La función exacta de sus estructuras es incierta. Conviene verla como espacio especial ligado al movimiento, observación y ritual, sin imponer una respuesta única.')
      ]
    },
    climb: {
      title: L('Inkaska ścieżka na ekstremalnym zboczu', 'An Inca path on an extreme slope', 'Un camino inca en una ladera extrema'),
      body: [
        L('Schody wykorzystują naturalny kształt góry i miejscami są wcięte bezpośrednio w skałę. Ich obecność pokazuje, jak Inkowie prowadzili ruch przez teren, który z pozoru nie nadaje się do zabudowy.', 'The stairs exploit the mountain’s natural form and are sometimes cut directly into rock. They show how Inca builders channelled movement through apparently impossible terrain.', 'Las escaleras aprovechan la forma natural y a veces están talladas directamente en la roca. Muestran cómo los incas guiaban el movimiento por terreno aparentemente imposible.'),
        L('Dzisiejsze zabezpieczenia zmieniają doświadczenie, ale nie geometrię zbocza. To odcinek do przejścia spokojnie, a nie miejsce na filmowanie podczas ruchu.', 'Modern protection changes the experience but not the slope’s geometry. Walk calmly; do not film while moving.', 'Las protecciones modernas cambian la experiencia, no la geometría. Caminar con calma y no filmar en movimiento.')
      ]
    },
    summit: {
      title: L('Tarasy ponad llaqta', 'Terraces above the llaqta', 'Terrazas sobre la llaqta'),
      body: [
        L('Na górnych partiach Waynapicchu znajdują się tarasy i niewielkie konstrukcje wymagające ogromnego nakładu pracy. Ich położenie podkreśla znaczenie samej góry w inkaskim krajobrazie.', 'Upper Waynapicchu contains terraces and small structures that required extraordinary labour. Their location emphasises the mountain’s importance in the Inca landscape.', 'La parte alta contiene terrazas y pequeñas estructuras que exigieron enorme trabajo. Su ubicación subraya la importancia de la montaña en el paisaje inca.'),
        L('Widok pozwala odczytać całe założenie: grzbiet, sektor rolniczy, miejski rdzeń i zakole Urubamby. To najlepsze miejsce, aby zrozumieć wybór lokalizacji, nie tylko zrobić zdjęcie.', 'The view reveals the ridge, agricultural sector, urban core and Urubamba bend. Use it to understand the location, not merely for a photograph.', 'La vista permite leer la cresta, sector agrícola, núcleo urbano y curva del Urubamba. Sirve para comprender la ubicación, no solo para una foto.')
      ]
    },
    descent: {
      title: L('Zejście jest częścią historycznej drogi', 'The descent is part of the historic path', 'El descenso forma parte del camino histórico'),
      body: [
        L('Wąskie stopnie i wymuszone kierunki ruchu pokazują, że dostęp do szczytu był kontrolowany przez topografię. Nie był to szeroki trakt dla tłumu, lecz specjalistyczna ścieżka górska.', 'Narrow steps and constrained movement show that topography controlled access. This was not a broad public road but a specialised mountain path.', 'Los escalones estrechos y el movimiento limitado muestran un acceso controlado por la topografía. No era una vía amplia, sino un sendero especializado.'),
        L('Zmęczenie na zejściu jest dzisiaj największym praktycznym zagrożeniem. Historyczny kontekst nie zmienia podstawowej zasady: pełna koncentracja i żadnego telefonu w dłoni.', 'Fatigue on descent is the main practical hazard today. Historical context does not change the rule: full attention and no phone in hand.', 'La fatiga al bajar es hoy el principal riesgo. El contexto histórico no cambia la regla: atención completa y teléfono guardado.')
      ]
    },
    condor: {
      title: L('Świątynia Kondora — nazwa jest interpretacją', 'Temple of the Condor — the name is an interpretation', 'Templo del Cóndor: el nombre es una interpretación'),
      body: [
        L('Naturalne skały i obrobiony element na ziemi tworzą kompozycję przypominającą ptaka. Popularna nazwa pomaga ją zobaczyć, ale nie jest inkaskim podpisem ani pewnym dowodem funkcji.', 'Natural rock and a worked stone on the ground form a bird-like composition. The popular name helps us see it, but it is not an Inca label or proof of function.', 'La roca natural y una piedra trabajada forman una composición parecida a un ave. El nombre ayuda a verla, pero no es una etiqueta inca ni prueba de función.'),
        L('Ważniejsza jest metoda: inkascy projektanci wykorzystywali zastany głaz, zamiast zastępować go regularną budowlą. Granica między architekturą i krajobrazem pozostaje celowo nieostra.', 'The method matters more: designers incorporated existing rock rather than replacing it with regular construction. Architecture and landscape deliberately merge.', 'Importa más el método: los diseñadores incorporaron la roca existente en vez de sustituirla. Arquitectura y paisaje se fusionan deliberadamente.')
      ]
    },
    exit: {
      title: L('Machu Picchu po epoce Inków', 'Machu Picchu after the Inca period', 'Machu Picchu después de los incas'),
      body: [
        L('Stanowisko zostało opuszczone w okresie kryzysu państwa Inków i podboju hiszpańskiego, ale nie zniknęło z lokalnej wiedzy. Rolnicy mieszkali i pracowali w okolicy długo przed wizytą Hirama Binghama w 1911 roku.', 'The site was abandoned during the crisis of the Inca state and Spanish conquest, but it did not disappear from local knowledge. Farmers lived and worked nearby before Hiram Bingham’s 1911 visit.', 'El sitio fue abandonado durante la crisis inca y conquista española, pero no desapareció del conocimiento local. Agricultores vivían y trabajaban cerca antes de la visita de Hiram Bingham en 1911.'),
        L('Dzisiejszy obraz jest wynikiem wykopalisk, rekonstrukcji, usuwania roślinności i zarządzania turystyką. Oglądacie więc autentyczne ruiny, ale również ponad sto lat nowoczesnej prezentacji stanowiska.', 'Today’s image results from excavation, reconstruction, vegetation removal and tourism management. You see authentic ruins shaped by over a century of modern presentation.', 'La imagen actual resulta de excavación, reconstrucción, retirada de vegetación y gestión turística. Son ruinas auténticas moldeadas por más de un siglo de presentación moderna.')
      ]
    }
  };

  const route2History = {
    entry: pointHistory.entry,
    upper: { title:L('Klasyczny widok jest konstrukcją krajobrazu', 'The classic view is a constructed landscape', 'La vista clásica es un paisaje construido'), body:[L('Panorama działa dlatego, że tarasy, zabudowa i Waynapicchu układają się w czytelną całość. Ten obraz nie jest przypadkowym punktem fotograficznym, lecz efektem świadomego osadzenia miasta na grzbiecie.', 'The panorama works because terraces, buildings and Waynapicchu form a legible whole. It is not merely a photo point but the result of deliberate site planning.', 'La panorámica funciona porque terrazas, edificios y Waynapicchu forman un conjunto legible. No es solo un punto fotográfico, sino resultado de planificación deliberada.') ] },
    lower: { title:L('Niższa platforma pokazuje miasto bliżej', 'The lower platform brings the city closer', 'La plataforma inferior acerca la ciudad'), body:[L('Niższa perspektywa zmniejsza efekt pocztówki, ale lepiej pokazuje przestrzenność zabudowy i relację tarasów z miejskim rdzeniem.', 'The lower viewpoint is less postcard-like but better reveals the depth of the built environment and the relationship between terraces and urban core.', 'La perspectiva inferior es menos de postal, pero muestra mejor la profundidad del conjunto y relación entre terrazas y núcleo urbano.') ] },
    gate: { title:L('Foso Seco jako granica funkcjonalna', 'The Dry Moat as a functional boundary', 'El Foso Seco como límite funcional'), body:[L('Tak zwana sucha fosa oddzielała sektor rolniczy od zabudowy miejskiej. Nie była fosą obronną w europejskim sensie, lecz elementem podziału i odprowadzania wody.', 'The so-called Dry Moat separated the agricultural and urban sectors. It was not a European-style defensive moat but a boundary and drainage feature.', 'El llamado Foso Seco separaba sectores agrícola y urbano. No era foso defensivo europeo, sino límite y elemento de drenaje.') ] },
    sun: pointHistory.sun,
    quarry: { title:L('Kamieniołom wewnątrz miasta', 'A quarry inside the city', 'Una cantera dentro de la ciudad'), body:[L('Granit pozyskiwano bezpośrednio z wychodni na grzbiecie. Bloki w różnych fazach obróbki pokazują technikę klinów, uderzeń i stopniowego dopasowywania.', 'Granite was extracted from outcrops on the ridge. Blocks in different stages reveal wedging, hammering and gradual fitting.', 'El granito se extraía de afloramientos en la cresta. Bloques en distintas fases muestran cuñas, golpes y ajuste gradual.'),L('Obecność kamieniołomu przypomina, że Machu Picchu było placem budowy przez wiele lat i prawdopodobnie nigdy nie osiągnęło ostatecznie „ukończonego” stanu.', 'The quarry reminds us that Machu Picchu was a construction site for years and may never have reached a final finished state.', 'La cantera recuerda que Machu Picchu fue obra durante años y quizá nunca alcanzó un estado final terminado.') ] },
    temples: { title:L('Plaza de los Templos', 'Plaza of the Temples', 'Plaza de los Templos'), body:[L('Templo Principal i Templo de las Tres Ventanas tworzą jeden z najbardziej monumentalnych zespołów stanowiska. Skala bloków i jakość obróbki wskazują na znaczenie ceremonialne.', 'The Main Temple and Temple of the Three Windows form one of the site’s most monumental ensembles. Block scale and finish indicate ceremonial importance.', 'El Templo Principal y el de las Tres Ventanas forman uno de los conjuntos más monumentales. Escala y acabado indican importancia ceremonial.'),L('Trzy okna bywają łączone z inkaskimi mitami pochodzenia, ale takie interpretacje wymagają ostrożności. Pewne jest to, że okna kadrują światło i krajobraz.', 'The three windows are sometimes linked to Inca origin myths, but such interpretations require caution. They unquestionably frame light and landscape.', 'Las tres ventanas se vinculan a veces con mitos de origen, pero estas lecturas exigen cautela. Sin duda enmarcan luz y paisaje.') ] },
    inti: { title:L('Intiwatana — więcej niż zegar słoneczny', 'Intiwatana — more than a sundial', 'Intiwatana: más que un reloj solar'), body:[L('Rzeźbiony kamień na wyniesionej platformie był częścią ceremonialnego krajobrazu. Jego orientacje mają związki ze Słońcem i górami, lecz sprowadzanie go do prostego zegara jest nadmiernym uproszczeniem.', 'The carved stone on its elevated platform belonged to a ceremonial landscape. It relates to sun and mountains, but calling it a simple sundial is an oversimplification.', 'La piedra tallada en plataforma elevada pertenecía a un paisaje ceremonial. Se relaciona con sol y montañas, pero llamarla simple reloj solar es simplificar demasiado.') ] },
    sacred: { title:L('Roca Sagrada i święty krajobraz', 'Sacred Rock and sacred landscape', 'Roca Sagrada y paisaje sagrado'), body:[L('W inkaskiej kosmologii szczególne skały, źródła i góry mogły być wakami — miejscami lub bytami o znaczeniu sakralnym. Roca Sagrada należy oglądać razem z murem i horyzontem.', 'In Inca cosmology, distinctive rocks, springs and mountains could be wakas—places or beings of sacred significance. View the Sacred Rock together with wall and horizon.', 'En cosmología inca, rocas, manantiales y montañas podían ser wakas. La Roca Sagrada debe verse junto al muro y horizonte.'),L('Popularna sugestia, że jej kształt dokładnie odtwarza górę w tle, jest atrakcyjna, ale pozostaje interpretacją, nie rozstrzygniętym faktem.', 'The popular claim that it exactly mirrors the mountain behind is attractive but remains an interpretation, not settled fact.', 'La idea de que reproduce exactamente la montaña del fondo es atractiva, pero sigue siendo interpretación, no hecho probado.') ] },
    east: { title:L('Magazyny, przejścia i codzienna logistyka', 'Stores, passages and daily logistics', 'Almacenes, pasos y logística cotidiana'), body:[L('Nie wszystkie budynki były świątyniami. Qolqas, ciągi otworów i prostsza kamieniarka pokazują zaplecze magazynowe oraz organizację codziennego funkcjonowania.', 'Not every building was a temple. Qolqas, repeated openings and simpler masonry reveal storage and the logistics of daily life.', 'No todos los edificios eran templos. Qolqas, vanos repetidos y cantería sencilla muestran almacenamiento y logística cotidiana.') ] },
    mirrors: { title:L('Espejos de Agua — funkcja nie jest pewna', 'Water Mirrors — function remains uncertain', 'Espejos de Agua: función incierta'), body:[L('Dwie okrągłe misy mogły zbierać wodę i odbijać niebo, lecz brak podstaw, by pewnie nazwać je obserwatorium. Ich znaczenie wynika także z umieszczenia w kontrolowanej przestrzeni mieszkalno-ceremonialnej.', 'Two round basins could hold water and reflect the sky, but evidence does not justify calling them an observatory with certainty. Their controlled architectural setting also matters.', 'Dos cuencos podían contener agua y reflejar el cielo, pero no basta para llamarlos observatorio con certeza. También importa su contexto arquitectónico controlado.') ] },
    condor: pointHistory.condor,
    exit: pointHistory.exit
  };

  window.PERU_MACHU.route3.forEach(step => { if (pointHistory[step.id]) step.history = pointHistory[step.id]; });
  window.PERU_MACHU.route2.routes.forEach(route => route.steps.forEach(step => {
    const key = step.id.replace(/^2[ab]-/, '');
    if (route2History[key]) step.history = route2History[key];
  }));

})();
