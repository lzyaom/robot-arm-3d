<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { ModelView } from './ModelView'
import { models } from './models'

const props = defineProps<{
  model: 's15' | 'common'
  pose: Array<number>
}>()

const modelViewRef = ref<HTMLDivElement | null>(null)
let model: ModelView | null = null
onMounted(() => {
  if (!model) {
    model = new ModelView({
      el: modelViewRef.value!,
      models: models[props.model],
      background: 0xb9d3ff,
      scale: 0.1,
      initPose: props.pose,
    })
  }
})

onUnmounted(() => {
  model!.destory()
  model = null
})

const update = (angles: number[]) => {
  model?.update(angles)
}
defineExpose({
  update,
})
watch(
  () => props.model,
  (val) => {
    model!.reset(models[val])
  }
)
</script>

<template>
  <div class="model-view" ref="modelViewRef"></div>
</template>
