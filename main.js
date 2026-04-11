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

//Mix it up Sorting

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


//Portfolio Popup

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('work-button')){
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement);
    }
})

function togglePortfolioPopup() {
    document.querySelector('.portfolio-popup').classList.toggle('open');
}

document.querySelector('.portfolio-popup-close').addEventListener('click', togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
    // ۱. تنظیمات عکس پاپ‌آپ
    const popupThumbnailImg = document.querySelector('.pp-thumbnail img');
    
    // اگر کارت کلاس مخصوص ویدیو داشت، عکسِ کاور را مخفی کن
    if (portfolioItem.classList.contains('is-video-project')) {
        popupThumbnailImg.style.display = 'none';
    } else {
        // اگر پروژه عکس بود، عکس را در پاپ‌آپ نشان بده
        popupThumbnailImg.style.display = 'block';
        popupThumbnailImg.src = portfolioItem.querySelector('.work-img').src;
    }

    // ۲. منطق هوشمند ساب‌تایتل
    const subTitleTag = portfolioItem.querySelector('.project-subtitle');
    const mainTitle = portfolioItem.querySelector('.work-title').innerHTML;
    const targetSubtitleSpan = document.querySelector('.portfolio-popup-subtitle span');

    // اگر ساب‌تایتل وجود داشت و خالی نبود، آن را نشان بده، در غیر این صورت تایتل اصلی
    if(subTitleTag && subTitleTag.innerHTML.trim() !== "") {
        targetSubtitleSpan.innerHTML = subTitleTag.innerHTML;
    } else {
        targetSubtitleSpan.innerHTML = mainTitle;
    }

    // ۳. کپی کردن کل بدنه جزئیات به داخل پاپ‌آپ
    document.querySelector('.portfolio-popup-body').innerHTML = portfolioItem.querySelector('.portfolio-item-details').innerHTML;
    
    // ۴. اطمینان از اینکه تیتر داخل پاپ‌آپ هم درست است
    const detailsTitle = document.querySelector('.portfolio-popup-body .details-title');
    if(detailsTitle) {
        detailsTitle.innerHTML = mainTitle;
    }
}

//Services Popup
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

//Swiper Testimonial

let swiper = new Swiper(".testimonials-container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 48,
        },
    },
});

// Input Animation

const inputs = document.querySelectorAll('.input');

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add('focus');
}

function blurFunc() {
    let parent = this.parentNode;
    if(this.value == "") {
        parent.classList.remove('focus');
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

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
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

//Form 

const form = document.querySelector(".contact-form");
        
        async function handleSubmit(event) {
  event.preventDefault();
  var status = document.createElement("p"); // ایجاد المان پیام وضعیت
  status.style.color = "#c5f011"; // ست کردن رنگ سبز سایتت
  status.style.marginTop = "10px";
  
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks! Your message has been sent successfully.";
      form.reset(); // خالی کردن فرم بعد از ارسال
      form.appendChild(status);
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form";
        }
        form.appendChild(status);
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form";
    form.appendChild(status);
  });
}
form.addEventListener("submit", handleSubmit)

//Sub Work

const filterItems = document.querySelectorAll('.work-item');
    const designSubfilters = document.getElementById('design-subfilters');

    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            // اگر روی دکمه Digital Designer کلیک شد
            if (this.getAttribute('data-filter') === '.design') {
                designSubfilters.style.display = 'flex';
            } else {
                // برای بقیه تب‌ها مخفی شود
                designSubfilters.style.display = 'none';
            }
        });
    });



