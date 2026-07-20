# v11 — Machu Picchu Complete + Wildlife Tracker

## Machu Picchu Complete
- całkowicie przebudowany ekran `Machu Picchu Complete`,
- pewny bilet Ruta 3-A Waynapicchu 20.09.2026 o 07:00,
- operacyjna oś całego dnia od pobudki do pociągu,
- możliwość zapisania rzeczywistych godzin wejścia, szczytu, wyjść i dotarcia na stację,
- 10-etapowy przewodnik po Rucie 3-A z sekcjami „na co patrzeć” i „jak zrobić zdjęcie”,
- lokalny tracker przejścia trasy,
- sześć kluczowych sposobów czytania stanowiska: kamieniarka, woda, skała, krajobraz, życie i ruch jednokierunkowy,
- osobne centrum operacyjne zakupu Ruty 2 z priorytetem godzin,
- checklista dokumentów, bagażu i sprzętu,
- oficjalne zakazy w skróconej formie,
- warianty bezpieczeństwa zależne od pogody i decyzji obsługi,
- informacja o ponownym otwarciu Waynapicchu od 1 lipca 2026 po pracach konserwacyjnych,
- eksport lokalnego zapisu Machu do JSON.

## Wildlife Tracker
- nowa osobna pozycja w głównej nawigacji,
- widziane / niewidziane dla wszystkich gatunków z modułu Amazonii,
- migracja wcześniejszych oznaczeń „widziane” z Amazonia Field Module,
- każde spotkanie zapisuje datę, godzinę, miejsce, liczbę osobników, pewność identyfikacji i notatkę,
- opcjonalna fotografia jest automatycznie kompresowana do lekkiej miniatury,
- statystyki gatunków, spotkań, osobników i grup,
- licznik spotkań i ostatnia obserwacja na karcie każdego gatunku,
- filtrowanie po nazwie, grupie oraz statusie widziane/niewidziane,
- możliwość dodania własnego gatunku spoza listy,
- dziennik wszystkich spotkań z możliwością usuwania wpisów,
- eksport i import kompletnego trackera w JSON,
- możliwość pełnego wyczyszczenia danych po potwierdzeniu.

## Techniczne
- nowe pliki `modules/machu.js` i `modules/wildlife.js`,
- nowa trasa `#/wildlife`,
- cache PWA podniesiony do `peru-2026-v11-machu-wildlife`,
- zaktualizowane `index.html`, manifest, README i style responsywne,
- dane poprzednich modułów pozostają w dotychczasowych kluczach `localStorage`.

## Zdjęcia
W v11 nie dodano obrazów generowanych przez AI. Hero Machu Picchu korzysta z istniejącej prawdziwej fotografii Wikimedia Commons. Zdjęcia dodawane przez użytkownika do Wildlife Trackera pozostają lokalnie na jego urządzeniu jako skompresowane miniatury.
