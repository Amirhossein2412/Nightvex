// =============================================
//  عدد دنبال‌کننده فعلی رو اینجا تغییر بده
// =============================================
const FOLLOWERS = 0;

// ---------- Particles ----------
const container = document.getElementById('particles');
const PARTICLE_COUNT = 40;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  p.style.left     = Math.random() * 100 + 'vw';
  p.style.animationDuration  = (Math.random() * 15 + 8) + 's';
  p.style.animationDelay     = (Math.random() * 10) + 's';
  p.style.width  = p.style.height = (Math.random() * 3 + 1) + 'px';
  p.style.opacity = (Math.random() * 0.5 + 0.1).toString();
  container.appendChild(p);
}

// ---------- Ripple Effect ----------
document.querySelectorAll('.social-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width  = ripple.style.height = size + 'px';
    ripple.style.left   = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top    = (e.clientY - rect.top  - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// ---------- Progress Goals ----------
document.querySelectorAll('.goal-bar').forEach(bar => {
  const target  = parseInt(bar.dataset.target);
  const current = FOLLOWERS;
  const pct     = Math.min((current / target) * 100, 100).toFixed(1);

  const card = bar.closest('.goal-card');
  card.querySelector('.goal-current').textContent = current.toLocaleString('fa-IR');
  card.querySelector('.goal-percent').textContent = pct + '%';

  setTimeout(() => {
    bar.style.width = pct + '%';
    if (current >= target) bar.classList.add('complete');
  }, 400);
});
