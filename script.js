/* Liya Elias Global Interaction Script 
    Powered by GSAP & ScrollTrigger
*/

gsap.registerPlugin(ScrollTrigger);

// 1. MENU TOGGLE LOGIC (Unified System)
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const overlay = document.getElementById('mobile-menu-overlay');

function openMenu() {
    // Remove the hidden class to make element exist
    if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden');
    }
    
    // Slight delay to allow display change before transition
    setTimeout(() => {
        overlay.classList.add('open');
    }, 10);

    // Staggered text entrance for links
    gsap.fromTo(".menu-link-item", 
        { y: 80, opacity: 0 }, 
        {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            delay: 0.4,
            ease: "power4.out"
        }
    );

    // Lock body scroll when menu is open
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    overlay.classList.remove('open');
    
    // Unlock body scroll
    document.body.style.overflow = '';

    // Wait for the 0.8s CSS transition to finish before hiding completely
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 800);
}

// Event Listeners
if(menuBtn) menuBtn.addEventListener('click', openMenu);
if(closeBtn) closeBtn.addEventListener('click', closeMenu);

// Close menu on link click (useful for one-page navigation)
document.querySelectorAll('.menu-link-item').forEach(link => {
    link.addEventListener('click', closeMenu);
});


// 2. PAGE LOAD EXPERIENCE
window.addEventListener("load", () => {
    gsap.to("body", { 
        opacity: 1, 
        duration: 1.2, 
        ease: "power2.out" 
    });
});


// 3. GLOBAL SCROLL REVEALS
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

// Parallax effect for luxury media containers
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

// Sophisticated line drawing effect
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
