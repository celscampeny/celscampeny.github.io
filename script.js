
/* =====================================
   01 — FIXED AMBIENT GRADIENT / CURSOR LIGHT
   ===================================== */
const ambientBackground = document.querySelector('.ambient-background');
if (ambientBackground && window.matchMedia('(pointer: fine)').matches) {
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let intensity = 0;
  let targetIntensity = 0;
  let frame = null;

  const animateLight = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    intensity += (targetIntensity - intensity) * 0.075;
    ambientBackground.style.setProperty('--cursor-x', `${currentX}px`);
    ambientBackground.style.setProperty('--cursor-y', `${currentY}px`);
    ambientBackground.style.setProperty('--cursor-opacity', intensity.toFixed(3));
    if (Math.abs(targetX-currentX) > .2 || Math.abs(targetY-currentY) > .2 || Math.abs(targetIntensity-intensity) > .005) {
      frame = requestAnimationFrame(animateLight);
    } else { frame = null; }
  };
  const requestLightFrame = () => { if (frame === null) frame = requestAnimationFrame(animateLight); };
  document.addEventListener('pointermove', event => {
    targetX = event.clientX;
    targetY = event.clientY;
    targetIntensity = 1;
    requestLightFrame();
  }, {passive:true});
  document.addEventListener('pointerout', event => {
    if (!event.relatedTarget) { targetIntensity = 0; requestLightFrame(); }
  });
  window.addEventListener('blur', () => {targetIntensity = 0; requestLightFrame();});
}


/* =====================================
   02 — COMPACT HOVER MENU
   ===================================== */
const menuDropdown = document.querySelector('#menuDropdown');
if (menuDropdown) {
  const menuButton = menuDropdown.querySelector('.menu');
  const setOpen = (open) => {
    menuDropdown.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  };

  // Hover on desktop, click/tap on touchscreens, keyboard focus for accessibility.
  menuDropdown.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') setOpen(true);
  });
  menuDropdown.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') setOpen(false);
  });
  menuButton.addEventListener('click', () => {
    setOpen(!menuDropdown.classList.contains('is-open'));
  });
  menuDropdown.addEventListener('focusout', event => {
    if (!menuDropdown.contains(event.relatedTarget)) setOpen(false);
  });
  menuDropdown.querySelectorAll('.menu-links a').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });
  document.addEventListener('pointerdown', event => {
    if (!menuDropdown.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setOpen(false);
      if (menuDropdown.contains(document.activeElement)) menuButton.focus();
    }
  });
}


/* =====================================
   03 — PROJECT CARD STACK
   ===================================== */
const gallery = document.querySelector('#gallery3d');

if (gallery) {
  const stack = gallery.querySelector('#projectStack');
  const info = gallery.querySelector('.gallery-info');
  const title = gallery.querySelector('#projectTitle');
  const indexLabel = gallery.querySelector('#projectIndex');
  const category = gallery.querySelector('#projectCategory');
  const description = gallery.querySelector('#projectDescription');
  const viewLink = gallery.querySelector('#viewProject');
  const totalLabel = gallery.querySelector('#projectTotal');

  // Edit project content here; one card will be created per project.
  const projects = window.PORTFOLIO_PROJECTS;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // First item is visually nearest to the viewer.
  let order = projects.map((_, i) => i);
  let selected = order[0];
  let flightInProgress = false;
  let changingTimer = null;
  const slots = [];
  stack.replaceChildren();

  // Decreasing scale + rising height + negative Z create the receding deck.
  const pose = (depth, yOffset = 0) => {
    const scale = Math.max(.66, 1 - depth * .057);
    return `translate3d(0, ${-depth * 37 + yOffset}px, ${-depth * 55}px) scale(${scale})`;
  };
  const risingCards = new Set();

  function setLayout(animate = true) {
    order.forEach((projectIndex, depth) => {
      const slot = slots[projectIndex];
      slot.style.transition = animate && !prefersReducedMotion.matches
        ? 'transform 900ms cubic-bezier(.22,1,.36,1), filter 900ms ease'
        : 'none';
      slot.style.transform = pose(depth);
      slot.style.zIndex = String(projects.length - depth);
      slot.style.filter = `brightness(${Math.max(.82, 1 - depth * .024)})`;
      slot.setAttribute('aria-pressed', String(projectIndex === selected));
    });
  }

  function setText(i) {
    const project = projects[i];
    title.textContent = project.name;
    indexLabel.textContent = String(i + 1).padStart(2, '0');
    category.textContent = project.category;
    description.textContent = project.description;
    if (viewLink) viewLink.href = `project.html?id=${encodeURIComponent(project.slug)}`;
    if (totalLabel) totalLabel.textContent = String(projects.length).padStart(2, '0');
  }

  // The deck advances one slot at the SAME TIME as each domino falls.
  // A falling card is never brought back through the visible stack.
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function selectProject(i) {
    i = (i + projects.length) % projects.length;
    if (flightInProgress || i === selected) return;

    const steps = order.indexOf(i);
    if (steps < 0) return;
    flightInProgress = true;
    stack.classList.add('is-animating');

    // Fade the description while the first domino is beginning to fall.
    clearTimeout(changingTimer);
    info.classList.add('is-changing');
    changingTimer = setTimeout(() => {
      selected = i;
      setText(i);
      requestAnimationFrame(() => info.classList.remove('is-changing'));
    }, prefersReducedMotion.matches ? 0 : 200);

    if (prefersReducedMotion.matches) {
      for (let n = 0; n < steps; n++) order.push(order.shift());
      selected = i;
      setLayout(false);
      setText(i);
      info.classList.remove('is-changing');
      flightInProgress = false;
      stack.classList.remove('is-animating');
      return;
    }

    try {
      // Each domino lasts 520 ms. The next one starts 270 ms later,
      // so the falls overlap without waiting for the previous landing.
      const FALL_DURATION = 520;
      const DOMINO_STAGGER = 270;
      const activeFalls = new Set();
      const fallTasks = [];

      for (let step = 0; step < steps; step++) {
        const fallingId = order[0];
        const falling = slots[fallingId];
        activeFalls.add(fallingId);

        // Capture the CURRENT pose: the card may still be easing forward
        // when its turn to topple starts.
        const currentTransform = getComputedStyle(falling).transform;
        falling.style.transition = 'none';
        falling.style.transform = currentTransform;
        falling.style.zIndex = String(projects.length + 10 + step);

        const fall = falling.animate([
          { transform: currentTransform, opacity: 1, offset: 0 },
          { transform: 'translate3d(0, 20px, 48px) rotateX(-19deg) scale(1)', opacity: 1, offset: .32 },
          { transform: 'translate3d(0, 98px, 158px) rotateX(-90deg) scale(1)', opacity: 0, offset: 1 }
        ], {
          duration: FALL_DURATION,
          easing: 'cubic-bezier(.55,.02,.85,.45)',
          fill: 'forwards'
        });

        // Everyone else advances while this piece falls. Do not move
        // another actively falling piece through the visible stack.
        order.push(order.shift());
        order.forEach((id, depth) => {
          if (activeFalls.has(id)) return;
          const slot = slots[id];
          // Cards that just reappeared keep their fade/vertical motion while
           // the following domino starts: never snap them to the next pose.
           slot.style.transition = risingCards.has(id)
             ? 'transform 560ms cubic-bezier(.22,1,.36,1), opacity 520ms ease-out, filter 560ms ease'
             : `transform ${FALL_DURATION}ms cubic-bezier(.25,.75,.35,1), filter ${FALL_DURATION}ms ease`;
          slot.style.transform = pose(depth);
          slot.style.zIndex = String(projects.length - depth);
          slot.style.filter = `brightness(${Math.max(.82, 1 - depth * .024)})`;
          slot.setAttribute('aria-pressed', String(id === i));
        });

        // Let the fall finish independently of the next domino's start.
        fallTasks.push((async () => {
          try {
            await fall.finished;
          } finally {
            falling.style.opacity = '0';
            falling.style.transition = 'none';
            const depth = order.indexOf(fallingId);
            falling.style.transform = pose(depth);
            falling.style.zIndex = String(projects.length - depth);
            falling.style.filter = `brightness(${Math.max(.82, 1 - depth * .024)})`;
            fall.cancel();
            activeFalls.delete(fallingId);
            // Reappear at the back from BELOW, then glide UP. Use CSS
            // transitions (not a separate Web Animation) so any next step
            // can redirect the same card without abruptly resetting it.
            risingCards.add(fallingId);
            falling.style.transform = pose(depth, 48);
            falling.style.transition = 'none';
            // Two frames ensure the invisible start state is committed.
            await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            falling.style.transition = 'transform 560ms cubic-bezier(.22,1,.36,1), opacity 520ms ease-out, filter 560ms ease';
            falling.style.transform = pose(order.indexOf(fallingId));
            falling.style.opacity = '1';
            // Subsequent advances may change the destination mid-flight.
            // Keep the transition alive until the last phase completes.
            await wait(600);
            risingCards.delete(fallingId);
          }
        })());

        if (step < steps - 1) await wait(DOMINO_STAGGER);
      }
      await Promise.all(fallTasks);
    } catch (error) {
      if (error?.name !== 'AbortError') console.error(error);
    } finally {
      selected = i;
      clearTimeout(changingTimer);
      setText(i);
      info.classList.remove('is-changing');
      slots.forEach(slot => { slot.style.opacity = '1'; });
      setLayout(false);
      flightInProgress = false;
      stack.classList.remove('is-animating');
    }
  }

  projects.forEach((project, i) => {
    const slot = document.createElement('div');
    slot.className = 'stack-slot';
    slot.dataset.projectIndex = String(i);
    slot.setAttribute('role', 'button');
    slot.setAttribute('tabindex', '0');
    slot.setAttribute('aria-label', `Seleccionar projecte ${project.name}`);

    const card = document.createElement('div');
    card.className = 'stack-card';
    card.style.background = project.background;
    card.style.color = project.textColor || '#ffffff';
    if (project.cardImage) {
      card.classList.add('has-card-image');
      if (project.slug) card.classList.add(`card-${project.slug}`);
      const graphic = document.createElement('img');
      graphic.className = `stack-card-graphic ${project.cardImageClass || ''}`.trim();
      graphic.src = project.cardImage;
      graphic.alt = project.cardImageAlt || '';
      graphic.loading = 'lazy';
      graphic.decoding = 'async';
      card.appendChild(graphic);
    }
    const number = document.createElement('span');
    number.className = 'stack-card-number';
    number.textContent = String(i + 1).padStart(2, '0');
    const name = document.createElement('strong');
    name.className = 'stack-card-name';
    name.textContent = project.name;
    card.append(number, name);
    slot.appendChild(card);
    stack.appendChild(slot);
    slots.push(slot);

    slot.addEventListener('click', () => selectProject(i));
    slot.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectProject(i);
      }
    });
  });

  setLayout(false);
  setText(selected);
  gallery.querySelector('#prevProject')?.addEventListener('click', () => selectProject(selected - 1));
  gallery.querySelector('#nextProject')?.addEventListener('click', () => selectProject(selected + 1));
}


/* =====================================
   04 — ABOUT ME REPLAYABLE SCROLL REVEAL
   ===================================== */
(() => {
  const section = document.querySelector('#about.about-me-section');
  if (!section) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    section.classList.add('about-is-visible');
    return;
  }

  // Observe the whole section, not individual elements. Reset on exit so
  // scrolling back to About plays the entrance once again.
  const observer = new IntersectionObserver(([entry]) => {
    section.classList.toggle('about-is-visible', entry.isIntersecting);
  }, { threshold: 0, rootMargin: '-12% 0px -12% 0px' });
  observer.observe(section);
})();


/* ABOUT ME — in-place reading panel; wheel scroll remains in text. */
(() => {
  const section = document.querySelector('#about.about-me-section');
  const button = document.getElementById('aboutToggle');
  const fullText = document.getElementById('aboutFullText');
  const viewport = document.getElementById('aboutReadingViewport');
  if (!section || !button || !fullText || !viewport) return;
  button.addEventListener('click', () => {
    const opening = !section.classList.contains('about-expanded');
    section.classList.toggle('about-expanded', opening);
    button.setAttribute('aria-expanded', String(opening));
    fullText.setAttribute('aria-hidden', String(!opening));
    if (!opening) viewport.scrollTop = 0;
  });
  // Prevent wheel events from propagating into document scrolling while the
  // panel is open and the pointer is over its reading area.
  viewport.addEventListener('wheel', (event) => {
    if (!section.classList.contains('about-expanded')) return;
    event.preventDefault();
    viewport.scrollTop += event.deltaY;
  }, {passive:false});
})();
