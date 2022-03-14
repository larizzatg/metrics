<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/app-header/app-header.vue'
</script>

<template>
  <AppHeader title="Metrics App" />
  <RouterView class="mx-auto mt-8 md:mt-14 max-w-screen-2xl" />
</template>

<style lang="postcss">
body {
  @apply bg-blue-50;
}
</style>
