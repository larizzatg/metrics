<script setup lang="ts">
import AppCard from '@/components/app-card/app-card.vue'
import AppField from '@/components/app-field/app-field.vue'
import AppInput from '@/components/app-input/app-input.vue'
import AppButton from '@/components/app-button/app-button.vue'
import { reactive } from 'vue'

interface MetricForm {
  name: string
  value: number
}
type FormErrors<T> = Record<keyof T, string[]>

const form = reactive<MetricForm>({
  name: '',
  value: 0,
})
const formErrors = reactive<FormErrors<MetricForm>>({
  name: [],
  value: [],
})

const emit = defineEmits(['submit'])

const validateForm = () => {
  let valid = true
  Object.entries(form).forEach(([key, value]) => {
    if (value !== 0 && !value) {
      formErrors[key as keyof MetricForm].push(
        `The ${key} is necessary for the metric form`,
      )
      valid = false
    } else {
      formErrors[key as keyof MetricForm] = []
    }
  })
  return valid
}
const onSubmit = () => {
  if (validateForm()) {
    emit('submit', form)
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <app-field id="metric-name" label="name" :errors="formErrors.name">
      <app-input v-model="form.name" />
    </app-field>
    <app-field
      id="metric-value"
      label="value"
      class="mt-5"
      :errors="formErrors.value"
    >
      <app-input type="number" v-model="form.value" />
    </app-field>
    <app-button class="mt-6">Add Metric</app-button>
  </form>
</template>
