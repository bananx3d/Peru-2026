# UX AUDIT v18

## Problem wejściowy

Po v17 główna nawigacja była czytelniejsza, ale:

- plan nadal nie dawał pełnego obrazu konkretnego dnia;
- kontekst historyczny był odseparowany i trudno dostępny;
- Machu Picchu wymagało zbyt długiego przewijania;
- opisy punktów tras były zbyt krótkie;
- fotografie były zbyt duże i czasami przypisane zbyt szeroko.

## Zastosowane rozwiązanie

### Maksymalnie jeden temat na ekran

- lista planu służy wyłącznie do wyboru dnia;
- karta dnia służy wyłącznie do przygotowania konkretnego dnia;
- moduł Machu ma osobne zakładki dla operacji, tras, historii i zasad.

### Progresywne ujawnianie treści

Rys historyczny jest dostępny po kliknięciu. Użytkownik widzi najpierw plan operacyjny, ale nie traci możliwości przeczytania szerszego kontekstu.

### Hierarchia fotografii

- tekst i decyzje są elementem głównym;
- fotografia jest małą pomocą identyfikacyjną;
- brak dokładnego zdjęcia nie jest traktowany jako błąd;
- zdjęcie nie może zastępować prawidłowego podpisu.

## Wynik strukturalny

- 5 głównych pozycji nawigacji;
- 23 osobne karty dni;
- 5 skupionych widoków Machu;
- kontekst historyczny dostępny bez opuszczania dnia lub punktu trasy;
- najważniejsze informacje operacyjne osiągalne bez przeglądania galerii.

## Ograniczenie

Nie wykonano fizycznego testu na konkretnym iPhonie użytkownika. Po wdrożeniu należy sprawdzić komfort dotyku, długość kart, sticky tabs i zachowanie przy słabym połączeniu.
