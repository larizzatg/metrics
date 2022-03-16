import { describe, expect, test } from 'vitest'
import { MetricTimelineInterval } from '../types'
import { getHourRangeUTC, getNextInterval } from './timeline'

describe('getNextInterval', () => {
  test('day next interval is hour', () => {
    const currentInterval = MetricTimelineInterval.DAY
    const nextInterval = getNextInterval(currentInterval)
    expect(nextInterval).toBe(MetricTimelineInterval.HOUR)
  })
  test('hour next interval is minute', () => {
    const currentInterval = MetricTimelineInterval.HOUR
    const nextInterval = getNextInterval(currentInterval)
    expect(nextInterval).toBe(MetricTimelineInterval.MINUTE)
  })
  test('minute doesnt have a next interval', () => {
    const currentInterval = MetricTimelineInterval.MINUTE
    const nextInterval = getNextInterval(currentInterval)
    expect(nextInterval).toBe(null)
  })
})

describe('getHourRangeUTC', () => {
  test('utc date + 24h', () => {
    const dateStr = '2022-03-14T04:00:00.000Z'
    const expected = '2022-03-15T04:00:00.000Z'
    expect(getHourRangeUTC(dateStr)).toBe(expected)
  })
})
