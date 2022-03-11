import { EntityRepository, Repository } from 'typeorm'
import { Metric } from './entities/metric.entity'

@EntityRepository(Metric)
export class MetricsRepository extends Repository<Metric> {}
