/* Shared project cover layout. Only four editorial case studies. */
(() => {
  const id = new URLSearchParams(location.search).get('id');
  const data = {
    'velabrava': { selector: '.vela-hero', number: '03', client: 'VELABRAVA', keywords: 'BRAND EXPERIENCE · EVENTS · COMMUNICATION', heading: 'VELA<br>BRAVA<span>!</span>', statement: 'THE SEA IS OUR DANCEFLOOR.', location: 'COSTA BRAVA · CATALONIA', anchor: '#vela-intro' },
    'plis-plas': { selector: '.plis-hero', number: '04', client: 'CAFETERIA PLIS PLAS', keywords: 'REBRANDING · VISUAL IDENTITY · POSITIONING', heading: 'PLIS<br>PLAS<span class="plis-dot">.</span>', statement: 'A little pause in a<br>fast-moving world.', location: 'RIO DE JANEIRO · BRAZIL', anchor: '.plis-editorial-intro' },
    'odara-social': { selector: '.odara-hero', number: '05', client: 'INSTITUTO ODARA SOCIAL', keywords: 'SOCIAL IMPACT · PR · DONOR ENGAGEMENT', heading: 'GIVING<br><em>GROWS.</em>', statement: 'A human-first communication campaign to turn occasional donations into lasting relationships.', location: 'DUQUE DE CAXIAS · RIO DE JANEIRO, BRAZIL', anchor: '#odara-challenge' },
    'ante': { selector: '.ante-hero', number: '06', client: 'ANTE', keywords: 'BRANDED CONTENT · DIGITAL WELLBEING · SOCIAL MEDIA', heading: 'AN<span>T</span>E<span class="ante-period">.</span>', statement: 'AN APP THAT HELPS YOU PAUSE BEFORE YOU BUY.', location: 'UNIVERSITAT DE GIRONA · CATALONIA', anchor: '#ante-intro' }
  }[id];
  if (!data) return;
  const hero = document.querySelector(data.selector);
  if (!hero) return;
  hero.classList.add('unified-hero');
  if (id === 'plis-plas') hero.removeAttribute('aria-labelledby');
  const target = data.anchor.startsWith('.') ? document.querySelector(data.anchor) : document.querySelector(data.anchor);
  if (target && !target.id) target.id = 'project-intro';
  const href = target ? '#' + target.id : 'index.html#work';
  hero.innerHTML = `
    <div class="unified-cover-top">
      <a class="unified-logo" href="index.html#top" aria-label="Back to homepage">CELS®</a>
      <div class="unified-top-right"><a href="index.html#work" class="unified-back">← BACK TO WORK</a><span class="unified-keywords">${data.keywords}</span></div>
    </div>
    <div class="unified-cover-main">
      <span class="unified-number">${data.number} / SELECTED WORK</span>
      <span class="unified-client">${data.client}</span>
      <h1 class="unified-heading">${data.heading}</h1>
      <p class="unified-statement">${data.statement}</p>
      <p class="unified-location">${data.location}</p>
    </div>
    <div class="unified-cover-bottom"><a href="${href}">EXPLORE THE PROJECT ↓</a></div>`;
})();
