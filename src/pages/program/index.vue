<script lang="ts" setup>
import { ref, h } from 'vue'
import type { MenuOption } from 'naive-ui'

const inverted = ref<boolean>(false)
const menuOptions = ref<Array<MenuOption>>([
  {
    label: '变量声明',
    key: 'variable',
    children: [
      {
        label: 'const',
        key: 'const',
        drag: true,
      },
      {
        label: 'let',
        key: 'let',
        drag: true,
      },
      {
        label: 'var',
        key: 'var',
        drag: true,
      },
    ],
  },
  {
    label: '逻辑',
    key: 'logic',
    children: [
      {
        label: 'if',
        key: 'if',
        drag: true,
      },
      {
        label: '? : ',
        key: '? : ',
      },
      {
        label: '&',
        key: '&',
      },
      {
        label: '||',
        key: '||',
      },
      {
        label: '!',
        key: '!',
      },
    ],
  },
  {
    label: '循环',
    key: 'loop',
    children: [
      {
        label: 'for',
        key: 'for',
      },
      {
        label: 'for...in',
        key: 'for...in',
      },
      {
        label: 'for...of',
        key: 'for...of',
      },
      {
        label: 'while',
        key: 'while',
      },
      {
        label: 'do...while',
        key: 'do{}while();',
      },
    ],
  },
  {
    label: '函数',
    key: 'function',
  },
  {
    label: '类',
    key: 'class',
  },
])
const lang = ref<string>('js')
let contentRef = ref<HTMLDivElement>()

const renderMenuLabel = (option: MenuOption) => {
  // if ('drag' in option) {
  return h(
    'div',
    {
      draggable: true,
      onDrag: drag,
      onDragstart: dragStart,
      onDragend: dragEnd,
    },
    option.label as string
  )
  // }
  // return option.label as string
}
// let drapEl: HTMLElement
const drag = (e: DragEvent) => {
  e.dataTransfer!.dropEffect = 'move'
}
const dragStart = (e: DragEvent) => {
  const target = e.target! as HTMLElement
  e.dataTransfer!.setData('text/plain', target.textContent!)
}
const dragOver = (e: DragEvent) => {
  e.preventDefault()
  e.dataTransfer!.dropEffect = 'copy'
}
const dragEnd = (e: Event) => {
  console.log(e)
}

const drop = (e: DragEvent) => {
  e.preventDefault()
  console.log(e)
  const { offsetX } = e
  const data = e.dataTransfer?.getData('text/plain')!
  const target = e.target as HTMLElement
  // const prevSibling = target.previousElementSibling
  let layer = 1
  const distance = 48
  const wrapper = document.createElement('div')
  wrapper.className = `lang-block lang-${lang.value}-${data}`

  layer = Math.floor(offsetX / distance) + 1
  // if (prevSibling?.className === 'content') {
  //   layer = 1
  // }

  wrapper.className += ` layer-${layer}`
  wrapper.innerText = data
  wrapper.style.marginLeft = distance * (layer - 1) + 'px'
  target.insertBefore(wrapper, target.nextSibling)
}
</script>

<template>
  <div class="program">
    <n-layout>
      <n-layout-header :inverted="inverted" bordered> Header </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
          :inverted="inverted"
        >
          <n-menu
            :inverted="inverted"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :render-label="renderMenuLabel"
          />
        </n-layout-sider>
        <n-layout-content>
          <div
            class="content"
            ref="contentRef"
            @drop="drop"
            @dragover="dragOver"
          ></div>
        </n-layout-content>
      </n-layout>
      <!-- <n-layout-footer :inverted="inverted" bordered> Footer </n-layout-footer> -->
    </n-layout>
    <!-- <div
      class="left"
      @dragstart="dragStart"
      @drag="drag"
      @dragend="dragEnd"
      draggable="true"
    >
      语料区（各个语言的语法） -->
    <!-- </div> -->
    <!-- <div class="content" @drop="drop" @dragover="dragOver">拖拽释放区</div> -->
    <!-- <div class="review text-xl">预览区</div> -->
  </div>
</template>

<style>
.program {
  user-select: none;
}
.left {
  width: 25%;
  background-color: antiquewhite;
}
.content {
  width: 50%;
  height: 100%;
  padding: 24px;
  overflow-x: hidden;
  overflow-y: auto;
}
.content > .lang-block {
  max-width: 50%;
  line-height: 38px;
  background-color: #89c8ee;
  color: #fff;
  padding-left: 48px;
  position: relative;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
}
.content > .lang-block:not(:last-child) {
  margin-bottom: 4px;
}
</style>
