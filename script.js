/* Liya Elias Global Interaction Script 
    Powered by GSAP & ScrollTrigger
*/

gsap.registerPlugin(ScrollTrigger);

// 0. MANIFESTATION PORTAL LOGIC (One-time Welcome Note)
document.addEventListener("DOMContentLoaded", () => {
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const enterBtn = document.getElementById('enter-manifestation');

    // Check if she has seen this world before
    if (!localStorage.getItem('liya_manifestation_seen')) {
        welcomeOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Keep scroll locked
    } else {
        // If she's seen it, reveal the site normally immediately
        gsap.to("body", { opacity: 1, duration: 1.2 });
    }

    if(enterBtn) {
        enterBtn.addEventListener('click', () => {
            // Save to browser memory so it doesn't repeat
            localStorage.setItem('liya_manifestation_seen', 'true');
            
            // Magical exit animation
            welcomeOverlay.classList.add('welcome-hidden');
            
            // Restore scroll and reveal the legacy site
            document.body.style.overflow = '';
            gsap.to("body", { 
                opacity: 1, 
                duration: 1.5,
                onComplete: () => {
                    welcomeOverlay.remove(); // Remove overlay from DOM for performance
                }
            });
        });
    }
});

// 1. MENU TOGGLE LOGIC
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const overlay = document.getElementById('mobile-menu-overlay');

function openMenu() {
    if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden');
    }
    setTimeout(() => { overlay.classList.add('open'); }, 10);
    gsap.fromTo(".menu-link-item", { y: 80, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1, delay: 0.4, ease: "power4.out" });
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { overlay.classList.add('hidden'); }, 800);
}

if(menuBtn) menuBtn.addEventListener('click', openMenu);
if(closeBtn) closeBtn.addEventListener('click', closeMenu);

// 2. GLOBAL SCROLL REVEALS
gsap.utils.toArray(".reveal-text").forEach(el => {
    gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });
});

// Parallax for containers
gsap.utils.toArray(".parallax-media").forEach(media => {
    gsap.to(media, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
            trigger: media.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// Line drawing effect
gsap.utils.toArray(".draw-line").forEach(line => {
    gsap.to(line, {
        width: "100%",
        duration: 2,
        ease: "expo.inOut",
        scrollTrigger: { trigger: line, start: "top 95%" }
    });
});
