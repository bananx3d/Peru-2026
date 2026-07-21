# Peru 2026 Expedition Companion — v18 Day Briefs + Machu Deep Clean

Offline-first aplikacja PWA przygotowana dokładnie pod wyprawę Kuby, Weroniki i Daniela do Peru we wrześniu 2026.

## Co naprawia v18

Wersja v17 uporządkowała główną nawigację, ale wewnątrz planu i modułu Machu Picchu nadal było za dużo treści na jednym ekranie, za mało kontekstu oraz zbyt duże fotografie. v18 przebudowuje właśnie te miejsca.

### Plan dzień po dniu

Każdy z **23 dni wyprawy** ma teraz osobną kartę otwieraną po kliknięciu. Karta zawiera:

- rozwinięty przebieg dnia;
- transport, nocleg i aktualny status;
- praktyczne rzeczy do zapamiętania;
- rozwijany **rys historyczny**;
- link do odpowiedniego rozdziału lub modułu operacyjnego;
- szybkie przejście do Journalu i słowniczka.

Lista dni jest teraz krótkim indeksem, a nie zbiorem wielu rozwiniętych akordeonów.

### Machu Picchu

Machu zostało podzielone na pięć osobnych widoków:

1. **Dzień 20.09** — bilet, godziny i plan operacyjny;
2. **Ruta 3-A** — dokładna sekwencja Waszej potwierdzonej trasy z Waynapicchu;
3. **Ruta 2-A / 2-B** — porównanie i szczegółowe punkty obu wariantów;
4. **Historia** — chronologia i ostrożnie opisany kontekst stanowiska;
5. **Zasady** — dokumenty, checklista, zakazy i bezpieczeństwo.

Każdy etap tras ma opis tego, co zobaczycie, praktyczną wskazówkę oraz rozwijany rys historyczny. Nie trzeba przewijać jednego ogromnego ekranu.

## Fotografie

Zasada v18 brzmi:

> Brak zdjęcia jest lepszy niż zdjęcie przedstawiające inny punkt.

Zmiany:

- fotografie w kartach zostały znacznie zmniejszone;
- miniatury na trasach Machu nie dominują już nad tekstem;
- usunięto szerokie, nieprecyzyjne przypisania zdjęć do etapów;
- zdjęcie pojawia się przy punkcie Machu tylko wtedy, gdy przedstawia dokładnie ten obiekt;
- katalog nadal zawiera 68 prawdziwych fotografii;
- 20/20 zwierząt nadal ma fotografię identyfikacyjną;
- nie dodano żadnych obrazów generowanych przez AI.

Zdjęcia pozostają zewnętrzne i mogą zostać pobrane do pamięci offline przez ekran **Więcej → Offline, kopia i język**.

## Główna struktura

Nawigacja pozostaje ograniczona do pięciu pozycji:

1. **Start**;
2. **Plan**;
3. **Przewodnik**;
4. **Wildlife**;
5. **Więcej**.

Wszystkie wcześniejsze funkcje zostały zachowane: rezerwacje, checklisty, płatności, pakowanie, Journal, Emergency, Wildlife Tracker, zdjęcia offline, pełny backup, PL / EN / ES oraz słowniczek z 81 zwrotami.

## Aktualizacja z v17

1. W aktualnej aplikacji wykonaj pełny backup.
2. Zastąp całą zawartość repozytorium plikami z ZIP-a v18.
3. Wykonaj commit i poczekaj na publikację GitHub Pages.
4. Otwórz aplikację i wybierz **Więcej → Offline, kopia i język → Sprawdź aktualizację**.
5. Gdy stary cache nadal się pojawia, zamknij aplikację z przełącznika aplikacji i uruchom ponownie.

Klucze danych lokalnych zostały zachowane, więc aktualizacja nie powinna usuwać Journalu, checklist, obserwacji ani ustawień. Backup przed podmianą nadal jest obowiązkowym zabezpieczeniem.

## Instalacja na iPhonie

1. Otwórz GitHub Pages w Safari.
2. Wybierz **Udostępnij**.
3. Naciśnij **Dodaj do ekranu początkowego**.
4. Uruchamiaj aplikację z ikony.

## Prywatność

Publiczny build nie zawiera kodów rezerwacji, pełnych adresów prywatnych apartamentów, numeru telefonu Martina, dokładnych wpłat ani bezpośredniego linku do prywatnego Notion.

## Audyt

Najnowsze raporty:

- `CHANGELOG_v18.md`;
- `UX_AUDIT_v18.md`;
- `QA_REPORT_v18.md`;
- `I18N_AUDIT_v18.md`;
- `MEDIA_AUDIT_v18.md`.

Ponowne uruchomienie audytu:

```bash
node qa/audit.js
```

Audyt sprawdza składnię, 37 tras aplikacji, wszystkie karty dni, pięć widoków Machu, multimedia, tłumaczenia, service worker, manifest i wzorce danych wrażliwych. Nie zastępuje ręcznego testu dotykowego w Safari na konkretnym iPhonie.
