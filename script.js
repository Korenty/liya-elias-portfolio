gsap.registerPlugin(ScrollTrigger);

// 1. MENU TOGGLE LOGIC
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const overlay = document.getElementById('mobile-menu-overlay');

function openMenu() {
    overlay.classList.remove('hidden');
    // Small delay to let 'hidden' disappear before animating transform
    setTimeout(() => {
        overlay.classList.add('open');
    }, 10);

    gsap.fromTo(".menu-link-item", 
        { y: 50, opacity: 0 }, 
        {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out"
        }
    );
}

function closeMenu() {
    overlay.classList.remove('open');
    // Wait for the 0.8s CSS transition to finish before hiding completely
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 800);
}

if(menuBtn) menuBtn.addEventListener('click', openMenu);
if(closeBtn) closeBtn.addEventListener('click', closeMenu);

// 2. PAGE LOAD FADE
window.addEventListener("load", () => {
    gsap.to("body", { opacity: 1, duration: 0.8, ease: "power2.out" });
});

// 3. GLOBAL SCROLL ANIMATIONS
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
