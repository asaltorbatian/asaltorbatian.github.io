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
lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close preview">&times;</button><img src="" alt=""><iframe src="" title="Video player" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe><div class="lightbox-details"></div>';
document.body.appendChild(lightbox);

const preview = lightbox.querySelector('img');
const videoPlayer = lightbox.querySelector('iframe');
const detailsPanel = lightbox.querySelector('.lightbox-details');
let lastTrigger = null;
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.classList.remove('video-open');
  lightbox.classList.remove('details-open');
  document.body.classList.remove('lock');
  preview.src = '';
  videoPlayer.src = '';
  detailsPanel.replaceChildren();
  lastTrigger?.focus();
  lastTrigger = null;
}

function openVideo(item, trigger) {
  lastTrigger = trigger;
  videoPlayer.src = item.dataset.video;
  lightbox.setAttribute('aria-label', `${item.querySelector('h3').textContent} video`);
  lightbox.classList.add('video-open', 'open');
  document.body.classList.add('lock');
  lightbox.querySelector('.lightbox-close').focus();
}

function openDetails(item, trigger) {
  lastTrigger = trigger;
  const content = item.querySelector('.video-detail-content');
  detailsPanel.append(content.cloneNode(true));
  detailsPanel.firstElementChild.hidden = false;
  lightbox.setAttribute('aria-label', `${item.querySelector('h3').textContent} project details`);
  lightbox.classList.add('details-open', 'open');
  document.body.classList.add('lock');
  lightbox.querySelector('.lightbox-close').focus();
}

document.querySelectorAll('.video-project-card').forEach(item => {
  item.querySelector('.view-video')?.addEventListener('click', event => openVideo(item, event.currentTarget));
  item.querySelector('.view-details')?.addEventListener('click', event => openDetails(item, event.currentTarget));
});

document.querySelectorAll('.gallery-item img').forEach(image => {
  const item = image.parentElement;
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
  item.setAttribute('aria-label', image.alt);
  const open = () => {
    const videoUrl = item.dataset.video;
    if (videoUrl) {
      videoPlayer.src = videoUrl;
      lightbox.classList.add('video-open');
    } else {
      preview.src = image.src;
      preview.alt = image.alt;
    }
    lightbox.classList.add('open');
    document.body.classList.add('lock');
  };
  item.addEventListener('click', open);
  item.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  });
});

lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
