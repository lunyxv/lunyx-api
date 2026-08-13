document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    setTimeout(() => {
        intro.classList.add('done');
    }, 2000);

    let toastTimeout;
    function showToast(msg) {
        toastMessage.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2200);
    }

    document.querySelectorAll('a[data-toast]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const msg = link.getAttribute('data-toast');
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');
            showToast(msg);
            setTimeout(() => {
                if (target === '_blank') window.open(href, '_blank');
                else window.location.href = href;
            }, 2200);
        });
    });

    const spotlight = document.createElement('div');
    spotlight.className = 'mouse-spotlight';
    document.body.insertBefore(spotlight, document.body.firstChild);

    document.addEventListener('mousemove', (e) => {
        spotlight.style.setProperty('--mouse-x', e.clientX + 'px');
        spotlight.style.setProperty('--mouse-y', e.clientY + 'px');
    });
});
