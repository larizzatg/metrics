import { MetricTimelineInterval } from '../types'

export function getNextInterval(
  currentInterval: MetricTimelineInterval,
): MetricTimelineInterval | null {
  const intervals = Object.values(MetricTimelineInterval)
  const currentIntervalIndex = intervals.findIndex(
    (interval) => interval === currentInterval,
  )
  const nextInterval = currentIntervalIndex + 1
  return intervals?.[nextInterval] ?? null
}
