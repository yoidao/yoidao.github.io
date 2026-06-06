window.CODES = {
 "101": {
  "cat": "Parameters",
  "alias": "missing required parameter 缺参 signtype curtime",
  "trigger": "First integration, or missing fields when migrating v1 -> v3",
  "official": "A required parameter is missing. Make sure all required parameters are present, then check the spelling (case).",
  "cause": "v3 text translation requires 8 fields: q, from, to, appKey, salt, sign, signType, curtime. Missing any one, or a mis-cased field name, returns 101. The v1 endpoint had no curtime / signType - those two are the most commonly missed when moving to v3.",
  "fix": "Check each required field against the official table; confirm signType=v3 and that curtime is present as a second-level timestamp.",
  "scene": "Adapted a v1 demo to v3 but forgot curtime and signType - constant 101."
 },
 "102": {
  "cat": "Parameters",
  "alias": "unsupported language type 语种 zh-CHS",
  "trigger": "from / to uses a language code not on the support list",
  "official": "Unsupported language type.",
  "cause": "Youdao uses codes like zh-CHS (Simplified), zh-CHT (Traditional), en, ja, ko; zh / zh-CN / cn aren't recognized. With strict=true an unsupported from->to direction also errors.",
  "fix": "Use exact codes from the official support list; if unsure use from=auto and leave strict at its default false.",
  "scene": "Wrote zh-CN for Simplified and got 102; zh-CHS fixed it."
 },
 "103": {
  "cat": "Parameters",
  "alias": "text too long 长度 5000",
  "trigger": "A single q exceeds the length limit",
  "official": "The translation text is too long.",
  "cause": "The per-request character count exceeds the cap (the LLM / document endpoint i is capped at 5000 chars); usually a whole long document submitted unsplit.",
  "fix": "Split by sentence / paragraph and batch; route long documents to the document-translation endpoint, not text translation.",
  "scene": "A whole article at once returned 103; splitting by paragraph fixed it."
 },
 "108": {
  "cat": "Auth / signature",
  "alias": "app id invalid appkey 应用id",
  "trigger": "Wrong appKey, app not created / bound, or signature timed out",
  "official": "Invalid application ID. Register an account, create an app in the console and complete service binding to obtain the app ID and secret.",
  "cause": "appKey copied with a missing char / stray space; or the app exists but isn't bound to the service instance. A signature timeout (curtime too far from server time, beyond the ~120s window) can also surface as auth failure.",
  "fix": "Verify the appKey in the console (trim spaces); confirm the app is bound to this endpoint's instance; ensure curtime is the current second-level time.",
  "scene": "New app called directly without binding the text-translation instance - 108 / 110."
 },
 "110": {
  "cat": "Service / instance",
  "alias": "no valid instance 绑定 tts speech",
  "trigger": "The app isn't bound to the instance this call needs",
  "official": "No valid instance for the service: the app hasn't bound a service instance - create and bind one. Note: pronouncing the translation needs a TTS instance, created and bound separately in the console.",
  "cause": "An app must bind each service instance it uses - text translation, speech synthesis (TTS), OCR are all separate. Bound translation but calling for voice -> 110.",
  "fix": "Bind each service instance to the app in the console (translation / TTS / OCR).",
  "scene": "Translation works but asking for voice returns 110 - the TTS instance wasn't bound."
 },
 "111": {
  "cat": "Auth / signature",
  "alias": "developer account invalid",
  "official": "Invalid developer account.",
  "cause": "The account hasn't completed developer verification, is in an abnormal state, or is risk-flagged.",
  "fix": "Check account status and verification in the console; file a ticket if needed."
 },
 "113": {
  "cat": "Parameters",
  "alias": "q empty 空",
  "official": "q cannot be empty.",
  "cause": "q is missing or an empty string; an element in a batch call is empty.",
  "fix": "Validate q is non-empty before calling; filter empty elements in batch requests."
 },
 "116": {
  "cat": "Parameters",
  "alias": "strict invalid",
  "official": "Invalid value for the strict field - fill in a valid value per the docs.",
  "cause": "strict only accepts the strings \"true\" / \"false\"; 1 / 0 or other values fail.",
  "fix": "Pass strict as \"true\" or \"false\"; omit it if you don't need a strict direction."
 },
 "201": {
  "cat": "Result / decrypt / other",
  "alias": "decrypt failed des base64 urldecode",
  "official": "Decryption failed - possibly a DES, BASE64 or URLDecode error.",
  "cause": "On an endpoint using transport encryption, the ciphertext / encoding / padding doesn't match the agreed scheme.",
  "fix": "Check the DES key / IV, BASE64 and URLDecode order and charset against the encrypted-endpoint docs."
 },
 "202": {
  "cat": "Auth / signature",
  "alias": "signature verification failed sign 鉴权 signature",
  "trigger": "The most common error: wrong sign string, bad encoding, key with whitespace",
  "official": "Signature verification failed. If the app ID and secret are correct but you still get 202, it's usually an encoding issue - ensure q is UTF-8.",
  "cause": "v3 sign = sha256(appKey + input + salt + curtime + appSecret), with four traps: (1) wrong concatenation order (must be appKey->input->salt->curtime->appSecret); (2) input truncation done wrong - when q is longer than 20, input = first 10 chars + q length + last 10 chars, else q itself, counted in Unicode characters not bytes; (3) a stray space / newline copied into q or the secret; (4) not UTF-8 encoding before SHA256, or not lower-case hex output.",
  "fix": "Validate with the official SDK's signing function; print the concatenated string and compare char by char; confirm SHA256 outputs lower-case hex; for Chinese / emoji in q, truncate by character count, not bytes.",
  "scene": "English fine, long Chinese intermittently 202 - truncate sliced by byte; slicing by Unicode character fixed it."
 },
 "203": {
  "cat": "Auth / signature",
  "alias": "ip allowlist access ip list",
  "trigger": "Works locally, fails after moving to cloud / a new host",
  "official": "The access IP is not in the allowed IP list.",
  "cause": "The app has an IP allowlist enabled, but the caller's public egress IP isn't on it (server scaling, dynamic egress and local debugging all change it).",
  "fix": "Add the real egress IP to the allowlist, or disable the IP restriction if acceptable; use a fixed egress (NAT gateway) for container / elastic environments.",
  "scene": "Worked locally, 203 in the cloud - the server's egress IP wasn't allowlisted."
 },
 "205": {
  "cat": "Auth / signature",
  "alias": "platform type mismatch sdk api",
  "official": "The endpoint doesn't match the app's platform type: ensure the access method (Android SDK / iOS SDK / API) matches the platform type chosen when creating the app.",
  "cause": "The app was created as \"server / API\" but called via a mobile SDK (or vice versa).",
  "fix": "Make the app platform type match the actual access method; create a \"server\" app for server-side calls."
 },
 "206": {
  "cat": "Auth / signature",
  "alias": "invalid timestamp curtime clock ntp",
  "trigger": "When the container / VM clock is off",
  "official": "Signature verification failed because of an invalid timestamp.",
  "cause": "curtime must be the current UTC second-level timestamp and is part of the signature; clock drift, a wrong time zone, milliseconds or a fixed value all invalidate it (signature valid ~120s).",
  "fix": "Use a second-level Unix timestamp; enable NTP on the server; sync the container to the host clock; don't cache / reuse an old curtime.",
  "scene": "A Docker container drifted a few minutes, causing batch 206 in production; NTP sync restored it."
 },
 "207": {
  "cat": "Auth / signature",
  "alias": "replay request salt uuid",
  "trigger": "Fixed salt, or resending an old request",
  "official": "Replay request. The API uses salt + curtime to prevent replay (one request can't be sent twice); salt should be a UUID.",
  "cause": "salt was fixed / incrementing / reused, or a retry resent the old salt + curtime, flagged as replay.",
  "fix": "Generate a fresh random salt (UUID) and curtime per request; always re-sign on retry.",
  "scene": "Hard-coded salt to reproduce a bug, and the second call returned 207."
 },
 "303": {
  "cat": "Result / decrypt / other",
  "alias": "server error other request_id",
  "official": "Other server-side exception.",
  "cause": "An internal server error, not a client parameter issue - usually transient.",
  "fix": "Retry with exponential backoff; if it persists, file a ticket with the request_id."
 },
 "310": {
  "cat": "Service / instance",
  "alias": "domain translation not enabled rejectFallback",
  "official": "Domain translation service is not enabled.",
  "cause": "You passed domain for domain translation but the console hasn't enabled that domain.",
  "fix": "Enable domain translation in the console before passing domain / rejectFallback, or drop domain for general translation."
 },
 "401": {
  "cat": "Account / billing / rate limit",
  "alias": "arrears balance top up",
  "trigger": "Every call suddenly fails",
  "official": "The account is in arrears - please top up.",
  "cause": "The balance / character pack ran out and triggered a service stop; post-pay isn't enabled or the pack is exhausted.",
  "fix": "Top up or buy a pack in the console; set a balance / usage alert; keep a fallback translation channel for critical business.",
  "scene": "The character pack ran out at month-end and production translation was all 401; topping up restored it."
 },
 "411": {
  "cat": "Account / billing / rate limit",
  "alias": "rate limit qps frequency 限流",
  "trigger": "Shows up in bulk under concurrency / load testing",
  "official": "Access frequency is limited - please try again later.",
  "cause": "You exceeded the app's QPS cap (~100 base, expandable in the console); a burst of concurrency with no client-side rate limiting.",
  "fix": "Rate-limit client-side with a token / leaky bucket + exponential backoff; merge / spread requests; buy extra QPS for higher concurrency.",
  "scene": "A burst during load testing maxed out QPS and caused mass 411; a rate limiter stabilized it."
 },
 "412": {
  "cat": "Account / billing / rate limit",
  "alias": "long request too frequent",
  "official": "Long requests are too frequent - please try again later.",
  "cause": "Long text / heavy endpoints called too densely in a short window.",
  "fix": "Lower the long-request frequency (a few seconds apart); route long text to the document-translation endpoint."
 },
 "500": {
  "cat": "Result / decrypt / other",
  "alias": "translation failed errormessage",
  "official": "Translation failed - see errorMessage.",
  "cause": "A catch-all server failure; check errorMessage for the specifics.",
  "fix": "Read errorMessage / request_id to localize; verify the from / to / q combination."
 },
 "902000": {
  "cat": "Result / decrypt / other",
  "alias": "llm translation call failed 大模型",
  "official": "LLM translation call failed (the LLM translation endpoint).",
  "cause": "The LLM translation path errored or the inputs are invalid (i capped at 5000 chars, prompt length limits, etc.).",
  "fix": "Verify the LLM endpoint inputs and length limits; retry with exponential backoff and the request_id."
 }
};
window.LABELS = {"miss": "Not listed - try another code or keyword, or see the full table below.", "codeword": "Error "};
window.FIELDS = [["trigger", "When it shows up"], ["official", "L1 official meaning"], ["cause", "L2 root cause"], ["fix", "How to fix"], ["scene", "Real case"]];
window.THEAD = ["Code", "Group", "L1 official meaning", "L2 root cause"];
