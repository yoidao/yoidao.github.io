window.CODES = {
 "101": {
  "cat": "Parâmetros",
  "alias": "missing required parameter parametro ausente",
  "trigger": "Primeira integração ou migração v1 → v3",
  "official": "Falta um parâmetro obrigatório. Garanta os obrigatórios e confira a grafia (maiúsculas/minúsculas).",
  "cause": "v3 exige 8: q、from、to、appKey、salt、sign、signType、curtime. Um faltando ou nome errado = 101; v1 não tinha curtime / signType (os mais esquecidos na migração).",
  "fix": "Coteje a tabela oficial de parâmetros; confirme signType=v3 e curtime (timestamp em segundos) presentes.",
  "scene": "Adaptar um demo v1 para v3 esquecendo curtime e signType → 101 constante."
 },
 "102": {
  "cat": "Parâmetros",
  "alias": "language not supported idioma zh-CHS",
  "official": "Tipo de idioma não suportado.",
  "cause": "Youdao usa zh-CHS / zh-CHT / en / ja / ko…; zh / zh-CN / cn não são reconhecidos; strict=true com direção não suportada também falha.",
  "fix": "Use o código exato da tabela oficial; em dúvida, from=auto e strict padrão (false)."
 },
 "103": {
  "cat": "Parâmetros",
  "alias": "text too long longo 5000",
  "official": "Texto a traduzir longo demais.",
  "cause": "Limite de caracteres por requisição excedido (interfaces de modelo/documento i ≤ 5000).",
  "fix": "Divida por frase / parágrafo e envie em lotes; documentos longos pela interface de documentos."
 },
 "108": {
  "cat": "Auth / assinatura",
  "alias": "appkey invalid id do app app key",
  "trigger": "appKey errado, app sem criar / serviço não vinculado, ou assinatura expirada",
  "official": "ID do app inválido. Registre conta, crie o app no console e vincule o serviço para obter appKey e appSecret.",
  "cause": "appKey com caracteres perdidos / espaços; ou app sem instância do serviço; às vezes assinatura expirada (curtime longe da hora do servidor, ~120s).",
  "fix": "Verifique o appKey (sem espaços); confirme a instância vinculada; curtime atual em segundos.",
  "scene": "App novo chamado direto sem vincular a instância de tradução → 108 / 110."
 },
 "110": {
  "cat": "Serviço / instância",
  "alias": "no valid instance vincular tts",
  "trigger": "O app não vinculou a instância exigida pela chamada",
  "official": "Sem instância válida do serviço: o app não vinculou instância, crie e vincule. A pronúncia exige instância TTS separada.",
  "cause": "Cada app vincula uma instância por serviço - tradução / TTS / OCR separados; vincular só tradução e pedir voice → 110.",
  "fix": "Vincule no console cada instância por serviço (tradução / TTS / OCR).",
  "scene": "Tradução OK mas pedido de voz dá 110 - instância TTS ausente."
 },
 "111": {
  "cat": "Auth / assinatura",
  "alias": "developer account invalid conta",
  "official": "Conta de desenvolvedor inválida.",
  "cause": "Conta sem verificação de desenvolvedor, estado anômalo ou controle de risco.",
  "fix": "Verifique estado e verificação real / de desenvolvedor no console; ticket se preciso."
 },
 "113": {
  "cat": "Parâmetros",
  "alias": "q empty vazio",
  "official": "q não pode estar vazio.",
  "cause": "Campo q ausente ou vazio; em lote, algum elemento vazio.",
  "fix": "Valide q não vazio antes de chamar; filtre elementos vazios em lote."
 },
 "116": {
  "cat": "Parâmetros",
  "alias": "strict invalid",
  "official": "Valor de strict inválido; consulte a documentação.",
  "cause": "strict só aceita a string \"true\" / \"false\"; 1 / 0 ou outros falham.",
  "fix": "strict como \"true\" ou \"false\"; sem direção estrita, não envie."
 },
 "201": {
  "cat": "Resultado / descriptografia / outros",
  "alias": "decrypt descriptografia des base64",
  "official": "Falha na descriptografia: possível erro de DES, BASE64 ou URLDecode.",
  "cause": "Em interfaces de criptografia de transporte, cifra / codificação / padding não batem com o combinado.",
  "fix": "Coteje a doc da interface criptografada: chave/IV DES, BASE64 e ordem do URLDecode."
 },
 "202": {
  "cat": "Auth / assinatura",
  "alias": "signature failed assinatura sign auth",
  "trigger": "O mais frequente: string mal montada, codificação, espaços",
  "official": "Verificação de assinatura falhou. Se ID e chave estão certos e persiste, costuma ser codificação: garanta q em UTF-8.",
  "cause": "Assinatura v3 = sha256(appKey + input + salt + curtime + appSecret), quatro armadilhas: ① ordem (deve ser appKey→input→salt→curtime→appSecret); ② truncamento do input - q&gt;20: 10 + tamanho + 10, ≤20: q, por caracteres Unicode e não bytes; ③ espaços/quebras em q ou chave; ④ sem UTF-8 antes do SHA256, ou saída não em hex minúsculo.",
  "fix": "Verifique com a função de assinatura do SDK oficial; imprima e compare caractere a caractere; hex minúsculo; para CJK/emoji trunque por caracteres.",
  "scene": "Inglês OK, chinês longo às vezes 202 - o truncamento cortou por bytes; cortar por caracteres Unicode resolve."
 },
 "203": {
  "cat": "Auth / assinatura",
  "alias": "ip whitelist access ip list",
  "trigger": "OK no local mas falha na nuvem / outra máquina",
  "official": "O IP de acesso não está na lista permitida.",
  "cause": "Whitelist de IP ativa mas o IP público de saída não está nela (escalonamento, saída dinâmica, debug local mudam).",
  "fix": "Adicione o IP real de saída ou desative a restrição se for seguro; em contêiner use saída fixa (NAT).",
  "scene": "Local OK, na nuvem 203 - IP de saída do servidor não estava na lista."
 },
 "205": {
  "cat": "Auth / assinatura",
  "alias": "platform type sdk api plataforma",
  "official": "A interface não bate com o tipo de plataforma do app: alinhe o método (SDK Android/iOS / API) ao escolhido na criação.",
  "cause": "Escolheu «servidor / API» mas chama com SDK móvel (ou o contrário).",
  "fix": "Alinhe o tipo de plataforma ao método real; para chamada de servidor, app «servidor»."
 },
 "206": {
  "cat": "Auth / assinatura",
  "alias": "timestamp curtime relogio ntp",
  "trigger": "Relógio de contêiner / VM impreciso",
  "official": "Timestamp inválido, por isso a assinatura falha.",
  "cause": "curtime deve ser UTC em segundos e entrar na assinatura; desvio, fuso errado, milissegundos ou valor fixo invalidam (assinatura ~120s).",
  "fix": "Timestamp Unix em segundos; ative NTP; sincronize o contêiner com o host; não faça cache de curtime.",
  "scene": "Contêiner Docker com relógio desviado → muitos 206; com NTP se recupera."
 },
 "207": {
  "cat": "Auth / assinatura",
  "alias": "replay salt uuid repeticao",
  "trigger": "salt fixo ou reenvio de requisição antiga",
  "official": "Requisição em replay. salt + curtime evitam replay (não 2 vezes); salt de preferência UUID.",
  "cause": "salt fixo / autoincremental / reutilizado, ou retry reenviando o salt + curtime antigos.",
  "fix": "Gere salt aleatório (UUID) e renove curtime a cada requisição; no retry, reassine.",
  "scene": "Fixar salt para reproduzir um bug → 207 na segunda chamada."
 },
 "303": {
  "cat": "Resultado / descriptografia / outros",
  "alias": "server error request_id",
  "official": "Outra exceção do servidor.",
  "cause": "Erro interno do servidor, não de parâmetro do cliente; em geral pontual.",
  "fix": "Tente de novo com backoff exponencial; se persistir, ticket com request_id."
 },
 "310": {
  "cat": "Serviço / instância",
  "alias": "domain rejectFallback dominio",
  "official": "Serviço de tradução por domínio não ativado.",
  "cause": "Enviou domain mas o console não ativou esse domínio.",
  "fix": "Ative a tradução por domínio e envie domain / rejectFallback, ou remova domain para tradução geral."
 },
 "401": {
  "cat": "Conta / cobrança / limite",
  "alias": "saldo recarregar arrears balance",
  "trigger": "De repente tudo falha",
  "official": "A conta está negativa; recarregue.",
  "cause": "Saldo / pacote de caracteres esgotado corta o serviço; pós-pago não ativo ou pacote consumido.",
  "fix": "Recarregue ou compre pacote; alertas de saldo / uso; canal reserva para o crítico.",
  "scene": "Fim do mês, pacote vazio, tudo 401; após recarga volta."
 },
 "411": {
  "cat": "Conta / cobrança / limite",
  "alias": "qps rate limit limite frequencia",
  "trigger": "Aparece muito em concorrência / teste de carga",
  "official": "Frequência de acesso limitada; tente mais tarde.",
  "cause": "QPS do app excedido (base ~100, ampliável no console); concorrência súbita sem limitação no cliente.",
  "fix": "Token bucket / leaky bucket + backoff exponencial; agrupe / distribua requisições; compre QPS se preciso.",
  "scene": "Pico de carga satura → muitos 411; com limitador fica estável."
 },
 "412": {
  "cat": "Conta / cobrança / limite",
  "alias": "long request requisicao longa",
  "official": "Requisições longas frequentes demais; tente mais tarde.",
  "cause": "Texto longo / interface pesada densos demais em pouco tempo.",
  "fix": "Reduza a frequência de requisições longas (segundos de intervalo); textos longos pela interface de documentos."
 },
 "500": {
  "cat": "Resultado / descriptografia / outros",
  "alias": "translate failed errormessage",
  "official": "Falha na tradução; veja errorMessage.",
  "cause": "Falha genérica do servidor; precisa de errorMessage para a causa exata.",
  "fix": "Localize via errorMessage / request_id; confira a combinação from / to / q."
 },
 "902000": {
  "cat": "Resultado / descriptografia / outros",
  "alias": "llm modelo grande",
  "official": "Falha na chamada de tradução por modelo grande.",
  "cause": "Anomalia do fluxo de modelo grande ou entrada inválida (i ≤ 5000, limite de prompt…).",
  "fix": "Confira a entrada e o limite de tamanho; tente de novo com backoff e request_id."
 }
};
window.LABELS = {"miss": "Código não listado; tente outro código ou palavra-chave, ou veja a tabela completa abaixo.", "codeword": "Código de erro "};
window.FIELDS = [["trigger", "Quando aparece"], ["official", "Significado oficial L1"], ["cause", "Causa raiz L2"], ["fix", "Como diagnosticar / resolver"], ["scene", "Caso real"]];
window.THEAD = ["Código", "Categoria", "Significado oficial L1", "Causa raiz L2"];
