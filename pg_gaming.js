Page('gaming','Игровой центр 🎮','<div class="grid"><div class="card"><h2>Во что поиграть сегодня?</h2><div class="moods" id="gl"></div><div class="msg q" id="gp"></div><button class="btn" id="gb">Случайная игра 🎲</button></div><div class="card" id="gg"><h2>Твои цели</h2><ol id="gs"></ol></div></div>',function(){
  CFG.GAMES.forEach(function(g){var s=document.createElement('span');s.className='mood';s.textContent=g;$('gl').appendChild(s)});
  $('gb').onclick=function(){$('gp').textContent='Сегодня: '+rnd(CFG.GAMES)};
  if(!CFG.GOALS.length)$('gg').hidden=true;
  CFG.GOALS.forEach(function(g){var li=document.createElement('li');li.textContent=g;$('gs').appendChild(li)});
});
