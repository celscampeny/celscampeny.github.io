import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';

// Kept separate from script.js, so the gallery and menu are unaffected.
const mount = document.getElementById('aboutOrb');
if (mount) {
  try {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;
    mount.append(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, .1, 100);
    camera.position.set(0, 0, 5.8);
    const geo = new THREE.SphereGeometry(1.65, 88, 64);
    const base = Float32Array.from(geo.attributes.position.array);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xa3ee35, metalness: .04, roughness: .2,
      clearcoat: 1, clearcoatRoughness: .12,
      specularIntensity: 1.2, iridescence: .12
    });
    const orb = new THREE.Mesh(geo, material);
    scene.add(orb);
    scene.add(new THREE.HemisphereLight(0xf2ffcb, 0x0a5b2b, 2.0));
    const key = new THREE.DirectionalLight(0xffffff, 4.5);
    key.position.set(-3, 4, 5); scene.add(key);
    const rim = new THREE.PointLight(0xb9ff65, 55, 12);
    rim.position.set(3, -1, 3); scene.add(rim);

    let hoverX = 0, hoverY = 0, targetX = 0, targetY = 0, force = 0, targetForce = 0;
    let visible = true;
    const center = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const attr = geo.attributes.position;
    const clock = new THREE.Clock();
    const resize = () => {
      const {width, height} = mount.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width/height; camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(mount);
    const io = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? true; }, { threshold: 0 });
    io.observe(mount);
    mount.addEventListener('pointermove', event => {
      const r = mount.getBoundingClientRect();
      targetX = ((event.clientX-r.left)/r.width-.5)*2;
      targetY = -((event.clientY-r.top)/r.height-.5)*2;
      targetForce = .29;
    });
    mount.addEventListener('pointerleave', () => { targetForce = 0; targetX = 0; targetY = 0; });
    mount.classList.add('is-rendering');

    const animate = () => {
      requestAnimationFrame(animate);
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime();
      hoverX += (targetX-hoverX)*.075;
      hoverY += (targetY-hoverY)*.075;
      force += (targetForce-force)*.065;
      orb.rotation.y += reduced ? 0 : .002;
      orb.rotation.x += ((hoverY*.13)-orb.rotation.x)*.03;
      const px = base;
      direction.set(hoverX*.98, hoverY*.98, 1.25).normalize();
      for (let i=0; i<attr.count; i++) {
        const j=i*3;
        normal.set(px[j],px[j+1],px[j+2]).normalize();
        const dot = Math.max(0, normal.dot(direction));
        const dent = force * Math.pow(dot, 7);
        const breath = reduced ? 0 : .018*Math.sin(t*1.35 + normal.x*4.2 + normal.y*3.1);
        const radius = 1 - dent + breath;
        attr.setXYZ(i,px[j]*radius,px[j+1]*radius,px[j+2]*radius);
      }
      attr.needsUpdate = true;
      geo.computeVertexNormals();
      orb.position.y = reduced ? 0 : .045*Math.sin(t*.85);
      renderer.render(scene,camera);
    };
    animate();
  } catch (err) {
    console.warn('3D orb could not initialize; showing decorative fallback.',err);
  }
}
