// SPA navigation loader with loading animation
const navLinks = document.querySelectorAll('.nav-link');
const pageContent = document.getElementById('page-content');
const homeContent = pageContent.innerHTML;

// Loader HTML (animated dots)
const loaderHTML = `<div class=\"loader\" style=\"display:flex;justify-content:center;align-items:center;height:200px;\">\n            <span class=\"dot\" style=\"width:16px;height:16px;margin:0 4px;border-radius:50%;background:var(--accent);display:inline-block;animation:dotPulse 1s infinite alternate;\"></span>\n            <span class=\"dot\" style=\"width:16px;height:16px;margin:0 4px;border-radius:50%;background:var(--accent);display:inline-block;animation:dotPulse 1s 0.2s infinite alternate;\"></span>\n            <span class=\"dot\" style=\"width:16px;height:16px;margin:0 4px;border-radius:50%;background:var(--accent);display:inline-block;animation:dotPulse 1s 0.4s infinite alternate;\"></span>\n        </div>`;

// Add keyframes for dotPulse
const style = document.createElement('style');
style.textContent = `@keyframes dotPulse { 0% { opacity: 0.5; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1.2); } }`;
document.head.appendChild(style);

function loadPage(page) {
    if (page === 'home') {
        pageContent.innerHTML = homeContent;
        return;
    }
    pageContent.innerHTML = loaderHTML;
    fetch(`${page}.html`)
        .then(res => res.text())
        .then(html => {
            pageContent.innerHTML = html;
        })
        .catch(() => {
            pageContent.innerHTML = '<p style="color:red;text-align:center;">Page failed to load.</p>';
        });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(nl => nl.classList.remove('active'));
        link.classList.add('active');
        const page = link.dataset.page;
        loadPage(page);
    });
});

// Typewriter animation for loading text
const typewriterPhrases = [
    "Crafting digital experiences.",
    "Building beautiful interfaces.",
    "Creating seamless interactions.",
    "Designing user-focused solutions."
];

function typewriterEffect(element, phrases, typingSpeed = 80, deletingSpeed = 40, pause = 2000) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        if (!isDeleting) {
            element.innerHTML = currentPhrase.slice(0, charIndex + 1) + '<span class="typewriter-cursor">|</span>';
            charIndex++;
            if (charIndex === currentPhrase.length) {
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, pause);
            } else {
                setTimeout(type, typingSpeed);
            }
        } else {
            element.innerHTML = currentPhrase.slice(0, charIndex - 1) + '<span class="typewriter-cursor">|</span>';
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(type, deletingSpeed);
            }
        }
    }
    type();
}

window.addEventListener('DOMContentLoaded', () => {
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        typewriterEffect(loadingText, typewriterPhrases);
    }
}); 