// Skill tabs
const tabs = document.querySelectorAll('[data-target]');
const tabContent = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);
        if (!target) return;
        tabContent.forEach(content => content.classList.remove('skills-active'));
        tabs.forEach(item => item.classList.remove('skills-active'));
        target.classList.add('skills-active');
        tab.classList.add('skills-active');
    });
});

// Service modals
const modalViews = document.querySelectorAll('.services-modal');
const modalButtons = document.querySelectorAll('.services-button');
const modalCloses = document.querySelectorAll('.services-modal-close');

modalButtons.forEach((button, index) => {
    button.addEventListener('click', () => modalViews[index]?.classList.add('active-modal'));
});

modalCloses.forEach(close => {
    close.addEventListener('click', () => modalViews.forEach(modal => modal.classList.remove('active-modal')));
});

modalViews.forEach(modal => {
    modal.addEventListener('click', event => {
        if (event.target === modal) modal.classList.remove('active-modal');
    });
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') modalViews.forEach(modal => modal.classList.remove('active-modal'));
});

// Contact input animation
document.querySelectorAll('.input').forEach(input => {
    input.addEventListener('focus', () => input.parentNode.classList.add('focus'));
    input.addEventListener('blur', () => {
        if (input.value === '') input.parentNode.classList.remove('focus');
    });
});

// Highlight the current homepage section
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 50;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        if (!navLink) return;
        navLink.classList.toggle('active-link', scrollY > sectionTop && scrollY <= sectionTop + section.offsetHeight);
    });
});

// Mobile sidebar
const navMenu = document.getElementById('sidebar');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

navToggle?.addEventListener('click', () => navMenu?.classList.add('show-sidebar'));
navClose?.addEventListener('click', () => navMenu?.classList.remove('show-sidebar'));
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navMenu?.classList.remove('show-sidebar'));
});

// Contact form
const form = document.querySelector('.contact-form');
form?.addEventListener('submit', async event => {
    event.preventDefault();
    form.querySelector('.form-status')?.remove();
    const status = document.createElement('p');
    status.className = 'form-status';
    status.style.color = '#c5f011';

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        });
        status.textContent = response.ok ? 'Sent Successfully!' : 'Error submitting form.';
        if (response.ok) form.reset();
    } catch {
        status.textContent = 'Error submitting form.';
    }

    form.appendChild(status);
});

// Scroll progress button
const progress = document.getElementById('scroll-progress');
const circle = progress?.querySelector('.progress-circle');
const radius = 26;
const circumference = 2 * Math.PI * radius;

if (progress && circle) {
    circle.style.strokeDasharray = circumference;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
        circle.style.strokeDashoffset = circumference - percent * circumference;
        progress.classList.toggle('show', scrollTop > 100);
    });

    progress.addEventListener('click', event => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
