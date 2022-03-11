import { Injectable } from '@nestjs/common'
import { CreateMetricDto } from './dto/create-metric.dto'
import { Metric } from './entities/metric.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(Metric)
    private readonly metricRepository: Repository<Metric>,
  ) {}

  getAllMetrics() {
    return this.metricRepository.find()
  }

  createMetric(createMetricDto: CreateMetricDto) {
    const metric = this.metricRepository.create(createMetricDto)
    return this.metricRepository.save(metric)
  }
}
