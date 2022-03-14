<script setup lang="ts">
defineProps<{
  title: string
  squarePadding?: boolean
}>()
</script>

<template>
  <div class="bg-white" :class="squarePadding ? 'px-4 py-4' : 'px-4 py-8'">
    <header class="flex flex-wrap items-center justify-center mb-4">
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
