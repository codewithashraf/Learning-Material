import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * create geometry
 */
const guiChange = {};
guiChange.count = 100000;
guiChange.size = 0.02;
guiChange.radius = 5;
guiChange.branches = 4;
guiChange.spin = 1;
guiChange.randomness = .2;
guiChange.randomPower = 3;
guiChange.insideColor = '#ff6030';
guiChange.outsideColor = '#1b3984';

// variables declare kare hai
let particleGeometry = null
let particleMaterial = null
let particles = null

const galaxy = () => {
  if(particles !== null){
    particleGeometry.dispose()
    particleMaterial.dispose()
    scene.remove(particles)
  }

  particleGeometry = new THREE.BufferGeometry();
  const position = new Float32Array(guiChange.count * 3);
  const colors = new Float32Array(guiChange.count * 3);

  
  for (let i = 0; i < guiChange.count; i++) {
    const i3 = i * 3
    const radius = Math.random() * guiChange.radius;
    const branchAngle = i % guiChange.branches / guiChange.branches * Math.PI * 2;
    const spinAgle = radius * guiChange.spin

    const randomX = Math.pow(Math.random(), guiChange.randomPower) * (Math.random() < .5 ? 1 : -1);
    const randomY = Math.pow(Math.random(), guiChange.randomPower) * (Math.random() < .5 ? 1 : -1);
    const randomZ = Math.pow(Math.random(), guiChange.randomPower) * (Math.random() < .5 ? 1 : -1);

    position[i3] = Math.cos(branchAngle + spinAgle) *  radius + randomX;
    position[i3 + 1] = randomY;
    position[i3 + 2] = Math.sin(branchAngle + spinAgle) *  radius + randomZ;

    const insideColor = new THREE.Color(guiChange.insideColor)
    const outsideColor = new THREE.Color(guiChange.outsideColor)
    const mixedColor = insideColor.clone()
    mixedColor.lerp(outsideColor, radius / guiChange.radius)

    
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(position, 3)
  );
  particleGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3)
  );

  particleMaterial = new THREE.PointsMaterial({
    // color: 0xffffff,
    size: guiChange.size,
    sizeAttenuation: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    
  });
  particles = new THREE.Points(particleGeometry, particleMaterial);

  scene.add(particles);
};

galaxy()

// star banaye hain
const starGeometry = new THREE.BufferGeometry();
const starPosition = new Float32Array(guiChange.count * 3);

for( let i = 0; i < guiChange.count; i++ ){
  starPosition[i] = Math.random()
}

// lil gui setting banai hai
gui.add(guiChange, 'count').min(100).max(10000).step(100).onFinishChange(galaxy);
gui.add(guiChange, 'size').min(.00001).max(1).step(.0001).onFinishChange(galaxy);
gui.add(guiChange, 'radius').min(.2).max(20).step(.001).onFinishChange(galaxy);
gui.add(guiChange, 'branches').min(4).max(12).step(1).onFinishChange(galaxy);
gui.add(guiChange, 'spin').min(1).max(12).step(1).onFinishChange(galaxy);
gui.add(guiChange, 'randomness').min(.001).max(1).step(.0001).onFinishChange(galaxy);
gui.add(guiChange, 'randomPower').min(1).max(10).step(.01).onFinishChange(galaxy);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

const cameraPosition = {
  x: 0,
  y: 0,
  z: 12,
};

// Set initial camera position
camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

gui.add(cameraPosition, 'x').min(-20).max(20).step(1).onChange((val) => {
  camera.position.x = val; // Update camera position
});
gui.add(cameraPosition, 'y').min(-20).max(20).step(1).onChange((val) => {
  camera.position.y = val; // Update camera position
});
gui.add(cameraPosition, 'z').min(-20).max(20).step(1).onChange((val) => {
  camera.position.z = val; // Update camera position
});

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
