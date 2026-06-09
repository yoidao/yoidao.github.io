window.CODES = {
 "101": {
  "cat": "파라미터류",
  "alias": "missing required parameter 필수값 누락 누락",
  "trigger": "최초 연동, 또는 v1 구형에서 v3 로 옮기며 필드 누락 시",
  "official": "필수 파라미터 누락. 먼저 필수 파라미터가 완비됐는지 확인하고, 표기(대소문자)가 맞는지 확인하세요.",
  "cause": "v3 텍스트 번역 필수 8개: q、from、to、appKey、salt、sign、signType、curtime. 하나라도 빠지거나 필드명 대소문자가 틀리면 101. v1 구형엔 curtime / signType 이 없어 v3 이전 시 가장 자주 누락.",
  "fix": "공식 파라미터 표와 대조해 필수값을 하나씩 확인; signType=v3, curtime(초 단위 타임스탬프) 필수 전송 확인.",
  "scene": "v1 데모를 v3 로 고치며 curtime 과 signType 을 빠뜨려 계속 101."
 },
 "102": {
  "cat": "파라미터류",
  "alias": "language not supported 언어 zh-CHS",
  "trigger": "from / to 에 지원 목록에 없는 언어 코드 전달",
  "official": "지원하지 않는 언어 유형.",
  "cause": "유다오는 zh-CHS(간체)、zh-CHT(번체)、en、ja、ko 등 코드 사용; zh / zh-CN / cn 은 인식 안 됨. strict=true 이고 from→to 방향 미지원이면 발생.",
  "fix": "공식 「지원 언어」표의 정확한 코드 사용; 방향이 불확실하면 from=auto, strict 는 기본 false 유지.",
  "scene": "간체를 zh-CN 으로 적어 102, zh-CHS 로 바꾸니 통과."
 },
 "103": {
  "cat": "파라미터류",
  "alias": "text too long 길이 5000",
  "trigger": "단일 q 텍스트가 길이 상한 초과",
  "official": "번역 텍스트가 너무 깁니다.",
  "cause": "단일 요청 문자 수 초과(대모델 / 문서류 인터페이스 i 는 5000자 제한), 긴 글을 분할 없이 제출해서 자주 발생.",
  "fix": "문장 / 단락 단위로 분할해 배치 요청; 긴 문서는 텍스트 번역이 아닌 문서 번역 인터페이스로.",
  "scene": "긴 글을 한 번에 제출해 103, 단락 분할 후 정상."
 },
 "108": {
  "cat": "인증 / 서명류",
  "alias": "appkey invalid 앱id app key",
  "trigger": "appKey 오류, 앱 미생성 / 서비스 미바인딩, 또는 서명 만료",
  "official": "앱 ID 가 유효하지 않음. 계정 등록·콘솔 로그인 후 앱 생성 및 서비스 바인딩을 완료하면 앱ID와 앱시크릿을 받습니다.",
  "cause": "appKey 복사 누락 / 공백; 또는 앱은 만들었지만 해당 서비스 인스턴스 미바인딩. 일부 경우 서명 만료(curtime 와 서버 시간 차가 너무 큼·약 120s 유효)도 인증 실패로 표출.",
  "fix": "콘솔에서 appKey 확인(공백 제거); 앱이 이 인터페이스의 서비스 인스턴스를 바인딩했는지 확인; curtime 이 현재 초 단위인지 확인.",
  "scene": "새 앱으로 바로 호출하며 텍스트 번역 인스턴스 바인딩을 잊어 108 / 110."
 },
 "110": {
  "cat": "서비스 / 인스턴스류",
  "alias": "no valid instance 바인딩 tts 음성합성",
  "trigger": "이번 호출에 필요한 서비스 인스턴스를 앱이 미바인딩",
  "official": "관련 서비스의 유효 인스턴스 없음: 앱이 서비스 인스턴스를 바인딩하지 않음, 새로 만들어 바인딩하세요. 참고: 번역 결과 발음엔 TTS 인스턴스가 필요하므로 음성합성 인스턴스를 별도로 만들어 바인딩해야 사용 가능.",
  "cause": "앱은 사용하는 서비스마다 인스턴스를 따로 바인딩해야 함 — 텍스트 번역·음성합성(TTS)·OCR 각각 독립. 번역만 바인딩하고 voice 로 발음을 받으면 110.",
  "fix": "콘솔에서 앱에 서비스별로 인스턴스 바인딩(번역 / 음성합성 / OCR).",
  "scene": "번역은 정상인데 voice 로 발음 받을 때 110 — TTS 인스턴스 미바인딩."
 },
 "111": {
  "cat": "인증 / 서명류",
  "alias": "developer account invalid 개발자 계정",
  "official": "개발자 계정이 유효하지 않음.",
  "cause": "계정의 개발자 인증 미완료, 상태 이상 또는 리스크 컨트롤.",
  "fix": "콘솔에서 계정 상태와 실명 / 개발자 인증 확인; 필요 시 티켓 제출."
 },
 "113": {
  "cat": "파라미터류",
  "alias": "q empty 빈값",
  "official": "q 는 비어 있을 수 없음.",
  "cause": "q 필드 누락 또는 빈 문자열; 배치 인터페이스에서 일부 원소가 빈 값.",
  "fix": "호출 전 q 가 비어있지 않은지 검증; 배치 요청은 빈 원소 필터링."
 },
 "116": {
  "cat": "파라미터류",
  "alias": "strict invalid",
  "official": "strict 필드 값이 유효하지 않음, 문서를 참고해 올바른 값 입력.",
  "cause": "strict 는 문자열 \"true\" / \"false\" 만 허용, 1 / 0 등은 불가.",
  "fix": "strict 는 문자열 \"true\" 또는 \"false\"; 엄격 방향이 불필요하면 전송하지 않음."
 },
 "201": {
  "cat": "결과 / 복호화 / 기타류",
  "alias": "decrypt 복호화 des base64 urldecode",
  "official": "복호화 실패, DES / BASE64 / URLDecode 오류일 수 있음.",
  "cause": "전송 암호화 인터페이스 사용 시 암호문 / 인코딩 / 패딩 방식이 약속과 불일치.",
  "fix": "암호화 인터페이스 문서와 대조해 DES 키 / IV、BASE64、URLDecode 순서와 문자셋 확인."
 },
 "202": {
  "cat": "인증 / 서명류",
  "alias": "signature failed 서명 오류 sign 인증",
  "trigger": "최빈 오류: 서명 문자열 오류, 인코딩 불일치, 키 공백",
  "official": "서명 검증 실패. 앱 ID 와 키가 맞는데도 202 면 보통 인코딩 문제 — q 가 UTF-8 인지 확인하세요.",
  "cause": "v3 서명 = sha256(앱ID + input + salt + curtime + 앱시크릿), 네 가지 함정: ① 순서 오류(반드시 appKey→input→salt→curtime→appSecret); ② input 절단 오류 — q 길이&gt;20 이면 input = 앞 10자 + q 길이 + 뒤 10자, ≤20 이면 q 자체, 그리고 바이트가 아닌 유니코드 문자 수 기준; ③ q 나 키에 복사된 공백 / 줄바꿈; ④ UTF-8 로 인코딩 후 SHA256 하지 않음, 또는 출력을 16진 소문자로 변환 안 함.",
  "fix": "공식 SDK 의 서명 함수로 검산; 결합 문자열을 출력해 한 자씩 대조; SHA256 출력이 16진 소문자인지 확인; q 에 한글 / 이모지가 있으면 바이트가 아닌 문자 수로 truncate.",
  "scene": "영어 번역은 정상, 긴 중국어 번역에서 가끔 202 — truncate 가 멀티바이트를 바이트로 잘랐기 때문, 유니코드 문자 기준으로 자르면 해결."
 },
 "203": {
  "cat": "인증 / 서명류",
  "alias": "ip 화이트리스트 access ip list",
  "trigger": "로컬은 되는데 클라우드 / 서버 교체 후 발생",
  "official": "접근 IP 가 허용 IP 목록에 없음.",
  "cause": "콘솔에서 앱에 IP 화이트리스트를 켰지만 호출 측 공인 출구 IP 가 목록에 없음(서버 증설·동적 출구·로컬 디버깅 모두 변함).",
  "fix": "실제 출구 IP 를 화이트리스트에 추가, 또는 허용 가능한 보안 전제하에 IP 제한 해제; 컨테이너 / 탄력 환경은 고정 출구(NAT 게이트웨이) 사용.",
  "scene": "로컬은 되는데 클라우드 올린 뒤 203 — 서버 출구 IP 가 화이트리스트에 없음."
 },
 "205": {
  "cat": "인증 / 서명류",
  "alias": "platform type sdk api 플랫폼",
  "official": "요청 인터페이스와 앱 플랫폼 유형 불일치: 연동 방식(Android SDK / iOS SDK / API)이 앱 생성 시 선택한 플랫폼 유형과 일치하는지 확인.",
  "cause": "앱 생성 시 「서버 / API」를 골랐는데 모바일 SDK 로 호출(또는 반대).",
  "fix": "앱 플랫폼 유형을 실제 연동 방식과 일치; 서버 호출이면 「서버」 앱 생성."
 },
 "206": {
  "cat": "인증 / 서명류",
  "alias": "timestamp curtime 시계 ntp 타임스탬프",
  "trigger": "컨테이너 / VM 시계 부정확 시",
  "official": "타임스탬프 무효로 서명 검증 실패.",
  "cause": "curtime 은 현재 UTC 초 단위 타임스탬프로 서명에 참여; 시계 드리프트·타임존 오류·밀리초 사용·고정값이면 curtime 무효(서명 약 120s 유효).",
  "fix": "초 단위 Unix 타임스탬프 사용; 서버 NTP 동기; 컨테이너는 호스트 시계 동기; 오래된 curtime 캐시 / 재사용 금지.",
  "scene": "Docker 컨테이너 시계가 수 분 드리프트해 운영에서 대량 206, NTP 동기 후 복구."
 },
 "207": {
  "cat": "인증 / 서명류",
  "alias": "replay salt uuid 재전송",
  "trigger": "salt 고정값 사용 또는 옛 요청 재전송",
  "official": "재전송 요청. 인터페이스는 salt + curtime 으로 재전송 방지(동일 요청은 2회 불가), salt 는 UUID 권장.",
  "cause": "salt 를 고정 / 증가 / 재사용했거나, 재시도 시 옛 salt + curtime 을 그대로 재전송해 재전송으로 판정.",
  "fix": "매 요청마다 랜덤 salt(UUID) 새로 생성하고 curtime 갱신; 실패 재시도는 반드시 다시 서명.",
  "scene": "버그 재현을 위해 salt 를 고정하니 두 번째 호출에서 207."
 },
 "303": {
  "cat": "결과 / 복호화 / 기타류",
  "alias": "server error request_id 서버",
  "official": "서버의 기타 예외.",
  "cause": "서버 내부 오류, 클라이언트 파라미터 문제 아님, 대개 일시적 변동.",
  "fix": "지수 백오프 재시도; 지속되면 request_id 와 함께 티켓."
 },
 "310": {
  "cat": "서비스 / 인스턴스류",
  "alias": "domain rejectFallback 도메인 번역",
  "official": "도메인 번역 서비스 미활성화.",
  "cause": "domain 으로 도메인 번역을 호출했지만 콘솔에서 해당 도메인 미활성화.",
  "fix": "콘솔에서 도메인 번역 활성화 후 domain / rejectFallback 전달, 또는 domain 제거하고 일반 번역."
 },
 "401": {
  "cat": "계정 / 과금 / 레이트리밋류",
  "alias": "잔액부족 충전 arrears balance",
  "trigger": "호출이 갑자기 전부 실패",
  "official": "계정이 이미 잔액 부족, 계정 충전을 진행하세요.",
  "cause": "계정 잔액 / 문자 리소스 팩 소진으로 정지; 후불 미개통 또는 리소스 팩 소진.",
  "fix": "콘솔 충전 또는 리소스 팩 구매; 잔액 / 사용량 알림 설정; 핵심 업무엔 대체 번역 채널.",
  "scene": "월말 문자 팩 소진으로 운영 번역 전부 401, 충전 후 복구."
 },
 "411": {
  "cat": "계정 / 과금 / 레이트리밋류",
  "alias": "qps rate limit 레이트리밋 빈도",
  "trigger": "동시성 / 부하 테스트 시 대량 발생",
  "official": "접근 빈도 제한, 잠시 후 접근하세요.",
  "cause": "앱 QPS 상한 초과(기본 약 100 QPS, 콘솔에서 추가 구매 가능); 돌발 동시성에 클라이언트 레이트 리밋 미적용.",
  "fix": "클라이언트 토큰 버킷 / 리키 버킷 레이트 리밋 + 지수 백오프; 요청 병합 / 분산; 더 높은 동시성은 QPS 추가 구매.",
  "scene": "부하 테스트 순간 동시성 폭주로 대량 411, 레이트 리미터 추가 후 안정."
 },
 "412": {
  "cat": "계정 / 과금 / 레이트리밋류",
  "alias": "long request 긴 요청",
  "official": "긴 요청이 너무 잦음, 잠시 후 접근하세요.",
  "cause": "긴 텍스트 / 무거운 인터페이스를 단시간에 과도하게 밀집 호출.",
  "fix": "긴 요청 빈도 낮춤(수 초 간격); 긴 글은 문서 번역 인터페이스로."
 },
 "500": {
  "cat": "결과 / 복호화 / 기타류",
  "alias": "translate failed errormessage",
  "official": "번역 실패, errorMessage 를 참고하세요.",
  "cause": "서버가 반환한 폴백 실패, errorMessage 와 함께 구체 원인 확인 필요.",
  "fix": "errorMessage / request_id 로 위치 파악; from / to / q 조합 확인."
 },
 "902000": {
  "cat": "결과 / 복호화 / 기타류",
  "alias": "llm 대모델 번역 실패",
  "official": "대모델 번역 호출 실패(대모델 번역 인터페이스).",
  "cause": "대모델 번역 경로 이상 또는 입력값 부적합(i 5000자 제한, prompt 길이 제한 등).",
  "fix": "대모델 인터페이스 입력값과 길이 제한 확인; 지수 백오프 재시도 및 request_id 동봉."
 }
};
window.LABELS = {"miss": "해당 오류 코드는 미수록입니다. 다른 코드/키워드로 검색하거나 아래 전체 표를 보세요.", "codeword": "오류 코드 "};
window.FIELDS = [["trigger", "언제 발생하나"], ["official", "L1 공식 의미"], ["cause", "L2 근본 원인"], ["fix", "어떻게 점검/해결"], ["scene", "실제 사례"]];
window.THEAD = ["오류 코드", "분류", "L1 공식 의미", "L2 근본 원인"];
