// src/js/effects.js
import { showToast } from './app.js';

export function initEffects() {
  initParticles();
  initSpotlight();
  initSplash();
}

function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const COUNT = 80;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2.2 + 0.6;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = (Math.random() - 0.5) * 0.35;
      this.opacity = Math.random() * 0.5 + 0.15;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > w) this.speedX *= -1;
      if (this.y < 0 || this.y > h) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

function initSpotlight() {
  const div = document.createElement('div');
  div.className = 'spotlight';
  document.body.prepend(div);
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;
    div.style.setProperty('--x', x + '%');
    div.style.setProperty('--y', y + '%');
  });
}

function initSplash() {
  const splash = document.createElement('div');
  splash.id = 'splash';
  splash.innerHTML = `<i class="fa-solid fa-shield-halved"></i><h1>Lunyx</h1>`;
  document.body.prepend(splash);
  setTimeout(() => {
    splash.classList.add('hidden');
    setTimeout(() => splash.remove(), 800);
  }, 1400);
}
