import { IsEnum, IsOptional } from 'class-validator'
import { MetricInterval } from '../metrics-intervals.enum'

export class AvgFilterMetricDto {
  @IsOptional()
  @IsEnum(MetricInterval)
  readonly interval: MetricInterval = MetricInterval.DAY
}
