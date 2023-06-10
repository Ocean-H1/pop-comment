<template>
  <span class="p-counter">{{ displayedNum }}</span>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'

defineOptions({
  name: 'PCounter'
})

interface Props {
  // 开始数字
  startNum?: number
  // 结束数字
  endNum?: number
  // 滚动持续时间
  duration?: number
  // 是否自动开始滚动
  autoInit?: boolean
  // 前缀
  prefix?: string
  // 后缀
  suffix?: string
  // 整数部分的分隔符
  separator?: string
  // 小数部分的分隔符
  decimalSeparator?: string
  // 保留几位小数
  decimals?: number
}

const props = withDefaults(defineProps<Props>(), {
  startNum: 0,
  endNum: 0,
  duration: 3,
  autoInit: true,
  prefix: '',
  suffix: '',
  separator: ',',
  decimalSeparator: '.',
  decimals: 0
})

const emit = defineEmits<{
  (e: 'finished'): void
}>()

const state = reactive({
  // 时间戳
  timestamp: 0,
  startTimeStamp: 0,
  currentNum: 0,
  currentStartNum: 0,
  currentDuration: 0,
  paused: false,
  remaining: 0,
  // 动画帧
  animationFrame: 0
})
// 是否递增滚动
const isCountingUp = () => props.endNum > props.startNum

// 状态初始化
const initState = () => {
  state.currentNum = props.startNum
  state.currentStartNum = props.startNum
  state.currentDuration = props.duration * 1000
  state.remaining = props.duration * 1000
  if (props.autoInit) start()
  else state.paused = true
}

onMounted(() => {
  initState()
})
const start = () => {
  cancelAnimation()
  state.startTimeStamp = 0
  state.paused = false
  // 执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画, 更新动画时你应该调用此方法, 回调函数执行次数通常是每秒 60 次
  // 系统绘制频率是60Hz，那回调函数就是1000/60 = 16.7ms被执行一次
  state.animationFrame = window.requestAnimationFrame(counting)
}
const cancelAnimation = () => {
  // 取消一个先前通过调用window.requestAnimationFrame()方法添加到计划中的动画帧请求
  state.animationFrame && window.cancelAnimationFrame(state.animationFrame)
}
/**
 *
 * @param timestamp 时间戳,表示requestAnimationFrame开始执行回调函数的时刻
 */
const counting = (timestamp: number) => {
  state.timestamp = timestamp
  if (!state.startTimeStamp) state.startTimeStamp = timestamp
  let progress: number = timestamp - state.startTimeStamp
  state.remaining = state.currentDuration - progress

  if (!isCountingUp()) {
    state.currentNum = state.currentStartNum - (props.startNum - props.endNum) * (progress / state.currentDuration)
    state.currentNum = state.currentNum < props.endNum ? props.endNum : state.currentNum
  } else {
    state.currentNum = state.currentStartNum + (props.endNum - props.startNum) * (progress / state.currentDuration)
    state.currentNum = state.currentNum > props.endNum ? props.endNum : state.currentNum
  }

  if (state.remaining > 0) state.animationFrame = window.requestAnimationFrame(counting)
  else emit('finished')
}

// 数字格式化相关
const formatedNum = computed(() => {
  const regex = /(\d+)(\d{3})/
  // toFixed 四舍六入五取偶
  let numberString: string = state.currentNum.toFixed(props.decimals)
  let numberArray: string[] = numberString.split('.')
  let numbers: string = numberArray[0]
  let decimals: string = numberArray.length > 1 ? props.decimalSeparator + numberArray[1] : ''
  let isNumber = !isNaN(parseFloat(props.separator))

  if (props.separator && !isNumber) {
    while (regex.test(numbers)) numbers = numbers.replace(regex, '$1' + props.separator + '$2')
  }
  return numbers + decimals
})
const displayedNum = computed(() => `${props.prefix}${formatedNum.value}${props.suffix}`)
</script>

<style scoped></style>
