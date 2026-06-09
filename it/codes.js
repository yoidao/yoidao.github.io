window.CODES = {
 "101": {
  "cat": "Parametri",
  "alias": "missing required parameter parametro mancante",
  "trigger": "Prima integrazione o migrazione v1 → v3",
  "official": "Parametro obbligatorio mancante. Completa prima gli obbligatori, poi verifica la scrittura (maiuscole/minuscole).",
  "cause": "v3 richiede 8: q、from、to、appKey、salt、sign、signType、curtime. Uno mancante o un nome errato = 101; v1 non aveva curtime / signType (i più dimenticati nella migrazione).",
  "fix": "Confronta con la tabella ufficiale dei parametri; conferma signType=v3 e curtime (timestamp in secondi) presenti.",
  "scene": "Adattare un demo v1 a v3 dimenticando curtime e signType → 101 costante."
 },
 "102": {
  "cat": "Parametri",
  "alias": "language not supported lingua zh-CHS",
  "trigger": "from / to con un codice lingua non supportato",
  "official": "Tipo di lingua non supportato.",
  "cause": "Youdao usa zh-CHS / zh-CHT / en / ja / ko…; zh / zh-CN / cn non sono riconosciuti. Con strict=true e direzione non supportata fallisce anche.",
  "fix": "Codice esatto dalla tabella ufficiale; in dubbio, from=auto e strict di default (false).",
  "scene": "zh-CN dà 102; con zh-CHS funziona."
 },
 "103": {
  "cat": "Parametri",
  "alias": "text too long lungo 5000",
  "official": "Testo da tradurre troppo lungo.",
  "cause": "Limite di caratteri per richiesta superato (interfacce modello/documento i ≤ 5000), testo lungo non suddiviso.",
  "fix": "Suddividi per frase / paragrafo e invia a lotti; i documenti lunghi via l'interfaccia di traduzione documenti."
 },
 "108": {
  "cat": "Auth / firma",
  "alias": "appkey invalid id app app key",
  "trigger": "appKey errato, app non creata / servizio non associato, o firma scaduta",
  "official": "ID app non valido. Registra un account, crea l'app in console e associa il servizio per ottenere appKey e appSecret.",
  "cause": "appKey con caratteri persi / spazi; o app senza istanza del servizio. A volte firma scaduta (curtime troppo lontano dall'ora server, ~120s) → sembra un errore di auth.",
  "fix": "Verifica l'appKey (senza spazi); conferma l'istanza associata; curtime attuale in secondi.",
  "scene": "App nuova chiamata diretta senza associare l'istanza di traduzione → 108 / 110."
 },
 "110": {
  "cat": "Servizio / istanza",
  "alias": "no valid instance associare tts",
  "trigger": "L'app non ha associato l'istanza richiesta dalla chiamata",
  "official": "Nessuna istanza valida del servizio: l'app non ha associato istanze, creane e associa. La pronuncia richiede un'istanza TTS separata.",
  "cause": "Ogni app associa un'istanza per servizio - traduzione / TTS / OCR separati. Associare solo la traduzione e chiedere voice → 110.",
  "fix": "Associa in console ogni istanza per servizio (traduzione / TTS / OCR).",
  "scene": "Traduzione OK ma richiesta voce dà 110 - istanza TTS assente."
 },
 "111": {
  "cat": "Auth / firma",
  "alias": "developer account invalid account",
  "official": "Account sviluppatore non valido.",
  "cause": "Account senza verifica sviluppatore, stato anomalo o controllo rischi.",
  "fix": "Verifica stato e verifica reale / sviluppatore in console; ticket se serve."
 },
 "113": {
  "cat": "Parametri",
  "alias": "q empty vuoto",
  "official": "q non può essere vuoto.",
  "cause": "Campo q assente o vuoto; a lotti, un elemento vuoto.",
  "fix": "Valida q non vuoto prima della chiamata; filtra elementi vuoti nei lotti."
 },
 "116": {
  "cat": "Parametri",
  "alias": "strict invalid",
  "official": "Valore di strict non valido; consulta la documentazione.",
  "cause": "strict accetta solo la stringa \"true\" / \"false\"; 1 / 0 o altri falliscono.",
  "fix": "strict come \"true\" o \"false\"; senza direzione stretta, non inviarlo."
 },
 "201": {
  "cat": "Risultato / decifratura / altri",
  "alias": "decrypt decifratura des base64",
  "official": "Decifratura fallita: possibile errore DES, BASE64 o URLDecode.",
  "cause": "In interfaccia di cifratura di trasporto, cifrato / codifica / padding non coincide con l'accordo.",
  "fix": "Confronta con la doc dell'interfaccia cifrata: chiave/IV DES, BASE64 e ordine URLDecode."
 },
 "202": {
  "cat": "Auth / firma",
  "alias": "signature failed firma sign auth",
  "trigger": "Il più frequente: stringa mal formata, codifica, spazi",
  "official": "Verifica della firma fallita. Se ID e chiave sono corretti e persiste, di solito è la codifica: q in UTF-8.",
  "cause": "Firma v3 = sha256(appKey + input + salt + curtime + appSecret), quattro trappole: ① ordine (deve essere appKey→input→salt→curtime→appSecret); ② troncamento input - q&gt;20: 10 + lunghezza + 10, ≤20: q, per caratteri Unicode non byte; ③ spazi/a-capo in q o chiave; ④ niente UTF-8 prima di SHA256, o output non in hex minuscolo.",
  "fix": "Verifica con la funzione di firma dell'SDK ufficiale; stampa e confronta carattere per carattere; hex minuscolo; per CJK/emoji tronca per caratteri.",
  "scene": "Inglese OK, cinese lungo a volte 202 - il troncamento ha tagliato per byte; tagliare per caratteri Unicode lo risolve."
 },
 "203": {
  "cat": "Auth / firma",
  "alias": "ip whitelist access ip list",
  "trigger": "OK in locale ma fallisce in cloud / dopo cambio macchina",
  "official": "L'IP di accesso non è nell'elenco consentito.",
  "cause": "Whitelist IP attiva ma l'IP pubblico di uscita non c'è (scaling, uscita dinamica, debug locale la cambiano).",
  "fix": "Aggiungi l'IP reale di uscita o disattiva la restrizione se è sicuro; in container usa uscita fissa (NAT).",
  "scene": "Locale OK, in cloud 203 - l'IP di uscita del server non era in elenco."
 },
 "205": {
  "cat": "Auth / firma",
  "alias": "platform type sdk api piattaforma",
  "official": "L'interfaccia non corrisponde al tipo di piattaforma dell'app: allinea il metodo (SDK Android/iOS / API) alla scelta in creazione.",
  "cause": "Hai scelto «server / API» ma chiami con SDK mobile (o viceversa).",
  "fix": "Allinea il tipo di piattaforma al metodo reale; per chiamata server, app «server»."
 },
 "206": {
  "cat": "Auth / firma",
  "alias": "timestamp curtime orologio ntp",
  "trigger": "Orologio di container / VM impreciso",
  "official": "Timestamp non valido, quindi firma fallita.",
  "cause": "curtime deve essere UTC in secondi ed entrare nella firma; deriva, fuso errato, millisecondi o valore fisso lo invalidano (firma ~120s).",
  "fix": "Timestamp Unix in secondi; attiva NTP; sincronizza il container con l'host; non cachare curtime.",
  "scene": "Container Docker con orologio sfasato → molti 206; con NTP si riprende."
 },
 "207": {
  "cat": "Auth / firma",
  "alias": "replay salt uuid ripetizione",
  "trigger": "salt fisso o reinvio di una vecchia richiesta",
  "official": "Richiesta in replay. salt + curtime evitano il replay (non 2 volte); salt preferibilmente UUID.",
  "cause": "salt fisso / auto-incrementale / riusato, o retry che reinvia il vecchio salt + curtime.",
  "fix": "Genera salt casuale (UUID) e rinnova curtime a ogni richiesta; al retry, rifirma.",
  "scene": "Fissare il salt per riprodurre un bug → 207 alla seconda chiamata."
 },
 "303": {
  "cat": "Risultato / decifratura / altri",
  "alias": "server error request_id",
  "official": "Altra eccezione server.",
  "cause": "Errore interno del server, non un problema di parametri client; spesso temporaneo.",
  "fix": "Riprova con backoff esponenziale; se persiste, ticket con request_id."
 },
 "310": {
  "cat": "Servizio / istanza",
  "alias": "domain rejectFallback dominio",
  "official": "Servizio di traduzione per dominio non attivato.",
  "cause": "Hai inviato domain ma la console non ha attivato quel dominio.",
  "fix": "Attiva la traduzione per dominio poi invia domain / rejectFallback, o togli domain per la traduzione generale."
 },
 "401": {
  "cat": "Account / fatturazione / limite",
  "alias": "saldo ricaricare arrears balance",
  "trigger": "All'improvviso tutto fallisce",
  "official": "L'account è in negativo; ricarica.",
  "cause": "Saldo / pacchetto caratteri esaurito ferma il servizio; postpagato non attivo o pacchetto consumato.",
  "fix": "Ricarica o acquista un pacchetto; avvisi di saldo / uso; canale di riserva per il critico.",
  "scene": "Fine mese pacchetto vuoto, tutto 401; dopo la ricarica riparte."
 },
 "411": {
  "cat": "Account / fatturazione / limite",
  "alias": "qps rate limit limite frequenza",
  "trigger": "Compare molto in concorrenza / test di carico",
  "official": "Frequenza di accesso limitata; riprova più tardi.",
  "cause": "QPS dell'app superato (base ~100, espandibile in console); concorrenza improvvisa senza limitazione client.",
  "fix": "Token bucket / leaky bucket + backoff esponenziale; raggruppa / distribuisci le richieste; acquista QPS se serve.",
  "scene": "Picco di carico satura → molti 411; con un limitatore è stabile."
 },
 "412": {
  "cat": "Account / fatturazione / limite",
  "alias": "long request richiesta lunga",
  "official": "Richieste lunghe troppo frequenti; riprova più tardi.",
  "cause": "Testo lungo / interfaccia pesante troppo densi in poco tempo.",
  "fix": "Riduci la frequenza delle richieste lunghe (secondi di intervallo); testi lunghi via l'interfaccia documenti."
 },
 "500": {
  "cat": "Risultato / decifratura / altri",
  "alias": "translate failed errormessage",
  "official": "Traduzione fallita; vedi errorMessage.",
  "cause": "Fallimento generico del server; serve errorMessage per la causa precisa.",
  "fix": "Localizza con errorMessage / request_id; verifica la combinazione from / to / q."
 },
 "902000": {
  "cat": "Risultato / decifratura / altri",
  "alias": "llm modello grande",
  "official": "Chiamata di traduzione con modello grande fallita.",
  "cause": "Anomalia del flusso modello grande o input non valido (i ≤ 5000, limite di prompt…).",
  "fix": "Verifica input e limite di lunghezza; riprova con backoff e request_id."
 }
};
window.LABELS = {"miss": "Codice non elencato; prova un altro codice o parola chiave, o consulta la tabella completa sotto.", "codeword": "Codice di errore "};
window.FIELDS = [["trigger", "Quando compare"], ["official", "Significato ufficiale L1"], ["cause", "Causa radice L2"], ["fix", "Come diagnosticare / risolvere"], ["scene", "Caso reale"]];
window.THEAD = ["Codice", "Categoria", "Significato ufficiale L1", "Causa radice L2"];
