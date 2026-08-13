const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 400; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.2,
            o: Math.random(),
            twinkle: Math.random() * 0.02 + 0.005,
            drift: Math.random() * 0.2
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.o += star.twinkle;
        if (star.o > 1 || star.o < 0.2) star.twinkle = -star.twinkle;
        star.y -= star.drift;
        if (star.y < 0) star.y = canvas.height;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.o})`;
        ctx.fill();
    });
    
    requestAnimationFrame(draw);
}

async function loadStats() {
    try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        
        animateCount('statScripts', data.totalScripts || 0);
        animateCount('statLoaders', data.totalLoaders || 0);
        animateCount('statLoads', data.totalLoads || 0);
    } catch(e) {
        console.error('Failed to load stats');
    }
}

function animateCount(id, target) {
    const el = document.getElementById(id);
    let current = 0;
    const step = target / 40;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 25);
}

resize();
draw();
loadStats();
window.addEventListener('resize', resize);
