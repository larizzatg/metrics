<script lang="ts" setup>
defineProps<{ title: string }>()
</script>

<template>
  <header
    class="flex items-center justify-center h-12 bg-white shadow-sm md:h-20"
  >
    <h2 class="title-4 md:title-3">{{ title }}</h2>
  </header>
</template>
