window.CODES = {
 "101": {
  "cat": "Parameter",
  "alias": "missing required parameter parameter hilang",
  "trigger": "Integrasi pertama atau migrasi v1 → v3",
  "official": "Parameter wajib hilang. Pastikan yang wajib lengkap, kemudian semak ejaan (huruf besar/kecil).",
  "cause": "v3 perlu 8: q、from、to、appKey、salt、sign、signType、curtime. Satu hilang atau nama salah = 101; v1 tiada curtime / signType (paling kerap terlupa semasa migrasi).",
  "fix": "Padankan dengan jadual parameter rasmi; sahkan signType=v3 dan curtime (timestamp saat) ada.",
  "scene": "Ubah demo v1 ke v3 lupa curtime dan signType → 101 berterusan."
 },
 "102": {
  "cat": "Parameter",
  "alias": "language not supported bahasa zh-CHS",
  "official": "Jenis bahasa tidak disokong.",
  "cause": "Youdao guna zh-CHS / zh-CHT / en / ja / ko…; zh / zh-CN / cn tidak dikenali; strict=true dengan arah tak disokong juga gagal.",
  "fix": "Guna kod tepat dari jadual rasmi; jika ragu, from=auto dan strict lalai (false)."
 },
 "103": {
  "cat": "Parameter",
  "alias": "text too long panjang 5000",
  "official": "Teks terjemahan terlalu panjang.",
  "cause": "Had aksara setiap permintaan dilampaui (antara muka model/dokumen i ≤ 5000).",
  "fix": "Pecah mengikut ayat / perenggan dan hantar berkelompok; dokumen panjang melalui antara muka terjemahan dokumen."
 },
 "108": {
  "cat": "Auth / tandatangan",
  "alias": "appkey invalid id app app key",
  "trigger": "appKey salah, app belum dicipta / perkhidmatan belum diikat, atau tandatangan luput",
  "official": "ID app tidak sah. Daftar akaun, cipta app di konsol dan ikat perkhidmatan untuk dapatkan appKey dan appSecret.",
  "cause": "appKey hilang aksara / ada ruang; atau app tanpa instance perkhidmatan; kadang tandatangan luput (curtime jauh dari masa pelayan, ~120s).",
  "fix": "Sahkan appKey (tanpa ruang); sahkan instance diikat; curtime kini dalam saat.",
  "scene": "App baharu dipanggil terus tanpa mengikat instance terjemahan → 108 / 110."
 },
 "110": {
  "cat": "Perkhidmatan / instance",
  "alias": "no valid instance ikat tts",
  "trigger": "App belum mengikat instance yang diperlukan panggilan",
  "official": "Tiada instance perkhidmatan sah: app belum ikat instance, cipta dan ikat. Sebutan perlu instance TTS berasingan.",
  "cause": "Setiap app ikat satu instance per perkhidmatan - terjemahan / TTS / OCR berasingan; ikat terjemahan sahaja lalu minta voice → 110.",
  "fix": "Ikat di konsol setiap instance per perkhidmatan (terjemahan / TTS / OCR).",
  "scene": "Terjemahan OK tetapi minta suara dapat 110 - instance TTS tiada."
 },
 "111": {
  "cat": "Auth / tandatangan",
  "alias": "developer account invalid akaun",
  "official": "Akaun pembangun tidak sah.",
  "cause": "Akaun tanpa pengesahan pembangun, status luar biasa atau kawalan risiko.",
  "fix": "Semak status dan pengesahan sebenar / pembangun di konsol; tiket jika perlu."
 },
 "113": {
  "cat": "Parameter",
  "alias": "q empty kosong",
  "official": "q tidak boleh kosong.",
  "cause": "Medan q hilang atau kosong; dalam kelompok ada elemen kosong.",
  "fix": "Sahkan q tidak kosong sebelum panggil; tapis elemen kosong dalam kelompok."
 },
 "116": {
  "cat": "Parameter",
  "alias": "strict invalid",
  "official": "Nilai strict tidak sah; rujuk dokumentasi.",
  "cause": "strict hanya terima rentetan \"true\" / \"false\"; 1 / 0 dll gagal.",
  "fix": "strict sebagai \"true\" atau \"false\"; tanpa arah ketat, jangan hantar."
 },
 "201": {
  "cat": "Hasil / nyahsulit / lain",
  "alias": "decrypt nyahsulit des base64",
  "official": "Nyahsulit gagal: mungkin ralat DES, BASE64 atau URLDecode.",
  "cause": "Pada antara muka penyulitan pengangkutan, sifer / pengekodan / padding tak sepadan dengan persetujuan.",
  "fix": "Padankan dok antara muka tersulit: kunci/IV DES, BASE64 dan susunan URLDecode."
 },
 "202": {
  "cat": "Auth / tandatangan",
  "alias": "signature failed tandatangan sign auth",
  "trigger": "Paling kerap: rentetan tersusun salah, pengekodan, ruang",
  "official": "Pengesahan tandatangan gagal. Jika ID dan kunci betul tetapi kekal, biasanya pengekodan: pastikan q UTF-8.",
  "cause": "Tandatangan v3 = sha256(appKey + input + salt + curtime + appSecret), empat perangkap: ① susunan (mesti appKey→input→salt→curtime→appSecret); ② pemotongan input - q&gt;20: 10 + panjang + 10, ≤20: q, mengikut aksara Unicode bukan bait; ③ ruang/baris baharu dalam q atau kunci; ④ tiada UTF-8 sebelum SHA256, atau output bukan hex kecil.",
  "fix": "Sahkan dengan fungsi tandatangan SDK rasmi; cetak dan banding aksara demi aksara; hex kecil; untuk CJK/emoji potong per aksara.",
  "scene": "Inggeris OK, Cina panjang kadang 202 - truncation potong per bait; potong per aksara Unicode menyelesaikannya."
 },
 "203": {
  "cat": "Auth / tandatangan",
  "alias": "ip whitelist access ip list",
  "trigger": "OK di setempat tetapi gagal di awan / tukar mesin",
  "official": "IP akses tiada dalam senarai dibenarkan.",
  "cause": "Senarai putih IP aktif tetapi IP keluar awam tiada (penskalaan, keluaran dinamik, nyahpepijat setempat mengubahnya).",
  "fix": "Tambah IP keluar sebenar atau matikan sekatan jika selamat; dalam bekas guna keluaran tetap (NAT).",
  "scene": "Setempat OK, di awan 203 - IP keluar pelayan tiada dalam senarai."
 },
 "205": {
  "cat": "Auth / tandatangan",
  "alias": "platform type sdk api platform",
  "official": "Antara muka tak sepadan jenis platform app: selaraskan kaedah (SDK Android/iOS / API) dengan pilihan semasa cipta.",
  "cause": "Pilih «pelayan / API» tetapi panggil dengan SDK mudah alih (atau sebaliknya).",
  "fix": "Selaraskan jenis platform dengan kaedah sebenar; untuk panggilan pelayan, app «pelayan»."
 },
 "206": {
  "cat": "Auth / tandatangan",
  "alias": "timestamp curtime jam ntp",
  "trigger": "Jam bekas / VM tidak tepat",
  "official": "Timestamp tidak sah menyebabkan tandatangan gagal.",
  "cause": "curtime mesti UTC saat dan masuk tandatangan; hanyut, zon salah, milisaat atau nilai tetap membatalkannya (tandatangan ~120s).",
  "fix": "Timestamp Unix dalam saat; aktifkan NTP; segerakkan bekas dengan hos; jangan cache curtime.",
  "scene": "Bekas Docker jam hanyut → banyak 206; dengan NTP pulih."
 },
 "207": {
  "cat": "Auth / tandatangan",
  "alias": "replay salt uuid main semula",
  "trigger": "salt tetap atau hantar semula permintaan lama",
  "official": "Permintaan main semula. salt + curtime elak main semula (bukan 2x); salt sebaik-baiknya UUID.",
  "cause": "salt tetap / menaik / guna semula, atau retry menghantar semula salt + curtime lama.",
  "fix": "Jana salt rawak (UUID) dan segarkan curtime setiap permintaan; semasa retry, tandatangani semula.",
  "scene": "Tetapkan salt untuk hasilkan semula pepijat → 207 pada panggilan kedua."
 },
 "303": {
  "cat": "Hasil / nyahsulit / lain",
  "alias": "server error request_id",
  "official": "Pengecualian pelayan lain.",
  "cause": "Ralat dalaman pelayan, bukan masalah parameter klien; biasanya sementara.",
  "fix": "Cuba semula dengan backoff eksponen; jika berterusan, tiket dengan request_id."
 },
 "310": {
  "cat": "Perkhidmatan / instance",
  "alias": "domain rejectFallback domain",
  "official": "Perkhidmatan terjemahan domain belum diaktifkan.",
  "cause": "Hantar domain tetapi konsol belum aktifkan domain itu.",
  "fix": "Aktifkan terjemahan domain lalu hantar domain / rejectFallback, atau buang domain untuk terjemahan umum."
 },
 "401": {
  "cat": "Akaun / pengebilan / had",
  "alias": "baki tambah nilai arrears balance",
  "trigger": "Tiba-tiba semua gagal",
  "official": "Akaun sudah berhutang; sila tambah nilai.",
  "cause": "Baki / pakej aksara habis menghentikan perkhidmatan; pascabayar tak aktif atau pakej terpakai.",
  "fix": "Tambah nilai atau beli pakej; amaran baki / penggunaan; saluran sandaran untuk kritikal.",
  "scene": "Hujung bulan pakej habis, semua 401; selepas tambah nilai pulih."
 },
 "411": {
  "cat": "Akaun / pengebilan / had",
  "alias": "qps rate limit had frekuensi",
  "trigger": "Kerap muncul semasa keserentakan / ujian beban",
  "official": "Frekuensi akses dihadkan; cuba lagi nanti.",
  "cause": "QPS app dilampaui (asas ~100, boleh tambah di konsol); keserentakan mengejut tanpa hadan klien.",
  "fix": "Token bucket / leaky bucket + backoff eksponen; gabung / sebar permintaan; beli QPS jika perlu.",
  "scene": "Puncak beban tepu → banyak 411; dengan penghad stabil."
 },
 "412": {
  "cat": "Akaun / pengebilan / had",
  "alias": "long request permintaan panjang",
  "official": "Permintaan panjang terlalu kerap; cuba lagi nanti.",
  "cause": "Teks panjang / antara muka berat terlalu padat dalam masa singkat.",
  "fix": "Kurangkan frekuensi permintaan panjang (beberapa saat jarak); teks panjang melalui antara muka dokumen."
 },
 "500": {
  "cat": "Hasil / nyahsulit / lain",
  "alias": "translate failed errormessage",
  "official": "Terjemahan gagal; lihat errorMessage.",
  "cause": "Kegagalan umum pelayan; perlu errorMessage untuk punca tepat.",
  "fix": "Kesan melalui errorMessage / request_id; semak gabungan from / to / q."
 },
 "902000": {
  "cat": "Hasil / nyahsulit / lain",
  "alias": "llm model besar",
  "official": "Panggilan terjemahan model besar gagal.",
  "cause": "Anomali aliran model besar atau input tak sah (i ≤ 5000, had panjang prompt…).",
  "fix": "Semak input dan had panjang; cuba semula dengan backoff dan request_id."
 }
};
window.LABELS = {"miss": "Kod tiada dalam senarai; cuba kod atau kata kunci lain, atau lihat jadual penuh di bawah.", "codeword": "Kod ralat "};
window.FIELDS = [["trigger", "Bila muncul"], ["official", "Maksud rasmi L1"], ["cause", "Punca akar L2"], ["fix", "Cara diagnosis / atasi"], ["scene", "Kes sebenar"]];
window.THEAD = ["Kod", "Kategori", "Maksud rasmi L1", "Punca akar L2"];
