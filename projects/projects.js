const menu=document.getElementById('nav-menu');
const openBtn=document.getElementById('nav-toggle');
const closeBtn=document.getElementById('nav-close');
const header=document.getElementById('header');
const topBtn=document.getElementById('scroll-top');
function closeMenu(){menu?.classList.remove('show');document.body.classList.remove('lock')}
openBtn?.addEventListener('click',()=>{menu.classList.add('show');document.body.classList.add('lock')});
closeBtn?.addEventListener('click',closeMenu);
document.querySelectorAll('.nav-menu a').forEach(a=>a.addEventListener('click',closeMenu));
const filters=document.querySelectorAll('.filter');
const cards=document.querySelectorAll('.project-card');
const empty=document.getElementById('empty');
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const selected=btn.dataset.filter;
  let visible=0;
  cards.forEach(card=>{
    const show=selected==='all'||card.dataset.category===selected;
    card.classList.toggle('hide',!show);
    if(show) visible++;
  });
  if(empty) empty.hidden=visible!==0;
}));
window.addEventListener('scroll',()=>{
  header?.classList.toggle('scrolled',window.scrollY>20);
  topBtn?.classList.toggle('show',window.scrollY>500);
});
