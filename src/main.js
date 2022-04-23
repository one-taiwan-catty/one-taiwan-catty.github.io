import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { DRACOLoader } from 'DRACOLoader';
import { GLTFLoader } from 'GLTFLoader';
import { RoomEnvironment } from 'RoomEnvironment';
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
dracoLoader.setDecoderPath("/dist/draco/");

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
 * GSAP
 */
ScrollTrigger.defaults({
    immediateRender: false,
    ease: "power1.inOut",
    scrub: 0.5
});

/**
 * Model
 */
let object, cook1, cooks;
let cook2, cook3;
// Models data
let item = [
    {
        title: '斤一斤 - 蘆筍',
        model: '/dist/model/loosun.glb',
        scale: '',
        cook:'/dist/model/cook-loosun.glb'
    },
    {
        title: '斤一斤 - 蛤蠣',
        model: '/dist/model/ham-a.glb',
        scale: '',
        cook:''
    },
    {
        title: '斤一斤 - 牛腱',
        model: '/dist/model/kian-tsi-bah.glb',
        scale: '0.8',
        cook:''
    },
    {
        title: '斤一斤 - 南瓜',
        model: '/dist/model/kim-kue.glb',
        scale: '0.5',
        cook:''
    }
];
// console.log(document.title);
// console.log(item.model);
item.map(function (item, index, array) {
    
    if (document.title === item.title) {
        gltfLoader.load(
            item.model,
            (gltf) => {
                object = gltf.scene;
                if (item.scale !== '') {
                    console.log(object.scale.x = `${item.scale}`);
                    
                    object.scale.x = `${item.scale}`
                    object.scale.y = `${item.scale}`
                    object.scale.z = `${item.scale}`
                }

                
                object.traverse(function (children) {
                    if (object) {
                        let scrollY = window.scrollY;        
                    window.addEventListener('scroll', () =>
                    {
                        scrollY = window.scrollY
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
        
                // cook-model
                gltfLoader.load(
                item.cook,
                (gltf) => {
                    cook1 = gltf.scene;
                    if (cook1) {
                        cook1.position.set(1.5, .5, -.05);
        
                        cook2 = cook1.clone();
                        cook2.position.set(.7, .3, .25);
        
                        cook3 = cook1.clone();
                        cook3.position.set(.2, .1, -.5);
                    }
        
                    cooks = new THREE.Group();
                    cooks.add(cook1, cook2, cook3)
                    cooks.traverse(function (children) {
        
                    if (cooks) {
                        cooks.scale.set(0, 0, 0)
                        let scrollY = window.scrollY;        
                        window.addEventListener('scroll', () =>
                        {
                            scrollY = window.scrollY
                            const tween = gsap.timeline()
                            // 
                            tween.fromTo(cooks.scale, { x: 0, y: 0, z: 0 }, {
                                    x: 1, y: 1, z: 1, scrollTrigger: {
                            scrub:true,
                            trigger: ".section-4",
                            duration: {min: 0.2, max: 3}, 
                            ease: "power0.inOut",
                            start: "-30% 90%",
                            end: "50% 90%",
                            // markers: true,
                            },
                            }) 
                            .fromTo(cooks.position, { x: 0, y: 0, z: -.8 }, {
                                    x: 0, y: 0, z: 0, scrollTrigger: {
                            scrub:true,
                            trigger: ".section-4",
                            duration: {min: 0.2, max: 3}, 
                            ease: "power0.inOut",
                            start: "-30% 90%",
                            end: "60% 90%",
                            // markers: true,
                            },
                            }) 
                            .to(cooks.scale, {x: 3, y: 3, z: 3, scrollTrigger: {
                            scrub:true,
                            trigger: ".section-5",
                            duration: {min: 0.2, max: 3}, 
                            ease: "power0.inOut",
                            start: "-10% 90%",
                            end: "60% 90%",
                            // markers: true,
                            },
                            }) 
                        })
                    }
                })
        
        
                    scene.add(cooks)
                }
                );
            }
        );
        
    }
});

 
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
    if (cook1) cook1.rotation.y = elapsedTime * 0.4;

    // Render
    renderer.render(scene, camera)
    // effectComposer.render();


    // Call tick again on the next frame
    window.requestAnimationFrame(tick);

};

tick();