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
//scroll right 
$(document).ready(function(){
  
  // ۱. تنظیمات اولیه متغیرها
  var offset = 100, // مقداری که بعد از آن دکمه ظاهر می‌شود
      scroll_top_duration = 700,
      $back_to_top = $('.btn-top'),
      $thedial = $('.dial'),
      $progress_bar = $('.progress-bar');
  
  // ۲. راه‌اندازی دایره گرافیکی (jQuery Knob)
  // مطمئن شوید کتابخانه jQuery Knob در پروژه لود شده باشد
  $thedial.knob({
    'min' : 0,
    'max' : 100,
    'width' : 50,
    'height' : 50,

     'fgColor' : '#ffffff', // رنگ بخش پر شده (سفید)
    'bgColor' : 'hsl(240deg 13.73% 10% / 86%)',
      
    'skin' : 'tron',
    'thickness' : .2,
    'displayInput' : false,
    'displayPreview' : false,
    'readOnly' : true
  });

  // ۳. مدیریت اسکرول پنجره
  $(window).scroll(function(){
    
    var s = $(window).scrollTop(),
        d = $(document).height(),
        c = $(window).height();
    
    // محاسبه درصد اسکرول برای دایره
    var scrollPercent = (s / (d - c)) * 100;

    // نمایش یا مخفی کردن دکمه بر اساس مقدار اسکرول
    if (s > offset) {
        $progress_bar.addClass('is-visible');
    } else {
        $progress_bar.removeClass('is-visible');
    }

    // آپدیت کردن مقدار دایره[cite: 4]
    $('.dial').val(scrollPercent).change();
    
    // مدیریت ظاهر هدر در هنگام اسکرول
    if (s > 0) {
        $('header').addClass('scrolled fade');
    } else {
        $('header').removeClass('scrolled fade');
    }
  });

  // ۴. اسکرول نرم به بالا هنگام کلیک روی دکمه[cite: 4]
  $back_to_top.on('click', function(e){
    e.preventDefault();
    $('body,html').animate({
      scrollTop: 0
    }, scroll_top_duration);
  });

  // ۵. اصلاح تداخل اسکرول نرم لینک‌های داخلی[cite: 4]
  // این بخش از تداخل دکمه بالا با بقیه لینک‌های منو جلوگیری می‌کند
  $('a[href*="#"]:not([href="#"]):not(.btn-top)').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 80
        }, 500);
        return false;
      }
    }
  });

});

