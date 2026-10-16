/* Re-playable entrances for HOME, MANIFEST and CONTACT only.
   The animation uses individual child opacity/translate (no layout changes).
   ABOUT and the interactive 3D WORK gallery are intentionally untouched. */
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const sections = ['top', 'manifest', 'contact']
    .map(id => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;
  const replay = section => {
    section.classList.remove('section-motion-active');
    // Restart CSS animations even if a menu link targets the current section.
    void section.offsetWidth;
    section.classList.add('section-motion-active');
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!entry.target.classList.contains('section-motion-active')) replay(entry.target);
        } else {
          entry.target.classList.remove('section-motion-active');
        }
      }
    }, { threshold: 0, rootMargin: '-18% 0px -18% 0px' });
    sections.forEach(section => observer.observe(section));
  } else {
    sections.forEach(replay);
  }
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const section = sections.find(item => `#${item.id}` === anchor.getAttribute('href'));
    if (!section) return;
    anchor.addEventListener('click', () => replay(section));
  });
})();
