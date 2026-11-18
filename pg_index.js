Page('index','',
'<div class="top"><div class="who"><img class="av" id="av" alt=""><div><div class="gt" id="gr"></div><div class="dim">Рад, что ты заглянула</div></div></div><div class="chip"><b id="ck" style="font-size:22px"></b><div class="dim" id="dt"></div></div><div class="chip" id="wc" hidden><b id="wt2" style="font-size:22px"></b><div class="dim" id="wn"></div></div></div>'+
'<div class="dash">'+
'<div class="hero s3"><img id="hp" alt=""><div class="ht"><div class="neon" id="ng"></div><p>Тебе здесь рады, заходи когда захочешь.</p></div></div>'+
'<a class="card gbg" href="#surprise"><h2>Сюрприз для тебя 🎁</h2><div style="font-size:44px;margin:6px 0">🎁</div><span class="dim">Открой сегодня свой подарок</span></a>'+
'<div class="card wxbg" id="wx" hidden><h2>Погода</h2><div class="clock" id="wt"></div><div class="dim" id="wf" style="margin-top:8px;line-height:1.7"></div></div>'+
'<div class="card"><h2>Мысль дня ✨</h2><div class="q" id="qt"></div></div>'+
'<div class="card"><h2>Быстрый доступ</h2><div class="qa" id="lk"></div></div>'+
'<a class="card" href="#letter"><h2>Письмо 💌</h2><span class="dim">Для тебя</span></a>'+
'<div class="card s2" id="gm"><h2>Твои любимые игры 🎮</h2><div class="tiles" id="tl"></div></div>'+
'<div class="card s2"><h2>Настроение сегодня?</h2><div class="mg5" id="md"></div><div class="msg" id="mm"></div></div>'+
'<div class="card s2" id="pl"><h2>Музыка 🎧</h2></div>'+
'<div class="card"><div class="calh"><button class="mood" id="pv">‹</button><b id="cm"></b><button class="mood" id="nx">›</button></div><div class="cal" id="cal"></div></div>'+
'<a class="card" href="#germany" id="de" hidden><h2>Германия Life 🇩🇪</h2><span class="dim">Слово дня и полезные ссылки</span></a>'+
'<a class="card art" href="#secret"><h2>Секретная комната 🔒</h2><span class="dim">Там тебя ждут тёплые слова…</span></a>'+
'<div class="card" id="ins" hidden><h2>На экран телефона 📱</h2><span class="dim">Открой меню браузера и выбери «Добавить на экран Домой»: так сайт открывается как приложение, а данные сохраняются надёжнее.</span></div>'+
'</div>',function(){
  var h=new Date().getHours(),g=h<5?'Доброй ночи':h<12?'Доброе утро':h<18?'Добрый день':'Добрый вечер';
  $('gr').textContent=g+(CFG.NAME?', '+CFG.NAME:'')+' 💜';$('ng').textContent=g+'…';
  photo($('hp'));photo($('av'));
  function t(){var d=new Date();$('ck').textContent=d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'});$('dt').textContent=d.toLocaleDateString('ru-RU',{weekday:'short',day:'numeric',month:'long'})}
  t();var iv=setInterval(t,20000);Cleanup(function(){clearInterval(iv)});
  $('qt').textContent='«'+pick(CFG.QUOTES)+'»';
  var L=[['Steam','img/steam.png','https://store.steampowered.com']];
  if(/^https:\/\//.test(CFG.DISCORD))L.unshift(['Discord','img/discord.png',CFG.DISCORD]);
  if(/^https:\/\/soundcloud\.com\//.test(CFG.SOUNDCLOUD||''))L.push(['SoundCloud','img/soundcloud.png',CFG.SOUNDCLOUD]);
  L.push(['Spotify','img/spotify.png',/^[A-Za-z0-9]+$/.test(CFG.SPOTIFY||'')?'https://open.spotify.com/playlist/'+CFG.SPOTIFY:'https://open.spotify.com']);
  L.forEach(function(l){var a=document.createElement('a');a.href=l[2];a.target='_blank';a.rel='noopener';var im=document.createElement('img');im.src=l[1];im.alt=l[0];var sm=document.createElement('small');sm.textContent=l[0];a.appendChild(im);a.appendChild(sm);$('lk').appendChild(a)});
  if(!CFG.GAMES.length)$('gm').hidden=true;
  var GI={'repo':'img/repo.jpg','majestic rp':'img/majestic.png','majestick rp':'img/majestic.png','rob run':'img/robrun.jpg','roblox':'img/roblox.png','overwatch':'img/overwatch.png'};
  CFG.GAMES.forEach(function(n){var d=document.createElement('div'),src=GI[n.toLowerCase()];d.className='tile'+(src?' im':'');
    if(src){var im=document.createElement('img');im.src=src;im.alt=n;d.appendChild(im);var sp=document.createElement('span');sp.textContent=n;d.appendChild(sp)}
    else{var b=document.createElement('b');b.textContent=n.charAt(0).toUpperCase();d.appendChild(b);d.appendChild(document.createTextNode(n))}
    $('tl').appendChild(d)});
  var MD=[['😊','Радость','Как здорово. Побудь в этом чувстве подольше.'],['😮‍💨','Устала','Сделай паузу, выпей чего-нибудь тёплого и включи любимую музыку.'],['😢','Грустно','Ты не одна. Грусть проходит, даже если сейчас так не кажется.'],['😠','Злюсь','Это нормально. Глубоко вдохни и дай себе время остыть.'],['🌙','Хочу тишины','Выключи уведомления и побудь в тишине. Ты это заслужила.']];
  function key(d){return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
  MD.forEach(function(m,i){
    var b=document.createElement('button');b.className='mood';b.innerHTML='<i>'+m[0]+'</i>'+m[1];
    b.onclick=function(ev){[].slice.call($('md').children).forEach(function(x){x.classList.remove('on')});b.classList.add('on');$('mm').textContent=m[2];
      if(ev){try{localStorage.setItem('mood',i);var Lg=JSON.parse(localStorage.getItem('moodlog')||'{}');Lg[key(new Date())]=i;localStorage.setItem('moodlog',JSON.stringify(Lg))}catch(e){}}};
    $('md').appendChild(b);var sv=null;try{sv=localStorage.getItem('mood')}catch(e){}if(sv!==null&&+sv===i)b.onclick()});
  bigPlayer($('pl'));
  var cy=new Date().getFullYear(),cmn=new Date().getMonth();
  function cal(){
    var MN=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    $('cm').textContent=MN[cmn]+' '+cy;var c=$('cal');c.innerHTML='';
    ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].forEach(function(d){var s=document.createElement('span');s.className='h';s.textContent=d;c.appendChild(s)});
    var first=(new Date(cy,cmn,1).getDay()+6)%7,days=new Date(cy,cmn+1,0).getDate(),now=new Date();
    for(var i=0;i<first;i++)c.appendChild(document.createElement('span'));
    for(var d=1;d<=days;d++){var s=document.createElement('span');s.textContent=d;if(d===now.getDate()&&cmn===now.getMonth()&&cy===now.getFullYear())s.className='t';c.appendChild(s)}}
  $('pv').onclick=function(){cmn--;if(cmn<0){cmn=11;cy--}cal()};$('nx').onclick=function(){cmn++;if(cmn>11){cmn=0;cy++}cal()};cal();
  if(CFG.GERMANY)$('de').hidden=false;
  if(innerWidth<760&&!(navigator.standalone||matchMedia('(display-mode: standalone)').matches))$('ins').hidden=false;
  if(CFG.WEATHER){fetch('https://api.open-meteo.com/v1/forecast?latitude='+(+CFG.WEATHER.lat)+'&longitude='+(+CFG.WEATHER.lon)+'&current_weather=true&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&forecast_days=4&timezone=auto').then(function(r){return r.json()}).then(function(d){
    var tt=Math.round(d.current_weather.temperature)+'°C';$('wt').textContent=tt;$('wt2').textContent=tt;$('wn').textContent=CFG.WEATHER.name||'';
    var f=[];d.daily.time.slice(1,4).forEach(function(x,i){f.push(new Date(x).toLocaleDateString('ru-RU',{weekday:'short'})+' '+Math.round(d.daily.temperature_2m_max[i+1])+'°/'+Math.round(d.daily.temperature_2m_min[i+1])+'°')});
    $('wf').textContent=(CFG.WEATHER.name?CFG.WEATHER.name+' · ':'')+'ветер '+Math.round(d.current_weather.windspeed)+' км/ч'+'\n'+f.join('  ·  ')+'\nВосход '+d.daily.sunrise[0].slice(11)+' · Закат '+d.daily.sunset[0].slice(11)+' · дождь сегодня '+d.daily.precipitation_probability_max[0]+'%';$('wf').style.whiteSpace='pre-line';$('wx').hidden=false;$('wc').hidden=false}).catch(function(){})}
});
