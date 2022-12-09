import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { ModelType } from './models'
type ModelOptions = {
  el: HTMLElement
  scale: number
  background: number
  models: Array<ModelType>
  fov?: number
}
type JointToAngle = {
  [k: string]: number
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
    const [x, y, z] = node.center
    groupObj.position.set(x, y, z)
    group.position.set(-x, -y, -z)
  }
  const children = node.children
  if (children.length) {
    children.forEach((child: number) => {
      createGroup(models[child], models, group)
    })
  }
  parentGroup.add(groupObj)
}
const modelMap = new Map<ModelType, THREE.Object3D>()

const deepClone = (params: any) => JSON.parse(JSON.stringify(params))

export class ModelView {
  private $el: HTMLElement | null = null
  private width: number = 0
  private height: number = 0
  private scene: THREE.Scene | null = null
  private camera: THREE.PerspectiveCamera | null = null
  private axes: THREE.AxesHelper | null = null
  private pointLight: THREE.PointLight | null = null
  private render: THREE.WebGLRenderer | null = null
  private control: OrbitControls | null = null
  private loader: STLLoader | null = null
  private loadModelCount: number = 0
  private models: Array<ModelType> = []
  private rotateAngle: Array<number> = [0, 0, 0, 0, 0, 0]
  private $options: ModelOptions
  scale: number = 1
  axesSize: number = 400
  background: number
  private fov: number = 0

  constructor(options: ModelOptions) {
    this.$options = options
    this.$el = options.el
    const { clientWidth, clientHeight } = options.el
    this.width = clientWidth
    this.height = clientHeight
    this.models = deepClone(options.models) // 因引用类型导致旋转中心会多次与 scale 相成
    this.scale = options.scale
    this.background = options.background
    this.fov = options.fov || 45
    this.init()
  }

  private init(): void {
    this.initScene()
    this.initCamera()
    this.initGrid()
    this.initAxes()
    this.initLight()
    this.initModel()
    this.initRender()
    this.initControl()
    this.renderHandler()
  }

  private initScene(): void {
    const scene = new THREE.Scene()
    // scene.position.set(-220, -60, 0)
    this.scene = scene
  }

  private initCamera(): void {
    const camera = new THREE.PerspectiveCamera(
      this.fov,
      this.width / this.height,
      0.5,
      1000000
    )
    camera.up.set(0, 1, 0)
    camera.position.set(-320, 180, 10)
    camera.lookAt(this.scene!.position)
    this.camera = camera
    this.scene!.add(camera)
  }

  private initLight(): void {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0x111111)
    this.scene!.add(ambientLight)
    // 点光
    const pointLight = new THREE.PointLight(0xffffff)
    pointLight.position.set(3500, 2200, 2200)
    this.scene!.add(pointLight)
    this.pointLight = pointLight
  }

  private initGrid(): void {
    const divisions = 40
    const gridHelper = new THREE.GridHelper(this.axesSize, divisions)
    this.scene!.add(gridHelper)
  }

  private initAxes(): void {
    // 辅助三维坐标系
    const axesHelper = new THREE.AxesHelper(this.axesSize)
    axesHelper.rotateZ((180 * Math.PI) / 180)
    axesHelper.rotateX((90 * Math.PI) / 180)
    this.scene!.add(axesHelper)
    this.axes = axesHelper

    //#region
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
  }

  private initRender(): void {
    const render = new THREE.WebGLRenderer()
    render.setClearColor(this.background, 1)
    render.setPixelRatio(window.devicePixelRatio)
    render.setSize(this.width, this.height)
    render.render(this.scene!, this.camera!)
    this.render = render
    this.$el?.appendChild(render.domElement)
  }

  private initControl(): void {
    this.control = new OrbitControls(this.camera!, this.render!.domElement)
    // this.control.addEventListener('change', this.renderHandler.bind(this))
  }

  private initModel(): void {
    const loader = new STLLoader()
    this.loader = loader
    for (let i = 0; i < this.models.length; i++) {
      const model = this.models[i]
      if (model.center) {
        model.center = model.center.map((item) => item * this.scale)
      }
      loader.load(model.path, (geometry) => {
        this.loadModelCount++
        const material = new THREE.MeshPhongMaterial({
          // color: 0xff5533,
          specular: 0x111111,
          shininess: 200,
        })
        const mesh = new THREE.Mesh(geometry, material)

        mesh.scale.set(this.scale, this.scale, this.scale)

        mesh.castShadow = true
        mesh.receiveShadow = true

        modelMap.set(model, mesh)
        if (this.loadModelCount === this.models.length) {
          this.initGroup()
        }
      })
    }
  }

  private initGroup(): void {
    createGroup(this.models[0], this.models, this.scene!)
    // if (props.model === 's15') {
    //   const jointObj = scene.getObjectByName('base')!
    //   jointObj.rotateX(Math.PI / 2)
    // }
  }

  private renderHandler(): void {
    this.control!.update()
    this.camera!.aspect = this.width / this.height
    this.camera!.updateProjectionMatrix()
    const { x, y, z } = this.camera!.position
    this.pointLight!.position.set(x, y, z)
    this.render!.render(this.scene!, this.camera!)
    requestAnimationFrame(this.renderHandler.bind(this))
  }

  /**
   * 更新机械臂各个轴的角度
   * @param angles 每个轴的角度
   */
  update(angles: Array<number>): void {
    const rotateAngle = this.rotateAngle.slice()
    const jointToAngleMap: JointToAngle = angles.reduce(
      (prev, item, i: number) => {
        const j = i + 1
        if (item !== rotateAngle[i] && !prev[j]) {
          prev[j] = item
        }
        return prev
      },
      {} as JointToAngle
    )
    const keys = Object.keys(jointToAngleMap)
    if (keys.length === 0) {
      // 没有改变关节角度
      return
    }
    for (let i = 0; i < keys.length; i++) {
      const joint = Number(keys[i])
      const jointObj = this.scene!.getObjectByName('J' + joint)!
      const { x, y, z } = this.models[joint].rotate!
      const axis = new THREE.Vector3(x, y, z)
      // jointObj?.rotateOnAxis(
      //   axis.normalize(),
      //   (jointToAngleMap[joint] * Math.PI) / 180
      // )
      jointObj?.setRotationFromAxisAngle(
        axis.normalize(),
        (jointToAngleMap[joint] * Math.PI) / 180
      )
    }
    this.rotateAngle = angles
    this.renderHandler()
  }

  /**
   * 放大视图
   */
  zoomIn(): void {
    this.fov += 5
    this.camera!.fov = this.fov
    this.renderHandler()
  }

  /**
   * 缩小视图
   */
  zoomOut(): void {
    this.fov -= 5
    this.camera!.fov = this.fov
    this.renderHandler()
  }
  /**
   * 重置视图
   */
  zoomReset(): void {
    this.camera!.fov = this.$options.fov!
    this.renderHandler()
  }

  /**
   *
   */
  destory(): void {
    modelMap.clear()
    this.scene!.remove()
    this.scene!.clear()
    this.$el!.removeChild(this.render!.domElement)
    this.render!.clear()
    this.render!.dispose()
    this.render!.forceContextLoss()
    // this.render!.content = null
    // cancelAnimationFrame(animationID) // 去除animationFrame
    const gl = this.render!.domElement.getContext('webgl')
    gl && gl.getExtension('WEBGL_lose_context')!.loseContext()
  }

  /**
   * 重置模型
   * @param models 新模型
   */
  reset(models: ModelType[]): void {
    this.loadModelCount = 0
    this.rotateAngle = [0, 0, 0, 0, 0, 0]
    this.destory()
    this.models = deepClone(models)
    this.init()
  }
}
