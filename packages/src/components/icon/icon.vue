<template>
  <i class="p-icon" :style="style">
    <slot v-if="$slots.default" />
    <svg v-else aria-hidden="true">
      <use :xlink:href="name"></use>
    </svg>
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isNumber } from '~/util'

defineOptions({
  name: 'PIcon'
})
interface Props {
  name?: string
  size?: string | number
  color?: string
}
const props = defineProps<Props>()
const name = computed(() => '#' + props.name)
const style = computed(() => {
  return {
    fontSize: isNumber(props.size) ? props.size + 'px' : props.size,
    color: props.color
  }
})
</script>

<style scoped lang="scss">
.p-icon {
  display: inline-flex;
  // 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果
  vertical-align: -0.15em;
  font-size: inherit;
  color: inherit;
  :deep(svg) {
    // currentColor代表当前元素的color值，如果没有显示的指定一个color值，那就遵从css规则从父元素继承而来
    fill: currentColor;
    // 将icon大小设置和字体大小一致，后续在通过svg-icon 使用icon的时候，可直接设置图标的font-size即可控制图标大小
    width: 1em;
    height: 1em;
  }
}
</style>
