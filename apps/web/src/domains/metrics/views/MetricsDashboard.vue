<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/app-button/app-button.vue'
import AppModal from '@/components/app-modal/app-modal.vue'
import MetricForm from '../components/metric-form.vue'
import TimelineChart from '../timeline/timeline-chart.vue'
import { useTimeline } from '../timeline/useTimeline'

const showMetricFormModal = ref(false)
const { filters, loading, data, firstError } = useTimeline()
filters.value.name = ''
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
    <timeline-chart :metrics="data" :loading="loading" :error="firstError" />
  </main>
</template>
