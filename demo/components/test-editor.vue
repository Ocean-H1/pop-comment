<!-- 
 * @Description: editor 组件测试
 * @Author: OceanH
 * @Date: 2023-08-04 22:11:48
!-->
<template>
  <p-editor
    ref="editorRef"
    v-model="content"
    @focus="handleFocus"
    @input="handleInput"
    @update:modelValue="handleChange"
    @submit="handleSubmit"
  ></p-editor>
  <el-button type="primary" @click="clear">清空内容</el-button>
  <el-button type="primary" @click="add('测试添加内容')">添加内容</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'testEditor'
})

const content = ref('')
const editorRef = ref()

const handleFocus = (e: Event) => {
  console.log('focus事件', e)
}

const handleInput = (e: Event) => {
  console.log('input事件', e)
}

const handleChange = (val: string) => {
  console.log('update:modelValue', val)
}

const clear = () => {
  editorRef.value.clear()
}

const handleSubmit = () => {
  console.log('submit')
}

const add = (val: string) => {
  editorRef.value.addText(val)
}
</script>

<style scoped lang="scss"></style>
