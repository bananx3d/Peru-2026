# Peru 2026 Expedition Command — v15 Stable

Prywatna, offline-first aplikacja PWA przygotowana dokładnie pod wyprawę Kuby, Weroniki i Daniela do Peru we wrześniu 2026.

## Co zawiera

- Mission Control i plan 04–26.09.2026,
- rezerwacje, zadania, płatności i pakowanie,
- Expedition Journal,
- Amazonia Field Module i Wildlife Tracker,
- Cusco, Sacred Valley, Ollantaytambo i Lima,
- Machu Picchu: Ruta 3-A Waynapicchu oraz dokładne Ruty 2-A i 2-B,
- długie rozdziały historyczne,
- katalog fotografii dokumentalnych z przypisaniem do zwierząt i punktów trasy,
- pełny backup/import wszystkich danych lokalnych,
- panel diagnostyczny i pakiet zdjęć offline.

## Najważniejsze zmiany v15

- poprawiona obsługa offline i aktualizacji service workera;
- jeden stały cache zdjęć, zachowywany między wydaniami;
- migracja wcześniejszego pakietu zdjęć v14;
- pełny eksport/import wszystkich danych aplikacji;
- ekran „Offline, kopia i diagnostyka”;
- mobilny dolny pasek szybkiej nawigacji na iPhonie;
- poprawione focus states, touch targets i safe-area;
- czytelny fallback, gdy fotografia nie jest dostępna;
- usunięty bezpośredni link do prywatnego Notion z publicznego builda;
- usunięte nieaktualne komunikaty o „następnym etapie”;
- naprawione brakujące zmienne CSS warstwy zdjęciowej.

## Zdjęcia i zasada zero AI

Nie użyto generatora obrazów. Katalog odwołuje się do materiałów opisanych jako fotografie na Wikimedia Commons oraz do oficjalnych fotografii Curassow używanych za zgodą operatora. Każdy wpis prowadzi do strony źródłowej z autorem i licencją. Aplikacja dodatkowo kontroluje domenę, typ wpisu, flagę `ai: false`, unikalność identyfikatora i przypisanie do miejsca/gatunku.

Zdjęcia nie są fizycznie w ZIP-ie. Po publikacji:

1. Otwórz aplikację w Safari przy Wi‑Fi.
2. Wejdź w **Offline, kopia i diagnostyka**.
3. Wybierz **Pobierz / uzupełnij**.
4. Przed podróżą sprawdź licznik zapisanych zdjęć.

## Instalacja na iPhonie

1. Otwórz stronę GitHub Pages w Safari.
2. Naciśnij **Udostępnij**.
3. Wybierz **Dodaj do ekranu początkowego**.
4. Uruchamiaj aplikację z utworzonej ikony.

## Backup

W panelu diagnostycznym wybierz **Eksportuj pełny backup**. Plik JSON zawiera checklisty, Journal, obserwacje zwierząt i zapisy wszystkich modułów. Zachowaj go w iCloud Drive przed aktualizacją telefonu albo czyszczeniem danych Safari.

## GitHub Pages

Rozpakuj ZIP i wgraj zawartość folderu głównego do repozytorium. `index.html` musi leżeć w katalogu głównym. GitHub Pages powinien publikować repo przez HTTPS.

## Prywatność

Publiczny build nie zawiera kodów rezerwacji, dokładnych adresów, numeru telefonu Martina ani dokładnych kwot. Bezpośredni link do prywatnego sejfu Notion został usunięty z publicznej wersji.

## Testy

Raport znajduje się w `QA_REPORT_v15.md`. Automatyczny test można uruchomić poleceniem:

```bash
node qa/audit.js
```
