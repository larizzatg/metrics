import { computed, ref, watchEffect } from 'vue'
import { getMetricAverages } from '../api'
import {
  MetricTimelineInterval,
  type MetricAverage,
  type MetricTimelineFilters,
  type ApiError,
} from '../types'

export function useTimeline() {
  const loading = ref(false)
  const error = ref<ApiError | null>(null)
  const data = ref<MetricAverage[]>([])

  const filters = ref<MetricTimelineFilters>({
    name: '',
    interval: MetricTimelineInterval.DAY,
  })

  const areFiltersValid = computed(() => {
    return !!filters.value.name
  })

  watchEffect(async () => {
    if (!areFiltersValid.value) {
      return
    }

    loading.value = true
    const response = await getMetricAverages(filters.value)
    loading.value = false
    if (response.error) {
      error.value = response.error
    } else {
      data.value = response.data ?? []
    }
  })

  const firstError = computed(() => {
    if (!error.value) {
      return ''
    }

    if (Array.isArray(error.value.messages)) {
      return error.value.messages[0] ?? ''
    }
    return Object.values(error.value.messages)?.[0]?.[0] ?? ''
  })

  return {
    filters,
    loading,
    data,
    firstError,
  }
}
