/* Falling graphic objects. Independent from the 3D gallery. */
(() => {
  const stage = document.getElementById('curiousStage');
  const layer = document.getElementById('fallingObjects');
  if (!stage || !layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const shapes = ['disc', 'tile', 'ring', 'pill', 'star', 'disc', 'ring', 'tile', 'pill', 'disc', 'star'];
  const pieces = shapes.map((type, index) => {
    const piece = document.createElement('span');
    piece.className = `falling-piece ${type}`;
    const size = [50, 48, 62, 37, 60, 29, 45, 34, 51, 46, 38][index];
    piece.style.width = `${size}px`;
    piece.style.height = `${type === 'pill' ? size * 1.65 : size}px`;
    if (type === 'ring') piece.style.borderWidth = `${Math.max(9, size * .2)}px`;
    layer.append(piece);
    return {piece, size, type};
  });

  let live = false;
  let pointer = 0;
  let lastBurst = 0;
  const active = new Set();
  const runPiece = (item, i, extra = 0) => {
    if (!live) return;
    const rect = layer.getBoundingClientRect();
    if (!rect.height || !rect.width) return;
    const x = rect.width * (.18 + ((i * .217 + extra * .17) % .65));
    const fromY = rect.height * (.30 + ((i * .093) % .17)); // begins behind the title
    const toY = rect.height + 130;
    const drift = (i % 2 ? -1 : 1) * (35 + i * 7) + pointer * 30;
    const spin = (i % 2 ? 1 : -1) * (110 + i * 27);
    const scale = .7 + (i % 5) * .11;
    const el = item.piece;
    el.style.left = `${x}px`;
    el.style.top = '0px';
    el.getAnimations().forEach(a => a.cancel());
    const anim = el.animate([
      {transform:`translate3d(0,${fromY}px,-90px) rotate(0deg) scale(${scale*.65})`,opacity:0,offset:0},
      {transform:`translate3d(${drift*.1}px,${fromY+28}px,0px) rotate(${spin*.09}deg) scale(${scale})`,opacity:1,offset:.17},
      {transform:`translate3d(${drift*.6}px,${(fromY+toY)*.55}px,25px) rotate(${spin*.55}deg) scale(${scale})`,opacity:1,offset:.65},
      {transform:`translate3d(${drift}px,${toY}px,-10px) rotate(${spin}deg) scale(${scale*.92})`,opacity:0,offset:1}
    ],{duration:1700+(i%4)*210,delay:i*125,easing:'cubic-bezier(.35,.05,.65,1)',fill:'both'});
    active.add(anim);
    anim.finished.catch(()=>{}).finally(()=>active.delete(anim));
  };
  const burst = (extra=0) => pieces.forEach((item,i)=>runPiece(item,i,extra));
  const observer = new IntersectionObserver(entries => {
    live = entries[0]?.isIntersecting || false;
    if (live) {burst();lastBurst=performance.now()}
    else {active.forEach(anim=>anim.cancel());active.clear()}
  },{threshold:.18});
  observer.observe(stage);
  stage.addEventListener('pointermove', e=> {
    const r=stage.getBoundingClientRect();
    pointer=(e.clientX-r.left)/r.width-.5;
    if (live && performance.now()-lastBurst>1050) {burst(1);lastBurst=performance.now()}
  },{passive:true});
  stage.addEventListener('pointerenter',()=>{if(live && performance.now()-lastBurst>650){burst(2);lastBurst=performance.now()}});
  // Allow occasional new falls while the section is visible.
  const loop=()=>{if(live && performance.now()-lastBurst>4100){burst(3);lastBurst=performance.now()}requestAnimationFrame(loop)};
  requestAnimationFrame(loop);
})();
