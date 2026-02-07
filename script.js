// REGISTER GSAP PLUGINS
gsap.registerPlugin(ScrollTrigger);

// PAGE TRANSITION LOAD (Fade In)
window.addEventListener("load", () => {
    gsap.to("body", { opacity: 1, duration: 0.8, ease: "power2.out" });
});

// GLOBAL ANIMATIONS
function initAnimations() {
    
    // 1. Reveal Headlines
    gsap.utils.toArray(".reveal-text").forEach(el => {
        gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            }
        });
    });

    // 2. Parallax Media
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
    
    // 3. Line Separator Drawing
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
}

// INITIALIZE
initAnimations();
