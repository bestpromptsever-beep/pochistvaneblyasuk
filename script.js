(function(){
  'use strict';
  document.documentElement.classList.add('js');

  var hdr=document.getElementById('hdr'), mbar=document.getElementById('mbar');
  function onScroll(){
    var y=window.scrollY;
    hdr.classList.toggle('stuck', y>24);
    var p=y/(document.body.scrollHeight-window.innerHeight);
    mbar.classList.toggle('on', p>0.10 && p<0.95);
  }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  var burger=document.getElementById('burger'), mnav=document.getElementById('mnav');
  burger.addEventListener('click',function(){
    var o=burger.getAttribute('aria-expanded')==='true';
    burger.setAttribute('aria-expanded',String(!o));
    mnav.classList.toggle('open',!o);
    document.body.style.overflow=!o?'hidden':'';
  });
  mnav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){
    burger.setAttribute('aria-expanded','false'); mnav.classList.remove('open'); document.body.style.overflow='';
  });});

  document.querySelectorAll('.fq button').forEach(function(b){
    var p=b.nextElementSibling;
    if(b.getAttribute('aria-expanded')==='true') p.style.maxHeight=p.scrollHeight+'px';
    b.addEventListener('click',function(){
      var o=b.getAttribute('aria-expanded')==='true';
      b.setAttribute('aria-expanded',String(!o));
      p.style.maxHeight=o?'0px':p.scrollHeight+'px';
    });
  });

  var RATE=1.95583;
  document.getElementById('cform').addEventListener('submit',function(e){
    e.preventDefault();
    var m=parseFloat(document.getElementById('c1').value),
        a=parseFloat(document.getElementById('c2').value),
        s=document.getElementById('c3').value.split('|'),
        base=Math.max(a*parseFloat(s[0])*m, parseFloat(s[1])),
        lo=Math.round(base/5)*5, hi=Math.round(base*1.18/5)*5;
    document.getElementById('cAmt').textContent=lo+' € до '+hi+' €';
    document.getElementById('cLv').textContent=(lo*RATE).toFixed(2).replace('.',',')+' лв. до '+(hi*RATE).toFixed(2).replace('.',',')+' лв.';
    var out=document.getElementById('cout'); out.classList.add('on');
    out.scrollIntoView({behavior:'smooth',block:'center'});
  });

  var ba=document.getElementById('ba'), post=document.getElementById('baPost'), hnd=document.getElementById('baHnd'), drag=false;
  function sp(v){v=Math.max(0,Math.min(100,v));post.style.setProperty('--sp',v+'%');hnd.style.left=v+'%';ba.setAttribute('aria-valuenow',Math.round(v));}
  function ev(e){var r=ba.getBoundingClientRect();var x=(e.touches?e.touches[0].clientX:e.clientX)-r.left;sp(x/r.width*100);}
  ba.addEventListener('mousedown',function(e){drag=true;ev(e);});
  window.addEventListener('mousemove',function(e){if(drag)ev(e);});
  window.addEventListener('mouseup',function(){drag=false;});
  ba.addEventListener('touchstart',ev,{passive:true});
  ba.addEventListener('touchmove',ev,{passive:true});
  ba.addEventListener('keydown',function(e){
    var c=parseFloat(ba.getAttribute('aria-valuenow'));
    if(e.key==='ArrowLeft'){sp(c-4);e.preventDefault();}
    if(e.key==='ArrowRight'){sp(c+4);e.preventDefault();}
  });
  sp(50);

  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(en){
      en.forEach(function(x,i){ if(x.isIntersecting){ setTimeout(function(){x.target.classList.add('in');},(i%5)*70); io.unobserve(x.target);} });
    },{threshold:.12});
    document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});
    setTimeout(function(){document.querySelectorAll('.rv:not(.in)').forEach(function(el){el.classList.add('in');});},2200);
  } else { document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in');}); }

  var t;window.addEventListener('resize',function(){clearTimeout(t);t=setTimeout(function(){
    document.querySelectorAll('.fq button[aria-expanded="true"]').forEach(function(b){b.nextElementSibling.style.maxHeight=b.nextElementSibling.scrollHeight+'px';});
  },150);});
})();
