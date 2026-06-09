window.CODES = {
 "101": {
  "cat": "Paramètres",
  "alias": "missing required parameter parametre manquant",
  "trigger": "Première intégration ou migration v1 → v3",
  "official": "Paramètre obligatoire manquant. Complétez d'abord les obligatoires, puis vérifiez la casse.",
  "cause": "v3 exige 8 : q、from、to、appKey、salt、sign、signType、curtime. Un manquant ou un nom mal écrit = 101 ; v1 n'avait pas curtime / signType (les plus oubliés à la migration).",
  "fix": "Comparez au tableau officiel des paramètres ; confirmez signType=v3 et curtime (horodatage en secondes) présents.",
  "scene": "Adapter un démo v1 en v3 en oubliant curtime et signType → 101 constant."
 },
 "102": {
  "cat": "Paramètres",
  "alias": "language not supported langue zh-CHS",
  "trigger": "from / to avec un code de langue non pris en charge",
  "official": "Type de langue non pris en charge.",
  "cause": "Youdao utilise zh-CHS / zh-CHT / en / ja / ko… ; zh / zh-CN / cn ne sont pas reconnus. Avec strict=true et direction non prise en charge, échoue aussi.",
  "fix": "Code exact du tableau officiel ; en cas de doute, from=auto et strict par défaut (false).",
  "scene": "zh-CN donne 102 ; avec zh-CHS ça passe."
 },
 "103": {
  "cat": "Paramètres",
  "alias": "text too long long 5000",
  "official": "Texte à traduire trop long.",
  "cause": "Limite de caractères par requête dépassée (interfaces modèle/document i ≤ 5000), long texte non découpé.",
  "fix": "Découpez par phrase / paragraphe et envoyez par lots ; les longs documents via l'interface de traduction de documents."
 },
 "108": {
  "cat": "Auth / signature",
  "alias": "appkey invalid id d'app app key",
  "trigger": "appKey erroné, app non créée / service non lié, ou signature expirée",
  "official": "ID d'app invalide. Inscrivez un compte, créez l'app en console et liez le service pour obtenir appKey et appSecret.",
  "cause": "appKey avec caractères perdus / espaces ; ou app sans instance de service. Parfois signature expirée (curtime trop loin de l'heure serveur, ~120s) → ressemble à un échec d'auth.",
  "fix": "Vérifiez l'appKey (sans espaces) ; confirmez l'instance liée ; curtime actuel en secondes.",
  "scene": "Nouvelle app appelée directement sans lier l'instance de traduction → 108 / 110."
 },
 "110": {
  "cat": "Service / instance",
  "alias": "no valid instance lier tts",
  "trigger": "L'app n'a pas lié l'instance requise par l'appel",
  "official": "Aucune instance valide du service : l'app n'a pas lié d'instance, créez-la et liez-la. La prononciation requiert une instance TTS séparée.",
  "cause": "Chaque app lie une instance par service - traduction / TTS / OCR séparés. Ne lier que la traduction et demander voice → 110.",
  "fix": "Liez en console chaque instance par service (traduction / TTS / OCR).",
  "scene": "Traduction OK mais demande de voix donne 110 - instance TTS absente."
 },
 "111": {
  "cat": "Auth / signature",
  "alias": "developer account invalid compte",
  "official": "Compte développeur invalide.",
  "cause": "Compte sans vérification développeur, état anormal ou contrôle des risques.",
  "fix": "Vérifiez l'état et la vérification réelle / développeur en console ; ticket si besoin."
 },
 "113": {
  "cat": "Paramètres",
  "alias": "q empty vide",
  "official": "q ne peut pas être vide.",
  "cause": "Champ q absent ou vide ; en lot, un élément vide.",
  "fix": "Validez q non vide avant l'appel ; filtrez les éléments vides en lot."
 },
 "116": {
  "cat": "Paramètres",
  "alias": "strict invalid",
  "official": "Valeur de strict invalide ; consultez la documentation.",
  "cause": "strict n'accepte que la chaîne \"true\" / \"false\" ; 1 / 0 ou autres échouent.",
  "fix": "strict en \"true\" ou \"false\" ; sans direction stricte, ne l'envoyez pas."
 },
 "201": {
  "cat": "Résultat / déchiffrement / autres",
  "alias": "decrypt dechiffrement des base64",
  "official": "Échec du déchiffrement : possible erreur DES, BASE64 ou URLDecode.",
  "cause": "En interface de chiffrement de transport, le chiffré / encodage / padding ne correspond pas à la convention.",
  "fix": "Comparez à la doc de l'interface chiffrée : clé/IV DES, BASE64 et ordre d'URLDecode."
 },
 "202": {
  "cat": "Auth / signature",
  "alias": "signature failed signature sign auth",
  "trigger": "Le plus fréquent : chaîne mal formée, encodage, espaces",
  "official": "Échec de la vérification de signature. Si l'ID et la clé sont corrects et que ça persiste, c'est souvent l'encodage : q en UTF-8.",
  "cause": "Signature v3 = sha256(appKey + input + salt + curtime + appSecret), quatre pièges : ① ordre (doit être appKey→input→salt→curtime→appSecret) ; ② troncature de l'input - q&gt;20 : 10 + longueur + 10, ≤20 : q, en caractères Unicode et non en octets ; ③ espaces/sauts dans q ou la clé ; ④ pas d'UTF-8 avant SHA256, ou sortie pas en hex minuscule.",
  "fix": "Vérifiez avec la fonction de signature du SDK officiel ; imprimez et comparez caractère par caractère ; hex minuscule ; pour CJK/emoji, tronquez par caractères.",
  "scene": "Anglais OK, chinois long parfois 202 - la troncature a coupé par octets ; couper par caractères Unicode corrige."
 },
 "203": {
  "cat": "Auth / signature",
  "alias": "ip liste blanche access ip list",
  "trigger": "OK en local mais échoue en cloud / après changement de machine",
  "official": "L'IP d'accès n'est pas dans la liste autorisée.",
  "cause": "Liste blanche d'IP active mais l'IP publique de sortie n'y est pas (montée en charge, sortie dynamique, débogage local la changent).",
  "fix": "Ajoutez l'IP réelle de sortie ou désactivez la restriction si c'est sûr ; en conteneur, sortie fixe (NAT).",
  "scene": "Local OK, en cloud 203 - l'IP de sortie du serveur n'était pas listée."
 },
 "205": {
  "cat": "Auth / signature",
  "alias": "platform type sdk api plateforme",
  "official": "L'interface ne correspond pas au type de plateforme de l'app : alignez la méthode (SDK Android/iOS / API) sur le choix à la création.",
  "cause": "Vous avez choisi « serveur / API » mais appelez avec un SDK mobile (ou l'inverse).",
  "fix": "Alignez le type de plateforme sur la méthode réelle ; pour un appel serveur, app « serveur »."
 },
 "206": {
  "cat": "Auth / signature",
  "alias": "timestamp curtime horloge ntp",
  "trigger": "Horloge de conteneur / VM imprécise",
  "official": "Horodatage invalide, d'où l'échec de signature.",
  "cause": "curtime doit être UTC en secondes et entrer dans la signature ; dérive, fuseau erroné, millisecondes ou valeur fixe l'invalident (signature ~120s).",
  "fix": "Horodatage Unix en secondes ; activez NTP ; synchronisez le conteneur sur l'hôte ; ne cachez pas curtime.",
  "scene": "Conteneur Docker à l'horloge décalée → beaucoup de 206 ; avec NTP ça se rétablit."
 },
 "207": {
  "cat": "Auth / signature",
  "alias": "replay salt uuid rejeu",
  "trigger": "salt fixe ou renvoi d'une ancienne requête",
  "official": "Requête en rejeu. salt + curtime empêchent le rejeu (pas 2 fois) ; salt de préférence UUID.",
  "cause": "salt fixe / auto-incrémenté / réutilisé, ou retry renvoyant l'ancien salt + curtime.",
  "fix": "Générez un salt aléatoire (UUID) et rafraîchissez curtime à chaque requête ; au retry, re-signez.",
  "scene": "Fixer le salt pour reproduire un bug → 207 au second appel."
 },
 "303": {
  "cat": "Résultat / déchiffrement / autres",
  "alias": "server error request_id",
  "official": "Autre exception serveur.",
  "cause": "Erreur interne serveur, pas un problème de paramètre client ; souvent ponctuel.",
  "fix": "Réessayez avec backoff exponentiel ; si ça persiste, ticket avec request_id."
 },
 "310": {
  "cat": "Service / instance",
  "alias": "domain rejectFallback domaine",
  "official": "Service de traduction par domaine non activé.",
  "cause": "Vous avez envoyé domain mais la console n'a pas activé ce domaine.",
  "fix": "Activez la traduction par domaine puis envoyez domain / rejectFallback, ou retirez domain pour la traduction générale."
 },
 "401": {
  "cat": "Compte / facturation / limite",
  "alias": "solde recharger arrears balance",
  "trigger": "Soudain tout échoue",
  "official": "Le compte est à découvert ; rechargez.",
  "cause": "Solde / pack de caractères épuisé coupe le service ; post-paiement non activé ou pack consommé.",
  "fix": "Rechargez ou achetez un pack ; alertes de solde / usage ; canal de secours pour le critique.",
  "scene": "Fin de mois, pack vide, tout en 401 ; après recharge ça repart."
 },
 "411": {
  "cat": "Compte / facturation / limite",
  "alias": "qps rate limit limite frequence",
  "trigger": "Apparaît beaucoup en concurrence / test de charge",
  "official": "Fréquence d'accès limitée ; réessayez plus tard.",
  "cause": "QPS de l'app dépassé (base ~100, extensible en console) ; concurrence soudaine sans limitation client.",
  "fix": "Token bucket / leaky bucket + backoff exponentiel ; groupez / répartissez les requêtes ; achetez du QPS si besoin.",
  "scene": "Pic de charge sature → beaucoup de 411 ; avec un limiteur, c'est stable."
 },
 "412": {
  "cat": "Compte / facturation / limite",
  "alias": "long request requete longue",
  "official": "Requêtes longues trop fréquentes ; réessayez plus tard.",
  "cause": "Texte long / interface lourde trop denses en peu de temps.",
  "fix": "Réduisez la fréquence des requêtes longues (secondes d'écart) ; longs textes via l'interface de documents."
 },
 "500": {
  "cat": "Résultat / déchiffrement / autres",
  "alias": "translate failed errormessage",
  "official": "Échec de la traduction ; voyez errorMessage.",
  "cause": "Échec générique du serveur ; errorMessage nécessaire pour la cause précise.",
  "fix": "Localisez via errorMessage / request_id ; vérifiez la combinaison from / to / q."
 },
 "902000": {
  "cat": "Résultat / déchiffrement / autres",
  "alias": "llm grand modele",
  "official": "Échec de l'appel de traduction par grand modèle.",
  "cause": "Anomalie du flux grand modèle ou entrée invalide (i ≤ 5000, limite de prompt…).",
  "fix": "Vérifiez l'entrée et la limite de longueur ; réessayez avec backoff et request_id."
 }
};
window.LABELS = {"miss": "Code non répertorié ; essayez un autre code ou mot-clé, ou consultez le tableau complet ci-dessous.", "codeword": "Code d'erreur "};
window.FIELDS = [["trigger", "Quand cela survient"], ["official", "Signification officielle L1"], ["cause", "Cause racine L2"], ["fix", "Comment diagnostiquer / résoudre"], ["scene", "Cas réel"]];
window.THEAD = ["Code", "Catégorie", "Signification officielle L1", "Cause racine L2"];
