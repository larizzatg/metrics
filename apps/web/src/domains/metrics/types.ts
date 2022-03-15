export interface Metric {
  name: string
  value: number
  id: number
  timestamp: string
}

export interface MetricAverage {
  name: string
  value: number
  datetime: string
}
export interface MetricFormProps {
  name: string
  value: number
}

export interface MetricTimelineFilters {
  name: string
  interval?: string
  startDate?: string
  endDate?: string
}

export type FormErrors<T> = Record<keyof T, string[]>
