/* =========================================================
   XYROX-UTILITIES — MASTER 3D ENGINE (app.js)
   Renders the interactive Three.js 3D background and 3D UI
   depth across all pages.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Force dark background so no page ever flashes white
  document.documentElement.classList.add('dark');
  document.body.style.backgroundColor = '#060608';
  document.body.style.color = '#e5e7eb';

  initGlobal3DBackground();
  init3DCardDepth();
});

function initGlobal3DBackground() {
  if (typeof THREE === 'undefined') return;

  let container = document.getElementById('webgl-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'webgl-container';
    document.body.prepend(container);
  }

  // Clear any old canvas and force full visibility
  container.innerHTML = '';
  container.style.opacity = '1';

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x060608, 0.035);

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.5, 16);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Main 3D Group that reacts to touch and mouse
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // 1. Outer 3D Geodesic Wireframe Sphere
  const wireGeo = new THREE.IcosahedronGeometry(5.2, 2);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x64748b,
    wireframe: true,
    transparent: true,
    opacity: 0.22
  });
  const wireGlobe = new THREE.Mesh(wireGeo, wireMat);
  mainGroup.add(wireGlobe);

  // 2. Inner High-Density 3D Particle Core
  const coreGeo = new THREE.SphereGeometry(4.6, 48, 48);
  const coreMat = new THREE.PointsMaterial({
    color: 0xe2e8f0,
    size: 0.045,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending
  });
  const corePoints = new THREE.Points(coreGeo, coreMat);
  mainGroup.add(corePoints);

  // 3. 3D Tilted Orbital Ring
  const ringGeo = new THREE.TorusGeometry(7.4, 0.02, 16, 120);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.28
  });
  const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
  orbitalRing.rotation.x = Math.PI / 2.3;
  orbitalRing.rotation.y = 0.35;
  mainGroup.add(orbitalRing);

  // 4. Secondary Counter-Rotating Ring
  const ringGeo2 = new THREE.TorusGeometry(8.6, 0.015, 16, 120);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0x818cf8,
    transparent: true,
    opacity: 0.16
  });
  const orbitalRing2 = new THREE.Mesh(ringGeo2, ringMat2);
  orbitalRing2.rotation.x = Math.PI / 1.7;
  orbitalRing2.rotation.y = -0.4;
  mainGroup.add(orbitalRing2);

  // 5. 3D Architectural Horizon Grid (Gives true 3D room depth)
  const gridHelper = new THREE.GridHelper(60, 40, 0x334155, 0x1e293b);
  gridHelper.position.y = -6.5;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.25;
  scene.add(gridHelper);

  // 6. Floating 3D Starfield Particles in Deep Space
  const starGeo = new THREE.BufferGeometry();
  const starCount = 450;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    starPos[i] = (Math.random() - 0.5) * 45;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0x94a3b8,
    size: 0.04,
    transparent: true,
    opacity: 0.4
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // Interactive Mouse & Touch 3D Parallax
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 1.2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 1.2;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 1.2;
      targetY = (e.touches[0].clientY / window.innerHeight - 0.5) * 1.2;
    }
  }, { passive: true });

  // Smooth 60FPS 3D Animation Loop
  let clock = 0;
  function animate() {
    requestAnimationFrame(animate);
    clock += 0.008;

    // Rotate 3D objects
    wireGlobe.rotation.y += 0.0022;
    wireGlobe.rotation.x += 0.0008;

    corePoints.rotation.y -= 0.0015;
    orbitalRing.rotation.z += 0.003;
    orbitalRing2.rotation.z -= 0.002;

    // Subtle breathing pulse on the 3D core
    const scale = 1 + Math.sin(clock) * 0.025;
    corePoints.scale.set(scale, scale, scale);

    // Move horizon grid gently forward for 3D motion feel
    gridHelper.position.z = (clock * 2) % 1.5;

    // Smoothly tilt entire 3D group toward user's finger/mouse
    mainGroup.rotation.y += (targetX - mainGroup.rotation.y) * 0.05;
    mainGroup.rotation.x += (targetY - mainGroup.rotation.x) * 0.05;

    stars.rotation.y += 0.0004;

    renderer.render(scene, camera);
  }
  animate();

  // Responsive Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Adds subtle 3D tilt physics to glass cards on desktop/tablet
function init3DCardDepth() {
  const cards = document.querySelectorAll('.bg-xyrox-panel, .xy-card');
  cards.forEach((card) => {
    if (card.tagName.toLowerCase() === 'aside') return; // Keep sidebar steady

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -2.5;
      const rotateY = ((x - centerX) / centerX) * 2.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
}
