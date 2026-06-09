window.CODES = {
 "101": {
  "cat": "Parameter",
  "alias": "missing required parameter fehlender parameter",
  "trigger": "Erste Integration oder Migration v1 → v3",
  "official": "Pflichtparameter fehlt. Erst Pflichtfelder vervollständigen, dann Schreibweise (Groß-/Kleinschreibung) prüfen.",
  "cause": "v3 verlangt 8: q、from、to、appKey、salt、sign、signType、curtime. Fehlt eines oder ist ein Name falsch geschrieben = 101; v1 hatte kein curtime / signType (beim Umstieg am häufigsten vergessen).",
  "fix": "Mit der offiziellen Parametertabelle abgleichen; signType=v3 und curtime (Sekunden-Timestamp) vorhanden.",
  "scene": "v1-Demo auf v3 umgebaut, curtime und signType vergessen → dauerhaft 101."
 },
 "102": {
  "cat": "Parameter",
  "alias": "language not supported sprache zh-CHS",
  "trigger": "from / to mit nicht unterstütztem Sprachcode",
  "official": "Nicht unterstützter Sprachtyp.",
  "cause": "Youdao nutzt zh-CHS / zh-CHT / en / ja / ko…; zh / zh-CN / cn werden nicht erkannt. Bei strict=true und nicht unterstützter Richtung ebenfalls.",
  "fix": "Exakten Code aus der offiziellen Tabelle nehmen; im Zweifel from=auto und strict default (false).",
  "scene": "zh-CN ergibt 102; mit zh-CHS klappt es."
 },
 "103": {
  "cat": "Parameter",
  "alias": "text too long lang 5000",
  "official": "Übersetzungstext zu lang.",
  "cause": "Zeichenlimit pro Anfrage überschritten (Modell-/Dokumentschnittstellen i ≤ 5000), langer Text ohne Stückelung.",
  "fix": "Nach Satz / Absatz stückeln und in Chargen senden; lange Dokumente über die Dokument-Übersetzungsschnittstelle."
 },
 "108": {
  "cat": "Auth / Signatur",
  "alias": "appkey invalid app-id app key",
  "trigger": "Falscher appKey, App nicht erstellt / Dienst ungebunden, oder Signatur abgelaufen",
  "official": "App-ID ungültig. Konto registrieren, in der Konsole App erstellen und Dienst binden, um appKey und appSecret zu erhalten.",
  "cause": "appKey mit fehlenden Zeichen / Leerzeichen; oder App ohne Dienstinstanz. Manchmal Signatur abgelaufen (curtime zu weit von Serverzeit, ~120s) → wirkt wie Auth-Fehler.",
  "fix": "appKey prüfen (ohne Leerzeichen); gebundene Instanz bestätigen; curtime aktuell in Sekunden.",
  "scene": "Neue App direkt aufgerufen, Übersetzungsinstanz nicht gebunden → 108 / 110."
 },
 "110": {
  "cat": "Dienst / Instanz",
  "alias": "no valid instance binden tts",
  "trigger": "App hat die benötigte Dienstinstanz nicht gebunden",
  "official": "Keine gültige Dienstinstanz: App hat keine Instanz gebunden, neu erstellen und binden. Aussprache braucht eine separate TTS-Instanz.",
  "cause": "Jede App bindet eine Instanz pro Dienst - Übersetzung / TTS / OCR getrennt. Nur Übersetzung gebunden, aber voice angefordert → 110.",
  "fix": "In der Konsole je Dienst eine Instanz binden (Übersetzung / TTS / OCR).",
  "scene": "Übersetzung okay, aber Aussprache gibt 110 - TTS-Instanz fehlt."
 },
 "111": {
  "cat": "Auth / Signatur",
  "alias": "developer account invalid konto",
  "official": "Entwicklerkonto ungültig.",
  "cause": "Konto ohne Entwickler-Verifizierung, anomaler Status oder Risikokontrolle.",
  "fix": "Status und Echtname- / Entwickler-Verifizierung in der Konsole prüfen; ggf. Ticket."
 },
 "113": {
  "cat": "Parameter",
  "alias": "q empty leer",
  "official": "q darf nicht leer sein.",
  "cause": "Feld q fehlt oder ist leer; in Chargen ein leeres Element.",
  "fix": "q vor dem Aufruf auf nicht-leer prüfen; leere Elemente in Chargen filtern."
 },
 "116": {
  "cat": "Parameter",
  "alias": "strict invalid",
  "official": "Wert von strict ungültig; Doku beachten.",
  "cause": "strict akzeptiert nur die Zeichenkette \"true\" / \"false\"; 1 / 0 u. a. schlagen fehl.",
  "fix": "strict als \"true\" oder \"false\"; ohne strikte Richtung weglassen."
 },
 "201": {
  "cat": "Ergebnis / Entschlüsselung / Sonstiges",
  "alias": "decrypt entschluesselung des base64",
  "official": "Entschlüsselung fehlgeschlagen: möglicher DES-, BASE64- oder URLDecode-Fehler.",
  "cause": "Bei Transportverschlüsselung passen Chiffrat / Encoding / Padding nicht zur Vereinbarung.",
  "fix": "Doku der verschlüsselten Schnittstelle prüfen: DES-Schlüssel/IV, BASE64 und URLDecode-Reihenfolge."
 },
 "202": {
  "cat": "Auth / Signatur",
  "alias": "signature failed signatur sign auth",
  "trigger": "Häufigster Fehler: falsche Zeichenkette, Encoding, Leerzeichen",
  "official": "Signaturprüfung fehlgeschlagen. Sind ID und Schlüssel korrekt und es bleibt, ist es meist Encoding: q in UTF-8 sicherstellen.",
  "cause": "v3-Signatur = sha256(appKey + input + salt + curtime + appSecret), vier Fallen: ① Reihenfolge (muss appKey→input→salt→curtime→appSecret sein); ② input-Kürzung - q&gt;20: 10 + Länge + 10, ≤20: q, nach Unicode-Zeichen statt Bytes; ③ Leer-/Zeilenumbrüche in q oder Schlüssel; ④ nicht UTF-8 vor SHA256, oder Ausgabe nicht hex-klein.",
  "fix": "Mit der Signaturfunktion des offiziellen SDK gegenrechnen; Zeichenkette ausgeben und Zeichen für Zeichen vergleichen; hex-klein bestätigen; bei CJK/Emoji nach Zeichen kürzen.",
  "scene": "Englisch okay, langes Chinesisch manchmal 202 - Kürzung schnitt nach Bytes; nach Unicode-Zeichen behebt es das."
 },
 "203": {
  "cat": "Auth / Signatur",
  "alias": "ip whitelist access ip list",
  "trigger": "Lokal okay, in der Cloud / nach Maschinenwechsel Fehler",
  "official": "Zugriffs-IP nicht in der erlaubten IP-Liste.",
  "cause": "IP-Whitelist aktiv, aber die öffentliche Ausgangs-IP fehlt (Skalierung, dynamischer Ausgang, lokales Debugging ändern sie).",
  "fix": "Echte Ausgangs-IP eintragen oder Beschränkung sicher deaktivieren; in Containern feste Ausgangs-IP (NAT).",
  "scene": "Lokal okay, in der Cloud 203 - Server-Ausgangs-IP nicht auf der Liste."
 },
 "205": {
  "cat": "Auth / Signatur",
  "alias": "platform type sdk api plattform",
  "official": "Schnittstelle passt nicht zum Plattformtyp der App: Methode (Android/iOS SDK / API) mit der Wahl bei der Erstellung abgleichen.",
  "cause": "«Server / API» gewählt, aber mit Mobile-SDK aufgerufen (oder umgekehrt).",
  "fix": "Plattformtyp an die reale Methode anpassen; für Serveraufruf «Server»-App."
 },
 "206": {
  "cat": "Auth / Signatur",
  "alias": "timestamp curtime uhr ntp",
  "trigger": "Ungenaue Uhr in Container / VM",
  "official": "Timestamp ungültig, daher Signaturprüfung fehlgeschlagen.",
  "cause": "curtime muss UTC in Sekunden sein und in die Signatur eingehen; Drift, falsche Zone, Millisekunden oder Fixwert machen es ungültig (Signatur ~120s).",
  "fix": "Unix-Timestamp in Sekunden; NTP aktivieren; Container mit Host synchronisieren; curtime nicht cachen.",
  "scene": "Docker-Container mit Uhrdrift → viele 206; mit NTP erholt es sich."
 },
 "207": {
  "cat": "Auth / Signatur",
  "alias": "replay salt uuid wiederholung",
  "trigger": "fester salt oder Wiederholung einer alten Anfrage",
  "official": "Replay-Anfrage. salt + curtime verhindern Replay (nicht 2x); salt am besten UUID.",
  "cause": "salt fest / hochzählend / wiederverwendet, oder Retry mit altem salt + curtime erneut gesendet.",
  "fix": "Pro Anfrage zufälligen salt (UUID) und neues curtime; beim Retry neu signieren.",
  "scene": "salt für Bug-Reproduktion fest → 207 beim zweiten Aufruf."
 },
 "303": {
  "cat": "Ergebnis / Entschlüsselung / Sonstiges",
  "alias": "server error request_id",
  "official": "Sonstige Serverausnahme.",
  "cause": "Interner Serverfehler, kein Client-Parameterproblem; meist temporär.",
  "fix": "Mit exponentiellem Backoff erneut versuchen; bleibt es, Ticket mit request_id."
 },
 "310": {
  "cat": "Dienst / Instanz",
  "alias": "domain rejectFallback domaene",
  "official": "Domänenübersetzung nicht aktiviert.",
  "cause": "domain gesendet, aber die Konsole hat diese Domäne nicht aktiviert.",
  "fix": "Domänenübersetzung aktivieren, dann domain / rejectFallback senden, oder domain weglassen für allgemeine Übersetzung."
 },
 "401": {
  "cat": "Konto / Abrechnung / Limit",
  "alias": "guthaben aufladen arrears balance",
  "trigger": "Plötzlich schlägt alles fehl",
  "official": "Konto im Minus; bitte aufladen.",
  "cause": "Guthaben / Zeichenpaket aufgebraucht stoppt den Dienst; Nachzahlung nicht aktiv oder Paket verbraucht.",
  "fix": "Aufladen oder Paket kaufen; Guthaben- / Nutzungsalarme; Fallback-Kanal für kritisches.",
  "scene": "Monatsende Paket leer, alles 401; nach Aufladen erholt."
 },
 "411": {
  "cat": "Konto / Abrechnung / Limit",
  "alias": "qps rate limit limit frequenz",
  "trigger": "Tritt bei Concurrency / Lasttest gehäuft auf",
  "official": "Zugriffsfrequenz begrenzt; später erneut versuchen.",
  "cause": "App-QPS überschritten (Basis ~100, in der Konsole erweiterbar); plötzliche Concurrency ohne Client-Drosselung.",
  "fix": "Token-Bucket / Leaky-Bucket + exponentielles Backoff; Anfragen bündeln / verteilen; bei Bedarf QPS zukaufen.",
  "scene": "Lastspitze sättigt → viele 411; mit Limiter stabil."
 },
 "412": {
  "cat": "Konto / Abrechnung / Limit",
  "alias": "long request lange anfrage",
  "official": "Lange Anfragen zu häufig; später erneut versuchen.",
  "cause": "Langer Text / schwere Schnittstelle in kurzer Zeit zu dicht.",
  "fix": "Frequenz langer Anfragen senken (Sekunden Abstand); lange Texte über Dokumentschnittstelle."
 },
 "500": {
  "cat": "Ergebnis / Entschlüsselung / Sonstiges",
  "alias": "translate failed errormessage",
  "official": "Übersetzung fehlgeschlagen; errorMessage beachten.",
  "cause": "Generischer Serverfehler; braucht errorMessage für die konkrete Ursache.",
  "fix": "Mit errorMessage / request_id eingrenzen; Kombination from / to / q prüfen."
 },
 "902000": {
  "cat": "Ergebnis / Entschlüsselung / Sonstiges",
  "alias": "llm grosses modell",
  "official": "Aufruf der Großmodell-Übersetzung fehlgeschlagen.",
  "cause": "Anomalie im Großmodell-Pfad oder ungültige Eingabe (i ≤ 5000, Prompt-Längenlimit…).",
  "fix": "Eingabe und Längenlimit prüfen; mit Backoff und request_id erneut versuchen."
 }
};
window.LABELS = {"miss": "Code nicht gelistet; anderen Code/Stichwort versuchen oder die Tabelle unten ansehen.", "codeword": "Fehlercode "};
window.FIELDS = [["trigger", "Wann tritt es auf"], ["official", "Offizielle L1-Bedeutung"], ["cause", "L2-Ursache"], ["fix", "Diagnose / Lösung"], ["scene", "Realer Fall"]];
window.THEAD = ["Code", "Kategorie", "Offizielle L1-Bedeutung", "L2-Ursache"];
