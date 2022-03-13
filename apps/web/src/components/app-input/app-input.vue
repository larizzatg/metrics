<script setup lang="ts">
interface InputProps {
  type?: string
  placeholder?: string
  modelValue?: string
}
defineProps<InputProps>()
const emit = defineEmits(['update:modelValue'])

const onInput = (payload: Event) => {
  const target = payload.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    :type="type || 'text'"
    :value="modelValue"
    @input="onInput"
    class="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 border border-indigo-100 rounded-md appearance-none focus:outline-none focus:border-indigo-400 bg-gray-50"
  />
</template>
