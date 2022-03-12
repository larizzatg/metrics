import { EntityRepository, Repository } from 'typeorm'
import { AvgFilterMetricDto } from './dto/avg-filter-metric.dto'
import { CreateMetricDto } from './dto/create-metric.dto'
import { Metric } from './entities/metric.entity'

@EntityRepository(Metric)
export class MetricsRepository extends Repository<Metric> {
  getAllMetrics(): Promise<Metric[]> {
    return this.find()
  }

  async getMetricsAvgByTimestamp(
    avgFilterMetricDto: AvgFilterMetricDto,
  ): Promise<Metric[]> {
    const { interval, startDate, endDate } = avgFilterMetricDto
    const query = this.createQueryBuilder()
      .select('metric.name', 'name')
      .addSelect('ROUND(AVG(metric.value))', 'value')
      .addSelect(`DATE_TRUNC('${interval}', metric.timestamp)`, 'datetime')
      .from(Metric, 'metric')
      .groupBy('metric.name')
      .addGroupBy('datetime')
      .orderBy('metric.name')
      .addOrderBy('datetime')

    if (startDate) {
      query.andWhere('metric.timestamp >= :startDate', { startDate })
    }

    if (endDate) {
      query.andWhere('metric.timestamp <= :endDate', { endDate })
    }

    const averageMetrics = await query.getRawMany()
    return averageMetrics
  }

  async createMetric(createMetricDto: CreateMetricDto): Promise<Metric> {
    const metric = this.create(createMetricDto)
    await this.save(metric)
    return metric
  }
}
