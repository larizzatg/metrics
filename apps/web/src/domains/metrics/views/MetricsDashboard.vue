<script setup lang="ts">
import { computed, reactive, ref, toRaw, watchEffect } from 'vue'
import AppButton from '@/components/app-button/app-button.vue'
import AppCard from '@/components/app-card/app-card.vue'
import AppModal from '@/components/app-modal/app-modal.vue'
import MetricForm from '../components/metric-form.vue'
import MetricChartTimeline from '../components/metric-chart-timeline.vue'
import { getMetricAverages } from '../api'
import type { MetricAverage, AverageFilterMetric } from '../types'
import { useToast } from 'vue-toastification'

const toast = useToast()
const showMetricFormModal = ref(false)

const loading = ref(false)
const timeline = ref<MetricAverage[]>([])
const timelineFilters = reactive<AverageFilterMetric>({
  name: 'performance',
  interval: 'day',
  startDate: '',
  endDate: '',
})

const filtersToApply = computed(() => {
  const filters = Object.fromEntries(
    Object.entries(timelineFilters).filter(([key, value]) => {
      return !!value
    }),
  )
  return filters as unknown as AverageFilterMetric
})

watchEffect(async () => {
  loading.value = true

  const { data, error } = await getMetricAverages(filtersToApply.value)
  loading.value = false
  if (error) {
    toast.error('There was a problem filtering the data')
    return
  }

  timeline.value = data ?? []
})
</script>

<template>
  <main>
    <app-modal title="add new metric" v-model:open="showMetricFormModal">
      <metric-form @submit="showMetricFormModal = false" />
    </app-modal>
    <div class="flex justify-end flex-1 my-4">
      <app-button type="secondary" @click="showMetricFormModal = true">
        New metric
      </app-button>
    </div>
    <app-card title="Daily Metrics">
      <span v-if="loading">loading</span>
      <metric-chart-timeline :metrics="timeline" v-else-if="timeline?.length" />
    </app-card>
  </main>
</template>
