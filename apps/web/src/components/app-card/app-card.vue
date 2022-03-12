<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="px-4 py-8 bg-white">
    <header>
      <slot name="header">
        <h5 class="mb-5 caption">{{ title }}</h5>
      </slot>
    </header>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
