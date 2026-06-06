window.CODES = {
 "101": {
  "cat": "参数类",
  "alias": "缺少必填参数 missing required parameter 缺参",
  "trigger": "首次联调、或从 v1 老接口迁 v3 时漏字段",
  "official": "缺少必填的参数。先确保必填参数齐全，再确认参数书写（大小写）是否正确。",
  "cause": "v3 文本翻译必填 8 项：q、from、to、appKey、salt、sign、signType、curtime。少任意一个、或字段名大小写写错都会判 101。v1 老接口没有 curtime / signType，迁 v3 最常漏这两个。",
  "fix": "对照官方参数表逐个核对必填项；确认 signType=v3、curtime 必传且为秒级时间戳。",
  "scene": "照 v1 demo 改 v3、忘加 curtime 与 signType，一直 101。"
 },
 "102": {
  "cat": "参数类",
  "alias": "不支持的语言类型 language not supported 语种 zh-CHS",
  "trigger": "from / to 传了不在支持列表的语种代码",
  "official": "不支持的语言类型。",
  "cause": "有道用 zh-CHS（简体）、zh-CHT（繁体）、en、ja、ko 等代码；写成 zh / zh-CN / cn 不被识别。strict=true 且 from→to 方向不支持时也会报。",
  "fix": "对照官方「支持语言」表用准确代码；不确定方向就 from=auto，并把 strict 留默认 false。",
  "scene": "把简体写成 zh-CN 报 102，改 zh-CHS 即通。"
 },
 "103": {
  "cat": "参数类",
  "alias": "翻译文本过长 text too long 长度 5000",
  "trigger": "单次 q 文本超过长度上限",
  "official": "翻译文本过长。",
  "cause": "单次请求字符数超限（大模型 / 文档类接口 i 限 5000 字符），常因整篇长文未切分就提交。",
  "fix": "按句 / 段切分后分批请求；长文档走文档翻译接口而非文本翻译。",
  "scene": "整页文章一次性提交报 103，按段切分后正常。"
 },
 "108": {
  "cat": "鉴权 / 签名类",
  "alias": "应用ID无效 appkey invalid 应用id app key",
  "trigger": "appKey 错、应用未创建 / 未绑定服务，或签名超时",
  "official": "应用ID无效。注册账号、登录控制台创建应用并完成服务绑定后，可获得应用ID与应用密钥。",
  "cause": "appKey 复制漏字 / 带空格；或应用建了但没绑定对应服务实例。部分场景下签名超时（curtime 与服务器时间相差过大、超约 120s 有效期）也会表现为鉴权失败。",
  "fix": "控制台核对 appKey（去空格）；确认应用已绑定本接口的服务实例；保证 curtime 为当前秒级时间。",
  "scene": "新建应用直接调用、忘了绑定文本翻译实例，报 108 / 110。"
 },
 "110": {
  "cat": "服务 / 实例类",
  "alias": "无相关服务的有效实例 no valid instance 绑定 tts 语音合成",
  "trigger": "应用没绑定本次调用所需的服务实例",
  "official": "无相关服务的有效实例：应用没有绑定服务实例，可新建并绑定。注：翻译结果发音需 TTS 实例，要单独在控制台创建语音合成实例并绑定后才能用。",
  "cause": "一个应用要分别绑定它用到的每种服务实例——文本翻译、语音合成（TTS）、OCR 各自独立。只绑了翻译却带 voice 取发音 → 110。",
  "fix": "控制台为应用按服务逐个绑定实例（翻译 / 语音合成 / OCR）。",
  "scene": "翻译正常、但带 voice 取发音时报 110——TTS 实例没绑。"
 },
 "111": {
  "cat": "鉴权 / 签名类",
  "alias": "开发者账号无效 developer account invalid",
  "official": "开发者账号无效。",
  "cause": "账号未完成开发者认证、状态异常或被风控。",
  "fix": "登录控制台确认账号状态与实名 / 开发者认证；必要时提交工单。"
 },
 "113": {
  "cat": "参数类",
  "alias": "q不能为空 q empty 空",
  "official": "q 不能为空。",
  "cause": "q 字段缺失或为空串；批量接口里某个元素为空。",
  "fix": "调用前校验 q 非空；批量请求过滤空元素。"
 },
 "116": {
  "cat": "参数类",
  "alias": "strict 取值无效 strict invalid",
  "official": "strict 字段取值无效，请参考文档填写正确参数值。",
  "cause": "strict 只接受字符串 \"true\" / \"false\"，传了 1 / 0 或其它值。",
  "fix": "strict 传字符串 \"true\" 或 \"false\"；不需要严格方向就别传。"
 },
 "201": {
  "cat": "结果 / 解密 / 其它类",
  "alias": "解密失败 des base64 urldecode decrypt",
  "official": "解密失败，可能为 DES、BASE64、URLDecode 的错误。",
  "cause": "用了传输加密的接口时，密文 / 编码 / 填充方式与约定不符。",
  "fix": "对照加密接口文档核对 DES 密钥 / IV、BASE64、URLDecode 的顺序与字符集。"
 },
 "202": {
  "cat": "鉴权 / 签名类",
  "alias": "签名校验失败 signature failed 签名错误 sign 鉴权",
  "trigger": "最高频报错：签名串拼错、编码不对、密钥带空格",
  "official": "签名检验失败。若已确认应用 ID 与密钥正确仍返回 202，一般是编码问题——请确保 q 为 UTF-8 编码。",
  "cause": "v3 签名 = sha256(应用ID + input + salt + curtime + 应用密钥)，四个坑：① 拼接顺序错（必须 appKey→input→salt→curtime→appSecret）；② input 截断没做对——q 长度&gt;20 时 input = 前 10 字符 + q 长度 + 后 10 字符，≤20 取 q 本身，且按 Unicode 字符数而非字节；③ q 或密钥带了复制进来的空格 / 换行；④ 没用 UTF-8 编码再做 SHA256，或输出没转十六进制小写。",
  "fix": "用官方 SDK 的签名函数验算；打印拼接串逐位比对；确认 SHA256 输出为十六进制小写；q 含中文 / emoji 时按字符数（非字节）做 truncate。",
  "scene": "翻译英文正常、翻译长中文偶发 202——truncate 把多字节按字节切了，按 Unicode 字符切即修复。"
 },
 "203": {
  "cat": "鉴权 / 签名类",
  "alias": "ip 白名单 access ip list 不在列表",
  "trigger": "本地能调、上云 / 换机器后报",
  "official": "访问 IP 地址不在可访问 IP 列表。",
  "cause": "控制台为应用开了 IP 白名单，但调用方公网出口 IP 不在列表（服务器扩容、动态出口、本地调试都会变）。",
  "fix": "把实际出口 IP 加入白名单，或在可接受的安全前提下关闭 IP 限制；容器 / 弹性环境用固定出口（NAT 网关）。",
  "scene": "本地能调、上云后 203——服务器出口 IP 没加白名单。"
 },
 "205": {
  "cat": "鉴权 / 签名类",
  "alias": "接口与平台类型不一致 platform type sdk api",
  "official": "请求的接口与应用的平台类型不一致：确保接入方式（Android SDK / iOS SDK / API）与创建应用时选的平台类型一致。",
  "cause": "建应用时选了「服务器端 / API」，却用移动 SDK 调（或相反）。",
  "fix": "让应用平台类型与实际接入方式一致；服务端调用就建「服务器端」应用。"
 },
 "206": {
  "cat": "鉴权 / 签名类",
  "alias": "时间戳无效 timestamp curtime 时钟 ntp",
  "trigger": "容器 / 虚机时钟不准时",
  "official": "因为时间戳无效导致签名校验失败。",
  "cause": "curtime 必须是当前 UTC 秒级时间戳并参与签名；机器时钟漂移、时区错、用了毫秒或固定值，都会让 curtime 失效（签名约 120s 有效期）。",
  "fix": "用秒级 Unix 时间戳；服务器开 NTP 校时；容器同步宿主时钟；别缓存 / 复用旧 curtime。",
  "scene": "Docker 容器时钟漂移几分钟，线上批量 206，NTP 同步后恢复。"
 },
 "207": {
  "cat": "鉴权 / 签名类",
  "alias": "重放请求 replay salt uuid",
  "trigger": "salt 用了固定值或重发旧请求",
  "official": "重放请求。接口用 salt + curtime 防重放（同一请求不可被请求 2 次），salt 最好为 UUID。",
  "cause": "salt 用了固定值 / 自增 / 复用，或重试时连同旧 salt + curtime 一起重发，被判为重放。",
  "fix": "每次请求都新生成随机 salt（UUID）并刷新 curtime；失败重试必须重新签名。",
  "scene": "为复现 bug 写死 salt，第二次调用就 207。"
 },
 "303": {
  "cat": "结果 / 解密 / 其它类",
  "alias": "服务端其它异常 server error request_id",
  "official": "服务端的其它异常。",
  "cause": "服务端内部错误，非客户端参数问题，多为临时波动。",
  "fix": "指数退避重试；持续出现就带 request_id 提工单。"
 },
 "310": {
  "cat": "服务 / 实例类",
  "alias": "未开通领域翻译 domain rejectFallback",
  "official": "未开通领域翻译服务。",
  "cause": "传了 domain 走领域化翻译，但控制台没开通对应领域。",
  "fix": "控制台开通领域化翻译再传 domain / rejectFallback，或去掉 domain 走通用翻译。"
 },
 "401": {
  "cat": "账号 / 计费 / 限流类",
  "alias": "账户欠费 余额 充值 arrears balance",
  "trigger": "调用突然全部失败",
  "official": "账户已经欠费，请进行账户充值。",
  "cause": "账户余额 / 字符资源包耗尽触发欠费停服；后付费没开或资源包用完。",
  "fix": "控制台充值或购买资源包；设余额 / 用量告警；关键业务备一个兜底翻译渠道。",
  "scene": "月底字符包用尽，线上翻译全 401，充值后恢复。"
 },
 "411": {
  "cat": "账号 / 计费 / 限流类",
  "alias": "访问频率受限 qps rate limit 限流 频率",
  "trigger": "并发 / 压测时大量出现",
  "official": "访问频率受限，请稍后访问。",
  "cause": "超出应用 QPS 上限（基础约 100 QPS，可在控制台叠加购买）；突发并发未做客户端限速。",
  "fix": "客户端做令牌桶 / 漏桶限速 + 指数退避重试；合并 / 分散请求；需要更高并发就叠加购买 QPS。",
  "scene": "压测瞬时并发打满，大面积 411，加限速器后稳定。"
 },
 "412": {
  "cat": "账号 / 计费 / 限流类",
  "alias": "长请求过于频繁 long request",
  "official": "长请求过于频繁，请稍后访问。",
  "cause": "长文本 / 重接口短时间内过于密集。",
  "fix": "降低长请求频率（间隔几秒）；长文走文档翻译接口。"
 },
 "500": {
  "cat": "结果 / 解密 / 其它类",
  "alias": "翻译失败 errormessage",
  "official": "翻译失败，请参考 errorMessage。",
  "cause": "服务端返回的兜底失败，需结合 errorMessage 看具体原因。",
  "fix": "读 errorMessage / request_id 定位；核对 from / to / q 组合。"
 },
 "902000": {
  "cat": "结果 / 解密 / 其它类",
  "alias": "大模型翻译调用失败 llm 大模型",
  "official": "大模型翻译调用失败（大模型翻译接口）。",
  "cause": "大模型翻译链路异常或入参不合规（i 限 5000 字符、prompt 有长度限制等）。",
  "fix": "核对大模型接口入参与长度限制；指数退避重试并带 request_id。"
 }
};
window.LABELS = {"miss": "未收录该错误码，换个码或关键词，或看下方全表。", "codeword": "错误码 "};
window.FIELDS = [["trigger", "什么时候出现"], ["official", "L1 官方含义"], ["cause", "L2 深度真因"], ["fix", "怎么排查 / 解决"], ["scene", "真实场景"]];
window.THEAD = ["错误码", "分类", "L1 官方含义", "L2 深度真因"];
