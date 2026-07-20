# Changelog v13 — Real Photos

## Dodano
- Osobny moduł „Prawdziwe zdjęcia” dostępny z nawigacji.
- 31 wybranych fotografii odnoszących się bezpośrednio do planowanej trasy.
- 14 zdjęć zwierząt z Amazonii powiązanych z atlasem i Wildlife Trackerem.
- Fotografie w kartach Cusco, Ollantaytambo, Limy, Amazonii i Machu Picchu.
- Link „Autor i licencja” przy każdej fotografii.
- Obsługę lazy-loading i responsywną galerię na iPhone.
- Runtime cache fotografii zewnętrznych po pierwszym poprawnym otwarciu.

## Polityka obrazów
- Zero obrazów generowanych przez AI.
- Wyłącznie fotografie z identyfikowalną stroną pliku w Wikimedia Commons.
- Zdjęcia użytkownika dodawane w Wildlife Trackerze pozostają prywatne w pamięci urządzenia.

## Ograniczenie offline
Binarne pliki fotografii nie są fizycznie spakowane w ZIP. Po pierwszym otwarciu danego zdjęcia z internetem service worker próbuje zachować je w cache urządzenia.
