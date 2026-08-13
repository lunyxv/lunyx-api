// Background stars
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5,
            o: Math.random(),
            s: Math.random() * 0.3
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.o += (Math.random() - 0.5) * 0.02;
        star.o = Math.max(0.2, Math.min(1, star.o));
        star.y -= star.s;
        if (star.y < 0) star.y = canvas.height;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.o})`;
        ctx.fill();
    });
    requestAnimationFrame(draw);
}

// Stats
async function loadStats() {
    try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        document.getElementById('s1').textContent = data.totalScripts || 0;
        document.getElementById('s2').textContent = data.totalLoaders || 0;
        document.getElementById('s3').textContent = data.totalLoads || 0;
    } catch(e) {}
}

resize();
draw();
loadStats();
window.addEventListener('resize', resize);
