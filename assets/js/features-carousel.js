export function initFeaturesCarousel() {
  const cards = gsap.utils.toArray('.feature-card');
  const tabs = gsap.utils.toArray('.feature-tab');
  const carousel = document.querySelector('.features-carousel');
  const total = cards.length;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(hover: none)').matches;

  if (!carousel || total === 0 || tabs.length === 0) return;

  // --- Config ---
  const BEND = isCoarsePointer ? 280 : 400;  // curve intensity in px (higher = more arc + tilt)
  const SCROLL_SPEED = 12;  // drag sensitivity multiplier
  const SCROLL_EASE = 0.05; // lerp factor
  const PADDING = isCoarsePointer ? 72 : 120; // px gap between cards
  const DRAG_FACTOR = isCoarsePointer ? 0.1 : 0.025;

  // --- Sizing ---
  let containerW, containerH, cardW, cardH, itemW, totalW;

  function measure() {
    containerW = carousel.clientWidth;
    containerH = carousel.clientHeight;
    const sample = cards[0];
    cardW = sample.offsetWidth;
    cardH = sample.offsetHeight;
    itemW = cardW + PADDING;
    totalW = itemW * total;
  }
  measure();

  // --- Scroll state ---
  const scroll = { current: 0, target: 0, position: 0 };
  let isDown = false;
  let startX = 0;
  let rafId = null;
  let isVisible = true;

  // Each card tracks an "extra" offset for infinite wrapping
  const extras = new Array(total).fill(0);

  // --- Position + bend each card ---
  function layoutCards() {
    const halfW = containerW / 2;

    cards.forEach((card, i) => {
      // Base x: index * itemWidth - scroll - extra (wrapping)
      const baseX = itemW * i - scroll.current - extras[i];
      // Center the card strip: offset so that first card sits near center at scroll=0
      const x = baseX + halfW - cardW / 2;

      // Vertical bend (arc): cards further from center dip down
      let posY = (containerH - cardH) / 2; // vertical center
      let rot = 0;
      const centerX = x + cardW / 2 - halfW;

      if (BEND !== 0) {
        const B_abs = Math.abs(BEND);
        const H = halfW;
        const R = (H * H + B_abs * B_abs) / (2 * B_abs);
        const effectiveX = Math.min(Math.abs(centerX), H);
        const arc = R - Math.sqrt(Math.max(0, R * R - effectiveX * effectiveX));

        if (BEND > 0) {
          posY += arc;
          rot = Math.sign(centerX) * Math.asin(Math.min(effectiveX / R, 1)) * (180 / Math.PI);
        } else {
          posY -= arc;
          rot = -Math.sign(centerX) * Math.asin(Math.min(effectiveX / R, 1)) * (180 / Math.PI);
        }
      }

      card.style.transform = `translate3d(${x}px, ${posY}px, 0) rotate(${rot}deg)`;

      // Infinite wrapping - always check both directions
      const planeRight = x + cardW;
      const planeLeft = x;

      if (planeRight < -cardW) {
        extras[i] -= totalW;
      } else if (planeLeft > containerW + cardW) {
        extras[i] += totalW;
      }
    });
  }

  // --- Active card detection ---
  function updateActiveTab() {
    let idx = Math.round(scroll.current / itemW) % total;
    if (idx < 0) idx += total;
    tabs.forEach((tab, i) => tab.classList.toggle('active', i === idx));
  }

  // --- Snap to nearest card ---
  function snapToNearest() {
    const idx = Math.round(scroll.target / itemW);
    setTarget(idx * itemW);
  }

  const debouncedSnap = debounce(snapToNearest, 350);

  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }

  // --- Animation loop ---
  function update() {
    rafId = null;
    if (!isVisible) return;

    scroll.current += (scroll.target - scroll.current) * SCROLL_EASE;
    if (Math.abs(scroll.target - scroll.current) < 0.05) {
      scroll.current = scroll.target;
    }

    layoutCards();
    updateActiveTab();

    if (isDown || Math.abs(scroll.target - scroll.current) > 0.1) {
      queueUpdate();
    }
  }

  function queueUpdate() {
    if (!isVisible || rafId !== null) return;
    rafId = requestAnimationFrame(update);
  }

  function setTarget(value) {
    scroll.target = value;
    queueUpdate();
  }

  // --- Input handlers ---
  // Prevent images / cards from being natively dragged
  carousel.addEventListener('dragstart', (e) => e.preventDefault());
  carousel.style.touchAction = 'pan-y';

  function onPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    isDown = true;
    startX = e.clientX ?? 0;
    scroll.position = scroll.current;
    carousel.style.cursor = 'grabbing';

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  function onPointerMove(e) {
    if (!isDown) return;
    const x = e.clientX ?? 0;
    const dist = (startX - x) * (SCROLL_SPEED * DRAG_FACTOR) * (containerW / 400);
    setTarget(scroll.position + dist);
  }

  function onPointerUp() {
    if (!isDown) return;
    isDown = false;
    carousel.style.cursor = 'grab';

    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);
    debouncedSnap();
  }

  // Tab clicks
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.index, 10);
      setTarget(idx * itemW);
    });
  });

  // Card clicks - only navigate if not dragging
  let pointerDownX = 0;
  cards.forEach((card) => {
    card.addEventListener('pointerdown', (e) => { pointerDownX = e.clientX; });
    card.addEventListener('click', (e) => {
      if (Math.abs(e.clientX - pointerDownX) > 5) return; // was a drag
      const idx = parseInt(card.dataset.index, 10);
      setTarget(idx * itemW);
    });
  });

  // Bind events - drag on entire carousel zone, not just cards
  carousel.addEventListener('pointerdown', onPointerDown);

  // Resize
  window.addEventListener('resize', () => {
    measure();
    layoutCards();
    updateActiveTab();
    queueUpdate();
  });

  // Suspend work when the carousel is offscreen.
  if ('IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          layoutCards();
          updateActiveTab();
          queueUpdate();
        }
      },
      { threshold: 0.01 },
    );
    visibilityObserver.observe(carousel);
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && isVisible) {
      queueUpdate();
    }
  });

  // Initial layout then start loop
  // Default to card index 2 (Résultats détaillés)
  scroll.current = 2 * itemW;
  scroll.target = 2 * itemW;
  layoutCards();
  updateActiveTab();

  // Scroll-triggered entrance animations
  gsap.from('.features-title', {
    scrollTrigger: {
      trigger: '.features-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });

  gsap.from('.features-subtitle', {
    scrollTrigger: {
      trigger: '.features-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    y: 30,
    opacity: 0,
    duration: 0.7,
    delay: 0.1,
    ease: 'power2.out',
  });

  gsap.from('.features-selector', {
    scrollTrigger: {
      trigger: '.features-section',
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
    y: 25,
    opacity: 0,
    duration: 0.7,
    delay: 0.2,
    ease: 'power2.out',
  });

  gsap.from('.features-carousel', {
    scrollTrigger: {
      trigger: '.features-carousel',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    y: 50,
    opacity: 0,
    duration: 0.9,
    delay: 0.15,
    ease: 'power2.out',
  });
}
