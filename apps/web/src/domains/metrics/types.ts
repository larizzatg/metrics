export interface Metric {
  name: string
  value: number
  id: number
  timestamp: string
}

export interface MetricFormProps {
  name: string
  value: number
}
export type FormErrors<T> = Record<keyof T, string[]>
