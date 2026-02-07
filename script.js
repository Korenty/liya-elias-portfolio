gsap.registerPlugin(ScrollTrigger);

// 1. MENU TOGGLE LOGIC
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const overlay = document.getElementById('mobile-menu-overlay');

function toggleMenu() {
    overlay.classList.toggle('open');
    // Animate links when opening
    if (overlay.classList.contains('open')) {
        gsap.from(".menu-link-item", {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out"
        });
    }
}

if(menuBtn) menuBtn.addEventListener('click', toggleMenu);
if(closeBtn) closeBtn.addEventListener('click', toggleMenu);

// 2. PAGE LOAD FADE
window.addEventListener("load", () => {
    gsap.to("body", { opacity: 1, duration: 0.8, ease: "power2.out" });
});

// 3. GLOBAL SCROLL ANIMATIONS
// Reveal Text
gsap.utils.toArray(".reveal-text").forEach(el => {
    gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
        }
    });
});

// Parallax Images
gsap.utils.toArray(".parallax-media").forEach(media => {
    gsap.to(media, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: media.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// Line Drawing
gsap.utils.toArray(".draw-line").forEach(line => {
    gsap.from(line, {
        width: "0%",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
            trigger: line,
            start: "top 90%"
        }
    });
});
