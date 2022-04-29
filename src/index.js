// import * as THREE from 'three';
// import { MapControls } from 'OrbitControls';
// import { GLTFLoader } from 'GLTFLoader';
// import { DRACOLoader } from 'DRACOLoader';
import * as THREE from 'https://unpkg.com/three@0.125.0/build/three.module.js';
import { MapControls } from 'https://unpkg.com/three@0.125.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.125.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://unpkg.com/three@0.125.0/examples/jsm/loaders/DRACOLoader.js';

let scene, camera, controls, raycaster, mouse, renderer;
let model, stands, models, clock, lights;
let porkStand, vegStand, fruitStand, fishStand, beefStand, chickenStand;
let porkIconLight, vegIconLight, fruitIconLight, fishIconLight, beefIconLight, chickenIconLight, logoLight;
let frustumSize, aspect;

// const gui = new dat.GUI()

let standsData = [
    {
        mesh: 'porkStand',
        name: porkStand,
        x: + .01,
        y: + .03,
        z: + .2,
        href: 'http://onetaiwancatty.com/stand/pork.html',
        lightName: porkIconLight,
        lightMesh: 'porkIconLight',
        lightX: -121.2,
        lightZ: 200.1,
        speed: 1.3
    },
    {
        mesh: 'beefStand',
        name: beefStand,
        x: - .05,
        y:  + .01,
        z:  + .3,
        href: 'http://onetaiwancatty.com/stand/beef.html',
        lightName: beefIconLight,
        lightMesh: 'beefIconLight',
        lightX: -119.6,
        lightZ: 200.4,
        speed: 1.3
        
    },
    {
        mesh: 'fishStand',
        name: fishStand,
        x: - .05,
        y: + .1,
        z:  - 8,
        href: 'http://onetaiwancatty.com/stand/fish.html',
        lightName: fishIconLight,
        lightMesh: 'fishIconLight',
        lightX: -119.7,
        lightZ: 199.4,
        speed: 1.3
    },
    {
        mesh: 'fruitStand',
        name: fruitStand,
        x: - .01,
        y: + .01,
        z:  - .08,
        href: 'http://onetaiwancatty.com/stand/fruit.html',
        lightName: fruitIconLight,
        lightMesh: 'fruitIconLight',
        lightX: -120.4,
        lightZ: 199.5,
        speed: 1.3
    },
    {
        mesh: 'vegStand',
        name: vegStand,
        x: - .03,
        y:  - .04,
        z:  - .3,
        href: 'http://onetaiwancatty.com/stand/vegtable.html',
        lightName: vegIconLight,
        lightMesh: 'vegIconLight',
        lightX: -119.3,
        lightZ: 199.7,
        speed: 1.3
    },
    {
        mesh: 'chickenStand',
        name: chickenStand,
        x: + .02,
        y:  + .03,
        z:  - 3,
        href: 'http://onetaiwancatty.com/stand/chicken.html',
        lightName: chickenIconLight,
        lightMesh: 'chickenIconLight',
        lightX: -120.7,
        lightZ: 199.9,
        speed: 1.3
    },
    {
        lightName: logoLight,
        lightMesh: 'logoLight',
        lightX: -150,
        lightZ: 150,
        speed: 0.5
    }
]
init();
function init() {
    const container = document.getElementById( 'container' );
    frustumSize = 1;
    aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
    camera.position.set( - 120, 100, 200 );
    
    camera.zoom = 1.2;

    clock = new THREE.Clock();
    scene = new THREE.Scene();

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
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
    
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2()

    // Draco loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/dist/draco/");

    // GLTF loader
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
        '/dist/model/market.glb',
        (gltf) => {
            model = gltf.scene;
            // // Get each model
            stands = new THREE.Group();
            lights = new THREE.Group();

            standsData.map(function (stand, index, array) {
                stand.name = gltf.scene.children.find((child) => child.name === stand.mesh)
                stands.add(stand.name)
                stand.lightName = gltf.scene.children.find((child) => child.name === stand.lightMesh)
                stand.lightName.material.transparent = true;
                stand.lightName.material.opacity = 0;
                lights.add(stand.lightName)
            })

            models = new THREE.Group();
            models.add(stands, model,lights)

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
            lights.traverse(function (children) {
                children.castShadow = false;
            });
            scene.add(models);
            tick();
        }
    );

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.3));
    // renderer.setPixelRatio( window.devicePixelRatio );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);
    
    window.addEventListener( 'resize', onWindowResize );
    const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
    };

    controls = new MapControls(camera, container) 
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.enableRotate = false;
    renderer.domElement.addEventListener('click', onClick, false);
    
    const minPan = new THREE.Vector3( - .95, - .95, - .95 );
    const maxPan = new THREE.Vector3( .95, .95, .95 );
    const _v = new THREE.Vector3();
    
    controls.addEventListener("change", function() {
        _v.copy(controls.target);
        controls.target.clamp(minPan, maxPan);
        _v.sub(controls.target);
        camera.position.sub(_v);
    })
};

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
    
    const zoom = 2.5;
    standsData.map(function (stand, index, array) {
        if (intersects[0].object.parent.name === stand.mesh) {
            zoomInTimeline(stand.name.position.x + stand.x , stand.name.position.y + stand.y, stand.name.position.z , .1);
            camera.zoom = zoom;
            camera.updateProjectionMatrix();
            $(function () {
                setTimeout(function () {
                    $(location).attr('href', stand.href );
                }, 3000);
            })
        }   
    })
    
}

function render() {
    renderer.render( scene, camera );
}

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    if (logoLight) { logoLight.rotation.z = elapsedTime * 0.5;} 
    // Update controls
    controls.update();
    let dragX = Math.round((camera.position.x + Number.EPSILON) * 1000) / 1000;      
    let dragZ = Math.round((camera.position.z + Number.EPSILON) * 1000) / 1000;
    
    standsData.map(function (stand, index, array) {
        if (stand.lightMesh === 'chickenIconLight') {
            if (dragX < stand.lightX && dragZ > stand.lightZ) {
                if (stand.lightName) {
                    stand.lightName.material.opacity = 1;
                    stand.lightName.rotation.z = elapsedTime * stand.speed;
                    stand.lightName.castShadow = true;
                }
            }
        } else if ( stand.lightMesh === 'fruitIconLight') { 
            if (dragX > stand.lightX && dragZ < stand.lightZ) {
                if (stand.lightName) {
                    stand.lightName.material.opacity = 1;
                    stand.lightName.rotation.z = elapsedTime * stand.speed;
                    stand.lightName.castShadow = true;
                }
            }    
        } else{ 
            if (dragX > stand.lightX && dragZ > stand.lightZ) {
                if (stand.lightName) {
                    stand.lightName.material.opacity = 1;
                    stand.lightName.rotation.z = elapsedTime * stand.speed;
                    stand.lightName.castShadow = true;
                }
            }
        }
    })
    render();
    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}