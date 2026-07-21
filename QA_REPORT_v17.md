# QA REPORT v17 — UX Rebuild

## Zakres

Kontrola wersji porządkującej nawigację i architekturę informacji bez zmiany danych wyprawy.

## Wyniki automatyczne

- składnia JavaScript: **15/15 plików poprawnych**;
- manifest PWA: **poprawny JSON**;
- trasy aplikacji: **29/29 wyrenderowanych** w środowisku testowym;
- główna nawigacja: **5/5 pozycji** na komputerze;
- dolna nawigacja mobilna: **5/5 pozycji**;
- hub Przewodnika: **6/6 głównych miejsc**;
- hub Więcej: **9/9 narzędzi**, pogrupowanych w trzy sekcje;
- lokalizacja nowych ekranów: sprawdzono PL, EN i ES;
- zdjęcia: **68 wpisów**;
- zwierzęta ze zdjęciami: **20/20**;
- strukturalne pokrycie mediów: **100/100**;
- słowniczek: **81 zwrotów / 9 kategorii**;
- słowniki tłumaczeń: **2136 EN / 2136 ES**;
- zmienne CSS: brak niezdefiniowanych odwołań;
- service worker: lista CORE i wersja v17 poprawne;
- kolejność skryptów: poprawna;
- kontrola prywatności: sześć wzorców danych wrażliwych, brak trafień.

## Zachowanie danych

Zmiana UX nie modyfikuje kluczy zapisów istniejących modułów. Zachowane pozostają:

- Journal;
- checklisty;
- Wildlife Tracker;
- obserwacje Amazonii;
- zapisy Machu Picchu;
- dane Limy, Cusco i Ollantaytambo;
- język;
- stan pakietu zdjęć offline.

Pełny backup ma oznaczenie schematu 17. Import nie wymaga usuwania zapisów v16.

## Ograniczenie

Nie wykonano fizycznego testu dotykowego w Safari na konkretnym iPhonie. Środowisko automatyczne zweryfikowało renderowanie tras, strukturę HTML generowaną przez aplikację, składnię, nawigację, PWA, lokalizację i integralność danych statycznych.
