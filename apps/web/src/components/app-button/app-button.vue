<script setup lang="ts">
import { computed } from 'vue'

type ButtonSize = 'small' | 'medium' | 'large'
type ButtonType = 'primary' | 'secondary'

interface ButtonProps {
  size?: ButtonSize
  type?: ButtonType
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'medium',
  type: 'primary',
})

const buttonStyles = computed(() => {
  const sizes: Record<ButtonSize, string> = {
    small: 'px-2 py-1 text-xs font-normal ',
    medium: 'px-4 py-2 text-sm leading-5',
    large: 'px-8 py-2 text-base leading-5',
  }

  const types: Record<ButtonType, string> = {
    primary: 'text-white bg-indigo-400 hover:bg-indigo-500',
    secondary: 'text-white bg-gray-400 hover:bg-gray-500',
  }

  return [sizes[props.size], types[props.type]]
})
</script>

<template>
  <button
    class="flex justify-center font-medium rounded focus:outline-none focus:ring-2"
    :class="buttonStyles"
  >
    <slot />
  </button>
</template>
