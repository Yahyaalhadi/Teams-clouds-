const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const toast = document.getElementById('toast');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 3000);
}

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.main-nav a').forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.news-card').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

function openArticle(title) {
  modalTitle.textContent = title;
  modalBackdrop.hidden = false;
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

document.querySelectorAll('[data-read]').forEach((button) => {
  button.addEventListener('click', () => openArticle(button.dataset.read));
});

function closeModal() {
  modalBackdrop.hidden = true;
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (event) => {
  if (event.target === modalBackdrop) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modalBackdrop.hidden) closeModal();
});

document.getElementById('modalAction').addEventListener('click', () => {
  closeModal();
  showToast('شكرًا لاهتمامك — المزيد من الأخبار قريبًا.');
});

document.getElementById('viewAllNews').addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
  document.querySelector('.filter[data-filter="all"]').classList.add('active');
  document.querySelectorAll('.news-card').forEach((card) => { card.hidden = false; });
  showToast('تم عرض كل الأخبار المتاحة في النسخة الأولية.');
});

document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => {
    const message = button.dataset.action === 'join'
      ? 'سيتم تفعيل التسجيل في النسخة القادمة.'
      : 'سيتم إضافة صفحة الفرق قريبًا.';
    showToast(message);
  });
});
