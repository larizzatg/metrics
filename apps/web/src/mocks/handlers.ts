import { rest } from 'msw'
import { dailyAverage } from './data'

const BASE_URL = import.meta.env.VITE_API_URL?.toString() ?? ''
export const handlers = [
  rest.get(`$${BASE_URL}/metrics/avg`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dailyAverage))
  }),
]
