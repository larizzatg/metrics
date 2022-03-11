import { Injectable } from '@nestjs/common'
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

  getAllMetrics(): Promise<Metric[]> {
    return this.metricsRepository.getAllMetrics()
  }

  getMetricsAvgByTimestamp(
    avgFilterMetricDto: AvgFilterMetricDto,
  ): Promise<Metric[]> {
    return this.metricsRepository.getMetricsAvgByTimestamp(avgFilterMetricDto)
  }

  createMetric(createMetricDto: CreateMetricDto): Promise<Metric> {
    return this.metricsRepository.createMetric(createMetricDto)
  }
}
