window.CODES = {
 "101": {
  "cat": "Parametre",
  "alias": "missing required parameter eksik parametre",
  "trigger": "İlk entegrasyon veya v1 → v3 geçişi",
  "official": "Zorunlu parametre eksik. Önce zorunluları tamamlayın, sonra yazımı (büyük/küçük harf) denetleyin.",
  "cause": "v3 sekiz gerektirir: q、from、to、appKey、salt、sign、signType、curtime. Biri eksik veya adı yanlış = 101; v1'de curtime / signType yoktu (geçişte en sık atlanan).",
  "fix": "Resmi parametre tablosuyla karşılaştırın; signType=v3 ve curtime (saniye zaman damgası) mevcut olduğunu doğrulayın.",
  "scene": "v1 demosunu v3'e çevirirken curtime ve signType unutulunca sürekli 101."
 },
 "102": {
  "cat": "Parametre",
  "alias": "language not supported dil zh-CHS",
  "official": "Desteklenmeyen dil türü.",
  "cause": "Youdao zh-CHS / zh-CHT / en / ja / ko… kullanır; zh / zh-CN / cn tanınmaz; strict=true ve desteklenmeyen yönde de başarısız olur.",
  "fix": "Resmi tablodan tam kodu kullanın; emin değilseniz from=auto ve strict varsayılan (false)."
 },
 "103": {
  "cat": "Parametre",
  "alias": "text too long uzun 5000",
  "official": "Çevrilecek metin çok uzun.",
  "cause": "İstek başına karakter sınırı aşıldı (model/belge arayüzleri i ≤ 5000).",
  "fix": "Cümle / paragrafa bölün ve toplu gönderin; uzun belgeler belge çeviri arayüzünden."
 },
 "108": {
  "cat": "Kimlik / imza",
  "alias": "appkey invalid uygulama kimligi app key",
  "trigger": "Yanlış appKey, uygulama oluşturulmamış / hizmet bağlı değil veya imza süresi dolmuş",
  "official": "Geçersiz uygulama kimliği. Hesap kaydedin, konsolda uygulama oluşturun ve hizmeti bağlayın; appKey ve appSecret edinin.",
  "cause": "Karakter kaybı / boşluk içeren appKey; veya hizmet örneği olmayan uygulama; bazen imza süresi dolmuş (curtime sunucu saatinden çok uzak, ~120s).",
  "fix": "appKey'i doğrulayın (boşluksuz); bağlı örneği onaylayın; curtime güncel saniye.",
  "scene": "Yeni uygulama, çeviri örneği bağlanmadan doğrudan çağrılınca → 108 / 110."
 },
 "110": {
  "cat": "Hizmet / örnek",
  "alias": "no valid instance bagla tts",
  "trigger": "Uygulama, çağrının gerektirdiği hizmet örneğini bağlamadı",
  "official": "Geçerli hizmet örneği yok: uygulama örnek bağlamadı, oluşturun ve bağlayın. Telaffuz ayrı bir TTS örneği gerektirir.",
  "cause": "Her uygulama hizmet başına bir örnek bağlar - çeviri / TTS / OCR ayrı; yalnızca çeviriyi bağlayıp voice istemek → 110.",
  "fix": "Konsolda her örneği hizmet başına bağlayın (çeviri / TTS / OCR).",
  "scene": "Çeviri iyi ama ses isteği 110 verir - TTS örneği yok."
 },
 "111": {
  "cat": "Kimlik / imza",
  "alias": "developer account invalid hesap",
  "official": "Geçersiz geliştirici hesabı.",
  "cause": "Geliştirici doğrulaması olmayan, anormal durumlu veya risk denetimindeki hesap.",
  "fix": "Konsolda durumu ve gerçek / geliştirici doğrulamasını denetleyin; gerekirse talep."
 },
 "113": {
  "cat": "Parametre",
  "alias": "q empty bos",
  "official": "q boş olamaz.",
  "cause": "q alanı eksik veya boş; toplu işlemde boş bir öğe.",
  "fix": "Çağrıdan önce q'nun boş olmadığını doğrulayın; toplu işlemde boş öğeleri filtreleyin."
 },
 "116": {
  "cat": "Parametre",
  "alias": "strict invalid",
  "official": "Geçersiz strict değeri; belgelere bakın.",
  "cause": "strict yalnızca \"true\" / \"false\" dizesini kabul eder; 1 / 0 vb. başarısız.",
  "fix": "strict \"true\" veya \"false\" olarak; katı yön gerekmiyorsa göndermeyin."
 },
 "201": {
  "cat": "Sonuç / şifre çözme / diğer",
  "alias": "decrypt sifre cozme des base64",
  "official": "Şifre çözme başarısız: olası DES, BASE64 veya URLDecode hatası.",
  "cause": "Aktarım şifrelemeli arayüzde şifreli metin / kodlama / dolgu anlaşmayla uyuşmuyor.",
  "fix": "Şifreli arayüz belgesiyle karşılaştırın: DES anahtarı/IV, BASE64 ve URLDecode sırası."
 },
 "202": {
  "cat": "Kimlik / imza",
  "alias": "signature failed imza sign auth",
  "trigger": "En sık: yanlış kurulmuş dize, kodlama, boşluk",
  "official": "İmza doğrulaması başarısız. Kimlik ve anahtar doğruysa ve sürüyorsa genelde kodlamadır: q'nun UTF-8 olduğundan emin olun.",
  "cause": "v3 imza = sha256(appKey + input + salt + curtime + appSecret), dört tuzak: ① sıra (appKey→input→salt→curtime→appSecret olmalı); ② input kesme - q&gt;20: 10 + uzunluk + 10, ≤20: q, bayt değil Unicode karaktere göre; ③ q veya anahtarda boşluk/satır sonu; ④ SHA256 öncesi UTF-8 yok ya da çıktı küçük hex değil.",
  "fix": "Resmi SDK imza fonksiyonuyla doğrulayın; dizeyi yazdırıp karakter karakter karşılaştırın; küçük hex; CJK/emoji için karaktere göre kesin.",
  "scene": "İngilizce iyi, uzun Çince bazen 202 - kesme bayta göre kesmiş; Unicode karaktere göre kesmek düzeltir."
 },
 "203": {
  "cat": "Kimlik / imza",
  "alias": "ip whitelist access ip list",
  "trigger": "Yerelde iyi ama bulutta / makine değişiminde başarısız",
  "official": "Erişim IP'si izin verilenler listesinde değil.",
  "cause": "IP beyaz listesi etkin ama genel çıkış IP'si listede yok (ölçekleme, dinamik çıkış, yerel hata ayıklama değiştirir).",
  "fix": "Gerçek çıkış IP'sini ekleyin veya güvenliyse kısıtlamayı kapatın; konteynerde sabit çıkış (NAT).",
  "scene": "Yerelde iyi, bulutta 203 - sunucu çıkış IP'si listede değildi."
 },
 "205": {
  "cat": "Kimlik / imza",
  "alias": "platform type sdk api platform",
  "official": "Arayüz uygulamanın platform türüyle uyuşmuyor: yöntemi (Android/iOS SDK / API) oluşturmadaki seçimle hizalayın.",
  "cause": "«Sunucu / API» seçildi ama mobil SDK ile çağrılıyor (ya da tersi).",
  "fix": "Platform türünü gerçek yöntemle hizalayın; sunucu çağrısı için «sunucu» uygulaması."
 },
 "206": {
  "cat": "Kimlik / imza",
  "alias": "timestamp curtime saat ntp",
  "trigger": "Konteyner / VM saati yanlış",
  "official": "Geçersiz zaman damgası, bu yüzden imza başarısız.",
  "cause": "curtime saniye UTC olmalı ve imzaya girmeli; kayma, yanlış dilim, milisaniye veya sabit değer onu geçersiz kılar (imza ~120s).",
  "fix": "Saniye Unix zaman damgası; NTP etkinleştirin; konteyneri ana makineyle eşitleyin; curtime'ı önbelleğe almayın.",
  "scene": "Saati kaymış Docker konteyneri → çok 206; NTP ile düzelir."
 },
 "207": {
  "cat": "Kimlik / imza",
  "alias": "replay salt uuid yeniden oynatma",
  "trigger": "sabit salt veya eski isteğin yeniden gönderimi",
  "official": "Yeniden oynatma isteği. salt + curtime yeniden oynatmayı önler (2 kez değil); salt tercihen UUID.",
  "cause": "salt sabit / artan / yeniden kullanılmış, ya da yeniden deneme eski salt + curtime'ı tekrar gönderiyor.",
  "fix": "Her istekte rastgele salt (UUID) üretin ve curtime'ı yenileyin; yeniden denemede yeniden imzalayın.",
  "scene": "Hata yeniden üretmek için salt sabitlenince → ikinci çağrıda 207."
 },
 "303": {
  "cat": "Sonuç / şifre çözme / diğer",
  "alias": "server error request_id",
  "official": "Diğer sunucu istisnası.",
  "cause": "Sunucu iç hatası, istemci parametre sorunu değil; genelde geçici.",
  "fix": "Üstel geri çekilmeyle yeniden deneyin; sürerse request_id ile talep."
 },
 "310": {
  "cat": "Hizmet / örnek",
  "alias": "domain rejectFallback alan",
  "official": "Alan çevirisi hizmeti etkin değil.",
  "cause": "domain gönderildi ama konsol o alanı etkinleştirmedi.",
  "fix": "Alan çevirisini etkinleştirip domain / rejectFallback gönderin, ya da genel çeviri için domain'i kaldırın."
 },
 "401": {
  "cat": "Hesap / faturalama / sınır",
  "alias": "bakiye yukle arrears balance",
  "trigger": "Aniden hepsi başarısız",
  "official": "Hesap borçlu; lütfen yükleyin.",
  "cause": "Bakiye / karakter paketi tükenince hizmet durur; sonradan ödeme etkin değil veya paket tükenmiş.",
  "fix": "Yükleyin veya paket alın; bakiye / kullanım uyarıları; kritik için yedek kanal.",
  "scene": "Ay sonu paket boş, hepsi 401; yükledikten sonra düzelir."
 },
 "411": {
  "cat": "Hesap / faturalama / sınır",
  "alias": "qps rate limit sinir frekans",
  "trigger": "Eşzamanlılık / yük testinde sık görülür",
  "official": "Erişim sıklığı sınırlı; sonra deneyin.",
  "cause": "Uygulama QPS'si aşıldı (taban ~100, konsolda artırılabilir); istemci sınırlaması olmadan ani eşzamanlılık.",
  "fix": "Token bucket / leaky bucket + üstel geri çekilme; istekleri toplayın / dağıtın; gerekirse QPS alın.",
  "scene": "Yük zirvesi doyurur → çok 411; sınırlayıcıyla kararlı."
 },
 "412": {
  "cat": "Hesap / faturalama / sınır",
  "alias": "long request uzun istek",
  "official": "Uzun istekler çok sık; sonra deneyin.",
  "cause": "Uzun metin / ağır arayüz kısa sürede çok yoğun.",
  "fix": "Uzun istek sıklığını azaltın (saniye aralık); uzun metinler belge arayüzünden."
 },
 "500": {
  "cat": "Sonuç / şifre çözme / diğer",
  "alias": "translate failed errormessage",
  "official": "Çeviri başarısız; errorMessage'a bakın.",
  "cause": "Genel sunucu hatası; kesin neden için errorMessage gerekir.",
  "fix": "errorMessage / request_id ile konumlandırın; from / to / q birleşimini denetleyin."
 },
 "902000": {
  "cat": "Sonuç / şifre çözme / diğer",
  "alias": "llm buyuk model",
  "official": "Büyük model çeviri çağrısı başarısız.",
  "cause": "Büyük model akışında anormallik veya geçersiz girdi (i ≤ 5000, prompt uzunluk sınırı…).",
  "fix": "Girdiyi ve uzunluk sınırını denetleyin; geri çekilme ve request_id ile yeniden deneyin."
 }
};
window.LABELS = {"miss": "Kod listede yok; başka bir kod veya anahtar kelime deneyin ya da aşağıdaki tam tabloya bakın.", "codeword": "Hata kodu "};
window.FIELDS = [["trigger", "Ne zaman görülür"], ["official", "L1 resmi anlam"], ["cause", "L2 kök neden"], ["fix", "Nasıl tanılanır / çözülür"], ["scene", "Gerçek vaka"]];
window.THEAD = ["Kod", "Kategori", "L1 resmi anlam", "L2 kök neden"];
