<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
const scene = new THREE.Scene();

const windth = window.innerWidth;
const height = window.innerHeight;
const k = windth / height;

const s = 100;

const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 100000);

camera.position.set(100, 200, 100);

camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();

const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(200, 400, 200);

scene.add(pointLight);

renderer.setSize(windth, height);

renderer.setClearColor(0xb9d3ff, 1);

document.body.append(renderer.domElement);

// 辅助三维坐标系
const axesHelper = new THREE.AxesHelper(200);

axesHelper.rotateY((-90 * Math.PI) / 180);
axesHelper.rotateX((-90 * Math.PI) / 180);

scene.add(axesHelper);

// 添加坐标系方向指示;
const dir1 = new THREE.Vector3(200, 0, 0);
dir1.normalize();
const dir2 = new THREE.Vector3(0, 200, 0);
dir2.normalize();
const dir3 = new THREE.Vector3(0, 0, 200);
dir3.normalize();
const origin = new THREE.Vector3(0, 0, 0);
const length = 200;

const arrowHelper1 = new THREE.ArrowHelper(dir3, origin, length, 0xff0000, 4);
const arrowHelper2 = new THREE.ArrowHelper(dir1, origin, length, 0x00ff00, 4);
const arrowHelper3 = new THREE.ArrowHelper(dir2, origin, length, 0x0000ff, 4);
scene.add(arrowHelper1);
scene.add(arrowHelper2);
scene.add(arrowHelper3);

const size = 200;
const divisions = 40;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

const loader = new STLLoader();

const models = [
  {
    url: '/public/model/s15/S15 - S15-BASE.STL',
    postion: [0, 0, 1],
  },
  {
    url: '/public/model/s15/S15 - S15_MODULE_40.STL',
    postion: [0, 0, 80],
  },
  {
    url: '/public/model/s15/S15 - S15_MK2_DOWN.STL',
    postion: [0, 0, 100],
  },
  {
    url: '/public/model/s15/S15 - S15_MODULE_20-1.STL',
    postion: [0, 100, 50],
  },
  {
    url: '/public/model/s15/S15 - S15_MK2_UP.STL',
    postion: [0, 50, 100],
  },
  {
    url: '/public/model/s15/S15 - S15_MODULE_20.STL',
    postion: [0, 0, 150],
  },
  {
    url: '/public/model/s15/S15 - S15_IO.STL',
    postion: [0, 0, 200],
  },
];

models.forEach((model) => {
  loader.load(model.url, function (geometry) {
    console.log(geometry);
    const material = new THREE.MeshPhongMaterial({
      color: 0xff5533,
      specular: 0x111111,
      shininess: 200,
    });
    const mesh = new THREE.Mesh(geometry, material);

    // mesh.position.set(...model.postion);
    // mesh.rotation.set(-Math.PI / 2, 0.3, 0);
    mesh.scale.set(0.1, 0.1, 0.1);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);
  });
});

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
const controls = new OrbitControls(camera, renderer.domElement);
</script>

<template>
  <div class="arm-view"></div>
</template>
