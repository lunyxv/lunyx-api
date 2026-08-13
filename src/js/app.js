const content = {
    home: {
        title: 'Lunyx',
        subtitle: 'Lua Obfuscator',
        features: [
            { icon: 'fa-lock', title: 'String Encryption', desc: 'Runtime decryption' },
            { icon: 'fa-shuffle', title: 'Name Mangling', desc: 'Random identifiers' },
            { icon: 'fa-server', title: 'Loader System', desc: 'Remote loading' },
            { icon: 'fa-bolt', title: 'Fast', desc: 'Milliseconds' }
        ]
    },
    docs: {
        title: 'Documentation',
        commands: [
            { cmd: '/obfuscate file:script.lua', desc: 'Obfuscate a Lua file' },
            { cmd: '/createloader script:script.lua', desc: 'Create a loader' },
            { cmd: '/deleteloader id:loader_id', desc: 'Delete a loader' },
            { cmd: '/listloaders', desc: 'List all scripts' }
        ]
    },
    purchase: {
        title: 'Purchase',
        plans: [
            { name: 'Basic', price: '$5', features: ['Obfuscation', 'Basic loader'] },
            { name: 'Premium', price: '$10', features: ['Full obfuscation', 'Loader system', 'Script deletion'] },
            { name: 'Lifetime', price: '$25', features: ['Everything', 'Priority support'] }
        ]
    },
    tos: {
        title: 'Terms of Service',
        sections: [
            { heading: '1. Acceptance', text: 'By using Lunyx, you agree to these terms.' },
            { heading: '2. Usage', text: 'Lunyx is provided as-is.' },
            { heading: '3. Restrictions', text: 'Do not use for malicious purposes.' },
            { heading: '4. Termination', text: 'We reserve the right to revoke access.' }
        ]
    }
};

const app = document.getElementById('app');

function renderPage(page) {
    if (page === 'home') renderHome();
    else if (page === 'docs') renderDocs();
    else if (page === 'purchase') renderPurchase();
    else if (page === 'tos') renderTos();
}

function renderHome() {
    const c = content.home;
    app.innerHTML = `
        <nav class="navbar">
            <span class="brand"><i class="fa-solid fa-shield-halved"></i> Lunyx</span>
            <div class="links">
                <a href="#home" onclick="navigate('home')">Home</a>
                <a href="#docs" onclick="navigate('docs')">Docs</a>
                <a href="#purchase" onclick="navigate('purchase')">Purchase</a>
                <a href="#tos" onclick="navigate('tos')">TOS</a>
            </div>
        </nav>
        <section class="hero">
            <h1>${c.title}</h1>
            <p>${c.subtitle}</p>
            <div class="features">
                ${c.features.map(f => `
                    <div class="feature">
                        <i class="fa-solid ${f.icon}"></i>
                        <h3>${f.title}</h3>
                        <p>${f.desc}</p>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

function renderDocs() {
    const c = content.docs;
    app.innerHTML = `
        <nav class="navbar">
            <span class="brand"><i class="fa-solid fa-shield-halved"></i> Lunyx</span>
            <div class="links">
                <a href="#home" onclick="navigate('home')">Home</a>
                <a href="#docs" onclick="navigate('docs')">Docs</a>
                <a href="#purchase" onclick="navigate('purchase')">Purchase</a>
                <a href="#tos" onclick="navigate('tos')">TOS</a>
            </div>
        </nav>
        <section class="page">
            <h1>${c.title}</h1>
            ${c.commands.map(cmd => `
                <div class="cmd">
                    <code>${cmd.cmd}</code>
                    <p>${cmd.desc}</p>
                </div>
            `).join('')}
        </section>
    `;
}

function renderPurchase() {
    const c = content.purchase;
    app.innerHTML = `
        <nav class="navbar">
            <span class="brand"><i class="fa-solid fa-shield-halved"></i> Lunyx</span>
            <div class="links">
                <a href="#home" onclick="navigate('home')">Home</a>
                <a href="#docs" onclick="navigate('docs')">Docs</a>
                <a href="#purchase" onclick="navigate('purchase')">Purchase</a>
                <a href="#tos" onclick="navigate('tos')">TOS</a>
            </div>
        </nav>
        <section class="page">
            <h1>${c.title}</h1>
            <div class="plans">
                ${c.plans.map(p => `
                    <div class="plan">
                        <h3>${p.name}</h3>
                        <p class="price">${p.price}</p>
                        ${p.features.map(f => `<p>${f}</p>`).join('')}
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

function renderTos() {
    const c = content.tos;
    app.innerHTML = `
        <nav class="navbar">
            <span class="brand"><i class="fa-solid fa-shield-halved"></i> Lunyx</span>
            <div class="links">
                <a href="#home" onclick="navigate('home')">Home</a>
                <a href="#docs" onclick="navigate('docs')">Docs</a>
                <a href="#purchase" onclick="navigate('purchase')">Purchase</a>
                <a href="#tos" onclick="navigate('tos')">TOS</a>
            </div>
        </nav>
        <section class="page">
            <h1>${c.title}</h1>
            ${c.sections.map(s => `
                <h3>${s.heading}</h3>
                <p>${s.text}</p>
            `).join('')}
        </section>
    `;
}

window.navigate = function(page) {
    renderPage(page);
};

renderPage('home');
