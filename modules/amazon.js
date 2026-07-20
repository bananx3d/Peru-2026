(() => {
  window.PERU_AMAZON = {
    version: 1,
    days: [
      {date:'07.09', title:'Wejście do Amazonii', focus:'Transfer z Iquitos, briefing, pierwszy rekonesans łodzią i ustalenie priorytetów z prywatnym przewodnikiem.', checklist:['Wodoodporne pakowanie elektroniki','Repelent i długi rękaw pod ręką','Ustalić priorytet: fauna + teren + fotografia','Potwierdzić godzinę pobudki na świt']},
      {date:'08.09', title:'Świt, naczelne i ptaki', focus:'Pierwszy pełny dzień. Największą wartość daje wyjście przed pełnym światłem i spokojne nasłuchiwanie koron drzew.', checklist:['Wyjść przed świtem','Zabrać lornetkę / teleobiektyw','Zapisać pierwsze gatunki','Odpocząć w środku dnia']},
      {date:'09.09', title:'Las pieszo', focus:'Wolny marsz, tropy, owady, płazy, drzewa i zależności ekosystemu. Celem nie są kilometry.', checklist:['Sprawdzić buty i skarpety','Czołówka w plecaku','Nie dotykać roślin bez zgody przewodnika','Nagrywać dźwięki lasu']},
      {date:'10.09', title:'Woda i nocne życie', focus:'Ciche kanały, brzegi, kajmany, żaby i nocne ptaki. Na łodzi najważniejsze są stabilne ruchy i cisza.', checklist:['Pełna bateria czołówki','Worek wodoodporny','Ustawić aparat przed wejściem do łodzi','Nie świecić stale prosto w oczy zwierząt']},
      {date:'11.09', title:'Dzień elastyczny / camping', focus:'Program powinien reagować na pogodę, tropy i poziom wody. To dzień na najmocniejszy terenowy wariant, jeśli warunki pozwolą.', checklist:['Omówić wariant campingu','Zostawić suche ubranie w bazie','Sprawdzić apteczkę','Zabezpieczyć sprzęt przed nocną wilgocią']},
      {date:'12.09', title:'Ostatni poranek i powrót', focus:'Krótka finałowa obserwacja, porządkowanie notatek i transfer do Iquitos bez dokładania zbędnej presji.', checklist:['Ostatni obchód o świcie','Sprawdzić bungalow i łódź','Zebrać listę gatunków od przewodnika','Zabezpieczyć mokre rzeczy osobno']}
    ],
    habitats: [
      {name:'Las terra firme', text:'Wyżej położony las niezależny od sezonowych zalewów. Dobre miejsce na piesze wyjścia, naczelne, duże drzewa i tropy.'},
      {name:'Las zalewowy', text:'Środowisko zmieniające się wraz z poziomem wody. Wysoka woda otwiera kanały dla canoe, niska odsłania błoto i ślady.'},
      {name:'Brzegi i starorzecza', text:'Strefa ważna dla zimorodków, kajmanów, kapibar, wydr i wielu gatunków ryb.'},
      {name:'Korony drzew', text:'Największa część życia pozostaje wysoko nad głową. Obserwacja zaczyna się od dźwięku, ruchu gałęzi i spadających owoców.'}
    ],
    species: [
      {id:'pink-dolphin', name:'Delfin amazoński', group:'ssaki', chance:'umiarkowana', signal:'wydech, łuk grzbietu i cichy plusk', where:'szersze odcinki rzek i spokojniejsze zatoki', ethics:'Nie ścigać łodzią i nie wymuszać zbliżenia.', photo:'Krótka seria, szybki czas migawki, obserwacja powierzchni przed pojawieniem.'},
      {id:'giant-otter', name:'Wydra olbrzymia', group:'ssaki', chance:'niska–umiarkowana', signal:'głośne nawoływania i grupowe wynurzanie', where:'starorzecza, jeziora i spokojne brzegi', ethics:'Zachować duży dystans od rodzin i nor.', photo:'Śledzić kierunek ruchu, nie skupiać się na jednym punkcie.'},
      {id:'capybara', name:'Kapibara', group:'ssaki', chance:'umiarkowana', signal:'duża sylwetka na brzegu lub w wodzie', where:'otwarte brzegi i roślinność nadrzeczna', ethics:'Nie blokować drogi ucieczki do wody.', photo:'Najlepsze miękkie światło o świcie lub zmierzchu.'},
      {id:'red-howler', name:'Wyjec rudy', group:'naczelne', chance:'wysoka po głosie', signal:'niski, niosący się ryk o świcie', where:'wysokie korony drzew', ethics:'Nie odpowiadać głośnymi nagraniami i nie prowokować grupy.', photo:'Najpierw lokalizować ruch gałęzi, potem ustawiać teleobiektyw.'},
      {id:'squirrel-monkey', name:'Sajmiri', group:'naczelne', chance:'umiarkowana–wysoka', signal:'szybki ruch dużej grupy i szelest koron', where:'niższe i średnie partie lasu', ethics:'Nie dokarmiać.', photo:'Seria zdjęć i szeroki kadr pokazujący dynamikę grupy.'},
      {id:'pygmy-marmoset', name:'Marmozeta karłowata', group:'naczelne', chance:'niska–umiarkowana', signal:'bardzo mała sylwetka na pniu i cienkie nawoływania', where:'obrzeża lasu, pnie z wyciekami soków', ethics:'Cisza i brak flesza.', photo:'Stabilizacja, wysoka czułość i cierpliwość zamiast podchodzenia.'},
      {id:'woolly-monkey', name:'Wełniak', group:'naczelne', chance:'niska–umiarkowana', signal:'cięższy ruch w wysokich koronach', where:'dobrze zachowany las', ethics:'Nie używać playbacku.', photo:'Ustawiać ekspozycję na jasne niebo przebijające przez liście.'},
      {id:'sloth', name:'Leniwiec', group:'ssaki', chance:'umiarkowana', signal:'nieruchoma kula futra w rozwidleniu gałęzi', where:'korony drzew przy rzece i skraje lasu', ethics:'Nie potrząsać gałęzią i nie dotykać.', photo:'Szukaj czystego kąta z łodzi; lepszy jest spokojny kadr niż bliskość.'},
      {id:'jaguar', name:'Jaguar', group:'ssaki', chance:'bardzo niska', signal:'tropy, zadrapania, odchody; samo zwierzę rzadko', where:'spokojne brzegi i rozległy las', ethics:'Każde spotkanie podporządkować instrukcjom przewodnika.', photo:'Nie ruszać się gwałtownie; dokumentować bez pogoni.'},
      {id:'spectacled-caiman', name:'Kajman okularowy', group:'gady', chance:'wysoka nocą', signal:'odbicie oczu w świetle czołówki', where:'spokojna woda i brzegi po zmroku', ethics:'Nie podpływać zbyt blisko i nie próbować dotykać.', photo:'Krótko oświetlić, ustawić ostrość i ograniczyć czas świecenia.'},
      {id:'anaconda', name:'Anakonda zielona', group:'gady', chance:'bardzo niska', signal:'masywne ciało w wodzie lub przy brzegu', where:'bagna, starorzecza i gęsta roślinność wodna', ethics:'Nie schodzić z łodzi bez wyraźnej decyzji przewodnika.', photo:'Dystans i bezpieczeństwo są ważniejsze od kadru.'},
      {id:'emerald-boa', name:'Boa szmaragdowy', group:'gady', chance:'niska', signal:'zielone ciało zwinięte na gałęzi', where:'roślinność nad wodą i las nocą', ethics:'Bez dotykania i flesza z bliska.', photo:'Czołówka odbita od liści daje łagodniejsze światło.'},
      {id:'hoatzin', name:'Hoacyn', group:'ptaki', chance:'umiarkowana–wysoka', signal:'charakterystyczna czubata sylwetka i ochrypłe głosy', where:'zakrzaczone brzegi i roślinność nad wodą', ethics:'Nie podpływać wprost do gniazd.', photo:'Łódź wyłączyć wcześniej i podejść dryfem.'},
      {id:'macaw', name:'Ara', group:'ptaki', chance:'umiarkowana', signal:'głośny krzyk i para lecąca wysoko', where:'korony drzew, przeloty nad rzeką', ethics:'Nie używać głośnego playbacku.', photo:'Szeroki kadr z krajobrazem często działa lepiej niż ciasne zbliżenie.'},
      {id:'toucan', name:'Tukan', group:'ptaki', chance:'umiarkowana', signal:'duży dziób i skaczący ruch w koronie', where:'wysokie drzewa i obrzeża lasu', ethics:'Nie płoszyć dla lepszej pozycji.', photo:'Kompensacja ekspozycji na tle jasnego nieba.'},
      {id:'great-potoo', name:'Puchacz wielki / potoo', group:'ptaki', chance:'niska', signal:'pionowa sylwetka udająca złamany konar', where:'suche gałęzie i nocne stanowiska', ethics:'Nie świecić długo w oczy.', photo:'Szukaj profilu i otoczenia pokazującego kamuflaż.'},
      {id:'kingfisher', name:'Zimorodek amazoński', group:'ptaki', chance:'wysoka', signal:'szybki lot nisko nad wodą i siadanie na gałęzi', where:'brzegi rzek i kanały', ethics:'Nie podpływać wielokrotnie pod tę samą czatownię.', photo:'Szybki AF i krótki czas migawki.'},
      {id:'piranha', name:'Pirania', group:'ryby', chance:'wysoka przy połowie', signal:'zwykle niewidoczna bez łowienia', where:'spokojniejsze wody i zatoki', ethics:'Traktować jako element ekosystemu, nie potwora z filmu.', photo:'Zdjęcie szybko i delikatnie, zgodnie z praktyką przewodnika.'},
      {id:'bullet-ant', name:'Mrówka pociskowa', group:'bezkręgowce', chance:'umiarkowana', signal:'duża samotna mrówka na pniu lub ścieżce', where:'pnie, podstawa drzew, leśne ścieżki', ethics:'Nie dotykać i nie prowokować.', photo:'Makro tylko z bezpiecznej odległości.'},
      {id:'poison-frog', name:'Drzewołaz / barwna żaba', group:'płazy', chance:'umiarkowana po deszczu', signal:'mała intensywnie ubarwiona sylwetka w ściółce', where:'wilgotna ściółka i okolice strumieni', ethics:'Nie dotykać gołą ręką.', photo:'Niski punkt widzenia bez niszczenia roślinności.'}
    ],
    fieldRules: [
      'Kiedy przewodnik zatrzymuje łódź lub marsz, przestańcie mówić i obserwujcie kierunek jego wzroku.',
      'Nie oceniajcie dnia liczbą gatunków. Jakość obserwacji jest ważniejsza niż katalogowe odhaczanie.',
      'Na pieszym wyjściu patrzcie również pod nogi, na pnie i na wysokość kolan.',
      'Każdego wieczoru zapisujcie trzy rzeczy: co widzieliście, gdzie i o jakiej porze.',
      'Zwierzę oznaczajcie jako widziane dopiero wtedy, gdy rozpoznanie potwierdzi przewodnik.'
    ]
  };
})();
