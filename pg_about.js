Page('about','О тебе 💜','<div class="polaroid" id="pl"><img id="hp" alt=""></div><div class="card"><h2>Что в тебе особенного</h2><ol id="f"></ol></div>',function(){
  var im=$('hp');im.src='img/art.jpg';im.onerror=function(){var p=im.parentNode;im.remove();if(p&&p.className==='polaroid')p.remove()};if(!$('hp'))$('pl').remove();
  CFG.FACTS.forEach(function(x){var li=document.createElement('li');li.textContent=x;$('f').appendChild(li)});
});
