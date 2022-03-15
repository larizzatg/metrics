import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { useTimeline } from './useTimeline'
import * as api from '../api'
import { MetricTimelineInterval, type MetricTimelineFilters } from '../types'

describe('useTimeline', () => {
  let defaultFilters: MetricTimelineFilters

  beforeEach(() => {
    const resetFilters = (): MetricTimelineFilters => ({
      name: '',
      interval: MetricTimelineInterval.DAY,
    })
    defaultFilters = resetFilters()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('initials filters have empty name and interval day', () => {
    const { filters } = useTimeline()
    expect(filters.value).toEqual(defaultFilters)
  })
  it('timeline data is requested on hook use with default filters', () => {
    const spy = vi.spyOn(api, 'getMetricAverages')
    useTimeline()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(defaultFilters)
  })
  it('timeline data is requested on filter change', () => {
    const spy = vi.spyOn(api, 'getMetricAverages')
    const { filters } = useTimeline()
    expect(spy).toHaveBeenCalledTimes(1)
    filters.value.name = 'performance'
    expect(spy).toHaveBeenCalledWith({
      name: 'performance',
      interval: MetricTimelineInterval.DAY,
    })
  })
})
