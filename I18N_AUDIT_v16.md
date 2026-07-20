# I18N AUDIT — Peru 2026 v16

## Zakres

Sprawdzono system językowy aplikacji dla:

- polskiego (`pl`),
- angielskiego (`en`),
- hiszpańskiego (`es`).

## Wynik

- 2 136 wpisów źródłowych posiada wersję angielską;
- 2 136 wpisów źródłowych posiada wersję hiszpańską;
- 28/28 tras aplikacji wyrenderowano automatycznie;
- nie wykryto pustych wpisów w słownikach EN/ES;
- nie wykryto mocnych polskich pozostałości w interfejsie przy audycie tekstów źródłowych;
- obsługiwane są teksty z ikonami, separatory `·` i `—`, podpisy fotografii, daty rozdziałów oraz proste komunikaty dynamiczne;
- ustawienie języka jest zapisywane w `localStorage` i trafia do pełnego backupu.

## Celowo nieprzetłumaczone

- nazwy własne miejsc i obiektów, gdy lokalna/originalna nazwa jest użyteczna w terenie;
- nazwy restauracji, hoteli i operatorów;
- oznaczenia tras, np. `Ruta 3-A`, `Ruta 2-A`, `Ruta 2-B`;
- numery, daty, godziny i symbole;
- treści wpisywane przez użytkownika;
- trzy równoległe wersje każdego zwrotu w słowniczku — mają pozostać widoczne jednocześnie.

## Słowniczek

- 81 zwrotów;
- 9 kategorii;
- każdy wpis ma niepustą wersję PL, EN i ES;
- identyfikatory są unikalne;
- wszystkie kategorie referencjonowane przez zwroty istnieją.

## Ograniczenie testu

Wykonano testy składni, danych, renderowania tras i pokrycia tłumaczeń w środowisku automatycznym. Nie wykonano fizycznego testu dotykowego ani testu głosów `SpeechSynthesis` w Safari na konkretnym iPhonie.
