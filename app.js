/* =========================================================
   XYROX OS — UNIVERSAL SHELL & 3-SCENE 3D ENGINE (app.js)
   - Works smoothly like butter across iPad, iPhone, Android,
     Tablet, Laptop, and Desktop PC
   - Top-Left 3-Line Menu Button + Sleek XYROX Emblem
   - Universal Bottom Quick Dock + Slide-Out Channels Drawer
   - 3 Custom Big-Tech 3D Interactive Environments:
     1. 01 // GRID   (Linear / Vercel Architectural Horizon + Pulse)
     2. 02 // ORBIT  (Fibonacci Spiral Particle Rings)
     3. 03 // MATRIX (Isometric Harmonic Silk Dot-Matrix Relief)
   ========================================================= */

let current3DMode = localStorage.getItem('xyrox_3d_scene') || 'horizon';
let switch3DSceneFn = null;

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('dark');
  document.body.classList.add('xyrox-os-ready');
  document.body.style.backgroundColor = '#050507';

  injectUniversalOSShell();
  initThreeJS3DEngine();
});

function getCurrentPageName() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return path === '' ? 'index.html' : path;
}

function injectUniversalOSShell() {
  if (document.getElementById('xyroxUniversalHeader')) return;

  const currentPage = getCurrentPageName();

  const channels = [
    {
      id: '01',
      name: 'Command',
      desc: 'Focus Timer & Objectives',
      href: 'index.html',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>'
    },
    {
      id: '02',
      name: 'Audio',
      desc: 'NCS Tracks & 8-Ch Mixer',
      href: 'audio.html',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>'
    },
    {
      id: '03',
      name: 'Calc',
      desc: 'Precision Math & Tape',
      href: 'calculator.html',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>'
    },
    {
      id: '04',
      name: 'Chat',
      desc: 'Global Room & Discord',
      href: 'chat.html',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>'
    },
    {
      id: '05',
      name: 'AI Core',
      desc: 'Neural Command Shell',
      href: 'ai.html',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M13 10V3L4 14h7v7l9-11h-7z"/>'
    },
    {
      id: '06',
      name: 'Account',
      desc: 'Google Sign-In & Profile',
      href: 'settings.html',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>'
    }
  ];

  // 1. Universal Top Command Bar
  const header = document.createElement('header');
  header.id = 'xyroxUniversalHeader';
  header.innerHTML = `
    <div class="flex items-center gap-3">
      <!-- Left 3-Line Menu Trigger (Always visible on iPad, iPhone, PC) -->
      <button id="xyroxMenuTrigger" class="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.07] hover:bg-white/[0.15] border border-white/10 text-white transition active:scale-95" title="Open Channels Menu">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M4 12h16M4 18h11"></path>
        </svg>
      </button>

      <!-- Sleek Minimalist XYROX Brand Emblem -->
      <a href="index.html" class="flex items-center gap-2.5 text-white no-underline group">
        <div class="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.25)] group-hover:scale-105 transition">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 22 20 2 20"></polygon>
          </svg>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="font-semibold tracking-tight text-sm text-white">XYROX</span>
          <span class="text-[10px] font-mono text-gray-300 uppercase px-1.5 py-0.5 rounded-md bg-white/[0.07] border border-white/10">OS</span>
        </div>
      </a>
    </div>

    <!-- Center: Live 3D Environment Switcher -->
    <div class="hidden sm:flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/10">
      <button data-scene="horizon" class="xy-scene-btn px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition">01 // Grid</button>
      <button data-scene="orbital" class="xy-scene-btn px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition">02 // Orbit</button>
      <button data-scene="monolith" class="xy-scene-btn px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition">03 // Matrix</button>
    </div>

    <!-- Right: Google Sign-In / Profile Slot (Populated by auth.js) -->
    <div id="xyroxTopAuthWidget" class="flex items-center gap-2"></div>
  `;
  document.body.prepend(header);

  // 2. Universal Left Slide-Over Channels Drawer
  const backdrop = document.createElement('div');
  backdrop.id = 'xyroxUniversalDrawerBackdrop';
  document.body.appendChild(backdrop);

  const drawer = document.createElement('div');
  drawer.id = 'xyroxUniversalDrawer';
  drawer.innerHTML = `
    <div class="space-y-6 overflow-y-auto pr-1">
      <div class="flex items-center justify-between border-b border-white/10 pb-4">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 22 20 2 20"></polygon></svg>
          </div>
          <div>
            <div class="text-sm font-semibold text-white leading-none">XYROX OS</div>
            <div class="text-[10px] font-mono text-gray-500 mt-1">Universal Workspace</div>
          </div>
        </div>
        <button id="xyroxDrawerClose" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center border border-white/10">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Channels List -->
      <div class="space-y-1.5">
        <div class="px-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-gray-500">System Channels</div>
        ${channels.map(ch => {
          const active = currentPage === ch.href;
          return `
            <a href="${ch.href}" class="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
              active
                ? 'bg-white text-black font-semibold shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/[0.06]'
            }">
              <div class="flex items-center gap-3">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">${ch.icon}</svg>
                <div>
                  <div class="leading-tight">${ch.name}</div>
                  <div class="text-[10px] ${active ? 'text-black/60' : 'text-gray-500'} font-normal">${ch.desc}</div>
                </div>
              </div>
              <span class="text-[10px] font-mono ${active ? 'text-black/70' : 'text-gray-500'}">${ch.id}</span>
            </a>
          `;
        }).join('')}
      </div>

      <!-- 3D Background Switcher inside Drawer (Great for phones/portrait tablets) -->
      <div class="space-y-2 pt-3 border-t border-white/10">
        <div class="px-2 text-[10px] font-mono uppercase tracking-widest text-gray-500">3D Environment Engine</div>
        <div class="grid grid-cols-3 gap-1.5">
          <button data-scene="horizon" class="xy-scene-btn py-2 rounded-lg text-[10px] font-mono uppercase border border-white/10 transition">01 Grid</button>
          <button data-scene="orbital" class="xy-scene-btn py-2 rounded-lg text-[10px] font-mono uppercase border border-white/10 transition">02 Orbit</button>
          <button data-scene="monolith" class="xy-scene-btn py-2 rounded-lg text-[10px] font-mono uppercase border border-white/10 transition">03 Matrix</button>
        </div>
      </div>
    </div>

    <div class="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-500">
      <span>xyrox6789</span>
      <span class="text-white/70">OS v3.2</span>
    </div>
  `;
  document.body.appendChild(drawer);

  // 3. Universal Floating Bottom Dock (Available on iPad, iPhone, Laptop & PC)
  const dock = document.createElement('nav');
  dock.id = 'xyroxBottomDock';
  dock.innerHTML = channels.map(ch => {
    const active = currentPage === ch.href;
    return `
      <a href="${ch.href}" class="xy-dock-item flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-medium whitespace-nowrap ${
        active
          ? 'bg-white text-black font-semibold shadow-md'
          : 'text-gray-400 hover:text-white hover:bg-white/[0.08]'
      }">
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">${ch.icon}</svg>
        <span class="tracking-tight">${ch.name}</span>
      </a>
    `;
  }).join('');
  document.body.appendChild(dock);

  // Drawer Open / Close Logic
  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
  };
  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
  };

  document.getElementById('xyroxMenuTrigger').addEventListener('click', openDrawer);
  document.getElementById('xyroxDrawerClose').addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Scene Switcher Button Sync
  function syncSceneButtons() {
    document.querySelectorAll('.xy-scene-btn').forEach(btn => {
      const s = btn.getAttribute('data-scene');
      if (s === current3DMode) {
        btn.className = 'xy-scene-btn px-2.5 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider bg-white text-black font-semibold transition shadow';
      } else {
        btn.className = 'xy-scene-btn px-2.5 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider text-gray-400 hover:text-white bg-white/[0.04] border border-white/5 transition';
      }
    });
  }

  document.querySelectorAll('.xy-scene-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      current3DMode = btn.getAttribute('data-scene');
      localStorage.setItem('xyrox_3d_scene', current3DMode);
      syncSceneButtons();
      if (typeof switch3DSceneFn === 'function') {
        switch3DSceneFn(current3DMode);
      }
    });
  });

  syncSceneButtons();
}

/* =========================================================
   3-SCENE ARCHITECTURAL 3D WEBGL ENGINE (Zero AI Clichés)
   ========================================================= */
function initThreeJS3DEngine() {
  if (typeof THREE === 'undefined') return;

  let container = document.getElementById('webgl-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'webgl-container';
    document.body.prepend(container);
  }
  container.innerHTML = '';

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050507, 0.038);

  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3.2, 15);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const stageGroup = new THREE.Group();
  scene.add(stageGroup);

  // =========================================================
  // SCENE 1: 01 // GRID (Linear / Vercel Architectural Horizon)
  // =========================================================
  const horizonGroup = new THREE.Group();

  // Floor & Ceiling Perspective Architectural Grids
  const floorGrid = new THREE.GridHelper(60, 60, 0xffffff, 0x334155);
  floorGrid.position.y = -3.6;
  floorGrid.material.transparent = true;
  floorGrid.material.opacity = 0.22;
  horizonGroup.add(floorGrid);

  const ceilingGrid = new THREE.GridHelper(60, 40, 0x94a3b8, 0x1e293b);
  ceilingGrid.position.y = 7.5;
  ceilingGrid.material.transparent = true;
  ceilingGrid.material.opacity = 0.09;
  horizonGroup.add(ceilingGrid);

  // Sweeping Horizon Scanner Beam
  const beamGeo = new THREE.PlaneGeometry(60, 0.35);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide
  });
  const scannerBeam = new THREE.Mesh(beamGeo, beamMat);
  scannerBeam.rotation.x = Math.PI / 2;
  scannerBeam.position.y = -3.58;
  horizonGroup.add(scannerBeam);

  // Suspended Micro-Nodes in the Horizon Corridor
  const hNodeCount = 320;
  const hNodeGeo = new THREE.BufferGeometry();
  const hNodePos = new Float32Array(hNodeCount * 3);
  for (let i = 0; i < hNodeCount; i++) {
    hNodePos[i * 3] = (Math.random() - 0.5) * 42;
    hNodePos[i * 3 + 1] = -3.2 + Math.random() * 10;
    hNodePos[i * 3 + 2] = (Math.random() - 0.5) * 42;
  }
  hNodeGeo.setAttribute('position', new THREE.BufferAttribute(hNodePos, 3));
  const hNodeMat = new THREE.PointsMaterial({
    color: 0xf8fafc,
    size: 0.05,
    transparent: true,
    opacity: 0.5
  });
  const hNodes = new THREE.Points(hNodeGeo, hNodeMat);
  horizonGroup.add(hNodes);

  // =========================================================
  // SCENE 2: 02 // ORBIT (Fibonacci Golden-Ratio Gravity Field)
  // =========================================================
  const orbitalGroup = new THREE.Group();
  const orbitParticleCount = 2400;
  const orbitGeo = new THREE.BufferGeometry();
  const orbitPositions = new Float32Array(orbitParticleCount * 3);
  const orbitRadii = new Float32Array(orbitParticleCount);
  const orbitAngles = new Float32Array(orbitParticleCount);
  const orbitSpeeds = new Float32Array(orbitParticleCount);
  const orbitYOffsets = new Float32Array(orbitParticleCount);

  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < orbitParticleCount; i++) {
    const r = 1.4 + Math.sqrt(i / orbitParticleCount) * 12.5;
    const theta = i * goldenAngle;
    orbitRadii[i] = r;
    orbitAngles[i] = theta;
    orbitSpeeds[i] = 0.0015 + (1 / (r + 1)) * 0.008;
    orbitYOffsets[i] = (Math.random() - 0.5) * 0.45 * (1 - r / 16);

    orbitPositions[i * 3] = Math.cos(theta) * r;
    orbitPositions[i * 3 + 1] = orbitYOffsets[i];
    orbitPositions[i * 3 + 2] = Math.sin(theta) * r;
  }
  orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPositions, 3));
  const orbitMat = new THREE.PointsMaterial({
    color: 0xe2e8f0,
    size: 0.042,
    transparent: true,
    opacity: 0.65
  });
  const orbitCloud = new THREE.Points(orbitGeo, orbitMat);
  orbitCloud.rotation.x = 0.48;
  orbitCloud.rotation.z = -0.15;
  orbitalGroup.add(orbitCloud);

  // =========================================================
  // SCENE 3: 03 // MATRIX (Isometric Silk Dot-Matrix Relief)
  // =========================================================
  const monolithGroup = new THREE.Group();
  const matCols = 52;
  const matRows = 52;
  const matCount = matCols * matRows;
  const matGeo = new THREE.BufferGeometry();
  const matPos = new Float32Array(matCount * 3);

  let mIdx = 0;
  for (let ix = 0; ix < matCols; ix++) {
    for (let iz = 0; iz < matRows; iz++) {
      matPos[mIdx * 3] = (ix - matCols / 2) * 0.58;
      matPos[mIdx * 3 + 1] = -2.2;
      matPos[mIdx * 3 + 2] = (iz - matRows / 2) * 0.58;
      mIdx++;
    }
  }
  matGeo.setAttribute('position', new THREE.BufferAttribute(matPos, 3));
  const matPoints = new THREE.Points(
    matGeo,
    new THREE.PointsMaterial({
      color: 0xf1f5f9,
      size: 0.048,
      transparent: true,
      opacity: 0.6
    })
  );
  matPoints.rotation.y = Math.PI / 4; // Isometric diamond orientation
  monolithGroup.add(matPoints);

  stageGroup.add(horizonGroup);
  stageGroup.add(orbitalGroup);
  stageGroup.add(monolithGroup);

  switch3DSceneFn = (mode) => {
    horizonGroup.visible = mode === 'horizon';
    orbitalGroup.visible = mode === 'orbital';
    monolithGroup.visible = mode === 'monolith';
  };
  switch3DSceneFn(current3DMode);

  // Smooth Damped Pointer & Touch Parallax
  let targetX = 0;
  let targetY = 0;
  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 0.75;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.55;
  });
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 0.75;
      targetY = (e.touches[0].clientY / window.innerHeight - 0.5) * 0.55;
    }
  }, { passive: true });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.016;

    // Animate 01 // GRID
    if (horizonGroup.visible) {
      floorGrid.position.z = (t * 2.5) % 1;
      ceilingGrid.position.z = (t * 1.25) % 1.5;
      scannerBeam.position.z = -22 + ((t * 9) % 38);
      hNodes.rotation.y = Math.sin(t * 0.15) * 0.08;
    }

    // Animate 02 // ORBIT
    if (orbitalGroup.visible) {
      const posAttr = orbitGeo.attributes.position;
      const arr = posAttr.array;
      for (let i = 0; i < orbitParticleCount; i++) {
        orbitAngles[i] += orbitSpeeds[i];
        const r = orbitRadii[i];
        const a = orbitAngles[i];
        arr[i * 3] = Math.cos(a) * r;
        arr[i * 3 + 1] = orbitYOffsets[i] + Math.sin(t * 1.5 + r * 0.6) * 0.18;
        arr[i * 3 + 2] = Math.sin(a) * r;
      }
      posAttr.needsUpdate = true;
    }

    // Animate 03 // MATRIX
    if (monolithGroup.visible) {
      const posAttr = matGeo.attributes.position;
      const arr = posAttr.array;
      let i = 0;
      for (let ix = 0; ix < matCols; ix++) {
        for (let iz = 0; iz < matRows; iz++) {
          const dx = ix - matCols / 2;
          const dz = iz - matRows / 2;
          const dist = Math.sqrt(dx * dx + dz * dz);
          const elevation =
            Math.sin(dist * 0.32 - t * 2.1) * 0.55 +
            Math.cos(ix * 0.22 + t * 1.1) * 0.25;
          arr[i * 3 + 1] = -2.4 + elevation;
          i++;
        }
      }
      posAttr.needsUpdate = true;
    }

    // Spring-damped camera parallax
    stageGroup.rotation.y += (targetX - stageGroup.rotation.y) * 0.045;
    stageGroup.rotation.x += (targetY - stageGroup.rotation.x) * 0.045;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
