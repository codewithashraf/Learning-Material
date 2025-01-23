import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap, { Expo, Power0 } from 'gsap'

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
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * House
 */
const houseGroup = new THREE.Group();
houseGroup.position.set(-3,0,0)
scene.add(houseGroup)

const houseWall = new THREE.Mesh(
  new THREE.BoxGeometry(4,4,4,4),
  new THREE.MeshStandardMaterial({color: 'red', wireframe: false})
)
houseWall.castShadow = true 
houseWall.position.set(0, 1.5, 0)
houseGroup.add(houseWall)

const houseChat = new THREE.Mesh(
  new THREE.ConeGeometry(3.5,2,4),
  new THREE.MeshStandardMaterial({color: 'skyblue'})
)
houseChat.position.set(0,4.5,0)
houseChat.rotation.y = Math.PI / 4
houseChat.castShadow = true // shadow enable
houseGroup.add(houseChat)

const houseDoor = new THREE.Mesh(
  new THREE.PlaneGeometry(1,2),
  new THREE.MeshStandardMaterial({color: 'brown'})
)
houseDoor.position.set(2.01,1,0)
houseDoor.rotation.y = Math.PI / 2
houseGroup.add(houseDoor)

/* Road Bnai hai */

const road = new THREE.Mesh(
  new THREE.PlaneGeometry(4,18),
  new THREE.MeshStandardMaterial({color: 'black'})
)
road.rotation.x = -Math.PI / 2 
road.position.set(6, 0.01 ,0) 
scene.add(road)

/* tree banaya hai */

//tree group
const treeGroup = new THREE.Group();
treeGroup.position.z = 6
treeGroup.position.x = -1
scene.add(treeGroup)

const treeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3.5, 40);
treeGeometry.computeVertexNormals(); // Alag se call karo

const Wood = new THREE.Mesh(
  treeGeometry,
  new THREE.MeshStandardMaterial({ color: 'green', flatShading: false })
);
Wood.position.y = 1.5
// treeWall.position.set(-1, 2, 5);
treeGroup.add(Wood);


const branch1 = new THREE.Mesh(
  new THREE.ConeGeometry(2,1,5),
  new THREE.MeshStandardMaterial({color: 'green'})
)
branch1.position.y = 2.2

treeGroup.add(branch1)

const branch2 = new THREE.Mesh(
  new THREE.ConeGeometry(1.5, 1.3 ,5),
  new THREE.MeshStandardMaterial({color: 'green'})
)
branch2.position.y = 3

treeGroup.add(branch2)

const branch3 = new THREE.Mesh(
  new THREE.ConeGeometry(1, 1.3 ,9),
  new THREE.MeshStandardMaterial({color: 'green'})
)
branch3.position.y = 3.8

treeGroup.add(branch3)

/* car banaye hai yahan */
const carGroup = new THREE.Group();
carGroup.position.x = 5.3
carGroup.position.z = -8
scene.add(carGroup)

// wheel ka group hai
const wheelGroup = new THREE.Group();
carGroup.add(wheelGroup)

const wheel1 = new THREE.Mesh(
  new THREE.TorusGeometry(.2, .1, 18), 
  new THREE.MeshStandardMaterial({color: 'white', wireframe: false})
)
wheel1.position.y = .3
wheel1.rotation.y = Math.PI / 2 
wheelGroup.add(wheel1)

const wheel2 = new THREE.Mesh(
  new THREE.TorusGeometry(.2, .1, 18), 
  new THREE.MeshStandardMaterial({color: 'white', wireframe: false})
)
wheel2.position.set(1.5, .3, 0)
wheel2.rotation.y = Math.PI / 2 
wheelGroup.add(wheel2)

const wheel3 = new THREE.Mesh(
  new THREE.TorusGeometry(.2, .1, 18), 
  new THREE.MeshStandardMaterial({color: 'white', wireframe: false})
)
wheel3.position.set(0, .3, 2.5)
wheel3.rotation.y = Math.PI / 2 
wheelGroup.add(wheel3)

const wheel4 = new THREE.Mesh(
  new THREE.TorusGeometry(.2, .1, 18), 
  new THREE.MeshStandardMaterial({color: 'white', wireframe: false})
)
wheel4.position.set(1.5, .3, 2.5)
wheel4.rotation.y = Math.PI / 2 
wheelGroup.add(wheel4)

const carBody = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5 , 4 ,4),
  new THREE.MeshStandardMaterial({color: 'blue'})
)
carBody.position.set(.75, 1.1, 1.2)
carGroup.add(carBody)

const carBodyTop = new THREE.Mesh(
  new THREE.BoxGeometry(1,.5, 3, 3),
  new THREE.MeshStandardMaterial({color: 'white'})
)
carBodyTop.position.set(.75 , 2, 1.2)
carGroup.add(carBodyTop)

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: "#a9c388" })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
floor.receiveShadow = true
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 1.5);
moonLight.castShadow = true;
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

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
camera.position.x = 6;
camera.position.y = 4;
camera.position.z = 8;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true

// carGroup.visible = false

carGroup.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;    // Shadow cast karega
    child.receiveShadow = true; // Optional: Shadow receive karega
  }})

/**
 * Animate
 */

//gsap animation

gsap.to(carGroup.position, {
  z: 7,
  duration: 7,
  repeat: -1,
  ease: Power0
})

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
