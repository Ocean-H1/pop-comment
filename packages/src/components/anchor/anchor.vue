<template>
  <div class="p-anchor">
    <nav class="topic-content">
      <div class="topic-content-header" v-if="props.title">
        <h3>{{ props.title }}</h3>
        <p-divider></p-divider>
      </div>
      <ul class="topic-content-items">
        <li
          v-for="(v, k) in navs"
          :key="k"
          :class="[{ active: active == k }, d1((v as HTMLDivElement).nodeName)]"
          @click="scrollTo(k as number)"
        >
          {{ (v as HTMLDivElement).innerText }}
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineOptions({
  name: 'PAnchor'
})

interface Props {
  //  监听的容器
  container: string
  // 滚动轴
  scroll?: string
  // 距离窗口顶部达到指定偏移量
  targetOffset?: number
  // 标题
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  targetOffset: 0
})
const active = ref(0) //当前激活项
const navs = ref({} as NodeListOf<HTMLDivElement>) // 锚点元素列表
const scroll = ref({} as Element | Window)
let observer: ResizeObserver

// 点击跳转至指定元素
const scrollTo = (index: number) => {
  const target = navs.value.item(index)
  if (props.scroll) {
    scroll.value.scrollTo({
      top: target.offsetTop - props.targetOffset,
      behavior: 'smooth'
    })
  } else {
    document.documentElement.scrollTo({
      top: target.offsetTop - props.targetOffset,
      behavior: 'smooth'
    })
  }
}

// 滚动监听器
const scrollObserver = () => {
  const offsetTopArr: number[] = []
  navs.value.forEach(v => {
    offsetTopArr.push(v.offsetTop)
  })

  let scroll2 = scroll.value instanceof Element ? scroll.value.scrollTop : undefined

  // 当前文档流的scrollTop
  const scrollTop = scroll2 || document.documentElement.scrollTop || document.body.scrollTop

  offsetTopArr.forEach((v, k) => {
    if (scrollTop >= v - props.targetOffset) {
      active.value = k
    }
  })
}

const d1 = (val: string) => {
  switch (val) {
    case 'H1':
    case 'H2':
      return 'd2'
    case 'H3':
      return 'd3'
    default:
      return 'd4'
  }
}

onMounted(() => {
  let container = document.querySelector(props.container) as Element
  observer = new ResizeObserver(entry => {
    // 在resizeObserber中初始化滚动轴和锚点元素列表 解决异步加载内容时，锚点滚动导航栏不显示的问题
    if (props.scroll) {
      scroll.value = document.querySelector(props.scroll) as Element
    } else {
      scroll.value = window
    }
    navs.value = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
    scroll.value.addEventListener('scroll', scrollObserver)
  })
  observer.observe(container)
})

onUnmounted(() => {
  observer.disconnect()
  scroll.value.removeEventListener('scroll', scrollObserver)
})
</script>

<style scoped lang="scss">
.p-anchor {
  width: inherit;
  .topic-content {
    padding: 10px;
    &-header {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      margin: 0;
      text-align: center;
    }
    h3 {
      padding-left: 5px;
    }
    &-items {
      list-style: none;
      padding: 0;
      margin: 12px 0 0;
      li {
        cursor: pointer;
        padding: 5px;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 400;
        position: relative;
      }
      li:hover {
        background: #f7f8fa;
        border-radius: 4px;
        color: #409eff;
      }
      .active {
        color: #409eff;
      }
      .active::before {
        content: '';
        position: absolute;
        left: -6px;
        background-color: #409eff;
        border-radius: 4px;
        width: 4px;
        height: 14px;
        top: 8px;
      }
      .d3 {
        padding-left: 15px;
      }
      .d4 {
        padding-left: 35px;
      }
    }
  }
}
</style>
