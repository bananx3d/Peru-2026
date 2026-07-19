const tabs = document.querySelectorAll('.tab');
const screens = document.querySelectorAll('.screen');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    screens.forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

const departure = new Date('2026-09-04T00:00:00');
const today = new Date();
const diff = Math.ceil((departure - today) / 86400000);
document.getElementById('countdown').textContent =
  diff > 1 ? `${diff} dni` : diff === 1 ? '1 dzień' : diff === 0 ? 'dzisiaj' : 'w trasie';

document.querySelectorAll('input[type="checkbox"][data-key]').forEach(box => {
  const key = `peru2026:${box.dataset.key}`;
  box.checked = localStorage.getItem(key) === '1';
  box.addEventListener('change', () => localStorage.setItem(key, box.checked ? '1' : '0'));
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
}
