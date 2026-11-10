// Info tooltips (.info > .info-btn + .tip) float with position: fixed below their
// button, centred on it but kept inside the viewport. Shown on hover, tap or focus.
(() => {
  function placeTip(info) {
    const b = info.querySelector('.info-btn').getBoundingClientRect(), tip = info.querySelector('.tip'), w = tip.offsetWidth;
    tip.style.left = `${Math.max(12, Math.min(b.left + b.width / 2 - w / 2, document.documentElement.clientWidth - w - 12))}px`;
    tip.style.top = `${b.bottom + 8}px`;
  }
  const place = e => {
    const info = e.target.closest?.('.info');
    if (info) placeTip(info);
  };
  document.addEventListener('mouseover', place);
  document.addEventListener('focusin', place);
  addEventListener('scroll', () => document.querySelectorAll('.info').forEach(placeTip), { passive: true });
})();
