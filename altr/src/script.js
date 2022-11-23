import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

let camera, scene, renderer;

init();
loadRGBE();
loadModel();
render();

let currentModel = null;

const modelNames = ["DamagedHelmet", "high_fashion_dress", "moto_guzzi_v-twin"];
for (let i = 0; i < modelNames.length; i++) {
  document.getElementById(modelNames[i]).addEventListener("click", function () {
    loadModel(modelNames[i]);
  });
}

function configureListeners() {
  const modelNames = [
    "DamagedHelmet",
    "high_fashion_dress",
    "moto_guzzi_v-twin",
  ];
  for (let i = 0; i < modelNames.length; i++) {
    document
      .getElementById(modelNames[i])
      .addEventListener("click", function () {
        loadModel(modelNames[i]);
      });
  }
}

function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    20
  );
  camera.position.set(-1.8, 0.6, 2.7);

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render); // use if there is no animation loop
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.target.set(0, 0, -0.2);
  controls.update();

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function loadRGBE() {
  new RGBELoader()
    .setPath("textures/equirectangular/")
    .load("royal_esplanade_1k.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;

      scene.background = texture;
      scene.environment = texture;

      render();
    });
}

function loadModel(modelName = "high_fashion_dress") {
  // model
  console.log(`Loading model ${modelName}`);
  const loader = new GLTFLoader().setPath(`models/gltf/${modelName}/`);
  loader.load("scene.gltf", function (gltf) {
    if (currentModel) {
      scene.remove(currentModel);
    }
    scene.add(gltf.scene);
    currentModel = gltf.scene;

    render();
  });
}

//

function render() {
  renderer.render(scene, camera);
}
