Page('germany','Жизнь в Германии 🇩🇪','<div class="grid"><div class="card"><h2>Слово дня</h2><div class="clock" id="w"></div><div class="dim" id="r"></div></div><div class="card"><h2>Полезное</h2><div class="links"><a href="https://www.bahn.de" target="_blank" rel="noopener">Поезда</a><a href="https://dict.leo.org" target="_blank" rel="noopener">Словарь</a><a href="https://www.dwd.de" target="_blank" rel="noopener">Погода</a></div></div></div>',function(){
  var W=[['Freundschaft','дружба'],['gemütlich','уютно'],['Sehnsucht','тоска, томление'],['zusammen','вместе'],['Glück','счастье'],['Heimat','дом, родина'],['Fernweh','тяга к далёким местам']],x=pick(W);
  $('w').textContent=x[0];$('r').textContent=x[1];
});
