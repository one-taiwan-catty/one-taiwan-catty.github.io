import * as dat from 'lil-gui'
import * as THREE from 'three';
import { MapControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { DRACOLoader } from 'DRACOLoader';
import { RoomEnvironment } from 'RoomEnvironment';
import { EffectComposer } from 'EffectComposer';
import { RenderPass } from 'RenderPass';
import { UnrealBloomPass } from 'UnrealBloomPass';
import { Material } from 'three';
// import gsap from 'gsap';
// import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let camera, controls, raycaster, mouse;
let model;
let stands;
let porkStand, vegStand, fruitStand, fishStand, beefStand, chickenStand;
let frustumSize,aspect;


const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
const gui = new dat.GUI()
// const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene();

/* -------------------------------------------------------------
 * Loaders
------------------------------------------------------------- */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/dist/draco/");

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

function init() {
    /* -------------------------------------------------------------
     * Light
    ------------------------------------------------------------- */
    const directionalLight = new THREE.DirectionalLight(0xffffff, .1);
    
    directionalLight.position.set(18, 18, -18);
    directionalLight.castShadow = true;
    
    const d = 8;
    directionalLight.shadow.camera.left = - d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = - d;
    directionalLight.shadow.camera.fov = 45;
    directionalLight.shadow.camera.aspect = 1;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.bias = -0.0001;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    
    scene.add(directionalLight);
    
    /* -------------------------------------------------------------
     * Material
    ------------------------------------------------------------- */
    // Pole light material
    // const poleLightMaterial = new THREE.MeshStandardMaterial({
    //     color: 0xFF6070,
    //     emissive: 0xFF6070,
    //     // specular: 0xffffff,
    //     // shininess: 1,
    //     emissiveIntensity: 0.1,
    //     roughness: 0.3,
    //     metalness: 1
    // })
    /* -------------------------------------------------------------
     * Camera
    ------------------------------------------------------------- */
    frustumSize = 4.5;
    aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
    camera.position.set( - 160, 100, 170 );
    gui.add(camera.position, 'x').min(-300).max(300).step(1);
    gui.add(camera.position, 'y').min(-300).max(300).step(1);
    gui.add(camera.position, 'z').min(-300).max(300).step(1);

    camera.zoom = 1;
    scene.add(camera);

    const helper = new THREE.CameraHelper( camera );
    scene.add( helper );

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2()

    /* -------------------------------------------------------------
     * Model
    ------------------------------------------------------------- */
    gltfLoader.load(
        '/dist/model/market.glb',
        (gltf) => {
            model = gltf.scene;
            // model.scale.set(0.5, 0.5, 0.5);
    
            // // Get each model
            console.log(model.children);
            porkStand = gltf.scene.children.find((child) => child.name === 'porkStand')
            vegStand = gltf.scene.children.find((child) => child.name === 'vegStand')
            fruitStand = gltf.scene.children.find((child) => child.name === 'fruitStand')
            fishStand = gltf.scene.children.find((child) => child.name === 'fishStand')
            beefStand = gltf.scene.children.find((child) => child.name === 'beefStand')
            chickenStand = gltf.scene.children.find((child) => child.name === 'chickenStand')

            console.log(porkStand);
    
            stands = new THREE.Group();
            stands.add(porkStand, vegStand, fruitStand, fishStand, beefStand, chickenStand)
            console.log(stands)
    
            stands.traverse(function (children) {
                if (children.isMesh) {
                    children.castShadow = true;
                    children.receiveShadow = true;
                }
            });
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
    
            model.traverse(function (children) {
                if (children.isLight) {
                    children.shadow.camera.near = 0.001;
                    children.shadow.camera.updateProjectionMatrix();
                }
                if (children.isMesh) {
                    children.castShadow = true;
                    children.receiveShadow = true;
                }
            });
            scene.add(model,stands);
    
        }
    );


    /* -------------------------------------------------------------
     * Controls
    ------------------------------------------------------------- */
    controls = new MapControls(camera, canvas);
    controls.enableDamping = true;
    // controls.enableZoom = false;
    controls.enableRotate = false;

    renderer.domElement.addEventListener('click', onClick, false);

};

/* -------------------------------------------------------------
 * Sizes
------------------------------------------------------------- */
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


/* -------------------------------------------------------------
* RAYCASTER
------------------------------------------------------------- */
function onClick() {
    
    event.preventDefault();
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObjects(stands.children, true);
    
    const zoomInTimeline = (x, y, z, zoomOutFactor = 0) => {
        let tl = gsap
		.timeline({ defaults: { duration: 2, ease: "expo.out" } })
        .to(controls.target, { x, y, z })
		.to(camera.position, { x: x - 3, y: y + 3 , z: z + 20 }, 0)
        // .to(stands.rotation, { x: 0, y: 0 }, 0)
    };
    
    const zoom = 2;
    if (intersects.length > 0) {
        console.log('Intersection:', intersects[0].object.parent.name);
    }
    if (intersects[0].object.parent.name === 'porkStand') {
        console.log('porkStand');
        zoomInTimeline(porkStand.position.x, porkStand.position.y, porkStand.position.z, .1);
        camera.zoom = zoom;
        camera.updateProjectionMatrix();

    }
    if (intersects[0].object.parent.name === 'beefStand') {
        zoomInTimeline(beefStand.position.x, beefStand.position.y, beefStand.position.z, .1);
        camera.zoom = zoom;
        camera.updateProjectionMatrix();
    }
    if (intersects[0].object.parent.name === 'fishStand') {
        console.log('fishStand');
        zoomInTimeline(fishStand.position.x , fishStand.position.y, fishStand.position.z, .1);
        camera.zoom = zoom;
        camera.updateProjectionMatrix();

    }
    if (intersects[0].object.parent.name === 'fruitStand') {
        console.log('fruitStand');
        zoomInTimeline(fruitStand.position.x , fruitStand.position.y, fruitStand.position.z, .1);
        camera.zoom = zoom;
        camera.updateProjectionMatrix();
        
    }
    if (intersects[0].object.parent.name === 'vegStand') {
        console.log('vegStand');
        zoomInTimeline(vegStand.position.x , vegStand.position.y, vegStand.position.z, .1);
        camera.zoom = zoom;
        camera.updateProjectionMatrix();
    }
    if (intersects[0].object.parent.name === 'chickenStand') {
        console.log('chickenStand');
        zoomInTimeline(chickenStand.position.x , chickenStand.position.y, chickenStand.position.z, .1);
        camera.zoom = zoom;
        camera.updateProjectionMatrix();
    }

}


/* -------------------------------------------------------------
 * Renderer
------------------------------------------------------------- */

renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.autoUpdate = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.receiveShadow = true;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearAlpha(0);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

const environment = new RoomEnvironment();
const pmremGenerator = new THREE.PMREMGenerator( renderer );
pmremGenerator.compileEquirectangularShader();

scene.environment = pmremGenerator.fromScene(environment).texture;

/* -------------------------------------------------------------
 * Cursor
------------------------------------------------------------- */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

/* -------------------------------------------------------------
 * Post processing
------------------------------------------------------------- */
// const effectComposer = new EffectComposer(renderer);
// effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// effectComposer.setSize(sizes.width, sizes.height);

// const renderPass = new RenderPass(scene, camera);
// effectComposer.addPass(renderPass);

// const unrealBloomPass = new UnrealBloomPass();
// effectComposer.addPass(unrealBloomPass);

// unrealBloomPass.strength = 0.5;
// unrealBloomPass.radius = 0.1;
// unrealBloomPass.threshold = 0.7;

// gui.add(unrealBloomPass, 'enabled');
// gui.add(unrealBloomPass, 'strength').min(0).max(2).step(0.001);
// gui.add(unrealBloomPass, 'radius').min(0).max(2).step(0.001);
// gui.add(unrealBloomPass, 'threshold').min(0).max(1).step(0.001);
init();

/* -------------------------------------------------------------
 * Animate
------------------------------------------------------------- */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // if (object) object.rotation.y = elapsedTime * 0.4;
    // hoverPieces();

    // Render
    renderer.render(scene, camera)
    // effectComposer.render(scene, camera);


    // Call tick again on the next frame
    window.requestAnimationFrame(tick);

};

tick();
// window.addEventListener('mousemove', onMouseMove);
// window.addEventListener('mousedown', onMouseDown)
