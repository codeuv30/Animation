import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
const clock = new THREE.Clock();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "red"
});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100);
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

  renderer.setSize(size.width, size.height)
});

animate();