window.CODES = {
 "101": {
  "cat": "參數類",
  "alias": "缺少必填參數 missing required parameter 缺參",
  "trigger": "首次聯調、或從 v1 老介面遷 v3 時漏欄位",
  "official": "缺少必填的參數。先確保必填參數齊全，再確認參數書寫（大小寫）是否正確。",
  "cause": "v3 文字翻譯必填 8 項：q、from、to、appKey、salt、sign、signType、curtime。少任一個、或欄位名大小寫寫錯都會判 101。v1 老介面沒有 curtime / signType，遷 v3 最常漏這兩個。",
  "fix": "對照官方參數表逐個核對必填項；確認 signType=v3、curtime 必傳且為秒級時間戳。",
  "scene": "照 v1 demo 改 v3、忘加 curtime 與 signType，一直 101。"
 },
 "102": {
  "cat": "參數類",
  "alias": "不支援的語言類型 language not supported 語種 zh-CHS",
  "trigger": "from / to 傳了不在支援列表的語種代碼",
  "official": "不支援的語言類型。",
  "cause": "有道用 zh-CHS（簡體）、zh-CHT（繁體）、en、ja、ko 等代碼；寫成 zh / zh-CN / cn 不被辨識。strict=true 且 from→to 方向不支援時也會報。",
  "fix": "對照官方「支援語言」表用準確代碼；不確定方向就 from=auto，並把 strict 留預設 false。",
  "scene": "把簡體寫成 zh-CN 報 102，改 zh-CHS 即通。"
 },
 "103": {
  "cat": "參數類",
  "alias": "翻譯文字過長 text too long 長度 5000",
  "trigger": "單次 q 文字超過長度上限",
  "official": "翻譯文字過長。",
  "cause": "單次請求字元數超限（大模型 / 文件類介面 i 限 5000 字元），常因整篇長文未切分就提交。",
  "fix": "按句 / 段切分後分批請求；長文件走文件翻譯介面而非文字翻譯。",
  "scene": "整頁文章一次性提交報 103，按段切分後正常。"
 },
 "108": {
  "cat": "鑑權 / 簽章類",
  "alias": "應用ID無效 appkey invalid 應用id",
  "trigger": "appKey 錯、應用未建立 / 未綁定服務，或簽章逾時",
  "official": "應用ID無效。註冊帳號、登入控制台建立應用並完成服務綁定後，可獲得應用ID與應用金鑰。",
  "cause": "appKey 複製漏字 / 帶空白；或應用建了但沒綁定對應服務實例。部分情境下簽章逾時（curtime 與伺服器時間相差過大、超約 120s 有效期）也會表現為鑑權失敗。",
  "fix": "控制台核對 appKey（去空白）；確認應用已綁定本介面的服務實例；保證 curtime 為當前秒級時間。",
  "scene": "新建應用直接呼叫、忘了綁定文字翻譯實例，報 108 / 110。"
 },
 "110": {
  "cat": "服務 / 實例類",
  "alias": "無相關服務的有效實例 no valid instance 綁定 tts 語音合成",
  "trigger": "應用沒綁定本次呼叫所需的服務實例",
  "official": "無相關服務的有效實例：應用沒有綁定服務實例，可新建並綁定。註：翻譯結果發音需 TTS 實例，要單獨在控制台建立語音合成實例並綁定後才能用。",
  "cause": "一個應用要分別綁定它用到的每種服務實例——文字翻譯、語音合成（TTS）、OCR 各自獨立。只綁了翻譯卻帶 voice 取發音 → 110。",
  "fix": "控制台為應用依服務逐個綁定實例（翻譯 / 語音合成 / OCR）。",
  "scene": "翻譯正常、但帶 voice 取發音時報 110——TTS 實例沒綁。"
 },
 "111": {
  "cat": "鑑權 / 簽章類",
  "alias": "開發者帳號無效 developer account invalid",
  "official": "開發者帳號無效。",
  "cause": "帳號未完成開發者認證、狀態異常或被風控。",
  "fix": "登入控制台確認帳號狀態與實名 / 開發者認證；必要時開工單。"
 },
 "113": {
  "cat": "參數類",
  "alias": "q不能為空 q empty 空",
  "official": "q 不能為空。",
  "cause": "q 欄位缺失或為空字串；批次介面裡某個元素為空。",
  "fix": "呼叫前校驗 q 非空；批次請求過濾空元素。"
 },
 "116": {
  "cat": "參數類",
  "alias": "strict 取值無效 strict invalid",
  "official": "strict 欄位取值無效，請參考文件填寫正確參數值。",
  "cause": "strict 只接受字串 \"true\" / \"false\"，傳了 1 / 0 或其它值。",
  "fix": "strict 傳字串 \"true\" 或 \"false\"；不需要嚴格方向就別傳。"
 },
 "201": {
  "cat": "結果 / 解密 / 其它類",
  "alias": "解密失敗 des base64 urldecode decrypt",
  "official": "解密失敗，可能為 DES、BASE64、URLDecode 的錯誤。",
  "cause": "用了傳輸加密的介面時，密文 / 編碼 / 填充方式與約定不符。",
  "fix": "對照加密介面文件核對 DES 金鑰 / IV、BASE64、URLDecode 的順序與字元集。"
 },
 "202": {
  "cat": "鑑權 / 簽章類",
  "alias": "簽章驗證失敗 signature failed 簽名錯誤 sign 鑑權",
  "trigger": "最高頻報錯：簽章字串拼錯、編碼不對、金鑰帶空白",
  "official": "簽章驗證失敗。若已確認應用 ID 與金鑰正確仍回傳 202，一般是編碼問題——請確保 q 為 UTF-8 編碼。",
  "cause": "v3 簽章 = sha256(應用ID + input + salt + curtime + 應用金鑰)，四個坑：① 拼接順序錯（必須 appKey→input→salt→curtime→appSecret）；② input 截斷沒做對——q 長度&gt;20 時 input = 前 10 字元 + q 長度 + 後 10 字元，≤20 取 q 本身，且按 Unicode 字元數而非位元組；③ q 或金鑰帶了複製進來的空白 / 換行；④ 沒用 UTF-8 編碼再做 SHA256，或輸出沒轉十六進位小寫。",
  "fix": "用官方 SDK 的簽章函式驗算；列印拼接字串逐位比對；確認 SHA256 輸出為十六進位小寫；q 含中文 / emoji 時按字元數（非位元組）做 truncate。",
  "scene": "翻譯英文正常、翻譯長中文偶發 202——truncate 把多位元組按位元組切了，按 Unicode 字元切即修復。"
 },
 "203": {
  "cat": "鑑權 / 簽章類",
  "alias": "ip 白名單 access ip list 不在列表",
  "trigger": "本機能調、上雲 / 換機器後報",
  "official": "存取 IP 位址不在可存取 IP 列表。",
  "cause": "控制台為應用開了 IP 白名單，但呼叫方公網出口 IP 不在列表（伺服器擴容、動態出口、本機除錯都會變）。",
  "fix": "把實際出口 IP 加入白名單，或在可接受的安全前提下關閉 IP 限制；容器 / 彈性環境用固定出口（NAT 閘道）。",
  "scene": "本機能調、上雲後 203——伺服器出口 IP 沒加白名單。"
 },
 "205": {
  "cat": "鑑權 / 簽章類",
  "alias": "介面與平台類型不一致 platform type sdk api",
  "official": "請求的介面與應用的平台類型不一致：確保接入方式（Android SDK / iOS SDK / API）與建立應用時選的平台類型一致。",
  "cause": "建應用時選了「伺服器端 / API」，卻用行動 SDK 呼叫（或相反）。",
  "fix": "讓應用平台類型與實際接入方式一致；伺服端呼叫就建「伺服器端」應用。"
 },
 "206": {
  "cat": "鑑權 / 簽章類",
  "alias": "時間戳無效 timestamp curtime 時鐘 ntp",
  "trigger": "容器 / 虛機時鐘不準時",
  "official": "因為時間戳無效導致簽章驗證失敗。",
  "cause": "curtime 必須是當前 UTC 秒級時間戳並參與簽章；機器時鐘漂移、時區錯、用了毫秒或固定值，都會讓 curtime 失效（簽章約 120s 有效期）。",
  "fix": "用秒級 Unix 時間戳；伺服器開 NTP 校時；容器同步宿主時鐘；別快取 / 複用舊 curtime。",
  "scene": "Docker 容器時鐘漂移幾分鐘，線上批次 206，NTP 同步後恢復。"
 },
 "207": {
  "cat": "鑑權 / 簽章類",
  "alias": "重放請求 replay salt uuid",
  "trigger": "salt 用了固定值或重送舊請求",
  "official": "重放請求。介面用 salt + curtime 防重放（同一請求不可被請求 2 次），salt 最好為 UUID。",
  "cause": "salt 用了固定值 / 自增 / 複用，或重試時連同舊 salt + curtime 一起重送，被判為重放。",
  "fix": "每次請求都新產生隨機 salt（UUID）並刷新 curtime；失敗重試必須重新簽章。",
  "scene": "為重現 bug 寫死 salt，第二次呼叫就 207。"
 },
 "303": {
  "cat": "結果 / 解密 / 其它類",
  "alias": "伺服端其它異常 server error request_id",
  "official": "伺服端的其它異常。",
  "cause": "伺服端內部錯誤，非用戶端參數問題，多為臨時波動。",
  "fix": "指數退避重試；持續出現就帶 request_id 開工單。"
 },
 "310": {
  "cat": "服務 / 實例類",
  "alias": "未開通領域翻譯 domain rejectFallback",
  "official": "未開通領域翻譯服務。",
  "cause": "傳了 domain 走領域化翻譯，但控制台沒開通對應領域。",
  "fix": "控制台開通領域化翻譯再傳 domain / rejectFallback，或去掉 domain 走通用翻譯。"
 },
 "401": {
  "cat": "帳號 / 計費 / 限流類",
  "alias": "帳戶欠費 餘額 儲值 arrears balance",
  "trigger": "呼叫突然全部失敗",
  "official": "帳戶已經欠費，請進行帳戶儲值。",
  "cause": "帳戶餘額 / 字元資源包耗盡觸發欠費停服；後付費沒開或資源包用完。",
  "fix": "控制台儲值或購買資源包；設餘額 / 用量告警；關鍵業務備一個兜底翻譯通道。",
  "scene": "月底字元包用盡，線上翻譯全 401，儲值後恢復。"
 },
 "411": {
  "cat": "帳號 / 計費 / 限流類",
  "alias": "存取頻率受限 qps rate limit 限流 頻率",
  "trigger": "並發 / 壓測時大量出現",
  "official": "存取頻率受限，請稍後存取。",
  "cause": "超出應用 QPS 上限（基礎約 100 QPS，可在控制台疊加購買）；突發並發未做用戶端限速。",
  "fix": "用戶端做權杖桶 / 漏桶限速 + 指數退避重試；合併 / 分散請求；需要更高並發就疊加購買 QPS。",
  "scene": "壓測瞬時並發打滿，大面積 411，加限速器後穩定。"
 },
 "412": {
  "cat": "帳號 / 計費 / 限流類",
  "alias": "長請求過於頻繁 long request",
  "official": "長請求過於頻繁，請稍後存取。",
  "cause": "長文字 / 重介面短時間內過於密集。",
  "fix": "降低長請求頻率（間隔幾秒）；長文走文件翻譯介面。"
 },
 "500": {
  "cat": "結果 / 解密 / 其它類",
  "alias": "翻譯失敗 errormessage",
  "official": "翻譯失敗，請參考 errorMessage。",
  "cause": "伺服端回傳的兜底失敗，需結合 errorMessage 看具體原因。",
  "fix": "讀 errorMessage / request_id 定位；核對 from / to / q 組合。"
 },
 "902000": {
  "cat": "結果 / 解密 / 其它類",
  "alias": "大模型翻譯呼叫失敗 llm 大模型",
  "official": "大模型翻譯呼叫失敗（大模型翻譯介面）。",
  "cause": "大模型翻譯鏈路異常或入參不合規（i 限 5000 字元、prompt 有長度限制等）。",
  "fix": "核對大模型介面入參與長度限制；指數退避重試並帶 request_id。"
 }
};
window.LABELS = {"miss": "未收錄此錯誤碼，換個碼或關鍵字，或看下方全表。", "codeword": "錯誤碼 "};
window.FIELDS = [["trigger", "什麼時候出現"], ["official", "L1 官方含義"], ["cause", "L2 深度真因"], ["fix", "怎麼排查 / 解決"], ["scene", "真實情境"]];
window.THEAD = ["錯誤碼", "分類", "L1 官方含義", "L2 深度真因"];
