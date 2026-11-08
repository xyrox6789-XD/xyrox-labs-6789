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
    camera.position.z = 18;
    camera.position.x = 0; // Centered
    camera.position.y = 2; // Slightly elevated
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Elite Vercel/GitHub Style Point Globe (No cheap wireframes)
    const geometry = new THREE.SphereGeometry(7, 64, 64);
    
    // Extract only a fraction of vertices for a highly minimal, elegant look
    const positionAttribute = geometry.getAttribute('position');
    const vertexCount = positionAttribute.count;
    const newPositions = [];
    
    for (let i = 0; i < vertexCount; i += 3) {
        newPositions.push(
            positionAttribute.getX(i),
            positionAttribute.getY(i),
            positionAttribute.getZ(i)
        );
    }
    
    const minimalGeo = new THREE.BufferGeometry();
    minimalGeo.setAttribute('position', new THREE.Float32BufferAttribute(newPositions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffffff, // Pure white points
        size: 0.03, // Very fine dots
        transparent: true,
        opacity: 0.25, // Subtle and professional
        blending: THREE.AdditiveBlending
    });
    const globe = new THREE.Points(minimalGeo, material);
    
    // Tilt the globe slightly for a premium aesthetic
    globe.rotation.z = 0.2;
    globe.rotation.x = 0.2;
    scene.add(globe);

    // Subtle Floating Ambient Dust
    const dustGeo = new THREE.BufferGeometry();
    const dustCount = 300;
    const dustPos = new Float32Array(dustCount * 3);
    for(let i=0; i < dustCount * 3; i++) {
        dustPos[i] = (Math.random() - 0.5) * 40;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({ 
        size: 0.02, 
        color: 0x8892b0, 
        transparent: true, 
        opacity: 0.3 
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Smooth Animation Loop
    const animate = function () {
        requestAnimationFrame(animate);
        // Ultra-slow, elegant rotation
        globe.rotation.y += 0.0005;
        dust.rotation.y -= 0.0002;
        dust.rotation.x += 0.0001;
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
