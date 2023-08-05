<!-- 
 * @Author: OceanH
 * @Date: 2023-08-04 22:06:56
!-->
<template>
  <div class="p-editor" :class="{ active: isActive }">
    <div
      ref="editorRef"
      contenteditable
      :placeholder="placeholder"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      v-html="text"
      @keydown.enter="keyDown"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { isEmpty } from '~/util'

defineOptions({
  name: 'PEditor'
})

interface Props {
  placeholder?: string
  modelValue: string
  minHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  minHeight: 30
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'input', event: Event): void
  (e: 'focus', event: Event): void
  (e: 'blur', event: Event): void
  (e: 'submit'): void
}>()
const isActive = ref(false)
const isLocked = ref(false)
const editorRef = ref<HTMLDivElement>()
const minHeight = computed(() => props.minHeight + 'px')
const padding = computed(() => (props.minHeight == 30 ? '4px 10px' : '8px 12px'))
const text = ref('')
const range = ref<Range>()

const onFocus = (e: Event) => {
  emit('focus', e)
  isActive.value = true
  isLocked.value = true
}

const onBlur = (e: Event) => {
  // 记录光标信息
  range.value = window.getSelection()?.getRangeAt(0)
  emit('blur', e)
  if (!editorRef.value?.innerHTML) isActive.value = false
  isLocked.value = false
}

const onInput = (e: Event) => {
  const { innerHTML } = e.target as HTMLDivElement
  emit('update:modelValue', innerHTML)
  emit('input', e)
}

const keyDown = (e: KeyboardEvent) => {
  // 按下 Ctrl + K
  if (e.ctrlKey && e.key === 'Enter') {
    if (isEmpty(props.modelValue.replace(/&nbsp;|<br>| /g, ''))) {
      alert('内容不能为空!')
    } else {
      console.log(props.modelValue)
      emit('submit')
    }
  }
}

// 清空内容
const clear = () => {
  if (editorRef.value) {
    editorRef.value.innerHTML = ''
    emit('update:modelValue', editorRef.value.innerHTML)
    isActive.value = false
  }
}

const addText = (val: string) => {
  let selection = window.getSelection()
  if (selection) {
    // 取消选中
    selection.removeAllRanges()
    // 为空初始化光标
    if (!range.value) {
      editorRef.value?.focus()
      range.value = selection.getRangeAt(0)
    }

    // 清空所选内容
    range.value.deleteContents()

    // 添加内容
    range.value.insertNode(range.value.createContextualFragment(val))

    range.value.collapse(false)
    selection.addRange(range.value)

    emit('update:modelValue', editorRef.value?.innerHTML || '')
    const event = editorRef.value as unknown as Event
    emit('input', event)
  }
}

// 原生focus
const focus = () => {
  nextTick(() => {
    editorRef.value?.focus()
  })
}

watch(
  () => props.modelValue,
  val => {
    if (!isLocked.value) text.value = val
  }
)

// const transformVal = (e: Event) => {
//   const el = e.target as HTMLDivElement
//   if (el.innerHTML == '<br>') {
//     el.innerHTML = ''
//   }
// }

// onMounted(() => {
//   editorRef.value?.addEventListener('keyup', transformVal)
// })

defineExpose({
  clear,
  focus,
  addText
})
</script>

<style scoped lang="scss">
@use './style/index.scss' with (
  $minHeight: v-bind('minHeight'),
  $padding: v-bind('padding')
);
</style>
