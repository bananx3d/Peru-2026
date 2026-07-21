# UX AUDIT v17

## Problem v16

Wszystkie moduły były widoczne jednocześnie w głównym menu. Użytkownik musiał pamiętać, czy informacja znajduje się w module miasta, rozdziale przewodnika, trackerze, zdjęciach, ustawieniach czy jednej z checklist.

## Nowa architektura

### Poziom 1 — pięć stałych miejsc

1. Start
2. Plan
3. Przewodnik
4. Wildlife
5. Więcej

### Poziom 2 — kontekst

- Przewodnik grupuje wszystkie miejsca i prowadzi do modułów terenowych;
- Więcej grupuje wszystkie narzędzia organizacyjne;
- podmoduły pokazują kontekstowy powrót do swojego huba.

## Zasada dwóch kroków

Przykłady:

- Machu Picchu: `Przewodnik → Machu Picchu`;
- Cusco: `Przewodnik → Cusco`;
- bilety i noclegi: `Więcej → Rezerwacje`;
- słowniczek: `Więcej → Słowniczek`, a dodatkowo jeden skrót ze Startu;
- Emergency: `Więcej → Emergency`, a dodatkowo jeden skrót ze Startu;
- backup: `Więcej → Offline, kopia i język`;
- cały plan: bezpośrednio przez stałą kartę Plan.

## Mobilność

- pięć równych pozycji w dolnym pasku;
- brak menu hamburgerowego;
- duże pola dotykowe;
- obsługa safe-area iPhone’a;
- najważniejsze akcje znajdują się w dolnej części kart;
- ekran Start mieści kluczowe informacje bez przeglądania katalogu modułów.

## Zachowanie kompatybilności

Stare adresy hash, takie jak `#/machu`, `#/lima`, `#/phrases` lub `#/settings`, nadal działają. Zmiana dotyczy sposobu odnajdywania funkcji, a nie usuwania modułów.
