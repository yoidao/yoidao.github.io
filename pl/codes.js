window.CODES = {
 "101": {
  "cat": "Parametry",
  "alias": "missing required parameter brak parametru",
  "trigger": "Pierwsza integracja lub migracja v1 → v3",
  "official": "Brak wymaganego parametru. Najpierw uzupełnij wymagane, potem sprawdź pisownię (wielkość liter).",
  "cause": "v3 wymaga 8: q、from、to、appKey、salt、sign、signType、curtime. Brak jednego lub zła nazwa = 101; v1 nie miało curtime / signType (najczęściej pomijane przy migracji).",
  "fix": "Porównaj z oficjalną tabelą parametrów; potwierdź signType=v3 i curtime (znacznik w sekundach) obecne.",
  "scene": "Przeróbka demo v1 na v3 z pominięciem curtime i signType → ciągłe 101."
 },
 "102": {
  "cat": "Parametry",
  "alias": "language not supported jezyk zh-CHS",
  "official": "Nieobsługiwany typ języka.",
  "cause": "Youdao używa zh-CHS / zh-CHT / en / ja / ko…; zh / zh-CN / cn nie są rozpoznawane; przy strict=true i nieobsługiwanym kierunku też błąd.",
  "fix": "Użyj dokładnego kodu z oficjalnej tabeli; w razie wątpliwości from=auto i strict domyślnie (false)."
 },
 "103": {
  "cat": "Parametry",
  "alias": "text too long dlugi 5000",
  "official": "Tekst do tłumaczenia za długi.",
  "cause": "Przekroczony limit znaków na żądanie (interfejsy model/dokument i ≤ 5000).",
  "fix": "Podziel wg zdania / akapitu i wyślij partiami; długie dokumenty przez interfejs tłumaczenia dokumentów."
 },
 "108": {
  "cat": "Auth / podpis",
  "alias": "appkey invalid id aplikacji app key",
  "trigger": "Zły appKey, aplikacja nieutworzona / usługa niepowiązana, lub podpis wygasły",
  "official": "Nieprawidłowe ID aplikacji. Zarejestruj konto, utwórz aplikację w konsoli i powiąż usługę, aby uzyskać appKey i appSecret.",
  "cause": "appKey z utraconymi znakami / spacjami; lub aplikacja bez instancji usługi; czasem podpis wygasły (curtime za daleko od czasu serwera, ~120s).",
  "fix": "Zweryfikuj appKey (bez spacji); potwierdź powiązaną instancję; curtime aktualne w sekundach.",
  "scene": "Nowa aplikacja wywołana bezpośrednio bez powiązania instancji tłumaczenia → 108 / 110."
 },
 "110": {
  "cat": "Usługa / instancja",
  "alias": "no valid instance powiaz tts",
  "trigger": "Aplikacja nie powiązała instancji wymaganej przez wywołanie",
  "official": "Brak prawidłowej instancji usługi: aplikacja nie powiązała instancji, utwórz i powiąż. Wymowa wymaga osobnej instancji TTS.",
  "cause": "Każda aplikacja wiąże instancję per usługa - tłumaczenie / TTS / OCR osobno; powiązanie tylko tłumaczenia i żądanie voice → 110.",
  "fix": "Powiąż w konsoli każdą instancję per usługa (tłumaczenie / TTS / OCR).",
  "scene": "Tłumaczenie OK, ale żądanie głosu daje 110 - brak instancji TTS."
 },
 "111": {
  "cat": "Auth / podpis",
  "alias": "developer account invalid konto",
  "official": "Nieprawidłowe konto dewelopera.",
  "cause": "Konto bez weryfikacji dewelopera, status nietypowy lub kontrola ryzyka.",
  "fix": "Sprawdź status i weryfikację rzeczywistą / dewelopera w konsoli; zgłoszenie w razie potrzeby."
 },
 "113": {
  "cat": "Parametry",
  "alias": "q empty puste",
  "official": "q nie może być puste.",
  "cause": "Pole q brakujące lub puste; w partii pusty element.",
  "fix": "Zweryfikuj q niepuste przed wywołaniem; odfiltruj puste elementy w partiach."
 },
 "116": {
  "cat": "Parametry",
  "alias": "strict invalid",
  "official": "Nieprawidłowa wartość strict; zobacz dokumentację.",
  "cause": "strict przyjmuje tylko ciąg \"true\" / \"false\"; 1 / 0 itd. zawodzą.",
  "fix": "strict jako \"true\" lub \"false\"; bez ścisłego kierunku nie wysyłaj."
 },
 "201": {
  "cat": "Wynik / deszyfracja / inne",
  "alias": "decrypt deszyfracja des base64",
  "official": "Deszyfracja nieudana: możliwy błąd DES, BASE64 lub URLDecode.",
  "cause": "W interfejsie szyfrowania transportu szyfrogram / kodowanie / dopełnienie nie zgadzają się z ustaleniem.",
  "fix": "Porównaj z dok. interfejsu szyfrowanego: klucz/IV DES, BASE64 i kolejność URLDecode."
 },
 "202": {
  "cat": "Auth / podpis",
  "alias": "signature failed podpis sign auth",
  "trigger": "Najczęstszy: źle złożony ciąg, kodowanie, spacje",
  "official": "Weryfikacja podpisu nieudana. Jeśli ID i klucz są poprawne, a problem trwa, to zwykle kodowanie: upewnij się, że q jest UTF-8.",
  "cause": "Podpis v3 = sha256(appKey + input + salt + curtime + appSecret), cztery pułapki: ① kolejność (musi być appKey→input→salt→curtime→appSecret); ② obcinanie input - q&gt;20: 10 + długość + 10, ≤20: q, wg znaków Unicode, nie bajtów; ③ spacje/znaki nowej linii w q lub kluczu; ④ brak UTF-8 przed SHA256, lub wynik nie w hex małymi.",
  "fix": "Zweryfikuj funkcją podpisu oficjalnego SDK; wydrukuj i porównaj znak po znaku; hex małymi; dla CJK/emoji obcinaj wg znaków.",
  "scene": "Angielski OK, długi chiński czasem 202 - obcinanie cięło wg bajtów; cięcie wg znaków Unicode to naprawia."
 },
 "203": {
  "cat": "Auth / podpis",
  "alias": "ip whitelist access ip list",
  "trigger": "OK lokalnie, ale zawodzi w chmurze / po zmianie maszyny",
  "official": "IP dostępu nie jest na liście dozwolonych.",
  "cause": "Biała lista IP aktywna, ale publiczne IP wyjścia jej nie ma (skalowanie, dynamiczne wyjście, lokalne debugowanie je zmieniają).",
  "fix": "Dodaj prawdziwe IP wyjścia lub wyłącz ograniczenie, jeśli to bezpieczne; w kontenerach stałe wyjście (NAT).",
  "scene": "Lokalnie OK, w chmurze 203 - IP wyjścia serwera nie było na liście."
 },
 "205": {
  "cat": "Auth / podpis",
  "alias": "platform type sdk api platforma",
  "official": "Interfejs nie zgadza się z typem platformy aplikacji: dopasuj metodę (SDK Android/iOS / API) do wyboru przy tworzeniu.",
  "cause": "Wybrano «serwer / API», ale wywołujesz mobilnym SDK (lub odwrotnie).",
  "fix": "Dopasuj typ platformy do rzeczywistej metody; dla wywołania serwera aplikacja «serwer»."
 },
 "206": {
  "cat": "Auth / podpis",
  "alias": "timestamp curtime zegar ntp",
  "trigger": "Niedokładny zegar kontenera / VM",
  "official": "Nieprawidłowy znacznik czasu powoduje błąd podpisu.",
  "cause": "curtime musi być UTC w sekundach i wchodzić do podpisu; dryf, zła strefa, milisekundy lub stała wartość unieważniają go (podpis ~120s).",
  "fix": "Znacznik Unix w sekundach; włącz NTP; zsynchronizuj kontener z hostem; nie buforuj curtime.",
  "scene": "Kontener Docker z dryfem zegara → dużo 206; z NTP wraca do normy."
 },
 "207": {
  "cat": "Auth / podpis",
  "alias": "replay salt uuid powtorka",
  "trigger": "stały salt lub ponowne wysłanie starego żądania",
  "official": "Żądanie powtórki. salt + curtime zapobiegają powtórce (nie 2x); salt najlepiej UUID.",
  "cause": "salt stały / rosnący / ponownie użyty, lub ponowienie wysyłające stary salt + curtime.",
  "fix": "Generuj losowy salt (UUID) i odświeżaj curtime przy każdym żądaniu; przy ponowieniu podpisz ponownie.",
  "scene": "Ustalenie salt do odtworzenia błędu → 207 przy drugim wywołaniu."
 },
 "303": {
  "cat": "Wynik / deszyfracja / inne",
  "alias": "server error request_id",
  "official": "Inny wyjątek serwera.",
  "cause": "Wewnętrzny błąd serwera, nie problem parametrów klienta; zwykle chwilowy.",
  "fix": "Ponów z backoffem wykładniczym; jeśli trwa, zgłoszenie z request_id."
 },
 "310": {
  "cat": "Usługa / instancja",
  "alias": "domain rejectFallback domena",
  "official": "Usługa tłumaczenia domenowego nieaktywna.",
  "cause": "Wysłano domain, ale konsola nie aktywowała tej domeny.",
  "fix": "Aktywuj tłumaczenie domenowe i wyślij domain / rejectFallback, lub usuń domain dla tłumaczenia ogólnego."
 },
 "401": {
  "cat": "Konto / rozliczenia / limit",
  "alias": "saldo doladuj arrears balance",
  "trigger": "Nagle wszystko zawodzi",
  "official": "Konto jest na minusie; doładuj.",
  "cause": "Saldo / pakiet znaków wyczerpane zatrzymuje usługę; postpaid nieaktywny lub pakiet zużyty.",
  "fix": "Doładuj lub kup pakiet; alerty salda / użycia; kanał zapasowy dla krytycznych.",
  "scene": "Koniec miesiąca pakiet pusty, wszystko 401; po doładowaniu wraca."
 },
 "411": {
  "cat": "Konto / rozliczenia / limit",
  "alias": "qps rate limit limit czestotliwosc",
  "trigger": "Pojawia się często przy współbieżności / teście obciążeniowym",
  "official": "Częstotliwość dostępu ograniczona; spróbuj później.",
  "cause": "Przekroczony QPS aplikacji (bazowy ~100, rozszerzalny w konsoli); nagła współbieżność bez ograniczenia po stronie klienta.",
  "fix": "Token bucket / leaky bucket + backoff wykładniczy; grupuj / rozpraszaj żądania; dokup QPS w razie potrzeby.",
  "scene": "Szczyt obciążenia nasyca → dużo 411; z ogranicznikiem stabilnie."
 },
 "412": {
  "cat": "Konto / rozliczenia / limit",
  "alias": "long request dlugie zadanie",
  "official": "Długie żądania zbyt częste; spróbuj później.",
  "cause": "Długi tekst / ciężki interfejs zbyt gęsto w krótkim czasie.",
  "fix": "Zmniejsz częstotliwość długich żądań (sekundy odstępu); długie teksty przez interfejs dokumentów."
 },
 "500": {
  "cat": "Wynik / deszyfracja / inne",
  "alias": "translate failed errormessage",
  "official": "Tłumaczenie nieudane; zobacz errorMessage.",
  "cause": "Ogólny błąd serwera; potrzeba errorMessage dla dokładnej przyczyny.",
  "fix": "Zlokalizuj przez errorMessage / request_id; sprawdź kombinację from / to / q."
 },
 "902000": {
  "cat": "Wynik / deszyfracja / inne",
  "alias": "llm duzy model",
  "official": "Nieudane wywołanie tłumaczenia dużym modelem.",
  "cause": "Anomalia ścieżki dużego modelu lub nieprawidłowe wejście (i ≤ 5000, limit długości promptu…).",
  "fix": "Sprawdź wejście i limit długości; ponów z backoffem i request_id."
 }
};
window.LABELS = {"miss": "Kodu nie ma na liście; spróbuj innego kodu lub słowa kluczowego, albo zobacz pełną tabelę poniżej.", "codeword": "Kod błędu "};
window.FIELDS = [["trigger", "Kiedy występuje"], ["official", "Oficjalne znaczenie L1"], ["cause", "Przyczyna źródłowa L2"], ["fix", "Jak zdiagnozować / naprawić"], ["scene", "Realny przypadek"]];
window.THEAD = ["Kod", "Kategoria", "Oficjalne znaczenie L1", "Przyczyna źródłowa L2"];
