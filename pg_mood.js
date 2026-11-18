Page('mood','Комната настроения 🙂','<div class="card"><h2>Как ты себя чувствуешь?</h2><div class="moods" id="md"></div><div class="msg" id="mm"></div></div><div class="card" style="margin-top:14px"><h2>Последние дни</h2><div class="moods" id="hist"></div></div>',function(){
  var EM=['😊','😮‍💨','😢','😠','🌙'];
  function key(d){return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
  function hist(){var L={};try{L=JSON.parse(localStorage.getItem('moodlog')||'{}')}catch(e){}var h=$('hist');h.innerHTML='';for(var k=6;k>=0;k--){var d=new Date(Date.now()-k*864e5),v=L[key(d)],s=document.createElement('span');s.className='mood';s.textContent=d.toLocaleDateString('ru-RU',{weekday:'short'})+' '+(v===undefined?'·':EM[v]);h.appendChild(s)}}
  hist();
  [['😊','Радость','Как здорово. Побудь в этом чувстве подольше.'],['😮‍💨','Устала','Сделай паузу, выпей чего-нибудь тёплого и включи любимую музыку.'],['😢','Грустно','Ты не одна. Грусть проходит, даже если сейчас так не кажется.'],['😠','Злюсь','Это нормально. Глубоко вдохни и дай себе время остыть.'],['🌙','Хочу тишины','Выключи уведомления и побудь в тишине. Ты это заслужила.']].forEach(function(m,i){
    var b=document.createElement('button');b.className='mood';b.textContent=m[0]+' '+m[1];
    b.onclick=function(ev){[].slice.call($('md').children).forEach(function(x){x.classList.remove('on')});b.classList.add('on');$('mm').textContent=m[2];if(ev){try{localStorage.setItem('mood',i);var L=JSON.parse(localStorage.getItem('moodlog')||'{}');L[key(new Date())]=i;localStorage.setItem('moodlog',JSON.stringify(L))}catch(e){}hist()}};$('md').appendChild(b);var sv=null;try{sv=localStorage.getItem('mood')}catch(e){}if(sv!==null&&+sv===i)b.onclick()});
});
