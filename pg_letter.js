Page('letter','','<iframe class="lf" id="lf"></iframe>',function(){
  var f=$('lf');f.style.height=Math.max(520,innerHeight-(innerWidth<760?170:60))+'px';f.srcdoc=LETTER_HTML;
});
