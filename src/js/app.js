// src/js/app.js – main render logic, navigation, dynamic content
import { CONTENT, SOCIAL } from './content.js';
import { initEffects, showToast } from './effects.js';

// ----- state -----
let currentPage = 'home';

// ----- DOM refs -----
const app = document.getElementById('app');

// ----- navigation data -----
const PAGES = ['home', 'docs', 'purchase', 'tos'];

// ----- render engine -----
function render() {
  // build page content based on currentPage
  let html = '';
  html += buildNav();
  html += buildPage(currentPage);
  app.innerHTML = html;

  // attach nav listeners
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page && PAGES.includes(page)) {
        currentPage = page;
        render();
        // show a toast on navigation
        showToast(`📄 ${page.charAt(0).toUpperCase() + page.slice(1)}`);
      }
    });
  });

  // social links (already in nav)
  // additional GitHub/Discord if needed
}

function buildNav() {
  const isActive = (p) => p === currentPage ? 'active' : '';
  return `
    <nav>
      <span class="logo">Lunyx</span>
      <div class="nav-links">
        ${PAGES.map(p => `<a class="nav-link ${isActive(p)}" data-page="${p}">${p.charAt(0).toUpperCase() + p.slice(1)}</a>`).join('')}
      </div>
      <div class="social-icons">
        <a href="${SOCIAL.discord}" target="_blank" aria-label="Discord"><i class="fa-brands fa-discord"></i></a>
        <a href="${SOCIAL.github}" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
      </div>
    </nav>
  `;
}

function buildPage(page) {
  switch(page) {
    case 'home': return buildHome();
    case 'docs': return buildDocs();
    case 'purchase': return buildPurchase();
    case 'tos': return buildTos();
    default: return '<p>Page not found</p>';
  }
}

function buildHome() {
  const c = CONTENT.home;
  const features = c.features.map(f => `
    <div class="feature-item">
      <i class="${f.icon}"></i>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>
  `).join('');
  return `
    <section class="hero">
      <h1>${c.title}</h1>
      <p class="sub">${c.subtitle}</p>
      <div class="feature-grid">${features}</div>
    </section>
  `;
}

function buildDocs() {
  const c = CONTENT.docs;
  const items = c.commands.map(cmd => `
    <li><i class="fa-solid fa-terminal"></i> <code>${cmd.cmd}</code> — ${cmd.desc}</li>
  `).join('');
  return `
    <section>
      <h2 style="font-weight:500; font-size:2rem; margin-bottom:1.2rem; background: linear-gradient(180deg,#fff,#aaa); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">${c.title}</h2>
      <div class="doc-card">
        <ul>${items}</ul>
        <p style="margin-top:1.4rem; color:#999;"><i class="fa-regular fa-circle-info"></i> ${c.note}</p>
      </div>
    </section>
  `;
}

function buildPurchase() {
  const c = CONTENT.purchase;
  const plans = c.plans.map(p => `
    <div class="plan-card">
      <h3>${p.name}</h3>
      <div class="price">${p.price} <small>${p.period}</small></div>
      <ul style="list-style:none; margin:0.8rem 0; color:#b5b5b5;">
        ${p.features.map(f => `<li style="padding:0.2rem 0;"><i class="fa-regular fa-circle-check" style="color:#7a7a7a;width:1.4rem;"></i> ${f}</li>`).join('')}
      </ul>
      <a href="#" class="btn-outline">Choose ${p.name}</a>
    </div>
  `).join('');
  return `
    <section>
      <h2 style="font-weight:500; font-size:2rem; margin-bottom:0.5rem; background: linear-gradient(180deg,#fff,#aaa); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">${c.title}</h2>
      <div class="plan-grid">${plans}</div>
      <p style="color:#7a7a7a; margin-top:1.8rem; font-size:0.9rem;">All plans include lifetime access. Contact for enterprise.</p>
    </section>
  `;
}

function buildTos() {
  const c = CONTENT.tos;
  const sections = c.sections.map(s => `
    <div style="margin-bottom:1.2rem;">
      <h4 style="color:#e0e0e0; font-weight:500; font-size:1.2rem;">${s.heading}</h4>
      <p style="color:#b0b0b0; line-height:1.6;">${s.text}</p>
    </div>
  `).join('');
  return `
    <section>
      <h2 style="font-weight:500; font-size:2rem; margin-bottom:1.2rem; background: linear-gradient(180deg,#fff,#aaa); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">${c.title}</h2>
      <div class="tos-card">
        ${sections}
        <p style="color:#888; margin-top:1rem;"><i class="fa-regular fa-clock"></i> Last updated: April 2026</p>
      </div>
    </section>
  `;
}

// ----- init -----
document.addEventListener('DOMContentLoaded', () => {
  initEffects();
  render();
  // initial toast
  setTimeout(() => showToast('Lunyx · Lua Obfuscator'), 1600);
});
