<script setup lang="ts">
import { reactive, toRaw } from 'vue'
import { useToast } from 'vue-toastification'
import AppField from '@/components/app-field/app-field.vue'
import AppInput from '@/components/app-input/app-input.vue'
import AppButton from '@/components/app-button/app-button.vue'

import type { FormErrors, MetricFormProps } from '../types'
import { createMetric } from '../api'

const emit = defineEmits(['submit'])

const form = reactive<MetricFormProps>({
  name: '',
  value: 0,
})
const formErrors = reactive<FormErrors<MetricFormProps>>({
  name: [],
  value: [],
})

const validateForm = () => {
  let valid = true
  Object.entries(form).forEach(([key, value]) => {
    if (value !== 0 && !value) {
      formErrors[key as keyof MetricFormProps].push(
        `The ${key} is necessary for the metric form`,
      )
      valid = false
    } else {
      formErrors[key as keyof MetricFormProps] = []
    }
  })
  return valid
}

const onSubmit = async () => {
  if (!validateForm()) {
    return
  }

  const { error, data } = await createMetric(toRaw(form))
  if (error) {
    if (!Array.isArray(error.messages)) {
      for (const property in error.messages ?? {}) {
        formErrors[property as keyof MetricFormProps] = error.messages[property]
      }
    }

    // handle global errors
    return
  }
  const toast = useToast()
  toast('New metric added')
  emit('submit', data)
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
      <app-input type="number" v-model.number="form.value" />
    </app-field>
    <app-button class="mt-6">Add Metric</app-button>
  </form>
</template>
