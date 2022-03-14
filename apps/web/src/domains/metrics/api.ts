import axios from 'axios'
import type { AxiosError } from 'axios'
import type { Metric, MetricFormProps } from './types'
const BASE_URL = import.meta.env.VITE_API_URL?.toString() ?? ''

interface ApiError {
  status: number
  statusText: string
  messages: string[] | Record<string, string[]>
}

interface ApiResult<T> {
  error: ApiError | null
  data: T | null
}

interface NestValidorErrorMessage {
  constraints: Record<string, string>
  property: string
}

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

  if (axios.isAxiosError(error)) {
    const { data } = error?.response ?? {}
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
