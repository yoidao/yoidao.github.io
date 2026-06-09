window.CODES = {
 "101": {
  "cat": "Tham số",
  "alias": "missing required parameter thieu tham so",
  "trigger": "Tích hợp lần đầu hoặc chuyển v1 → v3",
  "official": "Thiếu tham số bắt buộc. Đảm bảo đủ các tham số bắt buộc, rồi kiểm chính tả (chữ hoa/thường).",
  "cause": "v3 cần 8: q、from、to、appKey、salt、sign、signType、curtime. Thiếu một hoặc sai tên = 101; v1 không có curtime / signType (hay quên nhất khi chuyển).",
  "fix": "Đối chiếu bảng tham số chính thức; xác nhận có signType=v3 và curtime (timestamp theo giây).",
  "scene": "Sửa demo v1 sang v3 quên curtime và signType → 101 liên tục."
 },
 "102": {
  "cat": "Tham số",
  "alias": "language not supported ngon ngu zh-CHS",
  "official": "Loại ngôn ngữ không được hỗ trợ.",
  "cause": "Youdao dùng zh-CHS / zh-CHT / en / ja / ko…; zh / zh-CN / cn không nhận; strict=true với hướng không hỗ trợ cũng lỗi.",
  "fix": "Dùng mã chính xác từ bảng chính thức; nếu phân vân, from=auto và strict mặc định (false)."
 },
 "103": {
  "cat": "Tham số",
  "alias": "text too long dai 5000",
  "official": "Văn bản dịch quá dài.",
  "cause": "Vượt giới hạn ký tự mỗi yêu cầu (giao diện mô hình/tài liệu i ≤ 5000).",
  "fix": "Chia theo câu / đoạn và gửi theo lô; tài liệu dài qua giao diện dịch tài liệu."
 },
 "108": {
  "cat": "Xác thực / chữ ký",
  "alias": "appkey invalid id ung dung app key",
  "trigger": "appKey sai, app chưa tạo / dịch vụ chưa gắn, hoặc chữ ký hết hạn",
  "official": "ID ứng dụng không hợp lệ. Đăng ký tài khoản, tạo app ở bảng điều khiển và gắn dịch vụ để có appKey và appSecret.",
  "cause": "appKey mất ký tự / có khoảng trắng; hoặc app chưa có instance dịch vụ; đôi khi chữ ký hết hạn (curtime cách giờ máy chủ quá xa, ~120s).",
  "fix": "Kiểm appKey (bỏ khoảng trắng); xác nhận instance đã gắn; curtime hiện tại theo giây.",
  "scene": "App mới gọi thẳng mà chưa gắn instance dịch → 108 / 110."
 },
 "110": {
  "cat": "Dịch vụ / instance",
  "alias": "no valid instance gan tts",
  "trigger": "App chưa gắn instance mà lời gọi cần",
  "official": "Không có instance dịch vụ hợp lệ: app chưa gắn instance, hãy tạo và gắn. Phát âm cần instance TTS riêng.",
  "cause": "Mỗi app gắn một instance theo dịch vụ - dịch / TTS / OCR riêng; chỉ gắn dịch mà gọi voice → 110.",
  "fix": "Gắn ở bảng điều khiển từng instance theo dịch vụ (dịch / TTS / OCR).",
  "scene": "Dịch OK nhưng xin giọng đọc báo 110 - thiếu instance TTS."
 },
 "111": {
  "cat": "Xác thực / chữ ký",
  "alias": "developer account invalid tai khoan",
  "official": "Tài khoản nhà phát triển không hợp lệ.",
  "cause": "Tài khoản chưa xác minh nhà phát triển, trạng thái bất thường hoặc bị kiểm soát rủi ro.",
  "fix": "Kiểm trạng thái và xác minh thật / nhà phát triển ở bảng điều khiển; mở ticket nếu cần."
 },
 "113": {
  "cat": "Tham số",
  "alias": "q empty rong",
  "official": "q không được rỗng.",
  "cause": "Trường q thiếu hoặc rỗng; trong lô có phần tử rỗng.",
  "fix": "Kiểm q không rỗng trước khi gọi; lọc phần tử rỗng trong lô."
 },
 "116": {
  "cat": "Tham số",
  "alias": "strict invalid",
  "official": "Giá trị strict không hợp lệ; xem tài liệu.",
  "cause": "strict chỉ nhận chuỗi \"true\" / \"false\"; 1 / 0 v.v. lỗi.",
  "fix": "strict là \"true\" hoặc \"false\"; không cần hướng nghiêm thì đừng gửi."
 },
 "201": {
  "cat": "Kết quả / giải mã / khác",
  "alias": "decrypt giai ma des base64",
  "official": "Giải mã thất bại: có thể lỗi DES, BASE64 hoặc URLDecode.",
  "cause": "Với giao diện mã hóa truyền tải, mã / encoding / padding không khớp thỏa thuận.",
  "fix": "Đối chiếu tài liệu giao diện mã hóa: khóa/IV DES, BASE64 và thứ tự URLDecode."
 },
 "202": {
  "cat": "Xác thực / chữ ký",
  "alias": "signature failed chu ky sign auth",
  "trigger": "Thường gặp nhất: chuỗi ghép sai, mã hóa, khoảng trắng",
  "official": "Kiểm tra chữ ký thất bại. Nếu ID và khóa đúng mà vẫn lỗi, thường là mã hóa: đảm bảo q là UTF-8.",
  "cause": "Chữ ký v3 = sha256(appKey + input + salt + curtime + appSecret), bốn bẫy: ① thứ tự (phải appKey→input→salt→curtime→appSecret); ② cắt input - q&gt;20: 10 + độ dài + 10, ≤20: q, theo ký tự Unicode chứ không phải byte; ③ khoảng trắng/xuống dòng trong q hoặc khóa; ④ không UTF-8 trước SHA256, hoặc output không hex chữ thường.",
  "fix": "Kiểm bằng hàm chữ ký của SDK chính thức; in và so từng ký tự; hex chữ thường; với CJK/emoji cắt theo ký tự.",
  "scene": "Tiếng Anh OK, tiếng Trung dài đôi khi 202 - truncation cắt theo byte; cắt theo ký tự Unicode là khắc phục."
 },
 "203": {
  "cat": "Xác thực / chữ ký",
  "alias": "ip whitelist access ip list",
  "trigger": "OK ở local nhưng lỗi trên cloud / đổi máy",
  "official": "IP truy cập không nằm trong danh sách cho phép.",
  "cause": "Whitelist IP đang bật nhưng IP ra công cộng không có (mở rộng, ngõ ra động, debug local làm thay đổi).",
  "fix": "Thêm IP ra thật hoặc tắt giới hạn nếu an toàn; trong container dùng ngõ ra cố định (NAT).",
  "scene": "Local OK, lên cloud 203 - IP ra của máy chủ chưa có trong danh sách."
 },
 "205": {
  "cat": "Xác thực / chữ ký",
  "alias": "platform type sdk api nen tang",
  "official": "Giao diện không khớp loại nền tảng của app: căn chỉnh phương thức (SDK Android/iOS / API) theo lựa chọn khi tạo.",
  "cause": "Chọn «máy chủ / API» nhưng gọi bằng SDK di động (hoặc ngược lại).",
  "fix": "Căn loại nền tảng theo phương thức thật; gọi từ máy chủ thì dùng app «máy chủ»."
 },
 "206": {
  "cat": "Xác thực / chữ ký",
  "alias": "timestamp curtime dong ho ntp",
  "trigger": "Đồng hồ container / VM thiếu chính xác",
  "official": "Timestamp không hợp lệ nên chữ ký thất bại.",
  "cause": "curtime phải là UTC theo giây và tham gia chữ ký; lệch, sai múi giờ, mili-giây hoặc giá trị cố định làm nó vô hiệu (chữ ký ~120s).",
  "fix": "Dùng timestamp Unix theo giây; bật NTP; đồng bộ container với host; đừng cache curtime.",
  "scene": "Container Docker lệch đồng hồ → nhiều 206; bật NTP thì hồi phục."
 },
 "207": {
  "cat": "Xác thực / chữ ký",
  "alias": "replay salt uuid phat lai",
  "trigger": "salt cố định hoặc gửi lại yêu cầu cũ",
  "official": "Yêu cầu phát lại. salt + curtime chống phát lại (không 2 lần); salt nên là UUID.",
  "cause": "salt cố định / tăng dần / dùng lại, hoặc retry gửi lại salt + curtime cũ.",
  "fix": "Tạo salt ngẫu nhiên (UUID) và làm mới curtime mỗi yêu cầu; khi retry, ký lại.",
  "scene": "Cố định salt để tái hiện bug → 207 ở lần gọi thứ hai."
 },
 "303": {
  "cat": "Kết quả / giải mã / khác",
  "alias": "server error request_id",
  "official": "Ngoại lệ máy chủ khác.",
  "cause": "Lỗi nội bộ máy chủ, không phải vấn đề tham số client; thường nhất thời.",
  "fix": "Thử lại với backoff lũy thừa; nếu tiếp diễn, mở ticket kèm request_id."
 },
 "310": {
  "cat": "Dịch vụ / instance",
  "alias": "domain rejectFallback linh vuc",
  "official": "Dịch vụ dịch theo lĩnh vực chưa bật.",
  "cause": "Gửi domain nhưng bảng điều khiển chưa bật lĩnh vực đó.",
  "fix": "Bật dịch theo lĩnh vực rồi gửi domain / rejectFallback, hoặc bỏ domain để dịch tổng quát."
 },
 "401": {
  "cat": "Tài khoản / thanh toán / giới hạn",
  "alias": "so du nap arrears balance",
  "trigger": "Đột nhiên tất cả thất bại",
  "official": "Tài khoản đã âm; vui lòng nạp tiền.",
  "cause": "Số dư / gói ký tự cạn dừng dịch vụ; trả sau chưa bật hoặc gói đã dùng hết.",
  "fix": "Nạp hoặc mua gói; cảnh báo số dư / mức dùng; kênh dự phòng cho phần quan trọng.",
  "scene": "Cuối tháng hết gói, tất cả 401; nạp xong hồi phục."
 },
 "411": {
  "cat": "Tài khoản / thanh toán / giới hạn",
  "alias": "qps rate limit gioi han tan suat",
  "trigger": "Xuất hiện nhiều khi đồng thời / kiểm tải",
  "official": "Tần suất truy cập bị giới hạn; thử lại sau.",
  "cause": "Vượt QPS của app (cơ bản ~100, mua thêm ở bảng điều khiển); đồng thời đột ngột mà không giới hạn ở client.",
  "fix": "Token bucket / leaky bucket + backoff lũy thừa; gộp / phân tán yêu cầu; mua thêm QPS nếu cần.",
  "scene": "Đỉnh tải bão hòa → nhiều 411; có bộ giới hạn thì ổn định."
 },
 "412": {
  "cat": "Tài khoản / thanh toán / giới hạn",
  "alias": "long request yeu cau dai",
  "official": "Yêu cầu dài quá thường xuyên; thử lại sau.",
  "cause": "Văn bản dài / giao diện nặng dồn dập trong thời gian ngắn.",
  "fix": "Giảm tần suất yêu cầu dài (cách nhau vài giây); văn bản dài qua giao diện tài liệu."
 },
 "500": {
  "cat": "Kết quả / giải mã / khác",
  "alias": "translate failed errormessage",
  "official": "Dịch thất bại; xem errorMessage.",
  "cause": "Lỗi chung của máy chủ; cần errorMessage để biết nguyên nhân cụ thể.",
  "fix": "Định vị qua errorMessage / request_id; kiểm tổ hợp from / to / q."
 },
 "902000": {
  "cat": "Kết quả / giải mã / khác",
  "alias": "llm mo hinh lon",
  "official": "Lời gọi dịch mô hình lớn thất bại.",
  "cause": "Bất thường luồng mô hình lớn hoặc đầu vào không hợp lệ (i ≤ 5000, giới hạn độ dài prompt…).",
  "fix": "Kiểm đầu vào và giới hạn độ dài; thử lại với backoff và request_id."
 }
};
window.LABELS = {"miss": "Mã không có trong danh sách; thử mã hoặc từ khóa khác, hoặc xem bảng đầy đủ bên dưới.", "codeword": "Mã lỗi "};
window.FIELDS = [["trigger", "Khi nào xuất hiện"], ["official", "Ý nghĩa chính thức L1"], ["cause", "Nguyên nhân gốc L2"], ["fix", "Cách chẩn đoán / khắc phục"], ["scene", "Tình huống thực"]];
window.THEAD = ["Mã", "Phân loại", "Ý nghĩa chính thức L1", "Nguyên nhân gốc L2"];
