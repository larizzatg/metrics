import { ref, watchEffect } from 'vue'
import { getMetricAverages } from '../api'
import {
  MetricTimelineInterval,
  type MetricAverage,
  type MetricTimelineFilters,
} from '../types'

export function useTimeline() {
  const filters = ref<MetricTimelineFilters>({
    name: '',
    interval: MetricTimelineInterval.DAY,
  })

  const timelineData = ref<MetricAverage[]>([])

  watchEffect(async () => {
    const { data, error } = await getMetricAverages(filters.value)
    if (!error) {
      timelineData.value = data ?? []
    }
  })

  return { filters, timelineData }
}
