/* 
  ================================================
  XYROX-UTILITIES MASTER ENGINE (app.js)
  ================================================
  This script powers the 3D background globally.
  By putting it here, we don't have to copy-paste 
  this massive code into every single HTML file.
*/

document.addEventListener('DOMContentLoaded', () => {
    initGlobal3DBackground();
});

function initGlobal3DBackground() {
    const container = document.getElementById('webgl-container');
    
    // If there is no container or if a canvas already exists (from an inline script), skip.
    if (!container || container.querySelector('canvas')) return;

    const scene = new THREE.Scene();
    
    // Professional Camera Setup
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    camera.position.x = 8;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Elite Vercel/GitHub Style Wireframe Sphere
    const geometry = new THREE.SphereGeometry(6, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0x8888aa, // Brighter metallic color
        wireframe: true,
        transparent: true,
        opacity: 0.35 // Increased opacity so it pops
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Subtle Floating Particles
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 400;
    const posArray = new Float32Array(particleCount * 3);
    for(let i=0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 30;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({ size: 0.04, color: 0xffffff, transparent: true, opacity: 0.6 }); // Larger and brighter particles
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Smooth Animation Loop
    const animate = function () {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.001;
        globe.rotation.x += 0.0005;
        particles.rotation.y -= 0.0005;
        renderer.render(scene, camera);
    };
    animate();

    // Handle Window Resizing smoothly
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
