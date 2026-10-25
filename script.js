const images   = Array.from(document.querySelectorAll('.design-gallery img'));
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbCount  = document.getElementById('lbCounter');
let current = 0;

function show(index) {
  current = (index + images.length) % images.length;
  lbImg.src = images[current].src;
  lbImg.alt = images[current].alt;
  lbCount.textContent = `${current + 1} / ${images.length}`;
}

function openLightbox(index) {
  show(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';   // stop the page scrolling behind
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// click a design to open it
images.forEach((img, i) => {
  img.addEventListener('click', () => openLightbox(i));
});

// buttons
document.getElementById('lbNext').addEventListener('click', () => show(current + 1));
document.getElementById('lbPrev').addEventListener('click', () => show(current - 1));
document.getElementById('lbClose').addEventListener('click', closeLightbox);

// click the dark background (not the image) to close
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// keyboard: arrows and Esc
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowRight') show(current + 1);
  if (e.key === 'ArrowLeft')  show(current - 1);
  if (e.key === 'Escape')     closeLightbox();
});
const root = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
}

// use saved choice, else follow the visitor's device setting
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved || (prefersDark ? 'dark' : 'light'));

toggleBtn.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.textContent = isOpen ? '✕' : '☰';
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// close the menu after tapping a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.textContent = '☰';
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});
