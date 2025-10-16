const canvas = document.getElementById('gaussianCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
camera.position.z = 5;

let pointsMesh = null;

function createGaussianPoints(num = 3000) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(num * 3);
  const colors = new Float32Array(num * 3);
  for (let i = 0; i < num; i++) {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const z = Math.random() * 2 - 1;
    positions.set([x, y, z], i * 3);
    colors.set([0.5 + 0.5 * x, 0.5 + 0.5 * y, 0.5 + 0.5 * z], i * 3);
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.9 });
  return new THREE.Points(geometry, material);
}

function animate() {
  requestAnimationFrame(animate);
  if (pointsMesh) {
    pointsMesh.rotation.x += 0.0015;
    pointsMesh.rotation.y += 0.001;
  }
  renderer.render(scene, camera);
}
animate();

document.getElementById('loadSample').addEventListener('click', () => {
  if (pointsMesh) scene.remove(pointsMesh);
  pointsMesh = createGaussianPoints();
  scene.add(pointsMesh);
});

window.addEventListener('resize', () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
});