export function initLogoParallax() {
  // The hero-section scrolls up at 100vh over its own height.
  // Pushing the logo DOWN by 50vh means its net upward travel = 50vh = half speed.
  gsap.to('.hero-logo-wrapper', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    y: window.innerHeight * 0.5,   // counter-movement: DOWN by 50vh -> rises 2x slower
    ease: 'none',
  });
}

export function initFooterAnimations() {
  // Set all footer text elements invisible initially
  const allEls = [
    '.footer-studio', '.footer-ubs', '.footer-location',
    '.footer-legal', '.footer-wordmark',
    '.footer-col-title', '.footer-link',
    '.footer-cta'
  ];
  gsap.set(allEls, { clipPath: 'inset(0 0 100% 0)', y: 18, opacity: 0 });

  // Single timeline - ScrollTrigger controls play/reverse
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  });

  tl.to('.footer-studio', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.7 }, 0)
    .to('.footer-ubs', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.7 }, 0.08)
    .to('.footer-location', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.7 }, 0.16)
    .to('.footer-legal', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.7 }, 0.22)
    .to('.footer-wordmark', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.8 }, 0.12);

  // Link columns staggered
  document.querySelectorAll('.footer-link-col').forEach((col, ci) => {
    const base = 0.1 + ci * 0.1;
    tl.to(col.querySelector('.footer-col-title'), { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.6 }, base);
    col.querySelectorAll('.footer-link').forEach((link, li) => {
      tl.to(link, { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.5 }, base + 0.1 + li * 0.07);
    });
  });

  tl.to('.footer-cta', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.8 }, 0.3);

  // One ScrollTrigger drives the whole timeline
  ScrollTrigger.create({
    trigger: '#footer',
    start: 'top 80%',
    onEnter: () => tl.play(),
    onLeaveBack: () => tl.reverse(),
    onEnterBack: () => tl.play(),
  });
}

export function initHeroMouseParallax() {
  const logo = document.querySelector('.hero-3d-logo');
  const hero = document.querySelector('.hero-section');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!logo || !hero || prefersReducedMotion || !hasFinePointer) return;

  // quickTo for buttery smooth interpolation
  const setX = gsap.quickTo(logo, 'x', { duration: 1.2, ease: 'power3.out' });
  const setY = gsap.quickTo(logo, 'y', { duration: 1.2, ease: 'power3.out' });

  const STRENGTH = 28; // max px offset
  let nextX = 0;
  let nextY = 0;
  let rafPending = false;

  function flushPointerFrame() {
    rafPending = false;
    setX(nextX);
    setY(nextY);
  }

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    // Normalise to [-1, 1]
    const nx = (e.clientX - rect.left) / rect.width * 2 - 1;
    const ny = (e.clientY - rect.top) / rect.height * 2 - 1;
    nextX = nx * STRENGTH;
    nextY = ny * STRENGTH * 0.6;

    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(flushPointerFrame);
    }
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    setX(0);
    setY(0);
  }, { passive: true });
}

export function initDiscoverSectionPerformance() {
  const discoverSection = document.querySelector('.discover-section');
  const discoverVideo = document.querySelector('.discover-video');
  const grainLayer = document.querySelector('.video-grain-layer');

  if (!discoverSection) return;

  let isVisible = false;

  function setActiveState(active) {
    if (grainLayer) {
      grainLayer.style.animationPlayState = active ? 'running' : 'paused';
    }

    if (!discoverVideo) return;

    if (active) {
      const playPromise = discoverVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Ignore autoplay rejections from browser policies.
        });
      }
    } else {
      discoverVideo.pause();
    }
  }

  setActiveState(false);

  if ('IntersectionObserver' in window) {
    const discoverObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        setActiveState(isVisible && !document.hidden);
      },
      { threshold: 0.15 },
    );

    discoverObserver.observe(discoverSection);
  } else {
    isVisible = true;
    setActiveState(!document.hidden);
  }

  document.addEventListener('visibilitychange', () => {
    setActiveState(isVisible && !document.hidden);
  });
}

export function initSectionAnimations() {
  // Animate section titles
  gsap.utils.toArray('.section-title').forEach((title) => {
    // Skip features-title - it has its own animation
    if (title.classList.contains('features-title')) return;
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  // Discover grid columns
  gsap.from('.discover-left', {
    scrollTrigger: {
      trigger: '.discover-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    y: 50,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out',
  });

  gsap.from('.discover-right', {
    scrollTrigger: {
      trigger: '.discover-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    y: 50,
    opacity: 0,
    duration: 0.9,
    delay: 0.15,
    ease: 'power2.out',
  });

  // FAQ items stagger
  gsap.from('.faq-item', {
    scrollTrigger: {
      trigger: '.faq-list',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
  });
}
