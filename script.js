
'use strict';
// Isi dengan nomor WhatsApp milikmu, format internasional tanpa +, contoh: 6281234567890.
const NOMOR_WHATSAPP = '6288976546026';
const $ = (s) => document.querySelector(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const loader = $('#loader');
const counter = $('#loaderCount');
let started = false;
function revealPage() {
  if (started) return; started = true;
  loader.classList.add('hidden'); document.body.classList.add('entered');
  setTimeout(() => loader.setAttribute('aria-hidden','true'), 950);
}
function startIntro() {
  if (reduced) { counter.textContent = '100%'; revealPage(); return; }
  let start; const duration = 1900;
  function frame(t) { if (!start) start = t; const p = Math.min((t-start)/duration,1);
    const eased = 1-Math.pow(1-p,3); counter.textContent = String(Math.round(eased*100)).padStart(2,'0')+'%';
    loader.style.setProperty('--load-progress', (eased*100)+'%');
    if (p < 1) requestAnimationFrame(frame); else setTimeout(revealPage,260);
  } requestAnimationFrame(frame);
}
if (document.readyState === 'complete') startIntro(); else window.addEventListener('load', startIntro, {once:true});
setTimeout(revealPage,5000);
const themeToggle = $('#themeToggle');
try { const saved=localStorage.getItem('portfolio-theme'); if(['dark','light'].includes(saved)) document.body.dataset.theme=saved; } catch(e) {}
function syncTheme() { const dark=document.body.dataset.theme==='dark'; $('#themeIcon').textContent=dark?'☀':'☾'; themeToggle.setAttribute('aria-label',dark?'Aktifkan mode terang':'Aktifkan mode gelap'); }
syncTheme();
themeToggle.addEventListener('click',()=>{document.body.dataset.theme=document.body.dataset.theme==='dark'?'light':'dark'; try {localStorage.setItem('portfolio-theme',document.body.dataset.theme)} catch(e){} syncTheme();});
const nav=$('#nav'), menuBtn=$('#menuToggle');
menuBtn.addEventListener('click',()=>{let open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.nav-link').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));
const roles=['Pengembang Web Fullstack','Pengembang PHP & MySQL','Pengembang Antarmuka Web'];
let ri=0,ci=0,del=false;
function type(){let word=roles[ri];ci+=del?-1:1;$('#typingText').textContent=word.slice(0,ci);let wait=del?43:78;if(!del&&ci===word.length){del=true;wait=1650}else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;wait=300}setTimeout(type,wait)}
if(reduced) $('#typingText').textContent=roles[0];else type();
if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
const scene=$('#portraitScene'),card=$('#portraitCard');
let px=0,py=0,cx=0,cy=0,raf=0,active=false,spin=false;
function animateCard(){cx+=(px-cx)*.095;cy+=(py-cy)*.095;card.style.setProperty('--rx',(-cy*17)+'deg');card.style.setProperty('--ry',(cx*20)+'deg');card.style.setProperty('--mx',(cx*14)+'px');card.style.setProperty('--my',(cy*12)+'px');card.style.setProperty('--shine-x',((cx+.5)*100)+'%');card.style.setProperty('--shine-y',((cy+.5)*100)+'%');if(active||Math.abs(px-cx)>.002||Math.abs(py-cy)>.002)raf=requestAnimationFrame(animateCard);else raf=0;}
function kick(){if(!raf)raf=requestAnimationFrame(animateCard)}
if(!reduced){
  if(matchMedia('(hover:hover) and (pointer:fine)').matches){scene.addEventListener('pointermove',e=>{let r=scene.getBoundingClientRect();px=Math.max(-.5,Math.min(.5,(e.clientX-r.left)/r.width-.5));py=Math.max(-.5,Math.min(.5,(e.clientY-r.top)/r.height-.5));active=true;card.classList.add('is-hovered');kick();});scene.addEventListener('pointerleave',()=>{px=0;py=0;active=false;card.classList.remove('is-hovered');kick()});const glow=$('#cursorGlow');window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});}
  const turn=()=>{if(spin)return;spin=true;card.classList.remove('card-flip');void card.offsetWidth;card.classList.add('card-flip');setTimeout(()=>{card.classList.remove('card-flip');spin=false},1250)};
  card.addEventListener('click',turn);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();turn()}});
}
const sections=document.querySelectorAll('main section[id]');if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('.nav-link').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-30% 0px -60% 0px'});sections.forEach(s=>io.observe(s));}
$('#year').textContent=new Date().getFullYear();
const wa=$('#waContact'),help=$('#contactHelp');
if(/^62\d{8,13}$/.test(NOMOR_WHATSAPP)){wa.href='https://wa.me/'+NOMOR_WHATSAPP+'?text='+encodeURIComponent('Halo AL - FAZA, saya ingin menghubungi Anda melalui portofolio.');help.textContent='Klik tombol untuk membuka percakapan WhatsApp.';}else{wa.removeAttribute('target');wa.addEventListener('click',e=>{e.preventDefault();help.classList.add('contact-attention');setTimeout(()=>help.classList.remove('contact-attention'),1400);});}
