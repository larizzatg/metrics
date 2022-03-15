import axios from 'axios'
import type { AxiosError } from 'axios'
import type {
  MetricTimelineFilters,
  Metric,
  MetricAverage,
  MetricFormProps,
  ApiResult,
  ApiError,
  NestValidorErrorMessage,
} from './types'
const BASE_URL = import.meta.env.VITE_API_URL?.toString() ?? ''

const groupApiErrorMessages = (
  messages: NestValidorErrorMessage[],
): Record<string, string[]> => {
  const groupedMessages: Record<string, string[]> = {}
  messages.forEach((message) => {
    if (!message.property || !message.constraints) {
      return messages
    }

    const key = message.property
    if (!groupedMessages[key]) {
      groupedMessages[key] = []
    }

    groupedMessages[key].push(
      ...groupedMessages[key],
      ...Object.values(message.constraints),
    )
  })

  return groupedMessages
}

const handleApiError = (error: Error | AxiosError): ApiError => {
  const apiError: ApiError = {
    status: 0,
    statusText: 'Unexpected Error',
    messages: ['There was an error sending the request'],
  }
  if (axios.isAxiosError(error) && error?.response) {
    const { data = {} } = error.response
    apiError.status = data.statusCode
    apiError.statusText = data.error
    apiError.messages = groupApiErrorMessages(data.message)
  }

  return apiError
}

export const createMetric = async (
  form: MetricFormProps,
): Promise<ApiResult<Metric>> => {
  let error: ApiError | null = null
  let data: Metric | null = null
  try {
    const response = await axios.post(`${BASE_URL}/metrics`, form)
    data = response.data as Metric
  } catch (err) {
    error = handleApiError(err as Error | AxiosError)
  }

  return { error, data }
}

export const getMetricAverages = async (
  filters: MetricTimelineFilters,
): Promise<ApiResult<MetricAverage[]>> => {
  let error: ApiError | null = null
  let data: MetricAverage[] | null = null
  try {
    const response = await axios.get(`${BASE_URL}/metrics/avg`, {
      params: filters,
    })
    data = response.data as MetricAverage[]
  } catch (err) {
    error = handleApiError(err as Error | AxiosError)
  }

  return { error, data }
}
