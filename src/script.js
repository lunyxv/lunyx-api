// Generate stars
const starsContainer = document.querySelector('.stars');

for (let i = 0; i < 150; i++) {
    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.width = Math.random() * 2 + 1 + 'px';
    star.style.height = star.style.width;
    star.style.background = '#fff';
    star.style.borderRadius = '50%';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
    starsContainer.appendChild(star);
}

// Load stats
async function loadStats() {
    try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        document.getElementById('totalScripts').textContent = data.totalScripts || 0;
        document.getElementById('totalLoaders').textContent = data.totalLoaders || 0;
        document.getElementById('totalLoads').textContent = data.totalLoads || 0;
    } catch (e) {
        console.error('Failed to load stats');
    }
}

loadStats();
