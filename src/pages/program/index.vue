<script lang="ts" setup>
const drag = (e: Event) => {
  console.log(e)
}
const dragStart = (e: Event) => {
  console.log(e)
}
const dragOver = (e: Event) => {
  console.log(e)
  e.preventDefault()
}
const dragEnd = (e: Event) => {
  console.log(e)
}

const drop = (e: Event) => {
  console.log(e)
}
</script>

<template>
  <div class="program">
    <div
      class="left"
      @dragstart="dragStart"
      @drag="drag"
      @drop="drop"
      draggable="true"
    >
      语料区（各个语言的语法）
    </div>
    <div class="content" @dragover="dragOver" @dragend="dragEnd">
      拖拽释放区
    </div>
    <div class="review">预览区</div>
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
  width: 30%;
  background-color: aquamarine;
}
</style>
