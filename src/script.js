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
// const debugobject = {}
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
 * object
 */

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

        object.traverse(function (children) {
            object.scale.set( 1, 1, 1 );

            // console.log(children)

            if (object) {

            let scrollY = window.scrollY
            let currentSection = 0
                
            
            window.addEventListener('scroll', () =>
            {
                scrollY = window.scrollY
                console.log(scrollY)

                // const newSection = Math.round(scrollY / sizes.height)
                // const newSection = - scrollY / sizes.height

		        const tween = gsap.timeline()

                tween.to(object.rotation, { x: 0.25, scrollTrigger: {
            
                trigger: ".section-2",
                duration: 0.3,
                ease: 'power2.inOut',
                    
                start: "top 40%",
                end: "30% 80%",
                // markers: true
                },
                // position: "absolute", 
                // left: -10, 
                }) 

                // tween.to(object.rotation, { x: -0.25, y: -0.25, scrollTrigger: {
            
                // trigger: ".one-catty",
                // duration: 1.5,
                // ease: 'power2.inOut',
                    
                // start: "top 100%",
                // end: "30% 30%",
                // markers: true
                // }})  
                
                

                // if(scrollY >= 300)
                // {
                //     // currentSection = newSection
                //     gsap.to(
                //         object.position, {
                //         duration: 1.5,
                //         ease: 'power2.inOut',
                //         z: '+0.5',
                //             ScrollTrigger:(
                //             {
                //             trigger: object, //觸發得物件
                //             // (物件開始位置, 卷軸開始位置) top center bottom px
                //             start: "top top",
                //             //(物件結束位置, 卷軸結束位置) , 也可以設卷軸捲動多少結束動畫(+=300)
                //             end: "+=300",
                //             pin: true, // 物件執行完動畫會跟著卷軸走，類似 fixed-top
                //             scrub: true, // 物件動畫根據卷軸捲動程度跑
                //             markers: true, // 顯示標記
                //         }
                //         ) 
                //         //{
                //         // duration: 1.5,
                //         // ease: 'power2.inOut',
                //         // z: '+0.5',
                //         //} 
                //     })
                // }
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
// gui.add(poleLightMaterial, 'roughness').min(0).max(1).step(0.001);
// gui.add(poleLightMaterial, 'metalness').min(0).max(1).step(0.001);



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