# Peru 2026 Expedition Companion — v17 UX Rebuild

Prywatna, offline-first aplikacja PWA przygotowana dokładnie pod wyprawę Kuby, Weroniki i Daniela do Peru we wrześniu 2026.

## Najważniejsza zmiana v17

Wersja v17 nie dodaje nowych modułów. Porządkuje istniejącą aplikację tak, aby potrzebna informacja była osiągalna maksymalnie w dwóch krokach.

Główna nawigacja ma teraz tylko pięć pozycji:

1. **Start** — aktualny lub najbliższy dzień, stan przygotowań i skróty;
2. **Plan** — cała wyprawa dzień po dniu;
3. **Przewodnik** — Lima, Amazonia, Cusco, Sacred Valley, Ollantaytambo i Machu Picchu w jednym miejscu;
4. **Wildlife** — atlas i tracker obserwacji;
5. **Więcej** — rezerwacje, checklisty, płatności, Journal, pakowanie, Emergency, słowniczek, zdjęcia, backup i ustawienia.

Na iPhonie te pięć pozycji znajduje się w stałym dolnym pasku. Na komputerze odpowiada im uproszczony pasek boczny.

## Co zawiera aplikacja

- Mission Control i plan 04–26.09.2026;
- rezerwacje, zadania, płatności i pakowanie;
- Expedition Journal;
- Amazonia Field Module i Wildlife Tracker;
- moduły Limy, Cusco, Ollantaytambo i Machu Picchu;
- Sacred Valley oraz długie rozdziały historyczne;
- Machu Picchu: Ruta 3-A Waynapicchu oraz dokładne Ruty 2-A i 2-B;
- 68 prawdziwych fotografii przypisanych do zwierząt i punktów trasy;
- pełny backup/import danych lokalnych;
- panel diagnostyczny i pakiet zdjęć offline;
- interfejs **polski / English / español**;
- słowniczek podróżny z 81 zwrotami w 9 kategoriach.

## Nowy ekran Start

Ekran startowy pokazuje:

- liczbę dni do wyjazdu albo aktualny dzień wyprawy;
- najbliższy etap z noclegiem i transportem;
- status przygotowań;
- najbliższe zadanie do zamknięcia;
- szybkie wejścia do przewodnika, Wildlife, słowniczka i Emergency;
- skrót do rezerwacji i checklist.

## Nowy Przewodnik

Wszystkie miejsca są zebrane w jednym hubie i ułożone zgodnie z trasą:

- Lima;
- Amazonia i Iquitos;
- Cusco;
- Sacred Valley;
- Ollantaytambo;
- Machu Picchu.

Każda karta prowadzi bezpośrednio do modułu praktycznego. Dłuższe teksty historyczne pozostają niżej jako osobna sekcja, zamiast mieszać się z operacyjną nawigacją.

## Ekran Więcej

Funkcje pomocnicze zostały pogrupowane:

### Przed wyjazdem

- Rezerwacje;
- Checklisty;
- Płatności;
- Pakowanie.

### Podczas podróży

- Journal;
- Słowniczek;
- Emergency.

### Aplikacja i dane

- Zdjęcia;
- Offline, backup, aktualizacje i język.

## Języki

Język można zmienić:

- na komputerze w dolnej części paska bocznego;
- na telefonie w ekranie **Więcej**;
- w ekranie **Offline, kopia i diagnostyka**.

Wybrany język jest zapisywany lokalnie i działa offline.

## Zdjęcia i zasada zero AI

Nie użyto generatora obrazów. Katalog odwołuje się do fotografii z Wikimedia Commons oraz oficjalnych fotografii Curassow używanych za zgodą operatora. Każdy wpis prowadzi do strony źródłowej z informacją o autorze i licencji.

Zdjęcia nie są fizycznie w ZIP-ie. Po publikacji:

1. Otwórz aplikację w Safari przy Wi‑Fi.
2. Wejdź w **Więcej → Offline, kopia i język**.
3. Wybierz **Pobierz / uzupełnij**.
4. Przed podróżą sprawdź licznik zapisanych zdjęć.

## Instalacja na iPhonie

1. Otwórz stronę GitHub Pages w Safari.
2. Naciśnij **Udostępnij**.
3. Wybierz **Dodaj do ekranu początkowego**.
4. Uruchamiaj aplikację z utworzonej ikony.

## Backup

Wybierz **Więcej → Offline, kopia i język → Eksportuj pełny backup**. Plik JSON zawiera język, checklisty, Journal, obserwacje zwierząt i zapisy wszystkich modułów.

## GitHub Pages

Rozpakuj ZIP i wgraj całą zawartość katalogu głównego do repozytorium. `index.html` musi leżeć w katalogu głównym. Po podmianie plików otwórz aplikację i użyj funkcji sprawdzania aktualizacji albo odśwież stronę.

## Prywatność

Publiczny build nie zawiera kodów rezerwacji, dokładnych adresów prywatnych apartamentów, numeru telefonu Martina ani dokładnych kwot wpłat. Bezpośredni link do prywatnego sejfu Notion pozostaje usunięty.

## Testy

Raporty najnowszego wydania:

- `CHANGELOG_v17.md`;
- `UX_AUDIT_v17.md`;
- `QA_REPORT_v17.md`;
- `I18N_AUDIT_v17.md`;
- `MEDIA_AUDIT_v17.md`.

Automatyczny audyt:

```bash
node qa/audit.js
```

Audyt renderuje wszystkie trasy w środowisku testowym i sprawdza strukturę aplikacji. Nie zastępuje fizycznego testu dotykowego w Safari na konkretnym iPhonie.
