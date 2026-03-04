/* ─────────────────────────────────────────────────────────────────
   LIYA ELIAS  ·  INTERACTION SYSTEM  ·  v4.0
   "Precision is the highest form of beauty."
   ───────────────────────────────────────────────────────────────── */

'use strict';

/* ══ GUARD: graceful degradation if GSAP CDN blocked ══ */
if (typeof gsap === 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#preloader').forEach(el => {
      setTimeout(() => { el.style.display = 'none'; }, 100);
    });
  });
} else {
  gsap.registerPlugin(ScrollTrigger);
  init();
}

function init() {

/* ── 1. PRELOADER ─────────────────────────────────────────────── */
(function() {
  const loader  = document.getElementById('preloader');
  const fill    = document.querySelector('.pre-fill');
  const pct     = document.querySelector('.pre-pct');

  if (!loader) return;

  const proxy = { val: 0 };
  const tl = gsap.timeline({
    onComplete() {
      gsap.to(loader, {
        y: '-100%', duration: 1.0, ease: 'power4.in',
        onComplete() { loader.style.display = 'none'; }
      });
      gsap.to(document.body, { opacity: 1, duration: 0.5, delay: 0.15 });
      animateHero();
    }
  });

  tl.to(proxy, {
    val: 100,
    duration: 2.0,
    ease: 'power2.inOut',
    onUpdate() {
      const v = Math.round(proxy.val);
      if (fill) fill.style.width = v + '%';
      if (pct)  pct.textContent  = v + '%';
    }
  });
})();

/* ── 2. CUSTOM CURSOR ─────────────────────────────────────────── */
(function() {
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  const txt  = document.getElementById('cur-text');
  if (!dot || !ring) return;

  const CURSOR_SMOOTH = 0.12; // ring follow speed (0 = instant, lower = smoother)
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  gsap.ticker.add(() => {
    rx += (mx - rx) * CURSOR_SMOOTH;
    ry += (my - ry) * CURSOR_SMOOTH;
    gsap.set(dot,  { x: mx, y: my });
    gsap.set(ring, { x: rx, y: ry });
    if (txt) gsap.set(txt, { x: mx, y: my });
  });

  document.addEventListener('mousedown', () => document.body.classList.add('is-pressing'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('is-pressing'));
  document.addEventListener('mouseleave',() => gsap.to([dot, ring], { opacity: 0, duration: 0.3 }));
  document.addEventListener('mouseenter',() => gsap.to([dot, ring], { opacity: 1, duration: 0.3 }));

  /* Hover detection */
  const hoverEls = document.querySelectorAll('a, button, [data-cursor], .pg-item, .rec-item, .world-panel');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('is-hovering');
      const label = el.getAttribute('data-cursor');
      if (label && txt) { txt.textContent = label; document.body.classList.add('is-viewing'); }
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('is-hovering', 'is-viewing');
    });
  });
})();

/* ── 3. NAVIGATION / MENU ─────────────────────────────────────── */
(function() {
  const menuBtn   = document.getElementById('nav-menu-btn');
  const closeBtn  = document.getElementById('menu-close-btn');
  const menu      = document.getElementById('site-menu');
  if (!menu) return;

  function openMenu() {
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
    /* Stagger link items */
    const links = menu.querySelectorAll('.menu-link-inner');
    links.forEach((link, i) => {
      link.style.transitionDelay = (0.08 + i * 0.06) + 's';
    });
    const bg = menu.querySelector('.menu-bg-photo');
    if (bg) setTimeout(() => { bg.style.opacity = '1'; }, 300);
  }

  function closeMenu() {
    const links = menu.querySelectorAll('.menu-link-inner');
    links.forEach(link => { link.style.transitionDelay = '0s'; });
    menu.classList.remove('open');
    const bg = menu.querySelector('.menu-bg-photo');
    if (bg) bg.style.opacity = '0';
    setTimeout(() => { document.body.style.overflow = ''; }, 900);
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
})();

/* ── 4. SCROLL PROGRESS ───────────────────────────────────────── */
(function() {
  const bar = document.getElementById('scroll-bar');
  if (!bar) return;
  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate(self) { bar.style.width = (self.progress * 100) + '%'; }
  });
})();

/* ── 5. HERO ENTRANCE ─────────────────────────────────────────── */
function animateHero() {
  const eyebrow    = document.querySelector('.hero-eyebrow');
  const nameInner  = document.querySelector('.hero-name-inner');
  const descriptor = document.querySelector('.hero-descriptor');
  const scrollHint = document.querySelector('.hero-scroll-hint');
  const topRight   = document.querySelector('.hero-top-right');
  const heroMedia  = document.querySelector('.hero-chapter');

  if (heroMedia) heroMedia.classList.add('loaded');

  const tl = gsap.timeline({ delay: 0.05 });

  if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0);
  if (nameInner) tl.to(nameInner, { y: '0%', duration: 1.6, ease: 'power4.out' }, 0.15);
  if (descriptor) tl.to(descriptor, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.5);
  if (scrollHint) tl.to(scrollHint, { opacity: 1, duration: 1, ease: 'power3.out' }, 0.7);
  if (topRight)   tl.to(topRight,   { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.3);
}

/* ── 6. HERO PARALLAX ─────────────────────────────────────────── */
(function() {
  const heroMedia = document.querySelector('.hero-media img, .hero-media video');
  if (!heroMedia) return;
  gsap.to(heroMedia, {
    y: '18%',
    ease: 'none',
    scrollTrigger: { trigger: '.hero-chapter', start: 'top top', end: 'bottom top', scrub: 1.5 }
  });
})();

/* ── 7. STATEMENT REVEAL ──────────────────────────────────────── */
(function() {
  const kicker = document.querySelector('.statement-kicker');
  const lines  = document.querySelectorAll('.statement-line-inner');
  const sub    = document.querySelector('.statement-sub');
  if (!lines.length) return;

  const tl = gsap.timeline({
    scrollTrigger: { trigger: '.statement-chapter', start: 'top 65%', once: true }
  });

  if (kicker) tl.to(kicker, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0);
  lines.forEach((line, i) => {
    tl.add(() => line.classList.add('revealed'), i * 0.18 + 0.1);
  });
  if (sub) tl.to(sub, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.5);
})();

/* ── 8. WORLDS HORIZONTAL SCROLL ─────────────────────────────── */
(function() {
  const wrapper = document.querySelector('.worlds-wrapper');
  const track   = document.querySelector('.worlds-track');
  const panels  = document.querySelectorAll('.world-panel');
  const dots    = document.querySelectorAll('.worlds-dot');
  if (!wrapper || !panels.length) return;

  const numPanels = panels.length;
  const PANEL_HEIGHT_VH = 100; // each panel occupies one full viewport height of scroll

  /* Set wrapper height to create scroll space */
  wrapper.style.height = (numPanels * PANEL_HEIGHT_VH) + 'vh';

  gsap.to(track, {
    x: () => -(numPanels - 1) * window.innerWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: wrapper,
      pin: '.worlds-sticky',
      scrub: 1,
      start: 'top top',
      end: () => '+=' + (numPanels - 1) * window.innerWidth,
      onUpdate(self) {
        const idx = Math.round(self.progress * (numPanels - 1));
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }
    }
  });
})();

/* ── 9. ORIGIN SECTION ────────────────────────────────────────── */
(function() {
  const eyebrow  = document.querySelector('.origin-eyebrow');
  const headLines= document.querySelectorAll('.origin-headline .statement-line-inner');
  const body     = document.querySelector('.origin-body');
  const stats    = document.querySelector('.origin-stats');
  const photo    = document.querySelector('.origin-photo');
  if (!eyebrow && !photo) return;

  const st = { trigger: '.origin-chapter', start: 'top 70%', once: true };

  if (eyebrow) gsap.to(eyebrow, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: st });
  headLines.forEach((l, i) => {
    gsap.to(l, { y: '0%', duration: 1.4, ease: 'power4.out', delay: i * 0.15 + 0.1, scrollTrigger: st });
  });
  if (body)  gsap.to(body,  { opacity: 1, y: 0, duration: 1,   ease: 'power3.out', delay: 0.4, scrollTrigger: st });
  if (stats) gsap.to(stats, { opacity: 1, y: 0, duration: 1,   ease: 'power3.out', delay: 0.7, scrollTrigger: st });

  if (photo) {
    const img = photo.querySelector('img');
    if (img) {
      gsap.from(img, {
        scale: 1.12, duration: 1.8, ease: 'power3.out',
        scrollTrigger: { trigger: photo, start: 'top 75%', once: true }
      });
    }
  }
})();

/* ── 10. VIDEO CHAPTER ────────────────────────────────────────── */
(function() {
  const geo   = document.querySelector('.vot-geo');
  const lines = document.querySelectorAll('.vot-line');
  if (!lines.length) return;

  const tl = gsap.timeline({
    scrollTrigger: { trigger: '.video-chapter', start: 'top 60%', once: true }
  });

  if (geo) tl.to(geo, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0);
  lines.forEach((l, i) => {
    tl.to(l, { y: '0%', duration: 1.4, ease: 'power4.out' }, i * 0.2 + 0.1);
  });
})();

/* ── 11. RECOGNITION ITEMS ────────────────────────────────────── */
(function() {
  const title = document.querySelector('.rec-title');
  const items = document.querySelectorAll('.rec-item');
  if (!items.length) return;

  if (title) {
    gsap.to(title, {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: title, start: 'top 80%', once: true }
    });
  }

  items.forEach((item, i) => {
    gsap.to(item, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      delay: i * 0.1,
      scrollTrigger: { trigger: item, start: 'top 85%', once: true }
    });
  });
})();

/* ── 12. PHOTO GRID REVEALS ───────────────────────────────────── */
(function() {
  const title = document.querySelector('.grid-title');
  const items = document.querySelectorAll('.pg-item');
  if (!items.length) return;

  if (title) {
    gsap.to(title, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.grid-chapter', start: 'top 75%', once: true }
    });
  }

  items.forEach((item, i) => {
    const img = item.querySelector('img');
    gsap.fromTo(img,
      { scale: 1.14 },
      {
        scale: 1,
        duration: 1.6,
        ease: 'power3.out',
        delay: (i % 3) * 0.12,
        scrollTrigger: { trigger: item, start: 'top 85%', once: true }
      }
    );
    gsap.fromTo(item,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: (i % 3) * 0.12,
        scrollTrigger: { trigger: item, start: 'top 85%', once: true }
      }
    );
  });
})();

/* ── 13. FINALE CHAPTER ───────────────────────────────────────── */
(function() {
  const eyebrow  = document.querySelector('.finale-eyebrow');
  const lines    = document.querySelectorAll('.finale-line-inner');
  const cta      = document.querySelector('.finale-cta');
  const bg       = document.querySelector('.finale-bg');
  if (!lines.length) return;

  const tl = gsap.timeline({
    scrollTrigger: { trigger: '.finale-chapter', start: 'top 65%', once: true }
  });

  if (bg) tl.add(() => { bg.style.opacity = '1'; }, 0);
  if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.2);
  lines.forEach((l, i) => tl.add(() => l.classList.add('revealed'), i * 0.2 + 0.3));
  if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.8);
})();

/* ── 14. ANIMATED COUNTERS ────────────────────────────────────── */
(function() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target  = parseFloat(el.getAttribute('data-count'));
    const suffix  = el.getAttribute('data-suffix') || '';
    const prefix  = el.getAttribute('data-prefix') || '';
    const proxy   = { val: 0 };

    gsap.to(proxy, {
      val: target,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate() {
        el.textContent = prefix + Math.round(proxy.val) + suffix;
      }
    });
  });
})();

/* ── 15. MARQUEE ──────────────────────────────────────────────── */
(function() {
  document.querySelectorAll('.marquee-track').forEach(track => {
    const clone = track.cloneNode(true);
    track.parentNode.appendChild(clone);
  });
})();

/* ── 16. IMAGE REVEALS (generic) ─────────────────────────────── */
(function() {
  document.querySelectorAll('.img-reveal-wrap').forEach(wrap => {
    ScrollTrigger.create({
      trigger: wrap,
      start: 'top 82%',
      once: true,
      onEnter() { wrap.classList.add('revealed'); }
    });
  });
})();

/* ── 17. INNER PAGE PARALLAX ──────────────────────────────────── */
(function() {
  const ihMedia = document.querySelector('.inner-hero .ih-media img, .inner-hero .ih-media video');
  if (!ihMedia) return;
  gsap.to(ihMedia, {
    y: '20%',
    ease: 'none',
    scrollTrigger: { trigger: '.inner-hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
  });
})();

/* ── 18. LIGHTBOX ─────────────────────────────────────────────── */
(function() {
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lightbox-img');
  const lbClose = document.querySelector('.lb-close');
  if (!lb) return;

  document.querySelectorAll('[data-lightbox]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const src = trigger.getAttribute('data-lightbox');
      if (lbImg) { lbImg.src = src; }
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLB() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (lbClose) lbClose.addEventListener('click', closeLB);
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
})();

/* ── 19. DISCLAIMER OVERLAY ───────────────────────────────────── */
(function() {
  const overlay = document.getElementById('disclaimer-overlay');
  const trigger = document.getElementById('copyright-trigger');
  if (!overlay || !trigger) return;
  trigger.addEventListener('click', () => {
    overlay.style.display = 'flex';
    overlay.addEventListener('click', () => { overlay.style.display = 'none'; }, { once: true });
  });
})();

/* ── 20. MAGNETIC BUTTONS ─────────────────────────────────────── */
(function() {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      gsap.to(btn, { x: dx * 0.35, y: dy * 0.35, duration: 0.5, ease: 'power3.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1.2, 0.5)' });
    });
  });
})();

} /* end init() */
