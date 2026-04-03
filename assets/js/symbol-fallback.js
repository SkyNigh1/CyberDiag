const PRIMARY_SYMBOL = '🞼';
const SYMBOL_SELECTORS = '.marquee-dot, .discover-accent, .feature-card-dot, .dl-cta-icon, .footer-accent';
const PRIMARY_ARROWS = ['🡥', '🢆'];
const ARROW_SELECTORS = '.btn-arrow';
const ARROW_TEXT_SELECTORS = '[data-i18n="hero_tagline"]';
const UNSUPPORTED_ARROW_REGEX = /[🡥🢆]/g;

let symbolSupportCache;
let arrowSupportCache;

function isIOSDevice() {
  const ua = navigator.userAgent || '';
  return /iPhone|iPad|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function getGlyphHash(ctx, glyph) {
  ctx.clearRect(0, 0, 96, 96);
  ctx.fillStyle = '#000';
  ctx.fillText(glyph, 8, 8);

  const { data } = ctx.getImageData(0, 0, 96, 96);
  let hash = 2166136261;

  for (let i = 3; i < data.length; i += 4) {
    hash ^= data[i];
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function detectPrimarySymbolSupport() {
  // iOS Safari frequently renders this symbol as tofu despite normal font fallback.
  if (isIOSDevice()) return false;

  const canvas = document.createElement('canvas');
  canvas.width = 96;
  canvas.height = 96;

  const ctx = canvas.getContext('2d', { willReadFrequently: true }) || canvas.getContext('2d');
  if (!ctx) return false;

  ctx.textBaseline = 'top';
  ctx.font = '72px "Neue Montreal", "Supply Mono", "Segoe UI Symbol", "Noto Sans Symbols 2", "Apple Symbols", sans-serif';

  const targetHash = getGlyphHash(ctx, PRIMARY_SYMBOL);
  // Include known fallback glyphs + definitely unassigned probes.
  const fallbackGlyphs = ['\uFFFD', '\u25A1', '?', ' ', '\u0378', '\uFFFF'];
  const fallbackHashes = new Set(fallbackGlyphs.map((glyph) => getGlyphHash(ctx, glyph)));

  return !fallbackHashes.has(targetHash);
}

function detectArrowSupport() {
  // iOS Safari frequently renders these stylized arrows as tofu.
  if (isIOSDevice()) return false;

  const canvas = document.createElement('canvas');
  canvas.width = 96;
  canvas.height = 96;

  const ctx = canvas.getContext('2d', { willReadFrequently: true }) || canvas.getContext('2d');
  if (!ctx) return false;

  ctx.textBaseline = 'top';
  ctx.font = '72px "Neue Montreal", "Supply Mono", "Segoe UI Symbol", "Noto Sans Symbols 2", "Apple Symbols", sans-serif';

  const fallbackGlyphs = ['\uFFFD', '\u25A1', '?', ' ', '\u0378', '\uFFFF'];
  const fallbackHashes = new Set(fallbackGlyphs.map((glyph) => getGlyphHash(ctx, glyph)));

  return PRIMARY_ARROWS.every((arrow) => !fallbackHashes.has(getGlyphHash(ctx, arrow)));
}

export function isPrimarySymbolSupported() {
  if (symbolSupportCache === undefined) {
    symbolSupportCache = detectPrimarySymbolSupport();
  }

  return symbolSupportCache;
}

export function isPrimaryArrowSupported() {
  if (arrowSupportCache === undefined) {
    arrowSupportCache = detectArrowSupport();
  }

  return arrowSupportCache;
}

export function applySymbolFallback(root = document) {
  if (isPrimarySymbolSupported()) return;

  root.querySelectorAll(SYMBOL_SELECTORS).forEach((element) => {
    element.setAttribute('aria-hidden', 'true');
  });

  document.documentElement.classList.add('symbol-fallback-active');
}

function stripUnsupportedArrowsFromText(element) {
  if (!element || typeof element.textContent !== 'string') return;

  const cleaned = element.textContent
    .replace(UNSUPPORTED_ARROW_REGEX, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  element.textContent = cleaned;
}

export function applyArrowFallback(root = document) {
  if (isPrimaryArrowSupported()) return;

  root.querySelectorAll(ARROW_SELECTORS).forEach((element) => {
    element.setAttribute('aria-hidden', 'true');
  });

  root.querySelectorAll(ARROW_TEXT_SELECTORS).forEach((element) => {
    stripUnsupportedArrowsFromText(element);
  });

  document.documentElement.classList.add('arrow-fallback-active');
}

function bootSymbolFallback() {
  applySymbolFallback();
  applyArrowFallback();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSymbolFallback, { once: true });
} else {
  bootSymbolFallback();
}
