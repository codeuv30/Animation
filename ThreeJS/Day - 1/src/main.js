import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { texture } from "three/src/nodes/accessors/TextureNode.js";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
const clock = new THREE.Clock();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = Array(6)
  .fill(null)
  .map(() => {
    return new THREE.MeshStandardMaterial({
      color: "red",
      metalness: 1,
      roughness: 0,
    });
  });

const envMapLoader = new RGBELoader();
envMapLoader.load("../public/envMap.hdr", (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = envMap;
})

const cube = new THREE.Mesh(geometry, material);

const rayCaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / size.width) * 2 - 1;
  mouse.y = -((e.clientY / size.height) * 2 - 1);
});

scene.add(cube);

function getRandomColor() {
  const red = Math.ceil(Math.random() * 255);
  const green = Math.ceil(Math.random() * 255);
  const blue = Math.ceil(Math.random() * 255);

  const color = `rgb(${red}, ${green}, ${blue})`;

  return color;
}

window.addEventListener("click", (e) => {
  rayCaster.setFromCamera(mouse, camera);

  const intersect = rayCaster.intersectObject(cube);

  if (intersect.length) {
    cube.material.forEach((e) => e.color.set(getRandomColor()));
  }
});

const ambientLight = new THREE.AmbientLight("#fff", 3);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100,
);
camera.position.z = 3;

const canvas = document.querySelector("canvas");

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.render(scene, camera);

renderer.setSize(size.width, size.height);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.update();

const animate = () => {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
};

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
});

animate();
