<script setup lang="ts">
import { ref } from 'vue'
import ModelView from '@/components/ModelView/index.vue'
const model = ref<string>('common')
const modelRef = ref<InstanceType<typeof ModelView> | null>(null)
const angle = ref<Array<number>>([0, 0, 0, 0, 0, 0])
const add = (n: number) => {
  angle.value[n] += 5
  modelRef.value!.update(angle.value.slice())
}
</script>

<template>
  <model-view
    :model="model"
    :pose="angle"
    ref="modelRef"
    style="width: 600px; height: 600px"
  />
  <label for="model">当前模型：</label>
  <select v-model="model" name="model" id="model">
    <option value="common" label="common"></option>
    <option value="s15" label="s15"></option>
  </select>
  <button v-longpress="() => add(0)">J1</button>
  <button v-longpress="() => add(1)">J2</button>
  <button v-longpress="() => add(2)">J3</button>
  <button v-longpress="() => add(3)">J4</button>
  <button v-longpress="() => add(4)">J5</button>
  <button v-longpress="() => add(5)">J6</button>
</template>
