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
      <slot name="header">
        <div class="flex-1">
          <h5 class="caption" v-if="title">{{ title }}</h5>
          <small class="text-sm font-light text-gray-400" v-if="subtitle">
            {{ subtitle }}
          </small>
        </div>
        <slot name="menu" />
      </slot>
    </header>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
