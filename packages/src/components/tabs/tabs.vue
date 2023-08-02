<template>
  <div class="p-tabs">
    <el-scrollbar>
      <ul class="p-tabs-ul" :class="{ 'classic-style': classic }">
        <li
          class="p-tabs-ul-li"
          v-for="(v, k) in modelValue"
          :key="k"
          @click="activeIndex = k"
          :class="{ 'is-active': activeIndex === k }"
          @contextmenu.prevent="onContextMenu(v, $event)"
        >
          <span>{{ v.meta.title }}</span>
          <!-- 使用stop事件修饰符阻止事件冒泡 -->
          <p-icon v-if="!v.meta.isAffix" @click.stop="eventSubmit(1, v)">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
              ></path>
            </svg>
          </p-icon>
        </li>
      </ul>
    </el-scrollbar>
    <contextMenu ref="contextMenuRef" :dropdown="dropdown" @submit="eventSubmit"></contextMenu>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRef, watch } from 'vue'
import { TabApi } from './interface'
import contextMenu from './context-menu.vue'

defineOptions({
  name: 'PTabs'
})
interface Props {
  // 是否使用经典样式风格
  classic?: boolean
  modelValue: TabApi[]
}

const props = defineProps<Props>()
// 转化响应式数据
const tabsList = toRef(props, 'modelValue')
const emit = defineEmits<{
  (e: 'select', tab: TabApi | undefined): void
  (e: 'refresh', tab: TabApi): void
  (e: 'close', tag: TabApi): void
  (e: 'closeOther', tag: TabApi): void
  (e: 'closeAll'): void
  (e: 'fullScreen', tag: TabApi): void
}>()
const activeIndex = ref(0)
const dropdown = reactive({
  x: 0,
  y: 0
})

watch(
  () => activeIndex.value,
  (val: number) => {
    emit(
      'select',
      tabsList.value.find((v, k) => k === val)
    )
  }
)

// 关闭
const close = (targetTab: TabApi) => {
  tabsList.value.forEach((v, k) => {
    if (!v.meta.isAffix && v.path === targetTab.path) {
      tabsList.value.splice(k, 1)
      // 关闭后,处理激活标签项的变化
      if (k === activeIndex.value) {
        const arr = [k, k - 1]
        const indexes = arr.filter(v => v >= 0 && v < tabsList.value.length)
        activeIndex.value = indexes[0]
        // 主动触发select事件
        if (activeIndex.value === k) {
          emit(
            'select',
            tabsList.value.find((v, k) => v.path == targetTab.path)
          )
        }
      } else if (k < activeIndex.value) {
        activeIndex.value -= 1
      }
    }
  })
}

// 关闭 其他/全部
const closeOther = (tab?: TabApi) => {
  const newList = tabsList.value.filter(v => v.meta.isAffix)
  if (tab && !tab.meta.isAffix) {
    newList.push(tab)
  }
  tabsList.value.length = 0
  tabsList.value.push(...newList)
  const target = tabsList.value.length - 1
  activeIndex.value = target >= 0 ? target : 0
}

const eventSubmit = (type: number, tab: TabApi) => {
  switch (type) {
    case 0:
      // 刷新当前
      emit('refresh', tab)
      break
    case 1:
      // 关闭当前
      close(tab)
      emit('close', tab)
      break
    case 2:
      // 关闭其他
      closeOther(tab)
      emit('closeOther', tab)
      break
    case 3:
      // 全部关闭
      closeOther()
      emit('closeAll')
      break
    case 4:
      // 全屏
      emit('fullScreen', tab)
      break
  }
}

// 右键菜单
const contextMenuRef = ref()
const onContextMenu = (tab: TabApi, e: MouseEvent) => {
  const { clientX, clientY } = e
  dropdown.x = clientX
  dropdown.y = clientY
  contextMenuRef.value.openContextMenu(tab)
}
</script>

<style scoped lang="scss">
.p-tabs {
  &-ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0 15px;
    height: 34px;
    align-items: center;
    font-size: 12px;
    color: var(--el-text-color-regular);
    // 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
    white-space: nowrap;
    &-li {
      // IE怪异盒模型
      box-sizing: border-box;
      height: 25px;
      line-height: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid #e6e6e6;
      padding: 0 15px;
      margin-right: 5px;
      border-radius: 2px;
      position: relative;
      cursor: pointer;
      &:hover {
        background-color: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
        border-color: var(--el-color-primary-light-6);
      }
      .p-icon {
        position: relative;
        right: -5px;
        height: 14px;
        width: 14px;
        text-align: center;
        line-height: 14px;
        font-size: 14px !important;
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
        &:hover {
          color: var(--el-color-white);
          background-color: var(--el-color-primary-light-3);
        }
      }
    }
    .is-active {
      color: var(--el-color-white);
      background: var(--el-color-primary);
      border-color: var(--el-color-primary);
      transition: border-color 3s ease;
    }
  }

  .classic-style {
    align-items: flex-end;
    .classic-style-svg {
      -webkit-mask-box-image: url("data:image/svg+xml,%3Csvg width='68' height='34' viewBox='0 0 68 34' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='m27,0c-7.99582,0 -11.95105,0.00205 -12,12l0,6c0,8.284 -0.48549,16.49691 -8.76949,16.49691l54.37857,-0.11145c-8.284,0 -8.60908,-8.10146 -8.60908,-16.38546l0,-6c0.11145,-12.08445 -4.38441,-12 -12,-12l-13,0z' fill='%23409eff'/%3E%3C/svg%3E")
        12 27 15;
    }
    .p-tabs-ul-li {
      padding: 0 5px;
      border-width: 15px 27px 15px;
      border-style: solid;
      border-color: transparent;
      margin: 0 -15px;
      &:hover {
        @extend .classic-style-svg;
        background: var(--el-color-primary-light-9);
        color: unset;
      }
    }
    .is-active {
      @extend .classic-style-svg;
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary) !important;
    }
  }
}
</style>
