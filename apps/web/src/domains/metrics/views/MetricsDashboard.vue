<script setup lang="ts">
import { ref, toRaw } from 'vue'
import AppButton from '@/components/app-button/app-button.vue'
import AppModal from '@/components/app-modal/app-modal.vue'
import MetricForm from '../components/metric-form.vue'
import TimelineChart from '../timeline/timeline-chart.vue'
import { useTimeline } from '../timeline/useTimeline'
import type { MetricTimelineFilters } from '../types'

const showMetricFormModal = ref(false)
const { filters, loading, data, firstError } = useTimeline()

const updateFilters = (f: MetricTimelineFilters): void => {
  filters.value = { ...toRaw(filters.value), ...f }
}
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
    <timeline-chart
      :metrics="data"
      :loading="loading"
      :error="firstError"
      :interval="filters.interval"
      @change="updateFilters"
    />
  </main>
</template>
