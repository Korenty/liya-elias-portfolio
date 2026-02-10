/* Liya Elias Global Interaction Script 
    Powered by GSAP & ScrollTrigger
*/ 

gsap.registerPlugin(ScrollTrigger); 

// 1. MENU TOGGLE LOGIC (Unified System)
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const overlay = document.getElementById('mobile-menu-overlay'); 

function openMenu() {
    if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden');
    }
    
    setTimeout(() => {
        overlay.classList.add('open');
    }, 10); 

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

    document.body.style.overflow = 'hidden';
} 

function closeMenu() {
    if (overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = ''; 
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 800);
    }
} 

if(menuBtn) menuBtn.addEventListener('click', openMenu);
if(closeBtn) closeBtn.addEventListener('click', closeMenu); 

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

// 4. LEGAL DISCLAIMER SYSTEM
const legalTrigger = document.getElementById('copyright-trigger');
const legalOverlay = document.getElementById('disclaimer-overlay');

if (legalTrigger && legalOverlay) {
    legalTrigger.addEventListener('click', () => {
        // Force the display to flex first so it's animatable
        legalOverlay.style.display = 'flex';
        
        // Animate the entire overlay fade-in
        gsap.fromTo(legalOverlay, 
            { opacity: 0 }, 
            { 
                opacity: 1, 
                duration: 0.6, 
                ease: "power2.out" 
            }
        );

        // Animate the inner text container (scale & fade)
        const content = legalOverlay.querySelector('div');
        if (content) {
            gsap.fromTo(content, 
                { scale: 0.9, opacity: 0 },
                { 
                    scale: 1, 
                    opacity: 1, 
                    duration: 0.8, 
                    delay: 0.1, 
                    ease: "power4.out" 
                }
            );
        }
    });

    // Close functionality when clicking anywhere on the overlay
    legalOverlay.addEventListener('click', () => {
        gsap.to(legalOverlay, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                legalOverlay.style.display = 'none';
            }
        });
    });
}
