Page('relax','Релакс 🌧️','<div class="grid"><div class="card"><h2>Звуки</h2><div class="moods" id="sn"></div><p class="dim" style="margin:14px 0 6px">Громкость</p><input type="range" id="vol" min="0" max="1" step="0.01" value="0.3" style="width:100%"></div><div class="card" style="text-align:center"><h2>Дыхание 🫧</h2><div id="ci" style="width:120px;height:120px;border-radius:50%;margin:14px auto;background:radial-gradient(circle,#a77bff,#6c3bd1)"></div><div class="q msg" id="bt">Нажми, чтобы начать</div><button class="btn" id="bb">Начать</button></div><div class="card" style="text-align:center"><h2>Таймер фокуса ⏱️</h2><div class="clock" id="tm">25:00</div><div class="moods" style="justify-content:center;margin:12px 0"><button class="mood on" id="m1">Фокус 25</button><button class="mood" id="m2">Отдых 5</button></div><button class="btn" id="ts">Старт</button> <button class="mood" id="tr">Сброс</button></div></div>',function(){
  var ac,src,fx,crk,gain;
  Cleanup(function(){stopS();if(ac)try{ac.close()}catch(e){}clearTimeout(bto);clearInterval(tv)});
  function ctx(){if(!ac)ac=new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();return ac}
  function stopS(){try{if(src)src.stop()}catch(e){}try{if(fx)fx.stop()}catch(e){}clearInterval(crk);src=fx=null}
  function snd(type){
    var a=ctx();stopS();
    var n=a.sampleRate*3,buf=a.createBuffer(1,n,a.sampleRate),d=buf.getChannelData(0),last=0;
    for(var i=0;i<n;i++){var w=Math.random()*2-1;if(type==='rain')d[i]=w;else{last=(last+.02*w)/1.02;d[i]=last*3.5}}
    src=a.createBufferSource();src.buffer=buf;src.loop=true;
    var f=a.createBiquadFilter();f.type=type==='rain'?'highpass':'lowpass';f.frequency.value=type==='rain'?900:type==='wind'?500:700;
    gain=a.createGain();gain.gain.value=+$('vol').value;
    src.connect(f);f.connect(gain);gain.connect(a.destination);src.start();
    if(type==='wind'){fx=a.createOscillator();fx.frequency.value=.15;var lg=a.createGain();lg.gain.value=250;fx.connect(lg);lg.connect(f.frequency);fx.start()}
    if(type==='fire'){crk=setInterval(function(){if(Math.random()<.6){var b=a.createBuffer(1,700,a.sampleRate),x=b.getChannelData(0);for(var j=0;j<700;j++)x[j]=(Math.random()*2-1)*(1-j/700);var s=a.createBufferSource();s.buffer=b;var g=a.createGain();g.gain.value=+$('vol').value*.8;s.connect(g);g.connect(a.destination);s.start()}},200)}
  }
  [['rain','🌧️ Дождь'],['fire','🔥 Камин'],['wind','🌬️ Ветер'],['off','⏹ Выключить']].forEach(function(s){
    var b=document.createElement('button');b.className='mood';b.textContent=s[1];
    b.onclick=function(){[].slice.call($('sn').children).forEach(function(x){x.classList.remove('on')});if(s[0]==='off'){stopS()}else{snd(s[0]);b.classList.add('on')}};$('sn').appendChild(b)});
  $('vol').oninput=function(){if(gain)gain.gain.value=+this.value};
  var ph=[['Вдох',4000,1.6],['Задержи',2000,1.6],['Выдох',6000,1]],pi=0,bto=null;
  function step(){var p=ph[pi%3];$('bt').textContent=p[0];$('ci').style.transition='transform '+(p[1]/1000)+'s ease-in-out';$('ci').style.transform='scale('+p[2]+')';pi++;bto=setTimeout(step,p[1])}
  $('bb').onclick=function(){if(bto){clearTimeout(bto);bto=null;this.textContent='Начать';$('bt').textContent='Нажми, чтобы начать';$('ci').style.transform='scale(1)'}else{pi=0;step();this.textContent='Стоп'}};
  var DUR=[1500,300],mi=0,T=DUR[0],tv=null;
  function fmt(){var m=Math.floor(T/60),s=T%60;$('tm').textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s}
  function beep(){try{var a=ctx(),o=a.createOscillator(),g=a.createGain();o.frequency.value=660;g.gain.value=.15;o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+.6)}catch(e){}}
  function setM(i){mi=i;T=DUR[i];fmt();clearInterval(tv);tv=null;$('ts').textContent='Старт';$('m1').classList.toggle('on',i===0);$('m2').classList.toggle('on',i===1)}
  $('m1').onclick=function(){setM(0)};$('m2').onclick=function(){setM(1)};$('tr').onclick=function(){setM(mi)};
  $('ts').onclick=function(){if(tv){clearInterval(tv);tv=null;this.textContent='Старт'}else{this.textContent='Пауза';tv=setInterval(function(){T--;fmt();if(T<=0){clearInterval(tv);tv=null;beep();setM(1-mi)}},1000)}};
});
