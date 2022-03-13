<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/app-header/app-header.vue'
</script>

<template>
  <AppHeader title="Metrics" />
  <RouterView />
</template>

<style lang="postcss">
body {
  @apply bg-blue-50;
}
</style>
