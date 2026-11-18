Page('secret','Секретная комната 🔒','<div class="grid"><div class="card"><h2>Комплименты ✨</h2><div class="q msg" id="cm">Нажми кнопку</div><button class="btn" id="cb">Ещё</button></div><div class="card" id="lt" hidden><h2>Письмо 💌</h2><div class="pre" id="lx"></div></div><div class="card" id="mr" hidden><h2>Воспоминания</h2><ol id="ml"></ol></div><div class="card" id="gf" hidden><h2>Особый подарок 🎁</h2><div class="pre" id="gx"></div></div></div>',function(){
  var i=DAY;$('cb').onclick=function(){$('cm').textContent=CFG.COMPLIMENTS[i%CFG.COMPLIMENTS.length];i++};
  if(CFG.LETTER){$('lx').textContent=CFG.LETTER;$('lt').hidden=false}
  if(CFG.MEMORIES.length){CFG.MEMORIES.forEach(function(m){var li=document.createElement('li');li.textContent=m;$('ml').appendChild(li)});$('mr').hidden=false}
  if(CFG.GIFT){$('gx').textContent=CFG.GIFT;$('gf').hidden=false}
});
