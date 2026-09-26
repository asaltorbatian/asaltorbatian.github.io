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
const videoFiltersPanel=document.getElementById('video-filters');
const videoFilters=document.querySelectorAll('.video-filter');
let selectedCategory='all';
let selectedVideoCategory='all';
function applyFilters(){
  let visible=0;
  cards.forEach(card=>{
    const categoryMatch=selectedCategory==='all'||card.dataset.category===selectedCategory;
    const videoMatch=selectedCategory!=='video'||selectedVideoCategory==='all'||card.dataset.videoCategory===selectedVideoCategory;
    const show=categoryMatch&&videoMatch;
    card.classList.toggle('hide',!show);
    if(show) visible++;
  });
  if(empty) empty.hidden=visible!==0;
}
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  selectedCategory=btn.dataset.filter;
  videoFiltersPanel.hidden=selectedCategory!=='video';
  applyFilters();
}));
videoFilters.forEach(btn=>btn.addEventListener('click',()=>{
  videoFilters.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  selectedVideoCategory=btn.dataset.videoFilter;
  applyFilters();
}));

const projectModal=document.createElement('div');
projectModal.className='project-modal';
projectModal.setAttribute('role','dialog');
projectModal.setAttribute('aria-modal','true');
projectModal.innerHTML='<button class="project-modal-close" type="button" aria-label="Close preview">&times;</button><iframe src="" title="Video player" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe><div class="project-modal-panel"></div>';
document.body.appendChild(projectModal);
const modalFrame=projectModal.querySelector('iframe');
const modalPanel=projectModal.querySelector('.project-modal-panel');
const modalClose=projectModal.querySelector('.project-modal-close');
let modalTrigger=null;
function closeProjectModal(){
  projectModal.classList.remove('open','video-open','details-open');
  document.body.classList.remove('lock');
  modalFrame.src='';
  modalPanel.replaceChildren();
  modalTrigger?.focus();
  modalTrigger=null;
}
document.querySelectorAll('.video-card').forEach(card=>{
  card.querySelector('.view-video')?.addEventListener('click',event=>{
    modalTrigger=event.currentTarget;
    modalFrame.src=card.dataset.video;
    projectModal.setAttribute('aria-label',`${card.querySelector('h3').textContent} video`);
    projectModal.classList.add('open','video-open');
    document.body.classList.add('lock');
    modalClose.focus();
  });
  card.querySelector('.view-details')?.addEventListener('click',event=>{
    modalTrigger=event.currentTarget;
    const details=card.querySelector('.video-detail-content').cloneNode(true);
    details.hidden=false;
    modalPanel.append(details);
    projectModal.setAttribute('aria-label',`${card.querySelector('h3').textContent} project details`);
    projectModal.classList.add('open','details-open');
    document.body.classList.add('lock');
    modalClose.focus();
  });
});
modalClose.addEventListener('click',closeProjectModal);
projectModal.addEventListener('click',event=>{if(event.target===projectModal) closeProjectModal()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&projectModal.classList.contains('open')) closeProjectModal()});
window.addEventListener('scroll',()=>{
  header?.classList.toggle('scrolled',window.scrollY>20);
  topBtn?.classList.toggle('show',window.scrollY>500);
});
//scroll right 
const progress=document.getElementById("scroll-progress");

const circle=document.querySelector(".progress-circle");

const radius=26;

const circumference=2*Math.PI*radius;

circle.style.strokeDasharray=circumference;

window.addEventListener("scroll",()=>{

    const scrollTop=window.pageYOffset;

    const docHeight=document.documentElement.scrollHeight-window.innerHeight;

    const percent=scrollTop/docHeight;

    circle.style.strokeDashoffset=circumference-(percent*circumference);

    if(scrollTop>100){

        progress.classList.add("show");

    }else{

        progress.classList.remove("show");

    }

});

progress.addEventListener("click",(e)=>{

    e.preventDefault();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
