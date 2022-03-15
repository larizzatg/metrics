import { computed, readonly, ref, watchEffect } from 'vue'
import { getMetrics, getMetricAverages } from '../api'
import {
  MetricTimelineInterval,
  type MetricAverage,
  type MetricTimelineFilters,
  type ApiError,
  type Metric,
} from '../types'

export function useTimeline() {
  const loading = ref(false)
  const error = ref<ApiError | null>(null)
  const data = ref<MetricAverage[]>([])

  const metrics = ref<Partial<Metric>[]>([])
  getMetrics().then((response) => {
    if (response.error) {
      error.value = response.error
    } else {
      metrics.value = response.data ?? []
      if (metrics.value?.[0]) {
        filters.value.name = metrics.value[0].name ?? ''
      }
    }
  })

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
    metrics: readonly(metrics.value),
  }
}
