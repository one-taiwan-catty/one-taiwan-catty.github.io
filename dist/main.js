/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! https://unpkg.com/three@0.138.0/build/three.module.js */ \"https://unpkg.com/three@0.138.0/build/three.module.js\");\n/* harmony import */ var https_unpkg_com_three_0_138_0_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! https://unpkg.com/three@0.138.0/examples/jsm/controls/OrbitControls.js */ \"https://unpkg.com/three@0.138.0/examples/jsm/controls/OrbitControls.js\");\n/* harmony import */ var https_unpkg_com_three_0_138_0_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! https://unpkg.com/three@0.138.0/examples/jsm/loaders/GLTFLoader.js */ \"https://unpkg.com/three@0.138.0/examples/jsm/loaders/GLTFLoader.js\");\n/* harmony import */ var https_unpkg_com_three_0_138_0_examples_jsm_loaders_DRACOLoader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! https://unpkg.com/three@0.138.0/examples/jsm/loaders/DRACOLoader.js */ \"https://unpkg.com/three@0.138.0/examples/jsm/loaders/DRACOLoader.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__, https_unpkg_com_three_0_138_0_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1__, https_unpkg_com_three_0_138_0_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__, https_unpkg_com_three_0_138_0_examples_jsm_loaders_DRACOLoader_js__WEBPACK_IMPORTED_MODULE_3__]);\n([https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__, https_unpkg_com_three_0_138_0_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1__, https_unpkg_com_three_0_138_0_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__, https_unpkg_com_three_0_138_0_examples_jsm_loaders_DRACOLoader_js__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n// import * as dat from 'lil-gui'\n// import * as THREE from 'three';\n// import { MapControls } from 'OrbitControls';\n// import { GLTFLoader } from 'GLTFLoader';\n// import { DRACOLoader } from 'DRACOLoader';\n\n\n\n\n\nlet scene, camera, controls, raycaster, mouse, renderer;\nlet model, stands, models, clock, lights;\nlet porkStand, vegStand, fruitStand, fishStand, beefStand, chickenStand;\nlet porkIconLight, vegIconLight, fruitIconLight, fishIconLight, beefIconLight, chickenIconLight, logoLight;\nlet frustumSize, aspect;\n\n// const gui = new dat.GUI()\n\nlet standsData = [\n    {\n        mesh: 'porkStand',\n        name: porkStand,\n        x: + .01,\n        y: + .03,\n        z: + .2,\n        href: 'http://onetaiwancatty.com/stand/pork.html',\n        lightName: porkIconLight,\n        lightMesh: 'porkIconLight',\n        lightX: -121.2,\n        lightZ: 200.1,\n        speed: 1.3\n    },\n    {\n        mesh: 'beefStand',\n        name: beefStand,\n        x: - .05,\n        y:  + .01,\n        z:  + .3,\n        href: 'http://onetaiwancatty.com/stand/beef.html',\n        lightName: beefIconLight,\n        lightMesh: 'beefIconLight',\n        lightX: -119.6,\n        lightZ: 200.4,\n        speed: 1.3\n        \n    },\n    {\n        mesh: 'fishStand',\n        name: fishStand,\n        x: - .05,\n        y: + .1,\n        z:  - 8,\n        href: 'http://onetaiwancatty.com/stand/fish.html',\n        lightName: fishIconLight,\n        lightMesh: 'fishIconLight',\n        lightX: -119.7,\n        lightZ: 199.4,\n        speed: 1.3\n    },\n    {\n        mesh: 'fruitStand',\n        name: fruitStand,\n        x: - .01,\n        y: + .01,\n        z:  - .08,\n        href: 'http://onetaiwancatty.com/stand/fruit.html',\n        lightName: fruitIconLight,\n        lightMesh: 'fruitIconLight',\n        lightX: -120.4,\n        lightZ: 199.5,\n        speed: 1.3\n    },\n    {\n        mesh: 'vegStand',\n        name: vegStand,\n        x: - .03,\n        y:  - .04,\n        z:  - .3,\n        href: 'http://onetaiwancatty.com/stand/vegtable.html',\n        lightName: vegIconLight,\n        lightMesh: 'vegIconLight',\n        lightX: -119.3,\n        lightZ: 199.7,\n        speed: 1.3\n    },\n    {\n        mesh: 'chickenStand',\n        name: chickenStand,\n        x: + .02,\n        y:  + .03,\n        z:  - 3,\n        href: 'http://onetaiwancatty.com/stand/chicken.html',\n        lightName: chickenIconLight,\n        lightMesh: 'chickenIconLight',\n        lightX: -120.7,\n        lightZ: 199.9,\n        speed: 1.3\n    },\n    {\n        lightName: logoLight,\n        lightMesh: 'logoLight',\n        lightX: -150,\n        lightZ: 150,\n        speed: 0.5\n    }\n]\ninit();\nfunction init() {\n    const container = document.getElementById( 'container' );\n    frustumSize = 1;\n    aspect = window.innerWidth / window.innerHeight;\n    camera = new https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );\n    camera.position.set( - 120, 100, 200 );\n    \n    camera.zoom = 1.2;\n\n    clock = new https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Clock();\n    scene = new https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Scene();\n\n    const directionalLight = new https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(0xffffff, 1);\n    directionalLight.position.set(18, 18, -18);\n    directionalLight.castShadow = true;\n    const d = 8;\n    directionalLight.shadow.camera.left = - d;\n    directionalLight.shadow.camera.right = d;\n    directionalLight.shadow.camera.top = d;\n    directionalLight.shadow.camera.bottom = - d;\n    directionalLight.shadow.camera.fov = 45;\n    directionalLight.shadow.camera.aspect = 1;\n    directionalLight.shadow.camera.near = 0.1;\n    directionalLight.shadow.camera.far = 500;\n    directionalLight.shadow.bias = -0.00001;\n    directionalLight.shadow.mapSize.width = 4096;\n    directionalLight.shadow.mapSize.height = 4096;\n    \n    scene.add(directionalLight);\n    \n    raycaster = new https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Raycaster();\n    mouse = new https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2()\n\n    // Draco loader\n    const dracoLoader = new https_unpkg_com_three_0_138_0_examples_jsm_loaders_DRACOLoader_js__WEBPACK_IMPORTED_MODULE_3__.DRACOLoader();\n    dracoLoader.setDecoderPath(\"/dist/draco/\");\n\n    // GLTF loader\n    const gltfLoader = new https_unpkg_com_three_0_138_0_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__.GLTFLoader();\n    gltfLoader.setDRACOLoader(dracoLoader);\n\n    gltfLoader.load(\n        '/dist/model/market.glb',\n        (gltf) => {\n            model = gltf.scene;\n            // // Get each model\n            stands = new https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Group();\n            lights = new https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Group();\n\n            standsData.map(function (stand, index, array) {\n                stand.name = gltf.scene.children.find((child) => child.name === stand.mesh)\n                stands.add(stand.name)\n                stand.lightName = gltf.scene.children.find((child) => child.name === stand.lightMesh)\n                stand.lightName.material.transparent = true;\n                stand.lightName.material.opacity = 0;\n                lights.add(stand.lightName)\n            })\n\n            models = new https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Group();\n            models.add(stands, model,lights)\n\n            models.traverse(function (children) {\n                if (children.isLight) {\n                    children.shadow.camera.near = 0.001;\n                    children.shadow.camera.updateProjectionMatrix();\n                }\n                if (children.isMesh) {\n                    children.castShadow = true;\n                    children.receiveShadow = true;\n                }\n            });\n            lights.traverse(function (children) {\n                children.castShadow = false;\n            });\n            scene.add(models);\n            tick();\n        }\n    );\n\n    renderer = new https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({antialias: true});\n    renderer.physicallyCorrectLights = true;\n    renderer.shadowMap.enabled = true;\n    renderer.setSize( window.innerWidth, window.innerHeight );\n    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));\n    // renderer.setPixelRatio( window.devicePixelRatio );\n    renderer.toneMapping = https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.ACESFilmicToneMapping;\n    renderer.toneMappingExposure = 1;\n    renderer.outputEncoding = https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding;\n    container.appendChild(renderer.domElement);\n    \n    window.addEventListener( 'resize', onWindowResize );\n    const sizes = {\n    width: window.innerWidth,\n    height: window.innerHeight\n    };\n\n    controls = new https_unpkg_com_three_0_138_0_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1__.MapControls(camera, container) \n    controls.enableDamping = true;\n    controls.dampingFactor = 0.25;\n    controls.enableZoom = false;\n    controls.enableRotate = false;\n    renderer.domElement.addEventListener('click', onClick, false);\n    \n    const minPan = new https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3( - .95, - .95, - .95 );\n    const maxPan = new https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3( .95, .95, .95 );\n    const _v = new https_unpkg_com_three_0_138_0_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3();\n    \n    controls.addEventListener(\"change\", function() {\n        _v.copy(controls.target);\n        controls.target.clamp(minPan, maxPan);\n        _v.sub(controls.target);\n        camera.position.sub(_v);\n    })\n};\n\nfunction onClick() {\n    event.preventDefault();\n    \n    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;\n    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;\n    \n    raycaster.setFromCamera(mouse, camera);\n    const intersects = raycaster.intersectObjects(stands.children, true);\n    \n    const zoomInTimeline = (x, y, z, zoomOutFactor = 0) => {\n        let tl = gsap\n        .timeline({ defaults: { duration: 2.5, ease: \"expo.out\" } })\n        .to(controls.target, { x, y, z })\n        .to(camera.position, { x: x - 3, y: y + 3 , z: z + 20 }, 0)\n    };\n    \n    const zoom = 2.5;\n    standsData.map(function (stand, index, array) {\n        if (intersects[0].object.parent.name === stand.mesh) {\n            zoomInTimeline(stand.name.position.x + stand.x , stand.name.position.y + stand.y, stand.name.position.z , .1);\n            camera.zoom = zoom;\n            camera.updateProjectionMatrix();\n            $(function () {\n                setTimeout(function () {\n                    $(location).attr('href', stand.href );\n                }, 3000);\n            })\n        }   \n    })\n    \n}\n\nfunction render() {\n    renderer.render( scene, camera );\n}\n\nconst tick = () => {\n    const elapsedTime = clock.getElapsedTime();\n    if (logoLight) { logoLight.rotation.z = elapsedTime * 0.5;} \n    // Update controls\n    controls.update();\n    let dragX = Math.round((camera.position.x + Number.EPSILON) * 1000) / 1000;      \n    let dragZ = Math.round((camera.position.z + Number.EPSILON) * 1000) / 1000;\n    \n    standsData.map(function (stand, index, array) {\n        if (stand.lightMesh === 'chickenIconLight') {\n            if (dragX < stand.lightX && dragZ > stand.lightZ) {\n                if (stand.lightName) {\n                    stand.lightName.material.opacity = 1;\n                    stand.lightName.rotation.z = elapsedTime * stand.speed;\n                    stand.lightName.castShadow = true;\n                }\n            }\n        } else if ( stand.lightMesh === 'fruitIconLight') { \n            if (dragX > stand.lightX && dragZ < stand.lightZ) {\n                if (stand.lightName) {\n                    stand.lightName.material.opacity = 1;\n                    stand.lightName.rotation.z = elapsedTime * stand.speed;\n                    stand.lightName.castShadow = true;\n                }\n            }    \n        } else{ \n            if (dragX > stand.lightX && dragZ > stand.lightZ) {\n                if (stand.lightName) {\n                    stand.lightName.material.opacity = 1;\n                    stand.lightName.rotation.z = elapsedTime * stand.speed;\n                    stand.lightName.castShadow = true;\n                }\n            }\n        }\n    })\n    render();\n    // Call tick again on the next frame\n    window.requestAnimationFrame(tick);\n};\n\nfunction onWindowResize() {\n\n    camera.aspect = window.innerWidth / window.innerHeight;\n    camera.updateProjectionMatrix();\n\n    renderer.setSize( window.innerWidth, window.innerHeight );\n\n}\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "https://unpkg.com/three@0.138.0/build/three.module.js":
false,

/***/ "https://unpkg.com/three@0.138.0/examples/jsm/controls/OrbitControls.js":
false,

/***/ "https://unpkg.com/three@0.138.0/examples/jsm/loaders/DRACOLoader.js":
false,

/***/ "https://unpkg.com/three@0.138.0/examples/jsm/loaders/GLTFLoader.js":
false

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackThen = typeof Symbol === "function" ? Symbol("webpack then") : "__webpack_then__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var completeQueue = (queue) => {
/******/ 			if(queue) {
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var completeFunction = (fn) => (!--fn.r && fn());
/******/ 		var queueFunction = (queue, fn) => (queue ? queue.push(fn) : completeFunction(fn));
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackThen]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						completeQueue(queue);
/******/ 						queue = 0;
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						completeQueue(queue);
/******/ 						queue = 0;
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackThen] = (fn, reject) => (queueFunction(queue, fn), dep['catch'](reject));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackThen] = (fn) => (completeFunction(fn));
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue = hasAwait && [];
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var isEvaluating = true;
/******/ 			var nested = false;
/******/ 			var whenAll = (deps, onResolve, onReject) => {
/******/ 				if (nested) return;
/******/ 				nested = true;
/******/ 				onResolve.r += deps.length;
/******/ 				deps.map((dep, i) => (dep[webpackThen](onResolve, onReject)));
/******/ 				nested = false;
/******/ 			};
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = () => (resolve(exports), completeQueue(queue), queue = 0);
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackThen] = (fn, rejectFn) => {
/******/ 				if (isEvaluating) { return completeFunction(fn); }
/******/ 				if (currentDeps) whenAll(currentDeps, fn, rejectFn);
/******/ 				queueFunction(queue, fn);
/******/ 				promise['catch'](rejectFn);
/******/ 			};
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve, reject) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					whenAll(currentDeps, fn, reject);
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => (err && reject(promise[webpackError] = err), outerResolve()));
/******/ 			isEvaluating = false;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;