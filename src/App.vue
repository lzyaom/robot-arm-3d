<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;

const s = 100;

const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 0.5, 100000);

camera.position.set(3500, 2200, 2200);

camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();

const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(3500, 2200, 2200);

scene.add(pointLight);

renderer.setSize(width, height);

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
    children: [1],
  },
  {
    url: '/public/model/s15/S15 - S15_MODULE_40.STL',
    postion: [0, 0, 80],
    children: [2],
  },
  {
    url: '/public/model/s15/S15 - S15_MK2_DOWN.STL',
    postion: [0, 0, 100],
    children: [3],
  },
  {
    url: '/public/model/s15/S15 - S15_MODULE_20-1.STL',
    postion: [0, 100, 50],
    children: [4],
  },
  {
    url: '/public/model/s15/S15 - S15_MK2_UP.STL',
    postion: [0, 50, 100],
    children: [5],
  },
  {
    url: '/public/model/s15/S15 - S15_MODULE_20.STL',
    postion: [0, 0, 150],
    children: [6],
  },
  {
    url: '/public/model/s15/S15 - S15_IO.STL',
    postion: [0, 0, 200],
    children: [],
  },
];
const modelMap = new Map();

let loadModelCount = 0;
models.forEach((model) => {
  loader.load(model.url, function (geometry) {
    loadModelCount++;
    const material = new THREE.MeshPhongMaterial({
      // color: 0xff5533,
      specular: 0x111111,
      shininess: 200,
    });
    const mesh = new THREE.Mesh(geometry, material);

    // mesh.position.set(...model.postion);
    mesh.scale.set(0.1, 0.1, 0.1);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    modelMap.set(model, mesh);
    if (loadModelCount === models.length) {
      createGroup();
    }
  });
});

const createGroup = () => {
  const group = new THREE.Object3D();
  for (const [model, mesh] of modelMap) {
    const children = model.children;
    if (children.length) {
      children.forEach((child) => {
        mesh.children.push(modelMap.get(models[child]));
      });
    }
    group.add(mesh);
  }

  group.rotateX(Math.PI / 2);
  // group.rotateZ(Math.PI / 2);
  scene.add(group);
};
const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  controls.update();
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  const { x, y, z } = camera.position;
  pointLight.position.set(x, y, z);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
</script>

<template>
  <div class="arm-view"></div>
</template>
