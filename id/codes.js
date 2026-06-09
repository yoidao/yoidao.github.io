window.CODES = {
 "101": {
  "cat": "Parameter",
  "alias": "missing required parameter parameter hilang",
  "trigger": "Integrasi pertama atau migrasi v1 → v3",
  "official": "Parameter wajib hilang. Pastikan yang wajib lengkap, lalu cek penulisan (huruf besar/kecil).",
  "cause": "v3 butuh 8: q、from、to、appKey、salt、sign、signType、curtime. Satu hilang atau nama salah = 101; v1 tak punya curtime / signType (paling sering terlupa saat migrasi).",
  "fix": "Cocokkan dengan tabel parameter resmi; pastikan signType=v3 dan curtime (timestamp detik) ada.",
  "scene": "Mengubah demo v1 ke v3 lupa curtime dan signType → 101 terus."
 },
 "102": {
  "cat": "Parameter",
  "alias": "language not supported bahasa zh-CHS",
  "official": "Tipe bahasa tidak didukung.",
  "cause": "Youdao pakai zh-CHS / zh-CHT / en / ja / ko…; zh / zh-CN / cn tidak dikenali; strict=true dengan arah tak didukung juga gagal.",
  "fix": "Pakai kode persis dari tabel resmi; jika ragu, from=auto dan strict default (false)."
 },
 "103": {
  "cat": "Parameter",
  "alias": "text too long panjang 5000",
  "official": "Teks terjemahan terlalu panjang.",
  "cause": "Batas karakter per permintaan terlampaui (antarmuka model/dokumen i ≤ 5000).",
  "fix": "Pecah per kalimat / paragraf dan kirim per batch; dokumen panjang lewat antarmuka terjemahan dokumen."
 },
 "108": {
  "cat": "Auth / tanda tangan",
  "alias": "appkey invalid id app app key",
  "trigger": "appKey salah, app belum dibuat / layanan belum terikat, atau tanda tangan kedaluwarsa",
  "official": "ID app tidak valid. Daftar akun, buat app di konsol, dan ikat layanan untuk mendapat appKey dan appSecret.",
  "cause": "appKey kurang karakter / spasi; atau app tanpa instance layanan; kadang tanda tangan kedaluwarsa (curtime jauh dari waktu server, ~120s).",
  "fix": "Verifikasi appKey (tanpa spasi); pastikan instance terikat; curtime kini dalam detik.",
  "scene": "App baru langsung dipanggil tanpa mengikat instance terjemahan → 108 / 110."
 },
 "110": {
  "cat": "Layanan / instance",
  "alias": "no valid instance ikat tts",
  "trigger": "App belum mengikat instance yang dibutuhkan panggilan",
  "official": "Tak ada instance layanan valid: app belum mengikat instance, buat dan ikat. Pelafalan butuh instance TTS terpisah.",
  "cause": "Tiap app mengikat satu instance per layanan - terjemahan / TTS / OCR terpisah; mengikat terjemahan saja lalu minta voice → 110.",
  "fix": "Ikat di konsol tiap instance per layanan (terjemahan / TTS / OCR).",
  "scene": "Terjemahan OK tapi minta suara dapat 110 - instance TTS tak ada."
 },
 "111": {
  "cat": "Auth / tanda tangan",
  "alias": "developer account invalid akun",
  "official": "Akun pengembang tidak valid.",
  "cause": "Akun tanpa verifikasi pengembang, status tak normal, atau kontrol risiko.",
  "fix": "Cek status dan verifikasi asli / pengembang di konsol; tiket bila perlu."
 },
 "113": {
  "cat": "Parameter",
  "alias": "q empty kosong",
  "official": "q tidak boleh kosong.",
  "cause": "Field q hilang atau kosong; pada batch ada elemen kosong.",
  "fix": "Validasi q tidak kosong sebelum memanggil; saring elemen kosong pada batch."
 },
 "116": {
  "cat": "Parameter",
  "alias": "strict invalid",
  "official": "Nilai strict tidak valid; lihat dokumentasi.",
  "cause": "strict hanya menerima string \"true\" / \"false\"; 1 / 0 dll gagal.",
  "fix": "strict sebagai \"true\" atau \"false\"; tanpa arah ketat, jangan dikirim."
 },
 "201": {
  "cat": "Hasil / dekripsi / lainnya",
  "alias": "decrypt dekripsi des base64",
  "official": "Dekripsi gagal: mungkin error DES, BASE64, atau URLDecode.",
  "cause": "Pada antarmuka enkripsi transport, ciphertext / encoding / padding tak sesuai kesepakatan.",
  "fix": "Cocokkan dok antarmuka terenkripsi: kunci/IV DES, BASE64, dan urutan URLDecode."
 },
 "202": {
  "cat": "Auth / tanda tangan",
  "alias": "signature failed tanda tangan sign auth",
  "trigger": "Tersering: string salah susun, encoding, spasi",
  "official": "Verifikasi tanda tangan gagal. Jika ID dan kunci benar tapi tetap, biasanya encoding: pastikan q UTF-8.",
  "cause": "Tanda tangan v3 = sha256(appKey + input + salt + curtime + appSecret), empat jebakan: ① urutan (harus appKey→input→salt→curtime→appSecret); ② pemotongan input - q&gt;20: 10 + panjang + 10, ≤20: q, per karakter Unicode bukan byte; ③ spasi/baris baru di q atau kunci; ④ tanpa UTF-8 sebelum SHA256, atau output bukan hex kecil.",
  "fix": "Verifikasi dengan fungsi tanda tangan SDK resmi; cetak dan banding karakter per karakter; hex kecil; untuk CJK/emoji potong per karakter.",
  "scene": "Inggris OK, Mandarin panjang kadang 202 - truncation memotong per byte; potong per karakter Unicode menyelesaikan."
 },
 "203": {
  "cat": "Auth / tanda tangan",
  "alias": "ip whitelist access ip list",
  "trigger": "OK di lokal tapi gagal di cloud / ganti mesin",
  "official": "IP akses tidak ada di daftar yang diizinkan.",
  "cause": "Whitelist IP aktif tapi IP keluar publik tidak ada (penskalaan, keluaran dinamis, debug lokal mengubahnya).",
  "fix": "Tambah IP keluar asli atau matikan batasan bila aman; di kontainer pakai keluaran tetap (NAT).",
  "scene": "Lokal OK, di cloud 203 - IP keluar server tak ada di daftar."
 },
 "205": {
  "cat": "Auth / tanda tangan",
  "alias": "platform type sdk api platform",
  "official": "Antarmuka tak cocok tipe platform app: selaraskan metode (SDK Android/iOS / API) dengan pilihan saat membuat.",
  "cause": "Memilih «server / API» tapi memanggil dengan SDK seluler (atau sebaliknya).",
  "fix": "Selaraskan tipe platform dengan metode nyata; untuk panggilan server, app «server»."
 },
 "206": {
  "cat": "Auth / tanda tangan",
  "alias": "timestamp curtime jam ntp",
  "trigger": "Jam kontainer / VM tak akurat",
  "official": "Timestamp tidak valid sehingga tanda tangan gagal.",
  "cause": "curtime harus UTC detik dan masuk tanda tangan; melenceng, zona salah, milidetik, atau nilai tetap membatalkannya (tanda tangan ~120s).",
  "fix": "Timestamp Unix dalam detik; aktifkan NTP; sinkronkan kontainer dengan host; jangan cache curtime.",
  "scene": "Kontainer Docker jam melenceng → banyak 206; dengan NTP pulih."
 },
 "207": {
  "cat": "Auth / tanda tangan",
  "alias": "replay salt uuid pengulangan",
  "trigger": "salt tetap atau kirim ulang permintaan lama",
  "official": "Permintaan replay. salt + curtime cegah replay (tak 2x); salt sebaiknya UUID.",
  "cause": "salt tetap / menaik / dipakai ulang, atau retry mengirim ulang salt + curtime lama.",
  "fix": "Buat salt acak (UUID) dan segarkan curtime tiap permintaan; saat retry, tandatangani ulang.",
  "scene": "Menetapkan salt untuk mereproduksi bug → 207 di panggilan kedua."
 },
 "303": {
  "cat": "Hasil / dekripsi / lainnya",
  "alias": "server error request_id",
  "official": "Pengecualian server lainnya.",
  "cause": "Error internal server, bukan masalah parameter klien; biasanya sesaat.",
  "fix": "Coba lagi dengan backoff eksponensial; bila terus, tiket dengan request_id."
 },
 "310": {
  "cat": "Layanan / instance",
  "alias": "domain rejectFallback domain",
  "official": "Layanan terjemahan domain belum diaktifkan.",
  "cause": "Mengirim domain tapi konsol belum mengaktifkan domain itu.",
  "fix": "Aktifkan terjemahan domain lalu kirim domain / rejectFallback, atau buang domain untuk terjemahan umum."
 },
 "401": {
  "cat": "Akun / penagihan / batas",
  "alias": "saldo isi ulang arrears balance",
  "trigger": "Tiba-tiba semua gagal",
  "official": "Akun sudah tekor; isi ulang.",
  "cause": "Saldo / paket karakter habis menghentikan layanan; pascabayar tak aktif atau paket terpakai.",
  "fix": "Isi ulang atau beli paket; peringatan saldo / pemakaian; kanal cadangan untuk yang kritis.",
  "scene": "Akhir bulan paket habis, semua 401; setelah isi ulang pulih."
 },
 "411": {
  "cat": "Akun / penagihan / batas",
  "alias": "qps rate limit batas frekuensi",
  "trigger": "Sering muncul saat konkurensi / uji beban",
  "official": "Frekuensi akses dibatasi; coba lagi nanti.",
  "cause": "QPS app terlampaui (basis ~100, bisa ditambah di konsol); konkurensi mendadak tanpa pembatasan klien.",
  "fix": "Token bucket / leaky bucket + backoff eksponensial; gabung / sebar permintaan; beli QPS bila perlu.",
  "scene": "Puncak beban jenuh → banyak 411; dengan limiter stabil."
 },
 "412": {
  "cat": "Akun / penagihan / batas",
  "alias": "long request permintaan panjang",
  "official": "Permintaan panjang terlalu sering; coba lagi nanti.",
  "cause": "Teks panjang / antarmuka berat terlalu padat dalam waktu singkat.",
  "fix": "Kurangi frekuensi permintaan panjang (jeda beberapa detik); teks panjang lewat antarmuka dokumen."
 },
 "500": {
  "cat": "Hasil / dekripsi / lainnya",
  "alias": "translate failed errormessage",
  "official": "Terjemahan gagal; lihat errorMessage.",
  "cause": "Kegagalan umum server; butuh errorMessage untuk penyebab pasti.",
  "fix": "Lacak via errorMessage / request_id; periksa kombinasi from / to / q."
 },
 "902000": {
  "cat": "Hasil / dekripsi / lainnya",
  "alias": "llm model besar",
  "official": "Panggilan terjemahan model besar gagal.",
  "cause": "Anomali alur model besar atau input tak valid (i ≤ 5000, batas panjang prompt…).",
  "fix": "Periksa input dan batas panjang; coba lagi dengan backoff dan request_id."
 }
};
window.LABELS = {"miss": "Kode tidak terdaftar; coba kode atau kata kunci lain, atau lihat tabel lengkap di bawah.", "codeword": "Kode error "};
window.FIELDS = [["trigger", "Kapan muncul"], ["official", "Arti resmi L1"], ["cause", "Akar masalah L2"], ["fix", "Cara mendiagnosis / mengatasi"], ["scene", "Kasus nyata"]];
window.THEAD = ["Kode", "Kategori", "Arti resmi L1", "Akar masalah L2"];
