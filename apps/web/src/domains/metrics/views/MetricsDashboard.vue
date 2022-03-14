<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/app-button/app-button.vue'
import AppCard from '@/components/app-card/app-card.vue'
import AppModal from '@/components/app-modal/app-modal.vue'
import MetricForm from '../components/metric-form.vue'

const showMetricFormModal = ref(false)
const createMetric = (payload) => {
  console.log('create')
  console.log(payload)
}
</script>

<template>
  <main>
    <app-modal title="add new metric" v-model:open="showMetricFormModal">
      <metric-form @submit="createMetric" />
    </app-modal>
    <div class="flex justify-end flex-1 my-4">
      <app-button type="secondary" @click="showMetricFormModal = true">
        New metric
      </app-button>
    </div>
    <app-card title="Daily Metrics">
      <template #before> </template>
    </app-card>
  </main>
</template>
