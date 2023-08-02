<template>
  <Transition>
    <div v-show="isShow" class="custom-contextmenu" :style="`top: ${dropdown.y + 5}px; left: ${dropdown.x}px;`">
      <ul class="custom-contextmenu__menu">
        <template v-for="(v, k) in dropdownMenu" :key="k">
          <li v-if="v.show" class="custom-contextmenu__menu__item" @click="$emit('submit', v.operationType, tab)">
            <p-icon>
              <svg v-html="v.icon"></svg>
            </p-icon>
            <span>{{ v.title }}</span>
          </li>
        </template>
      </ul>
      <div class="arrow"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, toRef, toRefs } from 'vue'
import { TabApi } from './interface'
import { dropdownList } from './constants'

interface Props {
  dropdown: {
    x: number
    y: number
  }
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'submit', type: number, tab: TabApi): void
}>()
const state = reactive({
  tab: {} as TabApi,
  isShow: false,
  // 下拉菜单
  dropdownMenu: dropdownList
})
const { isShow, dropdownMenu, tab } = toRefs(state)

// 打开下拉菜单
const openContextMenu = (tab: TabApi) => {
  state.tab = tab
  state.dropdownMenu[1].show = !tab.meta.isAffix
  // 打开新的菜单之前，关闭已打开的菜单
  closeContextMenu()
  setTimeout(() => {
    state.isShow = true
  }, 200)
}

// 关闭下拉菜单
const closeContextMenu = () => {
  state.isShow = false
}

onMounted(() => {
  window.addEventListener('click', closeContextMenu)
})
onUnmounted(() => {
  window.removeEventListener('click', closeContextMenu)
})

defineExpose({
  openContextMenu
})
</script>

<style scoped lang="scss">
.custom-contextmenu {
  transform-origin: center top;
  z-index: 2190;
  position: fixed;

  font-size: 12px;
  background: #fff;
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-light);
  background: var(--el-bg-color-overlay);
  border-radius: var(--el-border-radius-base);
  &__menu {
    position: relative;
    top: 0;
    left: 0;
    z-index: var(--el-dropdown-menu-index);
    padding: 5px 0;
    margin: 0;
    background-color: var(--el-bg-color-overlay);
    border-radius: var(--el-border-radius-base);
    &__item {
      display: flex;
      align-items: center;
      white-space: nowrap;
      list-style: none;
      line-height: 22px;
      padding: 5px 16px;
      margin: 0;
      color: var(--el-text-color-regular);
      cursor: pointer;
      outline: 0;
      .p-icon {
        margin-right: 5px;
      }
    }
    &__item:hover {
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }
  }

  .arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    z-index: -1;
    top: -5px;
    left: 10px;
  }
  .arrow::before {
    position: absolute;
    width: 10px;
    height: 10px;
    z-index: -1;
    content: ' ';
    transform: rotate(45deg);
    box-sizing: border-box;
    right: 0;
    border: 1px solid var(--el-border-color-light);
    background: var(--el-color-white);
    right: 0;
  }
}
</style>
