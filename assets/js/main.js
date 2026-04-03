import {
  initLogoParallax,
  initFooterAnimations,
  initHeroMouseParallax,
  initSectionAnimations,
  initDiscoverSectionPerformance,
} from './animations.js';
import { initFeaturesCarousel } from './features-carousel.js?v=20260403e';
import { initDownloadSection } from './download-section.js';
import { getCurrentLanguage, getNextLanguage, setLanguage } from './i18n.js';
import { applySymbolFallback, applyArrowFallback } from './symbol-fallback.js?v=20260403f';

function initPreloader(lenis) {
  const preloader = document.getElementById('preloader');
  const pLogo = document.getElementById('preloader-logo');
  const pName = document.getElementById('preloader-name');
  const pContent = document.querySelector('.preloader-content');

  if (!preloader || !pLogo || !pName || !pContent) {
    lenis.start();
    initSectionAnimations();
    initLogoParallax();
    initFooterAnimations();
    initHeroMouseParallax();
    initDiscoverSectionPerformance();
    initFeaturesCarousel();
    initDownloadSection();
    return;
  }

  const isResponsivePreloader = window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(pointer: coarse)').matches;

  if (isResponsivePreloader) {
    lenis.stop();
    pName.style.display = 'none';
    gsap.set(pLogo, { opacity: 0 });

    const mobileIntroTL = gsap.timeline({
      onComplete: () => {
        lenis.start();
        preloader.style.pointerEvents = 'none';
        initSectionAnimations();
        initLogoParallax();
        initFooterAnimations();
        initHeroMouseParallax();
        initDiscoverSectionPerformance();
        initFeaturesCarousel();
        initDownloadSection();
      },
    });

    mobileIntroTL
      .to(pLogo, { opacity: 1, duration: 0.75, ease: 'power2.out' })
      .to({}, { duration: 0.35 })
      .to(preloader, { yPercent: -100, duration: 0.95, ease: 'power3.inOut' });

    return;
  }

  // Split the brand name into per-letter spans for staggered reveal.
  const rawText = pName.textContent.trim();
  pName.innerHTML = rawText
    .split('')
    .map((ch) => `<span class="char" style="display:inline-block;will-change:transform,opacity,clip-path;">${ch}</span>`)
    .join('');

  const chars = [...pName.querySelectorAll('.char')];

  lenis.stop();
  gsap.set(pName, { yPercent: -50, opacity: 1 });
  gsap.set(chars, { opacity: 0, clipPath: 'inset(0 0 110% 0)', y: 12 });

  const introTL = gsap.timeline({
    onComplete: () => {
      lenis.start();
      preloader.style.pointerEvents = 'none';
      initSectionAnimations();
      initLogoParallax();
      initFooterAnimations();
      initHeroMouseParallax();
      initDiscoverSectionPerformance();
      initFeaturesCarousel();
      initDownloadSection();
    },
  });

  introTL
    .to(pLogo, { opacity: 1, duration: 0.75, ease: 'power2.out' })
    .to({}, { duration: 0.45 })
    .to(pContent, {
      x: () => -(pName.offsetWidth / 2),
      duration: 0.9,
      ease: 'power3.inOut',
    })
    .fromTo(
      pName,
      { x: () => -(pLogo.offsetWidth / 2 + pName.offsetWidth / 2) },
      { x: 0, duration: 0.9, ease: 'power3.inOut' },
      '<',
    )
    .to(
      chars,
      {
        opacity: 1,
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 0.55,
        ease: 'power2.out',
        stagger: { each: 0.045, from: 'end' },
      },
      '<',
    )
    .to({}, { duration: 0.5 })
    .to(preloader, { yPercent: -100, duration: 1, ease: 'power3.inOut' });
}

function initHeadbar(lenis) {
  const headbar = document.getElementById('headbar');
  if (!headbar) return;

  const heroHeight = window.innerHeight;

  lenis.on('scroll', ({ scroll, direction }) => {
    if (scroll <= heroHeight * 0.15) {
      headbar.classList.remove('hidden');
    } else if (direction === 1) {
      headbar.classList.add('hidden');
    } else if (direction === -1) {
      headbar.classList.remove('hidden');
    }
  });
}

function initLanguageToggle() {
  const langToggle = document.getElementById('lang-toggle');
  if (!langToggle) return;

  setLanguage(getCurrentLanguage());
  applySymbolFallback();
  applyArrowFallback();

  langToggle.addEventListener('click', () => {
    setLanguage(getNextLanguage());
    applySymbolFallback();
    applyArrowFallback();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.on('scroll', ScrollTrigger.update);

  initHeadbar(lenis);
  initLanguageToggle();
  initPreloader(lenis);
});
