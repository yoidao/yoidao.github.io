# yoidao.github.io

有道智云 API 错误码 / 翻译接口报错排查查询（四语：简 / 英 / 日 / 繁）：输入错误码（101 / 102 / 103 / 108 /
110 / 202 / 203 / 206 / 207 / 401 / 411 …）或关键词（签名 / 限流 / 时间戳），查 L1 官方含义 + L2 深度真因
（v3 签名 sha256(appKey+input+salt+curtime+appSecret) 的 input 截断/编码/顺序四坑、curtime 秒级 UTC、salt 用
UUID 防重放、按服务绑定实例、QPS 退避），并看有道 vs 百度 / 腾讯云 / 阿里云 / Google / DeepL 翻译 API 横向
对照与 2026 免费额度 / QPS 估算。无需安装，开网页即用。

**在线使用 → https://yoidao.github.io/**

错误码与 v3 签名算法整理自有道智云 AI 开放平台官方文档（ai.youdao.com）；竞品对照综合自百度 / 腾讯云 /
阿里云 / Google / DeepL 官方文档。更多见 [有道智云 API 错误码 / 接入指南](https://yoidao.com/)。

MIT License.
