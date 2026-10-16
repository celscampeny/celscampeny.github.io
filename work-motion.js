/* Scoped to WORK; leaves hero, ABOUT ME, and 3D card movement untouched. */
(() => {
  const section = document.querySelector('#work');
  if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  section.classList.add('work-motion-pending');
  let hasEntered = false;
  const reveal = () => {
    if (hasEntered) return;
    hasEntered = true;
    section.classList.remove('work-motion-pending');
    section.classList.add('work-motion-ready');
    if (observer) observer.disconnect();
  };
  let observer = null;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) reveal();
    }, { threshold: 0.04, rootMargin: '0px 0px -8% 0px' });
    observer.observe(section);
  } else reveal();
})();
