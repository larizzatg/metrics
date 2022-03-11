import { EntityRepository, Repository } from 'typeorm'
import { CreateMetricDto } from './dto/create-metric.dto'
import { Metric } from './entities/metric.entity'

@EntityRepository(Metric)
export class MetricsRepository extends Repository<Metric> {
  getAllMetrics(): Promise<Metric[]> {
    return this.find()
  }

  async getMetricsAvgByTimestamp(): Promise<Metric[]> {
    const interval = 'day'
    const averageMetrics = await this.createQueryBuilder()
      .select('metric.name', 'name')
      .addSelect('ROUND(AVG(metric.value))', 'value')
      .addSelect(`DATE_TRUNC('${interval}', metric.timestamp)`, 'datetime')
      .from(Metric, 'metric')
      .groupBy('metric.name')
      .addGroupBy('datetime')
      .orderBy('metric.name')
      .addOrderBy('datetime')
      .getRawMany()
    return averageMetrics
  }

  async createMetric(createMetricDto: CreateMetricDto): Promise<Metric> {
    const metric = this.create(createMetricDto)
    await this.save(metric)
    return metric
  }
}
