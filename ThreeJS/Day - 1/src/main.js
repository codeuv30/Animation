import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import gsap from "gsap";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
const clock = new THREE.Clock();

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
  "https://images.pexels.com/photos/38209596/pexels-photo-38209596.jpeg",
);
const texture2 = textureLoader.load(
  "https://images.pexels.com/photos/37998476/pexels-photo-37998476.jpeg",
);

const geometry = new THREE.PlaneGeometry(3, 3);
const material = new THREE.ShaderMaterial({
  vertexShader: `

      uniform float uTime;
      varying vec2 vUv;

      void main() {

        vec3 pos = position;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

        vUv = uv;
      }

  `,
  fragmentShader: `
      uniform sampler2D uTexEarth;
      uniform sampler2D uTexMars;
      varying vec2 vUv;
      uniform float uProgress;

      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
  
      void main() {
          vec2 uv = vUv;

          vec2 dir = normalize(vec2(0.0, 1.0));

          float ripple = sin(uProgress * 3.14) * 0.5;

          float gradient = dot(uv - 0.5 , dir) + 0.5;

          float n = snoise(uv * 6.0) * 0.25;

          float localGradient = gradient + n;

          float edge = 0.15;

          float sweap = uProgress * (1.0 + edge * 2.0) - edge;

          float mixer = smoothstep(localGradient - edge, localGradient + edge, sweap);

          vec2 uvA = uv - dir * ripple;
          vec2 uvB = uv + dir * ripple;

          vec4 colorA = texture2D(uTexEarth, uvA);
          vec4 colorB = texture2D(uTexMars, uvB);

          vec4 finalColour = mix(colorA, colorB, mixer);

          gl_FragColor = finalColour;
      }

  `,
  uniforms: {
    uTime: { value: 0 },
    uTexEarth: { value: texture },
    uTexMars: { value: texture2 },
    uProgress: { value: 0.0 },
  },
  side: THREE.DoubleSide,
});

const envMapLoader = new RGBELoader();
envMapLoader.load("../public/envMap.hdr", (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = envMap;
});

const cube = new THREE.Mesh(geometry, material);

const rayCaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / size.width) * 2 - 1;
  mouse.y = -((e.clientY / size.height) * 2 - 1);
});

scene.add(cube);

let isEarth = true;

window.addEventListener("mousemove", (e) => {
  rayCaster.setFromCamera(mouse, camera);
  const intersector = rayCaster.intersectObject(cube);

  if (intersector.length > 0 && material.uniforms.uProgress.value === (isEarth ? 0.0 : 1.0)) {
    isEarth = !isEarth;
    gsap.to(material.uniforms.uProgress, {
      value: isEarth ? 0.0 : 1.0,
      duration: 1.6,
      ease: "power3.out",
    });
  }
});

function getRandomColor() {
  const red = Math.ceil(Math.random() * 255);
  const green = Math.ceil(Math.random() * 255);
  const blue = Math.ceil(Math.random() * 255);

  const color = `rgb(${red}, ${green}, ${blue})`;

  return color;
}

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

  const delta = clock.getElapsedTime();

  cube.material.uniforms.uTime.value = delta;

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
