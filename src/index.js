import * as dat from 'lil-gui'
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { DragControls } from 'DragControls';
import { MapControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { DRACOLoader } from 'DRACOLoader';
import { RoomEnvironment } from 'RoomEnvironment';
// import gsap from 'gsap';
// import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let camera, controls, raycaster, mouse;
let models;
let model, stands;
let porkStand, vegStand, fruitStand, fishStand, beefStand, chickenStand;
let porkIconLight, vegIconLight, fruitIconLight, fishIconLight, beefIconLight, chickenIconLight;
let frustumSize, aspect;
let dragX, dragZ;
let minPan, maxPan;


const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
// const gui = new dat.GUI()
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
    const directionalLight = new THREE.DirectionalLight(0xffffff, .3);
    
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
    directionalLight.shadow.bias = -0.00001;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    
    scene.add(directionalLight);
    
    /* -------------------------------------------------------------
     * Material
    ------------------------------------------------------------- */
    // Pole light material
    const iconLightMaterial = new THREE.MeshStandardMaterial({
        color: 0XFFFFFF,
        emissive: 0XFFFFFF,
        emissiveIntensity: 90000,
        roughness: 0.3,
        metalness: 1
    })
    /* -------------------------------------------------------------
     * Camera
    ------------------------------------------------------------- */
    frustumSize = 1;
    aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
    camera.position.set( - 120, 100, 200 );

    camera.zoom = 1.2;
    scene.add(camera);

    // const helper = new THREE.CameraHelper( camera );
    // scene.add( helper );

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2()

    /* -------------------------------------------------------------
     * Model
    ------------------------------------------------------------- */
    gltfLoader.load(
        '/dist/model/market.glb',
        (gltf) => {
            model = gltf.scene;
            const color = new THREE.Color();
            const material = new THREE.MeshBasicMaterial( { color: color } );
            
            // // Get each model
            console.log(model.children);
            porkStand = gltf.scene.children.find((child) => child.name === 'porkStand')
            vegStand = gltf.scene.children.find((child) => child.name === 'vegStand')
            fruitStand = gltf.scene.children.find((child) => child.name === 'fruitStand')
            fishStand = gltf.scene.children.find((child) => child.name === 'fishStand')
            beefStand = gltf.scene.children.find((child) => child.name === 'beefStand')
            chickenStand = gltf.scene.children.find((child) => child.name === 'chickenStand')
    
            stands = new THREE.Group();
            stands.add(porkStand, vegStand, fruitStand, fishStand, beefStand, chickenStand)

            // let porkIconLight, vegIconLight, fruitIconLight, fishIconLight, beefIconLight, chickenIconLight;

            porkIconLight = gltf.scene.children.find((child) => child.name === 'porkIconLight')
            vegIconLight = gltf.scene.children.find((child) => child.name === 'vegIconLight')
            fruitIconLight = gltf.scene.children.find((child) => child.name === 'fruitIconLight')
            fishIconLight = gltf.scene.children.find((child) => child.name === 'fishIconLight')
            beefIconLight = gltf.scene.children.find((child) => child.name === 'beefIconLight')
            chickenIconLight = gltf.scene.children.find((child) => child.name === 'chickenIconLight')

            porkIconLight.material.transparent = true;
            porkIconLight.material.opacity = 0;

            vegIconLight.material.transparent = true;
            vegIconLight.material.opacity = 0;

            fruitIconLight.material.transparent = true;
            fruitIconLight.material.opacity = 0;

            fishIconLight.material.transparent = true;
            fishIconLight.material.opacity = 0;

            beefIconLight.material.transparent = true;
            beefIconLight.material.opacity = 0;

            chickenIconLight.material.transparent = true;
            chickenIconLight.material.opacity = 0;

            models = new THREE.Group();
            models.add(stands, model)

            models.traverse(function (children) {
                if (children.isLight) {
                    children.shadow.camera.near = 0.001;
                    children.shadow.camera.updateProjectionMatrix();
                }
                if (children.isMesh) {
                    children.castShadow = true;
                    children.receiveShadow = true;
                }
            });

            scene.add(models);
        }
    );


    /* -------------------------------------------------------------
     * Controls
    ------------------------------------------------------------- */

    controls = new MapControls(camera, canvas) 

    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    // controls.enableZoom = false;
    controls.enableRotate = false;
    renderer.domElement.addEventListener('click', onClick, false);

    const minPan = new THREE.Vector3( - .8, - .8, - .8 );
    const maxPan = new THREE.Vector3( .8, .8, .8 );
    const _v = new THREE.Vector3();
    
    controls.addEventListener("change", function() {
    	_v.copy(controls.target);
    	controls.target.clamp(minPan, maxPan);
        _v.sub(controls.target);
        camera.position.sub(_v);
    })
    // scene.add( new THREE.AxesHelper( .8 ) );
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
		.timeline({ defaults: { duration: 2.5, ease: "expo.out" } })
        .to(controls.target, { x, y, z })
		.to(camera.position, { x: x - 3, y: y + 3 , z: z + 20 }, 0)
    };
    
    const zoom = 2;
    // if (intersects.length > 0) {
    //     console.log('Intersection:', intersects[0].object.parent.name);
    // }
    if (intersects[0].object.parent.name === 'porkStand') {
        console.log('porkStand');
        if (porkIconLight) { 
            porkIconLight.material.opacity = 1;
        } 
        zoomInTimeline(porkStand.position.x, porkStand.position.y + .03, porkStand.position.z + .09, .1);
        camera.zoom = zoom;
        camera.updateProjectionMatrix();
        
    }
    if (intersects[0].object.parent.name === 'beefStand') {
        zoomInTimeline(beefStand.position.x, beefStand.position.y - .01, beefStand.position.z - .3, .1);
        camera.zoom = zoom;
        camera.updateProjectionMatrix();
        $(function () {
            setTimeout(function () {
                $(location).attr('href', '//one-taiwan-catty.github.io/stand/beef');
            }, 3000);
        })
    }
    if (intersects[0].object.parent.name === 'fishStand') {
        console.log('fishStand');
        zoomInTimeline(fishStand.position.x , fishStand.position.y, fishStand.position.z - .3, .1);
        camera.zoom = zoom;
        camera.updateProjectionMatrix();

    }
    if (intersects[0].object.parent.name === 'fruitStand') {
        console.log('fruitStand');
        zoomInTimeline(fruitStand.position.x , fruitStand.position.y, fruitStand.position.z - .03, .1);
        camera.zoom = zoom;
        camera.updateProjectionMatrix();
        
    }
    if (intersects[0].object.parent.name === 'vegStand') {
        console.log('vegStand');
        zoomInTimeline(vegStand.position.x , vegStand.position.y - .04, vegStand.position.z - .3, .1);
        camera.zoom = zoom;
        camera.updateProjectionMatrix();
    }
    if (intersects[0].object.parent.name === 'chickenStand') {
        console.log('chickenStand');
        zoomInTimeline(chickenStand.position.x , chickenStand.position.y + .03, chickenStand.position.z + .05, .1);
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

const pmremGenerator = new THREE.PMREMGenerator( renderer );

function render() {
    renderer.render( scene, camera );
}
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

init();



/* -------------------------------------------------------------
* Animate
------------------------------------------------------------- */
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    
    // Update controls
    controls.update();
    let dragX = Math.round((camera.position.x + Number.EPSILON) * 1000) / 1000;      
    let dragZ = Math.round((camera.position.z + Number.EPSILON) * 1000) / 1000;

    // porkLight
    if (dragX < -120 && dragZ > 200.1) {
        if (porkIconLight) { 
            porkIconLight.material.opacity = 1;
            porkIconLight.rotation.z = elapsedTime * 1.3;
        } 
    }
    // beefLight
    if (dragX > -119.6 && dragZ > 200.4) {
        if (beefIconLight) { 
            beefIconLight.material.opacity = 1;
            beefIconLight.rotation.z = elapsedTime * 1.3;
        } 
    }

    // vegLight
    if (dragX > -119.3 && dragZ > 199.7) {
        if (vegIconLight) { 
            vegIconLight.material.opacity = 1;
            vegIconLight.rotation.z = elapsedTime * 1.3;
        } 
    }
    // fishLight
    if (dragX > -119.7 && dragZ > 199.3) {
        if (fishIconLight) { 
            fishIconLight.material.opacity = 1;
            fishIconLight.rotation.z = elapsedTime * 1.3;
        } 
    }
    // fruitLight
    if (dragX < -120.2 && dragZ < 199.5) {
        if (fruitIconLight) { 
            fruitIconLight.material.opacity = 1;
            fruitIconLight.rotation.z = elapsedTime * 1.3;
        } 
    }

    // chickenLight
    if (dragX < -120.6 && dragZ > 199.5) {
        // console.log('chicken')
        if (chickenIconLight) { 
            chickenIconLight.material.opacity = 1;
            chickenIconLight.rotation.z = elapsedTime * 1.3;
        } 
    }

    render();
    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
// function standsShow(stands) {
    
// }
