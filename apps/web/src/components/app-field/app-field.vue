<script setup lang="ts">
import { computed } from 'vue'

interface FieldProps {
  id: string
  label: string
  errors: string[]
}
const props = defineProps<FieldProps>()

const firstError = computed(() => {
  return props?.errors?.[0] || ''
})
</script>

<template>
  <div class="flex flex-col">
    <label
      :for="id"
      class="mb-1 text-xs font-medium tracking-wider text-gray-400 uppercase"
      >{{ label }}</label
    >
    <slot />
    <span v-show="firstError" class="text-xs text-red-500">
      {{ firstError }}
    </span>
  </div>
</template>
