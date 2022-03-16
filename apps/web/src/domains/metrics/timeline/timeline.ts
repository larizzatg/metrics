import { MetricTimelineInterval } from '../types'
import { set } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

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

export function getHourRangeUTC(dateString: string): string {
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const dateUTC = zonedTimeToUtc(dateString, localTimeZone)
  const nextDay = set(dateUTC, { hours: 24 })
  return nextDay.toISOString()
}
