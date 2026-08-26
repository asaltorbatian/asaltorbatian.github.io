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

// Highlight the current homepage section without measuring layout on every scroll.
const sections = document.querySelectorAll('section[id]');
const sectionLinks = new Map(
    [...sections].map(section => [
        section.id,
        document.querySelector(`.nav-menu a[href="#${section.id}"]`)
    ])
);

if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        const activeEntry = entries.find(entry => entry.isIntersecting);
        if (!activeEntry) return;

        sectionLinks.forEach((link, id) => {
            link?.classList.toggle('active-link', id === activeEntry.target.id);
        });
    }, { rootMargin: '-30% 0px -65% 0px', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));
} else {
    let sectionBounds = [];
    let sectionUpdateRequested = false;

    const measureSections = () => {
        sectionBounds = [...sections].map(section => ({
            id: section.id,
            top: section.offsetTop,
            bottom: section.offsetTop + section.offsetHeight
        }));
    };

    const updateActiveSection = () => {
        const marker = window.scrollY + window.innerHeight * .35;
        const active = sectionBounds.find(section => marker >= section.top && marker < section.bottom);
        if (active) {
            sectionLinks.forEach((link, id) => link?.classList.toggle('active-link', id === active.id));
        }
        sectionUpdateRequested = false;
    };

    const requestSectionUpdate = () => {
        if (sectionUpdateRequested) return;
        sectionUpdateRequested = true;
        requestAnimationFrame(updateActiveSection);
    };

    measureSections();
    window.addEventListener('scroll', requestSectionUpdate, { passive: true });
    window.addEventListener('resize', () => {
        measureSections();
        requestSectionUpdate();
    }, { passive: true });
}

// Mobile sidebar
const navMenu = document.getElementById('sidebar');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

function setSidebar(open) {
    navMenu?.classList.toggle('show-sidebar', open);
    navToggle?.setAttribute('aria-expanded', String(open));
}

navToggle?.addEventListener('click', () => setSidebar(true));
navClose?.addEventListener('click', () => setSidebar(false));
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => setSidebar(false));
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
    let scrollableHeight = 0;
    let updateRequested = false;

    const updateProgress = () => {
        const scrollTop = window.scrollY;
        if (scrollableHeight === 0) {
            scrollableHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        }
        const percent = Math.min(1, scrollTop / scrollableHeight);
        circle.style.strokeDashoffset = circumference - percent * circumference;
        progress.classList.toggle('show', scrollTop > 100);
        updateRequested = false;
    };

    const requestProgressUpdate = () => {
        if (updateRequested) return;
        updateRequested = true;
        requestAnimationFrame(updateProgress);
    };

    const resetScrollableHeight = () => {
        scrollableHeight = 0;
        requestProgressUpdate();
    };

    window.addEventListener('scroll', requestProgressUpdate, { passive: true });
    window.addEventListener('resize', resetScrollableHeight, { passive: true });

    progress.addEventListener('click', event => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
