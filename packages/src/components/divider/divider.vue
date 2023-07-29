<template>
  <div class="p-divider" :class="{ vertical: vertical }">
    <fieldset class="field">
      <legend v-if="$slots.default || vertical" class="inner" :class="position"><slot></slot></legend>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

defineOptions({
  name: 'PDivider'
})

interface Props {
  vertical?: boolean // 是否垂直
  position?: string // 内容位置
  borderStyle?: string // 分割线样式
}
const props = withDefaults(defineProps<Props>(), {
  position: 'center',
  borderStyle: 'solid'
})
const position = ref('')

watch(
  () => props.position,
  val => {
    switch (val) {
      case 'left':
        position.value = 'is-left'
        break
      case 'right':
        position.value = 'is-right'
        break
    }
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss">
.p-divider {
  font-size: 14px;
  margin: 1rem 0;
  .field {
    border: 0;
    margin: 0;
    padding: 0;
    border-top: 1px v-bind('$props.borderStyle') var(--p-fill-color-light);
    .inner {
      margin: 0 auto;
      padding: 0 10px;
    }

    .is-left {
      margin-left: 20px;
    }

    .is-right {
      margin-right: 20px;
    }
  }
}

.vertical {
  display: inline-block;
  vertical-align: middle;
  .field {
    border: 0;
    .inner {
      margin: 0;
      padding: 0;
    }
    .inner::before {
      content: '';
      border-left: 1px v-bind('props.borderStyle') var(--p-fill-color-light);
      margin: 0 8px;
    }
  }
}
</style>
