const PRIMARY_SYMBOL = '🞼';
const SYMBOL_SELECTORS = '.marquee-dot, .discover-accent, .feature-card-dot, .dl-cta-icon, .footer-accent';

let symbolSupportCache;

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
  const canvas = document.createElement('canvas');
  canvas.width = 96;
  canvas.height = 96;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return true;

  ctx.textBaseline = 'top';
  ctx.font = '72px "Neue Montreal", "Supply Mono", "Segoe UI Symbol", "Noto Sans Symbols 2", "Apple Symbols", sans-serif';

  const targetHash = getGlyphHash(ctx, PRIMARY_SYMBOL);
  const fallbackGlyphs = ['\uFFFD', '\u25A1', '?', ' '];
  const fallbackHashes = new Set(fallbackGlyphs.map((glyph) => getGlyphHash(ctx, glyph)));

  return !fallbackHashes.has(targetHash);
}

export function isPrimarySymbolSupported() {
  if (symbolSupportCache === undefined) {
    symbolSupportCache = detectPrimarySymbolSupport();
  }

  return symbolSupportCache;
}

function removeTextNodeSymbols(rootElement) {
  const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT);
  let currentNode = walker.nextNode();

  while (currentNode) {
    if (currentNode.nodeValue && currentNode.nodeValue.includes(PRIMARY_SYMBOL)) {
      currentNode.nodeValue = currentNode.nodeValue.split(PRIMARY_SYMBOL).join('');
    }
    currentNode = walker.nextNode();
  }
}

export function applySymbolFallback(root = document) {
  if (isPrimarySymbolSupported()) return;

  root.querySelectorAll(SYMBOL_SELECTORS).forEach((element) => {
    removeTextNodeSymbols(element);
    element.style.display = 'none';
    element.setAttribute('aria-hidden', 'true');
  });

  document.documentElement.classList.add('symbol-fallback-active');
}

function bootSymbolFallback() {
  applySymbolFallback();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSymbolFallback, { once: true });
} else {
  bootSymbolFallback();
}
