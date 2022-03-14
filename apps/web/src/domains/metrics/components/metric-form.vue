<script setup lang="ts">
import AppCard from '@/components/app-card/app-card.vue'
import AppField from '@/components/app-field/app-field.vue'
import AppInput from '@/components/app-input/app-input.vue'
import AppButton from '@/components/app-button/app-button.vue'
import { reactive } from 'vue'

const form = reactive({
  name: '',
  value: 0,
})
</script>

<template>
  <app-card title="Create new metric">
    <form>
      <app-field id="metric-name" label="name">
        <app-input v-model="form.name" />
      </app-field>
      <app-field id="metric-value" label="value" class="mt-5">
        <app-input v-model="form.value" />
      </app-field>
      <app-button class="mt-6">Add Metric</app-button>
    </form>
  </app-card>
</template>
