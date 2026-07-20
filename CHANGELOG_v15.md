# Changelog v15 — Stability & iPhone Polish

## Stabilność
- audyt wszystkich skryptów JavaScript;
- test renderowania 27 tras aplikacji;
- nowa strategia service workera: network-first dla nawigacji, cache-first dla rdzenia i cache zdjęć;
- aktualizacja aplikacji z poziomu panelu diagnostycznego;
- zachowanie cache zdjęć między kolejnymi wydaniami.

## Dane
- pełny backup/import wszystkich kluczy `peru2026_*`;
- reset wyłącznie danych tej aplikacji;
- migracja stanu oraz cache pakietu zdjęć v14;
- licznik rozmiaru danych i zapisanych fotografii.

## iPhone / UX
- dolny pasek szybkiej nawigacji;
- obsługa safe-area;
- większe pola dotykowe;
- widoczne focus states;
- wskaźnik online/offline;
- lepszy komunikat zastępczy dla niedostępnych zdjęć.

## Prywatność i media
- usunięty bezpośredni adres prywatnego Notion z publicznego builda;
- kontrola dozwolonych domen źródeł zdjęć;
- kontrola unikalności identyfikatorów i kompletności przypisań;
- zero celowo użytych obrazów generowanych przez AI.
