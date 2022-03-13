<script setup lang="ts">
import { computed } from 'vue'

type ButtonSize = 'small' | 'medium' | 'large'

const props = withDefaults(defineProps<{ size?: ButtonSize }>(), {
  size: 'medium',
})

const buttonStyles = computed(() => {
  const sizes: Record<ButtonSize, string> = {
    small: 'px-2 py-1 text-xs font-normal ',
    medium: 'px-4 py-2 text-sm leading-5',
    large: 'px-8 py-2 text-base leading-5',
  }

  return [sizes[props.size]]
})
</script>

<template>
  <button
    class="flex font-medium text-white bg-blue-500 rounded focus:outline-none focus:ring-2 hover:bg-blue-600"
    :class="buttonStyles"
  >
    <slot />
  </button>
</template>
