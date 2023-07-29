<template>
  <h2>1.基础用法</h2>
  <p>有一个夜晚我烧毁了所有的记忆，从此我的梦就透明了；有一个早晨我扔掉了所有的昨天，从此我的脚步就轻盈了。</p>
  <p-divider />
  <p>终有人会在你昏暗的时光里撒下星星，即便离去也会留下些许光明</p>
  <p-divider borderStyle="dashed" />
  <h2>2.设置文案</h2>
  <p>有一个夜晚我烧毁了所有的记忆，从此我的梦就透明了；有一个早晨我扔掉了所有的昨天，从此我的脚步就轻盈了。</p>
  <p-divider>我是文案</p-divider>
  <p-divider position="left">我是文案</p-divider>
  <p-divider position="right">我是文案</p-divider>
  <p>终有人会在你昏暗的时光里撒下星星，即便离去也会留下些许光明</p>
  <h2>3.垂直方向</h2>
  <span>新的一年</span>
  <p-divider vertical />
  <span>万事顺利</span>
  <p-divider vertical />
  <span>每天开心</span>
  <p-divider vertical />
  <span>心想事成</span>
</template>

<script setup lang="ts">
defineOptions({
  name: 'testDivider'
})
</script>

<style scoped></style>
