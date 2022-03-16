<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  squarePadding?: boolean
}>()
</script>

<template>
  <div class="bg-white" :class="squarePadding ? 'px-4 py-4' : 'px-4 py-8'">
    <header class="flex flex-wrap items-center justify-center mb-4">
      <div class="flex flex-1">
        <slot name="header">
          <h5 class="flex-1 caption" v-if="title">{{ title }}</h5>
          <slot name="menu" />
        </slot>
      </div>
      <small class="w-full text-sm font-light text-gray-400" v-if="subtitle">
        {{ subtitle }}
      </small>
    </header>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
