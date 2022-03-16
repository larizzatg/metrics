<script setup lang="ts">
import AppHeader from './components/app-header/app-header.vue'
import MetricsDashboard from './domains/metrics/views/MetricsDashboard.vue'
</script>

<template>
  <AppHeader title="Metrics App" />
  <div class="mx-auto mt-8 md:mt-14 max-w-screen-2xl">
    <MetricsDashboard />
  </div>
</template>

<style lang="postcss">
body {
  @apply bg-blue-50;
}
</style>
