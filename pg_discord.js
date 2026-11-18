Page('discord','Музыка и Discord 🎧','<div class="grid"><div class="card" id="dc"><h2>Discord Lounge</h2><p class="dim">Общаться, слушать, отдыхать.</p><a class="btn" id="dl" target="_blank" rel="noopener">Открыть Discord</a></div><div class="card" id="sp"><h2>Музыка</h2></div></div>',function(){
  if(/^https:\/\//.test(CFG.DISCORD))$('dl').href=CFG.DISCORD;else $('dc').hidden=true;
  bigPlayer($('sp'));
});
