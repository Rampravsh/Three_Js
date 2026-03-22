import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const canvas = document.querySelector("#webgl");

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

const BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const SphereGeometry = new THREE.SphereGeometry(15, 32, 16);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const SphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cube = new THREE.Mesh(BoxGeometry, cubeMaterial);
const Sphere = new THREE.Mesh(SphereGeometry, SphereMaterial);
scene.add(cube);
scene.add(Sphere);

camera.position.z = 5;

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.autoRotate = true;
controls.dampingFactor = true;
// controls.autoRotateSpeed = 5;

function animate(time) {
  //   cube.rotation.x = time / 2000;
  //   cube.rotation.y = time / 1000;
  controls.update();

  renderer.render(scene, camera);
}
