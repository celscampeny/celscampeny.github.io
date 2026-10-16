/* Case study editorial específic de Plis Plas. No modifica la galeria principal. */
(function () {
  if (new URLSearchParams(window.location.search).get('id') !== 'plis-plas') return;
  const main = document.querySelector('.case-study');
  if (!main) return;
  document.body.classList.add('plis-case-body');
  document.title = 'PLIS PLAS — Brand Repositioning | Cels Campeny';
  main.classList.add('plis-case');
  main.innerHTML = `
    <section class="plis-hero" aria-labelledby="plis-heading">
      <div class="plis-hero-top"><span>04 / SELECTED WORK</span><span>UFRJ · ACADEMIC PROJECT</span></div>
      <div class="plis-hero-content">
        <p class="plis-overline">BRAND REPOSITIONING / VISUAL IDENTITY</p>
        <h1 id="plis-heading">PLIS<br>PLAS<span class="plis-dot">.</span></h1>
        <p class="plis-hero-deck">A little pause in a<br>fast-moving world.</p>
      </div>
      <div class="plis-hero-foot"><span>RIO DE JANEIRO, BRAZIL</span><span>SCROLL TO EXPLORE ↓</span></div>
    </section>

    <section class="plis-facts" aria-label="Informació del projecte">
      <div><small>PROJECT</small><strong>Brand repositioning</strong></div>
      <div><small>CONTEXT</small><strong>Academic · UFRJ exchange</strong></div>
      <div><small>COLLABORATION</small><strong>Celestí Campeny<br>Noa Fernandez</strong></div>
      <div><small>STATUS</small><strong>Conceptual proposal</strong></div>
    </section>

    <section class="plis-editorial-intro plis-reveal">
      <p class="plis-kicker">00 / THE BIG PICTURE</p>
      <h2>A COFFEE STOP<br>WORTH <em>STOPPING</em> FOR.</h2>
      <p>Developed during an academic exchange at the Universidade Federal do Rio de Janeiro, Plis Plas reimagines a café near a transport station as a contemporary, warm and convenient stop for people on the move.</p>
    </section>

    <figure class="plis-figure plis-figure-street plis-reveal">
      <img src="assets/plis-plas/slide-01.jpg" alt="Fotografia de la façana original de la cafeteria Plis Plas, abans del reposicionament" loading="lazy">
      <figcaption>01 / THE STARTING POINT — THE ORIGINAL CAFÉ</figcaption>
    </figure>

    <section class="plis-text-section plis-reveal">
      <p class="plis-kicker">01 / THE CHALLENGE</p>
      <div><h2>FAST DOESN'T<br>HAVE TO FEEL<br>RUSHED.</h2>
      <p>The creative brief defined a quick, modern and welcoming café: a place for a coffee to go, or for taking a moment before continuing the journey. The proposal was grounded in four principles: <strong>speed, quality, convenience and warmth.</strong></p></div>
    </section>

    <section class="plis-statement plis-reveal">
      <span>02 / POSITIONING</span>
      <p>“A daily stop that gives you energy to keep going.”</p>
      <small>POSITIONING IDEA ADAPTED FROM THE ORIGINAL PROJECT BRIEF</small>
    </section>

    <section class="plis-split plis-reveal">
      <div class="plis-split-copy"><p class="plis-kicker">03 / CREATIVE DIRECTION</p><h2>MADE FOR<br>THE MOMENT.</h2><p>The visual direction combines expressive lettering and approachable graphic elements with warm colours and a playful tone. Product photography, human gestures and dynamic typographic treatments support the promise of a fast but enjoyable break.</p></div>
      <figure><img src="assets/plis-plas/slide-06.jpg" loading="lazy" alt="Diapositiva del briefing que mostra el posicionament i fotografies de referència per a Plis Plas"><figcaption>VISUAL REFERENCES AND BRAND POSITIONING · SOURCE PRESENTATION</figcaption></figure>
    </section>

    <section class="plis-identity plis-reveal">
      <div class="plis-identity-heading"><span>04 / THE IDENTITY</span><h2>THREE COLOURS.<br>ONE PERSONALITY.</h2></div>
      <div class="plis-colours" aria-label="Paleta cromàtica de Plis Plas">
        <div style="--swatch:#4d5a2c;--ink:#ffe187"><strong>OLIVE</strong><span>#4D5A2C</span></div>
        <div style="--swatch:#ffe187;--ink:#4d5a2c"><strong>BUTTER</strong><span>#FFE187</span></div>
        <div style="--swatch:#b2493b;--ink:#ffe187"><strong>BRICK</strong><span>#B2493B</span></div>
      </div>
      <figure class="plis-identity-board"><img src="assets/plis-plas/slide-07.jpg" alt="Sistema d'identitat visual de Plis Plas amb logotip, tipografia Mignone i paleta de tres colors" loading="lazy"><figcaption>LOGOTYPE, TYPOGRAPHY AND COLOUR SYSTEM · ORIGINAL PROJECT PRESENTATION</figcaption></figure>
    </section>

    <section class="plis-text-section plis-reveal">
      <p class="plis-kicker">05 / BRAND IN ACTION</p>
      <div><h2>FROM THE CUP<br>TO THE CITY.</h2><p>The proposal translates the identity into take-away cups, food packaging and promotional communication. Short, memorable lines connect the brand to the station-side location and the rhythm of everyday travel.</p></div>
    </section>

    <figure class="plis-figure plis-applications plis-reveal"><img src="assets/plis-plas/slide-08.jpg" alt="Propostes de packaging Plis Plas: bosses, caixes i gots de cafè amb el nou logotip i els colors corporatius" loading="lazy"><figcaption>PACKAGING CONCEPTS AND BRAND APPLICATIONS · ORIGINAL PROJECT PRESENTATION</figcaption></figure>

    <section class="plis-slogan plis-reveal">
      <div><p class="plis-kicker">06 / THE BRAND VOICE</p><h2>EN UN<br>PLIS PLAS<br><em>ACABES I<br>T'ENVÀS.</em></h2><p>A playful slogan from the project that links the café's name to a quick stop before heading off again.</p></div>
      <figure><img src="assets/plis-plas/slide-09.jpg" alt="Diapositiva de l'eslògan amb aplicació de marca sobre un telèfon mòbil" loading="lazy"><figcaption>SLOGAN AND DIGITAL APPLICATION · ORIGINAL PRESENTATION</figcaption></figure>
    </section>

    <section class="plis-conclusion plis-reveal"><p class="plis-kicker">07 / THE OUTCOME</p><h2>A MORE DISTINCTIVE<br>EVERYDAY RITUAL.</h2><p>The outcome is a conceptual brand repositioning proposal: a coherent identity system designed to make Plis Plas feel faster, friendlier and more recognisable. Developed as an academic project at UFRJ; no commercial implementation or measured performance is claimed.</p><div class="plis-credit">ACADEMIC COLLABORATION · CELESTÍ CAMPENY & NOA FERNANDEZ</div></section>

    <nav class="case-navigation" aria-label="Navegació entre projectes"><a href="project.html?id=velabrava">← <span><small>PREVIOUS</small><strong>VELABRAVA</strong></span></a><a class="case-all" href="index.html#work">ALL WORK ↑</a><a href="project.html?id=odara-social"><span><small>NEXT</small><strong>ÒDÀRÀ SOCIAL</strong></span> →</a></nav>
  `;
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .08 });
    main.querySelectorAll('.plis-reveal').forEach(el => observer.observe(el));
  } else {
    main.querySelectorAll('.plis-reveal').forEach(el => el.classList.add('is-visible'));
  }
})();
