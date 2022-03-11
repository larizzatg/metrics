import { Injectable } from '@nestjs/common'
import { CreateMetricDto } from './dto/create-metric.dto'
import { Metric } from './entities/metric.entity'

@Injectable()
export class MetricsService {
  private metrics: Metric[] = []

  getAllMetrics() {
    return this.metrics
  }

  createMetric(createMetricDto: CreateMetricDto) {
    const { name, value } = createMetricDto
    const metric: Metric = {
      name,
      value,
      timestamp: new Date(),
    }

    this.metrics.push(metric)
  }
}
