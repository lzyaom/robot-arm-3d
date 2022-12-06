<script setup lang="ts">
import { ref } from 'vue'
import ModelView from '@/components/ModelView/index.vue'
const model = ref<string>('common')
const modelRef = ref<InstanceType<typeof ModelView> | null>(null)

const rotate = () => {
  modelRef.value.update([0, 0, 90, 0, 90, 0])
}
</script>

<template>
  <model-view
    :model="model"
    ref="modelRef"
    style="width: 600px; height: 600px"
  />
  <label for="model">当前模型：</label>
  <select v-model="model" name="model" id="model">
    <option value="common" label="common"></option>
    <option value="s15" label="s15"></option>
  </select>
  <button @click="rotate">J1</button>
  <button @click="rotate">J2</button>
  <button @click="rotate">J3</button>
  <button @click="rotate">J4</button>
  <button @click="rotate">J5</button>
  <button @click="rotate">J6</button>
</template>
