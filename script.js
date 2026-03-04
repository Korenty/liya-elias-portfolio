/* ============================================================
   LIYA ELIAS — GLOBAL INTERACTION SCRIPT
   World-Class Luxury Brand Identity System v3.0
   Powered by GSAP & ScrollTrigger
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   1. PAGE LOADER
   ============================================================ */
(function initLoader() {
    const loader     = document.getElementById('page-loader');
    if (!loader) return;

    const logo       = loader.querySelector('.loader-logo');
    const fill       = loader.querySelector('.loader-bar-fill');
    const pct        = loader.querySelector('.loader-pct');
    const body       = document.body;

    // Prevent scroll during load
    body.style.overflow = 'hidden';

    const tl = gsap.timeline({
        onComplete: () => {
            body.style.overflow = '';
            gsap.to(loader, {
                yPercent: -100,
                duration: 1.0,
                ease: 'expo.inOut',
                onComplete: () => {
                    loader.style.display = 'none';
                    // Trigger entrance animations on main content
                    animateEntrance();
                }
            });
        }
    });

    tl.to(logo, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.2)
      .to(pct,  { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.4)
      .to(fill, { width: '100%', duration: 1.2, ease: 'power2.inOut',
          onUpdate: function () {
              if (pct) pct.textContent = Math.round(this.progress() * 100) + '%';
          }
      }, 0.5)
      .to(pct, { opacity: 0, duration: 0.3, delay: 0.1 });

})();

/* ============================================================
   2. ENTRANCE ANIMATIONS (runs after loader exits)
   ============================================================ */
function animateEntrance() {
    // Hero elements
    gsap.fromTo('.hero-entrance',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.18, duration: 1.4, ease: 'power3.out', delay: 0.1 }
    );

    // Reveal body
    gsap.to('body', { opacity: 1, duration: 0.01 });
}

/* ============================================================
   3. CUSTOM CURSOR
   ============================================================ */
(function initCursor() {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;

    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.08, ease: 'none' });
    });

    // Smooth ring follower
    gsap.ticker.add(() => {
        ringX += (mouseX - ringX) * 0.1;
        ringY += (mouseY - ringY) * 0.1;
        gsap.set(ring, { x: ringX, y: ringY });
    });

    // Hover states — links, buttons
    document.addEventListener('mouseover', e => {
        const target = e.target.closest('a, button, [data-cursor], .menu-link-item, .luxury-card, .expandable-media');
        if (target) document.body.classList.add('cursor-hover');
    });

    document.addEventListener('mouseout', e => {
        const target = e.target.closest('a, button, [data-cursor], .menu-link-item, .luxury-card, .expandable-media');
        if (target) document.body.classList.remove('cursor-hover');
    });

    document.addEventListener('mousedown', () => document.body.classList.add('cursor-press'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-press'));

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    });
    document.addEventListener('mouseenter', () => {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    });
})();

/* ============================================================
   4. SCROLL PROGRESS BAR
   ============================================================ */
(function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = Math.min(scrolled, 100) + '%';
    }, { passive: true });
})();

/* ============================================================
   5. MENU TOGGLE LOGIC
   ============================================================ */
const menuBtn  = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const overlay  = document.getElementById('mobile-menu-overlay');

function openMenu() {
    if (!overlay) return;
    if (overlay.classList.contains('hidden')) overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.add('open'), 10);

    gsap.fromTo('.menu-link-item',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 1.0, delay: 0.35, ease: 'power4.out' }
    );
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => overlay.classList.add('hidden'), 900);
}

if (menuBtn)  menuBtn.addEventListener('click', openMenu);
if (closeBtn) closeBtn.addEventListener('click', closeMenu);
document.querySelectorAll('.menu-link-item').forEach(link => link.addEventListener('click', closeMenu));

/* ============================================================
   6. PAGE LOAD (fallback if no loader)
   ============================================================ */
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (!loader) {
        gsap.to('body', { opacity: 1, duration: 1.2, ease: 'power2.out' });
        animateEntrance();
    }
});

/* ============================================================
   7. SCROLL REVEALS — GLOBAL
   ============================================================ */
// Text reveals
gsap.utils.toArray('.reveal-text').forEach(el => {
    gsap.to(el, {
        y: 0, opacity: 1, duration: 1.5, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
});

gsap.utils.toArray('.reveal-up').forEach((el, i) => {
    gsap.to(el, {
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        delay: i * 0.06
    });
});

gsap.utils.toArray('.reveal-scale').forEach(el => {
    gsap.to(el, {
        scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
});

// Line draw animation
gsap.utils.toArray('.draw-line').forEach(line => {
    gsap.to(line, {
        width: '100%', duration: 2.2, ease: 'expo.inOut',
        scrollTrigger: { trigger: line, start: 'top 95%' }
    });
});

/* ============================================================
   8. PARALLAX MEDIA (global)
   ============================================================ */
gsap.utils.toArray('.parallax-media').forEach(media => {
    gsap.to(media, {
        yPercent: 12, ease: 'none',
        scrollTrigger: {
            trigger: media.closest('section') || media.parentElement,
            start: 'top bottom', end: 'bottom top', scrub: true
        }
    });
});

/* ============================================================
   9. ANIMATED COUNTERS
   ============================================================ */
function initCounters() {
    document.querySelectorAll('[data-counter]').forEach(el => {
        const target  = parseFloat(el.getAttribute('data-counter'));
        const suffix  = el.getAttribute('data-suffix') || '';
        const prefix  = el.getAttribute('data-prefix') || '';
        const decimal = el.getAttribute('data-decimal') === 'true';

        gsap.fromTo({ val: 0 }, { val: target,
            duration: 2.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onUpdate: function () {
                el.textContent = prefix + (decimal ? this._targets[0].val.toFixed(1) : Math.round(this._targets[0].val)) + suffix;
            }
        });
    });
}
initCounters();

/* ============================================================
   10. MARQUEE SETUP (dynamic duplication)
   ============================================================ */
(function initMarquee() {
    document.querySelectorAll('.marquee-track').forEach(track => {
        // Clone the original content to ensure seamless looping
        const clone = track.cloneNode(true);
        track.parentElement.appendChild(clone);
    });
})();

/* ============================================================
   11. LEGAL DISCLAIMER SYSTEM
   ============================================================ */
const legalTrigger = document.getElementById('copyright-trigger');
const legalOverlay = document.getElementById('disclaimer-overlay');

if (legalTrigger && legalOverlay) {
    legalTrigger.addEventListener('click', () => {
        legalOverlay.style.display = 'flex';
        gsap.fromTo(legalOverlay, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
        const content = legalOverlay.querySelector('div');
        if (content) gsap.fromTo(content, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, delay: 0.1, ease: 'power4.out' });
    });

    legalOverlay.addEventListener('click', () => {
        gsap.to(legalOverlay, { opacity: 0, duration: 0.4, ease: 'power2.in',
            onComplete: () => { legalOverlay.style.display = 'none'; }
        });
    });
}

/* ============================================================
   12. MAGNETIC BUTTON EFFECT
   ============================================================ */
(function initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect   = btn.getBoundingClientRect();
            const cx     = rect.left + rect.width  / 2;
            const cy     = rect.top  + rect.height / 2;
            const dx     = (e.clientX - cx) * 0.35;
            const dy     = (e.clientY - cy) * 0.35;
            gsap.to(btn, { x: dx, y: dy, duration: 0.5, ease: 'power3.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
        });
    });
})();

/* ============================================================
   13. HERO TITLE PARALLAX (if present)
   ============================================================ */
(function initHeroParallax() {
    const heroTitle = document.getElementById('hero-title');
    if (!heroTitle) return;
    gsap.to(heroTitle, {
        y: -80, ease: 'none',
        scrollTrigger: { trigger: 'header', start: 'top top', end: 'bottom top', scrub: true }
    });
})();
