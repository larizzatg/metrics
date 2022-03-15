import { EntityRepository, Repository } from 'typeorm'
import { AvgFilterMetricDto } from './dto/avg-filter-metric.dto'
import { CreateMetricDto } from './dto/create-metric.dto'
import { Metric } from './entities/metric.entity'

@EntityRepository(Metric)
export class MetricsRepository extends Repository<Metric> {
  getMetricsName(): Promise<string[]> {
    const query = this.createQueryBuilder('metric')
      .select('DISTINCT ON (LOWER(metric.name)) name')
      .orderBy('(LOWER(metric.name))', 'ASC')
    return query.getRawMany()
  }

  async getMetricsAvgByTimestamp(
    avgFilterMetricDto: AvgFilterMetricDto,
  ): Promise<Metric[]> {
    const { name, interval, startDate, endDate } = avgFilterMetricDto
    const query = this.createQueryBuilder()
      .select('metric.name', 'name')
      .addSelect('ROUND(AVG(metric.value))', 'value')
      .addSelect(`DATE_TRUNC('${interval}', metric.timestamp)`, 'datetime')
      .from(Metric, 'metric')
      .where('LOWER(metric.name) = LOWER(:name)', { name })
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
