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
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
 * object
 */

/**
 * Light
 */
const pointLight = new THREE.PointLight(0xffffff, .2, 1, 2)
pointLight.position.set( 0, -20, 10 );
pointLight.castShadow = true;

scene.add(pointLight)

/**
 * Material
 */
ScrollTrigger.defaults({
    immediateRender: false,
    ease: "power1.inOut",
    scrub: 0.5
});

/**
 * Model
 */
let object;

gltfLoader.load(
    'loosun.glb',
    (gltf) => {
        object = gltf.scene
        // object.scale.set(0.5, 0.5, 0.5);

        object.traverse(function (children) {

            console.log(children)

            if (object) {
                let scrollY = window.scrollY;        
            window.addEventListener('scroll', () =>
            {
                scrollY = window.scrollY
                console.log(scrollY)

		        const tween = gsap.timeline()
                // 
                tween.fromTo(object.rotation, { x: 0, y: 0, z: 0 },{x: 0.5, y: 0, z: -0.5, scrollTrigger: {
                scrub:true,
                trigger: ".section-2",
                // duration: {min: 0.2, max: 3}, 
                ease: "power0.inOut",
                start: "50% 90%",
                end: "70% 90%",
                // markers: true,
                },
                }) 
                //
                .fromTo(object.position, { x: 0, y: 0, z: 0 },{x: -3, y: -2, z: 0.8, scrollTrigger: {
                scrub:true,
                trigger: ".section-2",
                duration: { min: 2, max: 3 }, 
                ease: "power0.inOut",
                start: "50% 90%",
                end: "70% 90%",
                // markers: true,
                },
                }) 
                //
                .to(object.rotation,{x: -0.5, y: 0, z: 0, scrollTrigger: {
                scrub:true,
                trigger: ".one-catty",
                duration: {min: 0.2, max: 1}, 
                ease: "power0.inOut",
                    
                start: "20% 50%",
                end: "90% 50%",
                // markers: true,
                },
                }) 
                //
                .to(object.position,{x: -1, y: -1, z: -0.8, scrollTrigger: {
                scrub:true, 
                trigger: ".one-catty",
                duration: {min: 0.2, max: 1}, 
                ease: "power0.inOut",
                start: "20% 50%",
                end: "90% 50%",
                // markers: true,
                },
                })
                //
                .to(object.rotation, {x: 0, y: 0, z: 0.5, scrollTrigger: {
                scrub:true,
                    
                trigger: ".section-3",
                // duration: {min: 0.2, max: 1}, 
                ease: "power0.inOut",
                start: "50% 80%",
                end: "60% 80%",
                // markers: true,
                },
                })
                .to(object.position, {x: -3, y: -2.5, z: 0, scrollTrigger: {
                scrub:true,
                    
                trigger: ".section-3",
                // duration: {min: 0.2, max: 1}, 
                ease: "power0.inOut",
                start: "20% 80%",
                end: "60% 80%",
                // markers: true,
                },
                }) 
                .to(object.position, {x: -1, y: -2, z: -2, scrollTrigger: {
                    scrub:true,
                        
                    trigger: ".weigh",
                    // duration: {min: 0.2, max: 1}, 
                    ease: "power0.inOut",
                    start: "top 70%",
                    end: "60% 70%",
                    // markers: true,
                },
                }) 
                .to(".pointer", {rotation: 50,x:30,y:15, scrollTrigger: {
                    scrub:true,
                    trigger: ".weigh",
                    duration: {min: 0.2, max: 1}, 
                    // ease: "power0.inOut",
                    start: "10% 70%",
                    end: "60% 70%",
                    // markers: true,
                },
                }) 
             })
            }
        })
        scene.add(object)
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
controls.enableZoom = false;



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true  
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearAlpha(0);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

const environment = new RoomEnvironment();
const pmremGenerator = new THREE.PMREMGenerator( renderer );

scene.environment = pmremGenerator.fromScene(environment).texture;


/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})


/**
 * Post processing
 */
// const effectComposer = new EffectComposer(renderer);
// effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// effectComposer.setSize(sizes.width, sizes.height);

// const renderPass = new RenderPass(scene, camera);
// effectComposer.addPass(renderPass);

// const unrealBloomPass = new UnrealBloomPass();
// effectComposer.addPass(unrealBloomPass);

// unrealBloomPass.strength = 1;
// unrealBloomPass.radius = 1.3;
// unrealBloomPass.threshold = 0.7;

// gui.add(unrealBloomPass, 'enabled');
// gui.add(unrealBloomPass, 'strength').min(0).max(2).step(0.001);
// gui.add(unrealBloomPass, 'radius').min(0).max(2).step(0.001);
// gui.add(unrealBloomPass, 'threshold').min(0).max(1).step(0.001);




/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    if (object) object.rotation.y = elapsedTime * 0.4;


    // Render
    renderer.render(scene, camera)
    // effectComposer.render();


    // Call tick again on the next frame
    window.requestAnimationFrame(tick);

};

tick();