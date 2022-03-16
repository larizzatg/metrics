import { BadRequestException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { CreateMetricDto } from './dto/create-metric.dto'
import { Metric } from './entities/metric.entity'
import { MetricInterval } from './metrics-intervals.enum'
import { MetricsRepository } from './metrics.repository'
import { MetricsService } from './metrics.service'

const mockMetricsRepository = () => ({
  getMetricsName: jest.fn(),
  getMetricsAvgByTimestamp: jest.fn(),
  createMetric: jest.fn(),
})

describe('MetricsService', () => {
  let metricsService: MetricsService
  let metricsRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MetricsService,
        { provide: MetricsRepository, useFactory: mockMetricsRepository },
      ],
    }).compile()

    metricsService = module.get<MetricsService>(MetricsService)
    metricsRepository = module.get<MetricsRepository>(MetricsRepository)
  })

  describe('getMetricsName', () => {
    it('returns the unique metric names in the MetricRepository', async () => {
      const expected = [{ name: 'performance' }]
      metricsRepository.getMetricsName.mockResolvedValue(expected)
      const result = await metricsService.getMetricsName()
      expect(result).toEqual(expected)
    })
  })

  describe('getMetricsAvgByTimestamp', () => {
    it('returns the avg metrics given a name and interval', async () => {
      const filters = {
        name: 'responsive',
        interval: MetricInterval.DAY,
      }
      const expected = [
        {
          name: 'responsive',
          value: '50',
          datetime: '2022-03-16T12:00:00.000Z',
        },
      ]
      metricsRepository.getMetricsAvgByTimestamp.mockResolvedValue(expected)
      const result = await metricsService.getMetricsAvgByTimestamp(filters)
      expect(result).toEqual(expected)
    })
    it('throw exception if name is empty', async () => {
      const filters = { name: '', interval: MetricInterval.DAY }
      metricsRepository.getMetricsAvgByTimestamp.mockResolvedValue(undefined)

      try {
        await metricsService.getMetricsAvgByTimestamp(filters)
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.message).toEqual(
          'The metric name is required to get the averages',
        )
      }
    })
  })

  describe('createMetric', () => {
    it('returns the created metric', async () => {
      const metricForm: CreateMetricDto = {
        name: 'cool metric',
        value: 1000,
      }
      const expected: Metric = new Metric()
      expected.id = 1
      expected.name = metricForm.name
      expected.value = metricForm.value
      expected.timestamp = new Date()

      metricsRepository.createMetric.mockResolvedValue(expected)
      const result = await metricsService.createMetric(metricForm)
      expect(result).toEqual(expected)
    })

    it('throws exception when name is empty', async () => {
      const metricForm: CreateMetricDto = {
        name: '',
        value: 1000,
      }
      const expected = undefined
      metricsRepository.createMetric.mockResolvedValue(expected)
      try {
        await metricsService.createMetric(metricForm)
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.message).toEqual('The metric name is required')
      }
    })
  })
})
