const projects = window.PORTFOLIO_PROJECTS || [];
const id = new URLSearchParams(location.search).get('id');
if (id === 'normal') window.location.replace('index.html#work');
const index = projects.findIndex(project => project.slug === id);
const i = index >= 0 ? index : 0;
const project = projects[i];
const placeholder = 'PENDENT DE REDACTAR — Aquí explicarem aquest apartat amb el contingut real del projecte.';
function put(id, value) { const el=document.getElementById(id); if(el) el.textContent=value || placeholder; }
function setVisual(id, url, fallbackLabel) {
 const el=document.getElementById(id);
 if(!el)return;
 if(url) { const img=document.createElement('img');img.src=url;img.alt=fallbackLabel;img.loading='lazy';el.replaceChildren(img);el.classList.add('has-image'); }
}
if(project){
 document.title=`${project.name} — Cels Campeny`;
 put('detailNumber',`PROJECT ${String(i+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`);
 put('detailTitle',project.name);put('detailSummary',project.description);
 put('detailCategory',project.category);put('detailYear',project.year || 'PER DEFINIR');put('detailRole',project.role || 'PER DEFINIR');
 put('detailCoverNumber',`${String(i+1).padStart(2,'0')} — ${String(projects.length).padStart(2,'0')}`);
 put('detailCoverTitle',project.name);
 const cover=document.getElementById('detailCover');cover.style.background=project.background;cover.style.color=project.textColor || '#ffffff';
 if(project.coverImage){const img=document.createElement('img');img.src=project.coverImage;img.alt=`Portada de ${project.name}`;img.className='case-cover-image';cover.prepend(img);cover.classList.add('has-image');}
 const content=project.caseStudy || {};
 ['challenge','insight','idea','execution','outcome'].forEach(key=>put('detail'+key[0].toUpperCase()+key.slice(1),content[key]));
 setVisual('visualOne',content.imageOne,`Visual principal de ${project.name}`);
 setVisual('visualTwo',content.imageTwo,`Procés de ${project.name}`);
 setVisual('visualThree',content.imageThree,`Resultat de ${project.name}`);
 const prev=projects[(i-1+projects.length)%projects.length],next=projects[(i+1)%projects.length];
 document.getElementById('previousDetail').href=`project.html?id=${encodeURIComponent(prev.slug)}`;
 document.getElementById('nextDetail').href=`project.html?id=${encodeURIComponent(next.slug)}`;
 put('previousName',prev.name);put('nextName',next.name);
}
