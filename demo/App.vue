<template>
  <Page title="组件测试" :components="components"></Page>
</template>

<script setup lang="ts">
import Page from './components/Page.vue'
import testFold from './components/test-fold.vue'
import testCounter from './components/test-counter.vue'
const components = [testFold, testCounter]
</script>

<style scoped></style>
