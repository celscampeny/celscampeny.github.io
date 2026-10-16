/* ANTE — dedicated case study, independent from the 3D project gallery. */
(()=>{
  if(new URLSearchParams(location.search).get('id') !== 'ante') return;
  const main=document.querySelector('.case-study');
  if(!main) return;
  document.body.classList.add('ante-case-body');
  main.classList.add('ante-case');
  document.title='ANTE — Branded Content | Cels Campeny';

  const figure=(number,alt,caption,cls='')=>`
    <figure class="ante-figure ${cls}">
      <img src="assets/ante/slide-${String(number).padStart(2,'0')}.webp" alt="${alt}" loading="lazy" decoding="async">
      <figcaption>${caption}</figcaption>
    </figure>`;
  main.innerHTML=`
    <section class="ante-hero" aria-labelledby="ante-title">
      <div class="ante-bar"><span>06 / SELECTED WORK</span><span>BRANDED CONTENT / ACADEMIC CONCEPT</span></div>
      <div class="ante-hero-content">
        <div class="ante-kicker">THINK TWICE. BUY BETTER.</div>
        <h1 id="ante-title">AN<span>T</span>E<span class="ante-period">.</span></h1>
        <p>AN APP THAT HELPS YOU PAUSE BEFORE YOU BUY.</p>
        <a href="#ante-intro">EXPLORE THE PROJECT <span aria-hidden="true">↓</span></a>
      </div>
      <div class="ante-bottom"><span>UNIVERSITAT DE GIRONA</span><span>CONTENT WITH A CONSCIENCE ↗</span></div>
    </section>

    <section class="ante-meta">
      <div><small>DISCIPLINE</small><strong>Branded Content · Digital Wellbeing</strong></div>
      <div><small>CONTEXT</small><strong>Academic project / Universitat de Girona</strong></div>
      <div><small>TEAM</small><strong>Cels Campeny · Noa Fernandez · Viktoriya Yakubyak</strong></div>
    </section>

    <section id="ante-intro" class="ante-intro ante-reveal">
      <p class="ante-tag">01 / THE CHALLENGE</p>
      <h2>THAT MOMENT<br>BEFORE <em>CHECKOUT.</em></h2>
      <div class="ante-copy"><p>Online shopping is designed to make buying effortless. But a tempting offer, an impulsive scroll or a stressful day can turn an unplanned purchase into an almost automatic decision.</p><p>ANTE is a conceptual app designed to help people understand their digital spending habits and create a moment of reflection before buying. Instead of judging consumers, the brand speaks to them with honesty and humour.</p></div>
    </section>

    <section class="ante-statement ante-reveal">
      <span>THE BRAND PROMISE</span>
      <strong>LESS IMPULSE.<br><i>MORE INTENTION.</i></strong>
      <p>Financial awareness · Digital wellbeing · Conscious consumption</p>
    </section>

    <section class="ante-story ante-reveal">
      <span class="ante-tag">02 / STRATEGIC THINKING</span>
      <div class="ante-two"><h2>MAKE SELF-<br>CONTROL<br><em>RELATABLE.</em></h2><p>Designed with Gen Z and millennials in mind, the concept focuses on the emotional triggers behind impulsive buying. ANTE proposes spending-pattern insights and timely notifications that invite users to reconsider a purchase. Its tone is honest, playful and encouraging, rather than moralising.</p></div>
    </section>
    ${figure(4,'ANTE brand territory map exploring financial awareness, digital wellbeing and responsible consumption','BRAND TERRITORY / ORIGINAL STRATEGY MAP','ante-wide')}

    <section class="ante-rocco ante-reveal">
      <span class="ante-tag">03 / THE CHARACTER</span>
      <div class="ante-two"><div><h2>MEET<br><em>ROCCO.</em></h2><p>A purple toad with a lot of personality—and a surprisingly good understanding of bad spending decisions. Rocco gives ANTE a recognisable voice: humorous, expressive and easy to share.</p></div>
      ${figure(5,'Rocco, the purple animated toad mascot designed for ANTE','ROCCO / ORIGINAL CHARACTER DESIGN')}</div>
    </section>

    <section class="ante-content ante-reveal">
      <span class="ante-tag">04 / THE CONTENT ECOSYSTEM</span>
      <h2>EDUCATE.<br>ENTERTAIN.<br><em>MAKE IT STICK.</em></h2>
      <div class="ante-three">
       <article><b>01</b><h3>MEMES</h3><p>Relatable moments about temptation, shopping habits and saving money.</p></article>
       <article><b>02</b><h3>EDUCATIONAL POSTS</h3><p>Snackable financial tips and practical ways to become more intentional.</p></article>
       <article><b>03</b><h3>SHORT-FORM VIDEO</h3><p>Humour-driven audiovisual content built for social sharing.</p></article>
      </div>
    </section>

    ${figure(7,'ANTE Rocco Mood meme concepts from the original project presentation','BRANDED CONTENT / MEMES','ante-wide')}
    ${figure(8,'ANTE social media carousel designs with money management and savings advice','SOCIAL POSTS / FINANCIAL EDUCATION','ante-wide')}

    <section class="ante-notifications ante-reveal">
      <span class="ante-tag">05 / THE PRODUCT AS A MESSAGE</span>
      <div class="ante-two"><h2>A LITTLE<br><em>NUDGE.</em><br>BIG IMPACT.</h2><p>ANTE uses the language of everyday messaging to interrupt automatic decisions. The proposed notifications make room for a second thought—without sounding like a lecture. The concept extends the brand's voice into the app experience itself.</p></div>
    </section>
    ${figure(9,'Mobile mockups of ANTE purchase-awareness notifications','IN-APP COMMUNICATION / NOTIFICATION CONCEPTS','ante-wide')}

    <section class="ante-format ante-reveal">
      <span class="ante-tag">06 / SOCIAL-FIRST STORYTELLING</span>
      <h2>THE BRAND<br>IN <em>MOTION.</em></h2>
      <p>Short videos and Reels give Rocco a role beyond static graphics. The proposed content blends entertainment, brand personality and financial awareness across TikTok and Instagram.</p>
    </section>
    ${figure(10,'Rocco character scenes illustrating ANTE short video and Reel concepts','REELS / STORYBOARD EXAMPLES','ante-wide')}

    <section class="ante-outcome ante-reveal">
      <span class="ante-tag">07 / THE OUTCOME</span>
      <h2>A BRAND<br>THAT MAKES<br><em>YOU THINK.</em></h2>
      <p>The academic project brings together an app concept, a distinct character and a coherent branded-content strategy. ANTE turns a serious subject—impulsive spending—into a friendly, recognisable conversation. These are proposed creative executions, not a claim of a launched app or measured campaign results.</p>
      <div class="ante-credit">ACADEMIC BRANDED CONTENT PROJECT · UNIVERSITAT DE GIRONA</div>
    </section>

    <nav class="ante-nav" aria-label="Project navigation">
      <a href="project.html?id=odara-social">← PREVIOUS / ÒDÀRÀ SOCIAL</a>
      <a href="index.html#work">ALL PROJECTS ↑</a>
      <a href="project.html?id=adds">NEXT / ADDS →</a>
    </nav>`;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce && 'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}
    }),{threshold:.08});
    main.querySelectorAll('.ante-reveal').forEach(el=>observer.observe(el));
  }else main.querySelectorAll('.ante-reveal').forEach(el=>el.classList.add('is-visible'));
})();
