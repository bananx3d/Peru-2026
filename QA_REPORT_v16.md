# QA REPORT — Peru 2026 v16 Multilingual

## Wynik końcowy

**AUDIT PASSED**

## Testy automatyczne

- 28/28 tras aplikacji wyrenderowanych bez wyjątku;
- wszystkie pliki JavaScript przechodzą kontrolę składni;
- `index.html` ładuje `i18n.js` i `phrasebook.js` przed `app.js`;
- service worker zawiera wszystkie wymagane pliki v16;
- manifest ma istniejące ikony;
- 68 fotografii przechodzi kontrolę strukturalną;
- 20/20 gatunków ma pokrycie fotograficzne;
- 100/100 wymaganych celów medialnych ma przypisanie;
- 81/81 zwrotów ma wersję PL, EN i ES;
- 9/9 kategorii słowniczka jest poprawnych;
- 2 136 wpisów tłumaczeń EN i 2 136 ES jest niepustych;
- sprawdzono wymagane selektory CSS dla języków i słowniczka;
- sprawdzono kolejność skryptów;
- sprawdzono kluczowe wzorce danych wrażliwych;
- sprawdzono integralność service workera i manifestu.

## Testy zachowania

Zweryfikowano w kodzie i renderowaniu automatycznym:

- zmianę języka i ponowne renderowanie aplikacji;
- trwały zapis języka;
- obecność 28. trasy `phrases`;
- wyszukiwanie po PL/EN/ES;
- filtrowanie kategorii;
- otwieranie i zamykanie trybu „Pokaż mieszkańcowi”;
- kopiowanie wersji hiszpańskiej;
- przygotowanie hiszpańskiego komunikatu dla `SpeechSynthesis`;
- objęcie nowych modułów przez cache offline;
- zachowanie kluczy i schematu pełnego backupu.

## Prywatność

Nie wykryto:

- kodów Airbnb w znanym formacie,
- numeru telefonu Martina,
- dokładnych kwot salda/depozytu,
- bezpośredniego prywatnego linku Notion.

## Ograniczenia

Nie wykonano fizycznego testu na prawdziwym iPhonie ani dotykowego testu Safari. Automatyczny test przeglądarkowy w tym środowisku był ograniczony polityką uruchomieniową, dlatego raport opiera się na kontroli składni, renderowaniu wszystkich tras w izolowanym środowisku DOM, audycie struktur, słowników, CSS, manifestu i service workera.

Po publikacji na GitHub Pages należy wykonać krótki test ręczny:

1. przełączyć PL → EN → ES;
2. zamknąć i ponownie otworzyć PWA;
3. wyszukać zwrot w słowniczku;
4. otworzyć „Pokaż mieszkańcowi”;
5. sprawdzić kopiowanie i głos;
6. uruchomić aplikację w trybie samolotowym;
7. sprawdzić zachowanie własnych notatek i Wildlife Trackera.
