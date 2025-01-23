import * as THREE from 'three';
import { FontLoader, OrbitControls, TextGeometry } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap


//lights

const ambientLight = new THREE.AmbientLight(0x00ffff, .3)
scene.add(ambientLight)

// const direntionalLight = new THREE.DirectionalLight(0xffffff, 3)
// direntionalLight.position.set(0,2,3)
// scene.add(direntionalLight)

// const HemisphereLight = new THREE.HemisphereLight('blue', 'red', 2)
// HemisphereLight.position.x = 2
// scene.add(HemisphereLight)

// const pointLight = new THREE.PointLight(0x00ffff, 2, 20, 1)
// pointLight.position.set(0,0,0)
// scene.add(pointLight)


//Create a PointLight and turn on shadows for the light
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 2, 3 );
light.castShadow = true; // default false
scene.add( light );

// const lightHelper = new THREE.PointLightHelper(pointLight, 1)
// scene.add(lightHelper)

const fontLoader = new FontLoader()
fontLoader.load('/fonts/helvetiker_bold.typeface.json', 
    (font) => {
        const textGeometry = new TextGeometry(
            'Hello Three JS',
            {
                font: font,
                size: .7,
                depth: .2, 
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: .3,
                bevelSize: .02,
                bevelOffset: 0,
                bevelSegments: 5,
             }
        );
        const textMaterial = new THREE.MeshStandardMaterial({wireframe: false})
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.castShadow = true
        
        textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     -textGeometry.boundingBox.max.x * .5,
        //     -textGeometry.boundingBox.max.y * .5,
        //     -textGeometry.boundingBox.max.z * .5,
        // )
        textGeometry.center()
        console.log(textGeometry.boundingBox)
        scene.add(text)
        // scene.background = new THREE.Color(0x00ff00)
    }
)

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(9,5),
    new THREE.MeshStandardMaterial()
)
ground.rotation.x = -1.5708
ground.position.y = -.5
ground.receiveShadow = true

scene.add(ground)


// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)
const controls = new OrbitControls( camera, renderer.domElement)



camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate)
    renderer.render( scene, camera );
}
animate()





// import * as THREE from 'three';
// import { FontLoader, OrbitControls, TextGeometry } from 'three/examples/jsm/Addons.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// // Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
// scene.add(ambientLight);

// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(1, 1, 2);
// light.castShadow = true;
// scene.add(light);

// // Font Loader
// const fontLoader = new FontLoader();
// fontLoader.load('/fonts/helvetiker_bold.typeface.json', (font) => {
//     const textGeometry = new TextGeometry('Hello Three JS', {
//         font: font,
//         size: 0.7,
//         depth: 0.2,
//         curveSegments: 5,
//         bevelEnabled: true,
//         bevelThickness: 0.3,
//         bevelSize: 0.02,
//         bevelOffset: 0,
//         bevelSegments: 5,
//     });

//     const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
//     const text = new THREE.Mesh(textGeometry, textMaterial);
//     textGeometry.center();

//     text.castShadow = true; // Fix applied here
//     scene.add(text);
// });

// // Ground
// const ground = new THREE.Mesh(
//     new THREE.PlaneGeometry(9, 5),
//     new THREE.MeshStandardMaterial({ color: 0x808080 })
// );
// ground.rotation.x = -Math.PI / 2;
// ground.position.y = -0.5;
// ground.receiveShadow = true;
// scene.add(ground);

// // Controls
// const controls = new OrbitControls(camera, renderer.domElement);

// camera.position.z = 5;

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
// animate();
