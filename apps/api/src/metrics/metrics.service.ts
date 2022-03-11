import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateMetricDto } from './dto/create-metric.dto'
import { MetricsRepository } from './metrics.repository'
@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(MetricsRepository)
    private metricsRepository: MetricsRepository,
  ) {}

  getAllMetrics() {
    return this.metricsRepository.find()
  }

  createMetric(createMetricDto: CreateMetricDto) {
    const metric = this.metricsRepository.create(createMetricDto)
    return this.metricsRepository.save(metric)
  }
}
