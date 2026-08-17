const header = document.getElementById('header');
const menu = document.getElementById('nav-menu');
const openMenu = document.getElementById('nav-toggle');
const closeMenu = document.getElementById('nav-close');

function setMenu(open) {
  menu?.classList.toggle('show', open);
  document.body.classList.toggle('lock', open);
}

openMenu?.addEventListener('click', () => setMenu(true));
closeMenu?.addEventListener('click', () => setMenu(false));
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 20));

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.setAttribute('aria-label', 'Image preview');
lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close preview">&times;</button><img src="" alt="">';
document.body.appendChild(lightbox);

const preview = lightbox.querySelector('img');
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.classList.remove('lock');
  preview.src = '';
}

document.querySelectorAll('.gallery-item img').forEach(image => {
  image.parentElement.setAttribute('tabindex', '0');
  const open = () => {
    preview.src = image.src;
    preview.alt = image.alt;
    lightbox.classList.add('open');
    document.body.classList.add('lock');
  };
  image.parentElement.addEventListener('click', open);
  image.parentElement.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  });
});

lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
