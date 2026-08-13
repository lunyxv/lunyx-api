// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close nav when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Code Animation in Hero
const codeExamples = [
    `local config = {
  name = "MyScript",
  version = "1.0.0"
}

function init()
  print("Protected!")
end`,
    `function process(data)
  local result = {}
  for i, v in pairs(data) do
    table.insert(result, v * 2)
  end
  return result
end`,
    `local cache = {}

function fetch(key)
  if cache[key] then
    return cache[key]
  end
  -- load from storage
end`
];

let codeIndex = 0;

function updateCode() {
    const codePreview = document.getElementById('codePreview');
    if (codePreview) {
        codePreview.textContent = codeExamples[codeIndex];
        codeIndex = (codeIndex + 1) % codeExamples.length;
    }
}

// Initial code
updateCode();
setInterval(updateCode, 4000);

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Stats Loading
async function loadStats() {
    try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        
        animateCount('statScripts', data.totalScripts || 0);
        animateCount('statLoaders', data.totalLoaders || 0);
        animateCount('statLoads', data.totalLoads || 0);
    } catch (e) {
        console.error('Failed to load stats:', e);
        // Fallback demo values
        animateCount('statScripts', 1250);
        animateCount('statLoaders', 843);
        animateCount('statLoads', 45000);
    }
}

function animateCount(id, target) {
    const el = document.getElementById(id);
    if (!el) return;

    let current = 0;
    const step = Math.max(target / 40, 1);
    const duration = 2000;
    const startTime = Date.now();

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        current = Math.floor(target * progress);
        
        el.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target.toLocaleString();
        }
    }

    update();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature items
document.querySelectorAll('.feature-item, .doc-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// CTA Button Actions
const startBtn = document.getElementById('startBtn');
const ctaBtn = document.getElementById('ctaBtn');

const handleCTA = () => {
    // Navigate to obfuscate section or your app
    window.location.href = '/app';
};

if (startBtn) startBtn.addEventListener('click', handleCTA);
if (ctaBtn) ctaBtn.addEventListener('click', handleCTA);

// Load stats on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadStats);
} else {
    loadStats();
}

// Add parallax effect to background on mouse move
document.addEventListener('mousemove', (e) => {
    const glow = document.querySelector('.bg-glow');
    if (!glow) return;

    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    glow.style.transform = `translate(${x - 50}%, ${y - 50}%)`;
});
