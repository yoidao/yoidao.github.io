window.CODES = {
 "101": {
  "cat": "ပါရာမီတာ",
  "alias": "missing required parameter param marhi",
  "trigger": "ပထမ ပေါင်းစပ်ခြင်း သို့မဟုတ် v1 → v3 ပြောင်းရွှေ့",
  "official": "မဖြစ်မနေ ပါရာမီတာ မရှိ။ မဖြစ်မနေများ အရင်ပြည့်စုံစေ, ထို့နောက် စာလုံးပေါင်း (စာလုံးကြီး/သေး) စစ်။",
  "cause": "v3 သည် 8 လိုအပ်: q、from、to、appKey、salt、sign、signType、curtime။ တစ်ခု မရှိ သို့မဟုတ် အမည်မှား = 101; v1 တွင် curtime / signType မရှိ (ပြောင်းရွှေ့ရာတွင် အလွတ်ဆုံး)။",
  "fix": "တရားဝင် ပါရာမီတာ ဇယားနှင့် တိုက်; signType=v3 နှင့် curtime (စက္ကန့် timestamp) ရှိကြောင်း အတည်ပြု။",
  "scene": "v1 demo ကို v3 ပြောင်းရာ curtime နှင့် signType မေ့ → 101 ဆက်တိုက်။"
 },
 "102": {
  "cat": "ပါရာမီတာ",
  "alias": "language not supported batha zh-CHS",
  "official": "မပံ့ပိုးသော ဘာသာအမျိုးအစား။",
  "cause": "Youdao သည် zh-CHS / zh-CHT / en / ja / ko… သုံး; zh / zh-CN / cn မသိ; strict=true နှင့် မပံ့ပိုးသော ဦးတည်ချက်တွင်လည်း မအောင်မြင်။",
  "fix": "တရားဝင် ဇယားမှ တိကျသောကုဒ် သုံး; မသေချာလျှင် from=auto နှင့် strict default (false)။"
 },
 "103": {
  "cat": "ပါရာမီတာ",
  "alias": "text too long shay 5000",
  "official": "ဘာသာပြန်စာသား ရှည်လွန်း။",
  "cause": "တောင်းဆိုမှုတစ်ခုလျှင် အက္ခရာ ကန့်သတ်ချက် ကျော် (model/document interface i ≤ 5000)။",
  "fix": "ဝါကျ / စာပိုဒ်အလိုက် ခွဲ၍ batch ဖြင့်ပို့; ရှည်သော document များ document-translation interface ဖြင့်။"
 },
 "108": {
  "cat": "အတည်ပြု / လက်မှတ်",
  "alias": "appkey invalid app id app key",
  "trigger": "appKey မှား, အက်ပ် မဖန်တီးရ / ဝန်ဆောင်မှု မချိတ်ရ, သို့မဟုတ် လက်မှတ် သက်တမ်းကုန်",
  "official": "မမှန်ကန်သော အက်ပ် ID။ အကောင့်မှတ်ပုံတင်, console တွင် အက်ပ်ဖန်တီး၍ ဝန်ဆောင်မှုချိတ် - appKey နှင့် appSecret ရ။",
  "cause": "appKey တွင် အက္ခရာ ပျောက် / space; သို့မဟုတ် ဝန်ဆောင်မှု instance မပါသော အက်ပ်; တစ်ခါတစ်ရံ လက်မှတ် သက်တမ်းကုန် (curtime သည် server အချိန်နှင့် ဝေးလွန်း, ~120s)။",
  "fix": "appKey စစ် (space မပါ); ချိတ်ထားသော instance အတည်ပြု; curtime လက်ရှိ စက္ကန့်။",
  "scene": "အက်ပ်အသစ်က ဘာသာပြန် instance မချိတ်ဘဲ တိုက်ရိုက်ခေါ် → 108 / 110။"
 },
 "110": {
  "cat": "ဝန်ဆောင်မှု / instance",
  "alias": "no valid instance chate tts",
  "trigger": "ခေါ်ဆိုမှု လိုအပ်သော instance ကို အက်ပ် မချိတ်ရ",
  "official": "မှန်ကန်သော ဝန်ဆောင်မှု instance မရှိ: အက်ပ် instance မချိတ်ရ, ဖန်တီး၍ ချိတ်။ အသံထွက်အတွက် သီးခြား TTS instance လို။",
  "cause": "အက်ပ်တစ်ခုစီ ဝန်ဆောင်မှုတစ်ခုစီ instance တစ်ခု ချိတ် - ဘာသာပြန် / TTS / OCR သီးခြား; ဘာသာပြန်သာ ချိတ်၍ voice တောင်း → 110။",
  "fix": "console တွင် ဝန်ဆောင်မှုတစ်ခုစီ instance ချိတ် (ဘာသာပြန် / TTS / OCR)။",
  "scene": "ဘာသာပြန် ကောင်း ဒါပေမယ့် အသံတောင်းရာ 110 - TTS instance မရှိ။"
 },
 "111": {
  "cat": "အတည်ပြု / လက်မှတ်",
  "alias": "developer account invalid account",
  "official": "မမှန်ကန်သော developer အကောင့်။",
  "cause": "developer အတည်ပြုခြင်း မရှိသော အကောင့်, ပုံမှန်မဟုတ်သော အခြေအနေ သို့မဟုတ် risk control။",
  "fix": "console တွင် အခြေအနေနှင့် တကယ် / developer အတည်ပြုခြင်း စစ်; လိုအပ်လျှင် ticket။"
 },
 "113": {
  "cat": "ပါရာမီတာ",
  "alias": "q empty bala",
  "official": "q ဗလာ မဖြစ်ရ။",
  "cause": "q field မရှိ သို့မဟုတ် ဗလာ; batch တွင် ဗလာ element။",
  "fix": "ခေါ်မီ q ဗလာမဟုတ်ကြောင်း အတည်ပြု; batch တွင် ဗလာ element များ filter။"
 },
 "116": {
  "cat": "ပါရာမီတာ",
  "alias": "strict invalid",
  "official": "strict တန်ဖိုး မမှန်ကန်; စာရွက်စာတမ်း ကြည့်။",
  "cause": "strict သည် string \"true\" / \"false\" သာ လက်ခံ; 1 / 0 စသည် မအောင်မြင်။",
  "fix": "strict ကို \"true\" သို့မဟုတ် \"false\"; တင်းကြပ်ဦးတည်ချက် မလို မပို့နဲ့။"
 },
 "201": {
  "cat": "ရလဒ် / ဖွင့်ကုဒ် / အခြား",
  "alias": "decrypt phwin des base64",
  "official": "ဖွင့်ကုဒ် မအောင်မြင်: ဖြစ်နိုင်သော DES, BASE64 သို့မဟုတ် URLDecode အမှား။",
  "cause": "transport-encryption interface တွင် ciphertext / encoding / padding သည် သဘောတူညီချက်နှင့် မကိုက်။",
  "fix": "ကုဒ်ဝှက် interface စာရွက်နှင့် တိုက်: DES key/IV, BASE64 နှင့် URLDecode အစီအစဉ်။"
 },
 "202": {
  "cat": "အတည်ပြု / လက်မှတ်",
  "alias": "signature failed letmhat sign auth",
  "trigger": "အဖြစ်များဆုံး: မှားယွင်းတည်ဆောက် string, encoding, space",
  "official": "လက်မှတ် အတည်ပြုခြင်း မအောင်မြင်။ ID နှင့် key မှန်ပြီး ဆက်ဖြစ်လျှင် များသောအားဖြင့် encoding: q ကို UTF-8 ဖြစ်စေ။",
  "cause": "v3 လက်မှတ် = sha256(appKey + input + salt + curtime + appSecret), ထောင်ချောက် လေးခု: ① အစီအစဉ် (appKey→input→salt→curtime→appSecret ဖြစ်ရမည်); ② input ဖြတ်တောက် - q&gt;20: 10 + အရှည် + 10, ≤20: q, byte မဟုတ် Unicode အက္ခရာအလိုက်; ③ q သို့မဟုတ် key တွင် space/စာကြောင်းသစ်; ④ SHA256 မတိုင်မီ UTF-8 မရှိ, သို့မဟုတ် output သည် hex သေး မဟုတ်။",
  "fix": "တရားဝင် SDK ၏ လက်မှတ် function ဖြင့် စစ်; string ပုံနှိပ်၍ အက္ခရာတစ်လုံးချင်း တိုက်; hex သေး; CJK/emoji အတွက် အက္ခရာအလိုက် ဖြတ်။",
  "scene": "အင်္ဂလိပ် ကောင်း, တရုတ်ရှည် တစ်ခါတစ်ရံ 202 - truncation က byte အလိုက် ဖြတ်; Unicode အက္ခရာအလိုက် ဖြတ်လျှင် ပြေလည်။"
 },
 "203": {
  "cat": "အတည်ပြု / လက်မှတ်",
  "alias": "ip whitelist access ip list",
  "trigger": "local ကောင်း ဒါပေမယ့် cloud / စက်ပြောင်းရာ မအောင်မြင်",
  "official": "access IP သည် ခွင့်ပြုစာရင်းတွင် မရှိ။",
  "cause": "IP whitelist active ဒါပေမယ့် public outbound IP မပါ (scaling, dynamic egress, local debug ပြောင်း)။",
  "fix": "တကယ့် outbound IP ထည့် သို့မဟုတ် လုံခြုံလျှင် ကန့်သတ်ပိတ်; container တွင် ပုံသေ egress (NAT)။",
  "scene": "local ကောင်း, cloud 203 - server outbound IP စာရင်းတွင် မပါ။"
 },
 "205": {
  "cat": "အတည်ပြု / လက်မှတ်",
  "alias": "platform type sdk api platform",
  "official": "interface သည် အက်ပ်၏ platform အမျိုးအစားနှင့် မကိုက်: နည်းလမ်း (Android/iOS SDK / API) ကို ဖန်တီးချိန် ရွေးချယ်မှုနှင့် ချိန်ညှိ။",
  "cause": "«server / API» ရွေး ဒါပေမယ့် mobile SDK ဖြင့် ခေါ် (သို့မဟုတ် ပြောင်းပြန်)။",
  "fix": "platform အမျိုးအစားကို တကယ့်နည်းလမ်းနှင့် ချိန်ညှိ; server ခေါ်ဆိုမှုအတွက် «server» အက်ပ်။"
 },
 "206": {
  "cat": "အတည်ပြု / လက်မှတ်",
  "alias": "timestamp curtime nayi ntp",
  "trigger": "container / VM နာရီ မတိကျ",
  "official": "မမှန်ကန်သော timestamp က လက်မှတ် မအောင်မြင်စေ။",
  "cause": "curtime သည် UTF စက္ကန့်ဖြစ်၍ လက်မှတ်ထဲ ဝင်ရမည်; ရွေ့, zone မှား, millisecond သို့မဟုတ် ပုံသေတန်ဖိုး က မမှန်စေ (လက်မှတ် ~120s)။",
  "fix": "Unix timestamp စက္ကန့်; NTP ဖွင့်; container ကို host နှင့် sync; curtime cache မလုပ်နဲ့။",
  "scene": "နာရီရွေ့သော Docker container → 206 များ; NTP ဖြင့် ပြန်ကောင်း။"
 },
 "207": {
  "cat": "အတည်ပြု / လက်မှတ်",
  "alias": "replay salt uuid pyanphwin",
  "trigger": "salt ပုံသေ သို့မဟုတ် တောင်းဆိုမှုဟောင်း ပြန်ပို့",
  "official": "ပြန်ဖွင့်တောင်းဆိုမှု။ salt + curtime က ပြန်ဖွင့်ကာကွယ် (2 ကြိမ် မဟုတ်); salt အကောင်းဆုံး UUID။",
  "cause": "salt ပုံသေ / တိုး / ပြန်သုံး, သို့မဟုတ် retry က salt + curtime ဟောင်း ပြန်ပို့။",
  "fix": "တောင်းဆိုမှုတိုင်း ကျပန်း salt (UUID) ဖန်တီး၍ curtime refresh; retry တွင် ပြန်လက်မှတ်ထိုး။",
  "scene": "bug ပြန်ဖန်တီးရန် salt ပုံသေ → ဒုတိယခေါ်ဆိုမှုတွင် 207။"
 },
 "303": {
  "cat": "ရလဒ် / ဖွင့်ကုဒ် / အခြား",
  "alias": "server error request_id",
  "official": "server ၏ အခြားခြွင်းချက်။",
  "cause": "server အတွင်းပိုင်း အမှား, client ပါရာမီတာ ပြဿနာ မဟုတ်; များသောအားဖြင့် ယာယီ။",
  "fix": "exponential backoff ဖြင့် ပြန်ကြိုးစား; ဆက်ဖြစ်လျှင် request_id ဖြင့် ticket။"
 },
 "310": {
  "cat": "ဝန်ဆောင်မှု / instance",
  "alias": "domain rejectFallback domain",
  "official": "domain ဘာသာပြန် ဝန်ဆောင်မှု မဖွင့်ရ။",
  "cause": "domain ပို့ ဒါပေမယ့် console က ထို domain မဖွင့်ရ။",
  "fix": "domain ဘာသာပြန်ဖွင့်၍ domain / rejectFallback ပို့, သို့မဟုတ် ယေဘုယျဘာသာပြန်အတွက် domain ဖယ်။"
 },
 "401": {
  "cat": "အကောင့် / ငွေတောင်းခံ / ကန့်သတ်",
  "alias": "lakkyan ngwet arrears",
  "trigger": "ရုတ်တရက် အားလုံး မအောင်မြင်",
  "official": "အကောင့် ယခု ကြွေးတင်; ငွေဖြည့်။",
  "cause": "လက်ကျန် / အက္ခရာ package ကုန်၍ ဝန်ဆောင်မှု ရပ်; postpaid မ active သို့မဟုတ် package သုံးကုန်။",
  "fix": "ငွေဖြည့် သို့မဟုတ် package ဝယ်; လက်ကျန် / သုံးစွဲမှု alert; အရေးကြီးအတွက် backup channel။",
  "scene": "လကုန် package ဗလာ, အားလုံး 401; ငွေဖြည့်ပြီး ပြန်ကောင်း။"
 },
 "411": {
  "cat": "အကောင့် / ငွေတောင်းခံ / ကန့်သတ်",
  "alias": "qps rate limit kantha",
  "trigger": "တစ်ပြိုင်နက် / load test တွင် များ",
  "official": "access ကြိမ်နှုန်း ကန့်သတ်; နောက်မှ ကြိုးစားပါ။",
  "cause": "အက်ပ် QPS ကျော် (အခြေခံ ~100, console တွင် တိုးနိုင်); client throttling မပါဘဲ ရုတ်တရက် တစ်ပြိုင်နက်။",
  "fix": "token bucket / leaky bucket + exponential backoff; တောင်းဆိုမှု စုပေါင်း / ဖြန့်; လိုအပ်လျှင် QPS ဝယ်။",
  "scene": "load ထိပ်ဆုံး ပြည့်လျှံ → 411 များ; limiter ဖြင့် တည်ငြိမ်။"
 },
 "412": {
  "cat": "အကောင့် / ငွေတောင်းခံ / ကန့်သတ်",
  "alias": "long request taungso shay",
  "official": "ရှည်သော တောင်းဆိုမှုများ မကြာခဏ လွန်း; နောက်မှ ကြိုးစားပါ။",
  "cause": "ရှည်သော စာသား / လေးသော interface အချိန်တိုအတွင်း သိပ်သည်းလွန်း။",
  "fix": "ရှည်သော တောင်းဆိုမှု ကြိမ်နှုန်း လျှော့ (စက္ကန့် ကြားအကွာ); ရှည်သော စာသား document interface ဖြင့်။"
 },
 "500": {
  "cat": "ရလဒ် / ဖွင့်ကုဒ် / အခြား",
  "alias": "translate failed errormessage",
  "official": "ဘာသာပြန် မအောင်မြင်; errorMessage ကြည့်။",
  "cause": "server ၏ ယေဘုယျ မအောင်မြင်မှု; တိကျသော အကြောင်းရင်းအတွက် errorMessage လို။",
  "fix": "errorMessage / request_id ဖြင့် နေရာသတ်; from / to / q ပေါင်းစပ် စစ်။"
 },
 "902000": {
  "cat": "ရလဒ် / ဖွင့်ကုဒ် / အခြား",
  "alias": "llm model kyi",
  "official": "model ကြီး ဘာသာပြန် ခေါ်ဆိုမှု မအောင်မြင်။",
  "cause": "model ကြီး စီးဆင်းမှုတွင် ပုံမှန်မဟုတ်မှု သို့မဟုတ် မမှန်ကန် input (i ≤ 5000, prompt အရှည် ကန့်သတ်…)။",
  "fix": "input နှင့် အရှည် ကန့်သတ် စစ်; backoff နှင့် request_id ဖြင့် ပြန်ကြိုးစား။"
 }
};
window.LABELS = {"miss": "ကုဒ် စာရင်းတွင် မရှိ; အခြားကုဒ် သို့မဟုတ် သော့ချက်စကားလုံး စမ်းပါ, သို့မဟုတ် အောက်ရှိ ဇယားအပြည့်အစုံကို ကြည့်ပါ။", "codeword": "အမှားကုဒ် "};
window.FIELDS = [["trigger", "ဘယ်အချိန် ဖြစ်သလဲ"], ["official", "L1 တရားဝင်အဓိပ္ပာယ်"], ["cause", "L2 အရင်းခံအကြောင်းရင်း"], ["fix", "မည်သို့ စစ်ဆေး / ဖြေရှင်း"], ["scene", "အမှန်တကယ်ဖြစ်ရပ်"]];
window.THEAD = ["ကုဒ်", "အမျိုးအစား", "L1 တရားဝင်အဓိပ္ပာယ်", "L2 အရင်းခံအကြောင်းရင်း"];
