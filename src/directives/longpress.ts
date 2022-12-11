import { FunctionDirective } from 'vue'

const vLongPress: FunctionDirective = (el: HTMLElement, binding) => {
  let timer: any = null

  const start = (e: Event) => {
    if (timer === null) {
      timer = setTimeout(() => {
        handler(e)
      }, 1000)
    }
  }

  const handler = (e: Event) => {
    binding.value(e)
  }

  const cancel = () => {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }
  el.addEventListener('mousedown', start)
  el.addEventListener('touchstart', start)
  el.addEventListener('click', cancel)
  el.addEventListener('mouseup', cancel)
  el.addEventListener('touchend', cancel)
  el.addEventListener('touchcancel', cancel)
}
export default vLongPress
