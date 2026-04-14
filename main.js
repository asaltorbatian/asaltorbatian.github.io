/*=============== کل کد جاوااسکریپت اصلاح شده ===============*/

// Toggling Skill Tabs
const tabs = document.querySelectorAll('[data-target]');
const tabContent = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContent.forEach(tabContents => {
            tabContents.classList.remove('skills-active');
        })
        target.classList.add('skills-active');

        tabs.forEach(tab => {
            tab.classList.remove('skills-active');
        })
        tab.classList.add('skills-active');
    })
})

// Mix it up Sorting
let mixerPortfolio = mixitup('.work-container', {
    selectors: {
        target: '.work-card'
    },
    animation: {
        duration: 300
    }
});

// Active link changing
const linkWork = document.querySelectorAll('.work-item');
function activeWork() {
    linkWork.forEach(l => l.classList.remove('active-work'))
    this.classList.add('active-work')
}
linkWork.forEach(l => l.addEventListener('click', activeWork));

const linkSubWork = document.querySelectorAll('.subwork-item');
function activeSubWork() {
    linkSubWork.forEach(l => l.classList.remove('active-subwork'))
    this.classList.add('active-subwork')
}
linkSubWork.forEach(l => l.addEventListener('click', activeSubWork));


// Portfolio Popup
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('work-button')){
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement);
    }
})

function togglePortfolioPopup() {
    const popup = document.querySelector('.portfolio-popup');
    popup.classList.toggle('open');
    
    // قطع صدای ویدیو و ریست کردن محتوا هنگام بستن پاپ‌آپ
    if(!popup.classList.contains('open')) {
        document.querySelector('.pp-thumbnail').innerHTML = '<img src="" class="work-img" alt="">';
    }
}

document.querySelector('.portfolio-popup-close').addEventListener('click', togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
    const thumbnailContainer = document.querySelector('.pp-thumbnail');
    const popupContent = document.querySelector('.portfolio-popup-content');
    const popupSubtitle = document.querySelector('.portfolio-popup-subtitle');
    
    // ۱. مدیریت محتوای تصویری یا ویدیویی
    // فرض بر این است که برای ویدیوها، لینک گوگل درایو را در دیتای کارت یا یک لینک مخفی دارید
    const videoLinkTag = portfolioItem.querySelector('.portfolio-item-details a[href*="drive.google.com"]');
    
    if (portfolioItem.classList.contains('is-video-project') && videoLinkTag) {
        let videoUrl = videoLinkTag.href.replace('/view', '/preview').replace('?usp=sharing', '');
        thumbnailContainer.innerHTML = `<iframe src="${videoUrl}" width="100%" height="300px" frameborder="0" allow="autoplay"></iframe>`;
        popupContent.style.gridTemplateColumns = '1fr'; // حالت تمام‌عرض برای ویدیو
    } else {
        const imgSrc = portfolioItem.querySelector('.work-img').src;
        thumbnailContainer.innerHTML = `<img src="${imgSrc}" class="work-img" alt="">`;
        popupContent.style.gridTemplateColumns = 'repeat(2, 1fr)'; // حالت دو ستونه برای عکس
    }

    // ۲. آپدیت کردن تایتل و ساب‌تایتل بالای پاپ‌آپ (حل مشکل Featured - Web)
    const categoryName = portfolioItem.querySelector('.work-item')?.textContent || "Project";
    const mainTitle = portfolioItem.querySelector('.work-title').innerHTML;
    
    popupSubtitle.innerHTML = `Featured - <span>${categoryName}</span>`;

    // ۳. کپی کردن جزئیات پروژه
    document.querySelector('.portfolio-popup-body').innerHTML = portfolioItem.querySelector('.portfolio-item-details').innerHTML;
    
    // ۴. اصلاح تایتل داخل Body پاپ‌آپ
    const detailsTitle = document.querySelector('.portfolio-popup-body .details-title');
    if(detailsTitle) {
        detailsTitle.innerHTML = mainTitle;
    }
}

// Services Popup
const modalViews = document.querySelectorAll('.services-modal');
const modelBtns = document.querySelectorAll('.services-button');
const modalCloses = document.querySelectorAll('.services-modal-close');

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modelBtns.forEach((modelBtn, i) => {
    modelBtn.addEventListener('click', () => {
        modal(i);
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
        })
    })
})

// Swiper Testimonial
let swiper = new Swiper(".testimonials-container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 2, spaceBetween: 48 },
    },
});

// Input Animation
const inputs = document.querySelectorAll('.input');
function focusFunc() {
    this.parentNode.classList.add('focus');
}
function blurFunc() {
    if(this.value == "") {
        this.parentNode.classList.remove('focus');
    }
}
inputs.forEach((input) => {
    input.addEventListener('focus', focusFunc);
    input.addEventListener('blur', blurFunc);
})

// Scroll Section Active Link
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', navHighlighter);

function navHighlighter() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
        if(navLink) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    })
}

// Activating Sidebar
const navMenu = document.getElementById('sidebar');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-sidebar');
    })
}
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-sidebar');
    })
}

// Form Submission
const form = document.querySelector(".contact-form");
async function handleSubmit(event) {
    event.preventDefault();
    var status = document.createElement("p");
    status.style.color = "#c5f011";
    status.style.marginTop = "10px";
    
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Thanks! Your message has been sent successfully.";
            form.reset();
            form.appendChild(status);
        } else {
            response.json().then(data => {
                status.innerHTML = Object.hasOwn(data, 'errors') ? data["errors"].map(error => error["message"]).join(", ") : "Oops! Problem submitting form";
                form.appendChild(status);
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form";
        form.appendChild(status);
    });
}
if(form) form.addEventListener("submit", handleSubmit);

// Sub Work Filter Toggle
const filterItemsList = document.querySelectorAll('.work-item');
const designSubfilters = document.getElementById('design-subfilters');

filterItemsList.forEach(item => {
    item.addEventListener('click', function() {
        if (this.getAttribute('data-filter') === '.design' || this.getAttribute('data-filter') === '.all') {
             // اگر دوست داری در حالت All هم فیلترهای دیزاین باشن، اینجا بمونه
             if(designSubfilters) designSubfilters.style.display = (this.getAttribute('data-filter') === '.design') ? 'flex' : 'none';
        } else {
            if(designSubfilters) designSubfilters.style.display = 'none';
        }
    });
});
