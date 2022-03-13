<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="px-4 py-8 bg-white">
    <header class="flex items-center justify-center mb-5">
      <slot name="header">
        <h5 class="flex-1 caption">{{ title }}</h5>
        <slot name="menu" />
      </slot>
    </header>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
