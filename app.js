function esc(s){return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;");}
function card(code,h){var L=window.LABELS||{},F=window.FIELDS||[];
  if(!h) return '<div class="card"><span class="code">'+esc(code)+'</span> '+esc(L.miss||"")+'</div>';
  var p='<div class="card"><span class="code">'+esc(L.codeword||"")+esc(h.name||code)+'</span> <small>'+esc(h.cat||"")+'</small>';
  for(var i=0;i<F.length;i++){var f=F[i]; if(h[f[0]]) p+='<div class="label">'+esc(f[1])+'</div><div>'+esc(h[f[0]])+'</div>';}
  return p+'</div>';}
function find(raw){var C=window.CODES||{}; raw=(raw||"").trim(); if(!raw)return null;
  var m=raw.match(/\d{2,6}/); if(m&&C[m[0]])return[m[0],C[m[0]]];
  if(C[raw])return[raw,C[raw]];
  var low=raw.toLowerCase();
  for(var k in C){var hay=(k+" "+(C[k].alias||"")+" "+(C[k].name||"")).toLowerCase();
    if(hay.indexOf(low)>=0)return[k,C[k]];}
  return[raw,null];}
function go(){var raw=document.getElementById("q").value,o=document.getElementById("out");
  if(!raw.trim()){o.innerHTML="";return;}var r=find(raw);o.innerHTML=card(r[0],r[1]);}
function table(){var C=window.CODES||{},H=window.THEAD||[];
  var rows=Object.keys(C).map(function(k){var h=C[k];
    return '<tr><td class="code">'+esc(k)+'</td><td>'+esc(h.cat||"")+'</td><td>'+esc(h.official||"-")+'</td><td>'+esc(h.cause||"-")+'</td></tr>';}).join("");
  document.getElementById("tbl").innerHTML='<tr><th>'+H.join("</th><th>")+'</th></tr>'+rows;}
document.getElementById("go").addEventListener("click",go);
document.getElementById("q").addEventListener("keydown",function(e){if(e.key==="Enter")go();});
table();
