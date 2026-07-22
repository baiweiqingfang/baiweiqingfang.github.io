const body = document.body;
const menuToggle = document.querySelector('#menuToggle');
const sidebar = document.querySelector('#sidebar');
const themeToggle = document.querySelector('#themeToggle');
const searchToggle = document.querySelector('#searchToggle');
const searchPanel = document.querySelector('#searchPanel');
const searchInput = document.querySelector('#searchInput');
const searchClose = document.querySelector('#searchClose');
const backToTop = document.querySelector('#backToTop');
const cards = [...document.querySelectorAll('.post-card')];
const emptyState = document.querySelector('#emptyState');

function renderPosts() {
  if (!searchInput || !emptyState) return;
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach((card) => {
    const haystack = `${card.dataset.search || ''} ${card.textContent}`.toLowerCase();
    card.hidden = Boolean(query) && !haystack.includes(query);
    if (!card.hidden) visible += 1;
  });

  emptyState.hidden = visible !== 0;
}

menuToggle?.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('blog-theme', body.classList.contains('light') ? 'light' : 'dark');
});

searchToggle?.addEventListener('click', () => {
  searchPanel.hidden = false;
  searchInput.focus();
});

searchClose?.addEventListener('click', () => {
  searchPanel.hidden = true;
  searchInput.value = '';
  renderPosts();
});

searchInput?.addEventListener('input', renderPosts);
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 420);
});

if (localStorage.getItem('blog-theme') === 'light') body.classList.add('light');
if (window.lucide) window.lucide.createIcons();
