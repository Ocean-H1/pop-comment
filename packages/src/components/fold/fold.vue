<template>
  <div class="p-fold">
    <div class="text-box" :class="{ 'over-hidden': fold }">
      <div ref="divBox">
        <slot></slot>
      </div>
    </div>
    <div class="action-box">
      <div v-if="isExceeded && unfold" class="expand-btn" @click="fold = !fold">{{ fold ? '展开' : '收起' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import './style/index.scss'

defineOptions({
  name: 'PFold'
})

interface Props {
  line?: number | string
  unfold?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  line: 5
})
const line = computed(() => {
  let line = Math.trunc(Number(props.line))
  return line > 0 ? line : 1
})

// 当前是否是展开状态,默认为收起
const fold = ref(true)
// 当前文本是否超出指定line,默认未超出
const isExceeded = ref(false)

const divBox = ref<HTMLDivElement>()
let observer: ResizeObserver

onMounted(() => {
  observer = new ResizeObserver(entry => {
    if (divBox.value && fold.value) {
      // offsetHeight：包括内容可见部分的高度，border，可见的padding，水平方向的scrollbar（如果存在）；不包括margin。
      // clientHeight：包括内容可见部分的高度，可见的padding；不包括border，水平方向的scrollbar，margin。
      // scrollHeight：包括内容的高度（可见与不可见），padding（可见与不可见）；不包括border，margin。
      isExceeded.value = divBox.value.offsetHeight < divBox.value.scrollHeight
    }
  })
  observer.observe(divBox.value as any)
})
onUnmounted(() => {
  observer.disconnect()
})
</script>

<style scoped lang="scss">
@use './style/index.scss' with (
  $line: v-bind(line)
);
</style>
