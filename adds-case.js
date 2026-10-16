/* ADDS — single-slide editorial gallery. Separate from the homepage domino. */
(()=>{
 if(new URLSearchParams(location.search).get('id')!=='adds')return;
 const main=document.querySelector('.case-study');if(!main)return;
 document.body.classList.add('adds-case-body');main.classList.add('adds-case');document.title='ADDS — Graphic Works | Cels Campeny';
 const items=[
  {title:'AIRTag',kind:'OUT-OF-HOME · OPPORTUNITY ADVERTISING',src:'assets/adds/airtag.webp',alt:'AirTag opportunity advertising billboard inspired by the Louvre jewellery theft',description:'An unsolicited OOH concept for Apple AirTag inspired by the Louvre jewellery theft. Using a topical news story and a minimalist art direction, the piece turns AirTag’s finding function into an immediate visual punchline.'},
  {title:'GIROCLETA',kind:'POSTER · ART DIRECTION',src:'assets/adds/girocleta.webp',alt:'Girocleta bicycle promotional poster designed like a performance racing advertisement',description:'A promotional poster for Girocleta that borrows the visual codes of rally and performance-car advertising. Exaggerated product presentation, bold type and racing cues reimagine an everyday bicycle as an urban racing machine.'},
  {title:'CORNETTO',kind:'DIGITAL AD · SOCIAL MEDIA',src:'assets/adds/cornetto.webp',alt:'Cornetto creative digital poster with ice cream inspired letterforms on blue paper',description:'A playful social-first digital advertisement for Cornetto, combining expressive typography and tactile, ice-cream-inspired lettering to create a memorable visual message.'},
  {title:'TALKUAL',kind:'DIGITAL BANNERS · SEM CAMPAIGN',src:'assets/adds/talkual-wide.webp',alt:'Talkual digital banner graphics featuring imperfect fruits and vegetables',description:'A set of digital advertising banners developed for Talkual’s SEM campaign. Adapted across horizontal, vertical and square placements, the layouts keep the brand identity recognisable while highlighting naturally imperfect fruit and vegetables.',gallery:true},
  {title:'BRETT',kind:'SOCIAL MEDIA · OOH / DOOH',src:'assets/adds/brett.webp',alt:'BRETT fictional condom brand campaign with pink and fluorescent green Quevedo-inspired typography',description:'A concept campaign for a fictional condom brand, created for social media and out-of-home formats. A playful reference to a Quevedo song connects the message with Gen Z pop culture while encouraging protection through bold, attention-grabbing art direction.'}
 ];
 main.innerHTML=`<section class="adds-shell" aria-label="ADDS graphic works gallery">
  <header class="adds-head"><div class="adds-meta"><span>01 / SELECTED WORK</span><span>GRAPHIC DESIGN · ART DIRECTION</span></div><h1>ADDS<span>.</span></h1><p>FIVE IDEAS. DIFFERENT FORMATS. ONE CREATIVE MIND.</p></header>
  <div class="adds-player"><div class="adds-art" id="addsArt" aria-live="off"></div>
  <div class="adds-caption-wrap"><div class="adds-caption" id="addsCaption" aria-live="polite"></div><div class="adds-controls"><span id="addsCount">01 / 05</span><button type="button" class="adds-back" id="addsBack" aria-label="Previous graphic piece">←</button><button type="button" class="adds-next" id="addsNext" aria-label="Next graphic piece">→</button></div></div></div>
  <div class="adds-bottom"><span>STUDENT & CONCEPT WORK / NOT OFFICIAL BRAND CAMPAIGNS</span><a href="index.html#work">← BACK TO SELECTED WORK</a></div>
 </section>
 <div class="adds-lightbox" id="addsLightbox" role="dialog" aria-modal="true" aria-label="Graphic artwork enlarged" aria-hidden="true">
  <button type="button" class="adds-lightbox-close" id="addsLightboxClose" aria-label="Close enlarged image">×</button>
  <img class="adds-lightbox-image" id="addsLightboxImage" alt="">
 </div>`;
 const art=document.getElementById('addsArt'),caption=document.getElementById('addsCaption'),counter=document.getElementById('addsCount');let index=0,timer=0;
 const htmlFor=(item)=>item.gallery?`<div class="adds-talkual"><img tabindex="0" role="button" aria-label="Enlarge wide Talkual banner" src="assets/adds/talkual-wide.webp" alt="Wide Talkual digital banner"><img tabindex="0" role="button" aria-label="Enlarge tall Talkual banner" src="assets/adds/talkual-tall.webp" alt="Tall Talkual digital banner"><img tabindex="0" role="button" aria-label="Enlarge square Talkual banner" src="assets/adds/talkual-square.webp" alt="Square Talkual digital banner"></div>`:`<img class="adds-main-image" tabindex="0" role="button" aria-label="Enlarge artwork" src="${item.src}" alt="${item.alt}">`;
 function render(next,immediate=false){index=(next+items.length)%items.length;const item=items[index];window.clearTimeout(timer);art.classList.add('is-changing');caption.classList.add('is-changing');
 const change=()=>{art.innerHTML=htmlFor(item);caption.innerHTML=`<span class="adds-kicker">${String(index+1).padStart(2,'0')} / ${item.kind}</span><h2>${item.title}</h2><p>${item.description}</p>`;counter.textContent=`${String(index+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;art.classList.remove('is-changing');caption.classList.remove('is-changing');};timer=window.setTimeout(change,immediate?0:230);}

 const lightbox=document.getElementById('addsLightbox');
 const enlarged=document.getElementById('addsLightboxImage');
 const closeButton=document.getElementById('addsLightboxClose');
 let focusBeforeZoom=null;
 function openZoom(img){
  focusBeforeZoom=document.activeElement;
  enlarged.src=img.currentSrc||img.src;
  enlarged.alt=img.alt||'Enlarged graphic artwork';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.classList.add('adds-zoom-open');
  closeButton.focus();
 }
 function closeZoom(){
  if(!lightbox.classList.contains('is-open'))return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.classList.remove('adds-zoom-open');
  enlarged.removeAttribute('src');
  if(focusBeforeZoom&&focusBeforeZoom.isConnected)focusBeforeZoom.focus();
 }
 // Event delegation works for every image, including after changing slides.
 art.addEventListener('click',e=>{const img=e.target.closest('img');if(img)openZoom(img)});
 art.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('img')){e.preventDefault();openZoom(e.target)}});
 closeButton.addEventListener('click',closeZoom);
 lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeZoom()});
 document.addEventListener('keydown',e=>{if(lightbox.classList.contains('is-open')){
  if(e.key==='Escape'){e.preventDefault();closeZoom()}
  if(e.key==='Tab'){e.preventDefault();closeButton.focus()}
 }});
 document.getElementById('addsNext').addEventListener('click',()=>render(index+1));document.getElementById('addsBack').addEventListener('click',()=>render(index-1));
 document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('is-open')&&document.body.classList.contains('adds-case-body')&&!e.altKey&&!e.ctrlKey&&!e.metaKey&&['ArrowRight','ArrowLeft'].includes(e.key)){const target=e.target;if(target&&/input|textarea|select/i.test(target.tagName))return;render(index+(e.key==='ArrowRight'?1:-1));}});
 let startX=null;art.addEventListener('touchstart',e=>{startX=e.touches[0]?.clientX??null},{passive:true});art.addEventListener('touchend',e=>{if(startX===null)return;const diff=(e.changedTouches[0]?.clientX??startX)-startX;if(Math.abs(diff)>65)render(index+(diff<0?1:-1));startX=null},{passive:true});
 render(0,true);
})();
