Page('surprise','Сюрприз дня 🎁','<div class="card sc"><div class="gbox" id="gb">🎁</div><div class="sbody" id="sb"><span class="dim">Нажми на подарок, чтобы открыть</span></div><div style="margin-top:16px"><button class="btn" id="sbtn">Открыть</button></div><div class="dim" id="sf" style="margin-top:14px"></div></div>',function(){
  var Q=['Сыграй раунд в игру, в которую давно не заходила.','Найди новую песню и добавь её в плейлист.','Попробуй сыграть за персонажа, которым обычно не играешь.','Позови друга в голосовой чат на 15 минут.','Пройди одну миссию без спешки, просто ради удовольствия.','Сделай скриншот самого красивого места в любимой игре.','Поставь маленькую цель в игре на сегодня и выполни её.'];
  var I=['Какао или чай, плед и любимый фильм.','Прогулка на 20 минут с любимой музыкой в наушниках.','Приготовь что-нибудь вкусное, чего давно не готовила.','Напиши три хорошие вещи, которые случились сегодня.','Устрой себе вечер без уведомлений.','Включи плейлист и приберись в одном уголке: пять минут, не больше.','Выбери фильм или сериал, который давно в планах.'];
  var F=['У осьминога три сердца.','Первый компьютерный «баг» нашли в 1947 году: в реле застряла моль.','Тетрис придумал Алексей Пажитнов в 1984 году.','Венера вращается так медленно, что её сутки длиннее года.','Вомбаты оставляют после себя не шарики, а кубики.','Самая короткая война в истории, англо-занзибарская, длилась меньше часа.','Ботанически банан это ягода, а клубника нет.','Кошки спят до 16 часов в сутки.'];
  var R=['Выпей стакан воды.','Встань, потянись и минуту посмотри в окно.','Сделай десять медленных вдохов и выдохов.','Подвигай плечами и шеей, это 30 секунд.','Закрой глаза на минуту и послушай тишину.'];
  var T=['w','q','i','f','r','s'];
  function cnt(){try{return +localStorage.getItem('qdone')||0}catch(e){return 0}}
  function make(k){
    var t=T[(DAY+k)%T.length],o=function(a){return a[(DAY+k)%a.length]};
    if(t==='q')return {e:'🎮',tag:'Игровое задание',b:o(Q),act:'done'};
    if(t==='i')return {e:'🕯️',tag:'Идея на вечер',b:o(I)};
    if(t==='f')return {e:'✨',tag:'Интересный факт',b:o(F)};
    if(t==='r')return {e:'🌿',tag:'Ритуал на 2 минуты',b:o(R)};
    if(t==='s'&&MU.w&&MU.list.length){var ix=(DAY+k)%MU.list.length;return {e:'🎵',tag:'Песня дня',b:MU.list[ix].title,act:'play',ix:ix}}
    return {e:'💌',tag:'Тёплые слова',b:o(CFG.SURPRISES)};
  }
  function foot(){$('sf').textContent=cnt()?'Выполнено заданий: '+cnt():''}
  function show(k){
    var m=make(k),sb=$('sb');sb.innerHTML='';
    var a=document.createElement('div');a.className='dim';a.textContent=m.e+' '+m.tag;sb.appendChild(a);
    var b=document.createElement('div');b.className='q msg';b.textContent=m.b;sb.appendChild(b);
    if(m.act==='done'){var d=document.createElement('button');d.className='mood';d.textContent='Выполнено ✓';d.onclick=function(){d.disabled=true;d.textContent='Молодец! ✨';try{localStorage.setItem('qdone',cnt()+1)}catch(e){}foot()};sb.appendChild(d)}
    if(m.act==='play'){var p=document.createElement('button');p.className='mood';p.textContent='Послушать ▶';p.onclick=function(){MU.w.skip(m.ix);MU.w.play()};sb.appendChild(p)}
    $('gb').textContent=m.e;
  }
  function burst(){var c=document.querySelector('.sc');for(var i=0;i<14;i++){var s=document.createElement('span');s.className='burst';s.textContent=['✨','💜','🌸','⭐'][i%4];s.style.left=(10+Math.random()*80)+'%';s.style.animationDelay=(Math.random()*.3)+'s';c.appendChild(s);setTimeout(function(x){x.remove()},1700,s)}}
  var n=0,sv=null;try{sv=JSON.parse(localStorage.getItem('sur2')||'null')}catch(e){}
  if(sv&&sv.d===DAY&&sv.n>0){n=sv.n;show(n-1);$('sbtn').textContent='Ещё сюрприз'}
  foot();
  $('sbtn').onclick=function(){var g=$('gb');g.classList.remove('shake');void g.offsetWidth;g.classList.add('shake');burst();var k=n;n++;
    setTimeout(function(){show(k)},500);this.textContent='Ещё сюрприз';
    try{localStorage.setItem('sur2',JSON.stringify({d:DAY,n:n}))}catch(e){}};
  $('gb').onclick=function(){$('sbtn').click()};
});
