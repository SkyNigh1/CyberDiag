export function initDownloadSection() {
  // --- Vertical ticker scrolling animation ---
  const ticker = document.getElementById('distro-ticker');
  const track = document.getElementById('distro-track');
  if (!ticker || !track) return;

  const items = track.querySelectorAll('.dl-distro-name');
  const total = items.length;
  if (total === 0) return;

  // Clone the first item at the end for seamless loop
  const firstClone = items[0].cloneNode(true);
  track.appendChild(firstClone);

  let currentIndex = 0;
  let tickerTimer = null;
  let tickerVisible = false;

  function scrollToNext() {
    currentIndex++;
    gsap.to(track, {
      y: () => -(currentIndex * items[0].offsetHeight),
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        // If we reached the clone, instantly jump back to the real first item
        if (currentIndex >= total) {
          currentIndex = 0;
          gsap.set(track, { y: 0 });
        }
      }
    });
  }

  function startTicker() {
    if (tickerTimer !== null) return;
    tickerTimer = window.setInterval(scrollToNext, 2200);
  }

  function stopTicker() {
    if (tickerTimer === null) return;
    clearInterval(tickerTimer);
    tickerTimer = null;
  }

  if ('IntersectionObserver' in window) {
    const tickerObserver = new IntersectionObserver(
      ([entry]) => {
        tickerVisible = entry.isIntersecting;
        if (tickerVisible && !document.hidden) {
          startTicker();
        } else {
          stopTicker();
        }
      },
      { threshold: 0.1 },
    );

    tickerObserver.observe(ticker);
  } else {
    tickerVisible = true;
    startTicker();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopTicker();
    } else if (tickerVisible) {
      startTicker();
    }
  });

  // --- Scroll-triggered entrance animations ---
  const dlElements = ['.dl-cta-box', '.dl-distro-box', '.dl-install-box', '.dl-img-box', '.dl-tools-band'];

  gsap.set(dlElements, { clipPath: 'inset(0 0 100% 0)', y: 30, opacity: 0 });

  const dlTL = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  });

  dlTL.to('.dl-cta-box', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.7 }, 0)
    .to('.dl-distro-box', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.7 }, 0.1)
    .to('.dl-install-box', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.8 }, 0.2)
    .to('.dl-img-box', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.9 }, 0.15)
    .to('.dl-tools-band', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.7 }, 0.35);

  ScrollTrigger.create({
    trigger: '#download',
    start: 'top 80%',
    onEnter: () => dlTL.play(),
    onLeaveBack: () => dlTL.reverse(),
    onEnterBack: () => dlTL.play(),
  });
}
