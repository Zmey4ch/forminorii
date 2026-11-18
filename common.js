var DAY=Math.floor((Date.now()-new Date(new Date().getFullYear(),0,0))/864e5);
function $(i){return document.getElementById(i)}
function pick(a,o){return a[(DAY+(o||0))%a.length]}
function rnd(a){return a[Math.floor(Math.random()*a.length)]}
var NAV=[['index','Главная','🏠',1],['letter','Письмо','💌',1],['about','О тебе','💜',CFG.FACTS.length],['gaming','Игры','🎮',CFG.GAMES.length],['discord','Музыка и Discord','🎧',CFG.DISCORD||CFG.SPOTIFY||CFG.SOUNDCLOUD||CFG.YOUTUBE],['germany','Германия','🇩🇪',CFG.GERMANY],['mood','Настроение','🙂',1],['relax','Релакс','🌧️',1],['notes','Заметки','📝',1],['surprise','Сюрприз','🎁',1],['secret','Секретная комната','🔒',1]];
var REG={},CL=[];
function Page(id,title,html,init){REG[id]={t:title,h:html,i:init}}
function Cleanup(f){CL.push(f)}
function photo(img){if(CFG.HERO){img.src=CFG.HERO;img.onerror=function(){var p=img.parentNode;img.remove();if(p&&p.className==='polaroid')p.remove()}}else img.remove()}
function player(el){
  var f=document.createElement('iframe');f.loading='lazy';f.allow='autoplay; encrypted-media; clipboard-write; fullscreen';
  if(/^[A-Za-z0-9_-]+$/.test(CFG.YOUTUBE||'')){f.height='315';f.src='https://www.youtube-nocookie.com/embed/videoseries?list='+CFG.YOUTUBE}
  else if(/^[A-Za-z0-9]+$/.test(CFG.SPOTIFY||'')){f.height='380';f.src='https://open.spotify.com/embed/playlist/'+CFG.SPOTIFY}
  else{el.hidden=true;return}
  el.appendChild(f)}

/* ===== музыка: один плеер на весь сайт, не пропадает при переходах ===== */
var MU={pl:0,w:null,on:false,cur:null,pos:0,dur:0,vol:60,list:[],subs:[],page:[]};
function muNotify(){MU.subs.concat(MU.page).forEach(function(f){try{f()}catch(e){}})}
function muCtl(a){var w=MU.w;if(!w)return;if(a==='play')w.toggle();else if(a==='next')w.next();else if(a==='prev')w.prev()}
function scLists(){var a=(CFG.PLAYLISTS||[]).filter(function(p){return p&&/^https:\/\/soundcloud\.com\//.test(p.u||'')});if(!a.length&&/^https:\/\/soundcloud\.com\//.test(CFG.SOUNDCLOUD||''))a=[{n:'Плейлист',u:CFG.SOUNDCLOUD}];return a}
function hasSC(){return scLists().length>0}
function muPl(i){var p=scLists()[i];if(!p||!MU.w)return;MU.pl=i;MU.list=[];MU.cur=null;MU.dur=0;MU.pos=0;MU.on=false;muNotify();
  MU.w.load(p.u,{auto_play:true,show_comments:false,hide_related:true,visual:false,callback:function(){MU.w.setVolume(MU.vol);MU.w.getSounds(function(l){MU.list=l||[];muNotify()});MU.w.getCurrentSound(function(x){if(x){MU.cur={t:x.title,u:x.user&&x.user.username,a:x.artwork_url||(x.user&&x.user.avatar_url)};MU.w.getDuration(function(d){MU.dur=d;muNotify()})}})}})}
function muInit(){
  if(!hasSC())return;
  var f=document.createElement('iframe');f.allow='autoplay';
  f.style.cssText='position:fixed;bottom:0;right:0;width:100px;height:100px;border:0;opacity:.01;pointer-events:none';
  f.src='https://w.soundcloud.com/player/?url='+encodeURIComponent(scLists()[0].u)+'&auto_play=false&hide_related=true&show_comments=false&visual=false';
  document.body.appendChild(f);
  var s=document.createElement('script');s.src='https://w.soundcloud.com/player/api.js';
  s.onload=function(){
    var w=MU.w=SC.Widget(f),E=SC.Widget.Events;
    function cur(){w.getCurrentSound(function(x){if(x){MU.cur={t:x.title,u:x.user&&x.user.username,a:x.artwork_url||(x.user&&x.user.avatar_url)};w.getDuration(function(d){MU.dur=d;muNotify()})}})}
    w.bind(E.READY,function(){w.setVolume(MU.vol);w.getSounds(function(l){MU.list=l||[];cur()})});
    w.bind(E.PLAY,function(){MU.on=true;cur();muNotify()});
    w.bind(E.PAUSE,function(){MU.on=false;muNotify()});
    w.bind(E.FINISH,function(){MU.on=false;muNotify()});
    w.bind(E.PLAY_PROGRESS,function(e){MU.pos=e.currentPosition;muNotify()});
  };
  document.head.appendChild(s);
}
function miniRef(){
  var c=MU.cur||{};$('mTitle').textContent=c.t||'Музыка';$('mUser').textContent=c.u||'';
  var im=$('mArt');if(c.a){im.src=c.a;im.style.visibility='visible'}else im.style.visibility='hidden';
  $('mPlay').textContent=MU.on?'⏸':'▶';$('mBar').style.width=(MU.dur?Math.min(100,MU.pos/MU.dur*100):0)+'%';
}
function bigPlayer(el){
  if(!hasSC()){player(el);return}
  el.insertAdjacentHTML('beforeend','<div class="pls"></div><div class="bp"><img class="bpa" alt=""><div class="bpi"><b class="bpt">Загрузка…</b><span class="bpu dim"></span><div class="bar"><div class="barf"></div></div><div class="bpc"><button class="ib" data-a="prev">⏮</button><button class="ib big" data-a="play">▶</button><button class="ib" data-a="next">⏭</button><span>🔈</span><input type="range" class="vr" min="0" max="100"></div></div></div><div class="tlist"></div>');
  var q=function(c){return el.querySelector(c)};
  function ref(){
    var c=MU.cur||{};q('.bpt').textContent=c.t||'Загрузка…';q('.bpu').textContent=c.u||'';
    var pc=q('.pls'),ls=scLists();if(ls.length>1&&!pc.children.length){ls.forEach(function(p,i){var b=document.createElement('button');b.className='mood';b.textContent=p.n||('Плейлист '+(i+1));b.onclick=function(){muPl(i)};pc.appendChild(b)})}
    [].slice.call(pc.children).forEach(function(b,i){b.classList.toggle('on',i===MU.pl)});
    var im=q('.bpa');if(c.a){im.src=c.a;im.style.visibility='visible'}else im.style.visibility='hidden';
    q('[data-a=play]').textContent=MU.on?'⏸':'▶';
    q('.barf').style.width=(MU.dur?Math.min(100,MU.pos/MU.dur*100):0)+'%';
    var tl=q('.tlist');
    if(tl.children.length!==MU.list.length){tl.innerHTML='';MU.list.forEach(function(s,i){var r=document.createElement('div');r.className='tr';r.textContent=(i+1)+'. '+s.title;r.onclick=function(){MU.w.skip(i);MU.w.play()};tl.appendChild(r)})}
    [].slice.call(tl.children).forEach(function(r,i){r.classList.toggle('on',!!(MU.list[i]&&MU.cur&&MU.list[i].title===MU.cur.t))});
  }
  el.addEventListener('click',function(e){var a=e.target.getAttribute&&e.target.getAttribute('data-a');if(a)muCtl(a)});
  q('.bar').onclick=function(e){if(!MU.w||!MU.dur)return;var r=this.getBoundingClientRect();MU.w.seekTo(Math.round((e.clientX-r.left)/r.width*MU.dur))};
  var v=q('.vr');v.value=MU.vol;v.oninput=function(){MU.vol=+v.value;if(MU.w)MU.w.setVolume(MU.vol)};
  MU.page.push(ref);ref();
}

/* ===== оболочка и переходы между страницами без перезагрузки ===== */
function go(id){location.hash='#'+id}
function route(){
  var id=(location.hash||'#index').slice(1),ok=NAV.some(function(x){return x[0]===id&&x[3]});
  if(!REG[id]||!ok)id='index';
  CL.forEach(function(f){try{f()}catch(e){}});CL=[];MU.page=[];
  var p=REG[id];
  $('view').innerHTML=(p.t?'<h1 class="pt">'+p.t+'</h1>':'')+p.h;
  [].slice.call(document.querySelectorAll('nav a')).forEach(function(a){a.classList.toggle('on',a.getAttribute('data-id')===id)});
  window.scrollTo(0,0);
  if(p.i)p.i();
}
function start(){
  var n='';NAV.forEach(function(x){if(x[3])n+='<a href="#'+x[0]+'" data-id="'+x[0]+'"><i>'+x[2]+'</i><b>'+x[1]+'</b></a>'});
  document.body.innerHTML='<div class="shell"><aside><div class="logo">ТВОЁ<br>ПРОСТРАНСТВО</div><nav>'+n+'</nav><div class="mini" id="mini" hidden><img id="mArt" alt=""><div class="mt"><b id="mTitle">Музыка</b><span class="dim" id="mUser"></span></div><div class="mc"><button class="ib" data-a="prev">⏮</button><button class="ib" data-a="play" id="mPlay">▶</button><button class="ib" data-a="next">⏭</button></div><div class="mbar"><i id="mBar"></i></div></div></aside><main id="view"></main></div>';
  if(hasSC()){$('mini').hidden=false;$('mini').addEventListener('click',function(e){var a=e.target.getAttribute&&e.target.getAttribute('data-a');if(a)muCtl(a)});MU.subs.push(miniRef);miniRef();muInit()}
  window.addEventListener('hashchange',route);route();
}
