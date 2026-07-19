# Peru 2026 — Expedition Companion

Responsywna aplikacja PWA inspirowana stylistyką National Geographic:
- desktop: boczne menu + główna treść + prawa kolumna,
- telefon: mobilny nagłówek + dolne menu,
- język polski / angielski,
- pełny plan Curassow 6 dni / 5 nocy,
- packing i checklisty zapisywane lokalnie,
- pogoda z Open‑Meteo,
- kursy walut z ExchangeRate.fun,
- budżet i dziennik zapisywane w przeglądarce,
- podstawowe działanie offline.

## Publikacja na GitHub Pages

1. Utwórz publiczne repozytorium `peru-2026`.
2. Wybierz **Add file → Upload files**.
3. Przeciągnij CAŁĄ zawartość tego folderu — nie sam ZIP.
4. Kliknij **Commit changes**.
5. Wejdź w **Settings → Pages**.
6. Source: **Deploy from a branch**.
7. Branch: **main**, folder: **/(root)**.
8. Kliknij **Save**.

Link pozostaje stały:
`https://TWOJ-LOGIN.github.io/peru-2026/`

Po każdej zmianie wrzucasz poprawione pliki do tego samego repozytorium.
Nie tworzysz nowego linku.

## Najłatwiejsza edycja

Większość treści znajduje się w `data.js`.

Przykład:
- godziny i plan → `tripDays`,
- plan Curassow → `curassow.days`,
- packing → `packing`,
- noclegi → `publicReservations`,
- transport → `transport`.

Po zmianie pliku zapisz i zrób commit.

## Prywatność

Nie umieszczaj w publicznym repozytorium:
- kodów Airbnb,
- kodów lotów,
- numerów paszportów,
- biletów PDF,
- pełnych prywatnych adresów,
- prywatnych numerów telefonu.

Pełne dane pozostają w prywatnym Notion.
