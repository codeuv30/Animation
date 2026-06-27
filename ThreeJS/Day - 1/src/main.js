import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/* Scene */

const scene = new THREE.Scene();
const clock = new THREE.Clock();

/* Texture Loader */
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
  "https://images.unsplash.com/photo-1781708319032-3c75bf3cdd5a?q=80&w=467&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  () => {
    console.log("Texture is Loaded")
  },
  () => {
    console.log("Texture is Loading...")
  },
  (error) => {
    console.log("some error is there", error);
  }
);

const earthTexture = textureLoader.load("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Land_ocean_ice_2048.jpg/3840px-Land_ocean_ice_2048.jpg");

const envMap = new RGBELoader();

envMap.load("../public/envMap.hdr", (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = envMap;
  scene.environment = envMap;
});

/* Camera */

const camera = new THREE.PerspectiveCamera(
  90,
  size.width / size.height,
  0.01,
  100,
);

/* Mesh */

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: "red",
  metalness: 1,
  roughness: 0
});

const ambientLight = new THREE.AmbientLight("#fff", 1.2);
scene.add(ambientLight);

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

/* Canvas matlab Parda */
const canvas = document.querySelector("canvas");

/* Renderer */

const renderer = new THREE.WebGLRenderer({
  canvas,
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
controls.enableDamping = true;

renderer.setSize(size.width, size.height);

camera.position.z = 2;

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  renderer.setSize(size.width, size.height);
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
});

function animate() {
  const delta = clock.getElapsedTime();

  cube.rotation.y = delta;

  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();
