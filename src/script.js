import './style.css';
import * as dat from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/**
 * Spector JS
 */
// const SPECTOR = require("spectorjs");

// const spector = new SPECTOR.Spector();
// spector.displayUI();

/**
 * Base
 */
// Debug
// const debugObject = {}
// const gui = new dat.GUI({
//     width: 400
// })
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Light
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, .2, 100, 2)
// pointLight.position.set( 0, -20, 10 );
// pointLight.castShadow = true;

// scene.add(pointLight)

/**
 * Material
 */

/**
 * Model
 */

// let beefAMesh;
// let beefBMesh;
// let beefCMesh;
// let beefDMesh;

gltfLoader.load(
    'loosun.glb',
    (gltf) => {
        console.log(gltf.scene.children)
        scene.add(gltf.scene)

        // // Get each object
        // const lightAMesh = gltf.scene.children.find((child) => child.name === 'lightA')
        // const lightBMesh = gltf.scene.children.find((child) => child.name === 'lightB')
        // const lightCMesh = gltf.scene.children.find((child) => child.name === 'lightC')
        // const lightDMesh = gltf.scene.children.find((child) => child.name === 'lightD')

        // beefAMesh = gltf.scene.children.find((child) => child.name === 'beefA')
        // beefBMesh = gltf.scene.children.find((child) => child.name === 'beefB')
        // beefCMesh = gltf.scene.children.find((child) => child.name === 'beefC')
        // beefDMesh = gltf.scene.children.find((child) => child.name === 'beefD')

        // lightAMesh.material = poleLightMaterial
        // lightBMesh.material = poleLightMaterial
        // lightCMesh.material = poleLightMaterial
        // lightDMesh.material = poleLightMaterial
    }
);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 3;
camera.position.y = 2;
camera.position.z = 0;
// camera.lookAt(new THREE.Vector3(0, 0, 0))
camera.lookAt(0, 0, 0);

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

const environment = new RoomEnvironment();
const pmremGenerator = new THREE.PMREMGenerator( renderer );

// scene.background = new THREE.Color( 0x000000 );
scene.environment = pmremGenerator.fromScene(environment).texture;

// debugObject.clearColor = '#FF0000'
// gui.addColor(debugObject, 'clearColor')

/**
 * Post processing
 */
const effectComposer = new EffectComposer(renderer);
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
effectComposer.setSize(sizes.width, sizes.height);

const renderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);

const unrealBloomPass = new UnrealBloomPass();
effectComposer.addPass(unrealBloomPass);

unrealBloomPass.strength = 1;
unrealBloomPass.radius = 1.3;
unrealBloomPass.threshold = 0.7;

// gui.add(unrealBloomPass, 'enabled');
// gui.add(unrealBloomPass, 'strength').min(0).max(2).step(0.001);
// gui.add(unrealBloomPass, 'radius').min(0).max(2).step(0.001);
// gui.add(unrealBloomPass, 'threshold').min(0).max(1).step(0.001);
// gui.add(poleLightMaterial, 'roughness').min(0).max(1).step(0.001);
// gui.add(poleLightMaterial, 'metalness').min(0).max(1).step(0.001);



/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // beefAMesh.rotation.y += 0.01 * deltaTime
    // if(beefAMesh) beefAMesh.rotation.y += 0.01 * deltaTime

    // Update controls
    controls.update()

    // Render
    // renderer.render(scene, camera)
    effectComposer.render()


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

};

tick();