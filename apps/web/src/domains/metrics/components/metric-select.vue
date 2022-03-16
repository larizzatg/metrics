<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue'
import type { Metric } from '../types'
import { getMetrics } from '../api'

const emit = defineEmits(['change'])
const metrics = ref<Partial<Metric>[]>([])
const selectedMetric = ref<Partial<Metric>>({})
const query = ref('')
const disabled = ref(true)

onMounted(() => {
  getMetrics().then((response) => {
    if (response.error) {
      disabled.value = true
    } else {
      metrics.value = response.data ?? []
      if (metrics.value?.[0]) {
        disabled.value = false
        selectedMetric.value = metrics.value[0]
      }
    }
  })
})

const filteredMetrics = computed(() =>
  query.value === ''
    ? metrics.value
    : metrics.value.filter((metric) => {
        return (metric.name ?? '')
          .toLowerCase()
          .includes(query.value.toLowerCase())
      }),
)

watch(
  () => selectedMetric.value,
  (value) => {
    emit('change', value)
  },
)
</script>

<template>
  <Combobox v-model="selectedMetric" :disabled="disabled">
    <div class="relative">
      <ComboboxInput
        autocomplete="off"
        :displayValue="(metric) => metric.name ?? ''"
        class="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-gray-100 border border-indigo-100 rounded-md appearance-none cursor-pointer focus:outline-none focus:border-indigo-400 disabled:border-gray-400"
      />
      <ComboboxOptions
        class="absolute z-10 w-full py-2 mt-2 overflow-auto bg-gray-100 rounded-md shadow-md appearance-none focus:outline-none focus:border-indigo-400"
      >
        <!-- add no filters -->
        <ComboboxOption
          v-for="metric in filteredMetrics"
          :key="metric"
          :value="metric"
          v-slot="{ active }"
        >
          <li
            class="relative px-4 py-2 cursor-default select-none"
            :class="{
              'text-white bg-indigo-400': active,
              'text-gray-700': !active,
            }"
          >
            {{ metric.name }}
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
