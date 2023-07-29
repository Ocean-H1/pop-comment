<template>
  <Page title="组件测试" :components="components"></Page>
</template>

<script setup lang="ts">
import Page from './components/page.vue'
import testFold from './components/test-fold.vue'
import testCounter from './components/test-counter.vue'
import testIcon from './components/test-icon.vue'
const components = [testFold, testCounter, testIcon]
</script>

<style scoped></style>
