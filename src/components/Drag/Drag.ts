export interface DragOptions {}

export interface DragData {
  target: HTMLElement
  deep: number
  parentEl: HTMLElement
  data: any
  [k: string]: any
}

interface Position {
  x: number
  y: number
}

export default class Drag {
  private $el: HTMLElement | null = null
  private dropContainer: HTMLElement | null = null
  private $options: DragOptions

  private dragEl: Node | null = null

  private postion: Position = { x: 0, y: 0 }

  constructor(
    el: HTMLElement,
    dropContainer: HTMLElement,
    options: DragOptions
  ) {
    this.$el = el
    this.$options = options

    if (el === undefined) {
      throw new Error('bind element is undefined')
    }

    this.init()
  }
  init() {
    this.$el!.addEventListener('mousedown', this.onMouseDown)
    this.$el!.addEventListener('mousemove', this.onMove)
    this.$el!.addEventListener('mouseup', this.onMouseUp)

    this.$el!.addEventListener('touchstart', this.onMouseDown)
    this.$el?.addEventListener('touchmove', this.onMove)
    this.$el?.addEventListener('touchend', this.onMouseUp)
  }

  onMouseDown(e: MouseEvent | TouchEvent) {
    const target = e.target as HTMLElement
    const cloneEl = target.cloneNode(true)
    this.dragEl = cloneEl
  }
  onMove(e: MouseEvent | TouchEvent) {
    e.preventDefault()
    const {} = e.target as HTMLElement

    // todo: 拖拽视图跟随移动
  }

  onMouseUp(e: MouseEvent | TouchEvent) {
    const target = e.target as HTMLElement
    const {
      clientWidth,
      clientHeight,
      offsetLeft: parentOffsetLeft,
      offsetTop: parentOffsetTop,
    } = this.dropContainer!
    const { offsetLeft, offsetTop } = target

    // 边界检测：
    // 1. 左边 position.x < offsetLeft + parentEl.offsetLeft
    // 2. 右边 postion.x > parent.offseLeft + clinetWidth + offsetLeft
    // 3. 上边 postion.y < parent.offsetTop + offsetTop
    // 4. 下边 postion.y > parent.offsetTop + offsetTop + clientHeight
    const left = parentOffsetLeft + offsetLeft
    const right = parentOffsetLeft + offsetLeft + clientWidth
    const top = parentOffsetTop + offsetTop
    const bottom = parentOffsetTop + offsetTop + clientHeight
    const { x, y } = this.postion
    if (x < left || x > right || y < top || y > bottom) {
      return
    }

    // 在范围内：
    this.dropContainer!.insertBefore(this.dragEl!, target.nextSibling)
    /*
      todo: 层级
      up: 判断 target.previousSibling 是否存在并且不为容器元素
          1. 不存在则为第 1 层
          2. 否则层级为 父元素的子节点 children 的索引
    */
  }

  destory() {
    this.$el!.removeEventListener('mousedown', this.onMouseDown)
    this.$el!.removeEventListener('mousemove', this.onMove)
    this.$el!.removeEventListener('mouseup', this.onMouseUp)

    this.$el!.removeEventListener('touchstart', this.onMouseDown)
    this.$el!.removeEventListener('touchmove', this.onMove)
    this.$el!.removeEventListener('touchend', this.onMouseUp)
  }
}
