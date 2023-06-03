<template>
  <div class="page">
    <el-scrollbar class="slider">
      <div class="title" v-if="props.title">
        <h1>{{ title }}</h1>
      </div>
      <div class="content">
        <div
          v-for="(tab, index) in components"
          :key="index"
          class="menu-li"
          @click="switchTab(tab)"
          :class="bindClass(tab)"
        >
          {{ tab.name }}
        </div>
      </div>
    </el-scrollbar>
    <el-scrollbar class="container">
      <component :is="currentTab.component"></component>
    </el-scrollbar>
    <el-switch></el-switch>
  </div>
</template>

<script setup lang="ts">
import { markRaw, reactive } from 'vue'

interface Props {
  title?: string
  components: any[]
}
const props = defineProps<Props>()

const currentTab = reactive({
  name: props.components[0].name,
  component: markRaw(props.components[0])
})

const bindClass = (tab: any) => {
  return currentTab.name.toLocaleLowerCase() === tab.name.toLocaleLowerCase() ? 'current-tab' : ''
}
const switchTab = (tab: any) => {
  currentTab.name = tab.name
  currentTab.component = markRaw(tab)
}
</script>

<style scoped lang="scss">
.page {
  display: flex;
  justify-content: start;
  height: 100vh;
  .slider {
    text-align: center;
    width: 200px;
    border: 1px solid #e1e1e1;
    box-sizing: border-box;
    min-height: 100vh;
    .title {
      margin-bottom: 10px;
    }
    .menu-li {
      height: 40px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 400;
    }
  }
  .container {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  .current-tab {
    color: rgb(30, 128, 255);
  }
}
</style>
