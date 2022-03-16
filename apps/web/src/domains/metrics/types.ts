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

export enum MetricTimelineInterval {
  DAY = 'day',
  HOUR = 'hour',
  MINUTE = 'minute',
}

export type FormErrors<T> = Record<keyof T, string[]>

export interface ApiError {
  status: number
  statusText: string
  messages: string[] | Record<string, string[]>
}

export interface ApiResult<T> {
  error: ApiError | null
  data: T | null
}

export interface NestValidorErrorMessage {
  constraints: Record<string, string>
  property: string
}
