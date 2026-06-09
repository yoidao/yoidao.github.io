window.CODES = {
 "101": {
  "cat": "Parámetros",
  "alias": "missing required parameter falta parametro",
  "trigger": "Primera integración o al migrar de v1 a v3",
  "official": "Falta un parámetro obligatorio. Asegura los obligatorios y revisa la escritura (mayúsculas/minúsculas).",
  "cause": "v3 exige 8: q、from、to、appKey、salt、sign、signType、curtime. Falta uno o un nombre mal escrito = 101; v1 no tenía curtime / signType (lo más omitido al migrar).",
  "fix": "Coteja la tabla oficial de parámetros; confirma signType=v3 y curtime (timestamp en segundos) presentes.",
  "scene": "Adaptar un demo v1 a v3 olvidando curtime y signType da 101 constante."
 },
 "102": {
  "cat": "Parámetros",
  "alias": "language not supported idioma zh-CHS",
  "trigger": "from / to con un código de idioma no admitido",
  "official": "Tipo de idioma no admitido.",
  "cause": "Youdao usa zh-CHS / zh-CHT / en / ja / ko…; zh / zh-CN / cn no se reconocen. Con strict=true y dirección no admitida también falla.",
  "fix": "Usa el código exacto de la tabla oficial; si dudas, from=auto y strict por defecto (false).",
  "scene": "Escribir zh-CN da 102; con zh-CHS funciona."
 },
 "103": {
  "cat": "Parámetros",
  "alias": "text too long largo 5000",
  "official": "Texto a traducir demasiado largo.",
  "cause": "Se supera el límite de caracteres por petición (interfaces de modelo/documento i ≤ 5000) al enviar un texto largo sin trocear.",
  "fix": "Trocea por frase / párrafo y envía por lotes; los documentos largos van por la interfaz de traducción de documentos."
 },
 "108": {
  "cat": "Auth / firma",
  "alias": "appkey invalid id de app app key",
  "trigger": "appKey erróneo, app sin crear / sin servicio, o firma caducada",
  "official": "ID de app no válido. Registra la cuenta, crea la app en la consola y vincula el servicio para obtener appKey y appSecret.",
  "cause": "appKey con caracteres perdidos / espacios; o app sin la instancia del servicio. A veces la firma caduca (curtime muy lejos de la hora del servidor, ~120s) y se ve como fallo de auth.",
  "fix": "Verifica el appKey (sin espacios); confirma la instancia vinculada; asegura curtime en segundos actual.",
  "scene": "App nueva llamada directa sin vincular la instancia de traducción → 108 / 110."
 },
 "110": {
  "cat": "Servicio / instancia",
  "alias": "no valid instance vincular tts",
  "trigger": "La app no vinculó la instancia que requiere la llamada",
  "official": "Sin instancia válida del servicio: la app no vinculó instancia, créala y vincúlala. La pronunciación requiere instancia TTS aparte.",
  "cause": "Cada app vincula una instancia por servicio — traducción / TTS / OCR independientes. Vincular solo traducción y pedir voice → 110.",
  "fix": "Vincula en la consola cada instancia por servicio (traducción / TTS / OCR).",
  "scene": "Traduce bien pero al pedir voz da 110 — falta la instancia TTS."
 },
 "111": {
  "cat": "Auth / firma",
  "alias": "developer account invalid cuenta",
  "official": "Cuenta de desarrollador no válida.",
  "cause": "Cuenta sin verificación de desarrollador, estado anómalo o bajo control de riesgo.",
  "fix": "Revisa el estado y la verificación real / de desarrollador en la consola; abre ticket si hace falta."
 },
 "113": {
  "cat": "Parámetros",
  "alias": "q empty vacio",
  "official": "q no puede estar vacío.",
  "cause": "Campo q ausente o vacío; en lotes, algún elemento vacío.",
  "fix": "Valida q no vacío antes de llamar; filtra elementos vacíos en lotes."
 },
 "116": {
  "cat": "Parámetros",
  "alias": "strict invalid",
  "official": "Valor de strict no válido; consulta la documentación.",
  "cause": "strict solo acepta la cadena \"true\" / \"false\"; 1 / 0 u otros fallan.",
  "fix": "Pasa strict como \"true\" o \"false\"; si no necesitas dirección estricta, no lo envíes."
 },
 "201": {
  "cat": "Resultado / descifrado / otros",
  "alias": "decrypt descifrado des base64",
  "official": "Fallo de descifrado: posible error de DES, BASE64 o URLDecode.",
  "cause": "Con interfaces de cifrado de transporte, el cifrado / codificación / relleno no coincide con lo acordado.",
  "fix": "Coteja la doc de la interfaz cifrada: clave/IV DES, BASE64 y orden de URLDecode."
 },
 "202": {
  "cat": "Auth / firma",
  "alias": "signature failed firma sign auth",
  "trigger": "El más frecuente: cadena mal armada, codificación o espacios",
  "official": "Validación de firma fallida. Si el ID y la clave son correctos y persiste, suele ser codificación: asegura q en UTF-8.",
  "cause": "Firma v3 = sha256(appKey + input + salt + curtime + appSecret), cuatro trampas: ① orden (debe ser appKey→input→salt→curtime→appSecret); ② truncado de input — q&gt;20: 10 primeros + longitud + 10 últimos, ≤20: q, contando caracteres Unicode no bytes; ③ espacios/saltos en q o clave; ④ no codificar UTF-8 antes de SHA256, o no pasar a hex minúscula.",
  "fix": "Verifica con la función de firma del SDK oficial; imprime y compara la cadena carácter a carácter; confirma hex minúscula; con CJK/emoji trunca por caracteres.",
  "scene": "Inglés bien, chino largo a veces 202 — el truncado cortó por bytes; cortar por caracteres Unicode lo arregla."
 },
 "203": {
  "cat": "Auth / firma",
  "alias": "ip lista blanca access ip list",
  "trigger": "Va en local pero falla en la nube / otra máquina",
  "official": "La IP de acceso no está en la lista permitida.",
  "cause": "Hay lista blanca de IP pero la IP pública de salida no está (escalado, salida dinámica, pruebas locales la cambian).",
  "fix": "Añade la IP real a la lista o desactiva la restricción si es seguro; en contenedores usa salida fija (NAT).",
  "scene": "Local bien, en la nube 203 — la IP de salida del servidor no estaba en la lista."
 },
 "205": {
  "cat": "Auth / firma",
  "alias": "platform type sdk api plataforma",
  "official": "La interfaz no coincide con el tipo de plataforma de la app: alinea el método (Android/iOS SDK / API) con lo elegido al crearla.",
  "cause": "Elegiste «servidor / API» pero llamas con SDK móvil (o al revés).",
  "fix": "Alinea el tipo de plataforma con el método real; para servidor crea app de «servidor»."
 },
 "206": {
  "cat": "Auth / firma",
  "alias": "timestamp curtime reloj ntp",
  "trigger": "Reloj de contenedor / VM impreciso",
  "official": "Timestamp no válido, por eso falla la firma.",
  "cause": "curtime debe ser UTC en segundos y entrar en la firma; deriva de reloj, zona errónea, milisegundos o valor fijo lo invalidan (firma ~120s).",
  "fix": "Usa timestamp Unix en segundos; activa NTP; sincroniza el contenedor con el host; no caches curtime.",
  "scene": "Contenedor Docker con reloj desfasado → muchos 206; con NTP se recupera."
 },
 "207": {
  "cat": "Auth / firma",
  "alias": "replay salt uuid repeticion",
  "trigger": "salt fijo o reenvío de una petición vieja",
  "official": "Petición repetida. salt + curtime evitan repetición (no 2 veces); salt mejor UUID.",
  "cause": "salt fijo / autoincremental / reutilizado, o reintento reenviando el salt + curtime viejos.",
  "fix": "Genera salt aleatorio (UUID) y refresca curtime en cada petición; al reintentar, vuelve a firmar.",
  "scene": "Fijar salt para reproducir un bug → 207 en la segunda llamada."
 },
 "303": {
  "cat": "Resultado / descifrado / otros",
  "alias": "server error request_id",
  "official": "Otra excepción del servidor.",
  "cause": "Error interno del servidor, no de parámetros del cliente; suele ser puntual.",
  "fix": "Reintenta con backoff exponencial; si persiste, abre ticket con request_id."
 },
 "310": {
  "cat": "Servicio / instancia",
  "alias": "domain rejectFallback dominio",
  "official": "Servicio de traducción por dominio no activado.",
  "cause": "Enviaste domain pero la consola no tiene activado ese dominio.",
  "fix": "Activa la traducción por dominio y luego envía domain / rejectFallback, o quita domain para traducción general."
 },
 "401": {
  "cat": "Cuenta / facturación / límite",
  "alias": "saldo recargar arrears balance",
  "trigger": "De repente todo falla",
  "official": "La cuenta tiene saldo negativo; recarga.",
  "cause": "Saldo / paquete de caracteres agotado corta el servicio; pospago sin activar o paquete consumido.",
  "fix": "Recarga o compra paquete; configura alertas de saldo / uso; ten un canal de respaldo.",
  "scene": "A fin de mes se agota el paquete y todo da 401; con recarga se recupera."
 },
 "411": {
  "cat": "Cuenta / facturación / límite",
  "alias": "qps rate limit limite frecuencia",
  "trigger": "Aparece mucho en concurrencia / pruebas de carga",
  "official": "Frecuencia de acceso limitada; inténtalo más tarde.",
  "cause": "Se superó el QPS de la app (base ~100, ampliable en consola); concurrencia súbita sin limitar en cliente.",
  "fix": "Token bucket / leaky bucket + backoff exponencial; agrupa / reparte peticiones; compra más QPS si hace falta.",
  "scene": "Pico de carga satura → muchos 411; con limitador se estabiliza."
 },
 "412": {
  "cat": "Cuenta / facturación / límite",
  "alias": "long request peticion larga",
  "official": "Peticiones largas demasiado frecuentes; inténtalo más tarde.",
  "cause": "Texto largo / interfaz pesada demasiado densos en poco tiempo.",
  "fix": "Reduce la frecuencia de peticiones largas (segundos de margen); textos largos por la interfaz de documentos."
 },
 "500": {
  "cat": "Resultado / descifrado / otros",
  "alias": "translate failed errormessage",
  "official": "Fallo de traducción; revisa errorMessage.",
  "cause": "Fallo genérico del servidor; necesita errorMessage para la causa concreta.",
  "fix": "Localiza con errorMessage / request_id; revisa la combinación from / to / q."
 },
 "902000": {
  "cat": "Resultado / descifrado / otros",
  "alias": "llm modelo grande",
  "official": "Fallo de la llamada de traducción con modelo grande.",
  "cause": "Anomalía del flujo de modelo grande o entrada inválida (i ≤ 5000, límite de prompt…).",
  "fix": "Revisa la entrada y el límite de longitud; reintenta con backoff y request_id."
 }
};
window.LABELS = {"miss": "Código no listado; prueba otro código o palabra clave, o consulta la tabla completa abajo.", "codeword": "Código de error "};
window.FIELDS = [["trigger", "Cuándo aparece"], ["official", "Significado oficial L1"], ["cause", "Causa raíz L2"], ["fix", "Cómo diagnosticar / resolver"], ["scene", "Caso real"]];
window.THEAD = ["Código", "Categoría", "Significado oficial L1", "Causa raíz L2"];
