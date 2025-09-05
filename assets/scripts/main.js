// Mobile menu
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');

function toggleMenu(force) {
    const willOpen = typeof force === 'boolean' ? force : !mobileMenu.classList.contains('active');
    mobileMenu.classList.toggle('active', willOpen);
    burger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
}

// Open/Close by click on a burger
burger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close when clicking on the menu link
mobileMenu.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'A') toggleMenu(false);
});

// Close when clicking outside the menu
document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('active')) return;
    const clickInsideMenu = mobileMenu.contains(e.target) || burger.contains(e.target);
    if (!clickInsideMenu) toggleMenu(false);
});

// Close by ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMenu(false);
    }
});

// Smooth occurrence of sections with scroll (IntersectionObserver)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fadeEls = document.querySelectorAll('.fade-in');

if (prefersReducedMotion) {
    fadeEls.forEach(el => el.classList.add('visible'));
} else {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {root: null, rootMargin: '0px 0px -50px 0px', threshold: 0});

    fadeEls.forEach(el => io.observe(el));
}

// Smooth scroll to anchors (без смены фокуса)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id.length <= 1) return;
        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        // Close a mobile menu when crossing
        toggleMenu(false);

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start'});
    });
});

// The logic of opening/closing the modal window of the contact form
const openModalBtn = document.querySelector('.contact-btn');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('modal');

openModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


