/* Liya Elias Global Interaction Script 
   Powered by GSAP & ScrollTrigger
*/

gsap.registerPlugin(ScrollTrigger);

// 1. MANIFESTATION GATE LOGIC (The Welcome Note)
const welcomeGate = document.getElementById('welcome-gate');
const enterBtn = document.getElementById('enter-manifestation');

function initManifestationGate() {
    // Check if the user has seen the gate already
    const hasSeenGate = localStorage.getItem('liya_manifested_seen');

    if (hasSeenGate) {
        // If they've seen it, hide it immediately
        welcomeGate.classList.add('hidden-gate');
        startMainExperience();
    } else {
        // First time entry
        gsap.from("#welcome-gate .max-w-2xl", {
            opacity: 0,
            y: 30,
            duration: 2,
            ease: "power3.out",
            delay: 0.5
        });
    }
}

function startMainExperience() {
    gsap.to("body", { 
        opacity: 1, 
        duration: 1.2, 
        ease: "power2.out" 
    });
}

if (enterBtn) {
    enterBtn.addEventListener('click', () => {
        // Set local storage so it won't show again
        localStorage.setItem('liya_manifest_seen', 'true');
        
        // Animate out
        gsap.to(welcomeGate, {
            opacity: 0,
            scale: 1.1,
            duration: 1.5,
            ease: "power4.inOut",
            onComplete: () => {
                welcomeGate.classList.add('hidden-gate');
                startMainExperience();
            }
        });
    });
}


// 2. MENU TOGGLE LOGIC
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const overlay = document.getElementById('mobile-menu-overlay');

function openMenu() {
    if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden');
    }
    setTimeout(() => overlay.classList.add('open'), 10);
    gsap.fromTo(".menu-link-item", 
        { y: 80, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, delay: 0.4, ease: "power4.out" }
    );
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => overlay.classList.add('hidden'), 800);
}

if(menuBtn) menuBtn.addEventListener('click', openMenu);
if(closeBtn) closeBtn.addEventListener('click', closeMenu);


// 3. PAGE LOAD & GLOBAL REVEALS
window.addEventListener("load", () => {
    initManifestationGate();
});

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

gsap.utils.toArray(".draw-line").forEach(line => {
    gsap.to(line, {
        width: "100%",
        duration: 2,
        ease: "expo.inOut",
        scrollTrigger: {
            trigger: line,
            start: "top 95%"
        }
    });
});
