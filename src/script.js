// Galaxy animation
const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');
let stars = [];
let shootingStars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createStars() {
    stars = [];
    for (let i = 0; i < 300; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            opacity: Math.random(),
            speed: Math.random() * 0.5 + 0.1,
            twinkleSpeed: Math.random() * 0.02 + 0.005
        });
    }
}

function createShootingStar() {
    if (Math.random() < 0.005) {
        shootingStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.5,
            vx: -Math.random() * 8 - 4,
            vy: Math.random() * 4 + 2,
            life: 1
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.2) star.twinkleSpeed = -star.twinkleSpeed;
        
        star.x -= star.speed;
        if (star.x < 0) star.x = canvas.width;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });
    
    shootingStars = shootingStars.filter(s => s.life > 0);
    shootingStars.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.02;
        
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 5, s.y - s.vy * 5);
        ctx.strokeStyle = `rgba(255, 255, 255, ${s.life})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    });
    
    createShootingStar();
    requestAnimationFrame(animate);
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .doc-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Load stats
async function loadStats() {
    try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        
        animateNumber('totalScripts', data.totalScripts || 0);
        animateNumber('totalLoaders', data.totalLoaders || 0);
        animateNumber('totalLoads', data.totalLoads || 0);
    } catch (e) {
        console.error('Failed to load stats');
    }
}

function animateNumber(id, target) {
    const el = document.getElementById(id);
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 20);
}

// Initialize
resizeCanvas();
createStars();
animate();
loadStats();

window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
});
