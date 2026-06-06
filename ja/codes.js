window.CODES = {
 "101": {
  "cat": "パラメータ",
  "alias": "missing required parameter 必須 欠落 signtype curtime",
  "trigger": "初回接続、または v1 から v3 移行時の項目漏れ",
  "official": "必須パラメータが不足。まず必須項目を揃え、次に記述（大文字小文字）を確認。",
  "cause": "v3 テキスト翻訳の必須は 8 項：q、from、to、appKey、salt、sign、signType、curtime。いずれか欠落や項目名の大小ミスで 101。v1 には curtime / signType が無く、移行時に最も漏れやすい。",
  "fix": "公式パラメータ表で必須項目を一つずつ確認；signType=v3 と curtime（秒単位）を必ず付与。",
  "scene": "v1 デモを v3 に直す際に curtime と signType を忘れ、ずっと 101。"
 },
 "102": {
  "cat": "パラメータ",
  "alias": "unsupported language 言語 zh-CHS",
  "trigger": "from / to が対応外の言語コード",
  "official": "対応していない言語タイプ。",
  "cause": "有道は zh-CHS（簡体）、zh-CHT（繁体）、en、ja、ko 等。zh / zh-CN / cn は不可。strict=true で from→to 方向が非対応でもエラー。",
  "fix": "公式「対応言語」表の正確なコードを使用；不明なら from=auto、strict は既定 false。",
  "scene": "簡体を zh-CN と書いて 102、zh-CHS で解消。"
 },
 "103": {
  "cat": "パラメータ",
  "alias": "text too long 長さ 5000",
  "trigger": "1 回の q が長さ上限超過",
  "official": "翻訳テキストが長すぎる。",
  "cause": "1 リクエストの文字数が上限超過（大模型 / ドキュメント系の i は 5000 文字）。長文を分割せず投入しがち。",
  "fix": "文 / 段落で分割しバッチ化；長文はドキュメント翻訳エンドポイントへ。",
  "scene": "記事を丸ごと投入して 103、段落分割で正常。"
 },
 "108": {
  "cat": "認証 / 署名",
  "alias": "app id invalid appkey",
  "trigger": "appKey 誤り、アプリ未作成 / 未紐付け、または署名タイムアウト",
  "official": "アプリ ID が無効。アカウント登録、コンソールでアプリ作成とサービス紐付け後に ID と密鑰を取得。",
  "cause": "appKey のコピー欠け / 空白混入；またはアプリがサービスインスタンス未紐付け。署名タイムアウト（curtime とサーバ時刻の差が約 120 秒超）も認証失敗として現れることがある。",
  "fix": "コンソールで appKey を確認（空白除去）；本エンドポイントのインスタンス紐付けを確認；curtime を現在の秒に。",
  "scene": "新規アプリで紐付けせず呼び、108 / 110。"
 },
 "110": {
  "cat": "サービス / インスタンス",
  "alias": "no valid instance 紐付け tts 音声合成",
  "trigger": "呼び出しに必要なインスタンスを未紐付け",
  "official": "有効なサービスインスタンスが無い：アプリがインスタンス未紐付け、新規作成し紐付け可。注：翻訳結果の発音には TTS インスタンスが必要、コンソールで音声合成インスタンスを別途作成・紐付け。",
  "cause": "アプリは使う各サービスのインスタンスを個別に紐付け（テキスト翻訳・音声合成 TTS・OCR は別）。翻訳のみ紐付けで voice 発音を取ると 110。",
  "fix": "コンソールでサービスごとに紐付け（翻訳 / 音声合成 / OCR）。",
  "scene": "翻訳は正常、voice 発音で 110——TTS 未紐付け。"
 },
 "111": {
  "cat": "認証 / 署名",
  "alias": "developer account invalid 開発者",
  "official": "開発者アカウントが無効。",
  "cause": "開発者認証未完了、状態異常、またはリスク制御。",
  "fix": "コンソールでアカウント状態と認証を確認；必要ならチケット。"
 },
 "113": {
  "cat": "パラメータ",
  "alias": "q empty 空",
  "official": "q を空にできない。",
  "cause": "q が欠落 / 空文字；バッチ内に空要素。",
  "fix": "呼び出し前に q 非空を検証；バッチは空要素を除外。"
 },
 "116": {
  "cat": "パラメータ",
  "alias": "strict invalid",
  "official": "strict の値が無効。ドキュメント通り正しい値を。",
  "cause": "strict は文字列 \"true\" / \"false\" のみ。1 / 0 等は不可。",
  "fix": "strict は \"true\" / \"false\"；不要なら付けない。"
 },
 "201": {
  "cat": "結果 / 復号 / その他",
  "alias": "decrypt failed des base64 urldecode",
  "official": "復号失敗——DES、BASE64、URLDecode の誤りの可能性。",
  "cause": "伝送暗号化のエンドポイントで、暗号文 / エンコード / パディングが取り決めと不一致。",
  "fix": "暗号化エンドポイントの DES 鍵 / IV、BASE64、URLDecode の順序と文字集合を確認。"
 },
 "202": {
  "cat": "認証 / 署名",
  "alias": "signature failed 署名 sign 認証",
  "trigger": "最頻エラー：署名文字列のミス、エンコード不正、鍵に空白",
  "official": "署名検証失敗。ID と密鑰が正しくても 202 なら、概ねエンコード問題——q を UTF-8 に。",
  "cause": "v3 署名 = sha256(appKey + input + salt + curtime + appSecret)。4 つの罠：① 順序ミス（appKey→input→salt→curtime→appSecret）；② input 切り出しの誤り——q が 20 文字超は先頭 10 + q の長さ + 末尾 10、20 以下は q そのもの、バイトでなく Unicode 文字数；③ q や鍵にコピー時の空白 / 改行；④ UTF-8 で SHA256 していない、または十六進小文字に変換していない。",
  "fix": "公式 SDK の署名関数で検算；連結文字列を出力し一文字ずつ照合；SHA256 を十六進小文字に；中国語 / 絵文字の q は文字数で truncate。",
  "scene": "英語は正常、長い中国語で時々 202——truncate がバイト切り、Unicode 文字切りで解消。"
 },
 "203": {
  "cat": "認証 / 署名",
  "alias": "ip allowlist access ip",
  "trigger": "ローカルは通る、クラウド / マシン変更後に発生",
  "official": "アクセス IP が許可リストに無い。",
  "cause": "アプリに IP 許可リストを設定したが、呼び出し側の公網出口 IP が未登録（スケール、動的出口、ローカル検証で変わる）。",
  "fix": "実際の出口 IP を許可リストへ、または許容範囲で IP 制限を解除；コンテナ / 弾性環境は固定出口（NAT ゲートウェイ）。",
  "scene": "ローカルは通る、クラウドで 203——サーバ出口 IP 未登録。"
 },
 "205": {
  "cat": "認証 / 署名",
  "alias": "platform type mismatch sdk api",
  "official": "エンドポイントとアプリのプラットフォーム種別が不一致：接続方式（Android SDK / iOS SDK / API）を作成時の種別と一致させる。",
  "cause": "「サーバ / API」で作成したのにモバイル SDK で呼ぶ（逆も）。",
  "fix": "アプリ種別を実際の接続方式に合わせる；サーバ呼び出しは「サーバ」アプリを作成。"
 },
 "206": {
  "cat": "認証 / 署名",
  "alias": "invalid timestamp curtime 時計 ntp",
  "trigger": "コンテナ / VM の時計がずれている時",
  "official": "タイムスタンプが無効で署名検証失敗。",
  "cause": "curtime は現在の UTC 秒で署名に使用；時計ずれ、時区誤り、ミリ秒や固定値で無効化（署名は約 120 秒有効）。",
  "fix": "秒単位 Unix タイムスタンプ；サーバで NTP；コンテナをホスト時計に同期；古い curtime を再利用しない。",
  "scene": "Docker の時計が数分ずれ、本番で大量 206、NTP 同期で回復。"
 },
 "207": {
  "cat": "認証 / 署名",
  "alias": "replay salt uuid リプレイ",
  "trigger": "salt 固定、または旧リクエスト再送",
  "official": "リプレイ要求。salt + curtime でリプレイ防止（同一要求は 2 回不可）、salt は UUID 推奨。",
  "cause": "salt が固定 / 連番 / 再利用、または再試行で旧 salt + curtime を再送し、リプレイ判定。",
  "fix": "毎回ランダム salt（UUID）と新しい curtime；再試行は必ず再署名。",
  "scene": "バグ再現で salt を固定し、2 回目で 207。"
 },
 "303": {
  "cat": "結果 / 復号 / その他",
  "alias": "server error request_id",
  "official": "サーバ側のその他の異常。",
  "cause": "サーバ内部エラー、クライアントのパラメータ問題ではなく多くは一時的。",
  "fix": "指数バックオフで再試行；継続なら request_id 付きでチケット。"
 },
 "310": {
  "cat": "サービス / インスタンス",
  "alias": "domain not enabled rejectFallback 領域",
  "official": "領域翻訳サービスが未開通。",
  "cause": "domain で領域翻訳を指定したが、コンソールで該当領域が未開通。",
  "fix": "コンソールで領域翻訳を開通してから domain / rejectFallback、または domain を外して通用翻訳。"
 },
 "401": {
  "cat": "アカウント / 課金 / レート制限",
  "alias": "arrears balance チャージ 残高",
  "trigger": "急に全呼び出しが失敗",
  "official": "アカウントが残高不足——チャージを。",
  "cause": "残高 / 文字パック枯渇で停止；後払い未開通かパック消尽。",
  "fix": "コンソールでチャージかパック購入；残高 / 使用量アラート；重要業務は代替チャネル。",
  "scene": "月末に文字パック枯渇、本番翻訳が全 401、チャージで回復。"
 },
 "411": {
  "cat": "アカウント / 課金 / レート制限",
  "alias": "rate limit qps 頻度 制限",
  "trigger": "同時実行 / 負荷試験で大量発生",
  "official": "アクセス頻度制限——しばらくして再試行。",
  "cause": "アプリの QPS 上限超過（基本約 100、コンソールで追加購入可）；突発同時実行でクライアント側レート制限なし。",
  "fix": "クライアントでトークン / リーキーバケット + 指数バックオフ；結合 / 分散；高同時実行は QPS 追加購入。",
  "scene": "負荷試験の突発で QPS 飽和、大量 411、レートリミッタで安定。"
 },
 "412": {
  "cat": "アカウント / 課金 / レート制限",
  "alias": "long request too frequent 長文",
  "official": "長リクエストが頻繁すぎ——しばらくして再試行。",
  "cause": "長文 / 重エンドポイントを短時間に密集呼び出し。",
  "fix": "長リクエスト頻度を下げる（数秒間隔）；長文はドキュメント翻訳へ。"
 },
 "500": {
  "cat": "結果 / 復号 / その他",
  "alias": "translation failed errormessage",
  "official": "翻訳失敗——errorMessage を参照。",
  "cause": "サーバ側のフォールバック失敗、errorMessage で具体原因を確認。",
  "fix": "errorMessage / request_id で特定；from / to / q の組合せを確認。"
 },
 "902000": {
  "cat": "結果 / 復号 / その他",
  "alias": "llm translation failed 大模型",
  "official": "大模型翻訳の呼び出し失敗（大模型翻訳エンドポイント）。",
  "cause": "大模型翻訳の経路異常か入力不正（i は 5000 文字、prompt 長制限など）。",
  "fix": "大模型エンドポイントの入力と長さ制限を確認；指数バックオフ + request_id。"
 }
};
window.LABELS = {"miss": "未収録です。別のコードかキーワード、または下の一覧をご覧ください。", "codeword": "エラー "};
window.FIELDS = [["trigger", "出やすい場面"], ["official", "L1 公式の意味"], ["cause", "L2 根本原因"], ["fix", "対処 / 解決"], ["scene", "実例"]];
window.THEAD = ["コード", "分類", "L1 公式の意味", "L2 根本原因"];
