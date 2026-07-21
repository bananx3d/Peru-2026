# CHANGELOG — v16 Multilingual + Offline Phrasebook

## Dodano

- globalny system i18n dla `PL`, `EN` i `ES`;
- przełącznik języka w topbarze i ustawieniach;
- trwały zapis języka pod kluczem `peru2026_language`;
- tłumaczenia interfejsu, przewodników, modułów terenowych, trackerów, alertów i komunikatów;
- obsługę tłumaczenia tekstów z ikonami, opisów złożonych i alternatywnych tekstów fotografii;
- osobny moduł `phrasebook.js`;
- 81 zwrotów w 9 kategoriach;
- wyszukiwanie słowniczka po wszystkich trzech językach;
- filtry kategorii;
- duży tryb „Pokaż mieszkańcowi”;
- kopiowanie hiszpańskiego zwrotu;
- odtwarzanie hiszpańskiej wymowy przez `SpeechSynthesis`;
- nowe style mobilne słowniczka, modalu i przełączników języka;
- język i słowniczek do service workera oraz trybu offline.

## Zmieniono

- numer wydania na v16;
- cache główny na `peru-2026-v16-i18n-phrasebook`;
- raport diagnostyczny z 27 do 28 tras;
- opis stanu wydania przewodnika;
- manifest i metadane strony;
- README i dokumentację instalacji.

## Zachowano

- wszystkie dane i funkcje v15;
- dotychczasowe klucze `localStorage`;
- stały cache zdjęć między wydaniami;
- migrację wcześniejszego pakietu zdjęć;
- politykę zero AI;
- brak danych wrażliwych w publicznym buildzie.

## Ograniczenia

- wymowa zależy od głosu dostępnego w przeglądarce/telefonie;
- nazw własnych, kodów tras, nazw restauracji i treści wpisywanych przez użytkownika nie tłumaczy się automatycznie;
- nie wykonano fizycznego testu na konkretnym iPhonie.
