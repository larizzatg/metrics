import { EntityRepository, Repository } from 'typeorm'
import { CreateMetricDto } from './dto/create-metric.dto'
import { Metric } from './entities/metric.entity'

@EntityRepository(Metric)
export class MetricsRepository extends Repository<Metric> {
  getAllMetrics(): Promise<Metric[]> {
    return this.find()
  }

  async createMetric(createMetricDto: CreateMetricDto): Promise<Metric> {
    const metric = this.create(createMetricDto)
    await this.save(metric)
    return metric
  }
}
