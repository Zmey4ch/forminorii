Page('notes','Заметки и дела 📝','<div class="grid"><div class="card"><h2>Дела</h2><div style="display:flex;gap:8px"><input type="text" id="ti" placeholder="Новое дело"><button class="btn" id="ta" style="padding:10px 20px">+</button></div><div id="tl" style="margin-top:12px"></div></div><div class="card"><h2>Заметки</h2><textarea id="nt" rows="10" placeholder="Пиши что угодно"></textarea></div></div>',function(){
  var L=[];try{L=JSON.parse(localStorage.getItem('todos')||'[]')}catch(e){}
  function save(){try{localStorage.setItem('todos',JSON.stringify(L))}catch(e){}}
  function draw(){var el=$('tl');el.innerHTML='';L.forEach(function(t,i){
    var r=document.createElement('div');r.className='todo'+(t.d?' done':'');
    var c=document.createElement('input');c.type='checkbox';c.checked=!!t.d;c.onchange=function(){t.d=c.checked;save();draw()};
    var s=document.createElement('span');s.textContent=t.t;
    var x=document.createElement('button');x.textContent='✕';x.onclick=function(){L.splice(i,1);save();draw()};
    r.appendChild(c);r.appendChild(s);r.appendChild(x);el.appendChild(r)})}
  function add(){var v=$('ti').value.trim();if(!v)return;L.push({t:v,d:false});$('ti').value='';save();draw()}
  $('ta').onclick=add;$('ti').onkeydown=function(e){if(e.key==='Enter')add()};draw();
  try{$('nt').value=localStorage.getItem('note')||''}catch(e){}
  $('nt').oninput=function(){try{localStorage.setItem('note',this.value)}catch(e){}};
});
