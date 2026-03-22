import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

// 1. Scene
const scene = new THREE.Scene();

// 2. Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

// 3. Renderer
const canvas = document.querySelector("#webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// 4. Object (Cube)
const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  roughness: 0.4,
  metalness: 0.7,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 5. Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(-5, -5, 5);
scene.add(pointLight);

const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(0, 2, 0);
scene.add(spotLight);

const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
scene.add(hemisphereLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1,
);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  1,
);
scene.add(hemisphereLightHelper);

// 6. Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.dampingFactor = 0.05;
controls.autoRotateSpeed = 5;

// 7. GUI
const gui = new GUI();

const meshFolder = gui.addFolder("Mesh Controls");
const geoParams = {
  type: "Box",
};
meshFolder
  .add(geoParams, "type", ["Box", "Sphere", "Torus", "Cylinder"])
  .name("Geometry Type")
  .onChange((value) => {
    cube.geometry.dispose();
    if (value === "Box") {
      cube.geometry = new THREE.BoxGeometry(1, 1, 1);
    } else if (value === "Sphere") {
      cube.geometry = new THREE.SphereGeometry(0.7, 32, 32);
    } else if (value === "Torus") {
      cube.geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
    } else if (value === "Cylinder") {
      cube.geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    }
  });

meshFolder.add(cube.rotation, "x", 0, Math.PI * 2).name("Rotate X");
meshFolder.add(cube.rotation, "y", 0, Math.PI * 2).name("Rotate Y");
meshFolder.addColor(material, "color");
meshFolder.add(material, "roughness", 0, 1);
meshFolder.add(material, "metalness", 0, 1);

const lightFolder = gui.addFolder("Lights");
lightFolder.add(ambientLight, "intensity", 0, 2).name("Ambient Intensity");
lightFolder
  .add(directionalLight, "intensity", 0, 2)
  .name("Directional Intensity");
lightFolder.add(pointLight, "intensity", 0, 2).name("Point Intensity");
lightFolder.add(spotLight, "intensity", 0, 2).name("Spot Intensity");
lightFolder
  .add(hemisphereLight, "intensity", 0, 2)
  .name("Hemisphere Intensity");

const controlsFolder = gui.addFolder("Controls");
controlsFolder.add(controls, "autoRotate");
controlsFolder.add(controls, "autoRotateSpeed", 0, 20);
controlsFolder.add(controls, "enableDamping");
controlsFolder.add(controls, "dampingFactor", 0, 0.2);

const helpersFolder = gui.addFolder("Helpers");
helpersFolder.add(directionalLightHelper, "visible").name("Directional Helper");
helpersFolder.add(pointLightHelper, "visible").name("Point Helper");
helpersFolder.add(spotLightHelper, "visible").name("Spot Helper");
helpersFolder.add(hemisphereLightHelper, "visible").name("Hemisphere Helper");

// 8. Animation Loop
function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

// Handle Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
