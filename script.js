// script.js

document.addEventListener('DOMContentLoaded', () => {

  // Animate link buttons on load
  const buttons = document.querySelectorAll('.link-btn');
  buttons.forEach(btn => {
    setTimeout(() => btn.classList.add('visible'), 300);
  });

  // Particle effect on background
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  `;
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.6 + 0.2,
    };
  }

  for (let i = 0; i < 80; i++) particles.push(createParticle());

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.y < -5) particles[i] = createParticle();
    });

    requestAnimationFrame(draw);
  }

  draw();

  // Click ripple on buttons
  document.querySelectorAll('.link-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(168, 85, 247, 0.3);
        width: 10px; height: 10px;
        left: ${e.clientX - rect.left - 5}px;
        top: ${e.clientY - rect.top - 5}px;
        animation: ripple 0.6s ease-out forwards;
        pointer-events: none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to { transform: scale(30); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

});
