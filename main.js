/*=============== کل کد جاوااسکریپت با حذف عکس در حالت ویدیو ===============*/

// Toggling Skill Tabs
const tabs = document.querySelectorAll('[data-target]');
const tabContent = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);
        tabContent.forEach(tc => tc.classList.remove('skills-active'));
        target.classList.add('skills-active');
        tabs.forEach(t => t.classList.remove('skills-active'));
        tab.classList.add('skills-active');
    });
});

// Mixitup Portfolio
let mixerPortfolio = mixitup('.work-container', {
    selectors: { target: '.work-card' },
    animation: { duration: 300 }
});

// Active Link Work
const linkWork = document.querySelectorAll('.work-item');
function activeWork() {
    linkWork.forEach(l => l.classList.remove('active-work'));
    this.classList.add('active-work');
}
linkWork.forEach(l => l.addEventListener('click', activeWork));


// Active Link Sub Work
const linkSubWork = document.querySelectorAll('.subwork-item');
function activeSubWork() {
    linkSubWork.forEach(l => l.classList.remove('active-subwork'));
    this.classList.add('active-subwork');
}
linkSubWork.forEach(l => l.addEventListener('click', activeSubWork));

// Portfolio Popup Logic
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('work-button')){
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement);
    }
});

function togglePortfolioPopup() {
    const popup = document.querySelector('.portfolio-popup');
    popup.classList.toggle('open');
    if(!popup.classList.contains('open')) {
        // ریست کردن محتوا هنگام بستن برای قطع صدا
        document.querySelector('.pp-thumbnail').innerHTML = '';
    }
}

document.querySelector('.portfolio-popup-close').addEventListener('click', togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
    const thumbnailContainer = document.querySelector('.pp-thumbnail');
    const popupContent = document.querySelector('.portfolio-popup-content');
    const popupSubtitleSpan = document.querySelector('.portfolio-popup-subtitle span');
    const popupBody = document.querySelector('.portfolio-popup-body');

    // ۱. مدیریت بخش ویدیو یا عکس (تغییر اصلی اینجا کلیک شده)
    if (portfolioItem.classList.contains('is-video-project')) {
        const originalIframe = portfolioItem.querySelector('iframe');
        if(originalIframe) {
            // فقط ویدیو را اضافه می‌کنیم و هیچ تگ img نمی‌سازیم
            thumbnailContainer.innerHTML = `<iframe src="${originalIframe.src}" width="100%" height="350" frameborder="0" allow="autoplay"></iframe>`;
        }
        popupContent.style.gridTemplateColumns = '1fr'; // تمام عرض برای ویدیو
    } else {
        // برای پروژه‌های غیر ویدیویی، عکس نمایش داده می‌شود
        const imgSrc = portfolioItem.querySelector('.work-img').src;
        thumbnailContainer.innerHTML = `<img src="${imgSrc}" class="portfolio-popup-img">`;
        popupContent.style.gridTemplateColumns = 'repeat(2, 1fr)'; // دو ستونه برای عکس
    }

    // ۲. آپدیت خودکار دسته‌بندی بالای پاپ‌آپ
    // ۲. آپدیت هوشمند دسته‌بندی و زیرمجموعه‌ها
    let category = "Project";
    
    if (portfolioItem.classList.contains('web')) {
        category = "Web Development";
    } 
    else if (portfolioItem.classList.contains('app')) {
        category = "Video & Multimedia";
    } 
    else if (portfolioItem.classList.contains('design')) {
        // چک کردن کلاس‌های زیرمجموعه که در HTML دادی
        if (portfolioItem.classList.contains('ai')) {
            category = "Digital Design - AI Enhanced";
        } else if (portfolioItem.classList.contains('identity')) {
            category = "Digital Design - Identity Design";
        } else if (portfolioItem.classList.contains('invite')) {
            category = "Digital Design - Cards & Invites";
        } else if (portfolioItem.classList.contains('manipulation')) {
            category = "Digital Design - Photo Edit";
        } else {
            category = "Digital Design"; // حالت رزرو اگر کلاس فرعی نداشت
        }
    }
    
    // نمایش تایتل دقیق در پاپ‌آپ
    popupSubtitleSpan.innerHTML = category;
    
    // ۳. کپی کردن جزئیات متن
    const detailsContent = portfolioItem.querySelector('.portfolio-item-details').cloneNode(true);
    detailsContent.style.display = 'block';
    
    // حذف ویدیوی تکراری از بخش توضیحات
    const videoInBody = detailsContent.querySelector('.video-container');
    if(videoInBody) videoInBody.remove();

    popupBody.innerHTML = detailsContent.innerHTML;
}

// Services Modal
const modalViews = document.querySelectorAll('.services-modal'),
      modelBtns = document.querySelectorAll('.services-button'),
      modalCloses = document.querySelectorAll('.services-modal-close');

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}
modelBtns.forEach((mb, i) => mb.addEventListener('click', () => modal(i)));
modalCloses.forEach((mc) => mc.addEventListener('click', () => {
    modalViews.forEach((mv) => mv.classList.remove('active-modal'));
}));

// Swiper
let swiper = new Swiper(".testimonials-container", {
    spaceBetween: 24, loop: true, grabCursor: true,
    pagination: { el: ".swiper-pagination", clickable: true },
    breakpoints: { 576: { slidesPerView: 2 }, 768: { slidesPerView: 2, spaceBetween: 48 } },
});

// Input Animation
const inputs = document.querySelectorAll('.input');
inputs.forEach((input) => {
    input.addEventListener('focus', () => input.parentNode.classList.add('focus'));
    input.addEventListener('blur', () => {
        if(input.value == "") input.parentNode.classList.remove('focus');
    });
});

// Nav Highlighter
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 50,
              sectionId = current.getAttribute('id'),
              navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
        if(navLink) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
});

// Sidebar Toggle
const navMenu = document.getElementById('sidebar'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');
if(navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-sidebar'));
if(navClose) navClose.addEventListener('click', () => navMenu.classList.remove('show-sidebar'));

// Sub-filter Toggle
const filterItems = document.querySelectorAll('.work-item');
const designSubfilters = document.getElementById('design-subfilters');
filterItems.forEach(item => {
    item.addEventListener('click', function() {
        if (this.getAttribute('data-filter') === '.design') {
            designSubfilters.style.display = 'flex';
        } else {
            designSubfilters.style.display = 'none';
        }
    });
});
// gallery Sub-filter Toggle
const gfilterItems = document.querySelectorAll('.work-item');
const gallerySubfilters = document.getElementById('gallery-subfilters');
gfilterItems.forEach(item => {
    item.addEventListener('click', function() {
        if (this.getAttribute('data-filter') === '.gallery') {
            gallerySubfilters.style.display = 'flex';
        } else {
            gallerySubfilters.style.display = 'none';
        }
    });
});
// Form Handling
const form = document.querySelector(".contact-form");
if(form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const status = document.createElement("p");
        status.style.color = "#c5f011";
        const data = new FormData(event.target);
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                status.innerHTML = "Sent Successfully!";
                form.reset();
            } else {
                status.innerHTML = "Error submitting form.";
            }
            form.appendChild(status);
        });
    });
}
