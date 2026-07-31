document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initCarousel();
    initMessageForm();
});

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.card').forEach(card => observer.observe(card));
    document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
}

function initCarousel() {
    const quotes = document.querySelectorAll('.quote');
    const dotsContainer = document.querySelector('.carousel-dots');
    let current = 0;
    let interval;

    quotes.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        quotes[current].classList.remove('active');
        document.querySelectorAll('.dot')[current].classList.remove('active');
        current = index;
        quotes[current].classList.add('active');
        document.querySelectorAll('.dot')[current].classList.add('active');
        resetInterval();
    }

    function next() {
        goTo((current + 1) % quotes.length);
    }

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(next, 5000);
    }

    resetInterval();
}

function initMessageForm() {
    const btn = document.getElementById('btn-enviar');
    const textarea = document.getElementById('mensagem');
    const confirmacao = document.getElementById('confirmacao');

    btn.addEventListener('click', () => {
        if (textarea.value.trim() === '') {
            textarea.style.borderColor = '#E57373';
            textarea.setAttribute('placeholder', 'Escreva algo especial para seus avós...');
            setTimeout(() => {
                textarea.style.borderColor = '#eee';
            }, 2000);
            return;
        }

        btn.textContent = 'Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            confirmacao.classList.remove('hidden');
            btn.textContent = 'Enviado! ❤️';
            textarea.value = '';
            textarea.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Enviar com ❤️';
                btn.disabled = false;
                textarea.disabled = false;
                confirmacao.classList.add('hidden');
            }, 4000);
        }, 1000);
    });
}
