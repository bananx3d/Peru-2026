# I18N AUDIT v18

## Zachowany system

- polski — język domyślny;
- English;
- español;
- wybór języka zapisuje się lokalnie i jest objęty backupem.

## Nowa treść

Warstwa `day-details.js` oraz nowe rozwijane opisy punktów Machu korzystają ze struktury PL / EN / ES. Automatyczny audyt rekurencyjnie sprawdza, czy każdy nowy obiekt lokalizowany zawiera wszystkie trzy wersje.

## Wynik

- słownik EN: 2136 wpisów;
- słownik ES: 2136 wpisów;
- słowniczek: 81/81 zwrotów w PL / EN / ES;
- nowe obiekty lokalizowane v18: kompletne w trzech językach;
- audit: passed.

Nazwy własne, oznaczenia tras i dane wpisane przez użytkownika nie są automatycznie tłumaczone.
