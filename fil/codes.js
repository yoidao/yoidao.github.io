window.CODES = {
 "101": {
  "cat": "Parameter",
  "alias": "missing required parameter kulang na parameter",
  "trigger": "Unang integration o paglipat v1 → v3",
  "official": "Kulang ang required na parameter. Tiyakin muna ang mga required, tapos suriin ang baybay (laki ng titik).",
  "cause": "Kailangan ng v3 ang 8: q、from、to、appKey、salt、sign、signType、curtime. Isang kulang o maling pangalan = 101; walang curtime / signType ang v1 (pinakamadalas makaligtaan sa paglipat).",
  "fix": "Itugma sa opisyal na talahanayan ng parameter; tiyakin ang signType=v3 at curtime (timestamp sa segundo).",
  "scene": "Pagbago ng v1 demo sa v3 na nakalimutan ang curtime at signType → tuloy-tuloy na 101."
 },
 "102": {
  "cat": "Parameter",
  "alias": "language not supported wika zh-CHS",
  "official": "Hindi suportadong uri ng wika.",
  "cause": "Gumagamit ang Youdao ng zh-CHS / zh-CHT / en / ja / ko…; hindi kilala ang zh / zh-CN / cn; sa strict=true at di-suportadong direksyon din nagka-error.",
  "fix": "Gamitin ang tamang code mula opisyal na talahanayan; kung di-sigurado, from=auto at strict default (false)."
 },
 "103": {
  "cat": "Parameter",
  "alias": "text too long haba 5000",
  "official": "Sobrang haba ng teksto na isasalin.",
  "cause": "Lumampas sa limit ng karakter kada kahilingan (model/document interface i ≤ 5000).",
  "fix": "Hatiin ayon sa pangungusap / talata at ipadala nang batch; mahahabang dokumento sa document translation interface."
 },
 "108": {
  "cat": "Auth / signature",
  "alias": "appkey invalid app id app key",
  "trigger": "Maling appKey, di-likha ang app / di-naka-bind ang serbisyo, o paso ang signature",
  "official": "Di-wastong app ID. Magrehistro, gumawa ng app sa console at i-bind ang serbisyo para makuha ang appKey at appSecret.",
  "cause": "appKey na may nawalang karakter / espasyo; o app na walang service instance; minsan paso ang signature (malayo ang curtime sa oras ng server, ~120s).",
  "fix": "I-verify ang appKey (walang espasyo); kumpirmahin ang naka-bind na instance; curtime na kasalukuyan sa segundo.",
  "scene": "Bagong app na tinawag agad nang hindi naka-bind ang translation instance → 108 / 110."
 },
 "110": {
  "cat": "Serbisyo / instance",
  "alias": "no valid instance i-bind tts",
  "trigger": "Hindi naka-bind ng app ang instance na kailangan ng tawag",
  "official": "Walang wastong service instance: walang naka-bind na instance ang app, gumawa at i-bind. Kailangan ng pronunciation ng hiwalay na TTS instance.",
  "cause": "Bawat app ay nag-bind ng isang instance kada serbisyo - translation / TTS / OCR magkahiwalay; nag-bind lang ng translation tapos humingi ng voice → 110.",
  "fix": "I-bind sa console ang bawat instance kada serbisyo (translation / TTS / OCR).",
  "scene": "Maayos ang translation pero 110 sa paghingi ng boses - walang TTS instance."
 },
 "111": {
  "cat": "Auth / signature",
  "alias": "developer account invalid account",
  "official": "Di-wastong developer account.",
  "cause": "Account na walang developer verification, abnormal na status, o nasa risk control.",
  "fix": "Suriin ang status at totoong / developer verification sa console; mag-ticket kung kailangan."
 },
 "113": {
  "cat": "Parameter",
  "alias": "q empty walang laman",
  "official": "Hindi pwedeng walang laman ang q.",
  "cause": "Nawawala o walang laman ang q field; sa batch may walang lamang elemento.",
  "fix": "I-validate ang q na may laman bago tumawag; i-filter ang walang lamang elemento sa batch."
 },
 "116": {
  "cat": "Parameter",
  "alias": "strict invalid",
  "official": "Di-wastong halaga ng strict; tingnan ang dokumentasyon.",
  "cause": "Tumatanggap lang ang strict ng string na \"true\" / \"false\"; 1 / 0 atbp ay nabibigo.",
  "fix": "strict bilang \"true\" o \"false\"; kung walang mahigpit na direksyon, huwag ipadala."
 },
 "201": {
  "cat": "Resulta / decryption / iba pa",
  "alias": "decrypt decryption des base64",
  "official": "Bigong decryption: posibleng DES, BASE64, o URLDecode error.",
  "cause": "Sa transport-encryption interface, di-magkatugma ang ciphertext / encoding / padding sa kasunduan.",
  "fix": "Itugma sa dok ng naka-encrypt na interface: DES key/IV, BASE64, at pagkakasunod ng URLDecode."
 },
 "202": {
  "cat": "Auth / signature",
  "alias": "signature failed lagda sign auth",
  "trigger": "Pinakamadalas: maling pagkakabuo ng string, encoding, espasyo",
  "official": "Bigo ang signature verification. Kung tama ang ID at key pero tuloy pa rin, kadalasan encoding ito: tiyakin ang q sa UTF-8.",
  "cause": "v3 signature = sha256(appKey + input + salt + curtime + appSecret), apat na bitag: ① pagkakasunod (dapat appKey→input→salt→curtime→appSecret); ② truncation ng input - q&gt;20: 10 + haba + 10, ≤20: q, ayon sa Unicode na karakter hindi byte; ③ espasyo/bagong linya sa q o key; ④ walang UTF-8 bago ang SHA256, o ang output ay hindi lowercase hex.",
  "fix": "I-verify gamit ang signature function ng opisyal na SDK; i-print at ihambing kada karakter; lowercase hex; para sa CJK/emoji, truncate ayon sa karakter.",
  "scene": "Maayos ang Ingles, minsan 202 ang mahabang Chinese - pinutol ng truncation ayon sa byte; ang paghahati ayon sa Unicode na karakter ang lunas."
 },
 "203": {
  "cat": "Auth / signature",
  "alias": "ip whitelist access ip list",
  "trigger": "Maayos sa local pero bigo sa cloud / paglipat ng makina",
  "official": "Wala sa pinapayagang listahan ang access IP.",
  "cause": "Aktibo ang IP whitelist pero wala rito ang public outbound IP (scaling, dynamic egress, local debugging ang nagbabago nito).",
  "fix": "Idagdag ang totoong outbound IP o i-off ang restriction kung ligtas; sa container gumamit ng fixed egress (NAT).",
  "scene": "Local maayos, sa cloud 203 - wala sa listahan ang outbound IP ng server."
 },
 "205": {
  "cat": "Auth / signature",
  "alias": "platform type sdk api platform",
  "official": "Di-tugma ang interface sa platform type ng app: itugma ang paraan (Android/iOS SDK / API) sa napili sa paggawa.",
  "cause": "Pinili ang «server / API» pero tumatawag gamit ang mobile SDK (o kabaligtaran).",
  "fix": "Itugma ang platform type sa totoong paraan; para sa server call, app na «server»."
 },
 "206": {
  "cat": "Auth / signature",
  "alias": "timestamp curtime orasan ntp",
  "trigger": "Di-tumpak na orasan ng container / VM",
  "official": "Di-wastong timestamp kaya bigo ang signature.",
  "cause": "Dapat UTC sa segundo ang curtime at pumasok sa signature; drift, maling zone, milliseconds, o fixed na halaga ang nag-iinvalid nito (signature ~120s).",
  "fix": "Unix timestamp sa segundo; i-enable ang NTP; i-sync ang container sa host; huwag i-cache ang curtime.",
  "scene": "Docker container na lihis ang orasan → maraming 206; gumagaling sa NTP."
 },
 "207": {
  "cat": "Auth / signature",
  "alias": "replay salt uuid replay",
  "trigger": "fixed na salt o muling pagpapadala ng lumang request",
  "official": "Replay request. Pinipigil ng salt + curtime ang replay (hindi 2x); mas mainam UUID ang salt.",
  "cause": "salt na fixed / tumataas / ginamit-muli, o retry na nagpapadalang muli ng lumang salt + curtime.",
  "fix": "Gumawa ng random na salt (UUID) at i-refresh ang curtime kada request; sa retry, mag-sign muli.",
  "scene": "Pag-fix ng salt para i-reproduce ang bug → 207 sa pangalawang tawag."
 },
 "303": {
  "cat": "Resulta / decryption / iba pa",
  "alias": "server error request_id",
  "official": "Iba pang exception ng server.",
  "cause": "Internal error ng server, hindi problema ng parameter ng client; kadalasan pansamantala.",
  "fix": "Subukan ulit gamit ang exponential backoff; kung tuloy, ticket na may request_id."
 },
 "310": {
  "cat": "Serbisyo / instance",
  "alias": "domain rejectFallback domain",
  "official": "Hindi naka-enable ang domain translation service.",
  "cause": "Nagpadala ng domain pero hindi na-enable ng console ang domain na iyon.",
  "fix": "I-enable ang domain translation tapos magpadala ng domain / rejectFallback, o tanggalin ang domain para sa general translation."
 },
 "401": {
  "cat": "Account / billing / limit",
  "alias": "balanse mag-load arrears balance",
  "trigger": "Biglang lahat ay nabibigo",
  "official": "May utang na ang account; mag-load.",
  "cause": "Naubos ang balanse / character pack kaya huminto ang serbisyo; di-aktibo ang postpaid o ubos ang pack.",
  "fix": "Mag-load o bumili ng pack; balance / usage alert; backup channel para sa kritikal.",
  "scene": "Katapusan ng buwan ubos ang pack, lahat 401; gumagaling pagkatapos mag-load."
 },
 "411": {
  "cat": "Account / billing / limit",
  "alias": "qps rate limit limit dalas",
  "trigger": "Madalas lumabas sa concurrency / load test",
  "official": "Limitado ang dalas ng access; subukan mamaya.",
  "cause": "Lumampas sa QPS ng app (base ~100, madaragdagan sa console); biglaang concurrency na walang client throttling.",
  "fix": "Token bucket / leaky bucket + exponential backoff; pagsama-samahin / ikalat ang request; bumili ng QPS kung kailangan.",
  "scene": "Saturated ang peak load → maraming 411; matatag kapag may limiter."
 },
 "412": {
  "cat": "Account / billing / limit",
  "alias": "long request mahabang request",
  "official": "Masyadong madalas ang mahahabang request; subukan mamaya.",
  "cause": "Mahabang teksto / mabigat na interface na masyadong siksik sa maikling oras.",
  "fix": "Bawasan ang dalas ng mahabang request (segundong agwat); mahahabang teksto sa document interface."
 },
 "500": {
  "cat": "Resulta / decryption / iba pa",
  "alias": "translate failed errormessage",
  "official": "Bigong translation; tingnan ang errorMessage.",
  "cause": "Pangkalahatang bigo ng server; kailangan ng errorMessage para sa eksaktong sanhi.",
  "fix": "Tukuyin sa errorMessage / request_id; suriin ang kombinasyon from / to / q."
 },
 "902000": {
  "cat": "Resulta / decryption / iba pa",
  "alias": "llm malaking modelo",
  "official": "Bigo ang large-model translation call.",
  "cause": "Anomalya sa large-model na daloy o di-wastong input (i ≤ 5000, limit sa haba ng prompt…).",
  "fix": "Suriin ang input at limit ng haba; subukan ulit na may backoff at request_id."
 }
};
window.LABELS = {"miss": "Wala sa listahan ang code; subukan ang ibang code o keyword, o tingnan ang buong talahanayan sa ibaba.", "codeword": "Error code "};
window.FIELDS = [["trigger", "Kailan lumalabas"], ["official", "Opisyal na kahulugan L1"], ["cause", "Ugat na sanhi L2"], ["fix", "Paano i-diagnose / ayusin"], ["scene", "Totoong kaso"]];
window.THEAD = ["Code", "Kategorya", "Opisyal na kahulugan L1", "Ugat na sanhi L2"];
