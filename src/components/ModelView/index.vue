<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { models, ModelType } from './models'

const props = defineProps<{
  model: 's15' | 'common'
}>()

const modelViewRef = ref<HTMLDivElement | null>(null)
const scene = new THREE.Scene()
let camera: THREE.PerspectiveCamera | null = null
const scale = 0.1

const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0xb9d3ff, 1)
let controls: OrbitControls | null = null

const pointLight = new THREE.PointLight(0xffffff)

pointLight.position.set(3500, 2200, 2200)

scene.add(pointLight)

// 辅助三维坐标系
const axesSize = 400
const axesHelper = new THREE.AxesHelper(axesSize)
scene.add(axesHelper)
//#region
// axesHelper.rotateY((-90 * Math.PI) / 180)
// axesHelper.rotateX((-90 * Math.PI) / 180)

// 添加坐标系方向指示;
/* const dir1 = new THREE.Vector3(axesSize, 0, 0)
dir1.normalize()
const dir2 = new THREE.Vector3(0, axesSize, 0)
dir2.normalize()
const dir3 = new THREE.Vector3(0, 0, axesSize)
dir3.normalize()
const origin = new THREE.Vector3(0, 0, 0)

const arrowHelper1 = new THREE.ArrowHelper(dir3, origin, axesSize, 0xff0000, 8)
const arrowHelper2 = new THREE.ArrowHelper(dir1, origin, axesSize, 0x00ff00, 8)
const arrowHelper3 = new THREE.ArrowHelper(dir2, origin, axesSize, 0x0000ff, 8)
scene.add(arrowHelper1)
scene.add(arrowHelper2)
scene.add(arrowHelper3) */
//#endregion
const divisions = 40

const gridHelper = new THREE.GridHelper(axesSize, divisions)
scene.add(gridHelper)

const loader = new STLLoader()

const modelMap = new Map<any, THREE.Object3D>()

let loadModelCount = 0

const loadModel = () => {
  const realModel = models[props.model]
  realModel.forEach((model) => {
    loader.load(model.url, function (geometry) {
      loadModelCount++
      const material = new THREE.MeshPhongMaterial({
        // color: 0xff5533,
        specular: 0x111111,
        shininess: 200,
      })
      const mesh = new THREE.Mesh(geometry, material)

      // mesh.position.set(...model.postion);
      mesh.scale.set(scale, scale, scale)

      mesh.castShadow = true
      mesh.receiveShadow = true

      modelMap.set(model, mesh)
      if (loadModelCount === realModel.length) {
        initGroup()
      }
    })
  })
}
const initGroup = () => {
  const realModel = models[props.model]
  createGroup(realModel[0], realModel, scene)
  if (props.model === 's15') {
    const jointObj = scene.getObjectByName('base')!
    jointObj.rotateX(Math.PI / 2)
  }
}
const createGroup = (
  node: ModelType,
  models: Array<ModelType>,
  parentGroup: THREE.Object3D
) => {
  const groupObj = new THREE.Object3D()

  const group = new THREE.Group()
  groupObj.name = node.name
  const mesh = modelMap.get(node)!
  group.add(mesh)
  groupObj.add(group)
  if (node.center) {
    // 设置旋转中心，否则轴的旋转中心在原点
    const { x, y, z } = node.center
    groupObj.position.set(x * scale, y * scale, z * scale)
    group.position.set(-x * scale, -y * scale, -z * scale)
  }
  const children = node.children
  if (children.length) {
    children.forEach((child: number) => {
      createGroup(models[child], models, group)
    })
  }
  // parentGroup.add(group)
  parentGroup.add(groupObj)
}

const init = () => {
  const { width, height } = getSize()
  camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 100000)
  camera.position.set(350, 220, 400)
  camera.lookAt(scene.position)

  controls = new OrbitControls(camera, renderer.domElement)
  renderer.setSize(width, height)
}
const getSize = () => {
  const width = modelViewRef.value!.clientWidth
  const height = modelViewRef.value!.clientHeight
  return {
    width,
    height,
  }
}
function render() {
  const { width, height } = getSize()
  controls!.update()
  renderer.setSize(width, height)
  camera!.aspect = width / height
  camera!.updateProjectionMatrix()
  const { x, y, z } = camera!.position
  pointLight.position.set(x, y, z)
  renderer.render(scene, camera!)
  requestAnimationFrame(render)
}

const rotate = (joint: number) => {
  const jointObj = scene.getObjectByName('J' + joint)!
  const { x, y, z } = models[props.model][joint].rotate!
  const axis = new THREE.Vector3(x, y, z)
  jointObj?.rotateOnAxis(axis.normalize(), (90 * Math.PI) / 180)
  render()
}
defineExpose({
  rotate,
})
watch(
  () => props.model,
  () => {
    loadModelCount = 0
    modelMap.clear()
    const group = scene.getObjectByName('base')
    scene.remove(group!)
    loadModel()
    render()
  }
)
onMounted(() => {
  modelViewRef.value!.appendChild(renderer.domElement)
  init()
  loadModel()
  render()
})
</script>

<template>
  <div class="model-view" ref="modelViewRef"></div>
  <!-- <button @click="rotate">J3</button> -->
</template>
