import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AvgFilterMetricDto } from './dto/avg-filter-metric.dto'
import { CreateMetricDto } from './dto/create-metric.dto'
import { Metric } from './entities/metric.entity'
import { MetricsRepository } from './metrics.repository'
@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(MetricsRepository)
    private metricsRepository: MetricsRepository,
  ) {}

  getMetricsName(): Promise<Partial<Metric>[]> {
    return this.metricsRepository.getMetricsName()
  }

  getMetricsAvgByTimestamp(
    avgFilterMetricDto: AvgFilterMetricDto,
  ): Promise<Metric[]> {
    if (!avgFilterMetricDto.name) {
      throw new BadRequestException(
        'The metric name is required to get the averages',
      )
    }
    return this.metricsRepository.getMetricsAvgByTimestamp(avgFilterMetricDto)
  }

  createMetric(createMetricDto: CreateMetricDto): Promise<Metric> {
    if (!createMetricDto.name) {
      throw new BadRequestException('The metric name is required')
    }
    return this.metricsRepository.createMetric(createMetricDto)
  }
}
