let M = null, started = false;
const ease = [0.22, 1, 0.36, 1];
async function lib() {
  if (M) return M;
  try { M = await import('https://cdn.jsdelivr.net/npm/motion@11.11.17/+esm'); } catch (e) { M = null; }
  return M;
}
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function run() {
  const { animate, inView, scroll, stagger } = M;
  const once = (sel, fn) => document.querySelectorAll(sel).forEach(el => { if (el.__sk) return; el.__sk = 1; fn(el); });
  once('[data-hero-bg]', el => animate(el, { scale: [1.12, 1] }, { duration: 2, ease }));
  document.querySelectorAll('[data-hero-in]').forEach((el, i) => { if (el.__sk) return; el.__sk = 1; animate(el, { opacity: [0, 1], y: [32, 0], filter: ['blur(8px)', 'blur(0px)'] }, { duration: 1, delay: 0.15 + i * 0.1, ease }); });
  once('[data-reveal]', el => { animate(el, { opacity: 0, y: 36 }, { duration: 0 }); inView(el, () => { animate(el, { opacity: 1, y: 0 }, { duration: 1, ease }); }, { amount: 0.12 }); });
  once('[data-stagger]', el => { inView(el, () => { const k = Array.from(el.children); animate(k, { opacity: [0, 1], y: [32, 0] }, { duration: 0.85, delay: stagger(0.08), ease }); }, { amount: 0.08 }); });
  once('[data-parallax]', img => scroll(animate(img, { y: [-28, 28] }, { ease: 'linear' }), { target: img.parentElement, offset: ['start end', 'end start'] }));
  once('[data-count]', el => { const to = +el.dataset.count; inView(el, () => { animate(0, to, { duration: 1.6, ease, onUpdate: v => { el.textContent = Math.round(v).toLocaleString('en-GB'); } }); }, { amount: 0.6 }); });
  once('[data-hover-zoom]', card => { const img = card.querySelector('[data-zoom]'); if (!img) return; card.addEventListener('pointerenter', () => animate(img, { scale: 1.06 }, { duration: 0.9, ease })); card.addEventListener('pointerleave', () => animate(img, { scale: 1 }, { duration: 0.9, ease })); });
  if (window.matchMedia('(pointer:fine)').matches) once('[data-magnetic]', el => {
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); animate(el, { x: (e.clientX - r.left - r.width / 2) * 0.18, y: (e.clientY - r.top - r.height / 2) * 0.3 }, { type: 'spring', stiffness: 260, damping: 18 }); });
    el.addEventListener('pointerleave', () => animate(el, { x: 0, y: 0 }, { type: 'spring', stiffness: 260, damping: 18 }));
  });
}
export async function init() {
  if (started || reduced()) return; started = true;
  if (!(await lib())) return;
  run();
  let t; new MutationObserver(() => { clearTimeout(t); t = setTimeout(run, 80); }).observe(document.body, { childList: true, subtree: true });
}
export async function pop(els) {
  if (reduced() || !els || !els.length || !(await lib())) return;
  M.animate(Array.from(els), { opacity: [0, 1], y: [24, 0], scale: [0.98, 1] }, { duration: 0.6, delay: M.stagger(0.06), ease });
}
