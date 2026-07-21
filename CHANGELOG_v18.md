# CHANGELOG v18 — Day Briefs + Machu Deep Clean

## Cel

Usunięcie pozostałego chaosu w planie i module Machu Picchu oraz ograniczenie dominacji fotografii.

## Plan wyprawy

- każdy z 23 dni otrzymał osobną, klikalną kartę;
- główna lista dni została uproszczona do krótkiego indeksu;
- każda karta dnia zawiera rozwinięty przebieg, nocleg, transport, status i praktyczne wskazówki;
- każdy dzień ma rozwijany rys historyczny;
- karty prowadzą do właściwego modułu operacyjnego, długiego rozdziału i Journalu;
- nowa warstwa treści znajduje się w `day-details.js` i działa offline.

## Machu Picchu

- jeden długi ekran zastąpiono pięcioma widokami: dzień, 3-A, 2-A/2-B, historia i zasady;
- Ruta 3-A otrzymała rozwinięte opisy wszystkich etapów;
- punkty Rut 2-A i 2-B otrzymały rozwijany kontekst historyczny;
- oddzielono informacje operacyjne od historii i zasad;
- zachowano postęp checklist, etapów, notatki i rzeczywiste godziny;
- oficjalne oznaczenia tras pozostają niezmienione.

## Fotografie

- fotografie osadzone w treści zostały zmniejszone;
- miniatury przy punktach tras mają teraz pomocniczy, a nie dominujący charakter;
- galerie są gęstsze i zajmują mniej wysokości;
- wysokość dużych hero w Limie, Cusco i Ollantaytambo została ograniczona;
- usunięto nieprecyzyjne przypisania fotografii do punktów Machu i Ollantaytambo;
- dokładny punkt bez pasującej fotografii pozostaje bez zdjęcia;
- nie dodano obrazów AI.

## Techniczne

- wersja aplikacji: `v18`;
- build: `Day Briefs · Machu Focus`;
- nowy cache service workera: `peru-2026-v18-day-briefs-machu`;
- `day-details.js` dodano do plików CORE;
- klucze localStorage i format danych użytkownika zostały zachowane;
- automatyczny audyt rozszerzono do 37 tras i kontroli kart wszystkich dni.
