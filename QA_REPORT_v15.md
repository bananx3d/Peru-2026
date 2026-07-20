# QA Report v15 — Stability & iPhone Polish

Data audytu: 20.07.2026

## Wynik automatyczny

**PASS**

- JavaScript: wszystkie pliki przechodzą `node --check`.
- Renderowanie: **27/27** sprawdzonych tras generuje główną zawartość bez wyjątku.
- Fotografie: **68** unikalnych wpisów katalogu.
- Zwierzęta: **20/20** profili Amazonii i Wildlife Trackera ma przypisaną fotografię.
- Pokrycie strukturalne: **100/100** wymaganych przypisań miejsc, roślin, zwierząt i etapów tras.
- CSS: brak niezdefiniowanych statycznych zmiennych własnych; dynamiczne zmienne hero są ustawiane przez widoki.
- Service worker: wszystkie pliki listy CORE istnieją.
- Manifest: obie ikony istnieją i JSON jest poprawny.
- Prywatność: nie wykryto kodów Airbnb, telefonu Martina, dokładnych płatności ani bezpośredniego adresu prywatnego Notion.

## Naprawione problemy

1. Brakujące zmienne CSS `--panel`, `--text` i `--display` w warstwie zdjęciowej.
2. Nieaktualne komunikaty o „Etapie 2” i „następnym etapie”.
3. Publiczny build zawierał bezpośredni link do prywatnego Notion — został usunięty.
4. Cache zdjęć był związany z numerem v14 i mógł być tracony przy aktualizacji — obecnie ma stałą nazwę i migrację.
5. Brak jednego pełnego backupu wszystkich danych — dodano eksport/import.
6. Słaba nawigacja jedną ręką na iPhonie — dodano dolny pasek skrótów i obsługę safe-area.
7. Niedostępne zdjęcie znikało bez wyjaśnienia — dodano czytelny fallback.
8. Brak centralnej diagnostyki — dodano panel statusu sieci, service workera, cache i danych lokalnych.

## Audyt fotografii i zero AI

Katalog dopuszcza wyłącznie:

- strony plików `commons.wikimedia.org`,
- oficjalne materiały `curassowlodge.com`.

Każdy wpis ma:

- `kind: photograph`,
- `ai: false`,
- unikalny identyfikator,
- źródło,
- przypisanie do gatunku albo miejsca.

W projekcie nie użyto generatora obrazów. Audyt techniczny nie jest jednak analizą kryminalistyczną pikseli zewnętrznych plików; ostateczne informacje o autorze, pochodzeniu i licencji znajdują się na podlinkowanej stronie źródłowej.

## Działanie offline

- rdzeń aplikacji jest zapisany przez service worker;
- nawigacja korzysta z wersji sieciowej, a przy braku połączenia wraca do zapisanego `index.html`;
- pliki rdzenia są obsługiwane cache-first;
- fotografie mają osobny, trwały cache;
- pakiet v14 jest migrowany do nowego cache v15;
- panel pokazuje faktyczną liczbę zdjęć znalezionych w Cache Storage.

## Ograniczenie środowiska testowego

Kontener nie uruchomił stabilnie Chromium z pełnym interfejsem systemowym, dlatego nie wykonano fizycznego testu dotykowego w Safari na iPhonie. Zamiast tego wykonano testy renderowania wszystkich tras, kontrolę breakpointów mobilnych, safe-area, wielkości pól dotykowych i struktury PWA. Ostateczny test instalacji należy wykonać po publikacji na GitHub Pages na właściwym iPhonie.

## Uruchomienie audytu

```bash
node qa/audit.js
```
