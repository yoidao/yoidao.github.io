window.CODES = {
 "101": {
  "cat": "Parameters",
  "alias": "missing required parameter ontbrekende parameter",
  "trigger": "Eerste integratie of migratie v1 → v3",
  "official": "Verplichte parameter ontbreekt. Vul eerst de verplichte aan, controleer dan de schrijfwijze (hoofdletters).",
  "cause": "v3 vereist 8: q、from、to、appKey、salt、sign、signType、curtime. Eén ontbreekt of een naam fout = 101; v1 had geen curtime / signType (vaakst vergeten bij migratie).",
  "fix": "Vergelijk met de officiele parametertabel; bevestig signType=v3 en curtime (timestamp in seconden) aanwezig.",
  "scene": "Een v1-demo naar v3 ombouwen en curtime en signType vergeten → constant 101."
 },
 "102": {
  "cat": "Parameters",
  "alias": "language not supported taal zh-CHS",
  "official": "Niet-ondersteund taaltype.",
  "cause": "Youdao gebruikt zh-CHS / zh-CHT / en / ja / ko…; zh / zh-CN / cn worden niet herkend; bij strict=true en niet-ondersteunde richting faalt het ook.",
  "fix": "Gebruik de exacte code uit de officiele tabel; bij twijfel from=auto en strict standaard (false)."
 },
 "103": {
  "cat": "Parameters",
  "alias": "text too long lang 5000",
  "official": "Vertaaltekst te lang.",
  "cause": "Tekenlimiet per verzoek overschreden (model-/documentinterfaces i ≤ 5000).",
  "fix": "Splits per zin / alinea en verstuur in batches; lange documenten via de documentvertaalinterface."
 },
 "108": {
  "cat": "Auth / handtekening",
  "alias": "appkey invalid app-id app key",
  "trigger": "Verkeerde appKey, app niet aangemaakt / dienst niet gekoppeld, of handtekening verlopen",
  "official": "App-ID ongeldig. Registreer een account, maak de app in de console en koppel de dienst voor appKey en appSecret.",
  "cause": "appKey met verloren tekens / spaties; of app zonder dienstinstantie; soms verlopen handtekening (curtime te ver van servertijd, ~120s).",
  "fix": "Controleer de appKey (zonder spaties); bevestig de gekoppelde instantie; curtime actueel in seconden.",
  "scene": "Nieuwe app direct aangeroepen zonder de vertaalinstantie te koppelen → 108 / 110."
 },
 "110": {
  "cat": "Dienst / instantie",
  "alias": "no valid instance koppelen tts",
  "trigger": "De app koppelde de vereiste dienstinstantie niet",
  "official": "Geen geldige dienstinstantie: de app koppelde geen instantie, maak en koppel er een. Uitspraak vereist een aparte TTS-instantie.",
  "cause": "Elke app koppelt een instantie per dienst - vertaling / TTS / OCR apart; alleen vertaling koppelen en voice vragen → 110.",
  "fix": "Koppel in de console per dienst een instantie (vertaling / TTS / OCR).",
  "scene": "Vertaling OK maar spraakverzoek geeft 110 - TTS-instantie ontbreekt."
 },
 "111": {
  "cat": "Auth / handtekening",
  "alias": "developer account invalid account",
  "official": "Ontwikkelaarsaccount ongeldig.",
  "cause": "Account zonder ontwikkelaarsverificatie, afwijkende status of risicocontrole.",
  "fix": "Controleer status en echte / ontwikkelaarsverificatie in de console; ticket indien nodig."
 },
 "113": {
  "cat": "Parameters",
  "alias": "q empty leeg",
  "official": "q mag niet leeg zijn.",
  "cause": "Veld q ontbreekt of is leeg; in batch een leeg element.",
  "fix": "Valideer q niet-leeg voor de aanroep; filter lege elementen in batches."
 },
 "116": {
  "cat": "Parameters",
  "alias": "strict invalid",
  "official": "Waarde van strict ongeldig; raadpleeg de documentatie.",
  "cause": "strict accepteert alleen de string \"true\" / \"false\"; 1 / 0 e.d. falen.",
  "fix": "strict als \"true\" of \"false\"; zonder strikte richting niet meesturen."
 },
 "201": {
  "cat": "Resultaat / ontsleuteling / overig",
  "alias": "decrypt ontsleuteling des base64",
  "official": "Ontsleuteling mislukt: mogelijk DES-, BASE64- of URLDecode-fout.",
  "cause": "Bij transportversleuteling komen cijfertekst / codering / padding niet overeen met de afspraak.",
  "fix": "Vergelijk met de docs van de versleutelde interface: DES-sleutel/IV, BASE64 en URLDecode-volgorde."
 },
 "202": {
  "cat": "Auth / handtekening",
  "alias": "signature failed handtekening sign auth",
  "trigger": "Meest voorkomend: verkeerde string, codering, spaties",
  "official": "Handtekeningverificatie mislukt. Als ID en sleutel kloppen en het blijft, is het meestal codering: zorg dat q UTF-8 is.",
  "cause": "v3-handtekening = sha256(appKey + input + salt + curtime + appSecret), vier valkuilen: ① volgorde (moet appKey→input→salt→curtime→appSecret zijn); ② input-truncatie - q&gt;20: 10 + lengte + 10, ≤20: q, per Unicode-teken en niet bytes; ③ spaties/regeleinden in q of sleutel; ④ geen UTF-8 voor SHA256, of output niet in hex-klein.",
  "fix": "Controleer met de handtekeningfunctie van de officiele SDK; print en vergelijk teken voor teken; hex-klein; bij CJK/emoji per teken truncen.",
  "scene": "Engels OK, lang Chinees soms 202 - de truncatie sneed per byte; per Unicode-teken snijden lost het op."
 },
 "203": {
  "cat": "Auth / handtekening",
  "alias": "ip whitelist access ip list",
  "trigger": "OK lokaal maar faalt in de cloud / na machinewissel",
  "official": "Het toegangs-IP staat niet op de toegestane lijst.",
  "cause": "IP-whitelist actief maar het publieke uitgaande IP staat er niet op (schaling, dynamische uitgang, lokaal debuggen veranderen het).",
  "fix": "Voeg het echte uitgaande IP toe of zet de beperking veilig uit; in containers vast uitgaand IP (NAT).",
  "scene": "Lokaal OK, in de cloud 203 - het uitgaande IP van de server stond niet op de lijst."
 },
 "205": {
  "cat": "Auth / handtekening",
  "alias": "platform type sdk api platform",
  "official": "Interface komt niet overeen met het platformtype van de app: stem de methode (Android/iOS SDK / API) af op de keuze bij het aanmaken.",
  "cause": "Je koos «server / API» maar roept aan met mobiele SDK (of andersom).",
  "fix": "Stem het platformtype af op de echte methode; voor serveraanroep een «server»-app."
 },
 "206": {
  "cat": "Auth / handtekening",
  "alias": "timestamp curtime klok ntp",
  "trigger": "Onnauwkeurige klok in container / VM",
  "official": "Timestamp ongeldig, daardoor faalt de handtekening.",
  "cause": "curtime moet UTC in seconden zijn en in de handtekening; drift, verkeerde zone, milliseconden of vaste waarde maken het ongeldig (handtekening ~120s).",
  "fix": "Unix-timestamp in seconden; activeer NTP; synchroniseer de container met de host; cache curtime niet.",
  "scene": "Docker-container met afwijkende klok → veel 206; met NTP herstelt het."
 },
 "207": {
  "cat": "Auth / handtekening",
  "alias": "replay salt uuid herhaling",
  "trigger": "vaste salt of opnieuw verzenden van een oud verzoek",
  "official": "Replay-verzoek. salt + curtime voorkomen replay (niet 2x); salt liefst UUID.",
  "cause": "salt vast / oplopend / hergebruikt, of retry die de oude salt + curtime opnieuw verzendt.",
  "fix": "Genereer per verzoek een willekeurige salt (UUID) en vernieuw curtime; bij retry opnieuw ondertekenen.",
  "scene": "salt vastzetten om een bug te reproduceren → 207 bij de tweede aanroep."
 },
 "303": {
  "cat": "Resultaat / ontsleuteling / overig",
  "alias": "server error request_id",
  "official": "Andere serveruitzondering.",
  "cause": "Interne serverfout, geen clientparameterprobleem; meestal tijdelijk.",
  "fix": "Probeer opnieuw met exponentiele backoff; blijft het, ticket met request_id."
 },
 "310": {
  "cat": "Dienst / instantie",
  "alias": "domain rejectFallback domein",
  "official": "Domeinvertaaldienst niet geactiveerd.",
  "cause": "Je stuurde domain maar de console heeft dat domein niet geactiveerd.",
  "fix": "Activeer domeinvertaling en stuur dan domain / rejectFallback, of laat domain weg voor algemene vertaling."
 },
 "401": {
  "cat": "Account / facturering / limiet",
  "alias": "saldo opladen arrears balance",
  "trigger": "Opeens faalt alles",
  "official": "Het account staat rood; laad op.",
  "cause": "Saldo / tekenpakket op stopt de dienst; achterafbetaling niet actief of pakket verbruikt.",
  "fix": "Laad op of koop een pakket; saldo- / gebruiksalerts; fallback-kanaal voor kritieke zaken.",
  "scene": "Einde maand pakket leeg, alles 401; na opladen weer goed."
 },
 "411": {
  "cat": "Account / facturering / limiet",
  "alias": "qps rate limit limiet frequentie",
  "trigger": "Komt veel voor bij concurrency / loadtest",
  "official": "Toegangsfrequentie beperkt; probeer later opnieuw.",
  "cause": "App-QPS overschreden (basis ~100, uitbreidbaar in de console); plotselinge concurrency zonder clientthrottling.",
  "fix": "Token bucket / leaky bucket + exponentiele backoff; bundel / spreid verzoeken; koop QPS bij indien nodig.",
  "scene": "Loadpiek verzadigt → veel 411; met een limiter stabiel."
 },
 "412": {
  "cat": "Account / facturering / limiet",
  "alias": "long request lang verzoek",
  "official": "Lange verzoeken te frequent; probeer later opnieuw.",
  "cause": "Lange tekst / zware interface te dicht op elkaar in korte tijd.",
  "fix": "Verlaag de frequentie van lange verzoeken (seconden ertussen); lange teksten via de documentinterface."
 },
 "500": {
  "cat": "Resultaat / ontsleuteling / overig",
  "alias": "translate failed errormessage",
  "official": "Vertaling mislukt; zie errorMessage.",
  "cause": "Generieke serverfout; errorMessage nodig voor de exacte oorzaak.",
  "fix": "Lokaliseer met errorMessage / request_id; controleer de combinatie from / to / q."
 },
 "902000": {
  "cat": "Resultaat / ontsleuteling / overig",
  "alias": "llm groot model",
  "official": "Aanroep van grootmodelvertaling mislukt.",
  "cause": "Anomalie in het grootmodelpad of ongeldige invoer (i ≤ 5000, promptlengtelimiet…).",
  "fix": "Controleer invoer en lengtelimiet; probeer opnieuw met backoff en request_id."
 }
};
window.LABELS = {"miss": "Code niet vermeld; probeer een andere code of trefwoord, of bekijk de volledige tabel hieronder.", "codeword": "Foutcode "};
window.FIELDS = [["trigger", "Wanneer treedt het op"], ["official", "Officiele L1-betekenis"], ["cause", "L2-oorzaak"], ["fix", "Diagnose / oplossing"], ["scene", "Echte case"]];
window.THEAD = ["Code", "Categorie", "Officiele L1-betekenis", "L2-oorzaak"];
