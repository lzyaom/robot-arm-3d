<script lang="ts" setup>
interface ModelTools {
  name: string
  icon: string
}
defineProps<{
  data: Array<ModelTools>
}>()
</script>

<template>
  <ul class="toolbar">
    <li class="toolbar-item" v-for="item in data" :key="item.name"></li>
  </ul>
</template>
