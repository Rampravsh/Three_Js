const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);

const canvas = document.getElementById("draw");

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "rgba(255,0,0,0.1)" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.scale.x = 2;

camera.position.z = 5;

function animate(time) {
  //   cube.rotation.z = time / 200;
  cube.rotation.y = time / 1000;

  renderer.render(scene, camera);
}
